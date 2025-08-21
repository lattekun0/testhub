// client/src/stores/projectStore.ts
import { create } from 'zustand'
import type { Project } from '@/types/project'

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
      const data: Project[] = await res.json()

      // 將 owner 與 members.user 轉為 string
      const projects = data.map((p) => ({
        ...p,
        owner: p.owner.toString(),
        members: p.members.map((m) => ({ ...m, user: m.user.toString() })),
      }))

      set({
        projects,
        currentProject: projects.length > 0 ? projects[0] : null,
      })
    } catch (error) {
      console.error('載入專案失敗', error)
    }
  },
}))
