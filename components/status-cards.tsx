export default function StatusCards({ systemStatus, threatLevel, lastScan }: any) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ONLINE":
        return "text-accent"
      case "OFFLINE":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const getThreatColor = (level: string) => {
    switch (level) {
      case "CRITICAL":
        return "text-destructive"
      case "HIGH":
        return "text-orange-500"
      case "MEDIUM":
        return "text-yellow-500"
      case "LOW":
        return "text-accent"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="border border-border bg-card/30 rounded p-4 backdrop-blur">
        <p className="text-xs text-muted-foreground font-mono tracking-widest mb-2">System Status</p>
        <p className={`text-lg font-mono font-bold ${getStatusColor(systemStatus)}`}>{systemStatus}</p>
      </div>

      <div className="border border-border bg-card/30 rounded p-4 backdrop-blur">
        <p className="text-xs text-muted-foreground font-mono tracking-widest mb-2">Threat Level</p>
        <p className={`text-lg font-mono font-bold ${getThreatColor(threatLevel)}`}>{threatLevel}</p>
      </div>

      <div className="border border-border bg-card/30 rounded p-4 backdrop-blur">
        <p className="text-xs text-muted-foreground font-mono tracking-widest mb-2">Last Scan</p>
        <p className="text-lg font-mono font-bold text-foreground">
          {lastScan === "Never" ? "Never" : lastScan.split(",")[0]}
        </p>
      </div>
    </div>
  )
}
