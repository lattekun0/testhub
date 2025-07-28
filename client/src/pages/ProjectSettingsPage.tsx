import useDocumentTitle from '@/hooks/useDocumentTitle'

export default function ProjectSettingsPage() {
  useDocumentTitle('測試案例 - Testhub')

  return (
    <div>
      <h1 className="text-2xl font-bold">專案設定</h1>
      <p className="mt-2">這裡是專案設定的內容。</p>
    </div>
  )
}
