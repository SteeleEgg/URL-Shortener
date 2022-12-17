import express from 'express'
import { faker } from '@faker-js/faker'
import sqlite3 from 'sqlite3'
import { config } from '../config.js'

const dbPath = `./${config.dbFile}`
const urlsRouter = express.Router()

urlsRouter.get(`/all`, (req, res) => {

    let errors = []
    if (!req.headers["x-user-id"]) errors.push("Not logged in")
    if (errors.length > 0 ) {
        return res.status(400).send(errors)
    }

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            return res.status(500).json(err)
        }
        db.all(`
            SELECT * FROM ${config.table} WHERE userId="${req.headers["x-user-id"]}"
        `, (err, rows) => {
            if (err) {
                return res.status(500).json(err)
            }
            /**
             * [
             *  {
             *      "id": "some ID",
             *      "url": "some url",
             *      "userId": "some user's id"
             *  },
             *  ...
             * ]
             */
            res.status(200).json(rows)
        }).close()
    })
})

urlsRouter.get(`/:id`, (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            return res.status(500).json(err)
        }
        db.all(`
            SELECT * FROM ${config.table} WHERE id="${req.params.id}"
        `, (err, rows) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (rows.length > 0) {
                res.redirect(rows[0].url)
            } else {
                res.status(404).json({message: "No URL Found"})
            }
        }).close()
    })
})

urlsRouter.get(`/one/:id`, (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            return res.status(500).json(err)
        }
        db.all(`
            SELECT * FROM ${config.table} WHERE id="${req.params.id}"
        `, (err, rows) => {
            if (err) {
                return res.status(500).json(err)
            }
            if (rows.length > 0) {
                res.status(200).json({url: rows[0].url})
            } else {
                res.status(404).json({message: "No URL Found"})
            }
        }).close()
    })
})

urlsRouter.post(`/`, (req, res) => {

    console.log("Getting request")

    console.log("on create url", req.session)

    // if (!req.session.cookie.userId) {
    //     return res.status(401).send({"message": "Must log in first."})
    // }

    let { userId } = req.session

    // console.log("got here", req.body)

    let errors = []
    
    if (!req.body.url) errors.push(`No Url Specified`)
    if (!req.body.id) errors.push(`Not logged in!`)
    let id = faker.datatype.uuid().substring(0,8)
    if (errors.length > 0 ) {
        return res.status(400).json({
            message: `No Url Specified`
        })
    }

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            console.error(err.code, err.message)
            return res.status(500).json(err)
        } else {
            // INSERT INTO ${config.table} (id, url, userId) VALUES ("${id}","${req.body.url}","${userId}");
            db.all(`
                INSERT INTO ${config.table} (id, url, userId) VALUES ("${id}","${req.body.url}","${req.body.id}");
            `, (err, rows) => {
                if (err) {
                    return res.status(500).json({err})
                } else {
                    return res.status(201).json({
                        message: "Created",
                        id: id,
                    })
                }
                
            }).close()
            
        }
    })
})

urlsRouter.delete(`/:id`, (req, res) => {
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
        if (err) {
            return res.status(500).json(err)
        }
        db.all(`
            DELETE FROM ${config.table} WHERE id="${req.params.id}"
        `, (err, rows) => {
            if (err) {
                return res.status(500).json(err)
            }
            res.status(200).json(`${req.params.id} Deleted`)
        }).close()
    })
})

export default urlsRouter