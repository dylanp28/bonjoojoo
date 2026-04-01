import Link from 'next/link'
import { Clock } from 'lucide-react'

export const metadata = {
  title: 'Affiliate Dashboard | Bonjoojoo',
  description: 'Track your Bonjoojoo affiliate earnings and performance.',
}

export default function AffiliateDashboardPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24 text-center">
      <div className="w-14 h-14 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-6">
        <Clock size={22} className="text-stone-600" />
      </div>

      <p className="text-[11px] tracking-[0.3em] text-stone-400 uppercase mb-3">Affiliate Dashboard</p>
      <h1 className="font-display text-4xl font-light text-stone-900 mb-4">Coming soon</h1>
      <p className="text-stone-500 text-sm max-w-sm leading-relaxed mb-10">
        The full affiliate dashboard — real-time earnings, click stats, payout history — is launching post-release.
        You'll be notified as soon as it's live.
      </p>

      <div className="space-y-3 text-sm">
        <p className="text-stone-400">Questions about your affiliate account?</p>
        <a
          href="mailto:hello@bonjoojoo.com"
          className="inline-block text-stone-900 underline underline-offset-2 hover:text-stone-600 transition-colors"
        >
          hello@bonjoojoo.com
        </a>
      </div>

      <Link
        href="/affiliate"
        className="mt-10 text-xs tracking-widest uppercase text-stone-500 underline underline-offset-2 hover:text-stone-900 transition-colors"
      >
        ← Back to affiliate program
      </Link>
    </main>
  )
}
