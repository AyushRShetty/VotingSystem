"use client"

import { useState, useEffect } from "react"
import { VoterDetailDialog } from "@/components/voter-detail-dialog"
import { AlertTriangle, BarChart, Clock, Fingerprint, Mic, Shield, Users } from "lucide-react"
import Link from "next/link"
import { indianNames, getRandomName } from "@/lib/names"

import { LanguageSelector } from "@/components/language-selector"
import { ThemeToggle } from "@/components/theme-toggle"
import { StatCard } from "@/components/stat-card"
import { VotingChart } from "@/components/voting-chart"
import { ConstitutionListDialog } from "@/components/constitution-list-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  const [showConstitutionList, setShowConstitutionList] = useState(false)
  const [recentNames, setRecentNames] = useState<string[]>([])

  useEffect(() => {
    // Generate stable list of names on mount with fixed indices
    const names = Array(5).fill(null).map((_, index) => {
      // Use index as a stable seed for name generation
      const stableIndex = index % indianNames.length
      return indianNames[stableIndex]
    })
    setRecentNames(names)
  }, [])
  const [selectedVoter, setSelectedVoter] = useState<{
    id: number
    name: string
    voterId: string
    verificationStatus: string
    verificationTime: Date
    manualCheckReason?: string
    boothNumber: number
    aadhaarLastDigits: string
  } | null>(null)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <h1 className="text-2xl font-bold">Voting Verification System</h1>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <ThemeToggle />
            <Button variant="outline" onClick={() => (window.location.href = "/login")}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Monitor verification statistics and manage voter verification</p>
          </div>
          <Button variant="outline" onClick={() => setShowConstitutionList(true)} className="bg-black text-white hover:bg-black/90">
            Original Constitution List
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Voters"
            value="1,248"
            description="Processed today"
            icon={<Users className="h-5 w-5" />}
          />
          <StatCard
            title="Verified Voters"
            value="1,186"
            description="95% success rate"
            icon={<Fingerprint className="h-5 w-5" />}
            positive
          />
          <StatCard
            title="Manual Checks"
            value="62"
            description="5% of total voters"
            icon={<Mic className="h-5 w-5" />}
            negative
          />
          <StatCard
            title="Average Time"
            value="1m 24s"
            description="Per verification"
            icon={<Clock className="h-5 w-5" />}
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Card className="col-span-1 md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hourly Voting Patterns</CardTitle>
                <CardDescription>Voter turnout from 9 AM to 6 PM</CardDescription>
              </div>
              <BarChart className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <VotingChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Verifications</CardTitle>
                <CardDescription>Last 5 voter verifications</CardDescription>
              </div>
              <Link href="/voters">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{recentNames[i] || "Loading..."}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(Date.now() - i * 5 * 60000).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          i === 2 ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {i === 2 ? "Manual Check" : "Verified"}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          const verificationDate = new Date(Date.now() - i * 5 * 60000);
                          setSelectedVoter({
                            id: 1248 - i,
                            name: recentNames[i] || "Loading...",
                            voterId: `V${1248 - i}`,
                            verificationStatus: i === 2 ? "manual_check" : "verified",
                            verificationTime: verificationDate,
                            manualCheckReason: i === 2 ? "Fingerprint mismatch" : undefined,
                            boothNumber: Math.floor(Math.random() * 10) + 1,
                            aadhaarLastDigits: Math.floor(Math.random() * 10000).toString().padStart(4, "0"),
                          });
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Fraud Detection</CardTitle>
                <CardDescription>Unusual verification patterns</CardDescription>
              </div>
              <Link href="/fraud-detection">
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="font-medium">Multiple Failed Attempts</p>
                      <p className="text-xs text-muted-foreground">Booth #2</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">Critical</div>
                </div>

                <div className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="font-medium">Sequential Voter IDs</p>
                      <p className="text-xs text-muted-foreground">East Zone</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">Medium</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">System Status</p>
                      <p className="text-xs text-muted-foreground">All systems normal</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Secure</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ConstitutionListDialog isOpen={showConstitutionList} onClose={() => setShowConstitutionList(false)} />
        <div className="mt-8 flex flex-wrap gap-4">
          <Button size="lg" onClick={() => (window.location.href = "/verify")}>
            Start New Verification
          </Button>
          <Link href="/voters">
            <Button size="lg" variant="outline">
              View Voter List
            </Button>
          </Link>
          <Link href="/fraud-detection">
            <Button size="lg" variant="outline" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Fraud Detection
            </Button>
          </Link>
        </div>
      </main>

      <VoterDetailDialog
        isOpen={selectedVoter !== null}
        onClose={() => setSelectedVoter(null)}
        voter={selectedVoter}
      />
    </div>
  )
}

