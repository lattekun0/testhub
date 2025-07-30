import jwt, { SignOptions } from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
if (!JWT_SECRET) throw new Error('JWT_SECRET 未設定')

export const signToken = (payload: Record<string, any>, expiresIn: string | number = '1d') => {
  const options: SignOptions = {
    expiresIn: expiresIn as jwt.SignOptions['expiresIn'],
  }
  return jwt.sign(payload, JWT_SECRET, options)
}

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET)
