import Logo from '@/components/ui/Logo'
import DarkModeToggle from './DarkModeToggle'
import { Button } from './button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2  bg-[#08748c] text-white">
      {/* 左側：Logo + 專案選單 */}
      <div className="flex items-center gap-4">
        <Logo to="/dashboard" imgSize="w-7" textSize="text-xl" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">Projects ▼</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Project A</DropdownMenuItem>
            <DropdownMenuItem>Project B</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 右側：使用者選單 + 暗色切換 */}
      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">Shawn ▼</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DarkModeToggle />
      </div>
    </nav>
  )
}
