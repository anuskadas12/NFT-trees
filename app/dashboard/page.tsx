"use client"

import { useState } from "react"
import { Leaf, Trophy, TrendingUp, MapPin, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

const mockUserData = {
  username: "EcoWarrior2024",
  walletAddress: "0x1234...5678",
  treesPlanted: 47,
  carbonOffset: "1,247 kg CO2",
  nftsOwned: 23,
  totalValue: "12.4 ETH",
  rank: 156,
  achievements: [
    { name: "First Tree", description: "Planted your first tree", earned: true, icon: "🌱" },
    { name: "Forest Guardian", description: "Plant 50 trees", earned: false, icon: "🌳", progress: 94 },
    { name: "Carbon Hero", description: "Offset 1 ton of CO2", earned: true, icon: "🌍" },
    { name: "Community Leader", description: "Refer 10 friends", earned: false, icon: "👥", progress: 60 },
  ],
}

const mockTrees = [
  {
    id: 1,
    name: "My First Oak",
    species: "Oak Tree",
    location: "California, USA",
    plantedDate: "2024-01-15",
    age: "11 months",
    status: "Thriving",
    carbonOffset: "25.4 kg CO2",
    nftId: "#1234",
    image: "/images/nft-oak-tree.jpg",
    growth: 85,
  },
  {
    id: 2,
    name: "Rainforest Hope",
    species: "Mahogany",
    location: "Costa Rica",
    plantedDate: "2024-03-20",
    age: "8 months",
    status: "Healthy",
    carbonOffset: "18.7 kg CO2",
    nftId: "#1235",
    image: "https://imgs.search.brave.com/rKURiAANTdNzBGcHGv000vJMiF_XQZbLeMgQdBAccng/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTQ5/NjU4OTgxNC9waG90/by9yZWQtbWFob2dh/bnktdHJlZS1raXJz/dGVuYm9zY2gtY2Fw/ZS10b3duLXNvdXRo/LWFmcmljYS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9MTIx/OXNhWXpsbmZCS2Nw/YWFfVFYzZENjM1At/TW1KSXBlOXpOWEFl/SGdYMD0",
    growth: 65,
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {mockUserData.username}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <Trophy className="w-4 h-4 mr-1" />
                Rank #{mockUserData.rank}
              </Badge>
              <Link href="/plant">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Plant New Tree</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Trees Planted</p>
                  <p className="text-3xl font-bold text-green-600">{mockUserData.treesPlanted}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Carbon Offset</p>
                  <p className="text-3xl font-bold text-blue-600">{mockUserData.carbonOffset}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">NFTs Owned</p>
                  <p className="text-3xl font-bold text-purple-600">{mockUserData.nftsOwned}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Portfolio Value</p>
                  <p className="text-3xl font-bold text-orange-600">{mockUserData.totalValue}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="trees">My Trees</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest environmental impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Planted Mahogany Tree</p>
                        <p className="text-sm text-gray-600">Costa Rica • 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">NFT Value Increased</p>
                        <p className="text-sm text-gray-600">Oak Tree #1234 • 1 week ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Achievement Unlocked</p>
                        <p className="text-sm text-gray-600">Carbon Hero • 2 weeks ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Impact Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Impact</CardTitle>
                  <CardDescription>Trees planted and carbon offset over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <p className="text-gray-600">Impact chart visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trees" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockTrees.map((tree) => (
                <Card key={tree.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={tree.image || "/placeholder.svg"}
                        alt={tree.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{tree.name}</h3>
                        <p className="text-gray-600 text-sm">{tree.species}</p>
                        <p className="text-gray-500 text-sm flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {tree.location}
                        </p>
                      </div>
                      <Badge
                        className={`${
                          tree.status === "Thriving" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {tree.status}
                      </Badge>
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Growth Progress</span>
                        <span className="font-medium">{tree.growth}%</span>
                      </div>
                      <Progress value={tree.growth} className="h-2" />

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Age</span>
                          <p className="font-medium">{tree.age}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">CO2 Offset</span>
                          <p className="font-medium text-green-600">{tree.carbonOffset}</p>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockUserData.achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className={`${achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`text-4xl ${achievement.earned ? "grayscale-0" : "grayscale"}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-900">{achievement.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>

                        {achievement.earned ? (
                          <Badge className="bg-green-100 text-green-800">
                            <Award className="w-3 h-3 mr-1" />
                            Earned
                          </Badge>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Progress</span>
                              <span className="font-medium">{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-2" />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>Top environmental impact contributors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((rank) => (
                    <div
                      key={rank}
                      className={`flex items-center space-x-4 p-4 rounded-lg ${
                        rank === 3 ? "bg-green-50 border border-green-200" : "bg-gray-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          rank === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : rank === 2
                              ? "bg-gray-100 text-gray-800"
                              : rank === 3
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {rank}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{rank === 3 ? "EcoWarrior2024 (You)" : `TreePlanter${rank}`}</p>
                        <p className="text-sm text-gray-600">{150 - rank * 10} trees planted</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{2000 - rank * 200} kg CO2</p>
                        <p className="text-sm text-gray-600">offset</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
