import type { Metadata } from 'next'

const categoryMeta: Record<string, { title: string; description: string }> = {
  rings: {
    title: 'Lab-Grown Diamond Rings',
    description: 'Shop engagement rings, wedding bands, and statement rings featuring certified lab-grown diamonds. IGI & GIA certified. Handcrafted in LA.',
  },
  necklaces: {
    title: 'Lab-Grown Diamond Necklaces & Pendants',
    description: 'Discover diamond pendants, tennis necklaces, and station necklaces with ethically sourced lab-grown diamonds. Free shipping on all orders.',
  },
  earrings: {
    title: 'Lab-Grown Diamond Earrings',
    description: 'Shop diamond studs, drop earrings, hoops, and ear jackets with certified lab-grown diamonds. 30-day free returns.',
  },
  bracelets: {
    title: 'Lab-Grown Diamond Bracelets',
    description: 'Explore tennis bracelets, chain bracelets, and statement pieces featuring brilliant lab-grown diamonds. Lifetime warranty included.',
  },
}

export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const meta = categoryMeta[params.category] ?? {
    title: `${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Collection`,
    description: `Shop our ${params.category} collection featuring certified lab-grown diamonds. Handcrafted luxury jewelry.`,
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | Bonjoojoo`,
      description: meta.description,
      type: 'website',
    },
    alternates: {
      canonical: `https://bonjoojoo.com/category/${params.category}`,
    },
  }
}

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
