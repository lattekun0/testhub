import { X, SquareArrowLeft, SquareArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

interface PanelHeaderProps {
  title: string
  titleIcon?: ReactNode
  isExpand?: boolean
  onToggleExpand?: () => void
  onClose: () => void
}

export default function PanelHeader({
  title,
  titleIcon,
  isExpand,
  onToggleExpand,
  onClose,
}: PanelHeaderProps) {
  const iconButtonClass =
    'p-1 rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-[rgba(53,156,182,0.95)]'

  return (
    <header className="relative flex p-3 items-center mb-4 bg-[rgba(0,113,140,0.05)] dark:bg-[rgb(40,40,40)]">
      {onToggleExpand && (
        <button
          type="button"
          onClick={onToggleExpand}
          className={iconButtonClass}
          title={isExpand ? '收合' : '展開'}
        >
          {isExpand ? <SquareArrowRight size={20} /> : <SquareArrowLeft size={20} />}
        </button>
      )}

      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1">
        {titleIcon && <span>{titleIcon}</span>}
        <h2 className="text-lg font-bold">{title}</h2>
      </div>

      <button className={iconButtonClass + ' ml-auto'} onClick={onClose} title="關閉">
        <X size={20} />
      </button>
    </header>
  )
}
