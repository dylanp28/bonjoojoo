import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const REVIEWS_FILE = path.join(process.cwd(), 'data', 'reviews.json')

interface SubmittedReview {
  id: string
  productId: string
  author: string
  email: string
  rating: number
  title: string
  body: string
  date: string
  verified: boolean
}

type ReviewsStore = Record<string, SubmittedReview[]>

function readReviewsFile(): ReviewsStore {
  try {
    if (!fs.existsSync(REVIEWS_FILE)) {
      return {}
    }
    const content = fs.readFileSync(REVIEWS_FILE, 'utf-8')
    return JSON.parse(content) as ReviewsStore
  } catch {
    return {}
  }
}

function writeReviewsFile(data: ReviewsStore): void {
  const dir = path.dirname(REVIEWS_FILE)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(data, null, 2), 'utf-8')
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')

  if (!productId) {
    return NextResponse.json({ error: 'productId is required' }, { status: 400 })
  }

  const store = readReviewsFile()
  const reviews = store[productId] ?? []

  return NextResponse.json({ productId, reviews })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, name, email, rating, title, body: reviewBody } = body

    if (!productId || !name || !email || !rating || !title || !reviewBody) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const ratingNum = Number(rating)
    if (ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 })
    }

    const review: SubmittedReview = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      productId,
      author: name,
      email,
      rating: ratingNum,
      title,
      body: reviewBody,
      date: new Date().toISOString().split('T')[0],
      verified: false,
    }

    const store = readReviewsFile()
    if (!store[productId]) {
      store[productId] = []
    }
    store[productId].unshift(review)
    writeReviewsFile(store)

    return NextResponse.json({ success: true, review }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
  }
}
