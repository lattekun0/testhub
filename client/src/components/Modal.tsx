import React, { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="bg-white rounded shadow-lg p-6 max-w-md w-full mx-4"
          onClick={(e) => e.stopPropagation()} // 防止點擊 modal 內容區關閉
        >
          {children}
        </div>
      </div>
    </>
  )
}
