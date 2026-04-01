import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPost, getRelatedPosts, blogPosts } from '@/data/blog-posts'
import BlogPostClient from './BlogPostClient'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://bonjoojoo.com/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://bonjoojoo.com/blog/${post.slug}`,
      siteName: 'Bonjoojoo',
      type: 'article',
      publishedTime: post.date,
      images: [{ url: `https://bonjoojoo.com${post.coverImage}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: [`https://bonjoojoo.com${post.coverImage}`],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const related = getRelatedPosts(post.relatedSlugs)

  return <BlogPostClient post={post} related={related} />
}
