import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const PROMO_CODE = 'WELCOME10'
const CSV_PATH = path.join(process.cwd(), 'data', 'subscribers.csv')

async function ensureCsv() {
  try {
    await fs.access(CSV_PATH)
  } catch {
    await fs.mkdir(path.dirname(CSV_PATH), { recursive: true })
    await fs.writeFile(CSV_PATH, 'email,source,created_at\n', 'utf8')
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    const trimmed = email.trim().toLowerCase()

    await ensureCsv()

    const existing = await fs.readFile(CSV_PATH, 'utf8')
    const alreadySubscribed = existing.split('\n').slice(1).some((line) => {
      const cols = line.split(',')
      return cols[0]?.trim() === trimmed
    })

    if (!alreadySubscribed) {
      const row = `${trimmed},exit_intent_popup,${new Date().toISOString()}\n`
      await fs.appendFile(CSV_PATH, row, 'utf8')
    }

    return NextResponse.json({ success: true, promoCode: PROMO_CODE })
  } catch (err) {
    console.error('[newsletter/subscribe]', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
