import type { ReactNode } from 'react'

interface ProfileSectionProps {
  icon: ReactNode
  title: string
  description?: string
  children?: ReactNode
}

export default function ProfileSection({
  icon,
  title,
  description,
  children,
}: ProfileSectionProps) {
  return (
    <div className="flex gap-3 py-3 border-b border-zinc-300 dark:border-zinc-700">
      {/* 左側 Icon */}
      <div className=" text-zinc-700 dark:text-white shrink-0">{icon}</div>

      {/* 右側內容 */}
      <div className="flex flex-col gap-2 text-zinc-800 dark:text-white w-full">
        {/* 標題 */}
        <h3 className="text-base font-semibold">{title}</h3>

        <div className="flex py-5">
          {/* 說明 */}
          <div className="min-w-60">
            {description && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
            )}
          </div>
          {/* 放置功能元件 */}
          {children}
        </div>
      </div>
    </div>
  )
}
