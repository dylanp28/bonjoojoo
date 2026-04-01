'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { BlogPost } from '@/data/blog-posts'

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="font-display text-[22px] md:text-[26px] font-semibold text-bj-black mt-10 mb-4 leading-snug">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} className="font-semibold text-bj-black text-[15px] mt-5 mb-2">
          {line.slice(2, -2)}
        </p>
      )
    } else if (line.startsWith('- **')) {
      // Bullet with bold term: - **Term**: description
      const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/)
      if (match) {
        elements.push(
          <li key={i} className="text-[14px] md:text-[15px] text-bj-gray-600 leading-relaxed mb-2">
            <span className="font-semibold text-bj-black">{match[1]}</span>
            {match[2] ? `: ${match[2]}` : ''}
          </li>
        )
      }
    } else if (line.startsWith('- ')) {
      // Check if this is the start of a list
      const listItems: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        const itemLine = lines[i]
        const match = itemLine.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/)
        if (match) {
          listItems.push(`__BOLD__${match[1]}__END__${match[2] ? `: ${match[2]}` : ''}`)
        } else {
          listItems.push(itemLine.slice(2))
        }
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-none space-y-2 my-4 pl-0">
          {listItems.map((item, idx) => {
            if (item.startsWith('__BOLD__')) {
              const boldEnd = item.indexOf('__END__')
              const boldText = item.slice(8, boldEnd)
              const rest = item.slice(boldEnd + 7)
              return (
                <li key={idx} className="flex gap-3 text-[14px] md:text-[15px] text-bj-gray-600 leading-relaxed">
                  <span className="text-bj-gray-300 mt-0.5 flex-shrink-0">—</span>
                  <span><span className="font-semibold text-bj-black">{boldText}</span>{rest}</span>
                </li>
              )
            }
            return (
              <li key={idx} className="flex gap-3 text-[14px] md:text-[15px] text-bj-gray-600 leading-relaxed">
                <span className="text-bj-gray-300 mt-0.5 flex-shrink-0">—</span>
                <span>{item}</span>
              </li>
            )
          })}
        </ul>
      )
      continue
    } else if (line.trim() === '') {
      // skip blank lines
    } else {
      // Regular paragraph — handle inline **bold**
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      const rendered = parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={idx} className="font-semibold text-bj-black">{part.slice(2, -2)}</strong>
        }
        return part
      })
      elements.push(
        <p key={i} className="text-[14px] md:text-[15px] text-bj-gray-600 leading-relaxed mb-4">
          {rendered}
        </p>
      )
    }

    i++
  }

  return elements
}

interface Props {
  post: BlogPost
  related: BlogPost[]
}

export default function BlogPostClient({ post, related }: Props) {
  return (
    <main className="min-h-screen bg-white">
      {/* Back nav */}
      <div className="container-bj-wide pt-8 pb-0">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.08em] uppercase text-bj-gray-400 hover:text-bj-black transition-colors"
        >
          <ArrowLeft size={12} />
          Journal
        </Link>
      </div>

      {/* Article header */}
      <header className="container-bj-wide pt-8 pb-10 max-w-[760px]">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-[11px] font-semibold tracking-[0.1em] uppercase text-bj-gray-400">
            {post.category}
          </span>
          <span className="text-bj-gray-300 text-[11px]">·</span>
          <span className="text-[11px] text-bj-gray-400">{post.date}</span>
        </div>
        <h1 className="font-display text-[28px] md:text-[40px] lg:text-[48px] text-bj-black leading-tight tracking-tight mb-6">
          {post.title}
        </h1>
        <p className="text-[15px] md:text-[17px] text-bj-gray-500 leading-relaxed mb-6">
          {post.excerpt}
        </p>
        <p className="text-[12px] text-bj-gray-400 font-medium">
          By Bonjoojoo Editorial Team
        </p>
      </header>

      {/* Cover image */}
      <div className="container-bj-wide pb-12">
        <div className="relative aspect-[16/7] overflow-hidden rounded-sm bg-bj-gray-100 max-w-[900px]">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 900px) 100vw, 900px"
          />
        </div>
      </div>

      {/* Article body */}
      <article className="container-bj-wide pb-16 max-w-[760px]">
        <div className="prose-bj">
          {renderMarkdown(post.content)}
        </div>

        {/* CTA */}
        <div className="mt-12 pt-10 border-t border-gray-100">
          <Link
            href={post.ctaHref}
            className="inline-flex items-center gap-3 bg-bj-black text-white px-8 py-4 text-[12px] font-semibold tracking-[0.12em] uppercase hover:bg-bj-gray-800 transition-colors rounded-sm"
          >
            {post.ctaText}
            <ArrowRight size={14} />
          </Link>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="border-t border-gray-100 bg-bj-gray-50 py-14 md:py-20">
          <div className="container-bj-wide">
            <h2 className="font-display text-[22px] md:text-[28px] text-bj-black mb-10">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((rPost) => (
                <article key={rPost.slug} className="group">
                  <Link href={`/blog/${rPost.slug}`} className="block overflow-hidden rounded-sm mb-4">
                    <div className="relative aspect-[4/3] bg-bj-gray-100 overflow-hidden">
                      <Image
                        src={rPost.coverImage}
                        alt={rPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </Link>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-bj-gray-400">{rPost.category}</span>
                    <span className="text-bj-gray-300 text-[11px]">·</span>
                    <span className="text-[11px] text-bj-gray-400">{rPost.date}</span>
                  </div>
                  <Link href={`/blog/${rPost.slug}`}>
                    <h3 className="text-[15px] font-display font-semibold text-bj-black leading-snug mb-2 group-hover:text-bj-gray-600 transition-colors">
                      {rPost.title}
                    </h3>
                  </Link>
                  <Link
                    href={`/blog/${rPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase text-bj-black hover:text-bj-gray-600 transition-colors"
                  >
                    Read More <ArrowRight size={10} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
