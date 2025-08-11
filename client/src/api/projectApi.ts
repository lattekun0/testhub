import { request } from './request'
import type { Project } from '@/types/project'

// 建立專案
export function createProjectApi(payload: {
  name: string
  description?: string
}): Promise<Project> {
  return request<Project>('/api/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// 修改專案
export function updateProjectApi(
  id: string,
  payload: { name?: string; description?: string }
): Promise<Project> {
  return request<Project>(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

// 刪除專案
export function deleteProjectApi(id: string) {
  return request(`/api/projects/${id}`, {
    method: 'DELETE',
  })
}

// 加入成員
export function addProjectMemberApi(id: string, payload: { userId: string }) {
  return request(`/api/projects/${id}/members`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// 取得專案列表
export function getProjectsApi() {
  return request('/api/projects')
}
