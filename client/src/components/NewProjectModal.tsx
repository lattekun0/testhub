import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import { useState } from 'react'
import { FilePlus2 } from 'lucide-react'
import PanelHeader from './ui/PanelHeader'

interface NewProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (data: { name: string; description: string }) => void
  loading?: boolean
  error?: string | null
}

export default function NewProjectModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  error,
}: NewProjectModalProps) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isExpand, setIsExpand] = useState(false)
  const inputClass = 'border p-0.5 w-full mb-4 dark:bg-[rgba(10,10,10,0.56)]'

  const resetForm = () => {
    setName('')
    setDescription('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit({ name, description })
    }
    resetForm()
    onClose()
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} isExpand={isExpand} onClose={onClose}>
      <PanelHeader
        title="建立新專案"
        titleIcon={<FilePlus2 size={20} />}
        isExpand={isExpand}
        onToggleExpand={() => setIsExpand(!isExpand)}
        onClose={onClose}
      />

      <form className="flex flex-col justify-between text-sm" onSubmit={handleSubmit}>
        <div className="p-3">
          <label htmlFor="name">
            名稱<span className="pl-0.5 text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="專案名稱"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
          />

          <label htmlFor="description">描述</label>
          <textarea
            id="description"
            placeholder="輸入您的專案簡短描述"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
          />

          {error && <p className="text-red-500 mb-2">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 p-3 bg-[rgba(0,113,140,0.05)] dark:bg-[rgb(40,40,40)]">
          <Button
            type="submit"
            variant={name.trim() ? 'green' : 'gray'}
            disabled={!name.trim() || loading}
          >
            {loading ? '建立中...' : '建立'}
          </Button>
          <Button type="button" variant={'blue'} onClick={handleClose}>
            取消
          </Button>
        </div>
      </form>
    </Modal>
  )
}
