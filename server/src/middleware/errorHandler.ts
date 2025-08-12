import { Request, Response, NextFunction } from 'express'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error('全局錯誤捕捉:', err)

  // 預設 500 伺服器錯誤
  const statusCode = err.statusCode || 500
  const message = err.message || '伺服器錯誤，請稍後再試'

  res.status(statusCode).json({
    error: true,
    message,
  })
}
