import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Diamond Education Center',
  description: "Everything you need to know about lab-grown diamonds: what they are, how they're made, the 4Cs, certifications, care guides, and why lab-grown is the future of fine jewelry.",
  alternates: { canonical: 'https://bonjoojoo.com/education' },
  openGraph: {
    title: 'Diamond Education Center | Bonjoojoo',
    description: "An honest guide to lab-grown diamonds — the 4Cs, IGI & GIA certifications, lab vs. mined comparisons, and care tips. Written by our gemologists.",
    url: 'https://bonjoojoo.com/education',
    siteName: 'Bonjoojoo',
    type: 'website',
    images: [{ url: 'https://bonjoojoo.com/images/lab-grown-education.png', width: 1200, height: 630, alt: 'Lab-Grown Diamond Education' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Diamond Education Center | Bonjoojoo',
    description: "An honest guide to lab-grown diamonds — the 4Cs, certifications, lab vs. mined, and care tips.",
    images: ['https://bonjoojoo.com/images/lab-grown-education.png'],
  },
}

const fourCs = [
  {
    letter: 'C',
    name: 'Cut',
    headline: 'The most important C',
    description:
      'Cut refers to how well a diamond\'s facets interact with light — not the shape, but the precision of the angles and proportions. A well-cut diamond will sparkle brilliantly even with slightly lower color or clarity. Poor cut makes a diamond look dull regardless of other grades.',
    grades: [
      { grade: 'Excellent / Ideal', detail: 'Maximum brilliance and fire. The benchmark we hold ourselves to.' },
      { grade: 'Very Good', detail: 'Excellent light performance at a slightly better value.' },
      { grade: 'Good', detail: 'Good sparkle, suitable for smaller accent stones.' },
      { grade: 'Fair / Poor', detail: 'Light leaks out the sides or bottom. We don\'t carry these.' },
    ],
    tip: 'Never sacrifice cut grade for carat size. A well-cut 1ct looks far more impressive than a poorly cut 1.5ct.',
  },
  {
    letter: 'C',
    name: 'Color',
    headline: 'Less color = more valuable',
    description:
      'Diamond color is graded on a D–Z scale, from colorless (D) to noticeably yellow (Z). The less color a diamond has, the rarer and more valuable it is. Most buyers can\'t distinguish between D, E, and F grades with the naked eye — and lab-grown diamonds often achieve higher color grades than mined diamonds at the same price point.',
    grades: [
      { grade: 'D–F (Colorless)', detail: 'Exceptionally rare. No detectable color. The finest tier.' },
      { grade: 'G–J (Near Colorless)', detail: 'Slight warmth invisible to the naked eye in a set ring. Excellent value.' },
      { grade: 'K–M (Faint)', detail: 'Warm tint visible face-up. Can look beautiful in yellow gold settings.' },
      { grade: 'N–Z (Light)', detail: 'Noticeable yellow or brown tint. We don\'t carry below M.' },
    ],
    tip: 'For white gold or platinum settings, choose G–H or better. For yellow gold, J–K can look beautiful and cost significantly less.',
  },
  {
    letter: 'C',
    name: 'Clarity',
    headline: 'Nature\'s fingerprint',
    description:
      'Clarity measures internal characteristics (inclusions) and surface blemishes. Almost all diamonds have some, most invisible to the naked eye. The GIA clarity scale has 11 grades, and an "eye-clean" diamond — one where inclusions aren\'t visible without magnification — can be found well below the top grades.',
    grades: [
      { grade: 'FL / IF (Flawless)', detail: 'No inclusions or blemishes visible under 10x magnification. Extremely rare.' },
      { grade: 'VVS1–VVS2', detail: 'Very, very slightly included. Invisible to the naked eye, very hard to find at 10x.' },
      { grade: 'VS1–VS2', detail: 'Very slightly included. Minor inclusions difficult to see at 10x. Excellent value.' },
      { grade: 'SI1–SI2', detail: 'Slightly included. May be eye-clean in SI1. The sweet spot for value shoppers.' },
    ],
    tip: 'VS2 to SI1 is the sweet spot for most buyers — indistinguishable from flawless to the naked eye, but significantly more accessible.',
  },
  {
    letter: 'C',
    name: 'Carat',
    headline: 'Weight, not size',
    description:
      'Carat is a unit of weight (1 carat = 0.2 grams), not size. Two diamonds of the same carat weight can look very different in size depending on their cut and shape. Price per carat also increases non-linearly — a 2-carat diamond costs significantly more than twice a 1-carat diamond of equal quality.',
    grades: [
      { grade: 'Under 0.5ct', detail: 'Delicate, everyday wearable. Beautiful in pavé and halo settings.' },
      { grade: '0.5–1.0ct', detail: 'The most popular range. Strikes the ideal balance of presence and value.' },
      { grade: '1.0–2.0ct', detail: 'Statement diamond. Meaningful size for solitaires and classic designs.' },
      { grade: '2.0ct+', detail: 'Exceptional presence. Where lab-grown diamonds deliver extraordinary value vs. mined.' },
    ],
    tip: 'Shopping just below round numbers (0.9ct instead of 1.0ct, 1.8ct instead of 2.0ct) can save significantly with no perceptible size difference.',
  },
]

const labVsMined = [
  { category: 'Chemical Composition', lab: 'Pure carbon — identical to mined', mined: 'Pure carbon' },
  { category: 'Hardness', lab: '10 on Mohs scale', mined: '10 on Mohs scale' },
  { category: 'IGI/GIA Certified', lab: 'Yes', mined: 'Yes' },
  { category: 'Brilliance & Fire', lab: 'Identical', mined: 'Identical' },
  { category: 'Conflict-Free', lab: 'Guaranteed — fully traceable', mined: 'Difficult to verify' },
  { category: 'Environmental Impact', lab: '95% lower', mined: 'High (land disruption, emissions)' },
  { category: 'Price vs. Mined', lab: '60–80% less for same quality', mined: 'Baseline' },
  { category: 'Origin Traceability', lab: 'Fully traceable', mined: 'Opaque supply chains' },
  { category: 'Resale Value', lab: 'Varies — worn as jewelry, not investment', mined: 'Varies — not reliably high' },
]

const careSteps = [
  {
    title: 'Daily Wear',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    tips: [
      'Safe to wear daily — diamonds are the hardest natural material',
      'Remove before heavy gym workouts, gardening, or contact sports',
      'Apply perfume, lotions, and hairspray before putting on jewelry',
      'Avoid swimming in chlorinated pools or saltwater',
    ],
  },
  {
    title: 'Cleaning at Home',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    tips: [
      'Warm water + a few drops of dish soap + soft toothbrush — works perfectly',
      'Soak for 20–30 minutes, then gently scrub around the setting',
      'Rinse thoroughly and pat dry with a lint-free cloth',
      'Ultrasonic cleaners are safe for most diamond pieces (not for emerald-cut)',
    ],
  },
  {
    title: 'Storage',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ),
    tips: [
      'Store each piece separately — diamonds can scratch other jewelry',
      'Use the soft pouch and box included with every Bonjoojoo purchase',
      'Keep away from direct sunlight and extreme temperatures',
      'Anti-tarnish strips in your jewelry box help preserve metal finishes',
    ],
  },
  {
    title: 'Professional Care',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    tips: [
      'Annual inspection recommended — we\'ll check prongs, settings, and clasps',
      'Professional polishing restores luster and removes surface scratches',
      'Any repairs covered under our lifetime warranty',
      'Contact us at care@bonjoojoo.com to schedule an inspection',
    ],
  },
]

export default function EducationPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-4">Diamond Education Center</p>
          <h1 className="text-5xl font-light text-white mb-6">
            Everything You Need to Know<br />
            <span className="italic font-light">About Lab-Grown Diamonds</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            An honest guide to diamond quality, lab-grown science, the 4Cs, care, and certifications —
            written by the gemologists and designers who built Bonjoojoo.
          </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex overflow-x-auto gap-8 py-4 text-sm">
            {['What Are Lab Diamonds', 'Lab vs. Mined', 'The 4 Cs', 'Care Guide', 'Certifications', 'FAQs'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '')}`}
                className="whitespace-nowrap text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">

        {/* What Are Lab-Grown Diamonds */}
        <section id="what-are-lab-diamonds" className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-8">What Are Lab-Grown Diamonds?</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-gray-600 leading-relaxed mb-5">
                Lab-grown diamonds are <strong className="text-gray-900">real diamonds</strong> — not simulants,
                not substitutes. They are composed of pure carbon in a cubic crystal structure, chemically and
                physically identical to diamonds formed deep in the Earth over billions of years.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                The difference is process, not product. Natural diamonds form under extreme heat and pressure
                120 miles beneath the Earth&apos;s surface. Lab-grown diamonds replicate those exact conditions
                in a controlled environment, producing a diamond that is indistinguishable from a mined diamond —
                even to a trained gemologist using conventional tools.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The Federal Trade Commission (FTC) officially recognizes lab-grown diamonds as &ldquo;diamonds.&rdquo;
                The GIA and IGI — the world&apos;s leading gemological institutes — certify them with the same
                grading scales used for mined stones.
              </p>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">CVD Method (Chemical Vapor Deposition)</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A thin diamond seed is placed in a sealed chamber filled with carbon-rich gas.
                  Microwaves ionize the gas, causing carbon atoms to deposit layer by layer onto the seed,
                  building a diamond crystal atom by atom over 6–12 weeks.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">HPHT Method (High Pressure High Temperature)</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  A carbon source is subjected to ~1.5 million PSI of pressure and temperatures exceeding 1,400°C
                  — replicating the deep mantle conditions where natural diamonds form. A diamond crystal
                  grows from a seed over days to weeks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lab vs Mined */}
        <section id="lab-vs-mined" className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-8">Lab-Grown vs. Mined Diamonds</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-900 text-white">
                  <th className="text-left px-6 py-4 font-medium">Category</th>
                  <th className="text-left px-6 py-4 font-medium">Lab-Grown Diamond</th>
                  <th className="text-left px-6 py-4 font-medium">Mined Diamond</th>
                </tr>
              </thead>
              <tbody>
                {labVsMined.map((row, i) => (
                  <tr key={row.category} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.category}</td>
                    <td className="px-6 py-4 text-gray-700">{row.lab}</td>
                    <td className="px-6 py-4 text-gray-500">{row.mined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">
            * Resale value for both lab-grown and mined diamonds has historically been poor relative to retail price.
            We recommend buying jewelry for its beauty and meaning, not as a financial investment.
          </p>
        </section>

        {/* The 4 Cs */}
        <section id="the-4-cs" className="mb-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-light text-gray-900 mb-4">The 4 Cs of Diamond Quality</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The 4 Cs — Cut, Color, Clarity, and Carat — are the universal standard for evaluating diamond quality.
              Understanding them helps you make the right choice for your budget and aesthetic.
            </p>
          </div>

          <div className="space-y-12">
            {fourCs.map((c, index) => (
              <div key={c.name} className="border border-gray-200 rounded-2xl overflow-hidden">
                <div className="bg-gray-900 text-white px-8 py-6 flex items-center gap-6">
                  <div className="text-5xl font-light opacity-30">{c.letter}</div>
                  <div>
                    <h3 className="text-2xl font-medium">{c.name}</h3>
                    <p className="text-gray-300 text-sm">{c.headline}</p>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-gray-600 leading-relaxed mb-8">{c.description}</p>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {c.grades.map((g) => (
                      <div key={g.grade} className="bg-gray-50 rounded-lg p-4">
                        <div className="font-medium text-gray-900 text-sm mb-1">{g.grade}</div>
                        <div className="text-sm text-gray-600">{g.detail}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm text-amber-900">
                      <strong>Expert tip:</strong> {c.tip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Care Guide */}
        <section id="care-guide" className="mb-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Care & Maintenance</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lab-grown diamonds are just as durable as mined diamonds — 10 on the Mohs hardness scale.
              With the right care, your Bonjoojoo piece will look as beautiful in 50 years as it does today.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {careSteps.map((step) => (
              <div key={step.title} className="border border-gray-200 rounded-xl p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                </div>
                <ul className="space-y-2">
                  {step.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 bg-gray-400 rounded-full" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section id="certifications" className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-8">Certifications</h2>
          <p className="text-gray-600 leading-relaxed mb-10 max-w-3xl">
            Every Bonjoojoo diamond comes with a grading report from one of the world&apos;s leading
            independent gemological laboratories. This report is your diamond&apos;s fingerprint — it contains
            an exact record of its 4 Cs, dimensions, fluorescence, and identifying characteristics.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">IGI Certified</h3>
              <p className="text-sm text-gray-500 mb-4">International Gemological Institute</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                The world&apos;s largest independent jewelry certification organization. IGI was among the
                first institutes to develop grading standards specifically for lab-grown diamonds and
                is widely recognized as the gold standard for lab-grown certification.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Each IGI certificate includes a unique report number you can verify at igi.world.
              </p>
            </div>
            <div className="border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">GIA Certified</h3>
              <p className="text-sm text-gray-500 mb-4">Gemological Institute of America</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Founded in 1931, GIA invented the 4 Cs grading system and is considered the
                most authoritative gemological institute globally. GIA now grades lab-grown diamonds
                with the same precision and standards as natural diamonds.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                GIA certificate numbers can be verified at gia.edu/report-check.
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-7">
            <h4 className="font-medium text-gray-900 mb-3">What&apos;s on a grading certificate?</h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              {['Carat weight', 'Cut grade', 'Color grade', 'Clarity grade', 'Measurements (mm)', 'Fluorescence', 'Polish & Symmetry', 'Unique report number'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="mb-24">
          <h2 className="text-3xl font-light text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {[
              {
                q: 'Will a lab-grown diamond lose its sparkle over time?',
                a: 'No. Diamond hardness is permanent — it\'s determined by the crystal structure, not the growing method. Your lab-grown diamond will sparkle exactly the same in 50 years as it does today, provided it\'s cleaned regularly.',
              },
              {
                q: 'Can a jeweler tell it\'s lab-grown?',
                a: 'Not with conventional tools. Lab-grown and mined diamonds are chemically identical, and even experienced gemologists cannot distinguish them visually. Specialized equipment can detect growth patterns, which is why we include certificates that clearly disclose lab origin — we\'re proud of it.',
              },
              {
                q: 'Are lab-grown diamonds graded the same way as mined diamonds?',
                a: 'Yes. The IGI and GIA use identical 4 Cs grading scales for both lab-grown and mined diamonds. The certificates look the same; the only difference is the origin notation.',
              },
              {
                q: 'Do lab-grown diamonds have flaws or inclusions?',
                a: 'They can, just like mined diamonds. The clarity grade on your certificate will tell you exactly what inclusions are present and how visible they are. Many of our diamonds are eye-clean in the VS2–SI1 range.',
              },
              {
                q: 'Why are lab-grown diamonds so much cheaper than mined ones?',
                a: 'Primarily because the supply chain is shorter and the input costs are lower. Mining requires enormous infrastructure, energy, and logistics. Growing a diamond in a lab doesn\'t. We pass those savings to you — the diamond\'s beauty and durability are identical.',
              },
              {
                q: 'Are all your diamonds ethically sourced?',
                a: 'Yes. By definition, lab-grown diamonds involve no mining, no land disruption, and no opaque supply chains. Every diamond we use has a fully traceable origin from certified producers, and all are grown using renewable-backed energy.',
              },
              {
                q: 'What shapes do you offer?',
                a: 'We carry Round, Oval, Cushion, Princess, Emerald, Pear, Marquise, Asscher, and Radiant cuts. Round brilliant is the most popular and tends to show the most brilliance. Fancy shapes like oval and pear can appear larger face-up for the same carat weight.',
              },
              {
                q: 'What\'s the best carat size for an engagement ring?',
                a: 'It depends entirely on personal preference and budget. The most popular range is 0.9–1.5ct for solitaire engagement rings. With lab-grown diamonds, many customers find they can go a full size up compared to what they\'d spend on a mined stone.',
              },
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between px-7 py-5 cursor-pointer hover:bg-gray-50 transition-colors">
                    <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
                    <svg
                      className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-7 pb-5">
                    <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-gray-900 text-white rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-light mb-4">Ready to Find Your Diamond?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Browse our full collection of IGI and GIA certified lab-grown diamond jewelry,
            or speak with one of our gemologists for a personalized recommendation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/search" className="bg-white text-gray-900 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Shop the Collection
            </Link>
            <Link href="/contact" className="border border-white/40 text-white px-8 py-3 rounded-md font-medium hover:bg-white/10 transition-colors">
              Talk to a Gemologist
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
