"use client"

import { useState } from "react"
import { Bot, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AIToolModalProps {
  isOpen: boolean
  onClose: () => void
  tool: {
    name: string
    description: string
    features: string[]
    accuracy: string
    status: string
  }
}

export function AIToolModal({ isOpen, onClose, tool }: AIToolModalProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const mockMetrics = {
    "Smart Species Selection": {
      totalAnalyses: 15420,
      successRate: 94.2,
      avgProcessingTime: "2.3s",
      dataPoints: "Climate, Soil, Ecosystem",
      lastUpdate: "2 hours ago",
    },
    "Impact Prediction": {
      totalPredictions: 8750,
      successRate: 89.1,
      avgProcessingTime: "1.8s",
      dataPoints: "Carbon, Biodiversity, Growth",
      lastUpdate: "1 hour ago",
    },
    "Growth Monitoring": {
      totalMonitored: 50247,
      successRate: 91.5,
      avgProcessingTime: "5.2s",
      dataPoints: "Satellite, Health, Growth",
      lastUpdate: "30 minutes ago",
    },
  }

  const metrics = mockMetrics[tool.name as keyof typeof mockMetrics] || mockMetrics["Smart Species Selection"]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Bot className="w-5 h-5 mr-2 text-blue-600" />
            {tool.name}
          </DialogTitle>
          <DialogDescription>{tool.description}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="documentation">Docs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="flex items-center justify-between">
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
              <div className="text-right">
                <div className="text-sm text-gray-500">Accuracy</div>
                <div className="text-lg font-bold text-blue-600">{tool.accuracy}</div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Data Collection</h4>
                    <p className="text-sm text-gray-600">Gather environmental data from multiple sources</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">AI Analysis</h4>
                    <p className="text-sm text-gray-600">Process data using machine learning algorithms</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Generate Results</h4>
                    <p className="text-sm text-gray-600">Provide actionable insights and recommendations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {metrics.totalAnalyses?.toLocaleString() ||
                      metrics.totalPredictions?.toLocaleString() ||
                      metrics.totalMonitored?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Total Processed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">{metrics.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Accuracy</span>
                    <span>{metrics.successRate}%</span>
                  </div>
                  <Progress value={metrics.successRate} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Avg Processing Time:</span>
                    <p className="font-medium">{metrics.avgProcessingTime}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Data Sources:</span>
                    <p className="font-medium">{metrics.dataPoints}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Updated:</span>
                    <p className="font-medium">{metrics.lastUpdate}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Status:</span>
                    <p className="font-medium text-green-600">Operational</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documentation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">API Documentation</CardTitle>
                <CardDescription>Learn how to integrate this AI tool into your applications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Endpoint</h4>
                  <code className="bg-gray-100 p-2 rounded text-sm block">
                    POST /api/ai/{tool.name.toLowerCase().replace(/\s+/g, "-")}
                  </code>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Example Request</h4>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                    {`{
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194
  },
  "parameters": {
    "climate_data": true,
    "soil_analysis": true
  }
}`}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Response Format</h4>
                  <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
                    {`{
  "success": true,
  "data": {
    "recommendations": [...],
    "confidence": 0.94,
    "processing_time": "2.3s"
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">Try API</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
