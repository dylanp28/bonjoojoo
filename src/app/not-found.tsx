import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <div className="text-center max-w-lg mx-auto px-6">
        <p className="text-[12px] font-semibold tracking-[0.15em] uppercase text-bj-pink mb-4">404</p>
        <h1 className="font-display text-[2.5rem] tracking-[0.05em] text-bj-black mb-4 uppercase">
          Page Not Found
        </h1>
        <p className="text-body text-bj-gray-500 mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to something beautiful.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
          <Link href="/search" className="btn-secondary">
            Browse Collection
          </Link>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-[12px] text-bj-gray-400 mb-4 uppercase tracking-widest">Popular Categories</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Rings', 'Necklaces', 'Earrings', 'Bracelets'].map((cat) => (
              <Link
                key={cat}
                href={`/category/${cat.toLowerCase()}`}
                className="text-[13px] text-bj-gray-500 hover:text-bj-black border border-gray-200 hover:border-bj-black px-4 py-2 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
