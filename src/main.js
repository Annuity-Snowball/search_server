import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerConfig from './config/router.config.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

const mongoClient = mongo
await mongoClient

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', routerConfig)

server.listen(PORT, () => {
    console.log(`The search server is listening at port: ${PORT}`)
})