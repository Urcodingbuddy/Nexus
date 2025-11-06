"use client"
import type React from "react"
import { useRef, useState, useEffect } from "react"
import { analyzeFile } from "@/lib/threat-detector"
import { StorageManager } from "@/lib/storage"
import { UploadIcon, CheckIcon, AlertIcon } from "./icons"
import NotificationPopup from "./notification-popup"

interface ScanResult {
  fileName: string
  fileSize: number
  threat: boolean
  riskScore: number
  details: string[]
}

export default function ThreatAnalysis({ onScanComplete }: { onScanComplete: (result: ScanResult) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [scanning, setScanning] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [notification, setNotification] = useState<any>(null)
  const [settings, setSettings] = useState(StorageManager.getSettings())

  useEffect(() => {
    setSettings(StorageManager.getSettings())
  }, [])

  const handleFileSelect = (file: File) => {
    if (file) {
      setUploadedFile(file)
      setScanResult(null)

      // Auto-scan if enabled in settings
      if (settings.autoScan) {
        setTimeout(() => handleInitiateScan(file), 500)
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleInitiateScan = async (file?: File) => {
    const fileToScan = file || uploadedFile
    if (!fileToScan) return

    setScanning(true)
    try {
      const scanMode = settings.deepScan ? "deep" : "quick"
      const result = await analyzeFile(fileToScan, scanMode)

      setScanResult(result)
      onScanComplete(result)

      // Show notification if enabled
      if (settings.enableNotifications) {
        setNotification({
          message: result.threat
            ? `THREAT DETECTED: ${result.fileName} (Risk: ${result.riskScore}/100)`
            : `SCAN COMPLETE: ${result.fileName} is CLEAN`,
          type: result.threat ? "error" : "success",
        })
      }

      // Save to local storage
      StorageManager.addScanResult({
        id: Date.now(),
        fileName: result.fileName,
        fileSize: result.fileSize,
        timestamp: new Date().toLocaleString(),
        status: result.threat ? "THREAT" : "CLEAN",
        threat: result.threat,
        riskScore: result.riskScore,
      })
    } catch (error) {
      console.error("Scan error:", error)
      setNotification({
        message: "Error scanning file",
        type: "error",
      })
    } finally {
      setScanning(false)
    }
  }

  const handleReset = () => {
    setUploadedFile(null)
    setScanResult(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 mb-8 transition-all ${
        scanning ? "border-accent-glow scanning-animation" : "border-border"
      } bg-card/20 backdrop-blur`}
    >
      <h2 className="text-xl font-mono font-bold mb-6 glow-accent">THREAT ANALYSIS</h2>

      {notification && (
        <NotificationPopup
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {!scanResult ? (
        <>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-muted rounded-lg p-8 text-center mb-6 hover:border-accent transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-accent opacity-70 mb-4 flex justify-center">
              <UploadIcon className="w-12 h-12" />
            </div>
            <p className="text-foreground font-mono mb-2">
              {uploadedFile ? uploadedFile.name : "Drag & drop your file or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground">Supported: .exe, .dll, .pdf, .zip, .doc, .xls and more</p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleInitiateScan()}
              disabled={!uploadedFile || scanning}
              className={`py-3 px-6 font-mono font-bold tracking-wider rounded transition-all ${
                scanning || !uploadedFile
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : "bg-accent text-black hover:shadow-lg hover:shadow-accent/50"
              }`}
            >
              {scanning ? "SCANNING..." : "INITIATE SCAN"}
            </button>
            <button
              onClick={handleReset}
              disabled={scanning}
              className={`py-3 px-6 font-mono font-bold tracking-wider rounded border-2 border-accent text-accent hover:bg-accent/10 transition-all`}
            >
              RESET
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div
            className={`border-2 rounded-lg p-6 ${
              scanResult.threat ? "border-destructive bg-destructive/10" : "border-accent bg-accent/10"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-2">FILE ANALYZED</p>
                <p className="font-mono font-bold text-lg">{scanResult.fileName}</p>
              </div>
              <div className={`text-accent opacity-70 ${scanResult.threat ? "text-destructive" : ""}`}>
                {scanResult.threat ? <AlertIcon className="w-8 h-8" /> : <CheckIcon className="w-8 h-8" />}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">File Size</p>
                <p className="font-mono text-sm">{(scanResult.fileSize / 1024).toFixed(2)} KB</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">Risk Score</p>
                <p
                  className={`font-mono text-sm font-bold ${scanResult.riskScore > 50 ? "text-destructive" : "text-accent"}`}
                >
                  {scanResult.riskScore}/100
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-mono mb-1">Status</p>
                <p className={`font-mono text-sm font-bold ${scanResult.threat ? "text-destructive" : "text-accent"}`}>
                  {scanResult.threat ? "THREAT" : "CLEAN"}
                </p>
              </div>
            </div>

            {scanResult.details.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground font-mono mb-2">DETECTED SIGNATURES</p>
                <ul className="space-y-1">
                  {scanResult.details.map((detail, i) => (
                    <li key={i} className="text-xs font-mono text-foreground">
                      • {detail}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setScanResult(null)}
              className="py-3 px-6 font-mono font-bold tracking-wider rounded bg-accent text-black hover:shadow-lg hover:shadow-accent/50 transition-all"
            >
              SCAN ANOTHER FILE
            </button>
            <button
              onClick={handleReset}
              className="py-3 px-6 font-mono font-bold tracking-wider rounded border-2 border-accent text-accent hover:bg-accent/10 transition-all"
            >
              RESET
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
