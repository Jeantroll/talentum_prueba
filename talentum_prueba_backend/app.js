const express = require('express');
const KcAdminClient = require('keycloak-connect');

const app = express();

const adminClient = new KcAdminClient({}, {
    baseUrl: 'http://localhost:8080/auth',
    realmName: 'hexadefence'
});

// Configura el middleware de Keycloak
const keycloakMiddleware = adminClient.middleware();
app.use(keycloakMiddleware);

let execute = async function () {

    await adminClient.auth({
        username: 'hexa',
        password: 'hx@123',
        grantType: 'password',
        clientId: 'nodejs-admin-client'
    });

    const users = await adminClient.users.find();

    console.log(users);
};

execute();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor Express escuchando en http://localhost:${port}`);
});
