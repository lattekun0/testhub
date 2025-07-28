import Logo from '@/components/ui/Logo'
import DarkModeToggle from './DarkModeToggle'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
    }

    return (
      <nav className="flex items-center justify-between px-4 py-2  bg-[#08546c] text-white">
        {/* 左側：Logo + 專案選單 */}
        <div className="flex items-center gap-4">
          <Logo to="/dashboard" imgSrc="/nav-logo.svg" imgSize="w-7 rounded-md" textSize="text-xl" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="nav">
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
                Shawn <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem variant="custom">Profile</DropdownMenuItem>
              <DropdownMenuItem variant="custom" onClick={handleLogout}>
                登出
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DarkModeToggle />
        </div>
      </nav>
    )
  }
