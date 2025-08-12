import { Request, Response, NextFunction } from 'express'
import { createProjectService, getUserProjectsService } from '../services/projectService'

export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  const { name, description } = req.body
  const owner = req.user!.id
  try {
    const project = await createProjectService(name, description, owner)
    return res.status(201).json({ message: '專案建立成功', project })
  } catch (error) {
    next(error)
  }
}

export const getUserProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await getUserProjectsService(req.user!.id)
    res.json(projects)
  } catch (error) {
    next(error)
  }
}
