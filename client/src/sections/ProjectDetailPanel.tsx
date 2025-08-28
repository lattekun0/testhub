import { useEffect, useState } from 'react'
import { FolderOpenDot } from 'lucide-react'
import PanelHeader from '@/components/ui/PanelHeader'
import FormActionButtons from '@/components/ui/FormActionButtons'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Project } from '@/types/project'
import { useUpdateProject } from '@/hooks/useUpdateProject'

type Props = {
  project: Project | null
  onClose: () => void
}

export default function ProjectDetailPanel({ project, onClose }: Props) {
  const userId = useAuthStore((s) => s.user?._id)
  const { updateProject, saving, error } = useUpdateProject()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const containerClass =
    'flex flex-col flex-1 rounded-md border border-[rgba(0,113,140,0.3)] dark:border-[rgba(250,250,250,0.12)]'
  const inputClass = 'border p-0.5 w-full mb-4 dark:bg-[rgba(10,10,10,0.56)]'
  const labelClass = 'text-gray-400 font-bold'

  useEffect(() => {
    if (!project) return
    setName(project.name || '')
    setDescription(project.description || '')
  }, [project])

  if (!project) return null

  const isChanged = name.trim() !== project.name || description.trim() !== project.description
  const isEditable =
    project.owner.toString() === userId ||
    project.members.some((m) => m.user.toString() === userId && m.role === 'admin')
  const canSubmit = !!name.trim() && isChanged

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isChanged || !isEditable) return
    await updateProject(project._id, { name: name.trim(), description })
  }

  return (
    <div className={containerClass}>
      <PanelHeader title="專案" titleIcon={<FolderOpenDot size={20} />} onClose={onClose} />

      <form className="flex flex-col flex-1 justify-between text-sm" onSubmit={handleSubmit}>
        <div className="p-3 flex-1 overflow-y-auto">
          <label className={labelClass}>
            名稱<span className="pl-0.5 text-red-600">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditable}
            className={inputClass}
          />

          <label className={labelClass}>描述</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={!isEditable}
            className={inputClass}
          />
        </div>

        <div>
          <FormActionButtons
            loading={saving}
            canSubmit={canSubmit}
            onCancel={onClose}
            submitText="儲存"
          />
          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>
      </form>
    </div>
  )
}
