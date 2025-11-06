"use client"

import Header from "@/components/header"
import { useState, useEffect } from "react"
import { StorageManager } from "@/lib/storage"
import NotificationPopup from "@/components/notification-popup"
import { SettingsIcon } from "@/components/icons"

export default function SettingsPage() {
  const [settings, setSettings] = useState(StorageManager.getSettings())
  const [notification, setNotification] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const loadedSettings = StorageManager.getSettings()
    setSettings(loadedSettings)
    setIsLoaded(true)
  }, [])

  const toggleSetting = (key: keyof typeof settings) => {
    const newSettings = { ...settings, [key]: !settings[key] }

    if (key === "quickScan") {
      newSettings.deepScan = !newSettings.quickScan
      newSettings.scanMode = newSettings.quickScan ? "quick" : "deep"
    } else if (key === "deepScan") {
      newSettings.quickScan = !newSettings.deepScan
      newSettings.scanMode = newSettings.deepScan ? "deep" : "quick"
    }

    setSettings(newSettings)
    StorageManager.saveSettings(newSettings)

    // Show notification
    const feature = key
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLowerCase()
    setNotification({
      message: `${feature} ${newSettings[key] ? "enabled" : "disabled"}`,
      type: "success",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="border-2 border-border rounded-lg p-8 bg-card/20 backdrop-blur">
          <h1 className="text-3xl font-bold glow-accent mb-8 font-mono flex items-center gap-3">
            <SettingsIcon /> SETTINGS
          </h1>

          {notification && (
            <NotificationPopup
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification(null)}
            />
          )}

          {isLoaded && (
            <div className="space-y-6">
              {/* Scan Settings */}
              <div className="border-b border-border pb-6">
                <h2 className="text-lg font-mono font-bold mb-4 text-accent">SCAN SETTINGS</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent transition-colors">
                    <div>
                      <p className="font-mono font-bold text-foreground">Auto-Scan on Upload</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Automatically scan files when they are uploaded
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSetting("autoScan")}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.autoScan ? "bg-accent" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-card transition-transform ${
                          settings.autoScan ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent transition-colors">
                    <div>
                      <p className="font-mono font-bold text-foreground">Enable Notifications</p>
                      <p className="text-xs text-muted-foreground mt-1">Receive alerts for scan results</p>
                    </div>
                    <button
                      onClick={() => toggleSetting("enableNotifications")}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.enableNotifications ? "bg-accent" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-card transition-transform ${
                          settings.enableNotifications ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Scan Type */}
              <div className="border-b border-border pb-6">
                <h2 className="text-lg font-mono font-bold mb-4 text-accent">SCAN TYPE</h2>
                <p className="text-xs text-muted-foreground font-mono mb-4">
                  Select your preferred scanning mode. Quick scan is faster, deep scan is more thorough.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent transition-colors">
                    <div>
                      <p className="font-mono font-bold text-foreground">Quick Scan</p>
                      <p className="text-xs text-muted-foreground mt-1">Fast signature-based scanning (~1-2 seconds)</p>
                    </div>
                    <button
                      onClick={() => toggleSetting("quickScan")}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.quickScan ? "bg-accent" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-card transition-transform ${
                          settings.quickScan ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-accent transition-colors">
                    <div>
                      <p className="font-mono font-bold text-foreground">Deep Scan</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Comprehensive analysis including content inspection (~2-3 seconds)
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSetting("deepScan")}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.deepScan ? "bg-accent" : "bg-muted"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-card transition-transform ${
                          settings.deepScan ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* System Info */}
              <div>
                <h2 className="text-lg font-mono font-bold mb-4 text-accent">SYSTEM INFORMATION</h2>
                <div className="space-y-2 p-4 border border-border rounded-lg bg-muted/10">
                  <div className="flex justify-between">
                    <span className="text-sm font-mono text-muted-foreground">Version:</span>
                    <span className="text-sm font-mono text-foreground">2.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-mono text-muted-foreground">Status:</span>
                    <span className="text-sm font-mono text-accent">ACTIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-mono text-muted-foreground">Scan Mode:</span>
                    <span className="text-sm font-mono text-accent uppercase">{settings.scanMode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-mono text-muted-foreground">Last Updated:</span>
                    <span className="text-sm font-mono text-foreground">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
