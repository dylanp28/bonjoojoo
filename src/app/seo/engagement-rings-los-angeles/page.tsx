import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Engagement Rings Los Angeles | Lab-Grown Diamond Engagement Rings | Custom Ring Design LA | Bonjoojoo',
  description: 'Custom engagement rings in Los Angeles. Lab-grown diamond engagement rings, bespoke ring design, IGI certified. Handcrafted in LA. Free consultations, lifetime warranty.',
  keywords: 'engagement rings Los Angeles, custom engagement rings LA, lab grown diamond rings, bespoke ring design, IGI certified diamonds, handcrafted jewelry LA, custom jewelry Los Angeles, diamond engagement rings California',
  openGraph: {
    title: 'Engagement Rings Los Angeles - Custom Lab-Grown Diamond Rings | Bonjoojoo',
    description: 'Beautiful custom engagement rings handcrafted in Los Angeles. Lab-grown diamonds, bespoke design, IGI certified. Schedule your consultation today.',
  },
  alternates: {
    canonical: 'https://bonjoojoo.com/category/rings',
  }
}

export default function EngagementRingsLosAngelesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-light text-center mb-8">Engagement Rings Los Angeles</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8 text-center">
            Handcrafted engagement rings in Los Angeles featuring stunning lab-grown diamonds. 
            Custom designs, expert craftsmanship, and ethical sourcing.
          </p>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-medium mb-4">Why Choose Bonjoojoo in LA?</h2>
              <ul className="space-y-2">
                <li>• Handcrafted in Los Angeles studios</li>
                <li>• IGI certified lab-grown diamonds</li>
                <li>• Custom design consultations available</li>
                <li>• Same-day ring sizing and repairs</li>
                <li>• Local Los Angeles artisan craftspeople</li>
                <li>• Sustainable and ethical sourcing</li>
                <li>• Free consultations in our LA showroom</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-medium mb-4">Los Angeles Ring Styles</h2>
              <ul className="space-y-2">
                <li>• Classic solitaire engagement rings</li>
                <li>• Vintage-inspired Art Deco designs</li>
                <li>• Modern minimalist settings</li>
                <li>• Three-stone anniversary rings</li>
                <li>• Halo engagement rings</li>
                <li>• Custom one-of-a-kind designs</li>
                <li>• Stackable wedding band sets</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-medium mb-4 text-center">Los Angeles Lab-Grown Diamond Advantage</h2>
          <div className="bg-gray-50 p-8 mb-12">
            <p className="text-center text-gray-700 mb-4">
              Our lab-grown diamonds are created using cutting-edge technology right here in California. 
              They have the same chemical, physical, and optical properties as mined diamonds but cost 40% less 
              and have a minimal environmental impact.
            </p>
            <div className="text-center">
              <strong>Perfect for conscious Los Angeles couples who value sustainability without compromising on beauty.</strong>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/category/rings" 
              className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition-colors inline-block mr-4"
            >
              Shop Engagement Rings
            </Link>
            <Link 
              href="/consultation" 
              className="border border-black text-black px-8 py-3 hover:bg-gray-50 transition-colors inline-block"
            >
              Book LA Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}