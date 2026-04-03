const createTokenUser = (user) => {
    const tokenUser = {
        username: user.username,
        role: user.role,
        email: user.email,
        userId: user._id
    }
    return tokenUser
}

export {createTokenUser}