import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'Bonjoojoo was founded in Los Angeles with one belief: luxury should never cost the Earth. Discover our story, our founders, and our commitment to ethical, sustainable fine jewelry.',
  alternates: { canonical: 'https://bonjoojoo.com/about' },
  openGraph: {
    title: 'Our Story | Bonjoojoo',
    description: 'Founded in LA with one belief: luxury should never cost the Earth. Discover our commitment to ethical, sustainable fine jewelry.',
    url: 'https://bonjoojoo.com/about',
    siteName: 'Bonjoojoo',
    type: 'website',
    images: [{ url: 'https://bonjoojoo.com/images/bonjoojoo-2.png', width: 1200, height: 630, alt: 'Bonjoojoo - Our Story' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story | Bonjoojoo',
    description: 'Founded in LA with one belief: luxury should never cost the Earth.',
    images: ['https://bonjoojoo.com/images/bonjoojoo-2.png'],
  },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-95" />
        <div className="relative max-w-5xl mx-auto px-4 py-32 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-6">Founded in Los Angeles, 2021</p>
          <h1 className="text-5xl sm:text-6xl font-light text-white mb-8 leading-tight">
            Luxury That Loves<br />
            <span className="italic">the World Back</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We started Bonjoojoo because we believed something the industry didn&apos;t:
            that a diamond could be beautiful, real, and responsible — all at once.
          </p>
        </div>
      </div>

      {/* Origin Story */}
      <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-6">Where It Began</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              In 2019, Sophia Chen was shopping for an engagement ring. A RISD-trained jewelry designer with a decade of
              experience at luxury houses in New York and Paris, she knew exactly what she wanted: a two-carat
              cushion-cut diamond, conflict-free, ethically sourced, and within reach of a real budget.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              What she found instead was an industry built on opacity, inflated margins, and a sourcing chain
              that no one could fully trace. The &ldquo;ethical&rdquo; options were expensive add-ons. The beautiful
              stones came with stories she couldn&apos;t verify.
            </p>
            <p className="text-gray-600 leading-relaxed">
              She called her longtime friend James Liu — a gemologist and material scientist she&apos;d met at the
              GIA — and said: <em>&ldquo;There has to be a better way.&rdquo;</em>
            </p>
          </div>
          <div className="relative h-80 rounded-2xl overflow-hidden bg-gray-50">
            <Image
              src="/images/bonjoojoo-2.png"
              alt="Bonjoojoo founders workshop in Los Angeles"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* The Founding */}
        <div className="bg-gray-50 rounded-2xl p-10 mb-24">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-4">2021</p>
            <h2 className="text-3xl font-light text-gray-900 mb-6">Bonjoojoo Is Born</h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Sophia and James spent two years quietly building what would become Bonjoojoo — sourcing lab-grown
              diamonds from the world&apos;s leading certified producers, designing pieces that could stand alongside
              anything from a traditional luxury house, and setting up a workshop in Silver Lake, Los Angeles,
              where every piece would be hand-finished by master jewelers.
            </p>
            <p className="text-gray-600 leading-relaxed mb-5">
              The name comes from a phrase Sophia&apos;s grandmother used whenever something was both beautiful and
              joyful — <em>bon joie</em>, good joy. They modified it, made it their own. Because that&apos;s exactly
              what they wanted Bonjoojoo to be: genuinely, unambiguously joyful. No guilt. No compromise.
              Just beautiful jewelry you can feel good about wearing.
            </p>
            <p className="text-gray-600 leading-relaxed">
              They launched with 18 pieces. Sold out in 72 hours.
            </p>
          </div>
        </div>

        {/* Why Lab-Grown */}
        <div className="mb-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Why Lab-Grown Diamonds</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              This wasn&apos;t a trend we chased. It was the answer we were looking for.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-3">100%</div>
              <div className="font-medium text-gray-900 mb-2">Chemically Identical</div>
              <p className="text-sm text-gray-600">
                Same carbon crystal structure as a mined diamond. Same fire, brilliance, and hardness.
                A gemologist cannot tell them apart without specialized equipment.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-3">60–80%</div>
              <div className="font-medium text-gray-900 mb-2">Lower Cost</div>
              <p className="text-sm text-gray-600">
                Without mining infrastructure, global supply chains, and rarity markups,
                you get more diamond for your money — and we can be fully transparent about pricing.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-3">95%</div>
              <div className="font-medium text-gray-900 mb-2">Less Environmental Impact</div>
              <p className="text-sm text-gray-600">
                No land disruption, no displaced communities, no murky supply chain.
                Our diamonds are grown with renewable-backed energy and fully traceable origin.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">What We Stand For</h2>
          <div className="space-y-10">
            <div className="grid md:grid-cols-5 gap-6 items-start">
              <div className="md:col-span-1">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Sustainability</h3>
                <p className="text-gray-600 leading-relaxed">
                  We believe every business decision is an environmental one. Our lab-grown diamonds require
                  no mining, no land disruption, and are produced using renewable energy sources. Our packaging
                  is FSC-certified, our Los Angeles workshop runs on solar, and we offset 100% of our shipping
                  emissions through verified carbon programs.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6 items-start">
              <div className="md:col-span-1">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Transparency</h3>
                <p className="text-gray-600 leading-relaxed">
                  We publish our pricing methodology. Every diamond comes with an IGI or GIA certificate,
                  and we clearly label exactly where and how it was grown. We don&apos;t hide behind vague
                  &ldquo;responsible sourcing&rdquo; language — we show our work, because we&apos;re proud of it.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6 items-start">
              <div className="md:col-span-1">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Craftsmanship</h3>
                <p className="text-gray-600 leading-relaxed">
                  Every piece is hand-finished in our Silver Lake studio by jewelers with decades of experience
                  at storied houses. We don&apos;t outsource quality. We hand-inspect every stone, every setting,
                  every clasp before it leaves our workshop. If it doesn&apos;t meet our standard, it doesn&apos;t ship.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6 items-start">
              <div className="md:col-span-1">
                <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl font-medium text-gray-900 mb-3">Accessibility</h3>
                <p className="text-gray-600 leading-relaxed">
                  Fine jewelry has historically gatekept itself behind price points designed to signal wealth, not quality.
                  We believe a two-carat lab-grown diamond solitaire shouldn&apos;t require a second mortgage.
                  By eliminating mining markup, we pass those savings directly to you — without compromising
                  a single point on the quality scale.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Meet the Founders</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">Sophia Chen</h3>
              <p className="text-sm text-gray-500 mb-4">Co-Founder & Creative Director</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                RISD-trained jewelry designer. Former senior designer at Bulgari Paris and Tiffany & Co.
                New York. Sophia leads product design and creative direction at Bonjoojoo.
                She obsesses over proportions, metalwork, and making sure every piece photographs
                exactly as beautifully as it looks in person.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-1">James Liu</h3>
              <p className="text-sm text-gray-500 mb-4">Co-Founder & Head of Gemology</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                GIA-certified gemologist with a background in materials science from Caltech.
                Former research director at a leading lab-grown diamond producer in Surat, India.
                James oversees all sourcing, quality grading, and our lab diamond certification process.
                He will tell you exactly how your diamond was made, in more detail than you probably want.
              </p>
            </div>
          </div>
        </div>

        {/* LA Workshop */}
        <div className="bg-gray-900 text-white rounded-2xl p-12 mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">Silver Lake, Los Angeles</p>
              <h2 className="text-3xl font-light text-white mb-6">Made in LA</h2>
              <p className="text-gray-300 leading-relaxed mb-5">
                Our workshop sits in a sun-filled former printmaking studio in Silver Lake. Every Bonjoojoo
                piece is hand-finished here by a team of six jewelers, each with more than fifteen years of
                experience in fine jewelry manufacturing.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We run on solar. We recycle 100% of metal filings. We pay our craftspeople above the
                industry standard, because the people who make beautiful things deserve to be treated
                beautifully too.
              </p>
            </div>
            <div className="relative h-72 rounded-xl overflow-hidden bg-gray-800">
              <Image
                src="/images/lab-grown-education.png"
                alt="Bonjoojoo workshop in Silver Lake, Los Angeles"
                fill
                className="object-cover opacity-70"
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-5">Ready to Find Yours?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-10">
            Every piece in our collection is designed to be worn every day, passed down, and loved
            for generations — without costing the planet or your savings.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/search" className="inline-block bg-black text-white px-10 py-4 rounded-md hover:bg-gray-800 transition-colors font-medium">
              Shop the Collection
            </Link>
            <Link href="/education" className="inline-block border border-gray-300 text-gray-700 px-10 py-4 rounded-md hover:bg-gray-50 transition-colors font-medium">
              Learn About Lab Diamonds
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
