const express = require('express');
const router = express.Router();
const keycloak = require('../middlewares/authMiddleware');

// Endpoint de Sign In (sin protección por Keycloak, ya que es la ruta de inicio de sesión)
router.post('/signin', (req, res, next) => {
  try {
    // Aquí puedes implementar la lógica de inicio de sesión utilizando Keycloak
    // Por simplicidad, en esta implementación de prueba solo devolvemos un mensaje de éxito
    res.json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    next(error);
  }
});

// Endpoint de Sign Out (sin protección por Keycloak, ya que es la ruta de cierre de sesión)
router.get('/signout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
