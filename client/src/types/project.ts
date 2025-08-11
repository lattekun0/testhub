export type ProjectRole = 'admin' | 'editor' | 'viewer'

export interface ProjectMember {
  user: string
  role: ProjectRole
}

export interface Project {
  _id: string
  name: string
  description?: string
  owner: string
  members: ProjectMember[]
  createdAt: string
  updatedAt: string
}
