import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordInput from '@/components/ui/PasswordInput'
import { LogIn, Mail } from 'lucide-react'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useLogin from '@/hooks/useLogin'
import { useNavigate  } from 'react-router-dom'

export default function LoginPage() {
  useDocumentTitle('登入 - Testhub')

  const { email, setEmail, password, setPassword, error, login, loading } = useLogin()
  const navigate = useNavigate();

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">歡迎</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            login()
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="輸入 Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <PasswordInput value={password} onChange={setPassword} />

          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

          <Button className="w-full cursor-pointer" variant="login" type="submit">
            <LogIn /> {loading ? '登入中' : '登入'}
          </Button>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-zinc-300 dark:border-zinc-700" />
            <span className="mx-2 text-sm text-zinc-500 dark:text-white">或</span>
            <hr className="flex-grow border-t border-zinc-300 dark:border-zinc-700" />
          </div>

          <Button
            className="w-1/2 cursor-pointer"
            variant="login"
            type="button"
            onClick={() => navigate('/register')}
          >
            <Mail /> 使用 Email 註冊
          </Button>
        </form>
      </CardContent>
    </>
  )
}
