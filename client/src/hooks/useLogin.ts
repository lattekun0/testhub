import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const login = async () => {
    if (!email || !password) {
      setError('請輸入帳號或密碼')
      return
    }

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token)
        setError('')
        navigate('/dashboard')
      } else {
        setError(data.message || '帳號或密碼錯誤')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('伺服器錯誤，請稍後再試')
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    login,
  }
}
