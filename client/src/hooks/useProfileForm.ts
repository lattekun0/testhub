import { useEffect, useState, useCallback } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'

export function useProfileForm() {
  const { user, setUser } = useAuthStore()

  const [avatar, setAvatar] = useState(user?.avatar ?? '')
  const [name, setName] = useState(user?.name ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorsMap, setErrorsMap] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [canSave, setCanSave] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const isAvatarChanged = avatar !== (user?.avatar ?? '')
  const isNameChanged = name !== (user?.name ?? '')

  const validateProfile = useCallback(() => {
    const errors: Record<string, string> = {}

    if (newPassword) {
      if (!currentPassword) {
        errors.currentPassword = '請輸入當前密碼'
      }
      if (newPassword === currentPassword) {
        errors.newPassword = '新密碼不能與當前密碼相同'
      }
      if (newPassword.length < 4) {
        errors.newPassword = '新密碼長度需至少 4 碼'
      }
      if (newPassword.length >= 4 && confirmPassword !== newPassword) {
        errors.confirmPassword = '新密碼與重複新密碼不一致'
      }
    }

    setErrorsMap(errors)
    return Object.keys(errors).length === 0
  }, [currentPassword, newPassword, confirmPassword])

  useEffect(() => {
    const changed = isAvatarChanged || isNameChanged || !!newPassword || !!confirmPassword
    const noErrors = validateProfile()
    setIsDirty(changed)
    setCanSave(changed && noErrors)
  }, [
    avatar,
    name,
    currentPassword,
    newPassword,
    confirmPassword,
    user,
    isAvatarChanged,
    isNameChanged,
    validateProfile,
  ])

  const handleCancel = () => {
    setAvatar(user?.avatar ?? '')
    setName(user?.name ?? '')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setErrorsMap({})
    setIsDirty(false)
    setIsSaving(false)
  }

  const handleSave = async () => {
    if (isSaving) return
    setIsSaving(true)

    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://localhost:4000/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ avatar, name, currentPassword, newPassword }),
      })

      if (!res.ok) {
        const { message } = await res.json()
        throw new Error(message || '更新失敗')
      }

      const data = await res.json()
      setUser(data)
    } catch (err) {
      console.error('更新失敗:', err)
      alert(err instanceof Error ? err.message : '更新資料時發生錯誤')
    } finally {
      handleCancel()
    }
  }
  return {
    avatar,
    name,
    currentPassword,
    newPassword,
    confirmPassword,
    errorsMap,
    canSave,
    isDirty,
    setAvatar,
    setName,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handleSave,
    handleCancel,
  }
}
