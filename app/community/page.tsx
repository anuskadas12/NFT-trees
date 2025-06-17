"use client"

import { useState } from "react"
import {
  Users,
  MessageSquare,
  Vote,
  Trophy,
  Calendar,
  MapPin,
  Heart,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Bell,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"

const mockProposals = [
  {
    id: 1,
    title: "Partner with Amazon Rainforest Foundation",
    description: "Proposal to establish a partnership with ARF to expand our reforestation efforts in Brazil.",
    fullDescription:
      "This comprehensive partnership proposal outlines a strategic alliance with the Amazon Rainforest Foundation to significantly expand our reforestation efforts across Brazil. The partnership would involve joint funding, shared expertise, and coordinated planting initiatives targeting 50,000 new trees over the next 12 months. Key benefits include access to ARF's established local networks, proven conservation methodologies, and enhanced credibility in the environmental sector.",
    author: "EcoLeader",
    votes: { for: 1247, against: 89 },
    status: "Active",
    timeLeft: "5 days",
    category: "Partnership",
    userVoted: null,
  },
  {
    id: 2,
    title: "Implement Tree Health Monitoring System",
    description: "Deploy IoT sensors to monitor tree health and growth in real-time across all planting sites.",
    fullDescription:
      "This proposal introduces a cutting-edge IoT monitoring system that will revolutionize how we track and maintain our planted trees. The system includes soil moisture sensors, growth tracking devices, and environmental monitoring equipment that will provide real-time data on tree health, survival rates, and optimal growing conditions. This data-driven approach will help us improve our planting success rates and provide transparent reporting to our community.",
    author: "TechForest",
    votes: { for: 892, against: 156 },
    status: "Active",
    timeLeft: "12 days",
    category: "Technology",
    userVoted: null,
  },
  {
    id: 3,
    title: "Launch Educational Program for Schools",
    description: "Create an educational initiative to teach children about environmental conservation.",
    fullDescription:
      "This educational program aims to reach 10,000 students across 100 schools with comprehensive environmental education. The program includes interactive workshops, tree planting activities, digital learning resources, and teacher training modules. Students will learn about climate change, biodiversity, and sustainable practices while participating in hands-on conservation activities.",
    author: "GreenEducator",
    votes: { for: 2156, against: 45 },
    status: "Passed",
    timeLeft: "Ended",
    category: "Education",
    userVoted: "for",
  },
]

const mockDiscussions = [
  {
    id: 1,
    title: "Best practices for urban reforestation",
    author: "CityPlanner",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    category: "Discussion",
    preview: "What are your thoughts on the most effective strategies for planting trees in urban environments?",
    userLiked: false,
    comments: [
      {
        id: 1,
        author: "TreeExpert",
        content: "Native species selection is crucial for urban environments.",
        timeAgo: "1 hour ago",
      },
      {
        id: 2,
        author: "UrbanPlanner",
        content: "Don't forget about root space and utility line considerations!",
        timeAgo: "45 minutes ago",
      },
    ],
  },
  {
    id: 2,
    title: "Carbon offset calculation methodology",
    author: "DataScientist",
    replies: 18,
    likes: 67,
    timeAgo: "5 hours ago",
    category: "Technical",
    preview: "Looking for feedback on our current carbon offset calculation methods...",
    userLiked: true,
    comments: [],
  },
  {
    id: 3,
    title: "Success story: 1000 trees in Madagascar",
    author: "ConservationHero",
    replies: 34,
    likes: 128,
    timeAgo: "1 day ago",
    category: "Success Story",
    preview: "Excited to share the results of our latest planting project in Madagascar!",
    userLiked: false,
    comments: [],
  },
]

const mockLeaderboard = [
  { rank: 1, name: "EcoWarrior2024", trees: 1247, votes: 89, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 2, name: "ForestGuardian", trees: 1156, votes: 76, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 3, name: "GreenThumb", trees: 1089, votes: 82, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 4, name: "TreeHugger", trees: 967, votes: 65, avatar: "/placeholder.svg?height=40&width=40" },
  { rank: 5, name: "NatureLover", trees: 834, votes: 58, avatar: "/placeholder.svg?height=40&width=40" },
]

const mockEvents = [
  {
    id: 1,
    title: "Global Tree Planting Day",
    description: "Join thousands of community members in a coordinated global tree planting event.",
    date: "March 21, 2024",
    location: "Worldwide",
    type: "planting",
    userJoined: false,
    reminderSet: false,
  },
  {
    id: 2,
    title: "Community AMA Session",
    description: "Ask questions to the NFTrees team and learn about upcoming features and partnerships.",
    date: "March 15, 2024",
    location: "Discord",
    type: "virtual",
    userJoined: false,
    reminderSet: false,
  },
]

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("governance")
  const [proposals, setProposals] = useState(mockProposals)
  const [discussions, setDiscussions] = useState(mockDiscussions)
  const [events, setEvents] = useState(mockEvents)
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [selectedDiscussion, setSelectedDiscussion] = useState(null)
  const [newComment, setNewComment] = useState("")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  type ShareContent = ShareableContent & { type: string }
  const [shareContent, setShareContent] = useState<ShareContent | null>(null)

  const handleVote = (proposalId: number, voteType: 'for' | 'against') => {
    setProposals((prev) =>
      prev.map((proposal) => {
        if (proposal.id === proposalId) {
          const updatedProposal = { ...proposal }

          // Remove previous vote if exists
          if (proposal.userVoted === "for") {
            updatedProposal.votes.for -= 1
          } else if (proposal.userVoted === "against") {
            updatedProposal.votes.against -= 1
          }

          // Add new vote
          if (voteType === "for") {
            updatedProposal.votes.for += 1
            updatedProposal.userVoted = "for"
          } else {
            updatedProposal.votes.against += 1
            updatedProposal.userVoted = "against"
          }

          return updatedProposal
        }
        return proposal
      }),
    )

    toast({
      title: "Vote Recorded",
      description: `Your vote ${voteType === "for" ? "in favor" : "against"} has been recorded.`,
    })
  }

  const handleLike = (discussionId: number) => {
    setDiscussions((prev) =>
      prev.map((discussion) => {
        if (discussion.id === discussionId) {
          const updatedDiscussion = { ...discussion }
          if (discussion.userLiked) {
            updatedDiscussion.likes -= 1
            updatedDiscussion.userLiked = false
          } else {
            updatedDiscussion.likes += 1
            updatedDiscussion.userLiked = true
          }
          return updatedDiscussion
        }
        return discussion
      }),
    )
  }

  type ShareableContent = {
    id: number;
    title: string;
    description?: string;
    preview?: string;
  };

  const handleShare = (content: ShareableContent, type: string) => {
    setShareContent({ ...content, type })
    setShareDialogOpen(true)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Link has been copied to your clipboard.",
    })
    setShareDialogOpen(false)
  }

  const handleJoinEvent = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id === eventId) {
          return { ...event, userJoined: !event.userJoined }
        }
        return event
      }),
    )

    const event = events.find((e) => e.id === eventId)
    toast({
      title: event?.userJoined ? "Left Event" : "Joined Event",
      description: event?.userJoined ? "You have left the event." : "You have successfully joined the event!",
    })
  }

  const handleSetReminder = (eventId: number) => {
    setEvents((prev) =>
      prev.map((event) => {
        if (event.id === eventId) {
          return { ...event, reminderSet: !event.reminderSet }
        }
        return event
      }),
    )

    const event = events.find((e) => e.id === eventId)
    toast({
      title: event?.reminderSet ? "Reminder Removed" : "Reminder Set",
      description: event?.reminderSet ? "Reminder has been removed." : "You'll be notified before the event starts!",
    })
  }

  const handleAddComment = (discussionId: number) => {
    if (!newComment.trim()) return

    setDiscussions((prev) =>
      prev.map((discussion) => {
        if (discussion.id === discussionId) {
          const newCommentObj = {
            id: Date.now(),
            author: "You",
            content: newComment,
            timeAgo: "just now",
          }
          return {
            ...discussion,
            comments: [...discussion.comments, newCommentObj],
            replies: discussion.replies + 1,
          }
        }
        return discussion
      }),
    )

    setNewComment("")
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
              <p className="text-gray-600 mt-2">Connect, collaborate, and shape the future of NFTrees</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800">
                <Users className="w-4 h-4 mr-1" />
                12,547 Members
              </Badge>
              <Button className="bg-green-600 hover:bg-green-700 text-white">Join Discussion</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Community Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">12,547</div>
              <div className="text-gray-600">Active Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Vote className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-gray-600">Active Proposals</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-gray-600">Discussions</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">156</div>
              <div className="text-gray-600">Implemented Ideas</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="governance">DAO Governance</TabsTrigger>
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="governance" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Active Proposals</h2>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Create Proposal</Button>
              </div>

              {proposals.map((proposal) => (
                <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{proposal.title}</h3>
                          <Badge
                            className={`${
                              proposal.status === "Active"
                                ? "bg-blue-100 text-blue-800"
                                : proposal.status === "Passed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {proposal.status}
                          </Badge>
                          <Badge variant="outline">{proposal.category}</Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{proposal.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>By {proposal.author}</span>
                          <span>•</span>
                          <span>{proposal.timeLeft} remaining</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleShare(proposal, "proposal")}>
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">For: {proposal.votes.for}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium">Against: {proposal.votes.against}</span>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500">
                          {Math.round((proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100)}%
                          approval
                        </div>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${(proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100}%`,
                          }}
                        ></div>
                      </div>

                      <div className="flex space-x-3">
                        {proposal.status === "Active" && (
                          <>
                            <Button
                              className={`${proposal.userVoted === "for" ? "bg-green-700" : "bg-green-600"} hover:bg-green-700 text-white`}
                              onClick={() => handleVote(proposal.id, "for")}
                            >
                              <ThumbsUp className="w-4 h-4 mr-2" />
                              Vote For
                            </Button>
                            <Button
                              variant="outline"
                              className={`${proposal.userVoted === "against" ? "border-red-700 text-red-700 bg-red-50" : "border-red-600 text-red-600"} hover:bg-red-50`}
                              onClick={() => handleVote(proposal.id, "against")}
                            >
                              <ThumbsDown className="w-4 h-4 mr-2" />
                              Vote Against
                            </Button>
                          </>
                        )}
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{proposal.title}</DialogTitle>
                              <DialogDescription>
                                Proposed by {proposal.author} • {proposal.category}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p className="text-gray-700">{proposal.fullDescription}</p>
                              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-6">
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">{proposal.votes.for}</div>
                                    <div className="text-sm text-gray-600">For</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-red-600">{proposal.votes.against}</div>
                                    <div className="text-sm text-gray-600">Against</div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-semibold">
                                    {Math.round(
                                      (proposal.votes.for / (proposal.votes.for + proposal.votes.against)) * 100,
                                    )}
                                    %
                                  </div>
                                  <div className="text-sm text-gray-600">Approval</div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="discussions" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Community Discussions</h2>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Start Discussion</Button>
              </div>

              {discussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors cursor-pointer">
                            {discussion.title}
                          </h3>
                          <Badge variant="outline">{discussion.category}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{discussion.preview}</p>
                        <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                          <span>By {discussion.author}</span>
                          <span>•</span>
                          <span>{discussion.timeAgo}</span>
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="w-4 h-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <button
                            onClick={() => handleLike(discussion.id)}
                            className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${
                              discussion.userLiked ? "text-red-500" : ""
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${discussion.userLiked ? "fill-current" : ""}`} />
                            <span>{discussion.likes} likes</span>
                          </button>
                        </div>

                        {/* Comments Section */}
                        {discussion.comments.length > 0 && (
                          <div className="space-y-3 mb-4 pl-4 border-l-2 border-gray-200">
                            {discussion.comments.map((comment) => (
                              <div key={comment.id} className="flex items-start space-x-3">
                                <Avatar className="w-6 h-6">
                                  <AvatarFallback className="text-xs">{comment.author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 text-sm">
                                    <span className="font-medium">{comment.author}</span>
                                    <span className="text-gray-500">{comment.timeAgo}</span>
                                  </div>
                                  <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add Comment */}
                        <div className="flex items-center space-x-3">
                          <Input
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(discussion.id)}
                            disabled={!newComment.trim()}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => handleShare(discussion, "discussion")}>
                        <Share2 className="w-4 h-4" />
                      </Button>
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
                  Community Leaderboard
                </CardTitle>
                <CardDescription>Top contributors to the NFTrees ecosystem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboard.map((member) => (
                    <div
                      key={member.rank}
                      className="flex items-center space-x-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          member.rank === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : member.rank === 2
                              ? "bg-gray-100 text-gray-800"
                              : member.rank === 3
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {member.rank}
                      </div>
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.trees} trees planted</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{member.votes}</p>
                        <p className="text-sm text-gray-600">votes cast</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Create Event</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <Card key={event.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            event.type === "planting" ? "bg-green-100" : "bg-blue-100"
                          }`}
                        >
                          {event.type === "planting" ? (
                            <Calendar
                              className={`w-6 h-6 ${event.type === "planting" ? "text-green-600" : "text-blue-600"}`}
                            />
                          ) : (
                            <Users className="w-6 h-6 text-blue-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg text-gray-900">{event.title}</h3>
                            <Button variant="ghost" size="sm" onClick={() => handleShare(event, "event")}>
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-gray-600 mb-3">{event.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {event.date}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {event.location}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              className={`flex-1 ${
                                event.userJoined ? "bg-gray-600 hover:bg-gray-700" : "bg-green-600 hover:bg-green-700"
                              } text-white`}
                              onClick={() => handleJoinEvent(event.id)}
                            >
                              {event.userJoined ? "Leave Event" : "Join Event"}
                            </Button>
                            <Button
                              variant="outline"
                              className={`${
                                event.reminderSet
                                  ? "border-orange-600 text-orange-600 bg-orange-50"
                                  : "border-blue-600 text-blue-600 hover:bg-blue-50"
                              }`}
                              onClick={() => handleSetReminder(event.id)}
                            >
                              <Bell className="w-4 h-4 mr-2" />
                              {event.reminderSet ? "Remove Reminder" : "Set Reminder"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share {shareContent?.type}</DialogTitle>
            <DialogDescription>Share this {shareContent?.type} with your network</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{shareContent?.title}</h4>
              <p className="text-sm text-gray-600">{shareContent?.description || shareContent?.preview}</p>
            </div>
            <div className="space-y-3">
              <Label>Share via:</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(`https://nftrees.com/${shareContent?.type}/${shareContent?.id}`)}
                >
                  Copy Link
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      `https://twitter.com/intent/tweet?text=Check out this ${shareContent?.type}: ${shareContent?.title}&url=https://nftrees.com/${shareContent?.type}/${shareContent?.id}`,
                      "_blank",
                    )
                    setShareDialogOpen(false)
                  }}
                >
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      `https://www.facebook.com/sharer/sharer.php?u=https://nftrees.com/${shareContent?.type}/${shareContent?.id}`,
                      "_blank",
                    )
                    setShareDialogOpen(false)
                  }}
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=https://nftrees.com/${shareContent?.type}/${shareContent?.id}`,
                      "_blank",
                    )
                    setShareDialogOpen(false)
                  }}
                >
                  LinkedIn
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
