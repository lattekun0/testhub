import { useRef, useState } from 'react'
import { UserRound, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AvatarUploader() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageUrl(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const triggerFileInput = () => {
    // 使用 setTimeout 確保點擊事件穩定傳遞
    setTimeout(() => {
      inputRef.current?.click()
    }, 0)
  }

  return (
    <div className="flex items-center gap-4">
      {/* 頭像區塊 */}
      <div
        className="w-20 h-20 rounded-full bg-[#00718c33] dark:bg-[#00718ccf] flex items-center justify-center cursor-pointer overflow-hidden"
        onClick={triggerFileInput}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="頭像" className="object-cover w-full h-full" />
        ) : (
          <UserRound className="w-10 h-10 text-black dark:text-white" />
        )}
      </div>

      {/* 上傳/移除按鈕 */}
      <div>
        {imageUrl ? (
          <Button
            variant="destructive"
            size="sm"
            onClick={handleRemoveImage}
            className="cursor-pointer"
          >
            <X className="w-4 h-4 mr-1" />
            移除圖片
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={triggerFileInput}
            className="text-black dark:text-white bg-[#00718c33] dark:bg-[#00718ccf] cursor-pointer"
          >
            上傳
          </Button>
        )}
      </div>

      {/* 隱藏 input 放在最後，避免事件打斷 */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  )
}
