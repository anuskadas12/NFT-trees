"use client"

import { useState } from "react"
import { MapPin, Filter, Search, Calendar, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockTrees = [
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
  },
  {
    id: 3,
    species: "Mahogany",
    location: "Costa Rica",
    coordinates: "9.7489° N, 83.7534° W",
    plantedDate: "2023-11-10",
    age: "1 year 2 months",
    carbonOffset: "25.8 kg CO2",
    status: "Thriving",
    nftId: "#1236",
    image: "https://imgs.search.brave.com/X90vqin2GmexmPmnGBDZkfqfhfUXTa3lINvQllbZhTc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTU3/NzY5NDA3My9waG90/by9tYWhvZ2FueS10/cmVlLWFnYWluc3Qt/YS1ibHVlLXNreS1i/YWNrZ3JvdW5kLmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1V/M0RJQmlEeUg4R0ZM/R085SmcyN0VPWnkt/RjgwSVN2eFRrNzFK/dWo4dHFzPQ",
  },
]

export default function TreeMapPage() {
  const [selectedTree, setSelectedTree] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSpecies, setFilterSpecies] = useState("all")

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
                      placeholder="Search by location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
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

                <Button className="w-full bg-green-600 hover:bg-green-700">Apply Filters</Button>
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
            {/* Interactive Map Placeholder */}
            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive World Map</h3>
                    <p className="text-gray-600">Click on markers to view tree details</p>
                  </div>

                  {/* Mock map markers */}
                  <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-green-600 rounded-full animate-pulse cursor-pointer"></div>
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-green-600 rounded-full animate-pulse cursor-pointer"></div>
                  <div className="absolute top-3/4 right-1/3 w-4 h-4 bg-green-600 rounded-full animate-pulse cursor-pointer"></div>
                </div>
              </CardContent>
            </Card>

            {/* Tree List */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Recent Plantings</h3>
              {mockTrees.map((tree) => (
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
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                Load More Trees
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
