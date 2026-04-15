import {StatusCodes} from 'http-status-codes'

export const generatePassword = async (req, res) => {
    const length = parseInt(req.params.length) || 12; // default 12 if invalid
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    res.status(StatusCodes.OK).json({ password, length });
}