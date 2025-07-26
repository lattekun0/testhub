import { useState } from 'react'
import { Eye, EyeClosed } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PasswordInputProps {
  label?: string
  value: string
  onChange: (value: string) => void
  id?: string
  placeholder?: string
}

export default function PasswordInput({
  label = '密碼',
  value,
  onChange,
  id = 'password',
  placeholder = '輸入密碼',
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </button>
      </div>
    </div>
  )
}
