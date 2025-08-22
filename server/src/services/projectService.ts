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
  return await Project.find({
    $or: [{ owner: userId }, { 'members.user': userId }],
  }).sort({ createdAt: 1 })
}

export async function updateProjectService(
  projectId: string,
  userId: string,
  updates: { name: string; description: string }
) {
  if (!projectId) throw new Error('缺少專案 ID')
  if (!userId) throw new Error('使用者未驗證，無法更新專案')

  const project = await Project.findById(projectId)
  if (!project) throw new Error('專案不存在')

  const member = project.members.find((m) => m.user.toString() === userId)
  if (!member && project.owner.toString() !== userId) {
    throw new Error('你不是此專案成員')
  }

  // 權限檢查
  if (project.owner.toString() !== userId && member?.role !== 'admin') {
    throw new Error('沒有權限修改專案')
  }

  project.name = updates.name ?? project.name
  project.description = updates.description ?? project.description
  return await project.save()
}

export const deleteProjectService = async (projectId: string, userId: string) => {
  // 只刪除該 user 擁有的專案
  const result = await Project.findOneAndDelete({ _id: projectId, owner: userId })
  return result // 找不到或沒有權限會回傳 null
}
