"use client"

import { useState } from "react"
import { Filter, TrendingUp, Leaf, Calendar, DollarSign, Heart, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NFTOfferModal } from "@/components/nft-offer-modal"
import { NFTBuyModal } from "@/components/nft-buy-modal"
import { LocationSearch } from "@/components/location-search"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const mockNFTs = [
  {
    id: 1,
    name: "Ancient Oak #1234",
    species: "Oak Tree",
    location: "California, USA",
    age: "2 years",
    rarity: "Legendary",
    price: "2.5 ETH",
    priceUSD: "$4,250",
    carbonOffset: "45.2 kg CO2",
    image: "/images/nft-oak-tree.jpg",
    seller: "0x1234...5678",
    likes: 24,
    trending: true,
    comments: 8,
  },
  {
    id: 2,
    name: "Rainforest Guardian #5678",
    species: "Mahogany",
    location: "Costa Rica",
    age: "1.5 years",
    rarity: "Epic",
    price: "1.8 ETH",
    priceUSD: "$3,060",
    carbonOffset: "38.7 kg CO2",
    image: "https://imgs.search.brave.com/EOjHna3PCZMWsYOVc0sJbrP8thEheqUgS02oXF3rBAg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9saXZl/LnN0YXRpY2ZsaWNr/ci5jb20vMjc3NS80/MzM3NzA0NDkzX2Q0/Y2JlNmIyZjguanBn",
    seller: "0x9876...5432",
    likes: 18,
    trending: false,
    comments: 5,
  },
  {
    id: 3,
    name: "Mountain Pine #9012",
    species: "Pine Tree",
    location: "Oregon, USA",
    age: "8 months",
    rarity: "Rare",
    price: "0.9 ETH",
    priceUSD: "$1,530",
    carbonOffset: "15.3 kg CO2",
    image: "https://imgs.search.brave.com/ILgl9jusbJSYLyX6bJVvmOhDsr3WjvG8IjnYxj_S5zw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlc3BydWNlLmNv/bS90aG1iL1ZpdVl0/UTJGVy16cXBnc21l/Z3JWV2FvSVlycz0v/MTUwMHgwL2ZpbHRl/cnM6bm9fdXBzY2Fs/ZSgpOm1heF9ieXRl/cygxNTAwMDApOnN0/cmlwX2ljYygpL2Nh/bmFyeS1pc2xhbmQt/cGluZS0zMjY5MzA0/LTA1LTY3OWM1MTkx/MWQ3NDQwZjdhZDEz/Mzk3ZGE4MmE3MDNl/LmpwZw",
    seller: "0x5555...7777",
    likes: 12,
    trending: true,
    comments: 3,
  },
]

const trendingNFTs = [
  {
    id: 4,
    name: "Amazonian Treasure #2468",
    species: "Brazil Nut Tree",
    location: "Amazon, Brazil",
    age: "3 years",
    rarity: "Legendary",
    price: "4.2 ETH",
    priceUSD: "$7,140",
    carbonOffset: "78.5 kg CO2",
    image: "/images/nft-amazon-tree.jpg",
    seller: "0xABCD...1234",
    likes: 56,
    trending: true,
    comments: 14,
  },
  {
    id: 5,
    name: "Redwood Giant #7531",
    species: "Redwood",
    location: "California, USA",
    age: "2.5 years",
    rarity: "Epic",
    price: "3.1 ETH",
    priceUSD: "$5,270",
    carbonOffset: "62.3 kg CO2",
    image: "/images/nft-redwood-tree.jpg",
    seller: "0xEFGH...5678",
    likes: 42,
    trending: true,
    comments: 9,
  },
]

const newNFTs = [
  {
    id: 6,
    name: "Mangrove Protector #3579",
    species: "Mangrove",
    location: "Sundarbans, Bangladesh",
    age: "2 months",
    rarity: "Rare",
    price: "1.2 ETH",
    priceUSD: "$2,040",
    carbonOffset: "8.7 kg CO2",
    image: "https://imgs.search.brave.com/lUcOeAGMUqliA63ax5rwfDhAHw6HvQ2k831CRoivavQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE1/NDYzMDc4Mi9waG90/by9wcm90ZWN0ZWQt/ZWNvbG9naWNhbC1j/YXJib24tY2FwdHVy/ZS1tYW5ncm92ZS1p/bi1ldmVyZ2xhZGUt/Y2l0eS1mbG9yaWRh/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1yMUZPN0RBc21k/aW5mLVdJemJSWTAy/RDV1d1plWWVDLVQ0/d2hYTWRSWmxnPQ",
    seller: "0xIJKL...9012",
    likes: 7,
    trending: false,
    comments: 2,
  },
  {
    id: 7,
    name: "Baobab Sentinel #8642",
    species: "Baobab",
    location: "Madagascar",
    age: "3 months",
    rarity: "Epic",
    price: "2.8 ETH",
    priceUSD: "$4,760",
    carbonOffset: "12.4 kg CO2",
    image: "https://imgs.search.brave.com/DLDbpoZ0rjSG08DcG8lph442qn3N5T7xoUCWrDjjUd8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODM2/MzY4MDMyL3Bob3Rv/L2FkYW5zb25pYS1i/YW9iYWItdHJlZS1h/bmQtZnJ1aXQtbWFk/YWdhc2Nhci5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9bXRB/ejl1eGxmcm9zR0Vy/cHNKTi1qRHZKTnNa/cVFnOWxwYWhUdGdp/ZVhEMD0",
    seller: "0xMNOP...3456",
    likes: 15,
    trending: false,
    comments: 4,
  },
]

const auctionNFTs = [
  {
    id: 8,
    name: "Ancient Sequoia #1357",
    species: "Sequoia",
    location: "Sierra Nevada, USA",
    age: "4 years",
    rarity: "Legendary",
    price: "Current bid: 5.7 ETH",
    priceUSD: "$9,690",
    carbonOffset: "95.2 kg CO2",
    image: "/images/nft-sequoia-tree.jpg",
    seller: "0xQRST...7890",
    likes: 68,
    trending: true,
    comments: 23,
    endsIn: "2d 14h 35m",
  },
  {
    id: 9,
    name: "Himalayan Cedar #2468",
    species: "Cedar",
    location: "Nepal",
    age: "2 years",
    rarity: "Epic",
    price: "Current bid: 3.4 ETH",
    priceUSD: "$5,780",
    carbonOffset: "42.8 kg CO2",
    image: "/images/nft-cedar-tree.jpg",
    seller: "0xUVWX...1234",
    likes: 31,
    trending: false,
    comments: 11,
    endsIn: "8h 22m 15s",
  },
]

export default function MarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("price-low")
  const [filterRarity, setFilterRarity] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false)
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [likedNFTs, setLikedNFTs] = useState<number[]>([])

  // Price range filter
  const [priceRange, setPriceRange] = useState([0, 5])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "Epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "Rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const handleLike = (id: number) => {
    if (likedNFTs.includes(id)) {
      setLikedNFTs(likedNFTs.filter((nftId) => nftId !== id))
    } else {
      setLikedNFTs([...likedNFTs, id])
    }
  }

  const handleMakeOffer = (nft: any) => {
    setSelectedNFT(nft)
    setIsOfferModalOpen(true)
  }

  const handleBuyNow = (nft: any) => {
    setSelectedNFT(nft)
    setIsBuyModalOpen(true)
  }

  const handleLocationSelect = (location: any) => {
    setSearchTerm(location.name)
  }

  const renderNFTCard = (nft: any) => (
    <Card key={nft.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
      <CardContent className="p-0">
        <div className="relative">
          <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-64 object-cover rounded-t-lg" />
          {nft.trending && (
            <Badge className="absolute top-3 left-3 bg-red-100 text-red-800">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
          {nft.endsIn && (
            <Badge className="absolute top-3 right-3 bg-orange-100 text-orange-800">Ends in: {nft.endsIn}</Badge>
          )}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation()
              handleLike(nft.id)
            }}
          >
            <Heart className={`w-4 h-4 ${likedNFTs.includes(nft.id) ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
          <Badge className={`absolute bottom-3 left-3 ${getRarityColor(nft.rarity)}`}>{nft.rarity}</Badge>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
            {nft.name}
          </h3>

          <div className="space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex items-center">
              <Leaf className="w-4 h-4 mr-2 text-green-600" />
              {nft.species} • {nft.location}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              {nft.age} old • {nft.carbonOffset} offset
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center text-lg font-bold text-gray-900">
                <DollarSign className="w-4 h-4 mr-1" />
                {nft.price}
              </div>
              <div className="text-sm text-gray-500">{nft.priceUSD}</div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <div className="flex items-center">
                <Heart className={`w-4 h-4 mr-1 ${likedNFTs.includes(nft.id) ? "fill-red-500 text-red-500" : ""}`} />
                {likedNFTs.includes(nft.id) ? nft.likes + 1 : nft.likes}
              </div>
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                {nft.comments}
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={(e) => {
                e.stopPropagation()
                handleBuyNow(nft)
              }}
            >
              {nft.endsIn ? "Place Bid" : "Buy Now"}
            </Button>
            <Button
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-50"
              onClick={(e) => {
                e.stopPropagation()
                handleMakeOffer(nft)
              }}
            >
              Make Offer
            </Button>
          </div>

          <div className="mt-3 text-xs text-gray-500">Seller: {nft.seller}</div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NFT Marketplace</h1>
              <p className="text-gray-600 mt-2">Trade dynamic tree NFTs that grow with real trees</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <TrendingUp className="w-4 h-4 mr-1" />
                Volume: 247 ETH
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <LocationSearch
                  onSelect={handleLocationSelect}
                  placeholder="Search NFTs by name, species, or location..."
                />
              </div>

              <div className="flex gap-4">
                <Select value={filterRarity} onValueChange={setFilterRarity}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rarities</SelectItem>
                    <SelectItem value="common">Common</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                    <SelectItem value="epic">Epic</SelectItem>
                    <SelectItem value="legendary">Legendary</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="age">Tree Age</SelectItem>
                    <SelectItem value="carbon">Carbon Offset</SelectItem>
                    <SelectItem value="trending">Trending</SelectItem>
                  </SelectContent>
                </Select>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                      <Filter className="w-4 h-4 mr-2" />
                      More Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Advanced Filters</SheetTitle>
                      <SheetDescription>Refine your search with additional filters</SheetDescription>
                    </SheetHeader>
                    <div className="space-y-6 py-6">
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Price Range (ETH)</h3>
                        <div className="pt-4">
                          <Slider value={priceRange} onValueChange={setPriceRange} max={10} min={0} step={0.1} />
                          <div className="flex justify-between mt-2 text-sm text-gray-500">
                            <span>{priceRange[0]} ETH</span>
                            <span>{priceRange[1]} ETH</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Tree Species</h3>
                        <div className="space-y-2">
                          {["Oak", "Pine", "Mahogany", "Baobab", "Redwood"].map((species) => (
                            <div key={species} className="flex items-center space-x-2">
                              <Checkbox id={species} />
                              <Label htmlFor={species}>{species}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Tree Age</h3>
                        <div className="space-y-2">
                          {["< 6 months", "6-12 months", "1-2 years", "2+ years"].map((age) => (
                            <div key={age} className="flex items-center space-x-2">
                              <Checkbox id={age} />
                              <Label htmlFor={age}>{age}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-medium">Status</h3>
                        <div className="space-y-2">
                          {["Buy Now", "Auction", "Make Offer"].map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox id={status} />
                              <Label htmlFor={status}>{status}</Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Apply Filters</Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Marketplace Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-96">
            <TabsTrigger value="all">All NFTs</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="auction">Auctions</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockNFTs.map(renderNFTCard)}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trendingNFTs.map(renderNFTCard)}
            </div>
          </TabsContent>

          <TabsContent value="new" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newNFTs.map(renderNFTCard)}
            </div>
          </TabsContent>

          <TabsContent value="auction" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {auctionNFTs.map(renderNFTCard)}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-50">
            Load More NFTs
          </Button>
        </div>
      </div>

      {/* Modals */}
      {selectedNFT && (
        <>
          <NFTOfferModal isOpen={isOfferModalOpen} onClose={() => setIsOfferModalOpen(false)} nft={selectedNFT} />
          <NFTBuyModal isOpen={isBuyModalOpen} onClose={() => setIsBuyModalOpen(false)} nft={selectedNFT} />
        </>
      )}
    </div>
  )
}
