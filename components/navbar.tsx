"use client"

import { useState } from "react"
import { Leaf, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import WalletConnect from "@/components/wallet-connect"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Tree Map", href: "/tree-map" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "AI Tools", href: "/ai-tools" },
    { name: "Community", href: "/community" },
    { name: "Plant", href: "/plant" },
  ]

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">NFTrees</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative py-2 px-1 text-sm font-medium transition-colors ${
                  pathname === item.href ? "text-green-600" : "text-gray-600 hover:text-green-600"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <WalletConnect />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative py-2 px-1 text-sm font-medium transition-colors ${
                    pathname === item.href ? "text-green-600" : "text-gray-600 hover:text-green-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  {pathname === item.href && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full"></div>
                  )}
                </Link>
              ))}
              <div className="pt-2">
                <WalletConnect />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
