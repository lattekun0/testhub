import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useRegister() {
  const [email, setEmail] = useState('')
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const register = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!email || !name || !password || !confirmPassword) {
        setError('請填寫所有欄位')
        return
      }

      if (password !== confirmPassword) {
        setError('兩次密碼不一致')
        return
      }

      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || '註冊失敗')
        return
      }

      const userId = data?.user?._id
      if (!userId) {
        setError('無法取得使用者資料')
        return
      }

      // 建立預設專案
      const projectRes = await fetch('http://localhost:4000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'My First Project',
          description: '這是你的第一個專案',
          owner: userId,
        }),
      })

      if (!projectRes.ok) {
        const projectError = await projectRes.json()
        console.error('建立預設專案失敗:', projectError.message)
        // 不擋住註冊流程，僅顯示錯誤
      }

      navigate('/login')
    } catch (err) {
      console.error('Register error:', err)
      setError('伺服器錯誤，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    name,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    loading,
    register,
  }
}
