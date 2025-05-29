const fs = require('fs')
const sharp = require('sharp')
const path = require('path')
const uuid = require('uuid')

const addAvatar = (buffer) => {
    const fileName = `${uuid.v4()}.jpg`
    const filePath = path.join(process.env.MEDIA_PATH, fileName)
    return new Promise((resolve, reject) => {
        try {
            sharp(buffer).resize(300, 300).toFile(filePath)
            return resolve(fileName)
        } catch (error) {
            return reject({message: 'Error during image upload'})
        }
    })
}

const removeAvatar = (file) => {
    return fs.unlinkSync(path.join(process.env.MEDIA_PATH, file))
}

module.exports = {
    addAvatar,
    removeAvatar
}