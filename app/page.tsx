import { ArrowRight, Leaf, MapPin, Users, Bot, Zap, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function NFTreesLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-100">
            {/* 🌱 Blockchain meets Environmental Impact */}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Plant Trees, Mint <span className="text-green-600">NFTs</span>, <br className="hidden md:block" />
            Save the Planet
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Every NFT represents a real tree planted and tracked in the real world. Watch your digital collectibles
            evolve as your trees grow, creating lasting environmental impact through blockchain technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/plant">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                Start Planting Trees
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/tree-map">
              <Button
                variant="outline"
                size="lg"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              >
                View Tree Map
                <MapPin className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50,000+</div>
              <div className="text-gray-600">Trees Planted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">25,000+</div>
              <div className="text-gray-600">NFTs Minted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">15</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Revolutionary Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Combining cutting-edge blockchain technology with real-world environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Dynamic NFTs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Your NFTs evolve as your trees grow, unlocking new traits and artwork over time
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">GPS Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every tree is geo-tagged with precise coordinates and verified by trusted partners
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Transparent Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Smart contracts ensure 90% of donations go directly to verified reforestation partners
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:border-green-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">DAO Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Community-driven decisions on partners, features, and environmental initiatives
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Tools Section */}
      <section id="ai-tools" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {/* <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              <Bot className="w-4 h-4 mr-2" />
              AI-Powered Platform
            </Badge> */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Intelligent Environmental Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Leverage AI to maximize environmental impact and optimize reforestation efforts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Smart Species Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  AI analyzes climate data, soil conditions, and local ecosystems to recommend the best tree species for
                  each location
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Impact Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Machine learning models predict carbon sequestration, biodiversity impact, and long-term environmental
                  benefits
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Growth Monitoring</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Computer vision analyzes satellite imagery to track tree growth and health, updating NFT metadata
                  automatically
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Link href="/ai-tools">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Explore AI Tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How NFTrees Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to make a lasting environmental impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Donate Crypto</h3>
              <p className="text-gray-600">Choose your donation amount and preferred tree species</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">Tree Gets Planted</h3>
              <p className="text-gray-600">Our verified partners plant your tree and record GPS coordinates</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">NFT Minted</h3>
              <p className="text-gray-600">Receive your unique Tree NFT with all planting data and metadata</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">Watch It Grow</h3>
              <p className="text-gray-600">Your NFT evolves as your tree grows, unlocking new features</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of eco-warriors creating lasting environmental impact through blockchain technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/plant">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
                Plant Your First Tree
                <Leaf className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/community">
              {/* <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3"
              >
                Join Community
                <Users className="ml-2 w-5 h-5" />
              </Button> */}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">NFTrees</span>
              </div>
              <p className="text-gray-400">
                Combining blockchain technology with environmental impact for a sustainable future.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/tree-map" className="hover:text-white transition-colors">
                    Tree Map
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-white transition-colors">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/ai-tools" className="hover:text-white transition-colors">
                    AI Tools
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    DAO Governance
                  </Link>
                </li>
                <li>
                  <a href="https://discord.gg/nftrees" className="hover:text-white transition-colors">
                    Discord
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/nftrees" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NFTrees. All rights reserved. </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
