const Router = require('express')
const { check } = require('express-validator')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/signup', [
    check('username', 'Username must be from 5 to 20 in length').isLength({min: 5, max: 20}),
    check('password', 'Password must be at least 5 in length').isLength({min: 5})
], userController.register)
router.post('/signin', userController.login)
router.post('/upload-avatar', authMiddleware, userController.uploadAvatar)
router.post('/update-username', [
    check('username', 'Username must be from 5 to 20 in length').isLength({min: 5, max: 20})
], authMiddleware, userController.updateUsername)

router.get('/authenticate', authMiddleware, userController.authenticate)

module.exports = router