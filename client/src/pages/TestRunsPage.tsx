import useDocumentTitle from '@/hooks/useDocumentTitle'

export default function DashboardPage() {
  useDocumentTitle('測試執行 - Testhub')

  return (
    <div>
      <h1 className="text-2xl font-bold">測試執行</h1>
      <p className="mt-2">這裡是測試執行的內容。</p>
    </div>
  )
}
