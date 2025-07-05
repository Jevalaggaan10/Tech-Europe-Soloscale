import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { generateInsightPrompt } from "../../../lib/ai-insights"

export async function POST(req: Request) {
  try {
    const { messages, businessData } = await req.json()

    const lastMessage = messages[messages.length - 1]
    const userQuestion = lastMessage?.content || ""

    // Generate context with business data
    const systemPrompt = generateInsightPrompt(businessData, userQuestion)

    const result = await streamText({
      model: openai("gpt-4o"),
      system: `${systemPrompt}
      
You are a helpful AI business advisor. Provide specific, actionable insights based on the business data provided. 
Always be encouraging but realistic. Format your responses clearly with bullet points or numbered lists when appropriate.
If asked about specific metrics, reference the actual data provided.`,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      })),
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Chat API error:", error)
    return new Response("Error processing request", { status: 500 })
  }
}
