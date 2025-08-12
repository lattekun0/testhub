import Project from '../models/Project'

export async function createProjectService(name: string, description: string, owner: string) {
  if (!name) throw new Error('專案名稱為必填')
  if (!owner) throw new Error('使用者未驗證，無法建立專案')
  const newProject = new Project({
    name,
    description,
    owner,
    members: [
      {
        user: owner,
        role: 'admin',
      },
    ],
  })
  return await newProject.save()
}

export async function getUserProjectsService(userId: string) {
  return await Project.find({ owner: userId }).sort({ createdAt: 1 })
}
