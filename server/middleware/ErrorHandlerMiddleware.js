const AppError = require('../errors/appError')

module.exports = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Unexpected error'})
} 