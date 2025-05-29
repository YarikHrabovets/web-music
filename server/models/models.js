const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    avatar: {type: DataTypes.STRING}
})

module.exports = {
    User
}