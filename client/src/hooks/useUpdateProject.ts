import { useState } from 'react'
import { useProjectStore } from '@/stores/projectStore'
import { updateProjectApi } from '@/api/projectApi'

export function useUpdateProject() {
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { fetchProjects } = useProjectStore()

  const updateProject = async (id: string, payload: { name: string; description: string }) => {
    try {
      setSaving(true)
      await updateProjectApi(id, payload)
      await fetchProjects()
    } catch (err) {
      setError(err instanceof Error ? err.message : '未知錯誤')
    } finally {
      setSaving(false)
    }
  }

  return { updateProject, saving, error }
}
