'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles, Loader2, ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useChatStore, ChatMessage } from '@/store/useChatStore'

const QUICK_ACTIONS = [
  { label: 'Shipping info', message: 'What are your shipping options and delivery times?' },
  { label: 'Ring sizing', message: 'How do I find my ring size?' },
  { label: 'Return policy', message: "What's your return policy?" },
  { label: 'Browse collections', message: 'What collections do you have available?' },
]

export default function ChatWidget() {
  const {
    messages,
    isOpen,
    isLoading,
    showTicketForm,
    addMessage,
    updateLastAssistantMessage,
    toggleChat,
    setShowTicketForm,
    setIsLoading,
  } = useChatStore()

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Ticket form state
  const [ticketName, setTicketName] = useState('')
  const [ticketEmail, setTicketEmail] = useState('')
  const [ticketOrder, setTicketOrder] = useState('')
  const [ticketIssue, setTicketIssue] = useState('')
  const [ticketSubmitted, setTicketSubmitted] = useState(false)
  const [ticketLoading, setTicketLoading] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && !showTicketForm) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, showTicketForm])

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = { role: 'user', content: content.trim() }
    addMessage(userMessage)
    setInput('')
    setIsLoading(true)

    // Add empty assistant message for streaming
    addMessage({ role: 'assistant', content: '' })

    const allMessages = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: allMessages }),
      })

      if (!response.ok) throw new Error('Chat request failed')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') break
            try {
              const parsed = JSON.parse(data)
              if (parsed.text) {
                accumulated += parsed.text
                updateLastAssistantMessage(accumulated)
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      }

      // Check for escalation marker
      if (accumulated.includes('[ESCALATE]')) {
        updateLastAssistantMessage(accumulated.replace('[ESCALATE]', '').trim())
        setTimeout(() => setShowTicketForm(true), 500)
      }
    } catch {
      updateLastAssistantMessage(
        "I'm sorry, I'm having trouble connecting right now. Please try again or email us at hello@bonjoojoo.com."
      )
    } finally {
      setIsLoading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  async function handleTicketSubmit(e: FormEvent) {
    e.preventDefault()
    setTicketLoading(true)

    const transcript = messages
      .map((m) => `${m.role === 'user' ? 'Customer' : 'Bot'}: ${m.content}`)
      .join('\n')

    try {
      const response = await fetch('/api/chat/ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: ticketName,
          email: ticketEmail,
          orderNumber: ticketOrder,
          issue: ticketIssue,
          chatTranscript: transcript,
        }),
      })

      if (response.ok) {
        setTicketSubmitted(true)
      }
    } catch {
      // silently fail, user can retry
    } finally {
      setTicketLoading(false)
    }
  }

  return (
    <>
      {/* Floating chat button - FIXED: Now visible immediately */}
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
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <div>
                  <p className="font-medium text-sm font-body">Bonjoojoo AI</p>
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

            {/* Ticket form */}
            {showTicketForm ? (
              <div className="flex-1 overflow-y-auto p-4">
                {ticketSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                    <p className="font-medium font-body text-bj-black">Ticket submitted!</p>
                    <p className="text-sm text-bj-charcoal">
                      Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setShowTicketForm(false)
                        setTicketSubmitted(false)
                      }}
                      className="mt-2 text-sm text-bj-black hover:underline"
                    >
                      Back to chat
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setShowTicketForm(false)}
                      className="flex items-center gap-1 text-sm text-bj-charcoal hover:text-bj-black mb-3"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to chat
                    </button>
                    <h3 className="font-display text-lg font-semibold text-bj-black mb-1">
                      Contact our team
                    </h3>
                    <p className="text-xs text-bj-charcoal mb-4">
                      We&apos;ll include your chat history with the ticket.
                    </p>
                    <form onSubmit={handleTicketSubmit} className="space-y-3">
                      <input
                        required
                        value={ticketName}
                        onChange={(e) => setTicketName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-bj-black focus:outline-none transition-colors"
                      />
                      <input
                        required
                        type="email"
                        value={ticketEmail}
                        onChange={(e) => setTicketEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-bj-black focus:outline-none transition-colors"
                      />
                      <input
                        value={ticketOrder}
                        onChange={(e) => setTicketOrder(e.target.value)}
                        placeholder="Order number (optional)"
                        className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-bj-black focus:outline-none transition-colors"
                      />
                      <textarea
                        required
                        value={ticketIssue}
                        onChange={(e) => setTicketIssue(e.target.value)}
                        placeholder="Describe your issue..."
                        rows={3}
                        className="w-full px-3 py-2 text-sm border border-gray-200 focus:border-bj-black focus:outline-none transition-colors resize-none"
                      />
                      <button
                        type="submit"
                        disabled={ticketLoading}
                        className="w-full py-2 bg-bj-black text-white text-sm font-medium hover:bg-bj-charcoal transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {ticketLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          'Submit ticket'
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            ) : (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {messages.length === 0 ? (
                    <div className="flex flex-col h-full">
                      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
                        <Sparkles className="w-10 h-10 text-bj-black mb-3" />
                        <h3 className="font-display text-lg font-semibold text-bj-black">
                          Welcome to Bonjoojoo
                        </h3>
                        <p className="text-sm text-bj-charcoal mt-1">
                          How can I help you today?
                        </p>
                      </div>
                      <div className="space-y-2 mt-4">
                        {QUICK_ACTIONS.map((action) => (
                          <button
                            key={action.label}
                            onClick={() => sendMessage(action.message)}
                            className="w-full text-left px-3 py-2 text-sm border border-gray-200 hover:border-bj-black hover:bg-bj-offwhite transition-colors flex items-center justify-between group"
                          >
                            <span className="text-bj-charcoal group-hover:text-bj-black">
                              {action.label}
                            </span>
                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-bj-black" />
                          </button>
                        ))}
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
                              <Sparkles className="w-3.5 h-3.5 text-bj-black" />
                            </div>
                          )}
                          <div
                            className={`max-w-[75%] px-3 py-2 text-sm leading-relaxed ${
                              msg.role === 'user'
                                ? 'bg-bj-black text-white'
                                : 'bg-bj-offwhite text-bj-black'
                            }`}
                          >
                            {msg.content ? (
                              msg.role === 'assistant' ? (
                                <ReactMarkdown
                                  components={{
                                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                                    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                                    ul: ({ children }) => <ul className="list-disc pl-4 mb-2 last:mb-0 space-y-1">{children}</ul>,
                                    ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 last:mb-0 space-y-1">{children}</ol>,
                                    li: ({ children }) => <li>{children}</li>,
                                  }}
                                >
                                  {msg.content}
                                </ReactMarkdown>
                              ) : (
                                msg.content
                              )
                            ) : (
                              <Loader2 className="w-4 h-4 animate-spin text-bj-charcoal" />
                            )}
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Input */}
                <form
                  onSubmit={handleSubmit}
                  className="border-t border-gray-100 px-3 py-2 flex items-center gap-2 shrink-0"
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    maxLength={2000}
                    disabled={isLoading}
                    className="flex-1 text-sm py-2 px-2 bg-transparent focus:outline-none placeholder:text-gray-400 disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="w-8 h-8 flex items-center justify-center text-bj-black hover:bg-bj-cream rounded-full transition-colors disabled:opacity-30"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
