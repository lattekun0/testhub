import Navbar from './Navbar'
import Sidebar from './Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#00718c2b] dark:bg-[rgba(10,10,10,0.56)]">
      <Navbar />

      <div className="flex flex-1 p-2">
        <Sidebar />
        <main className="flex-1 rounded-md bg-white dark:bg-[rgb(32,32,32)]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
