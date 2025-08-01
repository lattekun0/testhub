import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import PasswordInput from '@/components/ui/PasswordInput'
import { UserPlus, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import useRegister from '@/hooks/useRegister'

export default function RegisterPage() {
  useDocumentTitle('註冊 - Testhub')
  const {
    email,
    setEmail,
    name,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    register,
    loading,
  } = useRegister()

  const navigate = useNavigate()

  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl">建立您的個人帳號</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={register}>
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

          <Label htmlFor="username">使用者名稱</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={name}
            placeholder="輸入使用者名稱"
            onChange={(e) => setUsername(e.target.value)}
          />
          <PasswordInput label="密碼" value={password} onChange={setPassword} />
          <PasswordInput label="確認密碼" value={confirmPassword} onChange={setConfirmPassword} />

          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

          <Button className="w-full cursor-pointer" variant="login" type="submit">
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full" />
                建立中...
              </div>
            ) : (
              <>
                <UserPlus />
                建立帳號
              </>
            )}
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
            onClick={() => navigate('/login')}
          >
            <ChevronLeft /> 返回登入
          </Button>
        </form>
      </CardContent>
    </>
  )
}
