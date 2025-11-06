"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded border-2 border-accent flex items-center justify-center glow-accent">
              <span className="text-accent font-mono font-bold text-xs">✜</span>
            </div>
            <h1 className="text-2xl font-bold glow-accent tracking-wider">NEXUS</h1>
          </div>

          <nav className="flex gap-8">
            <Link
              href="/"
              className={`px-4 py-2 font-mono text-sm tracking-wider transition-colors ${
                isActive("/") ? "text-accent border-b-2 border-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/history"
              className={`px-4 py-2 font-mono text-sm tracking-wider transition-colors ${
                isActive("/history")
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              History
            </Link>
            <Link
              href="/settings"
              className={`px-4 py-2 font-mono text-sm tracking-wider transition-colors ${
                isActive("/settings")
                  ? "text-accent border-b-2 border-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
