const axios = require('axios')
const AppError = require('../errors/appError')

const musicHost = axios.create({
    baseURL: process.env.MUSIC_APP_API_URL,
    params: {
        client_id: process.env.CLIENT_ID
    }
})

class MusicController {
    async getTracks(req, res, next) {
        try {
            const result = await musicHost.get('tracks', {params: req.query})
            console.log(result.data)
            return res.json(result.data)
        } catch (error) {
            return next(AppError.badRequest(error.message))
        }
    }
}

module.exports = new MusicController()