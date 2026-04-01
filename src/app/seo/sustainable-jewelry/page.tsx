import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sustainable Jewelry | Eco-Friendly Lab-Grown Diamond Jewelry | Ethical Fine Jewelry | Bonjoojoo',
  description: 'Shop sustainable jewelry made with lab-grown diamonds. Eco-friendly fine jewelry, ethically sourced materials, carbon-neutral shipping. Conscious luxury for the modern consumer.',
  keywords: 'sustainable jewelry, eco-friendly jewelry, ethical fine jewelry, lab grown diamonds, conscious luxury, green jewelry, environmentally friendly jewelry, recycled metals, conflict-free diamonds, sustainable fashion',
  openGraph: {
    title: 'Sustainable Jewelry - Eco-Friendly Lab-Grown Diamonds | Bonjoojoo',
    description: 'Beautiful sustainable jewelry crafted with lab-grown diamonds. Ethically made, environmentally conscious, and absolutely stunning. Shop conscious luxury.',
  },
  alternates: {
    canonical: 'https://bonjoojoo.com/about/sustainability',
  }
}

export default function SustainableJewelryPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light text-center mb-8">Sustainable Jewelry</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8 text-center">
            Beautiful fine jewelry that doesn't compromise our planet. 
            Crafted with lab-grown diamonds and sustainable practices.
          </p>

          <h2 className="text-2xl font-medium mb-4">Our Sustainability Commitment</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-medium mb-2">Lab-Grown Diamonds</h3>
              <p className="text-gray-600">Our lab-grown diamonds use 90% less water and produce 80% fewer carbon emissions than mined diamonds.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Recycled Metals</h3>
              <p className="text-gray-600">All our gold and silver comes from recycled sources, reducing the need for new mining operations.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Ethical Sourcing</h3>
              <p className="text-gray-600">Every material in our jewelry is ethically sourced with full transparency in our supply chain.</p>
            </div>
          </div>

          <h2 className="text-2xl font-medium mb-4">Shop Sustainable Collections</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="border p-6">
              <h3 className="text-lg font-medium mb-2">Eco-Friendly Engagement Rings</h3>
              <p className="text-gray-600 mb-4">Lab-grown diamond engagement rings that celebrate love while protecting the planet.</p>
              <Link href="/category/rings" className="text-black underline">Shop Rings</Link>
            </div>
            <div className="border p-6">
              <h3 className="text-lg font-medium mb-2">Sustainable Necklaces</h3>
              <p className="text-gray-600 mb-4">Beautiful necklaces crafted with recycled metals and lab-grown diamonds.</p>
              <Link href="/category/necklaces" className="text-black underline">Shop Necklaces</Link>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/search" 
              className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors inline-block"
            >
              Shop All Sustainable Jewelry
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}