const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('qs');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Construye los datos para la solicitud de token
    const tokenData = qs.stringify({
      'grant_type': 'password',
      'client_id': 'prueba-tecnica',
      'client_secret': 'wiUXTRasEncLIvexaSQjsJFo9VKzD5Dc',
      'username': username,
      'password': password
    });

    // Configura la solicitud de token
    const tokenConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8080/realms/master/protocol/openid-connect/token',
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
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint de Sign Out
app.get('/signout', async (req, res) => {
  try {
    // Obtiene el token de acceso de la solicitud
    const accessToken = req.headers.authorization.split(' ')[1];

    // Revoca el token de acceso en Keycloak
    await axios.post('http://localhost:8080/realms/master/protocol/openid-connect/logout', null, {
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
  try {
    /*const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'Unauthorized' });
    }*/

    // Obtén el token de acceso del encabezado de autorización
    const accessToken = req.headers.authorization.split(' ')[1];

    // Decodifica el token de acceso para obtener información sobre el usuario y sus roles
    const tokenInfoResponse = await axios.get('http://localhost:8080/auth/realms/master/protocol/openid-connect/userinfo', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
      return tokenInfoResponse
    /*const userRoles = tokenInfoResponse.data.realm_access.roles;

    // Verifica si el usuario tiene el rol "admin"
    if (userRoles.includes('admin')) {
      // Aquí devuelves la lista de productos
      const products = [
        { id: 1, name: 'Product 1', description: 'Description 1', price: 10.99 },
        { id: 2, name: 'Product 2', description: 'Description 2', price: 20.99 }
      ];
      return res.json(products);
    } else {
      return res.status(403).json({ error: 'Forbidden' });
    }*/
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
