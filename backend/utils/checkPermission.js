import { isTokenValid } from './jwt.js';
import UnauthenticatedError from '../errors/unauthenticated.js';
import UnauthorizedError from '../errors/unauthorized.js';
import { decodeUser } from './decodeUser.js';

export const checkPermission = (req, resourceUserId) => {
    const decodedUser = decodeUser(req);

    if (decodedUser.role === 'admin') return true;

    if (resourceUserId && decodedUser.userId === resourceUserId.toString()) {
        return true;
    }

    throw new UnauthorizedError('Not authorized to access this route');
};