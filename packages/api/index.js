import express from 'express'
import sqlite3 from 'sqlite3'
import { faker } from '@faker-js/faker'
import bodyParser from 'body-parser'
import { config } from './config.js'
import cleanDB from './util/cleanDB.js'
import ngrok from 'ngrok'
import cors from 'cors'
import bcrypt from  'bcrypt'
import urlsRouter from './routes/urls.js'
import usersRouter from './routes/users.js'
import session from 'express-session'
import authRouter from './routes/auth.js'
import cookieSession from 'cookie-session'
import proxy from 'express-http-proxy'

/** CONFIG ********/
const app = express()
app.set("json spaces", 2)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin: "*",
    credentials: true,
}))
app.use(cookieSession({
    name: 'session', 
    keys: [config.sessionKey],
    maxAge: 24 * 60 * 60 * 1000,
}))
app.set("trust proxy", 1)
// app.use(session({
//     name: 'session',
//     secret: config.sessionKey,
//     resave: false,
//     saveUninitialized: true, 
//     cookie: { secure: true }
// }))
// app.set('trust proxy', 1)


/** DB INIT *******************/
const dbPath = `./${config.dbFile}`
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
    if (err) {
        console.log(`Unable to open... Cleaning`)
        cleanDB()
    }
    db.close()
})

/** ROUTES *******************/
const router = express.Router()
router.get(`/`, (req, res) => {
    return res.status(200).json({
        message: 'API Online'
    })
})


/** START *******************/
app.use('/', router)
app.use('/urls', urlsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

app.use(proxy('http://localhost:5173'))

app.listen(config.port, async () => {
    console.log(`App is listening on port ${config.port}`)
    const url = await ngrok.connect(config.port)
    console.log(`ngrok URL ${url}`)
})