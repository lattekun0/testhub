import useDocumentTitle from '@/hooks/useDocumentTitle'
import Split from 'react-split'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useProjectStore } from '@/stores/projectStore'
import { useState } from 'react'
import Modal from '@/components/Modal'

export default function ProjectSettingsPage() {
  useDocumentTitle('測試案例 - Testhub')

  const projects = useProjectStore((s) => s.projects)
  const [keyword, setKeyword] = useState('')
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(keyword.toLowerCase())
  )
  const [isModalOpen, setIsModalOpen] = useState(false)

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

              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-lg font-bold mb-4">建立專案</h2>
                <form>
                  <input type="text" placeholder="專案名稱" className="border p-2 w-full mb-4" />
                  <textarea placeholder="專案描述" className="border p-2 w-full mb-4" />
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                      取消
                    </Button>
                    <Button type="submit">建立</Button>
                  </div>
                </form>
              </Modal>

              <input
                type="text"
                placeholder="關鍵字搜尋"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="border rounded text-sm font-bold bg-white focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* 表格 */}
            <div className="flex-1 overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="border-b border-zinc-300 dark:border-zinc-700">
                  <tr>
                    <th className="text-left text-[rgba(17,17,17,0.7)] px-1 py-2">名稱</th>
                    <th className="text-left text-[rgba(17,17,17,0.7)] px-1 py-2">說明</th>
                    <th className="text-left text-[rgba(17,17,17,0.7)] px-1 py-2">建立日期</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project._id} className="border-b border-gray-200 hover:bg-gray-50">
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

          <div className="flex flex-col rounded-md border border-[rgba(0,113,140,0.3)] dark:border-[rgba(250,250,250,0.12)]"></div>
        </Split>
      </div>
    </div>
  )
}
