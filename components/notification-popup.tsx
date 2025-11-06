"use client"

import { useEffect, useState } from "react"
import { AlertIcon, CheckIcon } from "./icons"

interface NotificationProps {
  message: string
  type: "success" | "error" | "warning" | "info"
  duration?: number
  onClose?: () => void
}

export default function NotificationPopup({ message, type, duration = 3000, onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  if (!isVisible) return null

  const bgColor = {
    success: "bg-green-500/20 border-green-500/50",
    error: "bg-red-500/20 border-red-500/50",
    warning: "bg-yellow-500/20 border-yellow-500/50",
    info: "bg-blue-500/20 border-blue-500/50",
  }

  const textColor = {
    success: "text-green-400",
    error: "text-red-400",
    warning: "text-yellow-400",
    info: "text-blue-400",
  }

  const icon = {
    success: <CheckIcon className="w-5 h-5" />,
    error: <AlertIcon className="w-5 h-5" />,
    warning: <AlertIcon className="w-5 h-5" />,
    info: <AlertIcon className="w-5 h-5" />,
  }

  return (
    <div
      className={`fixed top-4 right-4 border rounded-lg p-4 flex items-center gap-3 z-50 ${bgColor[type]} animate-in fade-in slide-in-from-top-2 duration-300`}
    >
      <div className={textColor[type]}>{icon[type]}</div>
      <p className={`font-mono text-sm ${textColor[type]}`}>{message}</p>
    </div>
  )
}
