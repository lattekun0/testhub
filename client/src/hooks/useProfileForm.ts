import { useEffect, useState, useCallback } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'

export function useProfileForm() {
  const user = useAuthStore((state) => state.user)

  const [name, setName] = useState(user?.name ?? '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorsMap, setErrorsMap] = useState<Record<string, string>>({})
  const [isDirty, setIsDirty] = useState(false)
  const [canSave, setCanSave] = useState(false)

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
    const changed = isNameChanged || !!newPassword || !!confirmPassword
    const noErrors = validateProfile()
    setIsDirty(changed)
    setCanSave(changed && noErrors)
  }, [name, currentPassword, newPassword, confirmPassword, user, isNameChanged, validateProfile])

  const handleSave = () => {
    if (!validateProfile()) return

    // 👉 TODO: 發送 API 更新請求
    console.log('送出資料:', { name, currentPassword, newPassword })
    setIsDirty(false)
  }

  const handleCancel = () => {
    setName(user?.name ?? '')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setErrorsMap({})
    setIsDirty(false)
  }

  return {
    name,
    currentPassword,
    newPassword,
    confirmPassword,
    errorsMap,
    canSave,
    isDirty,
    setName,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handleSave,
    handleCancel,
  }
}
