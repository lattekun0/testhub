import { Router } from 'express'
import { updateUserProfile } from '../controllers/userController'
import { authMiddleware } from '../middleware/auth'

const userRouter = Router()

userRouter.put('/profile', authMiddleware, updateUserProfile)

export default userRouter
