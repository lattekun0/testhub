import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../utils/jwt'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]
  if (!token) return res.status(401).json({ msg: 'Missing token' })

  try {
    const decoded = verifyToken(token)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ msg: 'Invalid or expired token' })
  }
}
