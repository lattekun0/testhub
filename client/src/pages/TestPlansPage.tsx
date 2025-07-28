import useDocumentTitle from '@/hooks/useDocumentTitle'

export default function DashboardPage() {
  useDocumentTitle('測試計劃 - Testhub')

  return (
     <div>
      <h1 className="text-2xl font-bold">測試計劃</h1>
      <p className="mt-2">這裡是測試計劃的內容。</p>
    </div>
  )
}
