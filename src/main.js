import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routerConfig from './config/router.config.js'
import initMongoDB from './config/db.config.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT

await initMongoDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/', routerConfig)

app.listen(PORT, () => {
    console.log(`The search server is listening at port: ${PORT}`)
})