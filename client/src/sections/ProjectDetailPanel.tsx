import { useState } from 'react'
import { FolderOpenDot, Users } from 'lucide-react'
import PanelHeader from '@/components/ui/PanelHeader'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Project } from '@/types/project'
import { useUpdateProject } from '@/hooks/useUpdateProject'
import ProjectForm from '@/components/ProjectForm'
import ProjectMembers from '@/components/ProjectMembers'

type Props = {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetailPanel({ project, onClose }: Props) {
  const userId = useAuthStore((s) => s.user?._id)
  const { updateProject, saving, error } = useUpdateProject()
  const [activeTab, setActiveTab] = useState<'settings' | 'members'>('settings')

  const containerClass =
    'flex flex-col flex-1 rounded-md border border-[rgba(0,113,140,0.3)] dark:border-[rgba(250,250,250,0.12)]'

  if (!project) return null

  const isEditable =
    project.owner.toString() === userId ||
    project.members.some((m) => m.user.toString() === userId && m.role === 'admin')

  return (
    <div className={containerClass}>
      <PanelHeader title="專案" titleIcon={<FolderOpenDot size={20} />} onClose={onClose} />

      {/* Tabs */}
      <div className="flex border-b border-zinc-300 dark:border-zinc-700">
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex-1 py-2 text-sm ${
            activeTab === 'settings'
              ? 'border-b-2 border-[rgba(0,113,140,0.8)] font-bold'
              : 'text-gray-400'
          }`}
        >
          詳細設定
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`flex-1 py-2 text-sm ${
            activeTab === 'members'
              ? 'border-b-2 border-[rgba(0,113,140,0.8)] font-bold'
              : 'text-gray-400'
          }`}
        >
          <Users size={16} className="inline mr-1" />
          專案成員
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'settings' ? (
        <ProjectForm
          initialName={project.name}
          initialDescription={project.description}
          isEditable={isEditable}
          onSubmit={async (data) => {
            await updateProject(project._id, data)
          }}
          onCancel={onClose}
          loading={saving}
          error={error}
          submitText="儲存"
        />
      ) : (
        <ProjectMembers project={project} isEditable={isEditable} />
      )}
    </div>
  )
}
