import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chalk from 'chalk'
import { connectDB } from './config/db.js'
import user from './router/auth.route.js'
import cookieParser from 'cookie-parser'

dotenv.config()
const app = express()
const port = process.env.PORT
await connectDB()

app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use('/user', user)


app.listen(port, ()=>{
    console.log(chalk.blue.bold(`server running on http://localhost:${port}`))
})