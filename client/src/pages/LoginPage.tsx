import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordInput from '@/components/ui/PasswordInput'

export default function LoginPage() {
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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900">
      <Card className="w-[350px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-center">登入</CardTitle>
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

            <Button className="w-full" type="submit">
              登入
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
