import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Sustainability Commitment - Bonjoojoo',
  description: 'Discover how Bonjoojoo lab-grown diamonds deliver 80% less environmental impact, zero mining displacement, and carbon-neutral shipping — without compromising on brilliance.',
}

export default function SustainabilityPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Our Commitment</p>
          <h1 className="text-5xl font-light text-gray-900 mb-6">Luxury Without Compromise</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At Bonjoojoo, every diamond we create carries a promise — to be as kind to the Earth
            as it is beautiful to behold. Lab-grown diamonds aren't just an alternative to mined
            stones; they're a fundamentally better choice.
          </p>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="bg-gray-900 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            <div>
              <p className="text-5xl font-light mb-2">80%</p>
              <p className="text-sm tracking-widest uppercase text-gray-400">Less Environmental Impact</p>
              <p className="text-sm text-gray-400 mt-2">vs. mined diamonds</p>
            </div>
            <div>
              <p className="text-5xl font-light mb-2">0</p>
              <p className="text-sm tracking-widest uppercase text-gray-400">Mining Displacement</p>
              <p className="text-sm text-gray-400 mt-2">zero communities disrupted</p>
            </div>
            <div>
              <p className="text-5xl font-light mb-2">100%</p>
              <p className="text-sm tracking-widest uppercase text-gray-400">Carbon-Neutral Shipping</p>
              <p className="text-sm text-gray-400 mt-2">every order, every time</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">

        {/* The Problem with Mined Diamonds */}
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-6">The Hidden Cost of Mined Diamonds</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-5 leading-relaxed">
              For centuries, diamond mining has been synonymous with luxury. But beneath the sparkle
              lies a sobering reality. A single carat of mined diamond displaces roughly 250 tonnes
              of earth, consumes up to 127 gallons of fresh water, and generates approximately
              57,000 grams of carbon dioxide. Entire ecosystems are razed. Communities are uprooted.
              River systems are poisoned.
            </p>
            <p className="mb-5 leading-relaxed">
              The diamond industry has long operated behind a veil of mystique, but today's consumers
              are asking harder questions — and demanding better answers. Bonjoojoo was founded on
              the belief that fine jewelry shouldn't require a moral trade-off.
            </p>
          </div>
        </section>

        {/* The Lab-Grown Difference */}
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-6">How Lab-Grown Diamonds Are Made</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-5 leading-relaxed">
              Our diamonds begin as a small carbon seed — a sliver of existing diamond — placed inside
              a highly controlled chamber. Using either Chemical Vapor Deposition (CVD) or High Pressure
              High Temperature (HPHT) technology, that seed is bathed in carbon-rich gases and subjected
              to conditions that replicate the Earth's mantle. Over several weeks, carbon atoms arrange
              themselves into the same crystalline lattice that takes nature billions of years to produce.
            </p>
            <p className="mb-5 leading-relaxed">
              The result is chemically, physically, and optically identical to a mined diamond. The same
              hardness (10 on the Mohs scale). The same refractive index. The same fire, brilliance, and
              scintillation. A gemologist cannot distinguish a Bonjoojoo diamond from a mined stone with
              the naked eye — only specialized equipment can detect the difference.
            </p>
            <p className="leading-relaxed">
              What <em>is</em> different: the footprint. Our production facilities run on renewable energy.
              Water used in the process is recycled and recirculated. No mountaintops are blasted. No
              workers endure dangerous underground conditions. No communities are displaced for extraction.
            </p>
          </div>
        </section>

        {/* Our Commitments */}
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-10">Our Environmental Commitments</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                ),
                title: 'Renewable Energy Production',
                body: 'Our partner labs operate on 100% renewable energy — solar and wind — dramatically reducing the carbon footprint of every carat we sell.'
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: 'Recycled & Responsibly Sourced Metals',
                body: 'Every ring, necklace, and bracelet is crafted using recycled gold and platinum — metals reclaimed from existing sources, not newly mined.'
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: 'Carbon-Neutral Shipping',
                body: 'We partner with climate-conscious carriers and purchase carbon offsets for every shipment. Your order\'s delivery has a net-zero carbon impact.'
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3C6.477 3 2 7.477 2 13s4.477 10 10 10 10-4.477 10-10S17.523 3 12 3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v5l3 3" />
                  </svg>
                ),
                title: 'Minimal & Recycled Packaging',
                body: 'Our signature packaging is made from FSC-certified recycled paper and soy-based inks. Beautiful unboxing experiences shouldn\'t mean unnecessary waste.'
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Fair Labor Practices',
                body: 'Every artisan who crafts a Bonjoojoo piece earns a living wage in safe conditions. Our LA studio is fully audited for labor compliance.'
              },
              {
                icon: (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
                title: '1% for the Planet',
                body: 'One percent of every purchase goes directly to environmental nonprofits focused on reforestation, ocean cleanup, and biodiversity preservation.'
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-5">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 text-gray-600">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Transparency Section */}
        <section className="mb-20 bg-gray-50 p-10">
          <h2 className="text-3xl font-light text-gray-900 mb-6">Radical Transparency</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-5 leading-relaxed">
              We believe sustainability claims mean nothing without proof. That's why every Bonjoojoo
              diamond comes with a full origin report and an IGI certificate confirming it was created
              in a controlled laboratory environment using renewable energy. We also publish an annual
              Environmental Impact Report — available on request — detailing our carbon emissions,
              water usage, and waste diversion rates.
            </p>
            <p className="leading-relaxed">
              If you ever want to know more about a specific piece — where the diamond was grown,
              which lab produced it, what energy source was used — just ask. We're proud of the
              answer every time.
            </p>
          </div>
        </section>

        {/* The Bigger Picture */}
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-6">The Bigger Picture</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-5 leading-relaxed">
              The global diamond mining industry moves 250 million tonnes of earth every year. It
              employs explosive detonations, industrial-scale machinery, and chemical leaching agents
              that permanently alter landscapes and contaminate groundwater for generations. In some
              regions, diamond revenues have funded armed conflict — a legacy the industry has struggled
              to fully address despite the Kimberley Process.
            </p>
            <p className="mb-5 leading-relaxed">
              Lab-grown diamonds aren't a niche product. They're the logical conclusion of a
              society that demands better. Analysts project that lab-grown diamonds will represent
              over 20% of the global diamond market by 2030. Each piece of Bonjoojoo jewelry you
              choose is a vote for that future.
            </p>
            <p className="leading-relaxed">
              We started Bonjoojoo in Los Angeles with a simple conviction: that the most beautiful
              things in the world shouldn't have to cost the Earth. Three years, thousands of happy
              customers, and zero mined diamonds later, we're more certain of that than ever.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Shop With Purpose</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Every Bonjoojoo piece is a testament to what's possible when luxury and sustainability
            aren't treated as opposites.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/"
              className="inline-block bg-gray-900 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors"
            >
              Shop the Collection
            </a>
            <a
              href="/certification"
              className="inline-block border border-gray-300 text-gray-700 px-8 py-4 text-sm tracking-widest uppercase hover:border-gray-900 transition-colors"
            >
              Our Certifications
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
