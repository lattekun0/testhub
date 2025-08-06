import { create } from 'zustand'

interface Project {
  _id: string
  name: string
  description?: string
}

interface ProjectStore {
  projects: Project[]
  currentProject: Project | null
  setProjects: (projects: Project[]) => void
  setCurrentProject: (project: Project | null) => void
  fetchProjects: () => Promise<void>
}

export const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  currentProject: null,
  setProjects: (projects) => set({ projects }),
  setCurrentProject: (project) => set({ currentProject: project }),
  fetchProjects: async () => {
    try {
      const res = await fetch('/api/projects', { credentials: 'include' })
      const data = await res.json()
      set({ projects: data, currentProject: data[0] ?? null })
    } catch (error) {
      console.error('載入專案失敗', error)
    }
  },
  refreshProjects: async () => {
    try {
      const res = await fetch('/api/projects', {
        credentials: 'include',
      })
      const data = await res.json()
      set({ projects: data, currentProject: data[0] ?? null })
    } catch (error) {
      console.error('更新專案失敗', error)
    }
  },
}))
