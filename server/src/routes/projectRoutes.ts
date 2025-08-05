import { Router } from 'express'
import { createProject } from '../controllers/projectController'

const projectRouter = Router()

projectRouter.post('/', createProject)

export default projectRouter
