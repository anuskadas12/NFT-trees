"use client"

import { useState } from "react"
import { Bot, Zap, Globe, Camera, BarChart3, Leaf, MapPin, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AIToolModal } from "@/components/ai-tool-modal"

const aiTools = [
  {
    name: "Smart Species Selection",
    description:
      "AI analyzes climate data, soil conditions, and local ecosystems to recommend the best tree species for each location.",
    icon: Zap,
    features: ["Climate analysis", "Soil compatibility", "Native species priority", "Survival rate prediction"],
    status: "Active",
    accuracy: "94%",
  },
  {
    name: "Impact Prediction",
    description:
      "Machine learning models predict carbon sequestration, biodiversity impact, and long-term environmental benefits.",
    icon: Globe,
    features: [
      "Carbon sequestration modeling",
      "Biodiversity impact",
      "Growth rate prediction",
      "Environmental benefits",
    ],
    status: "Active",
    accuracy: "89%",
  },
  {
    name: "Growth Monitoring",
    description:
      "Computer vision analyzes satellite imagery to track tree growth and health, updating NFT metadata automatically.",
    icon: Camera,
    features: ["Satellite imagery analysis", "Growth tracking", "Health monitoring", "Automatic NFT updates"],
    status: "Beta",
    accuracy: "91%",
  },
  {
    name: "Location Optimization",
    description:
      "Advanced algorithms identify optimal planting locations based on environmental factors and conservation priorities.",
    icon: MapPin,
    features: [
      "Site suitability analysis",
      "Conservation priority mapping",
      "Risk assessment",
      "Accessibility evaluation",
    ],
    status: "Active",
    accuracy: "96%",
  },
  {
    name: "Impact Analytics",
    description: "Comprehensive analytics dashboard powered by AI to track and visualize environmental impact metrics.",
    icon: BarChart3,
    features: ["Real-time analytics", "Impact visualization", "Trend analysis", "Predictive insights"],
    status: "Active",
    accuracy: "92%",
  },
  {
    name: "Ecosystem Modeling",
    description:
      "AI models simulate ecosystem interactions to optimize reforestation strategies and maximize biodiversity.",
    icon: Leaf,
    features: [
      "Ecosystem simulation",
      "Species interaction modeling",
      "Biodiversity optimization",
      "Habitat restoration",
    ],
    status: "Coming Soon",
    accuracy: "TBD",
  },
]

export default function AIToolsPage() {
  const [selectedTool, setSelectedTool] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">
              <Bot className="w-4 h-4 mr-2" />
              AI-Powered Platform
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Intelligent Environmental Tools</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Leverage cutting-edge artificial intelligence to maximize environmental impact, optimize reforestation
              efforts, and create lasting change for our planet.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {aiTools.map((tool, index) => {
            const IconComponent = tool.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow border-2 hover:border-blue-200">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <Badge
                      className={`${
                        tool.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : tool.status === "Beta"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {tool.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{tool.name}</CardTitle>
                  <CardDescription className="text-gray-600">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Accuracy</span>
                      <span className="text-sm font-bold text-blue-600">{tool.accuracy}</span>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features</h4>
                      <ul className="space-y-1">
                        {tool.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className={`w-full ${
                        tool.status === "Coming Soon"
                          ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                      disabled={tool.status === "Coming Soon"}
                      onClick={() => {
                        if (tool.status !== "Coming Soon") {
                          setSelectedTool(tool)
                          setIsModalOpen(true)
                        }
                      }}
                    >
                      {tool.status === "Coming Soon" ? "Coming Soon" : "Learn More"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* How AI Works Section */}
        <div className="bg-white rounded-2xl p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our AI Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI systems work together to create the most effective reforestation strategy possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Data Collection</h3>
              <p className="text-gray-600 text-sm">
                Gather environmental data from satellites, sensors, and partner organizations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">AI Analysis</h3>
              <p className="text-gray-600 text-sm">
                Machine learning models process data to identify optimal planting strategies
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Smart Recommendations</h3>
              <p className="text-gray-600 text-sm">
                Generate personalized recommendations for species, locations, and timing
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Continuous Learning</h3>
              <p className="text-gray-600 text-sm">
                Monitor results and improve predictions based on real-world outcomes
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-blue-600 mb-2">94.2%</div>
              <div className="text-gray-600">Average Tree Survival Rate</div>
              <div className="text-sm text-gray-500 mt-2">vs 78% industry average</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-green-600 mb-2">2.3x</div>
              <div className="text-gray-600">Faster Growth Rate</div>
              <div className="text-sm text-gray-500 mt-2">with AI-optimized placement</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <div className="text-4xl font-bold text-purple-600 mb-2">15M+</div>
              <div className="text-gray-600">Data Points Analyzed</div>
              <div className="text-sm text-gray-500 mt-2">daily environmental monitoring</div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Harness AI for Good?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our platform and let artificial intelligence guide your environmental impact
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Using AI Tools
            </Button>
            <Button size="lg" variant="outline" className="text-black hover:bg-gray-100 hover:text-blue-600">
              View Documentation
            </Button>
          </div>
        </div>
        {selectedTool && <AIToolModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} tool={selectedTool} />}
      </div>
    </div>
  )
}
