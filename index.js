import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import connectMongo from 'connect-mongo'
import cors from 'cors'
import beautifyUnique from 'mongoose-beautiful-unique-validation'
import session from 'express-session'

import routerUser from './routes/users.js'

dotenv.config()

mongoose.connect(process.env.DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.plugin(beautifyUnique)

const app = express()

app.use(bodyParser.json())

app.use(cors({
  origin (origin, callback) {
    if (origin === undefined) {
      callback(null, true)
    } else {
      if (process.env.DEV === 'true') {
        callback(null, true)
      } else if (origin.includes('github')) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed'), false)
      }
    }
  },
  credentials: true
}))

const MongoStore = connectMongo(session)

const sessionSettings = {
  secret: '123456',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 1000 * 60 * 30
  },
  saveUninitialized: false,
  rolling: true,
  resave: true
}

if (process.env.DEV === 'false') {
  sessionSettings.cookie.sameSite = 'none'
  sessionSettings.cookie.secure = true
}

app.use(session(sessionSettings))

app.set('trust proxy', 1)
app.use('/users', routerUser)

app.use((_, req, res, next) => {
  res.status(500).send({ success: false, message: '伺服器錯誤' })
})

app.listen(process.env.PORT, () => {
  console.log('http://localhost:' + process.env.PORT)
})
