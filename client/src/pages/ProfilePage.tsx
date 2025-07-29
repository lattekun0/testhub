import useDocumentTitle from '@/hooks/useDocumentTitle'

export default function ProfilePage() {
  useDocumentTitle('個人資料 - Testhub')

  return (
    <div>
      <h1 className="text-2xl font-bold">個人資料</h1>
      <p className="mt-2">這裡是個人資料的內容。</p>
    </div>
  )
}
