import express from 'express'
import mongoose from 'mongoose'
import authRouter from './routes/authRoutes'
import userRouter from './routes/user'
import projectRouter from './routes/projectRoutes'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { PORT, MONGODB_URI } from './config/env'

const app = express()
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/projects', projectRouter)

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
