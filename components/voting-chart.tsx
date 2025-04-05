"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// Generate mock data for the chart
const generateData = () => {
  const hours = []
  
  // Fixed hours from 9 AM to 6 PM (10 hours)
  for (let hour = 9; hour <= 18; hour++) {
    // Higher voter turnout during lunch hours (12-2) and after work (4-6)
    let baseValue = 20
    if (hour >= 12 && hour <= 14) {
      baseValue = 40 // Higher turnout during lunch
    } else if (hour >= 16 && hour <= 18) {
      baseValue = 45 // Higher turnout after work hours
    }
    
    const value = Math.floor(Math.random() * 20) + baseValue // Random variation
    
    hours.push({
      hour: `${hour}:00`,
      voters: value,
    })
  }

  return hours
}

export function VotingChart() {
  const [data, setData] = useState(generateData())

  // Regenerate data every 5 minutes
  useEffect(() => {
    const interval = setInterval(
      () => {
        setData(generateData())
      },
      5 * 60 * 1000,
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="hour" tick={{ fontSize: 12 }} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
          <Tooltip
            formatter={(value) => [`${value} voters`, "Verified"]}
            labelFormatter={(label) => `Hour: ${label}`}
          />
          <Bar dataKey="voters" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={30} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  )
}

