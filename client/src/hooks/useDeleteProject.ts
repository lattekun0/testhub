import { useState } from "react"
import { useProjectStore } from "@/stores/projectStore"
import { deleteProjectApi } from "@/api/projectApi"

export function useDeleteProject() {
  const [isDeleting, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { fetchProjects } = useProjectStore()

  const deleteProject = async (id: string) => {
    try {
      setLoading(true)
      await deleteProjectApi(id)
      await fetchProjects()
    } catch (err) {
      setError(err instanceof Error ? err.message : "未知錯誤")
    } finally {
      setLoading(false)
    }
  }

  return { deleteProject, isDeleting, error }
}
