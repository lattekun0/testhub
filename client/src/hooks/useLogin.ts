import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const login = () => {
    if (!email || !password) {
      setError('請輸入帳號或密碼')
      return
    }

    if (email === 'admin' && password === '1234') {
      setError('')
      navigate('/dashboard')
    } else {
      setError('帳號或密碼錯誤')
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
