"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, Clock, FileText, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Generate mock blockchain data
const generateTransactions = (count: number) => {
  const transactions = []
  const now = new Date()

  for (let i = 0; i < count; i++) {
    const timestamp = new Date(now.getTime() - i * 5 * 60000)
    transactions.push({
      id: i + 1,
      hash:
        "0x" +
        Array(64)
          .fill(0)
          .map(() => Math.floor(Math.random() * 16).toString(16))
          .join(""),
      timestamp,
      status: Math.random() > 0.1 ? "confirmed" : "pending",
      voterId: `V${1000 + i}`,
    })
  }

  return transactions
}

export default function BlockchainPage() {
  const [transactions] = useState(generateTransactions(20))
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTransactions = transactions.filter(
    (tx) => tx.hash.includes(searchQuery) || tx.voterId.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
            <h1 className="text-2xl font-bold">Blockchain Verification Records</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="mb-8">
          <p className="text-muted-foreground">View and verify all blockchain transactions for voter verification</p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by transaction hash or voter ID"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Verification Transactions</CardTitle>
                <CardDescription>Showing {filteredTransactions.length} transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions.map((tx) => (
                    <div key={tx.id} className="rounded-lg border p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Transaction #{tx.id}</span>
                            {tx.status === "confirmed" ? (
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                Confirmed
                              </span>
                            ) : (
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                Pending
                              </span>
                            )}
                          </div>
                          <p className="mt-1 break-all text-xs text-muted-foreground">{tx.hash}</p>
                        </div>
                        <div className="text-right text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {tx.timestamp.toLocaleTimeString()}
                          </div>
                          <div className="mt-1 font-medium">Voter ID: {tx.voterId}</div>
                        </div>
                      </div>

                      <Separator className="my-3" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Verification successful</span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="confirmed" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Confirmed Transactions</CardTitle>
                <CardDescription>
                  Showing {filteredTransactions.filter((tx) => tx.status === "confirmed").length} confirmed transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions
                    .filter((tx) => tx.status === "confirmed")
                    .map((tx) => (
                      <div key={tx.id} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Transaction #{tx.id}</span>
                              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                                Confirmed
                              </span>
                            </div>
                            <p className="mt-1 break-all text-xs text-muted-foreground">{tx.hash}</p>
                          </div>
                          <div className="text-right text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {tx.timestamp.toLocaleTimeString()}
                            </div>
                            <div className="mt-1 font-medium">Voter ID: {tx.voterId}</div>
                          </div>
                        </div>

                        <Separator className="my-3" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>Verification successful</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Pending Transactions</CardTitle>
                <CardDescription>
                  Showing {filteredTransactions.filter((tx) => tx.status === "pending").length} pending transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredTransactions
                    .filter((tx) => tx.status === "pending")
                    .map((tx) => (
                      <div key={tx.id} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">Transaction #{tx.id}</span>
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">
                                Pending
                              </span>
                            </div>
                            <p className="mt-1 break-all text-xs text-muted-foreground">{tx.hash}</p>
                          </div>
                          <div className="text-right text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {tx.timestamp.toLocaleTimeString()}
                            </div>
                            <div className="mt-1 font-medium">Voter ID: {tx.voterId}</div>
                          </div>
                        </div>

                        <Separator className="my-3" />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-amber-500" />
                            <span>Awaiting confirmation</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

