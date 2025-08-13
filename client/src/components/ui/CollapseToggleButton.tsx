import { PanelLeftClose, PanelRightClose } from 'lucide-react'

interface CollapseToggleButtonProps {
  isSelected: boolean
  isHovered: boolean
  onToggle: (projectId: string, collapse: boolean) => void
  projectId: string
}

export default function CollapseToggleButton({
  isSelected,
  isHovered,
  onToggle,
  projectId,
}: CollapseToggleButtonProps) {
  if (!isSelected && !isHovered) return null

  return (
    <div
      title={isSelected ? '收合' : '展開'}
      className="inline-flex items-center justify-center rounded
                 bg-[rgba(115,183,200,0.5)] hover:bg-[rgba(87,170,194,0.9)]
                 dark:bg-[rgba(0,113,140,0.7)] dark:hover:bg-[rgba(53,156,182,0.95)]
                 transition-colors cursor-pointer p-1"
      onClick={(e) => {
        e.stopPropagation()
        onToggle(projectId, isSelected)
      }}
    >
      {isSelected ? <PanelLeftClose size={15} /> : <PanelRightClose size={15} />}
    </div>
  )
}
