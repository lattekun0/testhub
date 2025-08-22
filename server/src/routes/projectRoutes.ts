import { Router } from 'express'
import { createProject, getUserProjects, updateProject, deleteProject } from '../controllers/projectController'
import { authMiddleware } from '../middleware/auth'

const projectRouter = Router()

projectRouter.post('/', authMiddleware, createProject)
projectRouter.get('/', authMiddleware, getUserProjects)
projectRouter.put('/:id', authMiddleware, updateProject)
projectRouter.delete('/:id', authMiddleware, deleteProject)

export default projectRouter
