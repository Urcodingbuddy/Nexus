"use client"

import { AlertIcon } from "./icons"

interface ConfirmationDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  isDangerous?: boolean
}

export default function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDangerous = false,
}: ConfirmationDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card border-2 border-border rounded-lg p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex items-start gap-4 mb-6">
          <div className={isDangerous ? "text-destructive" : "text-accent"}>
            <AlertIcon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="font-mono font-bold text-lg text-foreground mb-2">{title}</h2>
            <p className="text-sm text-muted-foreground font-mono">{message}</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2 px-4 font-mono text-sm font-bold rounded border-2 border-accent text-accent hover:bg-accent/10 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2 px-4 font-mono text-sm font-bold rounded transition-colors ${
              isDangerous
                ? "bg-destructive text-black hover:shadow-lg hover:shadow-destructive/50"
                : "bg-accent text-black hover:shadow-lg hover:shadow-accent/50"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
