import useDocumentTitle from '@/hooks/useDocumentTitle'
import Split from 'react-split'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useProjectStore } from '@/stores/projectStore'
import { useState } from 'react'
import NewProjectModal from '@/components/NewProjectModal'
import { useCreateProject } from '@/hooks/useCreateProject'
import KeywordSearch from '@/components/ui/KeywordSearch'

export default function ProjectSettingsPage() {
  useDocumentTitle('測試案例 - Testhub')

  const projects = useProjectStore((s) => s.projects)
  // const { projectId: currentProjectId } = useParams()
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

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

  const selectedProject = filteredProjects.find((p) => p._id === selectedProjectId)

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id)
  }

  return (
    <div className="flex-1 flex flex-col px-3 rounded-md bg-white dark:bg-[rgb(32,32,32)] h-full">
      <h2 className="text-xl font-bold py-3">專案設定</h2>
      <hr className="border-zinc-300 dark:border-zinc-700" />

      <div className="flex-1 flex flex-col mt-1">
        <Split className="flex flex-1 py-2" sizes={[60, 40]} minSize={100}>
          {/* 左側專案清單 */}
          <div className="flex flex-col justify-between rounded-md border border-[rgba(0,113,140,0.3)] dark:border-[rgba(250,250,250,0.12)]">
            {/* 上方工具列 */}
            <div className="flex justify-between bg-[rgba(0,113,140,0.05)] py-2 px-3">
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
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr
                      key={project._id}
                      onClick={() => handleSelectProject(project._id)}
                      className={`border-b border-zinc-300 dark:border-zinc-700 hover:bg-gray-200/30 dark:hover:bg-zinc-700/30
                        ${project._id === selectedProjectId ? 'bg-[rgba(0,113,140,0.18)]' : ''}`}
                    >
                      <td className="px-1 py-2">{project.name}</td>
                      <td className="px-1 py-2">{project.description}</td>
                      <td className="px-1 py-2">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 表格 */}
            <div className="flex">尾頁</div>
          </div>

          <div className="flex flex-col rounded-md border border-[rgba(0,113,140,0.3)] dark:border-[rgba(250,250,250,0.12)]">
            {selectedProject ? (
              <>
                <h2>{selectedProject.name}</h2>
                <p>{selectedProject.description}</p>
                {/* 這裡放修改、刪除按鈕 */}
              </>
            ) : (
              <p>請從左側選擇一個專案查看設定</p>
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
