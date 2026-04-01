'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, ChevronRight } from 'lucide-react'
import { useChatStore, ChatMessage } from '@/store/useChatStore'

// ─── Quick reply buttons ────────────────────────────────────────────────────

type FlowKey = 'track_order' | 'ring_sizing' | 'product_questions' | 'returns'

const QUICK_REPLIES: { label: string; flow: FlowKey }[] = [
  { label: 'Track my order', flow: 'track_order' },
  { label: 'Ring sizing help', flow: 'ring_sizing' },
  { label: 'Product questions', flow: 'product_questions' },
  { label: 'Returns & exchanges', flow: 'returns' },
]

// ─── Rule-based response engine ─────────────────────────────────────────────

type FlowState = { stage: string } | null

function getBotResponse(
  userText: string,
  flowState: FlowState,
  setFlowState: (s: FlowState) => void
): string {
  const lower = userText.toLowerCase().trim()

  // ── Track order flow ──
  if (lower === 'track my order') {
    setFlowState({ stage: 'awaiting_order_number' })
    return "Sure! Please share your order number (e.g. BJ-12345) and I'll pull up your tracking status."
  }
  if (flowState?.stage === 'awaiting_order_number') {
    setFlowState(null)
    const mockStatuses = [
      '📦 **In transit** — Your order left our LA workshop and is on its way. Estimated delivery: **2–3 business days**.',
      '✅ **Out for delivery** — Your package is with the courier today. Expected by end of day.',
      '🔧 **Being crafted** — Your piece is currently being handcrafted and quality-checked. Estimated ship date: **tomorrow**.',
    ]
    const status = mockStatuses[Math.floor(Math.random() * mockStatuses.length)]
    return `Here's the latest on your order:\n\n${status}\n\nNeed anything else? Our team is also reachable at **hello@bonjoojoo.com**.`
  }

  // ── Ring sizing flow ──
  if (lower === 'ring sizing help') {
    setFlowState(null)
    return `We want your ring to fit perfectly! Here are a few ways to find your size:\n\n**1. Use our Ring Size Guide** — [View guide →](/education/ring-sizing)\n**2. Measure at home** — Use a piece of string or a ring sizer strip, measure in mm and compare to our chart.\n**3. Visit a local jeweler** — They can measure your finger for free in minutes.\n\nStill unsure? Type your question below and I'll help!`
  }

  // ── Product questions flow ──
  if (lower === 'product questions') {
    setFlowState(null)
    return `Here are our most common product questions:\n\n**Q: Are your diamonds certified?**\nYes — all diamonds are IGI or GIA certified, with full grading reports included.\n\n**Q: What's the difference between lab-grown and mined diamonds?**\nLab-grown diamonds are chemically identical to mined ones, but created sustainably with ~95% less environmental impact — and significantly better value.\n\n**Q: Do you offer custom sizing or engraving?**\nAbsolutely! Most pieces can be resized or engraved. Add a note at checkout or email us at hello@bonjoojoo.com.\n\nHave a different question? Type it below and I'll connect you with a specialist.`
  }

  // ── Returns flow ──
  if (lower === 'returns & exchanges') {
    setFlowState(null)
    return `Here's a quick summary of our **Returns & Exchanges** policy:\n\n- **30-day returns** on unworn, unaltered items in original packaging\n- **Free return shipping** on all US orders\n- **Exchanges** processed within 5–7 business days\n- Custom-engraved or resized pieces are final sale\n\n[View full policy →](/returns)\n\nTo start a return, email **hello@bonjoojoo.com** with your order number and reason.`
  }

  // ── Fallback ──
  setFlowState(null)
  return `Thanks for reaching out! Our team will be happy to help with that.\n\nFor fastest assistance, email us at **hello@bonjoojoo.com** or use the quick options below to get instant answers.`
}

// ─── Availability helper ─────────────────────────────────────────────────────

function isBusinessHours(): boolean {
  // 9am–6pm ET
  const now = new Date()
  const etOffset = -5 // EST (no DST adjustment for simplicity)
  const etHour = (now.getUTCHours() + 24 + etOffset) % 24
  return etHour >= 9 && etHour < 18
}

// ─── Typing indicator ────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-6 h-6 bg-bj-offwhite flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-bj-black">B</span>
      </div>
      <div className="bg-bj-offwhite px-4 py-3 rounded-none flex items-center gap-1">
        {[0, 0.15, 0.3].map((delay, i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-bj-charcoal block"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ChatWidget() {
  const {
    messages,
    isOpen,
    isLoading,
    addMessage,
    toggleChat,
    setIsLoading,
  } = useChatStore()

  const [flowState, setFlowState] = useState<FlowState>(null)
  const [online, setOnline] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOnline(isBusinessHours())
    const timer = setInterval(() => setOnline(isBusinessHours()), 60_000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  function handleQuickReply(flow: FlowKey) {
    const labelMap: Record<FlowKey, string> = {
      track_order: 'Track my order',
      ring_sizing: 'Ring sizing help',
      product_questions: 'Product questions',
      returns: 'Returns & exchanges',
    }
    const userText = labelMap[flow]
    sendMessage(userText)
  }

  function sendMessage(userText: string) {
    if (!userText.trim() || isLoading) return

    const userMsg: ChatMessage = { role: 'user', content: userText.trim() }
    addMessage(userMsg)
    setIsLoading(true)

    // Simulate typing delay
    const delay = 800 + Math.random() * 600

    setTimeout(() => {
      const botText = getBotResponse(userText.trim(), flowState, setFlowState)
      addMessage({ role: 'assistant', content: botText })
      setIsLoading(false)
    }, delay)
  }

  const showQuickReplies = messages.length === 0

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-bj-black text-white shadow-lg hover:bg-bj-charcoal hover:shadow-xl flex items-center justify-center transition-all"
            aria-label="Open chat"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[60] w-[380px] max-w-[calc(100vw-48px)] h-[560px] max-h-[calc(100vh-48px)] bg-white shadow-xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-bj-black text-white px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
                  B
                </div>
                <div>
                  <p className="font-medium text-sm font-body leading-tight">Bonjoojoo Support</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`w-2 h-2 rounded-full ${online ? 'bg-green-400' : 'bg-gray-400'}`}
                    />
                    <span className="text-xs text-white/70">
                      {online ? 'Online now' : 'Away — we\'ll reply soon'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {showQuickReplies ? (
                <div className="flex flex-col h-full">
                  {/* Welcome */}
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-start gap-2 mb-4">
                      <div className="w-6 h-6 bg-bj-offwhite flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-bj-black">B</span>
                      </div>
                      <div className="bg-bj-offwhite px-3 py-2 text-sm text-bj-black leading-relaxed max-w-[85%]">
                        Hi! How can we help you today? Our experts are here for you.
                      </div>
                    </div>

                    {/* Quick reply buttons */}
                    <div className="space-y-2">
                      {QUICK_REPLIES.map((qr) => (
                        <button
                          key={qr.flow}
                          onClick={() => handleQuickReply(qr.flow)}
                          className="w-full text-left px-3 py-2 text-sm border border-gray-200 hover:border-bj-black hover:bg-bj-offwhite transition-colors flex items-center justify-between group"
                        >
                          <span className="text-bj-charcoal group-hover:text-bj-black">{qr.label}</span>
                          <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-bj-black" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="w-6 h-6 bg-bj-offwhite flex items-center justify-center shrink-0 mr-2 mt-1">
                          <span className="text-xs font-bold text-bj-black">B</span>
                        </div>
                      )}
                      <div
                        className={`max-w-[75%] px-3 py-2 text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-bj-black text-white'
                            : 'bg-bj-offwhite text-bj-black'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: msg.content
                                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                                .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="underline hover:no-underline" target="_self">$1</a>')
                                .replace(/\n\n/g, '<br/><br/>')
                                .replace(/\n/g, '<br/>'),
                            }}
                          />
                        ) : (
                          msg.content
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && <TypingIndicator />}

                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Quick reply buttons after first message */}
            {!showQuickReplies && !isLoading && (
              <div className="border-t border-gray-100 px-3 py-2 shrink-0">
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_REPLIES.map((qr) => (
                    <button
                      key={qr.flow}
                      onClick={() => handleQuickReply(qr.flow)}
                      className="text-xs px-2.5 py-1 border border-gray-200 text-bj-charcoal hover:border-bj-black hover:text-bj-black transition-colors"
                    >
                      {qr.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer label */}
            <div className="border-t border-gray-100 px-4 py-2 shrink-0 flex items-center justify-between">
              <span className="text-xs text-gray-400">Bonjoojoo Support</span>
              <span className="text-xs text-gray-300">Typically replies in minutes</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
