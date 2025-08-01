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
        body: JSON.stringify({ email, name, password}),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || '註冊失敗')
        return
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
