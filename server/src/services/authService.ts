import { User } from '../models/User'
import { RegisterInput, LoginInput } from '../types/auth'
import { signToken } from '../utils/jwt'
import { hashPassword, comparePassword } from '../utils/hash'

export const registerUser = async ({ name, email, password }: RegisterInput) => {
  const existingUser = await User.findOne({ email })
  if (existingUser) throw new Error('EMAIL_EXISTS')

  const hashedPassword = await hashPassword(password)
  const newUser = new User({ name, email, password: hashedPassword })
  await newUser.save()

  const token = signToken({ id: newUser.id })
  return { token, user: { name: newUser.name, email: newUser.email } }
}

export const loginUser = async ({ email, password }: LoginInput) => {
  const user = await User.findOne({ email })
  if (!user) throw new Error('INVALID_CREDENTIALS')

  const isMatch = await comparePassword(password, user.password)
  if (!isMatch) throw new Error('INVALID_CREDENTIALS')

  const token = signToken({ id: user.id })
  return { token, user: { name: user.name, email: user.email } }
}
