import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authRoutes'
import cors from 'cors'
import { PORT, MONGODB_URI } from './config/env'

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
