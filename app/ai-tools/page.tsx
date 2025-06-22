"use client"

import { useState } from "react"
import { Bot, Zap, Globe, Camera, BarChart3, Leaf, MapPin, TrendingUp, Send, X, MessageCircle, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const aiTools = [
  {
    name: "Smart Species Selection",
    description:
      "AI analyzes climate data, soil conditions, and local ecosystems to recommend the best tree species for each location.",
    icon: Zap,
    features: ["Climate analysis", "Soil compatibility", "Native species priority", "Survival rate prediction"],
    status: "Active",
    accuracy: "94%",
    detailedDescription: "Our advanced machine learning algorithms process over 50 environmental variables including temperature patterns, precipitation data, soil pH, drainage characteristics, and existing biodiversity to recommend the optimal tree species for any given location. The system has been trained on data from over 10,000 successful reforestation projects worldwide.",
    benefits: [
      "Increase tree survival rates by up to 40%",
      "Reduce replanting costs and maintenance",
      "Support native ecosystem restoration",
      "Optimize carbon sequestration potential"
    ]
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
    detailedDescription: "Using sophisticated climate models and historical growth data, our AI predicts the long-term environmental impact of reforestation projects. The system accounts for tree growth patterns, carbon absorption rates, wildlife habitat creation, and soil improvement over time spans of up to 50 years.",
    benefits: [
      "Accurate carbon credit calculations",
      "ROI projections for environmental investments",
      "Biodiversity impact assessment",
      "Long-term ecosystem health monitoring"
    ]
  },
  {
    name: "Growth Monitoring",
    description:
      "Computer vision analyzes satellite imagery to track tree growth and health, updating NFT metadata automatically.",
    icon: Camera,
    features: ["Satellite imagery analysis", "Growth tracking", "Health monitoring", "Automatic NFT updates"],
    status: "Beta",
    accuracy: "91%",
    detailedDescription: "Our computer vision system processes high-resolution satellite imagery to monitor individual trees and forest areas. Using advanced image recognition and change detection algorithms, we track growth rates, identify health issues, and automatically update digital certificates with real-time data.",
    benefits: [
      "Real-time growth tracking without site visits",
      "Early detection of tree health issues",
      "Automated reporting and documentation",
      "Transparent impact verification"
    ]
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
    detailedDescription: "Our geospatial AI analyzes topographical data, land use patterns, water availability, and conservation priorities to identify the most impactful planting locations. The system considers factors like erosion risk, wildlife corridors, and accessibility for maintenance to ensure long-term project success.",
    benefits: [
      "Maximize environmental impact per tree planted",
      "Reduce project implementation costs",
      "Ensure long-term site accessibility",
      "Support wildlife corridor development"
    ]
  },
  {
    name: "Impact Analytics",
    description: "Comprehensive analytics dashboard powered by AI to track and visualize environmental impact metrics.",
    icon: BarChart3,
    features: ["Real-time analytics", "Impact visualization", "Trend analysis", "Predictive insights"],
    status: "Active",
    accuracy: "92%",
    detailedDescription: "Our analytics platform processes data from multiple sources to provide comprehensive insights into environmental impact. Machine learning algorithms identify trends, predict outcomes, and generate actionable recommendations for improving reforestation effectiveness.",
    benefits: [
      "Data-driven decision making",
      "Performance benchmarking",
      "Automated impact reporting",
      "Stakeholder engagement tools"
    ]
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
    detailedDescription: "Our ecosystem modeling AI simulates complex ecological interactions to predict how different species combinations will affect local biodiversity. The system models plant-animal interactions, nutrient cycles, and habitat connectivity to design optimal reforestation strategies.",
    benefits: [
      "Enhanced biodiversity outcomes",
      "Reduced ecological risks",
      "Optimized species mix planning",
      "Wildlife habitat enhancement"
    ]
  },
]

// Tool Detail Modal Component
type ToolModalProps = {
  tool: typeof aiTools[0] | null
  isOpen: boolean
  onClose: () => void
}

function ToolModal({ tool, isOpen, onClose }: ToolModalProps) {
  if (!isOpen || !tool) return null

  const IconComponent = tool.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{tool.name}</h2>
                <div className="flex items-center space-x-3 mt-1">
                  <Badge className="bg-white/20 text-white hover:bg-white/20">
                    {tool.status}
                  </Badge>
                  <span className="text-blue-100">Accuracy: {tool.accuracy}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-10 w-10 p-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Overview</h3>
                <p className="text-gray-600 leading-relaxed">{tool.detailedDescription}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tool.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Benefits</h3>
                <ul className="space-y-3">
                  {tool.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <ArrowRight className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Technical Specifications</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${
                      tool.status === 'Active' ? 'text-green-600' : 
                      tool.status === 'Beta' ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {tool.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accuracy:</span>
                    <span className="font-medium text-blue-600">{tool.accuracy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Update Frequency:</span>
                    <span className="font-medium text-gray-800">Real-time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={tool.status === "Coming Soon"}
              >
                {tool.status === "Coming Soon" ? "Coming Soon" : "Try This Tool"}
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// AI Chat Component
type AIChatBoxProps = {
  isOpen: boolean
  onClose: () => void
}

function AIChatBox({ isOpen, onClose }: AIChatBoxProps) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm your AI environmental assistant. I can help you with tree species selection, planting locations, environmental impact analysis, and more. What would you like to know?"
    }
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = { role: "user", content: inputMessage }
    setMessages(prev => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response with realistic delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage)
      setMessages(prev => [...prev, { role: "assistant", content: aiResponse }])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase()
    
    if (input.includes("species") || input.includes("tree")) {
      return "Based on your location and climate data, I recommend considering native species like Oak, Maple, or Pine trees. These have a 94% survival rate in similar conditions. Would you like specific recommendations for your area?"
    }
    
    if (input.includes("carbon") || input.includes("sequestration")) {
      return "A mature tree can sequester approximately 48 pounds of CO2 per year. Based on our AI models, planting 100 trees in optimal locations could offset about 2.4 tons of CO2 annually. Would you like a detailed carbon impact projection?"
    }
    
    if (input.includes("location") || input.includes("where")) {
      return "Our location optimization AI considers soil pH, drainage, sunlight exposure, and existing ecosystem. I can analyze satellite data for your specific coordinates. What's your target planting area?"
    }
    
    if (input.includes("cost") || input.includes("price")) {
      return "Reforestation costs vary by location and species. Typically $0.50-$3 per tree including planting. Our AI optimization can reduce costs by 30% through efficient planning. Would you like a cost estimate for your project?"
    }
    
    if (input.includes("monitor") || input.includes("track")) {
      return "Our AI monitoring uses satellite imagery updated weekly to track tree growth and health. We provide real-time alerts for any issues. Each tree gets a digital passport with growth metrics. Want to see a monitoring demo?"
    }
    
    if (input.includes("biodiversity") || input.includes("ecosystem")) {
      return "Our ecosystem modeling AI simulates species interactions to maximize biodiversity. Mixed plantings increase wildlife habitat by 60%. I can design a biodiversity-optimized planting plan for your area."
    }
    
    if (input.includes("hello") || input.includes("hi")) {
      return "Hello! I'm excited to help you make a positive environmental impact. What aspect of reforestation or environmental conservation would you like to explore today?"
    }
    
    return "That's a great question! Our AI tools can help with species selection, location optimization, impact prediction, and monitoring. Could you tell me more about your specific reforestation goals or the area you're interested in?"
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="w-96 h-96 shadow-2xl border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="w-5 h-5" />
              <CardTitle className="text-lg">AI Environmental Assistant</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-blue-100">Online</span>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 flex flex-col h-80">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about tree species, locations, impact..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 h-10 w-10 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

type AiTool = {
  name: string
  description: string
  icon: React.ComponentType<any>
  features: string[]
  status: string
  accuracy: string
  detailedDescription: string
  benefits: string[]
}

export default function AIToolsPage() {
  const [selectedTool, setSelectedTool] = useState<AiTool | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleLearnMore = (tool: AiTool) => {
    setSelectedTool(tool)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedTool(null)
  }

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
                      onClick={() => handleLearnMore(tool)}
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
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start Using AI Tools
            </Button>
            <Button size="lg" variant="outline" className="text-black hover:bg-gray-100 hover:text-blue-600">
              View Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Tool Detail Modal */}
      <ToolModal tool={selectedTool} isOpen={isModalOpen} onClose={closeModal} />

      {/* AI Chat Box */}
      <AIChatBox isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}