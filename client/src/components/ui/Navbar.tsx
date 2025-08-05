import Logo from '@/components/ui/Logo'
import DarkModeToggle from './DarkModeToggle'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, LogOut, UserPen } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'
import { UserRound } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="flex items-center justify-between px-4 py-2  bg-[#08546c] text-white">
      {/* 左側：Logo + 專案選單 */}
      <div className="flex items-center gap-4">
        <Logo
          to="/app/dashboard"
          imgSrc="/nav-logo.svg"
          imgSize="w-7 rounded-md"
          textSize="text-xl"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="nav" className='w-40'>
              Projects
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem variant="custom">Project A</DropdownMenuItem>
            <DropdownMenuItem variant="custom">Project B</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 右側：使用者選單 + 暗色切換 */}
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="nav">
              {user && user.avatar ? (
                <img src={user.avatar} alt="頭像" className="object-cover w-7 h-7 rounded-full" />
              ) : (
                <UserRound />
              )}
              {user?.name || '使用者'} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem variant="custom" onClick={() => navigate('/app/profile')}>
              <UserPen />
              個人資料
            </DropdownMenuItem>
            <DropdownMenuItem variant="custom" onClick={handleLogout}>
              <LogOut />
              登出
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DarkModeToggle />
      </div>
    </nav>
  )
}
