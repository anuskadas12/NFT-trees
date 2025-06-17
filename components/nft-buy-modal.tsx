"use client"

import { useState, useEffect } from "react"
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

interface NFTBuyModalProps {
  isOpen: boolean
  onClose: () => void
  nft: {
    id: number
    name: string
    species: string
    location: string
    price: string
    priceUSD: string
    image: string
    seller: string
  }
}

export function NFTBuyModal({ isOpen, onClose, nft }: NFTBuyModalProps) {
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [hasWallet, setHasWallet] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  const handleBuy = async () => {
    setIsProcessing(true)

    // Simulate transaction processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setIsComplete(true)
  }

  const handleClose = () => {
    // Reset state when closing
    setStep(1)
    setIsProcessing(false)
    setIsComplete(false)
    onClose()
  }

  // Simulate wallet connection for demo purposes
  const simulateWalletConnection = () => {
    setHasWallet(true)
  }

  // Only check for MetaMask after component is mounted
  const isMetaMaskInstalled =
    isMounted && typeof window !== "undefined" && window.ethereum && window.ethereum.isMetaMask

  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      // Handle case when MetaMask is not installed
      simulateWalletConnection() // For demo purposes
      return
    }

    try {
      // Request account access
      await window.ethereum!.request({ method: "eth_requestAccounts" })
      setHasWallet(true)
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{isComplete ? "Purchase Complete!" : "Buy NFT"}</DialogTitle>
          <DialogDescription>
            {isComplete
              ? "Your transaction has been processed successfully."
              : "Complete your purchase of this tree NFT."}
          </DialogDescription>
        </DialogHeader>

        {!isComplete ? (
          <>
            {/* Step 1: Connect Wallet */}
            <div className={`space-y-4 ${step !== 1 ? "hidden" : ""}`}>
              <div className="flex items-center space-x-4 my-4">
                <img
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-lg">{nft.name}</h3>
                  <p className="text-sm text-gray-500">
                    {nft.species} • {nft.location}
                  </p>
                  <p className="font-bold text-green-600 mt-1">
                    {nft.price} <span className="text-sm font-normal text-gray-500">({nft.priceUSD})</span>
                  </p>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>You need to connect your wallet to proceed with the purchase.</AlertDescription>
              </Alert>

              <div className="flex justify-center py-4">
                {isMetaMaskInstalled ? (
                  <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={connectWallet}>
                    Connect MetaMask
                  </Button>
                ) : (
                  <div className="space-y-4 w-full">
                    <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-md">
                      <AlertCircle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />
                      <p className="text-sm">
                        MetaMask is not installed. For this demo, you can simulate a wallet connection.
                      </p>
                    </div>
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white w-full"
                      onClick={simulateWalletConnection}
                    >
                      Simulate Wallet Connection
                    </Button>
                  </div>
                )}
              </div>

              <div className="text-center text-sm text-gray-500">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
              </div>

              <Separator />

              <DialogFooter>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!hasWallet}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Next
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </DialogFooter>
            </div>

            {/* Step 2: Confirm Purchase */}
            <div className={`space-y-4 ${step !== 2 ? "hidden" : ""}`}>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Transaction Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">NFT Price:</span>
                    <span>{nft.price} ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gas Fee (estimated):</span>
                    <span>0.002 ETH</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Platform Fee:</span>
                    <span>0.001 ETH</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{(Number.parseFloat(nft.price.replace(" ETH", "")) + 0.003).toFixed(3)} ETH</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Seller Information</h3>
                <p className="text-sm text-gray-500">You are buying this NFT from {nft.seller}</p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This transaction is irreversible. Please confirm the details before proceeding.
                </AlertDescription>
              </Alert>

              <DialogFooter>
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={handleBuy}
                  disabled={isProcessing}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {isProcessing ? "Processing..." : "Confirm Purchase"}
                </Button>
              </DialogFooter>
            </div>
          </>
        ) : (
          // Success screen
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-center">Purchase Successful!</h3>
              <p className="text-gray-500 text-center mt-2">You are now the proud owner of {nft.name}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Transaction Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction Hash:</span>
                  <span className="font-mono">0x71c...9e3f</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Block Number:</span>
                  <span>15,782,344</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Timestamp:</span>
                  <span>Just now</span>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col space-y-2 sm:space-y-0">
              <Button onClick={handleClose} className="w-full bg-green-600 hover:bg-green-700 text-white">
                View in My Collection
              </Button>
              <Button variant="outline" onClick={handleClose} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
