import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordInput from '@/components/ui/PasswordInput'
import Logo from '@/components/ui/Logo'
import { LogIn } from 'lucide-react'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import useDocumentTitle from '@/hooks/useDocumentTitle'

export default function LoginPage() {
  useDocumentTitle('登入 - Testhub')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError('請輸入帳號或密碼')
      return
    }

    if (username === 'admin' && password === '1234') {
      setError('')
      navigate('/dashboard')
    } else {
      setError('帳號或密碼錯誤')
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* 左側: 登入表單 */}
      <div className="flex-1 flex items-center justify-center bg-[#d6e7ee] dark:bg-zinc-900">
        {/* 登入卡片 */}
        <Card className="w-[350px] shadow-xl relative">
          {/* 暗色模式切換鈕 */}
          <DarkModeToggle className="absolute top-2 right-2" />

          <CardHeader>
            <Logo dynamicColor={true}/>
            <CardTitle className="text-xl">歡迎</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="grid gap-2">
                <Label htmlFor="text">帳號</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="輸入帳號"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <PasswordInput value={password} onChange={setPassword} />

              {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

              <Button className="w-full cursor-pointer" type="submit">
                <LogIn /> 登入
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* 右側: 背景圖片 */}
      <div className="flex-1 bg-[url('../public/login-bg.jpg')] bg-cover" />
    </div>
  )
}
