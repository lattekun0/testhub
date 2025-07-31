import jwt, { SignOptions } from 'jsonwebtoken'
import { AuthPayload } from '../types/auth'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET 未設定')

export const signToken = (payload: AuthPayload, expiresIn: SignOptions['expiresIn'] = '1d') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export const verifyToken = (token: string): AuthPayload =>
  jwt.verify(token, JWT_SECRET) as AuthPayload
