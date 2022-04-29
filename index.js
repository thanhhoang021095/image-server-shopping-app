import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import OtherServices from './otherController'

require('dotenv').config()

// Setup server express
const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.get('/file/:linkFile', OtherServices.getFile)
app.get('/images/:linkImage', OtherServices.getImage)
app.get('/imageScale', OtherServices.getImageScale)

// error handler
app.use(function (err, req, res, next) {
  if (err.isBoom) {
    return res.status(err.output.statusCode).json(err.output.payload)
  }
})

const server = http.createServer(app)
server.listen(process.env.PORT)

console.log('Starting Load: Coin98 server started at port ' + process.env.PORT)
