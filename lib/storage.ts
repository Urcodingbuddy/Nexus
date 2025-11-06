interface StorageSettings {
  autoScan: boolean
  enableNotifications: boolean
  quickScan: boolean
  deepScan: boolean
  scanMode: "quick" | "deep"
}

interface StorageScanResult {
  id: number
  fileName: string
  fileSize: number
  timestamp: string
  status: "THREAT" | "CLEAN"
  threat: boolean
  riskScore: number
}

const DEFAULT_SETTINGS: StorageSettings = {
  autoScan: false,
  enableNotifications: true,
  quickScan: false,
  deepScan: true,
  scanMode: "deep",
}

export const StorageManager = {
  // Settings Management
  getSettings: (): StorageSettings => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS
    try {
      const stored = localStorage.getItem("nexus_settings")
      return stored ? JSON.parse(stored) : DEFAULT_SETTINGS
    } catch {
      return DEFAULT_SETTINGS
    }
  },

  saveSettings: (settings: StorageSettings): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem("nexus_settings", JSON.stringify(settings))
    } catch (e) {
      console.error("Failed to save settings:", e)
    }
  },

  // Scan History Management
  getScanHistory: (): StorageScanResult[] => {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem("nexus_scan_history")
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  },

  addScanResult: (result: StorageScanResult): void => {
    if (typeof window === "undefined") return
    try {
      const history = StorageManager.getScanHistory()
      history.unshift(result)
      // Keep only last 100 scans
      const trimmed = history.slice(0, 100)
      localStorage.setItem("nexus_scan_history", JSON.stringify(trimmed))
    } catch (e) {
      console.error("Failed to save scan result:", e)
    }
  },

  clearHistory: (): void => {
    if (typeof window === "undefined") return
    try {
      localStorage.removeItem("nexus_scan_history")
    } catch (e) {
      console.error("Failed to clear history:", e)
    }
  },

  getStats: () => {
    const history = StorageManager.getScanHistory()
    return {
      total: history.length,
      threats: history.filter((h) => h.threat).length,
      clean: history.filter((h) => !h.threat).length,
    }
  },
}
