import { PanelRightClose, PanelLeftClose } from 'lucide-react'
import { SidebarLink } from './SidebarLink'
import { mainLinks, groupLinks, settingsLink } from './sidebar-links'
import { useSidebarStore } from '@/stores/sidebarStore'

export default function Sidebar() {
  const { collapsed, toggle } = useSidebarStore()

  return (
    <aside className={`flex flex-col justify-between ${collapsed ? 'w-16' : 'w-32'}`}>
      {/* 上方導覽區 */}
      <div className="flex flex-col gap-1 px-1 py-2">
        {mainLinks.map((link) => (
          <SidebarLink key={link.to} {...link} collapsed={collapsed} />
        ))}

        <hr className="my-1 border-zinc-300 dark:border-zinc-700" />

        {groupLinks.map((link) => (
          <SidebarLink key={link.to} {...link} collapsed={collapsed} />
        ))}
      </div>

      {/* 下方設定與收合按鈕 */}
      <div className="flex flex-col gap-1 px-1 pb-2">
        <SidebarLink {...settingsLink} collapsed={collapsed} />

        <hr className="my-1 border-zinc-300 dark:border-zinc-700" />

        <button
          aria-label="Toggle Sidebar"
          onClick={toggle}
          className="flex items-center gap-2 px-3 py-2 rounded text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          {collapsed ? <PanelRightClose size={20} /> : <PanelLeftClose size={20} />}
          {!collapsed && <span>收合</span>}
        </button>
      </div>
    </aside>
  )
}
