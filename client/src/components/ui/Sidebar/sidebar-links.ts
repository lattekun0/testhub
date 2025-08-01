import { LayoutDashboard, FileText, Folder, PlayCircle, Settings } from 'lucide-react'

export type SidebarLinkItem = {
  name: string
  to: string
  icon: React.ElementType
}

export const mainLinks: SidebarLinkItem[] = [
  { name: '儀表板', to: '/app/dashboard', icon: LayoutDashboard },
]

export const groupLinks: SidebarLinkItem[] = [
  { name: '測試案例', to: '/app/test-cases', icon: FileText },
  { name: '測試計劃', to: '/app/test-plans', icon: Folder },
  { name: '測試執行', to: '/app/test-runs', icon: PlayCircle },
]

export const settingsLink: SidebarLinkItem = {
  name: '專案設定',
  to: '/app/settings',
  icon: Settings,
}