import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const WAITLIST_PATH = path.join(process.cwd(), 'docs', 'waitlist.json')

interface WaitlistData {
  seed_count: number
  entries: { email: string; created_at: string }[]
}

async function readWaitlist(): Promise<WaitlistData> {
  try {
    const raw = await fs.readFile(WAITLIST_PATH, 'utf8')
    return JSON.parse(raw) as WaitlistData
  } catch {
    return { seed_count: 47, entries: [] }
  }
}

async function writeWaitlist(data: WaitlistData): Promise<void> {
  await fs.mkdir(path.dirname(WAITLIST_PATH), { recursive: true })
  await fs.writeFile(WAITLIST_PATH, JSON.stringify(data, null, 2), 'utf8')
}

export async function GET() {
  const data = await readWaitlist()
  const count = data.seed_count + data.entries.length
  return NextResponse.json({ count })
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const trimmed = email.trim().toLowerCase()
    const data = await readWaitlist()

    const alreadyExists = data.entries.some((e) => e.email === trimmed)
    if (!alreadyExists) {
      data.entries.push({ email: trimmed, created_at: new Date().toISOString() })
      await writeWaitlist(data)
    }

    const count = data.seed_count + data.entries.length
    return NextResponse.json({ success: true, count, promoCode: 'LAUNCH15' })
  } catch (err) {
    console.error('[api/waitlist]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
