"use client"

import { useState, useEffect } from "react"
import { Leaf, Menu, X, Home, BarChart3, MapPin, ShoppingBag, Brain, Users, Sprout } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import WalletConnect from "@/components/wallet-connect"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Tree Map", href: "/tree-map", icon: MapPin },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { name: "AI Tools", href: "/ai-tools", icon: Brain },
    { name: "Community", href: "/community", icon: Users },
    { name: "Plant", href: "/plant", icon: Sprout },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsOpen(!isOpen)}
          className={`transition-all duration-200 backdrop-blur-sm ${
            isScrolled 
              ? 'text-gray-800 hover:text-gray-900 hover:bg-white/30' 
              : 'text-gray-700 hover:text-gray-900 hover:bg-white/20'
          }`}
          style={{
            backdropFilter: 'blur(20px)',
            background: isScrolled 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(255, 255, 255, 0.1)'
          }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`fixed left-0 top-0 h-full backdrop-blur-2xl border-r border-gray-200/30 z-40 transform transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      } ${isMinimized ? 'w-20' : 'w-64'}`}
           style={{ 
             backdropFilter: 'blur(20px) saturate(150%)',
             WebkitBackdropFilter: 'blur(20px) saturate(150%)',
             background: isScrolled 
               ? 'rgba(255, 255, 255, 0.85)' 
               : 'rgba(255, 255, 255, 0.15)',
             borderRight: '1px solid rgba(255, 255, 255, 0.2)',
             boxShadow: isScrolled 
               ? '0 8px 32px rgba(0, 0, 0, 0.15)' 
               : '0 8px 32px rgba(0, 0, 0, 0.1)',
             transition: 'all 0.3s ease-in-out'
           }}>
        
        {/* Logo Section */}
        <div className={`p-6 border-b transition-all duration-300 flex items-center justify-between ${
          isScrolled ? 'border-gray-200/40' : 'border-gray-200/20'
        }`}>
          <Link href="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            {!isMinimized && <span className={`text-xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-gray-900' : 'text-gray-800'
            }`}>NFTrees</span>}
          </Link>
          
          {/* Minimize/Maximize Button - Desktop Only */}
          <div className="hidden md:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className={`transition-all duration-200 p-2 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-gray-900 hover:bg-white/50' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/30'
              }`}
            >
              {isMinimized ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center ${isMinimized ? 'justify-center px-2' : 'space-x-3 px-4'} py-3 text-sm font-medium transition-all duration-300 rounded-xl backdrop-blur-sm group ${
                  pathname === item.href 
                    ? isScrolled
                      ? "text-blue-600 bg-white/60 font-semibold shadow-sm" 
                      : "text-blue-600 bg-white/40 font-semibold shadow-sm"
                    : isScrolled
                      ? "text-gray-800 hover:text-blue-600 hover:bg-white/40"
                      : "text-gray-700 hover:text-blue-600 hover:bg-white/25"
                }`}
                onClick={() => setIsOpen(false)}
                title={isMinimized ? item.name : undefined}
              >
                <Icon className={`w-5 h-5 transition-all duration-300 ${
                  pathname === item.href 
                    ? 'text-blue-600' 
                    : isScrolled
                      ? 'text-gray-600 group-hover:text-blue-600'
                      : 'text-gray-500 group-hover:text-blue-600'
                }`} />
                {!isMinimized && <span>{item.name}</span>}
              </Link>
            )
          })}
        </div>

        {/* Wallet Connect Section */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className={`backdrop-blur-sm rounded-xl border shadow-sm transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/30 border-gray-200/40' 
              : 'bg-white/20 border-gray-200/30'
          } ${isMinimized ? 'p-2' : 'p-4'}`}>
            {isMinimized ? (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            ) : (
              <WalletConnect />
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}