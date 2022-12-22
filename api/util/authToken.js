import jwt from 'jsonwebtoken'
import { redisClient } from '../index.js'

/** ENV SETUP ********/
import dotenv from 'dotenv'
dotenv.config()

const secret = process.env.JWT_SIGNING_SECRET

export const GenerateToken = (username) => new Promise((resolve, reject) => {
    const access = jwt.sign({
        username: username,
        type: "access",
    }, secret, {
        expiresIn: '7d',
    })

    redisClient.set(`TOKEN:${username}`, access)

    resolve(access)
})

export const VerifyToken = (authHeader) => new Promise(async (resolve, reject) => {
    const token = authHeader.split(' ')[1]
    return await jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
            reject(err)
        } else {
            resolve(true)
        }
    })
})