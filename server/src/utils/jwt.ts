import jwt, { SignOptions } from 'jsonwebtoken'
import { AuthPayload } from '../types/auth'
import { JWT_SECRET } from '../config/env'

export const signToken = (payload: AuthPayload, expiresIn: SignOptions['expiresIn'] = '1d') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export const verifyToken = (token: string): AuthPayload =>
  jwt.verify(token, JWT_SECRET) as AuthPayload
