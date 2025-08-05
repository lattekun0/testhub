import useDocumentTitle from '@/hooks/useDocumentTitle'

export default function DashboardPage() {
  useDocumentTitle('測試案例 - Testhub')

  return (
    <>
      {/* 分類資料夾 */}
      <div className="flex flex-col w-80 p-4 rounded-md bg-white dark:bg-[rgb(32,32,32)]">
        <h2 className="text-md font-bold">測試案例資料夾</h2>
        <p className="mt-2">這裡是測試案例的內容。</p>
      </div>

      {/* 測試案例項目 */}
      <div className="flex flex-col flex-1 p-4 w-4xl rounded-md bg-white dark:bg-[rgb(32,32,32)]">
        <h2 className="text-2xl font-bold">所有測試案例</h2>
        <p className="mt-2">這裡是測試案例的內容。</p>
      </div>
    </>
  )
}
