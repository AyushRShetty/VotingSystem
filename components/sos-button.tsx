"use client"

import { useState } from "react"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"

export function SOSButton() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const { toast } = useToast()

  const handleEmergencyActivate = () => {
    setIsConfirmOpen(false)
    setIsEmergencyActive(true)

    // Simulate sending emergency signal
    toast({
      title: "Emergency Signal Sent",
      description: "Local authorities have been notified. Help is on the way.",
      variant: "destructive",
    })

    // In a real implementation, this would send the location data to authorities
    console.log("EMERGENCY: Sending location data to authorities")

    // Reset after 30 seconds (in a real app, this would be handled differently)
    setTimeout(() => {
      setIsEmergencyActive(false)
    }, 30000)
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isEmergencyActive ? "destructive" : "outline"}
              size="icon"
              className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-lg z-40 border-red-500"
              onClick={() => setIsConfirmOpen(true)}
            >
              <AlertTriangle className={`h-6 w-6 ${isEmergencyActive ? "text-white animate-pulse" : "text-red-500"}`} />
              <span className="sr-only">Emergency SOS</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Emergency SOS (Police)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Emergency Alert</AlertDialogTitle>
            <AlertDialogDescription>
              This will silently alert local police authorities of an emergency situation at your polling station. Your
              exact location will be shared automatically.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleEmergencyActivate} className="bg-red-500 hover:bg-red-600">
              Confirm Emergency
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

