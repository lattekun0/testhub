import { Request, Response, NextFunction } from 'express'
import { createProjectService, getUserProjectsService, updateProjectService } from '../services/projectService'

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

export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const { name, description } = req.body
  const userId = req.user!.id

  try {
    const project = await updateProjectService(id, userId, { name, description })
    if (!project) {
      return res.status(404).json({ message: '專案不存在或沒有權限' })
    }
    res.json({ message: '專案更新成功', project })
  } catch (error) {
    next(error)
  }
}
