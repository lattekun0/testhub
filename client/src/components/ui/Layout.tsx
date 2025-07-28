import Navbar from "./Navbar"
import Sidebar from "./Sidebar/Sidebar"
import { Outlet } from "react-router-dom"

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 bg-muted/30">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
