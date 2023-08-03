const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Construye los datos para la solicitud de token
    const tokenData = qs.stringify({
      'grant_type': 'password',
      'client_id': 'prueba-talentum',
      'client_secret': 'qUYQvL88BirwsxydCiVQCQ8Gdx8jBiQ2',
      'username': username,
      'password': password
    });

    // Configura la solicitud de token
    const tokenConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://host.docker.internal:8080/realms/talentum/protocol/openid-connect/token',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: tokenData
    };

    // Realiza la solicitud de token a Keycloak
    const response = await axios(tokenConfig);

    // Devuelve el token de acceso en la respuesta
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Endpoint de Sign Out
app.get('/signout', async (req, res) => {
  try {
    // Obtiene el token de acceso de la solicitud
    const accessToken = req.headers.authorization.split(' ')[1];

    // Revoca el token de acceso en Keycloak
    await axios.post('http://host.docker.internal:8080/realms/talentum/protocol/openid-connect/logout', null, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    // Responde con un mensaje de éxito
    res.json({ message: 'Signed out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Endpoint protegido de la lista de productos (solo acceso de rol admin)
app.get('/products', async (req, res) => {

    // Obtén el token de acceso del encabezado de autorización
    const accessToken = req.headers.authorization.split(' ')[1];

    // Decodifica el token de acceso para obtener información sobre el usuario y sus roles
    const tokenInfoResponse = await axios.get('http://host.docker.internal:8080/realms/talentum/protocol/openid-connect/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return tokenInfoResponse
    
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
