"use client"

import { useState } from "react"
import { MapPin, Info, ArrowRight, CheckCircle, X, Leaf, Globe, Calendar, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const treeSpecies = [
  {
    name: "Oak Tree",
    scientificName: "Quercus",
    cost: 0.05,
    carbonOffset: "22 kg CO2/year",
    lifespan: "100+ years",
    regions: ["North America", "Europe"],
    image: "/images/nft-oak-tree.jpg",
    description: "Strong, long-lived trees perfect for temperate climates",
  },
  {
    name: "Mahogany",
    scientificName: "Swietenia",
    cost: 0.08,
    carbonOffset: "35 kg CO2/year",
    lifespan: "200+ years",
    regions: ["Central America", "South America"],
    image: "https://imgs.search.brave.com/dL_NdeSFBLZDWT6Vv8MWHYRJbvVFs8ahIMYkKmR76T8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTg2/Njc5MjM3L3Bob3Rv/L3RyZWUtbWFob2dh/bnktcGluay5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9a1Rf/WHJzLTNwa0pOVzhZ/N1dvN0k2cUctbEZY/SHB5VFBjQVFkYmZh/Z0NnVT0",
    description: "Tropical hardwood trees that support rainforest ecosystems",
  },
  {
    name: "Pine Tree",
    scientificName: "Pinus",
    cost: 0.03,
    carbonOffset: "15 kg CO2/year",
    lifespan: "80+ years",
    regions: ["North America", "Europe", "Asia"],
    image: "https://imgs.search.brave.com/fpnXL2kiWuMZcY0czgRuzl3VXNuzkjjjQXO9clm_N6g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZXBpY2dhcmRlbmlu/Zy5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjMvMDkvRHVy/YW5nby1QaW5lLmpw/Zw",
    description: "Fast-growing conifers ideal for reforestation projects",
  },
  {
    name: "Baobab",
    scientificName: "Adansonia",
    cost: 0.12,
    carbonOffset: "45 kg CO2/year",
    lifespan: "1000+ years",
    regions: ["Africa", "Madagascar"],
    image: "https://imgs.search.brave.com/hgBoSZ_2zpw5IoiO2llnLAKDC5r4f-QLBVTEjNPUNIM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hbmlt/YWxzLnNhbmRpZWdv/em9vLm9yZy9zaXRl/cy9kZWZhdWx0L2Zp/bGVzL3N0eWxlcy9p/bWFnZV9ncmlkX2Z1/bGxfd2lkdGgvcHVi/bGljLzIwMTktMDgv/Ym9hYmFiMDEuanBn/P2l0b2s9SXFwZGVY/dm8",
    description: "Iconic African trees that store water and support communities",
  },
]

const plantingRegions = [
  { name: "Amazon Rainforest, Brazil", partner: "Amazon Conservation", urgency: "Critical" },
  { name: "Madagascar Forests", partner: "Eden Reforestation", urgency: "High" },
  { name: "California Wildfire Areas", partner: "CAL FIRE", urgency: "High" },
  { name: "Sahel Region, Africa", partner: "Great Green Wall", urgency: "Critical" },
  { name: "Indonesian Peatlands", partner: "Borneo Orangutan", urgency: "Critical" },
]

export default function PlantTreePage() {
  const [selectedSpecies, setSelectedSpecies] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [treeCount, setTreeCount] = useState([1])
  const [donationAmount, setDonationAmount] = useState(0)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderCompleted, setOrderCompleted] = useState(false)

  const calculateTotal = () => {
    if (!selectedSpecies) return 0
    const species = treeSpecies.find((s) => s.name === selectedSpecies)
    return species ? species.cost * treeCount[0] + donationAmount : donationAmount
  }

  const selectedSpeciesData = treeSpecies.find((s) => s.name === selectedSpecies)
  const selectedRegionData = plantingRegions.find((r) => r.name === selectedRegion)

  const handlePlantTrees = () => {
    setShowConfirmationModal(true)
  }

  const handleConfirmOrder = async () => {
    setIsProcessing(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsProcessing(false)
    setOrderCompleted(true)
  }

  const handleCloseModal = () => {
    setShowConfirmationModal(false)
    setOrderCompleted(false)
    setIsProcessing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Plant Trees, Mint NFTs</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Choose your tree species, select a planting location, and watch your environmental impact grow
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tree Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Choose Species */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    1
                  </div>
                  Choose Tree Species
                </CardTitle>
                <CardDescription>
                  Select the type of tree you'd like to plant based on your environmental goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {treeSpecies.map((species) => (
                    <Card
                      key={species.name}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedSpecies === species.name ? "ring-2 ring-green-600 bg-green-50" : ""
                      }`}
                      onClick={() => setSelectedSpecies(species.name)}
                    >
                      <CardContent className="p-4">
                        <img
                          src={species.image || "/placeholder.svg"}
                          alt={species.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-lg">{species.name}</h3>
                          <Badge className="bg-green-100 text-green-800">{species.cost} ETH</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{species.description}</p>
                        <div className="space-y-1 text-xs text-gray-500">
                          <div>Carbon: {species.carbonOffset}</div>
                          <div>Lifespan: {species.lifespan}</div>
                          <div>Regions: {species.regions.join(", ")}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Choose Location */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    2
                  </div>
                  Select Planting Location
                </CardTitle>
                <CardDescription>Choose where your trees will be planted by our verified partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plantingRegions.map((region) => (
                    <Card
                      key={region.name}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedRegion === region.name ? "ring-2 ring-green-600 bg-green-50" : ""
                      }`}
                      onClick={() => setSelectedRegion(region.name)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <MapPin className="w-5 h-5 text-green-600" />
                              <h3 className="font-semibold">{region.name}</h3>
                              <Badge
                                className={`${
                                  region.urgency === "Critical"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {region.urgency}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">Partner: {region.partner}</p>
                          </div>
                          {selectedRegion === region.name && <CheckCircle className="w-6 h-6 text-green-600" />}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Quantity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    3
                  </div>
                  Number of Trees
                </CardTitle>
                <CardDescription>How many trees would you like to plant?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Quantity: {treeCount[0]} trees</Label>
                    <div className="mt-4">
                      <Slider
                        value={treeCount}
                        onValueChange={setTreeCount}
                        max={100}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>1 tree</span>
                      <span>100 trees</span>
                    </div>
                  </div>

                  {selectedSpeciesData && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">Environmental Impact</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-green-600">Annual CO2 Offset:</span>
                          <p className="font-medium">
                            {Number.parseInt(selectedSpeciesData.carbonOffset) * treeCount[0]} kg CO2/year
                          </p>
                        </div>
                        <div>
                          <span className="text-green-600">Lifetime Impact:</span>
                          <p className="font-medium">
                            {Number.parseInt(selectedSpeciesData.carbonOffset) * treeCount[0] * 50} kg CO2
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your tree planting order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedSpecies && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Species:</span>
                      <span className="font-medium">{selectedSpecies}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{treeCount[0]} trees</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium text-sm">{selectedRegion || "Not selected"}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-green-600">{calculateTotal().toFixed(3)} ETH</span>
                      </div>
                      <div className="text-sm text-gray-500 text-right">
                        ≈ ${(calculateTotal() * 1700).toFixed(2)} USD
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={!selectedSpecies || !selectedRegion}
                    onClick={handlePlantTrees}
                  >
                    Plant Trees & Mint NFTs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center">
                      <Info className="w-3 h-3 mr-1" />
                      90% goes directly to planting
                    </div>
                    <div className="flex items-center">
                      <Info className="w-3 h-3 mr-1" />
                      NFT minted upon planting confirmation
                    </div>
                    <div className="flex items-center">
                      <Info className="w-3 h-3 mr-1" />
                      GPS coordinates included in metadata
                    </div>
                  </div>
                </div>

                {/* Additional Donation */}
                <div className="border-t pt-4">
                  <Label className="text-sm font-medium">Additional Donation (Optional)</Label>
                  <div className="mt-2 flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(Number.parseFloat(e.target.value) || 0)}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500">ETH</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Support additional conservation efforts</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {orderCompleted ? "Order Confirmed!" : "Confirm Your Tree Planting Order"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {!orderCompleted ? (
                <div className="space-y-6">
                  {/* Order Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Leaf className="w-5 h-5 mr-2 text-green-600" />
                      Order Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-gray-600">Tree Species</Label>
                        <p className="font-medium">{selectedSpecies}</p>
                        <p className="text-sm text-gray-500">{selectedSpeciesData?.scientificName}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Quantity</Label>
                        <p className="font-medium">{treeCount[0]} trees</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm text-gray-600">Planting Location</Label>
                        <p className="font-medium">{selectedRegion}</p>
                        <p className="text-sm text-gray-500">Partner: {selectedRegionData?.partner}</p>
                      </div>
                    </div>
                  </div>

                  {/* Environmental Impact */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Globe className="w-5 h-5 mr-2 text-green-600" />
                      Environmental Impact
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-green-600">Annual CO2 Offset</Label>
                        <p className="font-bold text-lg">
                          {Number.parseInt(selectedSpeciesData?.carbonOffset || "0") * treeCount[0]} kg
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-green-600">Estimated Lifetime Impact</Label>
                        <p className="font-bold text-lg">
                          {Number.parseInt(selectedSpeciesData?.carbonOffset || "0") * treeCount[0] * 50} kg CO2
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                      Payment Summary
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Trees ({treeCount[0]}x @ {selectedSpeciesData?.cost} ETH)</span>
                        <span>{((selectedSpeciesData?.cost ?? 0) * treeCount[0]).toFixed(4)} ETH</span>
                      </div>
                      {donationAmount > 0 && (
                        <div className="flex justify-between">
                          <span>Additional Donation</span>
                          <span>{donationAmount.toFixed(4)} ETH</span>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-green-600">{calculateTotal().toFixed(4)} ETH</span>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        ≈ ${(calculateTotal() * 1700).toFixed(2)} USD
                      </div>
                    </div>
                  </div>

                  {/* NFT Details */}
                  <div className="bg-purple-50 rounded-lg p-4">
                    <h3 className="font-semibold text-lg mb-4 flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                      NFT Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>• Each tree will be represented by a unique NFT</p>
                      <p>• NFTs will include GPS coordinates of planting location</p>
                      <p>• Metadata will contain tree species, planting date, and impact metrics</p>
                      <p>• NFTs will be minted on Ethereum blockchain</p>
                      <p>• You'll receive updates on tree growth via NFT metadata updates</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      onClick={handleCloseModal}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleConfirmOrder}
                      disabled={isProcessing}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isProcessing ? "Processing..." : "Confirm & Pay"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">
                      Trees Successfully Ordered!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your {treeCount[0]} {selectedSpecies.toLowerCase()}(s) will be planted in {selectedRegion}
                    </p>
                    <div className="bg-green-50 rounded-lg p-4 text-left">
                      <h4 className="font-semibold mb-2">What happens next:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>• Trees will be planted within 30 days</li>
                        <li>• NFTs will be minted and sent to your wallet</li>
                        <li>• You'll receive GPS coordinates and photos</li>
                        <li>• Annual growth updates will be provided</li>
                      </ul>
                    </div>
                  </div>
                  <Button
                    onClick={handleCloseModal}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Continue
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}