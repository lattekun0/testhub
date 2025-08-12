import { FilePlus2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal'
import { useState } from 'react'

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
    <Modal isOpen={isOpen} onClose={onClose}>
      <header className="relative flex items-center mb-4">
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1">
          <FilePlus2 size={20} />
          <h2 className="text-lg font-bold">建立新專案</h2>
        </div>

        <X className="ml-auto cursor-pointer" onClick={onClose} />
      </header>

      <form className="text-sm" onSubmit={handleSubmit}>
        <label htmlFor="name">
          名稱<span className="pl-0.5 text-red-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="專案名稱"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-0.5 w-full mb-4 dark:bg-[rgba(10,10,10,0.56)]"
        />

        <label htmlFor="description">描述</label>
        <textarea
          id="description"
          placeholder="輸入您的專案簡短描述"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-0.5 w-full mb-4 dark:bg-[rgba(10,10,10,0.56)]"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="flex justify-end gap-2">
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
