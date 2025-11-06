
interface DetectionResult {
  fileName: string
  fileSize: number
  threat: boolean
  riskScore: number
  details: string[]
}

// Static indicators
const RANSOMWARE_SIGNATURES = [
  { pattern: /ransom/i, name: "Ransom keyword detected" },
  { pattern: /crypto|aes|rsa/i, name: "Cryptographic keyword presence" },
  { pattern: /wiper|destroy|delete/i, name: "Destructive operation keyword" },
  { pattern: /\.locked|\.encrypted|\.crypt|\.pay/i, name: "Suspicious extension" },
  { pattern: /ReadMe\.txt|HELP_DECRYPT|DECRYPT_INSTRUCTIONS/i, name: "Ransom note pattern" },
]

const DANGEROUS_EXTENSIONS = [".exe", ".dll", ".bat", ".cmd", ".scr", ".vbs", ".js", ".zip", ".rar", ".7z"]

export async function analyzeFile(file: File, scanMode: "quick" | "deep" = "deep"): Promise<DetectionResult> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const content = e.target?.result as ArrayBuffer
      const uint8Array = new Uint8Array(content)
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
      const fileName = file.name.toLowerCase()

      let riskScore = 0
      const details: string[] = []

      // 1. Extension-level risk
      if (DANGEROUS_EXTENSIONS.includes(fileExtension)) {
        riskScore += 15
        details.push(`High-risk file type: ${fileExtension}`)
      }

      // 2. Basic signature scan (header check)
      const headerBytes = Array.from(uint8Array.slice(0, 4))
      const headerHex = headerBytes.map((b) => b.toString(16).padStart(2, "0")).join("").toUpperCase()

      if (headerHex.startsWith("4D5A")) {
        riskScore += 20
        details.push("Detected PE Executable header (MZ)")
      } else if (headerHex.startsWith("504B")) {
        riskScore += 10
        details.push("Archive header detected (ZIP/RAR container)")
      }

      // 3. File name heuristics
      RANSOMWARE_SIGNATURES.forEach((sig) => {
        if (sig.pattern.test(fileName)) {
          riskScore += 25
          details.push(sig.name)
        }
      })

      // 4. Entropy estimation (basic Shannon proxy)
      let entropyScore = 0
      const sample = uint8Array.slice(0, Math.min(4096, uint8Array.length))
      const freq = new Map<number, number>()
      for (const b of sample) freq.set(b, (freq.get(b) || 0) + 1)
      const total = sample.length
      freq.forEach((count) => {
        const p = count / total
        entropyScore -= p * Math.log2(p)
      })
      if (entropyScore > 7.5) {
        riskScore += 20
        details.push("High entropy detected (possible encryption)")
      }

      // 5. Heuristic: double extensions (e.g., file.pdf.exe)
      const parts = file.name.split(".")
      if (parts.length > 2 && DANGEROUS_EXTENSIONS.includes("." + parts.pop())) {
        riskScore += 10
        details.push("Double extension pattern detected")
      }

      // 6. Deep text pattern scanning
      if (scanMode === "deep") {
        const textSnippet = new TextDecoder("utf-8", { fatal: false }).decode(
          uint8Array.slice(0, Math.min(1024 * 1024, uint8Array.length))
        )

        const suspiciousPatterns = [
          { pattern: /\bEncrypt(File|Data)|CryptEncrypt|AES_set_key/gi, name: "Encryption routine signature" },
          { pattern: /\bBitcoin|Wallet|Payment|Decrypt\b/gi, name: "Payment or decryption instructions" },
          { pattern: /\bSystem32|Registry|ShadowCopy|VolumeSnapshot/gi, name: "System modification attempt" },
          { pattern: /\bPowershell|cmd\.exe|rundll32|wmic/gi, name: "Command execution signature" },
          { pattern: /\bCreateRemoteThread|VirtualAllocEx|WriteProcessMemory/gi, name: "Code injection signature" },
        ]

        suspiciousPatterns.forEach(({ pattern, name }) => {
          if (pattern.test(textSnippet)) {
            riskScore += 8
            if (!details.includes(name)) details.push(name)
          }
        })
      }

      // Normalize and finalize
      riskScore = Math.min(100, riskScore)
      const threat = riskScore >= 40

      const delay = scanMode === "quick" ? 700 + Math.random() * 400 : 1400 + Math.random() * 800
      setTimeout(() => {
        resolve({
          fileName: file.name,
          fileSize: file.size,
          threat,
          riskScore,
          details: details.slice(0, 6),
        })
      }, delay)
    }

    reader.readAsArrayBuffer(file)
  })
}
