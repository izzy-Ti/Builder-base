import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chalk from 'chalk'
import { connectDB } from './config/db.js'
import user from './router/auth.route.js'
import cookieParser from 'cookie-parser'
import building from './router/building.router.js'
import home from './router/home.router.js'
import bodyParser from 'body-parser'

dotenv.config()
const app = express()
const port = process.env.PORT
await connectDB()

app.use(cookieParser())
app.use(cors({credentials: true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/user', user)
app.use('/home', home)
app.use('/building', building)

app.listen(port, ()=>{
    console.log(chalk.blue.bold(`server running on http://localhost:${port}`))
})