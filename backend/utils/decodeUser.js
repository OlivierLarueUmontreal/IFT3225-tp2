import UnauthenticatedError from "../errors/unauthenticated.js"
import { isTokenValid } from "./jwt.js";

export const decodeUser = (req) => {
    const token = req.cookies.token;
    
    if (!token) {
        throw new UnauthenticatedError('Authentication Invalid: No token provided'); 
    }

    const decodedUser = isTokenValid({ token });
    return decodedUser
}