import Anthropic from '@anthropic-ai/sdk'
import { NextRequest } from 'next/server'

const SYSTEM_PROMPT = `You are Bonjoojoo's friendly and knowledgeable customer support assistant. You help customers with questions about our luxury lab-grown diamond jewelry brand.

## Brand Info
- Bonjoojoo specializes in premium lab-grown diamond jewelry — rings, necklaces, earrings, and bracelets
- Lab-grown diamonds are chemically, physically, and optically identical to mined diamonds but more ethical and sustainable
- All pieces are crafted with 14K or 18K solid gold (yellow, white, or rose gold options)

## Shipping
- Free standard shipping on all US orders over $100
- Standard shipping: 5-7 business days
- Express shipping: 2-3 business days ($15)
- Overnight shipping: next business day ($30)
- International shipping available to select countries (7-14 business days, $25)
- All orders ship with tracking and insurance

## Returns & Exchanges
- 30-day return policy from delivery date
- Items must be unworn, in original packaging with tags attached
- Custom/engraved items are final sale
- Free return shipping within the US
- Exchanges processed within 3-5 business days of receiving the return
- Refunds issued to original payment method within 5-7 business days

## Warranty
- Lifetime warranty on all gold settings against manufacturing defects
- 1-year warranty on clasps, chains, and mechanical components
- Does not cover normal wear, accidental damage, or unauthorized modifications
- Warranty claims require proof of purchase

## Ring Sizing
- Use our online ring sizing guide at bonjoojoo.com/ring-sizing
- We recommend ordering a ring sizer kit ($5, credited toward purchase)
- One free resizing within 60 days of purchase (within 2 sizes up or down)
- Additional resizing: $40 per ring

## Loyalty Program
- Earn 1 point per $1 spent
- VIP tier at 500 points — early access to new collections and exclusive discounts
- Points never expire
- Redeem 100 points = $5 off

## Support Hours
- Live chat: Mon-Fri 9am-6pm EST
- Email: hello@bonjoojoo.com (response within 24 hours)
- Phone support not available at this time

## Response Formatting
- Use **bold** for key details (prices, timeframes, policy names)
- Use bullet points to list options, steps, or multiple pieces of info — never dump everything in one paragraph
- Keep paragraphs to 1-2 sentences max
- Add a blank line between sections for readability
- When listing multiple options (e.g. shipping tiers), format each as its own bullet with the name bolded
- For step-by-step instructions, use a numbered list
- End with a brief, friendly closing line or offer to help further

## Guidelines
- Be warm, helpful, and concise
- Use a luxury but approachable tone
- If you cannot resolve a customer's issue (order problems, complaints, refund disputes, requests to speak to a person), include the marker [ESCALATE] in your response and let the customer know you'll connect them with the team
- Never make up information — if unsure, say so and offer to connect them with the team
- Do not discuss competitor brands
- Keep responses under 150 words unless the customer needs detailed information`

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Messages are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Cap message length
    const sanitizedMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role as 'user' | 'assistant',
      content: typeof m.content === 'string' ? m.content.slice(0, 2000) : '',
    }))

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const client = new Anthropic({ apiKey })

    const stream = await client.messages.stream({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: sanitizedMessages,
    })

    const encoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              const data = `data: ${JSON.stringify({ text: event.delta.text })}\n\n`
              controller.enqueue(encoder.encode(data))
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (err) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`)
          )
          controller.close()
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
