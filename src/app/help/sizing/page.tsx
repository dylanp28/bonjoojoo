'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Printer, Ruler, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'

const RING_SIZES = [
  { us: '4',    uk: 'H',  eu: '46.5', diameter: '14.8', circumference: '46.5' },
  { us: '4.5',  uk: 'I',  eu: '48',   diameter: '15.3', circumference: '48.0' },
  { us: '5',    uk: 'J',  eu: '49',   diameter: '15.7', circumference: '49.3' },
  { us: '5.5',  uk: 'K',  eu: '50.5', diameter: '16.1', circumference: '50.6' },
  { us: '6',    uk: 'L',  eu: '51.5', diameter: '16.5', circumference: '51.9' },
  { us: '6.5',  uk: 'M',  eu: '53',   diameter: '16.9', circumference: '53.1' },
  { us: '7',    uk: 'N',  eu: '54',   diameter: '17.3', circumference: '54.4' },
  { us: '7.5',  uk: 'O',  eu: '55.5', diameter: '17.7', circumference: '55.7' },
  { us: '8',    uk: 'P',  eu: '57',   diameter: '18.1', circumference: '57.0' },
  { us: '8.5',  uk: 'Q',  eu: '58',   diameter: '18.5', circumference: '58.3' },
  { us: '9',    uk: 'R',  eu: '59',   diameter: '18.9', circumference: '59.5' },
  { us: '9.5',  uk: 'S',  eu: '60.5', diameter: '19.4', circumference: '61.0' },
  { us: '10',   uk: 'T',  eu: '62',   diameter: '19.8', circumference: '62.1' },
  { us: '10.5', uk: 'U',  eu: '63',   diameter: '20.2', circumference: '63.4' },
  { us: '11',   uk: 'V',  eu: '64.5', diameter: '20.6', circumference: '64.7' },
  { us: '12',   uk: 'X',  eu: '67',   diameter: '21.4', circumference: '67.2' },
]

export default function SizingPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [measuredMm, setMeasuredMm] = useState('')

  const parsedMm = parseFloat(measuredMm)
  const suggestedSize = !isNaN(parsedMm) && parsedMm > 10
    ? RING_SIZES.reduce((prev, curr) =>
        Math.abs(parseFloat(curr.diameter) - parsedMm) < Math.abs(parseFloat(prev.diameter) - parsedMm)
          ? curr : prev
      )
    : null

  const faqs = [
    {
      q: 'What if my size is between two sizes?',
      a: 'We recommend going with the larger size for comfort. Rings are easier to size down than up. Alternatively, contact us and our jewelry specialists can help you decide.',
    },
    {
      q: 'Do fingers change size throughout the day?',
      a: 'Yes — fingers are typically largest in the evening and when warm. For the most accurate fit, measure later in the day. Avoid measuring when cold, as fingers can be up to half a size smaller.',
    },
    {
      q: 'What is your free resize policy?',
      a: 'We offer complimentary ring resizing within 30 days of purchase. Simply contact us with your order number and new size, and we\'ll take care of the rest at no charge.',
    },
    {
      q: 'Can all rings be resized?',
      a: 'Most rings can be resized 1–2 sizes up or down. Rings with continuous stone settings (full eternity bands) or very thin shanks may have limitations. Contact us if you\'re unsure about a specific piece.',
    },
    {
      q: 'Which finger should I measure?',
      a: 'Measure the specific finger you intend to wear the ring on. Finger sizes vary — your ring finger on your dominant hand is often slightly larger than the non-dominant hand.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-b from-bj-blush to-white py-16 border-b border-bj-gray-100">
        <div className="container-bj">
          <nav className="flex items-center gap-2 text-[12px] text-bj-gray-400 mb-8">
            <Link href="/" className="hover:text-bj-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/help" className="hover:text-bj-black transition-colors">Help</Link>
            <span>/</span>
            <span className="text-bj-black">Size Guide</span>
          </nav>
          <div className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-bj-pink mb-3 font-medium">Ring Sizing</p>
            <h1 className="font-display text-[2.5rem] tracking-[0.04em] text-bj-black uppercase mb-4">Size Guide</h1>
            <p className="text-body text-bj-gray-500 leading-relaxed mb-6">
              Find your perfect ring size from home. Use our conversion chart, step-by-step measurement guide, or print our free ring sizer.
            </p>
            <div className="flex items-center gap-2 text-[12px] text-bj-gray-600 bg-white/80 inline-flex px-4 py-2.5 border border-bj-pink/20">
              <RefreshCw size={13} className="text-bj-pink" />
              <span><strong className="text-bj-black">Free resize within 30 days</strong> — order with confidence.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-bj py-16 space-y-20">

        {/* Size Conversion Table */}
        <section className="space-y-6" id="size-chart">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[1.4rem] tracking-[0.06em] text-bj-black uppercase">International Size Chart</h2>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-[11px] text-bj-gray-500 hover:text-bj-black transition-colors print:hidden"
            >
              <Printer size={14} />
              Print Chart
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[13px]">
              <thead>
                <tr className="bg-bj-offwhite">
                  <th className="text-left py-3.5 px-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-bj-gray-500">US Size</th>
                  <th className="text-left py-3.5 px-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-bj-gray-500">UK Size</th>
                  <th className="text-left py-3.5 px-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-bj-gray-500">EU Size</th>
                  <th className="text-left py-3.5 px-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-bj-gray-500">Diameter (mm)</th>
                  <th className="text-left py-3.5 px-4 text-[10px] uppercase tracking-[0.12em] font-semibold text-bj-gray-500">Circumference (mm)</th>
                </tr>
              </thead>
              <tbody>
                {RING_SIZES.map((size, idx) => (
                  <tr key={size.us} className={`border-b border-bj-gray-100 ${idx % 2 === 1 ? 'bg-bj-offwhite/40' : 'bg-white'}`}>
                    <td className="py-3 px-4 font-bold text-bj-black">{size.us}</td>
                    <td className="py-3 px-4 text-bj-gray-600">{size.uk}</td>
                    <td className="py-3 px-4 text-bj-gray-600">{size.eu}</td>
                    <td className="py-3 px-4 text-bj-gray-600">{size.diameter}</td>
                    <td className="py-3 px-4 text-bj-gray-600">{size.circumference}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-bj-offwhite p-5">
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-bj-gray-400 mb-1">Women — Average Size</p>
              <p className="text-[14px] text-bj-black font-light">US 7 &nbsp;·&nbsp; EU 54 &nbsp;·&nbsp; UK N</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider font-semibold text-bj-gray-400 mb-1">Men — Average Size</p>
              <p className="text-[14px] text-bj-black font-light">US 10 &nbsp;·&nbsp; EU 62 &nbsp;·&nbsp; UK T</p>
            </div>
          </div>
        </section>

        {/* Measurement Methods */}
        <section className="space-y-10" id="how-to-measure">
          <h2 className="font-display text-[1.4rem] tracking-[0.06em] text-bj-black uppercase">How to Measure at Home</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Method A */}
            <div className="border border-bj-gray-100 p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[12px] font-bold text-white">A</span>
                </div>
                <h3 className="text-[13px] font-semibold text-bj-black uppercase tracking-wider">String or Paper Strip</h3>
              </div>
              <ol className="space-y-3">
                {[
                  'Cut a thin strip of paper (~15 cm long, ~5 mm wide) or use a piece of string.',
                  'Wrap it snugly around the base of the finger you plan to wear the ring on.',
                  'Mark where the paper or string first overlaps itself with a pen.',
                  'Lay it flat and measure from the end to your mark in millimeters — this is your circumference.',
                  'Use the Circumference column in the chart above to find your US size.',
                ].map((text, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-bj-pink font-bold text-[12px] flex-shrink-0">{i + 1}.</span>
                    <p className="text-[12px] text-bj-gray-600 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Method B */}
            <div className="border border-bj-gray-100 p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[12px] font-bold text-white">B</span>
                </div>
                <h3 className="text-[13px] font-semibold text-bj-black uppercase tracking-wider">Existing Ring</h3>
              </div>
              <ol className="space-y-3">
                {[
                  'Choose a ring that fits the intended finger well.',
                  'Place it on a ruler and measure the inside diameter (the hole, not the band) in millimeters.',
                  'Use the Diameter (mm) column in the chart above to find your size.',
                ].map((text, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-bj-pink font-bold text-[12px] flex-shrink-0">{i + 1}.</span>
                    <p className="text-[12px] text-bj-gray-600 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Quick converter */}
          <div className="bg-bj-offwhite p-6 space-y-4 max-w-md">
            <div className="flex items-center gap-2">
              <Ruler size={16} className="text-bj-black" />
              <h3 className="text-[13px] font-semibold text-bj-black uppercase tracking-wider">Quick Size Finder</h3>
            </div>
            <p className="text-[12px] text-bj-gray-500">Enter your measured circumference or diameter to find your US ring size.</p>
            <div className="space-y-2">
              <label className="text-[11px] uppercase tracking-wider text-bj-gray-400 font-medium">Measurement in mm</label>
              <input
                type="number"
                value={measuredMm}
                onChange={e => setMeasuredMm(e.target.value)}
                placeholder="e.g. 54"
                className="w-40 border border-bj-gray-300 px-3 py-2.5 text-[13px] focus:outline-none focus:border-bj-black bg-white"
              />
            </div>
            {suggestedSize && (
              <div className="bg-white border border-bj-pink/20 p-4 flex items-center gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-bj-gray-400 mb-1">Recommended Size</p>
                  <p className="text-[22px] font-light text-bj-black">US {suggestedSize.us}</p>
                  <p className="text-[11px] text-bj-gray-500">UK {suggestedSize.uk} &nbsp;·&nbsp; EU {suggestedSize.eu}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Printable Sizer */}
        <section className="space-y-6" id="printable-sizer">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-[1.4rem] tracking-[0.06em] text-bj-black uppercase">Printable Ring Sizer</h2>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-[11px] text-bj-gray-500 hover:text-bj-black transition-colors print:hidden"
            >
              <Printer size={14} />
              Print at 100% Scale
            </button>
          </div>
          <p className="text-[12px] text-bj-gray-500 max-w-lg">Print this page at <strong>100% scale (do not fit to page)</strong>. Place an existing ring over the circles below to find your size — the circle that fits snugly inside your ring is your size.</p>
          <div className="bg-white border border-bj-gray-200 p-8">
            <div className="flex flex-wrap gap-6 items-end">
              {RING_SIZES.map(size => (
                <div key={size.us} className="flex flex-col items-center gap-1.5">
                  <div
                    className="rounded-full border-2 border-bj-black flex items-center justify-center"
                    style={{
                      width: `${parseFloat(size.diameter) * 3.7795}px`,
                      height: `${parseFloat(size.diameter) * 3.7795}px`,
                    }}
                  >
                    <span className="text-[8px] font-bold text-bj-gray-300">US {size.us}</span>
                  </div>
                  <span className="text-[9px] text-bj-gray-400">{size.diameter}mm</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-bj-gray-400 italic">Circles represent inside diameter at 1:1 scale (96 DPI). Verify by measuring the US 7 circle — it should be exactly 17.3 mm across.</p>
        </section>

        {/* Sizing Tips */}
        <section className="space-y-5">
          <h2 className="font-display text-[1.4rem] tracking-[0.06em] text-bj-black uppercase">Sizing Tips</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Measure later in the day', body: 'Fingers swell slightly as the day goes on. Measuring in the evening gives the most accurate fit.' },
              { title: 'Temperature matters', body: 'Cold fingers are temporarily smaller. Measure at room temperature for the best result.' },
              { title: 'Consider the band width', body: 'Wider bands fit more snugly. If ordering a band wider than 6mm, consider going half a size up.' },
              { title: 'Dominant hand is larger', body: 'Your dominant hand\'s ring finger is usually 0.5 sizes larger. Be sure to measure the correct hand.' },
              { title: 'Knuckle vs. base', body: 'If your knuckle is significantly wider than the base, go with a size that slides over the knuckle.' },
              { title: 'When in doubt, size up', body: 'A slightly large ring is easier to resize than one that\'s too tight. Our free resize policy has you covered.' },
            ].map((tip, i) => (
              <div key={i} className="bg-bj-offwhite p-5 space-y-2">
                <h3 className="text-[12px] font-semibold text-bj-black">{tip.title}</h3>
                <p className="text-[12px] text-bj-gray-500 leading-relaxed">{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-4 max-w-2xl">
          <h2 className="font-display text-[1.4rem] tracking-[0.06em] text-bj-black uppercase">Sizing FAQ</h2>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-bj-gray-100">
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                className="w-full flex items-center justify-between py-4 text-left gap-4"
              >
                <span className="text-[13px] font-medium text-bj-black">{faq.q}</span>
                {expandedFaq === i
                  ? <ChevronUp size={16} className="text-bj-gray-400 flex-shrink-0" />
                  : <ChevronDown size={16} className="text-bj-gray-400 flex-shrink-0" />
                }
              </button>
              {expandedFaq === i && (
                <p className="text-[12px] text-bj-gray-500 leading-relaxed pb-4">{faq.a}</p>
              )}
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="bg-bj-blush p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-semibold text-bj-black mb-1">Still not sure?</h3>
            <p className="text-[12px] text-bj-gray-500">Our jewelry specialists are happy to help you find the perfect fit.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="btn-primary text-[12px] px-6 py-3">Contact Us</Link>
            <Link href="/category/rings" className="btn-secondary text-[12px] px-6 py-3">Shop Rings</Link>
          </div>
        </section>
      </div>
    </div>
  )
}
