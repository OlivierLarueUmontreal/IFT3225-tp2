import {StatusCodes} from 'http-status-codes'

export const getDocumentation = async (req, res) => {
    const isAdmin = req.user.role === 'admin';

    // TODO terminer ca
    const routes = [
        {
            method: "GET",
            path: "/api/v1/profils/me",
            description: "Get the infos of the connected profil.",
            curl: "curl -X GET http://localhost:6767/api/v1/profils/me",
            response: `{ "username": "John", ... }`,
            adminOnly: false
        },
        {
            method: "PUT",
            path: "/api/v1/profils/{id}",
            description: "Edits a profil (except the id) ",
            curl: `curl -X PUT http://localhost:6767/api/v1/profils/123 -d '{"username":"toto"}'`,
            response: `{ "msg": "Updated" }`,
            adminOnly: false
        },
        {
            method: "GET",
            path: "/api/v1/profils",
            description: "List all the users (in an array)",
            curl: "curl -X GET http://localhost:6767/api/v1/profils",
            response: `{ "profiles": [...], "count": 10 }`,
            adminOnly: true
        },
        {
            method: "POST",
            path: "/api/v1/profils",
            description: "Create a new profil",
            curl: `curl -X POST http://localhost:6767/api/v1/profils -d '{"email":"toto@labrech.com"}'`,
            response: `{ "profile": {...} }`,
            adminOnly: true
        }
    ];

    // take only adminOnly routes if we are admin.
    const docs = []
    for (const r in routes) {
        if (r.adminOnly && !isAdmin) continue; // route is adminOnly but we are not admin: skip.

        docs.push(r);
    }

    res.status(200).json(docs)
}