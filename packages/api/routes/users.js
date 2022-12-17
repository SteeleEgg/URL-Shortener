import express from 'express'
import { faker } from '@faker-js/faker'
import sqlite3 from 'sqlite3'
import { config } from '../config.js'
import bcrypt from 'bcrypt'

const dbPath = `./${config.dbFile}`
const usersRouter = express.Router()

usersRouter.get(`/`, (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            return res.status(500).json(err)
        }
        db.all(`
            SELECT id, email FROM users
        `, (err, rows) => {
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json(rows)
        }).close()
    })
})

usersRouter.post(`/`, async (req,res) => {
    
    // Required Field Check
    let errors = []
    if (!req.body.email) errors.push(`Email is required!`)
    if (!req.body.password) errors.push(`Password Required!`)
        
    if (errors.length > 0 ) {
        return res.status(400).json({errors})
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    let id = faker.datatype.uuid()

     
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            console.error(err.code, err.message)
            return res.status(500).json(err)
        } else {
            db.run(`
                INSERT INTO users (id, email, password) VALUES ("${id}","${req.body.email}","${hashedPassword}");
            `, err => {
                if (err) {
                    return res.status(400).json({
                        message: "Email is already taken.",
                        err,
                    })
                } else {
                    return res.status(201).json({
                        message: "Created",
                        email: req.body.email,
                        id: id,
                    })
                }
            }).close()
        }
    })
})

usersRouter.delete(`/:email`, (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            return res.status(500).json(err)
        }
        db.all(`
            DELETE FROM users WHERE email="${req.params.email}"
        `, (err, rows) => {
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json(`${req.params.email} Deleted`)
        }).close()
    })
})

export default usersRouter