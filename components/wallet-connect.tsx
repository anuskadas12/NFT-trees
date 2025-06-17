"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle, X, QrCode } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Define ethereum window type
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      isBraveWallet?: boolean
      selectedAddress?: string
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null)
  const [balance, setBalance] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null)

  // Set mounted state
  useEffect(() => {
    setIsMounted(true)
    return () => setIsMounted(false)
  }, [])

  // Only listen for account changes, don't auto-connect
  useEffect(() => {
    if (!isMounted || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        setAccount(null)
        setBalance(null)
      } else if (account) {
        // Only update if we're already connected and user switched accounts
        setAccount(accounts[0])
        // Refresh balance for new account
        getBalance(accounts[0])
      }
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)

    // Cleanup listener on unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener?.('accountsChanged', handleAccountsChanged)
      }
    }
  }, [isMounted, account])

  const getBalance = async (address: string) => {
    try {
      if (!window.ethereum) return
      
      const balanceHex = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      const balanceWei = BigInt(balanceHex)
      const balanceEth = Number(balanceWei) / 10 ** 18
      setBalance(balanceEth.toFixed(4))
    } catch (error) {
      console.error("Error getting balance:", error)
      setBalance("0.0000")
    }
  }

  const connectMetaMask = async () => {
    if (typeof window === "undefined" || !isMounted) return

    const ethereum = window.ethereum
    if (!ethereum || !ethereum.isMetaMask) {
      alert("MetaMask is not installed. Please install MetaMask to continue.")
      return
    }

    setConnectingWallet("MetaMask")
    try {
      // Request account access - this will trigger MetaMask popup for permission
      const accounts = await ethereum.request({ 
        method: "eth_requestAccounts" 
      })
      
      if (accounts && accounts.length > 0) {
        const selectedAccount = accounts[0]
        setAccount(selectedAccount)

        // Get the balance of the connected account
        await getBalance(selectedAccount)

        // Close the modal on successful connection
        setIsWalletModalOpen(false)
        
        // Show success message
        alert(`Successfully connected to MetaMask!\nAddress: ${selectedAccount.substring(0, 6)}...${selectedAccount.substring(selectedAccount.length - 4)}`)
      }
    } catch (error: any) {
      console.error("Error connecting MetaMask:", error)
      
      // Handle specific error cases
      if (error.code === 4001) {
        alert("Connection request was rejected. Please try again and approve the connection in MetaMask.")
      } else if (error.code === -32002) {
        alert("A connection request is already pending. Please check your MetaMask extension.")
      } else {
        alert(`Failed to connect to MetaMask: ${error.message || 'Unknown error'}`)
      }
    } finally {
      setConnectingWallet(null)
    }
  }

  const connectBraveWallet = async () => {
    if (typeof window === "undefined" || !isMounted) return

    const ethereum = window.ethereum
    if (!ethereum || !ethereum.isBraveWallet) {
      alert("Brave Wallet is not available. Please use Brave browser with Brave Wallet enabled.")
      return
    }

    setConnectingWallet("Brave Wallet")
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0])
        await getBalance(accounts[0])
        setIsWalletModalOpen(false)
      }
    } catch (error) {
      console.error("Error connecting Brave Wallet:", error)
    } finally {
      setConnectingWallet(null)
    }
  }

  const connectWalletConnect = () => {
    setConnectingWallet("WalletConnect")
    // WalletConnect integration would go here
    alert("WalletConnect integration coming soon!")
    setConnectingWallet(null)
  }

  const connectWithGoogle = () => {
    setConnectingWallet("Google")
    // Google OAuth integration would go here
    alert("Google authentication coming soon!")
    setConnectingWallet(null)
  }

  const connectWithEmail = () => {
    setConnectingWallet("Email")
    // Email authentication would go here
    alert("Email authentication coming soon!")
    setConnectingWallet(null)
  }

  const disconnectWallet = () => {
    setAccount(null)
    setBalance(null)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  // Check wallet availability
  const isMetaMaskAvailable = typeof window !== "undefined" && window.ethereum?.isMetaMask
  const isBraveWalletAvailable = typeof window !== "undefined" && window.ethereum?.isBraveWallet

  if (!isMounted) {
    return (
      <Button className="bg-green-600 hover:bg-green-700 text-white" disabled>
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    )
  }

  if (account) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Wallet className="w-4 h-4 mr-2" />
            {formatAddress(account)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex justify-between">
            <span>Address:</span>
            <span className="font-mono text-xs">{formatAddress(account)}</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between">
            <span>Balance:</span>
            <span>{balance} ETH</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={disconnectWallet} className="text-red-600">
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <>
      <Button 
        className="bg-green-600 hover:bg-green-700 text-white" 
        onClick={() => setIsWalletModalOpen(true)}
        disabled={connecting}
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>

      {/* Wallet Selection Dialog */}
      <Dialog open={isWalletModalOpen} onOpenChange={setIsWalletModalOpen}>
        <DialogContent className="max-w-md bg-gray-900 text-white border-gray-800">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">i</span>
              </div>
              <DialogTitle className="text-white text-lg font-semibold">
                Connect Wallet
              </DialogTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsWalletModalOpen(false)}
              className="text-gray-400 hover:text-white h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="space-y-3">
            {/* WalletConnect */}
            <button
              onClick={connectWalletConnect}
              disabled={connectingWallet === "WalletConnect"}
              className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-medium">WalletConnect</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">QR CODE</span>
                {connectingWallet === "WalletConnect" && (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            </button>

            {/* Brave Wallet */}
            <button
              onClick={connectBraveWallet}
              disabled={!isBraveWalletAvailable || connectingWallet === "Brave Wallet"}
              className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group disabled:opacity-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="text-white font-medium">Brave Wallet</span>
              </div>
              <div className="flex items-center space-x-2">
                {isBraveWalletAvailable && (
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">INSTALLED</span>
                )}
                {connectingWallet === "Brave Wallet" && (
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            </button>

            {/* MetaMask */}
            <button
              onClick={connectMetaMask}
              disabled={!isMetaMaskAvailable || connectingWallet === "MetaMask"}
              className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group disabled:opacity-50"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🦊</span>
                </div>
                <span className="text-white font-medium">MetaMask</span>
              </div>
              <div className="flex items-center space-x-2">
                {isMetaMaskAvailable && (
                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">INSTALLED</span>
                )}
                {connectingWallet === "MetaMask" && (
                  <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
            </button>

            {/* All Wallets */}
            <button
              className="w-full flex items-center justify-between p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors group"
              onClick={() => alert("More wallet options coming soon!")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center grid grid-cols-2 gap-0.5 p-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                  <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
                <span className="text-white font-medium">All Wallets</span>
              </div>
              <span className="text-gray-400 text-sm">30</span>
            </button>

            <div className="text-center text-gray-400 text-sm py-2">or</div>

            {/* Email */}
            <button
              onClick={connectWithEmail}
              disabled={connectingWallet === "Email"}
              className="w-full flex items-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-gray-300 text-sm">✉</span>
              </div>
              <span className="text-gray-300 font-medium">Email</span>
              {connectingWallet === "Email" && (
                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin ml-auto" />
              )}
            </button>

            {/* Google */}
            <button
              onClick={connectWithGoogle}
              disabled={connectingWallet === "Google"}
              className="w-full flex items-center space-x-3 p-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-sm">G</span>
              </div>
              <span className="text-white font-medium">Continue With Google</span>
              {connectingWallet === "Google" && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-auto" />
              )}
            </button>

            {/* Social Icons */}
            <div className="flex justify-center space-x-4 pt-4">
              <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">𝕏</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-purple-400 text-lg">⌂</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">⚡</span>
              </button>
              <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                <span>⋯</span>
              </button>
            </div>
          </div>

          <div className="pt-4 text-center">
            <p className="text-gray-400 text-sm">
              Haven't got a wallet?{" "}
              <button 
                className="text-blue-400 hover:text-blue-300"
                onClick={() => window.open("https://metamask.io/download/", "_blank")}
              >
                Get started
              </button>
            </p>
          </div>

          <div className="pt-2 text-center text-xs text-gray-500">
            UX by reown
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}