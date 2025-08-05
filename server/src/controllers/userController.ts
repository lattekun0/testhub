import { Request, Response } from 'express'
import { User } from '../models/User'
import { comparePassword, hashPassword } from '../utils/hash'

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id
    const { name, currentPassword, newPassword } = req.body

    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: '使用者不存在' })

    if (newPassword) {
      const isValid = await comparePassword(currentPassword, user.password)
      if (!isValid) {
        return res.status(400).json({ message: '原密碼錯誤' })
      }
      user.password = await hashPassword(newPassword)
    }

    if (name) {
      user.name = name
    }

    await user.save()

    res.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    })
  } catch (err) {
    res.status(500).json({ message: '伺服器錯誤' })
  }
}
