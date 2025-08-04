import useDocumentTitle from '@/hooks/useDocumentTitle'
import { SquareUserIcon, CircleUserRound, KeyIcon, Save } from 'lucide-react'
import ProfileSection from '@/components/ui/ProfileSection'
import AvatarUploader from '@/components/ui/AvatarUploader'
import PasswordInput from '@/components/ui/PasswordInput'
import { Button } from '@/components/ui/button'
import { useProfileForm } from '@/hooks/useProfileForm'

export default function ProfilePage() {
  useDocumentTitle('個人資料 - Testhub')
  const {
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
  } = useProfileForm()

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="p-4">
        <h2 className="text-2xl font-bold">我的個人資料</h2>

        <hr className="my-1 border-zinc-300 dark:border-zinc-700" />

        <ProfileSection
          icon={<SquareUserIcon />}
          title="個人照片"
          description="為您的帳戶上傳個人檔案照片。"
        >
          <AvatarUploader avatar={avatar} onChange={setAvatar}/>
        </ProfileSection>

        <ProfileSection
          icon={<CircleUserRound />}
          title="顯示名稱"
          description="更改您的顯示名稱。"
        >
          <div>
            <label htmlFor="name" className="text-sm fon text-zinc-500 dark:text-zinc-400">
              顯示名稱
            </label>
            <input
              id="name"
              type="text"
              className="border rounded px-1 py-0.5 w-full dark:bg-[rgb(16,16,16)]"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </div>
        </ProfileSection>

        <ProfileSection icon={<KeyIcon />} title="修改密碼" description="更改您的密碼。">
          <div className="space-y-3">
            <PasswordInput
              id="currentPassword"
              value={currentPassword}
              onChange={setCurrentPassword}
              label="當前密碼"
              placeholder="當前密碼"
            />
            {errorsMap.currentPassword && (
              <p className="text-sm text-red-500 mt-1">{errorsMap.currentPassword}</p>
            )}

            <PasswordInput
              id="newPassword"
              value={newPassword}
              onChange={setNewPassword}
              label="新密碼"
              placeholder="新密碼"
            />
            {errorsMap.newPassword && (
              <p className="text-sm text-red-500 mt-1">{errorsMap.newPassword}</p>
            )}

            {newPassword.length >= 4 && (
              <PasswordInput
                id="confirmPassword"
                value={confirmPassword}
                onChange={setConfirmPassword}
                label="重複新密碼"
                placeholder="再次輸入新密碼"
              />
            )}
            {errorsMap.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errorsMap.confirmPassword}</p>
            )}
          </div>
        </ProfileSection>
      </div>

      <div>
        <div className="flex p-3 gap-2 bg-[rgba(0,113,140,0.05)] dark:bg-[rgb(40,40,40)]">
          <Button
            onClick={handleSave}
            disabled={!canSave}
            className={`w-18 h-6 rounded cursor-pointer ${canSave ? 'bg-[rgb(0,177,144)] text-white' : 'text-gray-900 dark:text-white dark:bg-[rgb(64,64,64)]'}`}
          >
            <Save />
            儲存
          </Button>

          <Button
            onClick={handleCancel}
            disabled={!isDirty}
            className={`w-12 h-6 rounded cursor-pointer ${isDirty ? 'bg-[rgba(0,113,140,0.3)] text-white' : 'text-gray-900 dark:text-white dark:bg-[rgb(64,64,64)]'}`}
          >
            取消
          </Button>
        </div>
      </div>
    </div>
  )
}
