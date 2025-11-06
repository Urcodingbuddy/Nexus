// Ransomware detection engine with signature and heuristic analysis

interface DetectionResult {
  fileName: string
  fileSize: number
  threat: boolean
  riskScore: number
  details: string[]
}

// Common ransomware signatures and indicators
const RANSOMWARE_SIGNATURES = [
  { pattern: /ransom/i, name: "Ransom keyword detected" },
  { pattern: /crypto/i, name: "Cryptography library usage" },
  { pattern: /wiper|destroy|delete/i, name: "Destructive operations" },
  { pattern: /\.locked|\.encrypted|\.crypt/i, name: "Suspicious extension" },
  { pattern: /ReadMe\.txt|HELP_ME\.txt|Restore\.txt/i, name: "Ransom note pattern" },
]

const DANGEROUS_EXTENSIONS = [".exe", ".dll", ".bat", ".cmd", ".scr", ".vbs", ".js", ".zip", ".rar", ".7z"]

const SUSPICIOUS_FILE_SIGNATURES = {
  exe: [0x4d, 0x5a], // MZ header for executables
  pdf: [0x25, 0x50, 0x44, 0x46], // PDF header
  zip: [0x50, 0x4b], // ZIP header
}

export async function analyzeFile(file: File, scanMode: "quick" | "deep" = "deep"): Promise<DetectionResult> {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const content = e.target?.result as ArrayBuffer
      const uint8Array = new Uint8Array(content)
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()

      let riskScore = 0
      const details: string[] = []

      // Check file extension risk
      if (DANGEROUS_EXTENSIONS.includes(fileExtension)) {
        riskScore += 20
        details.push(`Potentially dangerous file type: ${fileExtension}`)
      }

      // Check file signature (magic bytes)
      const signature = Array.from(uint8Array.slice(0, 4))
      if (signature[0] === 0x4d && signature[1] === 0x5a) {
        riskScore += 15
        details.push("PE executable detected (potential malware vector)")
      }

      // Analyze file name for ransomware indicators
      const fileName = file.name.toLowerCase()
      RANSOMWARE_SIGNATURES.forEach((sig) => {
        if (sig.pattern.test(fileName)) {
          riskScore += 25
          details.push(sig.name)
        }
      })

      // Heuristic: Check for suspicious size patterns
      const fileSizeKB = file.size / 1024
      if (fileSizeKB < 1 && file.name.includes(".exe")) {
        riskScore += 10
        details.push("Suspiciously small executable")
      }

      // Heuristic: Double extension detection
      const nameParts = file.name.split(".")
      if (nameParts.length > 2 && DANGEROUS_EXTENSIONS.includes("." + nameParts[nameParts.length - 1])) {
        riskScore += 15
        details.push("Double extension detected")
      }

      if (scanMode === "deep") {
        const textContent = new TextDecoder("utf-8", { fatal: false }).decode(
          uint8Array.slice(0, Math.min(1024 * 1024, uint8Array.length)),
        )

        const suspiciousPatterns = [
          { pattern: /powershell|cmd\.exe|rundll32/gi, name: "Command execution attempt" },
          { pattern: /EncryptFile|CryptEncrypt|RansomNote/gi, name: "Encryption routine detected" },
          { pattern: /system32|windir|registry/gi, name: "System file access pattern" },
          { pattern: /bitcoin|wallet|payment|ransom/gi, name: "Payment demand indicators" },
          { pattern: /CreateProcessA|CreateRemoteThread|VirtualAllocEx/gi, name: "Code injection pattern" },
        ]

        suspiciousPatterns.forEach(({ pattern, name }) => {
          if (pattern.test(textContent)) {
            riskScore += 10
            if (!details.includes(name)) {
              details.push(name)
            }
          }
        })
      }

      // Simulate realistic scanning delay (shorter for quick scan)
      const delay = scanMode === "quick" ? 800 + Math.random() * 500 : 1500 + Math.random() * 1000
      setTimeout(() => {
        resolve({
          fileName: file.name,
          fileSize: file.size,
          threat: riskScore > 40,
          riskScore: Math.min(100, riskScore),
          details: details.slice(0, 5),
        })
      }, delay)
    }

    reader.readAsArrayBuffer(file)
  })
}
