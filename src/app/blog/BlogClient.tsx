'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { blogPosts, BlogPost } from '@/data/blog-posts'

const categories = ['All', 'Guides', 'Gift Ideas', 'Style Tips'] as const
type Category = typeof categories[number]

function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex flex-col">
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-sm mb-5">
        <div className="relative aspect-[4/3] bg-bj-gray-100 overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-bj-gray-400">
            {post.category}
          </span>
          <span className="text-bj-gray-300 text-[11px]">·</span>
          <span className="text-[11px] text-bj-gray-400">{post.date}</span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-[16px] md:text-[18px] font-display font-semibold text-bj-black leading-snug mb-3 group-hover:text-bj-gray-600 transition-colors">
            {post.title}
          </h2>
        </Link>

        <p className="text-[13px] text-bj-gray-500 leading-relaxed mb-5 flex-1">
          {post.excerpt}
        </p>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-bj-black hover:text-bj-gray-600 transition-colors"
        >
          Read More
          <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  )
}

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-gray-100 pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="container-bj-wide text-center">
          <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-bj-gray-400 mb-4">
            The Bonjoojoo
          </p>
          <h1 className="font-display text-[36px] md:text-[52px] lg:text-[64px] text-bj-black tracking-tight leading-none mb-5">
            Journal
          </h1>
          <p className="text-[15px] text-bj-gray-500 max-w-[500px] mx-auto leading-relaxed">
            Buying guides, styling tips, and gift ideas from the Bonjoojoo editorial team.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="container-bj-wide">
          <div className="flex items-center gap-0 overflow-x-auto py-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-6 py-4 text-[12px] font-semibold tracking-[0.1em] uppercase border-b-2 transition-colors ${
                  activeCategory === cat
                    ? 'border-bj-black text-bj-black'
                    : 'border-transparent text-bj-gray-400 hover:text-bj-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Article Grid */}
      <section className="container-bj-wide py-14 md:py-20">
        {filtered.length === 0 ? (
          <p className="text-center text-bj-gray-400 py-20">No articles in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {filtered.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-bj-gray-50 border-t border-gray-100 py-16 md:py-20">
        <div className="container-bj-wide text-center max-w-[520px]">
          <h2 className="font-display text-[24px] md:text-[32px] text-bj-black mb-3">
            Stay in the know
          </h2>
          <p className="text-[14px] text-bj-gray-500 mb-8">
            Get new guides, styling inspiration, and exclusive offers delivered to your inbox.
          </p>
          <form
            className="flex gap-3 max-w-[400px] mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-gray-200 rounded-sm px-4 py-3 text-[13px] focus:outline-none focus:border-bj-black transition-colors"
            />
            <button
              type="submit"
              className="bg-bj-black text-white px-6 py-3 text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-bj-gray-800 transition-colors rounded-sm whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
