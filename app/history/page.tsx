"use client"

import Header from "@/components/header"
import { useState, useEffect } from "react"
import { StorageManager } from "@/lib/storage"
import ConfirmationDialog from "@/components/confirmation-dialog"
import NotificationPopup from "@/components/notification-popup"
import { DeleteIcon } from "@/components/icons"

export default function HistoryPage() {
  const [history, setHistory] = useState<any[]>([])
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [notification, setNotification] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadedHistory = StorageManager.getScanHistory()
    setHistory(loadedHistory)
    setIsLoaded(true)
  }, [])

  const handleClearHistory = () => {
    StorageManager.clearHistory()
    setHistory([])
    setShowConfirmation(false)
    setNotification({
      message: "Scan history cleared successfully",
      type: "success",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="border-2 border-border rounded-lg p-8 bg-card/20 backdrop-blur">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold glow-accent font-mono">SCAN HISTORY</h1>
            <button
              onClick={() => setShowConfirmation(true)}
              disabled={history.length === 0}
              className={`py-2 px-4 font-mono font-bold rounded flex items-center gap-2 transition-colors ${
                history.length === 0
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-destructive text-black hover:shadow-lg hover:shadow-destructive/50"
              }`}
            >
              <DeleteIcon /> Clear History
            </button>
          </div>

          {notification && (
            <NotificationPopup
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}

          {isLoaded ? (
            history.length > 0 ? (
              <div className="space-y-4">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="border border-border rounded-lg p-4 hover:border-accent transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono font-bold text-foreground">{item.fileName}</p>
                        <p className="text-xs text-muted-foreground mt-1">Scanned on {item.timestamp}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm font-mono font-bold ${item.threat ? "text-destructive" : "text-accent"}`}
                        >
                          {item.status}
                        </span>
                        <div className="text-right">
                          <span className="text-xs font-mono text-muted-foreground">
                            {(item.fileSize / 1024).toFixed(2)} KB
                          </span>
                          <p className={`text-xs font-mono ${item.threat ? "text-destructive" : "text-accent"}`}>
                            Risk: {item.riskScore}/100
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground font-mono">No scans performed yet</p>
              </div>
            )
          ) : null}

          <div className="mt-8 p-4 border border-muted rounded bg-muted/20 text-center">
            <p className="text-sm text-muted-foreground font-mono">
              {history.length} total scans • {history.filter((h) => h.threat).length} threats detected
            </p>
          </div>
        </div>

        <ConfirmationDialog
          isOpen={showConfirmation}
          title="Clear Scan History?"
          message="This will permanently delete all scan records from your local storage. This action cannot be undone."
          confirmText="Clear All"
          cancelText="Cancel"
          isDangerous={true}
          onConfirm={handleClearHistory}
          onCancel={() => setShowConfirmation(false)}
        />
      </main>
    </div>
  )
}
