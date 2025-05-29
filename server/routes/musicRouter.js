const Router = require('express')
const router = new Router()
const MusicController = require('../controllers/musicController')

router.get('/tracks', MusicController.getTracks)

module.exports = router