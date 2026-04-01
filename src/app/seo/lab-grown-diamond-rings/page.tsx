import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Lab-Grown Diamond Rings | Sustainable Engagement Rings | Ethical Wedding Bands | Bonjoojoo',
  description: 'Shop IGI certified lab-grown diamond rings. Sustainable engagement rings, ethical wedding bands, stackable rings. Same quality as mined diamonds, 40% less cost. Free shipping, 30-day returns.',
  keywords: 'lab grown diamond rings, sustainable engagement rings, ethical wedding bands, IGI certified diamonds, conflict-free diamonds, eco-friendly jewelry, lab created diamonds, synthetic diamond rings, stackable rings, wedding rings, diamond engagement rings',
  openGraph: {
    title: 'Lab-Grown Diamond Rings - Sustainable & Ethical | Bonjoojoo',
    description: 'Discover beautiful lab-grown diamond rings. IGI certified, ethically sourced, 40% less than mined diamonds. Perfect for engagement, wedding, or everyday wear.',
    url: 'https://bonjoojoo.com/seo/lab-grown-diamond-rings',
    siteName: 'Bonjoojoo',
    type: 'website',
  },
  alternates: {
    canonical: 'https://bonjoojoo.com/category/rings',
  },
  robots: {
    index: true,
    follow: true,
  }
}

export default function LabGrownDiamondRingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light text-center mb-8">Lab-Grown Diamond Rings</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8 text-center">
            Discover our collection of sustainable, IGI certified lab-grown diamond rings. 
            Ethically sourced, environmentally conscious, and absolutely stunning.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-medium mb-4">Why Choose Lab-Grown Diamond Rings?</h2>
              <ul className="space-y-2">
                <li>• IGI and GIA certified for quality assurance</li>
                <li>• 40% less cost than mined diamonds</li>
                <li>• Ethically sourced and conflict-free</li>
                <li>• Environmentally sustainable production</li>
                <li>• Same chemical composition as mined diamonds</li>
                <li>• Perfect for engagement rings and wedding bands</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium mb-4">Our Ring Categories</h2>
              <ul className="space-y-2">
                <li>• Engagement rings with lab-grown diamonds</li>
                <li>• Wedding bands and matching sets</li>
                <li>• Stackable rings for everyday wear</li>
                <li>• Statement rings and cocktail rings</li>
                <li>• Eternity bands and anniversary rings</li>
                <li>• Custom ring designs available</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/category/rings" 
              className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors inline-block"
            >
              Shop All Lab-Grown Diamond Rings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}