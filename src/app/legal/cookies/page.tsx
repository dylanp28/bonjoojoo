import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-[70vh] bg-white">
      <div className="container-bj py-16">
        <nav className="flex items-center gap-2 text-[12px] text-bj-gray-400 mb-10">
          <Link href="/" className="hover:text-bj-black transition-colors">Home</Link>
          <span>/</span>
          <span className="text-bj-black">Cookie Policy</span>
        </nav>
        <div className="max-w-2xl">
          <h1 className="font-display text-[2rem] tracking-[0.05em] text-bj-black uppercase mb-6">Cookie Policy</h1>
          <p className="text-body text-bj-gray-500 mb-10">Learn about how we use cookies and similar technologies to improve your experience on our website.</p>
          <div className="bg-bj-blush border border-bj-pink/20 p-8 text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-bj-pink mb-2">Coming Soon</p>
            <p className="text-body text-bj-gray-500">This page is being updated. Please <Link href="/contact" className="text-bj-black underline underline-offset-2">contact us</Link> for assistance.</p>
          </div>
          <div className="mt-8">
            <Link href="/" className="btn-secondary">Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
