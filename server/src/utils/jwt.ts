import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET 未設定')

export const signToken = (
  payload: Record<string, any>,
  expiresIn: SignOptions['expiresIn'] = '1d'
) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET)
