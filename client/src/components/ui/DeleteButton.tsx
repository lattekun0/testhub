import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { Trash2 } from 'lucide-react'

interface DeleteButtonProps {
  onDelete: () => void
  tooltip?: string
  selected: boolean
  hovered: boolean
  disabled?: boolean
}

export default function DeleteButton({
  onDelete,
  tooltip,
  selected,
  hovered,
  disabled = false,
}: DeleteButtonProps) {
  if (!selected && !hovered) return null

  const buttonClass = `inline-flex items-center justify-center rounded p-1 transition-colors
    ${
      disabled
        ? 'opacity-40 cursor-not-allowed bg-red-500/40 dark:bg-red-700/40 pointer-events-none'
        : 'bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 cursor-pointer'
    }`

  // disabled 狀態下直接渲染 div，不啟用 AlertDialog
  if (disabled) {
    return (
      <div title={tooltip} className={buttonClass}>
        <Trash2 size={15} />
      </div>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div title={tooltip} className={buttonClass}>
          <Trash2 size={15} />
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確認刪除</AlertDialogTitle>
          <AlertDialogDescription>刪除後將無法復原，確定要刪除這個專案嗎？</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="!bg-red-600 !text-white hover:!bg-red-700 dark:!bg-red-700 dark:!text-white dark:hover:!bg-red-800"
          >
            確認刪除
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
