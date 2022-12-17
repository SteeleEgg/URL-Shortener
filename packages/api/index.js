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
