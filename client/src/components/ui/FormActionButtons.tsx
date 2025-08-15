import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'

interface FormActionButtonsProps {
  loading?: boolean
  canSubmit: boolean
  onCancel: () => void
  submitText?: string
  cancelText?: string
}

export default function FormActionButtons({
  loading = false,
  canSubmit,
  onCancel,
  submitText = '建立',
  cancelText = '取消',
}: FormActionButtonsProps) {
  return (
    <div className="flex justify-end gap-2 p-3 bg-[rgba(0,113,140,0.05)] dark:bg-[rgb(40,40,40)]">
      <Button type="submit" variant={canSubmit ? 'green' : 'gray'} disabled={!canSubmit || loading}>
        {loading ? (
          `${submitText}中...`
        ) : (
          <>
            <Save className="w-4 h-4 mr-1 shrink-0" />
            {submitText}
          </>
        )}
      </Button>

      <Button type="button" variant="blue" onClick={onCancel}>
        {cancelText}
      </Button>
    </div>
  )
}
