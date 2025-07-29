import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function useRegister() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || !confirmPassword) {
      setError('請填寫所有欄位')
      return
    }

    if (password !== confirmPassword) {
      setError('兩次密碼不一致')
      return
    }

    // TODO: 改成真正的註冊 API
    setError('')
    navigate('/dashboard')
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    handleRegister,
  }
}
