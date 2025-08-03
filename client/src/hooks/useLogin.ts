import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

export default function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const login = async () => {
    if (!email || !password) {
      setError('請輸入帳號或密碼')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token)
        useAuthStore.getState().setUser(data.user)
        setError('')
        navigate('/app/dashboard')
      } else {
        setError(data.message || '帳號或密碼錯誤')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('伺服器錯誤，請稍後再試')
    } finally {
      setLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    login,
    loading,
  }
}
