import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us - Bonjoojoo',
  description: 'Learn about Bonjoojoo\'s mission to create sustainable luxury jewelry with lab-grown diamonds. Handcrafted in Los Angeles with environmental responsibility.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-light text-gray-900 mb-6">Our Story</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Redefining luxury through sustainable innovation, one lab-grown diamond at a time.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Mission Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-8 text-center">Our Mission</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-center mb-8 text-xl leading-relaxed">
              At Bonjoojoo, we believe luxury shouldn't come at the expense of our planet. 
              We're pioneering a new era of sustainable fine jewelry, where every piece tells a story of innovation, beauty, and responsibility.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Sustainable Luxury</h3>
            <p className="text-gray-600">
              Lab-grown diamonds with 95% less environmental impact, maintaining the same brilliance and beauty as mined diamonds.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Certified Quality</h3>
            <p className="text-gray-600">
              Every diamond is IGI or GIA certified, ensuring the highest standards of cut, color, clarity, and carat weight.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">Handcrafted Excellence</h3>
            <p className="text-gray-600">
              Each piece is meticulously crafted by skilled artisans in Los Angeles, combining traditional techniques with modern innovation.
            </p>
          </div>
        </div>

        {/* Our Process */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">How We Create</h2>
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-4">Lab-Grown Innovation</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our diamonds are created using cutting-edge technology that replicates the natural diamond formation process.
                  In controlled laboratory conditions, we grow diamonds that are chemically, physically, and optically identical to mined diamonds,
                  but with a fraction of the environmental impact.
                </p>
              </div>
              <div className="relative h-64 rounded-lg overflow-hidden bg-gray-50">
                <Image
                  src="/images/lab-grown-education.png"
                  alt="Lab-grown diamond formation process"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-64 rounded-lg overflow-hidden bg-gray-50 order-2 md:order-1">
                <Image
                  src="/images/bonjoojoo-2.png"
                  alt="Bonjoojoo artisan crafting jewelry"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h3 className="text-2xl font-light text-gray-900 mb-4">Artisan Craftsmanship</h3>
                <p className="text-gray-600 leading-relaxed">
                  Each piece is brought to life by our master jewelers in Los Angeles. From initial design concepts to final polish,
                  every step reflects our commitment to excellence. We combine time-honored techniques with contemporary design sensibilities
                  to create jewelry that transcends trends.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-gray-50 -mx-4 px-4 py-16 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-20 rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-light text-gray-900 mb-8">Environmental Impact</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-light text-gray-900 mb-2">95%</div>
                <div className="text-sm text-gray-600">Less environmental impact than mined diamonds</div>
              </div>
              <div>
                <div className="text-4xl font-light text-gray-900 mb-2">0</div>
                <div className="text-sm text-gray-600">Mining operations or land disruption</div>
              </div>
              <div>
                <div className="text-4xl font-light text-gray-900 mb-2">100%</div>
                <div className="text-sm text-gray-600">Traceable origin and ethical production</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light text-gray-900 mb-8">Founded in Los Angeles</h2>
          <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
            Born from a passion for sustainable luxury and timeless design, Bonjoojoo represents a new generation of jewelry that honors
            both the wearer and the world we share. We&apos;re not just creating beautiful jewelry &mdash; we&apos;re crafting a more sustainable future
            for luxury.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/search" className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
              Shop Our Collection
            </Link>
            <Link href="/education/lab-grown-diamonds" className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium">
              Learn About Lab Diamonds
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}