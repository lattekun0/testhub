import { PanelLeftClose, PanelRightClose } from 'lucide-react'

interface CollapseToggleButtonProps {
  id: string
  selected: boolean
  hovered: boolean
  onToggle: (id: string, newSelected: boolean) => void // 通知父層切換狀態
}

export default function CollapseToggleButton({
  id,
  selected,
  hovered,
  onToggle,
}: CollapseToggleButtonProps) {
  if (!selected && !hovered) return null

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggle(id, !selected) // 把新的狀態通知給父層
  }

  return (
    <div
      title={selected ? '收合' : '展開'}
      className="inline-flex items-center justify-center rounded
                 bg-[rgba(115,183,200,0.5)] hover:bg-[rgba(87,170,194,0.9)]
                 dark:bg-[rgba(0,113,140,0.7)] dark:hover:bg-[rgba(53,156,182,0.95)]
                 transition-colors cursor-pointer p-1"
      onClick={handleClick}
    >
      {selected ? <PanelLeftClose size={15} /> : <PanelRightClose size={15} />}
    </div>
  )
}
