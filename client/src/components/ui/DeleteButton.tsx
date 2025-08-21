import { Trash2 } from 'lucide-react'

interface DeleteButtonProps {
  onDelete: () => void
  disabled?: boolean
  size?: number
  tooltip?: string
  selected: boolean
  hovered: boolean
}

export default function DeleteButton({
  onDelete,
  disabled = false,
  size = 15,
  tooltip = '刪除',
  selected,
  hovered
}: DeleteButtonProps) {
  if (!selected && !hovered) return null
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation() // 避免觸發父層 click
    if (!disabled) onDelete()
  }

  return (
    <div
      title={tooltip}
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center rounded p-1
        transition-colors cursor-pointer
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-red-100 dark:hover:bg-red-800'}
      `}
    >
      <Trash2 size={size} className="text-red-600 dark:text-red-400" />
    </div>
  )
}
