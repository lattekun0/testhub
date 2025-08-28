import useDocumentTitle from '@/hooks/useDocumentTitle'
import Split from 'react-split'
import { useState, useMemo, useCallback } from 'react'
import { useProjectStore } from '@/stores/projectStore'
import ProjectListSection from '@/sections/ProjectListSection'
import ProjectDetailPanel from '@/sections/ProjectDetailPanel'

export default function ProjectSettingsPage() {
  useDocumentTitle('測試案例 - Testhub')

  const projects = useProjectStore((s) => s.projects)

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const selectedProject = useMemo(
    () => projects.find((p) => p._id === selectedProjectId) ?? null,
    [projects, selectedProjectId]
  )

  const handleClose = useCallback(() => setSelectedProjectId(null), [])

  return (
    <div className="flex-1 flex flex-col px-3 rounded-md bg-white dark:bg-[rgb(32,32,32)] h-full">
      <h2 className="text-xl font-bold py-3">專案設定</h2>
      <hr className="border-zinc-300 dark:border-zinc-700" />

      <div className="flex-1 flex flex-col mt-1 py-2">
        {selectedProject ? (
          <Split className="flex flex-1" sizes={[60, 40]} minSize={0}>
            <ProjectListSection
              selectedProjectId={selectedProjectId}
              setSelectedProjectId={setSelectedProjectId}
            />
            <ProjectDetailPanel project={selectedProject} onClose={handleClose} />
          </Split>
        ) : (
          <ProjectListSection
            selectedProjectId={selectedProjectId}
            setSelectedProjectId={setSelectedProjectId}
          />
        )}
      </div>
    </div>
  )
}
