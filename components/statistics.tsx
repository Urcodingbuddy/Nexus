export default function Statistics({ stats }: { stats: any }) {
  return (
    <div className="space-y-4">
      <StatCard label="Total Scans" value={stats.total} accent={true} />
      <StatCard label="Threats Blocked" value={stats.threats} accent={stats.threats > 0} />
      <StatCard label="Clean Files" value={stats.clean} accent={true} />
    </div>
  )
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: boolean }) {
  return (
    <div
      className={`border border-border bg-card/30 rounded-lg p-4 backdrop-blur text-center ${
        accent ? "border-accent/50 bg-accent/10" : "border-border"
      }`}
    >
      <p className="text-4xl font-mono font-bold glow-accent mb-2">{value}</p>
      <p className="text-xs text-muted-foreground font-mono tracking-widest">{label}</p>
    </div>
  )
}
