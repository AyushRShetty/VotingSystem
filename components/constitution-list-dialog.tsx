"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ConstitutionListDialogProps {
  isOpen: boolean
  onClose: () => void
}

interface ConstitutionEntry {
  name: string
  aadhaar: string
}

const constitutionList: ConstitutionEntry[] = [
  { name: "Aarav Patel", aadhaar: "4523 8965 7412" },
  { name: "Aditi Sharma", aadhaar: "7845 1236 9854" },
  { name: "Arjun Singh", aadhaar: "6598 7412 3698" },
  { name: "Ananya Gupta", aadhaar: "3214 7896 5412" },
  { name: "Advait Kumar", aadhaar: "9874 5632 1478" },
  { name: "Avni Reddy", aadhaar: "2365 4789 6321" },
  { name: "Arnav Malhotra", aadhaar: "8529 6374 1598" },
  { name: "Aisha Verma", aadhaar: "1478 5236 9874" },
  { name: "Ayush Kapoor", aadhaar: "7412 9635 8524" },
  { name: "Bhavya Iyer", aadhaar: "3698 5214 7896" },
  { name: "Darsh Nair", aadhaar: "9632 8541 7896" },
  { name: "Diya Mehta", aadhaar: "1597 4862 3698" },
  { name: "Dev Agarwal", aadhaar: "7539 5148 2698" },
  { name: "Eesha Joshi", aadhaar: "8524 7963 1478" },
  { name: "Gaurav Rao", aadhaar: "2589 6347 1598" },
  { name: "Ishaan Menon", aadhaar: "4569 8712 3654" },
  { name: "Kavya Pillai", aadhaar: "7896 3214 5698" },
  { name: "Kabir Sinha", aadhaar: "1236 5478 9632" },
  { name: "Kiara Bhat", aadhaar: "9874 5632 1478" },
  { name: "Laksh Desai", aadhaar: "3698 5214 7896" },
  { name: "Mira Shah", aadhaar: "7412 8596 3214" },
  { name: "Neha Khanna", aadhaar: "8529 6374 1478" },
  { name: "Nikhil Choudhury", aadhaar: "2365 8974 1236" },
  { name: "Ojas Trivedi", aadhaar: "7896 3214 5698" },
  { name: "Prisha Saxena", aadhaar: "4563 2189 7896" },
  { name: "Reyansh Mehra", aadhaar: "9632 8541 4785" },
  { name: "Riya Banerjee", aadhaar: "1478 5236 9874" },
  { name: "Samarth Chopra", aadhaar: "7845 9632 1478" },
  { name: "Saanvi Malik", aadhaar: "3698 5214 7896" },
  { name: "Shaurya Bajaj", aadhaar: "8529 6374 1478" },
  { name: "Tara Hegde", aadhaar: "2365 8974 1236" },
  { name: "Udayan Basu", aadhaar: "7896 3214 5698" },
  { name: "Vihaan Mathur", aadhaar: "4563 2189 7896" },
  { name: "Vanya Ahuja", aadhaar: "9632 8541 4785" },
  { name: "Yash Bhatt", aadhaar: "1478 5236 9874" },
  { name: "Zara Krishnan", aadhaar: "7845 9632 1478" },
  { name: "Aarav Chauhan", aadhaar: "3698 5214 7896" },
  { name: "Anika Thakur", aadhaar: "8529 6374 1478" },
  { name: "Aryan Venkatesh", aadhaar: "2365 8974 1236" },
  { name: "Avani Mishra", aadhaar: "7896 3214 5698" },
  { name: "Dhruv Raman", aadhaar: "4563 2189 7896" },
  { name: "Eshana Bhat", aadhaar: "9632 8541 4785" },
  { name: "Ishita Nambiar", aadhaar: "1478 5236 9874" },
  { name: "Kabir Menon", aadhaar: "7845 9632 1478" },
  { name: "Kyra Shetty", aadhaar: "3698 5214 7896" },
  { name: "Lakshya Rao", aadhaar: "8529 6374 1478" },
  { name: "Maya Pillai", aadhaar: "2365 8974 1236" },
  { name: "Neel Kapoor", aadhaar: "7896 3214 5698" },
  { name: "Nysa Reddy", aadhaar: "4563 2189 7896" },
  { name: "Om Iyer", aadhaar: "9632 8541 4785" },
  { name: "Pari Mehta", aadhaar: "1478 5236 9874" },
  { name: "Rehan Shah", aadhaar: "7845 9632 1478" },
  { name: "Roshni Verma", aadhaar: "3698 5214 7896" },
  { name: "Sai Kumar", aadhaar: "8529 6374 1478" },
  { name: "Shanaya Joshi", aadhaar: "2365 8974 1236" },
  { name: "Taran Singh", aadhaar: "7896 3214 5698" },
  { name: "Uma Nair", aadhaar: "4563 2189 7896" },
  { name: "Vedant Malhotra", aadhaar: "9632 8541 4785" },
  { name: "Yamini Gupta", aadhaar: "1478 5236 9874" },
  { name: "Zain Sharma", aadhaar: "7845 9632 1478" },
  { name: "Aanya Desai", aadhaar: "3698 5214 7896" },
  { name: "Advaith Rao", aadhaar: "8529 6374 1478" },
  { name: "Anvi Khanna", aadhaar: "2365 8974 1236" },
  { name: "Armaan Choudhury", aadhaar: "7896 3214 5698" },
  { name: "Disha Trivedi", aadhaar: "4563 2189 7896" },
  { name: "Eshan Saxena", aadhaar: "9632 8541 4785" },
  { name: "Ira Mehra", aadhaar: "1478 5236 9874" },
  { name: "Kabir Banerjee", aadhaar: "7845 9632 1478" },
  { name: "Kiaan Chopra", aadhaar: "3698 5214 7896" },
  { name: "Lavanya Malik", aadhaar: "8529 6374 1478" },
  { name: "Myra Bajaj", aadhaar: "2365 8974 1236" },
  { name: "Niam Hegde", aadhaar: "7896 3214 5698" },
  { name: "Nitya Basu", aadhaar: "4563 2189 7896" },
  { name: "Ojas Mathur", aadhaar: "9632 8541 4785" },
  { name: "Pihu Ahuja", aadhaar: "1478 5236 9874" },
  { name: "Riaan Bhatt", aadhaar: "7845 9632 1478" },
  { name: "Ruhi Krishnan", aadhaar: "3698 5214 7896" },
  { name: "Samar Chauhan", aadhaar: "8529 6374 1478" },
  { name: "Siya Thakur", aadhaar: "2365 8974 1236" },
  { name: "Taksh Venkatesh", aadhaar: "7896 3214 5698" },
  { name: "Urvi Mishra", aadhaar: "4563 2189 7896" },
  { name: "Veer Raman", aadhaar: "9632 8541 4785" },
  { name: "Yaashi Bhat", aadhaar: "1478 5236 9874" },
  { name: "Zayan Nambiar", aadhaar: "7845 9632 1478" },
  { name: "Aahana Menon", aadhaar: "3698 5214 7896" },
  { name: "Aditya Shetty", aadhaar: "8529 6374 1478" },
  { name: "Anaya Rao", aadhaar: "2365 8974 1236" },
  { name: "Ayaan Pillai", aadhaar: "7896 3214 5698" },
  { name: "Divya Kapoor", aadhaar: "4563 2189 7896" },
  { name: "Eshaan Reddy", aadhaar: "9632 8541 4785" },
  { name: "Ishani Iyer", aadhaar: "1478 5236 9874" },
  { name: "Krish Mehta", aadhaar: "7845 9632 1478" },
  { name: "Kyra Shah", aadhaar: "3698 5214 7896" },
  { name: "Lakshmi Verma", aadhaar: "8529 6374 1478" },
  { name: "Manan Kumar", aadhaar: "2365 8974 1236" },
  { name: "Navya Joshi", aadhaar: "7896 3214 5698" },
  { name: "Nirvaan Singh", aadhaar: "4563 2189 7896" },
  { name: "Oorja Nair", aadhaar: "9632 8541 4785" },
  { name: "Pranav Malhotra", aadhaar: "1478 5236 9874" },
  { name: "Reyaansh Gupta", aadhaar: "7845 9632 1478" },
  { name: "Rhea Sharma", aadhaar: "3698 5214 7896" },
  { name: "Saksham Desai", aadhaar: "8529 6374 1478" },
  { name: "Samaira Rao", aadhaar: "2365 8974 1236" },
  { name: "Trishika Khanna", aadhaar: "7896 3214 5698" },
  { name: "Uditi Choudhury", aadhaar: "4563 2189 7896" },
  { name: "Vivaan Trivedi", aadhaar: "9632 8541 4785" },
  { name: "Yuvika Saxena", aadhaar: "1478 5236 9874" },
  { name: "Zayn Mehra", aadhaar: "7845 9632 1478" }
]

export function ConstitutionListDialog({ isOpen, onClose }: ConstitutionListDialogProps) {
  const [mounted, setMounted] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const filteredList = constitutionList.filter(entry =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Original Constitution List</DialogTitle>
          <DialogDescription>List of names in this area</DialogDescription>
        </DialogHeader>
        <div className="px-4 py-2">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full rounded-md border px-3 py-2 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[400px]">
          <div className="grid gap-4 py-4 px-4">
            {filteredList.map((entry, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                <span className="font-medium">{entry.name}</span>
                <span className="text-muted-foreground">{entry.aadhaar}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}