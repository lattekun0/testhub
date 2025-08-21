import { Router } from 'express'
import { createProject, getUserProjects, updateProject } from '../controllers/projectController'
import { authMiddleware } from '../middleware/auth'

const projectRouter = Router()

projectRouter.post('/', authMiddleware, createProject)
projectRouter.get('/', authMiddleware, getUserProjects)
projectRouter.put('/:id', authMiddleware, updateProject)

export default projectRouter
