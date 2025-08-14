import type { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  isExpand: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, isExpand, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed top-13 left-36 bottom-0 right-0 z-50 flex justify-end">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.75)] z-0"
        onClick={onClose} // 點背景就關閉
      />

      {/* Modal 內容 */}
      <div
        className={`${isExpand ? 'flex-1' : 'w-3xl'} h-full rounded-md z-10 bg-white dark:bg-[rgb(32,32,32)] transition-all duration-300`}
        onClick={(e) => e.stopPropagation()} // 阻止點擊內容冒泡到背景
      >
        {children}
      </div>
    </div>
  )
}
