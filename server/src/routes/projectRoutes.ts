import { Router } from 'express'
import { createProject, getUserProjects } from '../controllers/projectController'
import { authMiddleware } from '../middleware/auth'

const projectRouter = Router()

projectRouter.post('/', authMiddleware, createProject)
projectRouter.get('/', authMiddleware, getUserProjects)

export default projectRouter
