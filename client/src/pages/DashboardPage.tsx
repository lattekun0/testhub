import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useProjectStore } from '@/stores/projectStore'

export default function DashboardPage() {
  useDocumentTitle('儀錶板 - Testhub')

  const currentProject = useProjectStore((s) => s.currentProject)

  return (
    <>
      <h1>儀表板</h1>
      <p>目前專案：{currentProject?.name}</p>
    </>
  )
}
