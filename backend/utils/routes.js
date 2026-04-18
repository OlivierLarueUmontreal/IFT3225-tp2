export const routes = [
    {
        method: "GET",
        path: "/",
        description: "Check if api is running and gives a link to the swagger",
        curl: "curl -X GET http://localhost:6767/",
        response: `<h1>API is running</h1><a href="/api-docs">Documentation</a>`,
        adminOnly: false
    },
    {
        method: "GET",
        path: "/api/v1/profils/me",
        description: "Get the infos of the connected profil.",
        curl: "curl -X GET http://localhost:6767/api/v1/profils/me",
        response: `{ "username": "toto", "email":"toto@labrech.com", "role":"user", "userid":"someId" }`,
        adminOnly: false
    },
    {
        method: "GET",
        path: "/api/v1/profils",
        description: "List all the users (in an array), with the array count",
        curl: "curl -X GET http://localhost:6767/api/v1/profils",
        response: `{ "profiles": [...], "count": 10 }`,
        adminOnly: true
    },
    {
        method: "POST",
        path: "/api/v1/profils",
        description: "Create a new profil (register)",
        curl: `curl -X POST http://localhost:6767/api/v1/profils \\
         -d '{ "username": "toto", "email":"toto@labrech.com", "role":"user"}'`,
        response: `{ "profile": {...} }`,
        adminOnly: false
    },
    {
        method: "GET",
        path: "/api/v1/profils/{id}",
        description: "Get a profil",
        curl: `curl -X PUT http://localhost:6767/api/v1/profils/123 '`,
        response: `{ "username": "toto", "email":"toto@labrech.com", "role":"user", "userid":"123" }`,
        adminOnly: false
    },
    {
        method: "PUT",
        path: "/api/v1/profils/{id}",
        description: "Edits a profil (except the id) ",
        curl: `curl -X PUT http://localhost:6767/api/v1/profils/123 \\ 
        -d '{ "username": "new", "email":"new@email.com" }'`,
        response: `{ "profile": {"username": "new", "email":"new@email.com", ... } }`,
        adminOnly: false
    },
    {
        method: "DELETE",
        path: "/api/v1/profils/{id}",
        description: "Delete a profil",
        curl: `curl -X DELETE http://localhost:6767/api/v1/profils/123'`,
        response: `{ msg: 'Success! Profile removed.' }`,
        adminOnly: true
    },
    {
        method: "POST",
        path: "/api/v1/profils/updatePassword",
        description: "Change the password of the profil",
        curl: `curl -X POST http://localhost:6767/api/v1/profils/updatePassword \\
         -d '{ "oldPassword": "toto", "newPassword":"labreche"}'`,
        response: `{ msg: "Success! Password updated." }`,
        adminOnly: false
    },
    {
        method: "GET",
        path: "/api/v1/motdepasse/:length",
        description: "Get a generated password according to the length given in params",
        curl: "curl -X GET http://localhost:6767/api/v1/motdepasse/10",
        response: `{ "password": "0123456789", "length": "10" }`,
        adminOnly: false
    },
    {
        method: "POST",
        path: "/api/v1/auth/login",
        description: "Login the user",
        curl: `curl -X POST http://localhost:6767/api/v1/auth/login \\ 
        -d '{ "email":"toto@labrech.com", "password":"somePassword" }'`,
        response: `{ "user": {...} }`,
        adminOnly: false
    },
    {
        method: "GET",
        path: "/api/v1/auth/logout",
        description: "Logout the user",
        curl: `curl -X POST http://localhost:6767/api/v1/auth/logout'`,
        response: `{ "success": true, "message": "Logged out!" }`,
        adminOnly: false
    },
];
