import { Request, Response } from 'express'
import Project from '../models/Project'

export const createProject = async (req: Request, res: Response) => {
  const { name, description, owner } = req.body

  if (!name || !owner) {
    return res.status(400).json({ message: '專案名稱與擁有者為必填' })
  }

  try {
    const newProject = new Project({ name, description, owner })

    await newProject.save()

    return res.status(201).json({ message: '專案建立成功', project: newProject })
  } catch (err) {
    console.error('建立專案錯誤:', err)
    return res.status(500).json({ message: '伺服器錯誤，請稍後再試' })
  }
}
