import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/authRoutes'
import cors from 'cors'

dotenv.config()

const mongoURI = process.env.MONGODB_URI as string
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err)
  })

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express!')
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
