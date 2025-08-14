import useDocumentTitle from '@/hooks/useDocumentTitle'
import Split from 'react-split'
import { Button } from '@/components/ui/button'
import { Plus, FolderOpenDot } from 'lucide-react'
import { useProjectStore } from '@/stores/projectStore'
import { useState } from 'react'
import NewProjectModal from '@/components/NewProjectModal'
import { useCreateProject } from '@/hooks/useCreateProject'
import KeywordSearch from '@/components/ui/KeywordSearch'
import CollapseToggleButton from '@/components/ui/CollapseToggleButton'
import PanelHeader from '@/components/ui/PanelHeader'

export default function ProjectSettingsPage() {
  useDocumentTitle('測試案例 - Testhub')

  const projects = useProjectStore((s) => s.projects)
  // const { projectId: currentProjectId } = useParams()
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)

  const [keyword, setKeyword] = useState('')
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { createProject, loading, error } = useCreateProject()

  const handleCreateProject = async (data: { name: string; description: string }) => {
    await createProject(data)
    setIsModalOpen(false)
  }

  const selectedProject =
    filteredProjects.find((p) => p._id === selectedProjectId) ??
    projects.find((p) => p._id === selectedProjectId)

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id)
  }

  return (
    <div className="flex-1 flex flex-col px-3 rounded-md bg-white dark:bg-[rgb(32,32,32)] h-full">
      <h2 className="text-xl font-bold py-3">專案設定</h2>
      <hr className="border-zinc-300 dark:border-zinc-700" />

      <div className="flex-1 flex flex-col mt-1">
        <Split
          className="flex flex-1 py-2"
          sizes={selectedProject && !isCollapsed ? [60, 40] : [100, 0]}
          minSize={0}
        >
          {/* 左側專案清單 */}
          <div className="flex flex-col justify-between rounded-md border border-[rgba(0,113,140,0.3)] dark:border-[rgba(250,250,250,0.12)]">
            {/* 上方工具列 */}
            <div className="flex justify-between bg-[rgba(0,113,140,0.05)] dark:bg-[rgb(40,40,40)] py-2 px-3">
              <Button variant={'green'} onClick={() => setIsModalOpen(true)}>
                <Plus />
                建立新專案
              </Button>

              <KeywordSearch keyword={keyword} setKeyword={setKeyword} />
            </div>

            {/* 表格 */}
            <div className="flex-1 overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="border-b border-zinc-300 dark:border-zinc-700">
                  <tr className="text-gray-400 dark:bg-[rgb(16,16,16)]">
                    <th className="text-left px-1 py-2">名稱</th>
                    <th className="text-left px-1 py-2">描述</th>
                    <th className="text-left px-1 py-2">建立日期</th>
                    <th className="w-20 px-1 py-2">{/* 留空給icon欄 */}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => {
                    const isSelected = project._id === selectedProjectId
                    const isHovered = project._id === hoveredProjectId
                    return (
                      <tr
                        key={project._id}
                        onClick={() => {
                          handleSelectProject(project._id)
                          setIsCollapsed(false)
                        }}
                        onMouseEnter={() => setHoveredProjectId(project._id)}
                        onMouseLeave={() => setHoveredProjectId(null)}
                        className={`border-b border-zinc-300 dark:border-zinc-700 hover:bg-gray-200/30 dark:hover:bg-zinc-700/30
                        ${isSelected ? 'bg-[rgba(0,113,140,0.18)]' : ''}`}
                      >
                        <td className="px-1 py-2">{project.name}</td>
                        <td className="px-1 py-2">{project.description}</td>
                        <td className="px-1 py-2">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <CollapseToggleButton
                            id={project._id}
                            selected={isSelected}
                            hovered={isHovered}
                            onToggle={(id, newSelected) => {
                              setSelectedProjectId(newSelected ? id : null)
                              setIsCollapsed(!newSelected)
                            }}
                          />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* 表格 */}
            <div className="flex p-3 bg-[rgba(0,113,140,0.05)] dark:bg-[rgb(40,40,40)]">
              ..個結果
            </div>
          </div>

          {/* 右側專案設定 */}
          <div
            className={`flex flex-col flex-1 rounded-md border border-[rgba(0,113,140,0.3)] dark:border-[rgba(250,250,250,0.12)]
      ${!selectedProject ? 'hidden' : ''}`}
          >
            <PanelHeader
              title="專案"
              titleIcon={<FolderOpenDot size={20} />}
              onClose={() => {
                setSelectedProjectId(null)
                setIsCollapsed(true)
              }}
            />
            {selectedProject && (
              <div className='flex flex-col h-full justify-between'>
                <div className="p-3 text-sm">
                  <label htmlFor="name" className="text-gray-400 font-bold">
                    名稱<span className="pl-0.5 text-red-600">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="專案名稱"
                    value={selectedProject.name}
                    className="border p-0.5 w-full mb-4 dark:bg-[rgba(10,10,10,0.56)]"
                  />

                  <label htmlFor="description" className="text-gray-400 font-bold">
                    描述
                  </label>
                  <textarea
                    id="description"
                    placeholder="輸入您的專案簡短描述"
                    value={selectedProject.description}
                    className="border p-0.5 w-full mb-4 dark:bg-[rgba(10,10,10,0.56)]"
                  />
                </div>
                <div className="flex p-3 bg-[rgba(0,113,140,0.05)] dark:bg-[rgb(40,40,40)]">
                  ..個結果
                </div>
              </div>
            )}
          </div>
        </Split>
      </div>

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
