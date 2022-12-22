import express from "express";
import sqlite3 from "sqlite3";
import { config } from "./config.js";
import cleanDB from "./util/cleanDB.js";
import ngrok from "ngrok";
import cors from "cors";
import urlsRouter from "./routes/urls.js";
import usersRouter from "./routes/users.js";
import session from "express-session";
import authRouter from "./routes/auth.js";
import redis from 'redis'

/** ENV SETUP ********/
import dotenv from 'dotenv'
dotenv.config()

/** REDIS SETUP ********/
export const redisClient = redis.createClient({
  url: 'redis://redis:6379', 
  legacyMode: true,
})

redisClient.on('connect', () => {
  console.log("Connected to redis")
})

redisClient.on("error", err => {
  console.log("Connection error")
  console.log(err)
})

redisClient.connect().then(async res => {
  console.log("Redis connected")
  console.log("Redis connected")

  await redisClient.set("test", "key")
  
  await redisClient.get('test', (err, result) => {
    console.log("Got key")
    if (err) {
      console.log(err)
    } else {
      console.log(result)
    }
  })


})





// client.on('error', err => {
//   console.log("There was a redis error.")
//   console.log(err)
// })

// await client.connect()

/** CONFIG ********/
const app = express();
app.set("json spaces", 2);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(session({
    name: config.sessionName,
    secret: config.sessionKey,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    }
}))

// app.use((req, res, next) => {
//     console.log(req.session)
//     next()
// })

app.use((req, res, next) => {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});  

/** DB INIT *******************/
const dbPath = `./${config.dbFile}`;
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.log(`Unable to open... Cleaning`);
    cleanDB();
  }
  db.close();
});

/** ROUTES *******************/
const router = express.Router();
router.get(`/`, (req, res) => {
  return res.status(200).json({
    message: "API Online",
  });
});

/** START *******************/

app.use("/", router);
app.use("/urls", urlsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);

app.listen(config.port, async () => {
  console.log(`App is listening on port ${config.port}`);
});
