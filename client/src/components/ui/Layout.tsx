import Navbar from './Navbar'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useProjectStore } from '@/stores/projectStore'

export default function AppLayout() {
  const fetchProjects = useProjectStore((s) => s.fetchProjects)

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  return (
    <div className="flex flex-col h-screen bg-[#00718c2b] dark:bg-[rgba(10,10,10,0.56)]">
      <Navbar />

      <div className="flex flex-1 p-2 gap-2">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  )
}
