"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import StatusCards from "@/components/status-cards"
import ThreatAnalysis from "@/components/threat-analysis"
import ScanHistory from "@/components/scan-history"
import Statistics from "@/components/statistics"
import { StorageManager } from "@/lib/storage"

export default function Home() {
  const [scanHistory, setScanHistory] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, threats: 0, clean: 0 })
  const [systemStatus, setSystemStatus] = useState("ONLINE")
  const [threatLevel, setThreatLevel] = useState("LOW")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const history = StorageManager.getScanHistory()
    const loadedStats = StorageManager.getStats()
    setScanHistory(history)
    setStats(loadedStats)
    setIsLoaded(true)

    // Set threat level based on recent threats
    if (loadedStats.threats > 0) {
      setThreatLevel("CRITICAL")
    } else {
      setThreatLevel("LOW")
    }
  }, [])

  const handleScanComplete = (result: any) => {
    const newEntry = {
      id: Date.now(),
      fileName: result.fileName,
      fileSize: result.fileSize,
      timestamp: new Date().toLocaleString(),
      status: result.threat ? "THREAT" : "CLEAN",
      threat: result.threat,
      riskScore: result.riskScore,
    }

    setScanHistory([newEntry, ...scanHistory])
    setStats((prev) => ({
      total: prev.total + 1,
      threats: prev.threats + (result.threat ? 1 : 0),
      clean: prev.clean + (result.threat ? 0 : 1),
    }))

    // Update threat level
    if (result.threat) {
      setThreatLevel("CRITICAL")
    } else if (stats.threats === 0 && stats.total > 0) {
      setThreatLevel("LOW")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {isLoaded && (
          <>
            <StatusCards
              systemStatus={systemStatus}
              threatLevel={threatLevel}
              lastScan={scanHistory[0]?.timestamp || "Never"}
            />
            <ThreatAnalysis onScanComplete={handleScanComplete} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              <div className="lg:col-span-2">
                <ScanHistory history={scanHistory} />
              </div>
              <div>
                <Statistics stats={stats} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
