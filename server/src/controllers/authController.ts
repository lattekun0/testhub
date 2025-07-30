import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { User, IUser } from '../models/User'
import { signToken } from '../utils/jwt'

// 註冊
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body as IUser

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ msg: 'Email 已註冊' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ name, email, password: hashedPassword })
    await newUser.save()

    const token = signToken({ id: newUser.id })

    res.status(201).json({
      msg: '註冊成功',
      token,
      user: { name: newUser.name, email: newUser.email },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: '伺服器錯誤' })
  }
}

// 登入
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ msg: 'Email 或密碼錯誤' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ msg: 'Email 或密碼錯誤' })
    }

    const token = signToken({ id: user.id }) // 同樣使用 user.id（字串）

    res.status(200).json({
      token,
      user: { name: user.name, email: user.email },
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: '伺服器錯誤' })
  }
}
