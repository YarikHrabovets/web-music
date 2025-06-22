const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const MusicController = require('../controllers/musicController')

router.get('/tracks', MusicController.getTracks)
router.get('/liked-tracks', authMiddleware, MusicController.getLikedTracks)
router.post('/add-track', authMiddleware, MusicController.addTrack)

module.exports = router