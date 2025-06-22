"use client"

import { useState } from "react"
import { MapPin, Filter, Search, Calendar, Globe, X, ExternalLink, Leaf, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Tree {
  id: number;
  species: string;
  location: string;
  coordinates: string;
  plantedDate: string;
  age: string;
  carbonOffset: string;
  status: string;
  nftId: string;
  image: string;
  description: string;
  plantedBy: string;
  height: string;
  diameter: string;
  soilType: string;
  mapPosition: { top: string; left?: string; right?: string };
  blockchainTxHash: string;
  blockchainUrl: string;
}

const mockTrees: Tree[] = [
  {
    id: 1,
    species: "Oak Tree",
    location: "California, USA",
    coordinates: "37.7749° N, 122.4194° W",
    plantedDate: "2024-01-15",
    age: "11 months",
    carbonOffset: "12.5 kg CO2",
    status: "Healthy",
    nftId: "#1234",
    image: "/images/nft-oak-tree.jpg",
    description: "A majestic oak tree planted in the hills of Northern California. This tree is part of our forest restoration project and has shown excellent growth rates.",
    plantedBy: "John Smith",
    height: "2.5 meters",
    diameter: "8 cm",
    soilType: "Clay loam",
    mapPosition: { top: "25%", left: "33%" },
    blockchainTxHash: "0x1234567890abcdef",
    blockchainUrl: "https://etherscan.io/tx/0x1234567890abcdef"
  },
  {
    id: 2,
    species: "Pine Tree",
    location: "Oregon, USA",
    coordinates: "45.5152° N, 122.6784° W",
    plantedDate: "2024-03-20",
    age: "8 months",
    carbonOffset: "8.2 kg CO2",
    status: "Growing",
    nftId: "#1235",
    image: "https://imgs.search.brave.com/KknxvbyYqzcOIEB1xuLRLT40ZD5CykFZwNyTGC3gV8k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9uYXR1/cmVoaWxscy5jb20v/Y2RuL3Nob3AvZmls/ZXMvNjQzNzJmYjIt/YWRhMy00ZDc2LTkz/MmYtMjc1MjM4YmM0/MzRiXzY1MzVlYzJh/LWRkMTctNDkwMy05/OTkwLTIyODc2MjI4/Zjk1My5qcGc_dj0x/NzIyMDQ0NzM0Jndp/ZHRoPTQ2MA",
    description: "A young pine tree growing strong in the Pacific Northwest. This tree is adapted to the local climate and contributes to biodiversity.",
    plantedBy: "Sarah Johnson",
    height: "1.8 meters",
    diameter: "6 cm",
    soilType: "Sandy loam",
    mapPosition: { top: "50%", left: "50%" },
    blockchainTxHash: "0xabcdef1234567890",
    blockchainUrl: "https://etherscan.io/tx/0xabcdef1234567890"
  },
  {
    id: 3,
    species: "Mahogany Tree",
    location: "Costa Rica",
    coordinates: "9.7489° N, 83.7534° W",
    plantedDate: "2023-11-10",
    age: "1 year",
    carbonOffset: "15.7 kg CO2",
    status: "Thriving",
    nftId: "#1236",
    image: "https://imgs.search.brave.com/X90vqin2GmexmPmnGBDZkfqfhfUXTa3lINvQllbZhTc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/NzY5NDA3My9waG90/by9tYWhvZ2FueS10/cmVlLWFnYWluc3Qt/YS1ibHVlLXNreS1i/YWNrZ3JvdW5kLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1V/M0RJQmlEeUg4R0ZM/R085SmcyN0VPWnkt/RjgwSVN2eFRrNzFK/dWo4dHFzPQ",
    description: "A tropical mahogany tree that's become a cornerstone of our reforestation efforts in Central America. Shows exceptional growth and health.",
    plantedBy: "Carlos Ramirez",
    height: "4.2 meters",
    diameter: "15 cm",
    soilType: "Rich tropical soil",
    mapPosition: { top: "75%", right: "33%" },
    blockchainTxHash: "0x9876543210fedcba",
    blockchainUrl: "https://etherscan.io/tx/0x9876543210fedcba"
  },
  {
    id: 4,
    species: "Maple Tree",
    location: "California, USA",
    coordinates: "34.0522° N, 118.2437° W",
    plantedDate: "2024-02-10",
    age: "10 months",
    carbonOffset: "10.8 kg CO2",
    status: "Healthy",
    nftId: "#1237",
    image: "https://imgs.search.brave.com/295Bs8UsVd3TOJwvTEzwaUUeuzFCez7Vq2Dl8iQUlJs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9sb3ctYW5nbGUt/dmlldy1tYXBsZS10/cmVlLWFnYWluc3Qt/c2t5XzEwNDg5NDQt/MTc3NDk5NS5qcGc_/c2VtdD1haXNfaHli/cmlkJnc9NzQw",
    description: "A beautiful maple tree contributing to urban forest canopy in Los Angeles. Planted as part of our city greening initiative.",
    plantedBy: "Maria Garcia",
    height: "3.1 meters",
    diameter: "12 cm",
    soilType: "Urban soil mix",
    mapPosition: { top: "35%", left: "25%" },
    blockchainTxHash: "0x1a2b3c4d5e6f7890",
    blockchainUrl: "https://etherscan.io/tx/0x1a2b3c4d5e6f7890"
  }
]

export default function TreeMapPage() {
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecies, setFilterSpecies] = useState("all")
  const [showDetails, setShowDetails] = useState(false)
  const [showMapView, setShowMapView] = useState(false)
  const [mapZoom, setMapZoom] = useState(1)

  // Filter trees based on search term and species filter
  const filteredTrees = mockTrees.filter(tree => {
    const matchesSearch = tree.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tree.plantedBy.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSpecies = filterSpecies === "all" || 
                          tree.species.toLowerCase().includes(filterSpecies.toLowerCase())
    
    return matchesSearch && matchesSpecies
  })

  const handleViewDetails = (tree: Tree) => {
    setSelectedTree(tree)
    setShowDetails(true)
  }

  const handleMarkerClick = (tree: Tree) => {
    setSelectedTree(tree)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setSelectedTree(null)
  }

  const handleViewBlockchain = (tree: Tree) => {
    // Open blockchain explorer in new tab
    window.open(tree.blockchainUrl, '_blank')
  }

  const handleViewOnMap = (tree: Tree) => {
    setSelectedTree(tree)
    setShowMapView(true)
    setShowDetails(false)
  }

  const closeMapView = () => {
    setShowMapView(false)
    setSelectedTree(null)
  }

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 0.5, 0.5))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Global Tree Map</h1>
              <p className="text-gray-600 mt-2">Explore trees planted by our community worldwide</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <Globe className="w-4 h-4 mr-1" />
                50,247 Trees Planted
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters and Search */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Search Location</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search by location, species, or planter..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {searchTerm && (
                    <p className="text-sm text-gray-500 mt-1">
                      Found {filteredTrees.length} result{filteredTrees.length !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tree Species</label>
                  <Select value={filterSpecies} onValueChange={setFilterSpecies}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Species</SelectItem>
                      <SelectItem value="oak">Oak</SelectItem>
                      <SelectItem value="pine">Pine</SelectItem>
                      <SelectItem value="mahogany">Mahogany</SelectItem>
                      <SelectItem value="maple">Maple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Planting Date</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">Last Week</SelectItem>
                      <SelectItem value="month">Last Month</SelectItem>
                      <SelectItem value="year">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    // Filter logic is already applied in real-time
                    // This button could trigger additional actions if needed
                  }}
                >
                  Apply Filters
                </Button>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Impact Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total CO2 Offset</span>
                  <span className="font-semibold text-green-600">1,247 tons</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Countries</span>
                  <span className="font-semibold">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Projects</span>
                  <span className="font-semibold">42</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Survival Rate</span>
                  <span className="font-semibold text-green-600">94.2%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map and Tree List */}
          <div className="lg:col-span-2">
            {/* Interactive Map */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive World Map</h3>
                    <p className="text-gray-600">Click on markers to view tree details</p>
                  </div>

                  {/* Interactive map markers - only show filtered trees */}
                  {filteredTrees.map((tree) => (
                    <div
                      key={tree.id}
                      className="absolute w-6 h-6 bg-green-600 rounded-full animate-pulse cursor-pointer hover:bg-green-700 hover:scale-110 transition-all duration-200 flex items-center justify-center group"
                      style={tree.mapPosition}
                      onClick={() => handleMarkerClick(tree)}
                      title={`${tree.species} - ${tree.location}`}
                    >
                      <Leaf className="w-3 h-3 text-white" />
                      {/* Tooltip */}
                      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        {tree.species}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tree List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                {searchTerm ? `Search Results (${filteredTrees.length})` : 'Recent Plantings'}
              </h3>
              {filteredTrees.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No trees found matching your search criteria.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {
                        setSearchTerm("")
                        setFilterSpecies("all")
                      }}
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredTrees.map((tree) => (
                  <Card key={tree.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={tree.image || "/placeholder.svg"}
                          alt={tree.species}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-lg text-gray-900">{tree.species}</h4>
                              <p className="text-gray-600 flex items-center mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                {tree.location}
                              </p>
                              <p className="text-sm text-gray-500 mt-1">{tree.coordinates}</p>
                            </div>
                            <Badge
                              className={`${
                                tree.status === "Thriving"
                                  ? "bg-green-100 text-green-800"
                                  : tree.status === "Healthy"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {tree.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
                            <div>
                              <span className="text-gray-500">Planted</span>
                              <p className="font-medium flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {tree.age}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">CO2 Offset</span>
                              <p className="font-medium text-green-600">{tree.carbonOffset}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">NFT ID</span>
                              <p className="font-medium">{tree.nftId}</p>
                            </div>
                            <div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-600 text-green-600 hover:bg-green-50"
                                onClick={() => handleViewDetails(tree)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {filteredTrees.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                  Load More Trees
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tree Details Modal */}
      {showDetails && selectedTree && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTree.species}</h2>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedTree.location}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeDetails}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Image */}
              <div className="mb-6">
                <img
                  src={selectedTree.image || "/placeholder.svg"}
                  alt={selectedTree.species}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <Badge
                  className={`${
                    selectedTree.status === "Thriving"
                      ? "bg-green-100 text-green-800"
                      : selectedTree.status === "Healthy"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {selectedTree.status}
                </Badge>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700">{selectedTree.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tree Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Species:</span>
                      <span className="font-medium">{selectedTree.species}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{selectedTree.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Height:</span>
                      <span className="font-medium">{selectedTree.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Diameter:</span>
                      <span className="font-medium">{selectedTree.diameter}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Soil Type:</span>
                      <span className="font-medium">{selectedTree.soilType}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Environmental Impact</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">CO2 Offset:</span>
                      <span className="font-medium text-green-600">{selectedTree.carbonOffset}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Planted Date:</span>
                      <span className="font-medium">{selectedTree.plantedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Planted By:</span>
                      <span className="font-medium">{selectedTree.plantedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">NFT ID:</span>
                      <span className="font-medium">{selectedTree.nftId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Coordinates:</span>
                      <span className="font-medium text-xs">{selectedTree.coordinates}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Blockchain Information */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Blockchain Verification</h3>
                <p className="text-sm text-gray-600 mb-2">
                  This tree's data is permanently recorded on the blockchain for transparency and verification.
                </p>
                <div className="text-sm">
                  <span className="text-gray-600">Transaction Hash: </span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {selectedTree.blockchainTxHash}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleViewBlockchain(selectedTree)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Blockchain
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => handleViewOnMap(selectedTree)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View on Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Map View Modal */}
      {showMapView && selectedTree && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Tree Location</h2>
                  <p className="text-gray-600">{selectedTree.species} - {selectedTree.location}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeMapView}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Map Container */}
              <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                <div 
                  className="absolute inset-0 transition-transform duration-300"
                  style={{ transform: `scale(${mapZoom})` }}
                >
                  {/* Focused tree marker */}
                  <div
                    className="absolute w-8 h-8 bg-red-600 rounded-full cursor-pointer flex items-center justify-center animate-bounce"
                    style={selectedTree.mapPosition}
                  >
                    <Leaf className="w-4 h-4 text-white" />
                  </div>

                  {/* Other tree markers (dimmed) */}
                  {mockTrees.filter(t => t.id !== selectedTree.id).map((tree) => (
                    <div
                      key={tree.id}
                      className="absolute w-4 h-4 bg-green-400 rounded-full opacity-50 flex items-center justify-center"
                      style={tree.mapPosition}
                    >
                      <Leaf className="w-2 h-2 text-white" />
                    </div>
                  ))}
                </div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleZoomIn}
                    className="bg-white hover:bg-gray-50"
                    disabled={mapZoom >= 3}
                  >
                    +
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleZoomOut}
                    className="bg-white hover:bg-gray-50"
                    disabled={mapZoom <= 0.5}
                  >
                    -
                  </Button>
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                  <h4 className="font-semibold text-sm mb-2">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-600 rounded-full mr-2"></div>
                      <span>Selected Tree</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                      <span>Other Trees</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tree Details Summary */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Coordinates:</span>
                    <p className="font-medium">{selectedTree.coordinates}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <p className="font-medium text-green-600">{selectedTree.status}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Carbon Offset:</span>
                    <p className="font-medium">{selectedTree.carbonOffset}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowMapView(false)
                    setShowDetails(true)
                  }}
                  className="border-green-600 text-green-600 hover:bg-green-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back to Details
                </Button>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const googleMapsUrl = `https://www.google.com/maps?q=${selectedTree.coordinates.replace(/° /g, '').replace(/[NSEW]/g, '').trim()}`
                      window.open(googleMapsUrl, '_blank')
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in Google Maps
                  </Button>
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleViewBlockchain(selectedTree)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Blockchain
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}