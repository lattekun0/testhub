import { Outlet } from 'react-router-dom'
import { Card } from '@/components/ui/card'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import Logo from '@/components/ui/Logo'

export default function AuthLayout() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 左側：表單卡片區塊 */}
      <div className="flex-1 flex items-center justify-center bg-[#d6e7ee] dark:bg-zinc-900">
        <Card className="w-[350px] shadow-xl relative">
          {/* 暗色模式開關 */}
          <DarkModeToggle className="absolute top-2 right-2" />

          {/* Logo */}
          <div className="px-6 pt-6">
            <Logo to="/login" />
          </div>

          {/* 子頁面內容 */}
          <Outlet />
        </Card>
      </div>

      {/* 右側背景圖片 */}
      <div className="flex-1 bg-[url('../public/login-bg.jpg')] bg-cover" />
    </div>
  )
}
