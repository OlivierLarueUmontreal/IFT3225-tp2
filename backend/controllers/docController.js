import {StatusCodes} from 'http-status-codes'
import {decodeUser} from "../utils/decodeUser.js";
import { routes } from "../utils/routes.js";

export const getDocumentation = async (req, res) => {
    try{
        const user = decodeUser(req);
        const isAdmin = user && user.role === 'admin';

        // take only adminOnly routes if we are admin.
        const doc = []
        for (const r of routes) {
            if (r.adminOnly && !isAdmin) continue; // route is adminOnly but we are not admin: skip.

            doc.push(r);
        }

        res.status(StatusCodes.OK).json(doc)
    } catch (e){
        console.error("Error with documentation: " + e);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: e.message});
    }
}