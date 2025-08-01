import dotenv from 'dotenv'

dotenv.config()

export const JWT_SECRET = process.env.JWT_SECRET as string
export const MONGODB_URI = process.env.MONGODB_URI as string
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000

if (!JWT_SECRET) throw new Error('JWT_SECRET 未設定')
if (!MONGODB_URI) throw new Error('MONGODB_URI 未設定')
