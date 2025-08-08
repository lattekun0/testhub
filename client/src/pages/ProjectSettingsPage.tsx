import useDocumentTitle from '@/hooks/useDocumentTitle'
import Split from 'react-split'

export default function ProjectSettingsPage() {
  useDocumentTitle('測試案例 - Testhub')

  return (
    <div className="flex-1 p-4 rounded-md bg-white dark:bg-[rgb(32,32,32)]">
      <h2 className="text-xl font-bold">專案設定</h2>
      <hr className="my-1 border-zinc-300 dark:border-zinc-700" />
      <div className="flex flex-col justify-between h-full">
        <Split className="flex py-2" sizes={[60, 40]} minSize={[50, 100]}>
          <div className="flex flex-col flex-1 rounded-md border-2"></div>
          <div className="flex flex-col flex-1 rounded-md border-2"></div>
        </Split>
      </div>
    </div>
  )
}
