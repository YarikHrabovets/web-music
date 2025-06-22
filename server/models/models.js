const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING}
})

const Track = sequelize.define('Track', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    trackId: {type: DataTypes.INTEGER, unique: true, allowNull: false}
})

User.hasMany(Track, {as: 'tracks', foreignKey: 'userId'})
Track.belongsTo(User, {as: 'users', foreignKey: 'userId'})

module.exports = {
    User,
    Track
}