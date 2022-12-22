import fs from "fs"
import { config } from "../config.js"
import sqlite3 from "sqlite3"

const dbPath = `./${config.dbFile}`
const cleanDB = () => {

    // check if db file exists
    // if so
        // remove file
    
    // close file

    // create a new database 

    // serailize 
        // create our table query 
    
    // close db 

    if (fs.existsSync(dbPath)) {
        fs.unlinkSync(dbPath)   
        console.log(`DB removed`)
    } else {
        console.log(`No DB found`)
    }
    console.log(`Creating new DB file.`)
    fs.closeSync(fs.openSync(dbPath, `w`))
    console.log(`success`)

    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, err => {
        if (err) console.error(err.code, err.message)
    })

    console.log(" - Created Database")

    db.serialize(() => {
        console.log(" - Opened Database")

        db.run(`
            CREATE TABLE ${config.table} (
                id VARCHAR(8) PRIMARY KEY,
                userId VARCHAR(36) NOT NULL,
                url VARCHAR(255) NOT NULL
            );
        `)

        db.all(`PRAGMA table_info(${config.table});`, (err, rows) => {
            console.log(rows)
        })

        db.run(`
            CREATE TABLE users (
                id VARCHAR(36) PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            );
        `)

        db.all('PRAGMA table_info(users)', (err, rows) => {
            console.log(rows)
        })

        console.log(" - Created Table")
    })

    db.close(err => {
        if (err) console.error(err.code, err.message)
    })
}

export default cleanDB