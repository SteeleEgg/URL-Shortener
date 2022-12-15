import express from 'express'
import { faker } from '@faker-js/faker'
import sqlite3 from 'sqlite3'
import { config } from '../config.js'
import bcrypt from 'bcrypt'

const dbPath = `./${config.dbFile}`
const authRouter = express.Router()

authRouter.post('/login', (req, res) => {

    // Required Field Check
    let errors = []
    if (!req.body.email) errors.push(`Email is required!`)
    if (!req.body.password) errors.push(`Password Required!`)
        
    if (errors.length > 0 ) {
        return res.status(400).json({errors})
    }
    
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {

        if (err) {
            return res.status(500).json(err)
        }
        db.all(`SELECT id, email, password from users where email="${req.body.email}"`, async (err, rows) => {
            if (err || rows.length == 0) {
                return res.status(404).json({"message": "User not found."})
            } else {
                let { id, password } = rows[0]
                if (await(bcrypt.compare(req.body.password, password))) {
                    req.session.user = req.body.email
                    req.session.id = id
                    req.session.isAuthenticated = true
                    res.status(200).send({"message": "Logged in!"})

                } else {
                    res.status(400).send({"message": "Password is incorrect."})
                }
            }
        }).close()
        // db.all(`
        //     SELECT id, email FROM users
        // `, (err, rows) => {
        //     if (err) {
        //         return res.status(500).json(err)
        //     }
        //     res.status(200).json(rows)
        // }).close()
        
    })
})

export default authRouter