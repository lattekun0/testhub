import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Folder,
  FileText,
  PlayCircle,
  Settings,
  Menu,
  ChevronLeft,
} from 'lucide-react'

const mainLinks = [{ name: '儀表板', to: '/dashboard', icon: LayoutDashboard }]

const groupLinks = [
  { name: '測試案例', to: '/Test-cases', icon: FileText },
  { name: '測試計劃', to: '/Test-plans', icon: Folder },
  { name: '測試執行', to: '/Test-runs', icon: PlayCircle },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`flex flex-col justify-between bg-white dark:bg-[#181414] 
         ${collapsed ? 'w-16' : 'w-32'} cursor-pointer`}
    >
      {/* 上方導覽區 */}
      <div className="flex flex-col gap-1 px-1 py-2">
        {mainLinks.map(({ name, to, icon: Icon }) => (
          <SidebarLink key={to} to={to} name={name} icon={Icon} collapsed={collapsed} />
        ))}

        <hr className="my-1 border-zinc-300 dark:border-zinc-700" />

        {groupLinks.map(({ name, to, icon: Icon }) => (
          <SidebarLink key={to} to={to} name={name} icon={Icon} collapsed={collapsed} />
        ))}
      </div>

      {/* 下方設定與摺疊 */}
      <div className="flex flex-col gap-1 px-1 pb-2">
        <SidebarLink to="/settings" name="專案設定" icon={Settings} collapsed={collapsed} />
        <hr className="my-1 border-zinc-300 dark:border-zinc-700" />
        <button
          onClick={(e) => {
            e.stopPropagation()
            setCollapsed(!collapsed)
          }}
          className="flex items-center gap-2 px-3 py-2 rounded text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
          {!collapsed && <span>收合</span>}
        </button>
      </div>
    </aside>
  )
}

function SidebarLink({ to, name, icon: Icon, collapsed }: any) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 px-3 py-2 rounded text-sm font-bold transition-colors',
          'hover:bg-zinc-100 dark:hover:bg-zinc-800',
          'text-zinc-700 dark:text-zinc-300',
          isActive && 'bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white',
          isActive &&
            'before:content-[""] before:absolute before:left-0 before:top-1 before:bottom-1 before:w-1 before:rounded-sm before:bg-cyan-400'
        )
      }
    >
      <Icon
        size={20}
        className={cn(
          'transition-colors duration-150',
          'text-muted-foreground dark:text-cyan-400',
          'group-hover:text-white',
          'group-[.active]:text-white'
        )}
      />
      {!collapsed && <span>{name}</span>}
    </NavLink>
  )
}
