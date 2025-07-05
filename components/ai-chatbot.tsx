"use client"

import type React from "react"

import { useState } from "react"
import { useChat } from "ai/react"
import { Bot, Send, Sparkles, X, TrendingUp, Users, DollarSign, Target, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { predefinedInsights, type BusinessData } from "../lib/ai-insights"

interface AIChatbotProps {
  businessData: BusinessData
}

export function AIChatbot({ businessData }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = useChat({
    api: "/api/chat",
    body: { businessData },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: `👋 Hi! I'm your AI business advisor. I've analyzed your current metrics and calendar patterns.

**Quick Insights:**
• Revenue is trending ${businessData.revenue[businessData.revenue.length - 1]?.revenue > businessData.revenue[businessData.revenue.length - 2]?.revenue ? "📈 upward" : "📉 downward"}
• You have ${businessData.customers[businessData.customers.length - 1]?.customers} active customers
• Current churn rate: ${businessData.customers[businessData.customers.length - 1]?.churn}%
• ⏰ You're spending too much time in meetings - I can help optimize your schedule!

Ask me about your business metrics, time management, or productivity improvements!`,
      },
    ],
  })

  const handlePredefinedQuestion = (question: string, id: string) => {
    setSelectedInsight(id)
    const syntheticEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>

    // Set the input value and submit
    handleInputChange({ target: { value: question } } as React.ChangeEvent<HTMLInputElement>)
    setTimeout(() => {
      handleSubmit(syntheticEvent)
    }, 100)
  }

  const getInsightIcon = (id: string) => {
    switch (id) {
      case "revenue-optimization":
        return <DollarSign className="h-4 w-4" />
      case "customer-retention":
        return <Users className="h-4 w-4" />
      case "growth-strategy":
        return <TrendingUp className="h-4 w-4" />
      case "cost-management":
        return <Target className="h-4 w-4" />
      case "time-optimization":
        return <Calendar className="h-4 w-4" />
      case "productivity-boost":
        return <Sparkles className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Bot className="h-5 w-5 mr-2" />
          AI Advisor
          <Badge variant="secondary" className="ml-2 bg-white/20 text-white border-0">
            New
          </Badge>
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[600px]">
      <Card className="h-full shadow-2xl border-2">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <CardTitle className="text-lg">AI Business Advisor</CardTitle>
                <CardDescription className="text-blue-100">Get insights on your startup metrics</CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 h-full flex flex-col">
          {/* Predefined Insights */}
          <div className="p-4 border-b bg-gray-50">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Quick Insights
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {predefinedInsights.slice(0, 4).map((insight) => (
                <Button
                  key={insight.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePredefinedQuestion(insight.question, insight.id)}
                  className={`text-xs h-auto p-2 justify-start ${
                    selectedInsight === insight.id ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  disabled={isLoading}
                >
                  {getInsightIcon(insight.id)}
                  <span className="ml-1 truncate">{insight.title}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center gap-2 mb-2">
                        <Bot className="h-4 w-4" />
                        <span className="text-xs font-medium">AI Advisor</span>
                      </div>
                    )}
                    <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4 animate-pulse" />
                      <span className="text-xs">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Form */}
          <div className="p-4 border-t">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask about your business metrics..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Ask about revenue, customers, growth strategies, or any business insights.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
