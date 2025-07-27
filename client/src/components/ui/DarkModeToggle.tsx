import useDarkMode from '@/hooks/useDarkMode'
import { Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export default function DarkModeToggle({ className }: Props) {
  const { isDark, toggleDarkMode } = useDarkMode()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'p-2 rounded-full bg-gray-200 dark:bg-zinc-700 hover:opacity-80 transition',
        className
      )}
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </Button>
  )
}
