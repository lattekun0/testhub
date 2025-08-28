// client/src/components/project/ProjectListSection.tsx
import { useState, useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useProjectStore } from '@/stores/projectStore'
import { useCreateProject } from '@/hooks/useCreateProject'
import { useDeleteProject } from '@/hooks/useDeleteProject'
import KeywordSearch from '@/components/ui/KeywordSearch'
import CollapseToggleButton from '@/components/ui/CollapseToggleButton'
import DeleteButton from '@/components/ui/DeleteButton'
import TableFooter from '@/components/TableFooter'
import NewProjectModal from '@/components/NewProjectModal'

type Props = {
  selectedProjectId: string | null
  setSelectedProjectId: (id: string | null) => void
}

export default function ProjectListSection({ selectedProjectId, setSelectedProjectId }: Props) {
  const projects = useProjectStore((s) => s.projects)
  const userId = useAuthStore((s) => s.user?._id)

  const [keyword, setKeyword] = useState('')
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 15

  const { createProject, loading, error } = useCreateProject()
  const { deleteProject } = useDeleteProject()

  const filteredProjects = useMemo(
    () => projects.filter((p) => p.name.toLowerCase().includes(keyword.toLowerCase())),
    [projects, keyword]
  )

  const pagedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredProjects, currentPage, itemsPerPage])

  const handleCreateProject = useCallback(
    async (data: { name: string; description: string }) => {
      await createProject(data)
      setIsModalOpen(false)
    },
    [createProject]
  )

  const handleDeleteProject = useCallback(
    (id: string) => {
      deleteProject(id)
      if (selectedProjectId === id) setSelectedProjectId(null)
    },
    [deleteProject, selectedProjectId, setSelectedProjectId]
  )

  const getRowClass = useCallback(
    (projectId: string) => {
      const isSelected = projectId === selectedProjectId
      return `border-b border-zinc-300 dark:border-zinc-700 hover:bg-gray-200/30 dark:hover:bg-zinc-700/30 ${
        isSelected ? 'bg-[rgba(0,113,140,0.18)]' : ''
      }`
    },
    [selectedProjectId]
  )

  return (
    <div className="flex flex-col rounded-md border h-full border-[rgba(0,113,140,0.3)] dark:border-[rgba(250,250,250,0.12)]">
      {/* 工具列 */}
      <div className="flex justify-between bg-[rgba(0,113,140,0.05)] dark:bg-[rgb(40,40,40)] py-2 px-3">
        <Button variant="green" onClick={() => setIsModalOpen(true)}>
          <Plus />
          建立新專案
        </Button>
        <KeywordSearch keyword={keyword} setKeyword={setKeyword} />
      </div>

      {/* 表格 + 分頁 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="border-b border-zinc-300 dark:border-zinc-700">
              <tr className="text-gray-400 dark:bg-[rgb(16,16,16)]">
                <th className="text-left px-1 py-2">名稱</th>
                <th className="text-left px-1 py-2">描述</th>
                <th className="text-left px-1 py-2">建立日期</th>
                <th className="w-20 px-1 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {pagedProjects.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-400 dark:text-zinc-500">
                    找不到符合條件的專案
                  </td>
                </tr>
              ) : (
                pagedProjects.map((project) => {
                  const isHovered = project._id === hoveredProjectId
                  return (
                    <tr
                      key={project._id}
                      className={getRowClass(project._id)}
                      onClick={() => setSelectedProjectId(project._id)}
                      onMouseEnter={() => setHoveredProjectId(project._id)}
                      onMouseLeave={() => setHoveredProjectId(null)}
                    >
                      <td className="px-1 py-2">{project.name}</td>
                      <td className="px-1 py-2">{project.description}</td>
                      <td className="px-1 py-2">{new Date(project.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div className="flex items-center space-x-1">
                          <CollapseToggleButton
                            id={project._id}
                            selected={project._id === selectedProjectId}
                            hovered={isHovered}
                            onToggle={(id, newSelected) => setSelectedProjectId(newSelected ? id : null)}
                          />
                          <DeleteButton
                            onDelete={() => handleDeleteProject(project._id)}
                            tooltip="刪除專案"
                            selected={project._id === selectedProjectId}
                            hovered={isHovered}
                            disabled={project.owner !== userId}
                          />
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <TableFooter
          totalItems={filteredProjects.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* 新專案 Modal */}
      <NewProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
        loading={loading}
        error={error}
      />
    </div>
  )
}
