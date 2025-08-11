import { useState } from 'react'
import { useProjectStore } from '@/stores/projectStore'
import { createProjectApi } from '@/api/projectApi'

export function useCreateProject() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { fetchProjects } = useProjectStore()

  const createProject = async (payload: { name: string; description?: string }) => {
    try {
      setLoading(true)
      await createProjectApi(payload)
      await fetchProjects()
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知錯誤')
    } finally {
      setLoading(false)
    }
  }

  return {createProject, loading, error}
}
