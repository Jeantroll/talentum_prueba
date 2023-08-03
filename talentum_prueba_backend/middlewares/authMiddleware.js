const Keycloak = require('keycloak-connect');

const keycloak = new Keycloak({}, {
  scope: 'openid',
  realm: process.env.KEYCLOAK_REALM,
  "auth-server-url": process.env.KEYCLOAK_URL,
  "ssl-required": "external",
  "resource": process.env.KEYCLOAK_CLIENT_ID,
  "public-client": true,
  "confidential-port": 0
});

module.exports = {
  keycloak: keycloak
};
