const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false
    }
)

const connectDB = async () => {
    await sequelize.authenticate()
    .then(() => console.log('Connection has been established successfully.'))
    .catch((error) => console.log('Unable to connect to the database: ', error))
    await sequelize.sync()
    .then(() => console.log('Database has been synchronized.'))
    .catch((error) => console.log('Unable to synchronize database: ', error))
}

module.exports = {
    sequelize,
    connectDB
}