"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface NFTOfferModalProps {
  isOpen: boolean
  onClose: () => void
  nft: {
    id: number
    name: string
    price: string
    priceUSD: string
    image: string
  }
}

export function NFTOfferModal({ isOpen, onClose, nft }: NFTOfferModalProps) {
  const [offerAmount, setOfferAmount] = useState("")
  const [offerMessage, setOfferMessage] = useState("")
  const [expiryDays, setExpiryDays] = useState("7")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset form and close modal
    setOfferAmount("")
    setOfferMessage("")
    setExpiryDays("7")
    setIsSubmitting(false)
    onClose()

    // Show success notification (would use a toast in a real app)
    alert(`Offer of ${offerAmount} ETH submitted for ${nft.name}`)
  }

  const calculateUSD = () => {
    const ethPrice = 1700 // Mock ETH price in USD
    const amount = Number.parseFloat(offerAmount) || 0
    return (amount * ethPrice).toFixed(2)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Make an Offer</DialogTitle>
          <DialogDescription>
            Submit your offer for this NFT. The owner will be notified and can accept or decline.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-4 my-4">
          <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-16 h-16 rounded-lg object-cover" />
          <div>
            <h3 className="font-medium">{nft.name}</h3>
            <p className="text-sm text-gray-500">
              Current price: {nft.price} ({nft.priceUSD})
            </p>
          </div>
        </div>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="offer-amount">Your Offer (ETH)</Label>
            <div className="relative">
              <Input
                id="offer-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
              />
              {offerAmount && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                  ≈ ${calculateUSD()} USD
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiry">Offer Expires In</Label>
            <select
              id="expiry"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
            >
              <option value="1">1 day</option>
              <option value="3">3 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a message to the NFT owner..."
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
            />
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Your offer will be binding. If accepted, the amount will be deducted from your wallet.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!offerAmount || isSubmitting || Number.parseFloat(offerAmount) <= 0}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Offer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
