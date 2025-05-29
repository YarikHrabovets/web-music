const jwt = require('jsonwebtoken')
const AppError = require('../errors/appError')

module.exports = (req, res, next) => {
    if (req.method === 'OPTION') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return next(AppError.notLoggedIn('User is not logged in'))
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode
        next()
    } catch (error) {
        return next(AppError.notLoggedIn('User is not logged in'))
    }
}