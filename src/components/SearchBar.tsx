'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SearchResult {
  id: string
  name: string
  price: number
  image: string
  category: string
}

interface SearchBarProps {
  className?: string
  placeholder?: string
}

export default function SearchBar({ className = "", placeholder = "Search" }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setIsOpen(false)
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const response = await fetch(`/api/inventory/search?q=${encodeURIComponent(query)}&limit=6`)
        
        if (!response.ok) {
          throw new Error('Search failed')
        }
        
        const data = await response.json()
        setResults(data.products || [])
        setIsOpen(data.products?.length > 0)
      } catch (err) {
        console.error('Search error:', err)
        setError('Search temporarily unavailable')
        setResults([])
        setIsOpen(false)
      } finally {
        setIsLoading(false)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [query])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const handleClear = () => {
    setQuery('')
    setResults([])
    setIsOpen(false)
    inputRef.current?.focus()
  }

  const handleResultClick = () => {
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true)
          }}
          placeholder={placeholder}
          className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-500"
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Searching...</p>
            </div>
          ) : error ? (
            <div className="p-4 text-center">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/product/${result.id}`}
                  onClick={handleResultClick}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {result.image ? (
                      <img
                        src={result.image}
                        alt={result.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 text-center">{result.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">{result.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{result.category.replace('-', ' ')}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {formatPrice(result.price)}
                  </div>
                </Link>
              ))}
              
              {/* View All Results */}
              <div className="border-t border-gray-100 px-4 py-3">
                <Link
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={handleResultClick}
                  className="block text-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all results for "{query}"
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-600">No products found for "{query}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}