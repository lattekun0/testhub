import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const mongoURI = process.env.MONGODB_URI as string
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

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
