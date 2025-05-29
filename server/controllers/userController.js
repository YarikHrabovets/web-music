const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const { User } = require('../models/models')
const AppError = require('../errors/appError')
const { addAvatar, removeAvatar } = require('../services/mediaService')

function generateJwt(id, username, avatar) {
    return jwt.sign({id, username, avatar}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async login(req, res, next) {
        const { username, password } = req.body

        const user = await User.findOne({where: {username}})
        if (!user) {
            return next(AppError.forbidden('Username is not valid'))
        }

        if(!bcrypt.compareSync(password, user.password)) {
            return next(AppError.forbidden('Password is not valid'))
        }

        const token = generateJwt(user.id, user.username, user.avatar)
        return res.json({token})
    }

    async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(AppError.badRequest(errors))
            }

            const {username, password } = req.body
            const candidate = await User.findOne({where: {username}})
            if (candidate) {
                return next(AppError.forbidden('User already exists'))
            }

            const hash = bcrypt.hashSync(password, 10)
            const user = await User.create({username, password: hash})
            const token = generateJwt(user.id, user.username, user.avatar)
            return res.json({token})

        } catch (error) {
            return next(AppError.forbidden('Unexpected error during registration'))
        }
    }

    async authenticate(req, res, next) {
        const token = generateJwt(req.user.id, req.user.username, req.user.avatar)
        return res.json({token})
    }

    async uploadAvatar(req, res, next) {
        try {
            const { file } = req.files
            const user = await User.findByPk(req.user.id)
            const fileName = await addAvatar(file.data)
            if (user.avatar) removeAvatar(user.avatar)
            user.avatar = fileName
            await user.save()
            const token = generateJwt(user.id, user.username, user.avatar)
            return res.json({token})
        } catch (error) {
            return next(AppError.internal('Error during upload process'))
        }
    }

    async updateUsername(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(AppError.badRequest(errors))
            }

            const { username } = req.body
            const candidate = await User.findOne({where: {username}})
            if (candidate) {
                return next(AppError.badRequest('User with these name alredy exists'))
            }
            const user = await User.findOne({where: {'username': req.user.username}})
            user.username = username
            await user.save()
            const token = generateJwt(user.id, user.username, user.avatar)
            return res.json({token})
        } catch (error) {
            return next(AppError.internal('Error during updating username'))
        }
    }
}

module.exports = new UserController()