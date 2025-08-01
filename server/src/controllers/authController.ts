import { Request, Response } from 'express'
import { registerUser, loginUser } from '../services/authService'
import { RegisterInput, LoginInput } from '../types/auth'

export const register = async (req: Request, res: Response) => {
  try {
    const input = req.body as RegisterInput
    const result = await registerUser(input)
    res.status(201).json({ msg: '註冊成功', ...result })
  } catch (err) {
    if (err instanceof Error && err.message === 'EMAIL_EXISTS') {
      return res.status(400).json({ msg: 'Email 已註冊' })
    }
    console.error(err)
    res.status(500).json({ msg: '伺服器錯誤' })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const input = req.body as LoginInput
    const result = await loginUser(input)
    res.status(200).json(result)
  } catch (err) {
    if (err instanceof Error && err.message === 'INVALID_CREDENTIALS') {
      return res.status(400).json({ msg: 'Email 或密碼錯誤' })
    }
    console.error(err)
    res.status(500).json({ msg: '伺服器錯誤' })
  }
}
