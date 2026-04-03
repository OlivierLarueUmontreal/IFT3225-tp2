import jwt from 'jsonwebtoken';

const createJWT = ({payload}) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}

const isTokenValid = ({token}) => {
   return jwt.verify(token, process.env.JWT_SECRET)
}


const attachCookiesToResponse = (res, user) => {
    const token = createJWT({payload: user})

    const oneDay = 1000 * 60 * 60 * 24

    res.cookie('token', token, {
        origin:[process.env.FRONTEND_URL],
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: true,
        signed : false,
        sameSite: "none",
    })

    return token;
}

export {isTokenValid, attachCookiesToResponse}