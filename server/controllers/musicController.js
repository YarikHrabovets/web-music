const axios = require('axios')
const { Track } = require('../models/models')
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

    async addTrack(req, res, next) {
        try {
            const { trackId } = req.body
            await Track.create({
                trackId,
                userId: req.user.id
            })
            return res.json('Successfully added')
        } catch (error) {
            return next(AppError.internal(error.message))
        }
    }

    async getLikedTracks(req, res, next) {
        try {
            const tracks = await Track.findAll({where: {userId: req.user.id}})
            const ids = tracks.map(track => track.trackId)
            const result = await musicHost.get('tracks', {params: {id: ids}})
            return res.json(result.data)
        } catch (error) {
            return next(AppError.badRequest(error.message))
        }
    }
}

module.exports = new MusicController()