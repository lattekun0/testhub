import { useState, useEffect } from 'react'
import FormActionButtons from '@/components/ui/FormActionButtons'

type ProjectFormProps = {
  initialName?: string
  initialDescription?: string
  isEditable?: boolean
  loading?: boolean
  error?: string | null
  onSubmit: (data: { name: string; description: string }) => Promise<void> | void
  onCancel: () => void
  submitText?: string
}

export default function ProjectForm({
  initialName = '',
  initialDescription = '',
  isEditable = true,
  loading,
  error,
  onSubmit,
  onCancel,
  submitText = '建立',
}: ProjectFormProps) {
  const [name, setName] = useState(initialName)
  const [description, setDescription] = useState(initialDescription)

  useEffect(() => {
    setName(initialName)
    setDescription(initialDescription)
  }, [initialName, initialDescription])

  const inputClass = 'border p-0.5 w-full mb-4 dark:bg-[rgba(10,10,10,0.56)]'
  const labelClass = 'text-gray-400 font-bold'

  const isChanged =
    name.trim() !== initialName.trim() || description.trim() !== initialDescription.trim()
  const canSubmit = !!name.trim() && (isChanged || submitText === '建立')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit || !isEditable) return
    await onSubmit({ name: name.trim(), description })
  }

  return (
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

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div>
        <FormActionButtons
          loading={loading}
          canSubmit={canSubmit}
          onCancel={onCancel}
          submitText={submitText}
        />
      </div>
    </form>
  )
}
