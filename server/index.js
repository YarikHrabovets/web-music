require('dotenv').config()

const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const { connectDB } = require('./db')
const routes = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlerMiddleware')

const corsOptions = {
    origin: process.env.ALLOWED_HOSTS.split(',')
}

const app = express()
app.use(express.json())
app.use(cors(corsOptions))
app.use(fileUpload({defCharset: 'utf-8', defParamCharset: 'utf-8'}))
app.use('/media', express.static(process.env.MEDIA_PATH))
app.use(routes)
app.use(errorHandler)

const start = async () => {
    try {
        await connectDB()
        app.listen(process.env.PORT, () => console.log(`Server has been started on ${process.env.PORT} port...`))
    } catch (error) {
        console.error(error)
    }
}

start()