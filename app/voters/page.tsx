"use client"

import { useState } from "react"
import { ArrowLeft, ArrowUpDown, CheckCircle, Clock, Download, Filter, Search, XCircle } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VoterDetailDialog } from "@/components/voter-detail-dialog"

// Define voter interface
interface Voter {
  id: number
  name: string
  voterId: string
  verificationStatus: string
  verificationTime: Date
  manualCheckReason?: string
  boothNumber: number
  aadhaarLastDigits: string
}

// Generate mock voter data
const generateVoters = (count: number): Voter[] => {
  const firstNames = [
    "Rahul",
    "Priya",
    "Amit",
    "Neha",
    "Vikram",
    "Anjali",
    "Sanjay",
    "Meera",
    "Rajesh",
    "Sunita",
    "Arjun",
    "Kavita",
  ]
  const lastNames = [
    "Sharma",
    "Patel",
    "Singh",
    "Gupta",
    "Kumar",
    "Verma",
    "Joshi",
    "Malhotra",
    "Agarwal",
    "Reddy",
    "Nair",
    "Iyer",
  ]
  const voters = []

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
    const name = `${firstName} ${lastName}`
    const voterId = `V${1000 + i}`

    // 15% chance of needing manual check
    const needsManualCheck = Math.random() < 0.15
    const verificationStatus = needsManualCheck ? "manual_check" : "verified"
    const verificationTime = new Date(Date.now() - Math.floor(Math.random() * 8 * 60 * 60 * 1000))

    // Generate a reason for manual check if needed
    let manualCheckReason = ""
    if (needsManualCheck) {
      const reasons = [
        "Fingerprint mismatch",
        "Voice verification failed",
        "ID discrepancy",
        "Multiple verification attempts",
        "System error during verification",
      ]
      manualCheckReason = reasons[Math.floor(Math.random() * reasons.length)]
    }

    voters.push({
      id: i + 1,
      name,
      voterId,
      verificationStatus,
      verificationTime,
      manualCheckReason,
      boothNumber: Math.floor(Math.random() * 10) + 1,
      aadhaarLastDigits: Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0"),
    })
  }

  return voters
}

export default function VotersPage() {
  const [voters] = useState<Voter[]>(generateVoters(50))
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Filter voters based on search query and status filter
  const filteredVoters = voters.filter((voter) => {
    const matchesSearch =
      voter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voter.voterId.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "verified" && voter.verificationStatus === "verified") ||
      (statusFilter === "manual_check" && voter.verificationStatus === "manual_check")

    return matchesSearch && matchesStatus
  })

  // Count voters by status
  const verifiedCount = voters.filter((v) => v.verificationStatus === "verified").length
  const manualCheckCount = voters.filter((v) => v.verificationStatus === "manual_check").length

  const handleViewVoter = (voter: Voter) => {
    setSelectedVoter(voter)
    setIsDetailDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDetailDialogOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to Dashboard</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Voter List</h1>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export List
          </Button>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Voters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{voters.length}</div>
              <CardDescription>Processed today</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Verified</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{verifiedCount}</div>
              <CardDescription>{Math.round((verifiedCount / voters.length) * 100)}% success rate</CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Manual Check Required</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{manualCheckCount}</div>
              <CardDescription>{Math.round((manualCheckCount / voters.length) * 100)}% of total voters</CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or voter ID"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Voters</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="manual_check">Needs Manual Check</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Voters</TabsTrigger>
            <TabsTrigger value="manual_check" className="text-red-600">
              Needs Manual Check ({manualCheckCount})
            </TabsTrigger>
            <TabsTrigger value="verified" className="text-green-600">
              Verified ({verifiedCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Name
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Voter ID</TableHead>
                        <TableHead>Aadhaar (Last 4)</TableHead>
                        <TableHead>Booth</TableHead>
                        <TableHead>
                          <div className="flex items-center gap-1">
                            Time
                            <ArrowUpDown className="h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVoters.map((voter) => (
                        <TableRow
                          key={voter.id}
                          className={voter.verificationStatus === "manual_check" ? "bg-red-50 hover:bg-red-100" : ""}
                        >
                          <TableCell className="font-medium">{voter.id}</TableCell>
                          <TableCell>{voter.name}</TableCell>
                          <TableCell>{voter.voterId}</TableCell>
                          <TableCell>XXXX-XXXX-{voter.aadhaarLastDigits}</TableCell>
                          <TableCell>Booth #{voter.boothNumber}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {voter.verificationTime.toLocaleTimeString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            {voter.verificationStatus === "verified" ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span>Verified</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-red-600">
                                <XCircle className="h-4 w-4" />
                                <span>Manual Check</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleViewVoter(voter)}>
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual_check" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Voter ID</TableHead>
                        <TableHead>Aadhaar (Last 4)</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVoters
                        .filter((voter) => voter.verificationStatus === "manual_check")
                        .map((voter) => (
                          <TableRow key={voter.id} className="bg-red-50 hover:bg-red-100">
                            <TableCell className="font-medium">{voter.id}</TableCell>
                            <TableCell>{voter.name}</TableCell>
                            <TableCell>{voter.voterId}</TableCell>
                            <TableCell>XXXX-XXXX-{voter.aadhaarLastDigits}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                {voter.verificationTime.toLocaleTimeString()}
                              </div>
                            </TableCell>
                            <TableCell className="text-red-600">{voter.manualCheckReason}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="default" size="sm" onClick={() => handleViewVoter(voter)}>
                                Verify Manually
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verified" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Voter ID</TableHead>
                        <TableHead>Aadhaar (Last 4)</TableHead>
                        <TableHead>Booth</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredVoters
                        .filter((voter) => voter.verificationStatus === "verified")
                        .map((voter) => (
                          <TableRow key={voter.id} className="bg-green-50 hover:bg-green-100">
                            <TableCell className="font-medium">{voter.id}</TableCell>
                            <TableCell>{voter.name}</TableCell>
                            <TableCell>{voter.voterId}</TableCell>
                            <TableCell>XXXX-XXXX-{voter.aadhaarLastDigits}</TableCell>
                            <TableCell>Booth #{voter.boothNumber}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                {voter.verificationTime.toLocaleTimeString()}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => handleViewVoter(voter)}>
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Voter detail dialog */}
      <VoterDetailDialog 
        isOpen={isDetailDialogOpen} 
        onClose={handleCloseDialog} 
        voter={selectedVoter} 
      />
    </div>
  )
}

