import { StatusCodes } from 'http-status-codes'
import { User } from '../models/User.js'
import { createTokenUser } from '../utils/createTokenUser.js';
import { attachCookiesToResponse } from '../utils/jwt.js';
import BadRequestError from '../errors/bad-request.js';

export const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const user = await User.create({ username, email, password, role });
        const tokenUser = createTokenUser(user);
        attachCookiesToResponse(res, tokenUser);
        res.status(StatusCodes.CREATED).json({ user: tokenUser })
    } catch (error) {
        throw new BadRequestError(error);
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError('please provide email and password')
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new BadRequestError(`no user with email ${email}`)
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new BadRequestError('invalid credential')
    }

    const tokenUser = createTokenUser(user);
    attachCookiesToResponse(res, tokenUser);
    res.status(StatusCodes.ACCEPTED).json({ user: tokenUser })
}

export const logout = async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    })

    res.status(StatusCodes.OK).json({ success: true, message: "Logged out !" })
}