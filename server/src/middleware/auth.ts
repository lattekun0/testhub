import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'
import { IUserPayload } from '../types/auth'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token 
  if (!token) return res.status(401).json({ msg: 'Missing token' })

  try {
    const decoded = verifyToken(token) as IUserPayload
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid or expired token' })
  }
}
