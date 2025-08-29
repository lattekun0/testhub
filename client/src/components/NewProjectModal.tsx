import Modal from '@/components/Modal'
import { useState } from 'react'
import { FilePlus2 } from 'lucide-react'
import PanelHeader from './ui/PanelHeader'
import ProjectForm from './ProjectForm'

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
  const [isExpand, setIsExpand] = useState(false)

  return (
    <Modal isOpen={isOpen} isExpand={isExpand} onClose={onClose}>
      <PanelHeader
        title="建立新專案"
        titleIcon={<FilePlus2 size={20} />}
        isExpand={isExpand}
        onToggleExpand={() => setIsExpand(!isExpand)}
        onClose={onClose}
      />
      <ProjectForm
        onSubmit={async (data) => {
          if (onSubmit) onSubmit(data)
          onClose()
        }}
        onCancel={onClose}
        loading={loading}
        error={error}
        submitText="建立"
      />
    </Modal>
  )
}
