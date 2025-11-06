export default function ScanHistory({ history }: { history: any[] }) {
  return (
    <div className="border border-border bg-card/30 rounded-lg p-6 backdrop-blur">
      <h2 className="text-lg font-mono font-bold mb-4 glow-accent tracking-wider">SCAN HISTORY</h2>

      {history.length === 0 ? (
        <p className="text-center text-muted-foreground font-mono py-8">No scans performed yet</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className={`border border-border rounded p-3 font-mono text-xs ${
                item.status === "THREAT" ? "bg-destructive/10 border-destructive/50" : "bg-accent/10 border-accent/50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-bold truncate">{item.fileName}</p>
                  <p className="text-muted-foreground text-xs mt-1">{item.timestamp}</p>
                </div>
                <span
                  className={`ml-4 font-bold whitespace-nowrap ${
                    item.status === "THREAT" ? "text-destructive" : "text-accent"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
