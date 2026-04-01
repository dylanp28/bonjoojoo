'use client'

import { useState } from 'react'

type Tab = 'ring' | 'necklace' | 'bracelet'

const ringSizes = [
  { us: '3', uk: 'F', eu: '44', diameter: '14.1 mm', circumference: '44.2 mm' },
  { us: '4', uk: 'H', eu: '47', diameter: '14.8 mm', circumference: '46.8 mm' },
  { us: '5', uk: 'J', eu: '49', diameter: '15.7 mm', circumference: '49.3 mm' },
  { us: '6', uk: 'L', eu: '52', diameter: '16.5 mm', circumference: '51.9 mm' },
  { us: '7', uk: 'N', eu: '54', diameter: '17.3 mm', circumference: '54.4 mm' },
  { us: '8', uk: 'P', eu: '57', diameter: '18.2 mm', circumference: '57.0 mm' },
  { us: '9', uk: 'R', eu: '59', diameter: '19.0 mm', circumference: '59.5 mm' },
  { us: '10', uk: 'T', eu: '62', diameter: '19.8 mm', circumference: '62.1 mm' },
  { us: '11', uk: 'V', eu: '64', diameter: '20.6 mm', circumference: '64.6 mm' },
  { us: '12', uk: 'X', eu: '67', diameter: '21.4 mm', circumference: '67.2 mm' },
]

const necklaceLengths = [
  { inches: '14"', cm: '35.5 cm', style: 'Choker', placement: 'Sits at the base of the neck', bestFor: 'V-necks, off-shoulder tops' },
  { inches: '16"', cm: '40.6 cm', style: 'Collar', placement: 'Just below the collarbone', bestFor: 'Crew necks, boat necks' },
  { inches: '18"', cm: '45.7 cm', style: 'Princess', placement: 'At or just below the collarbone', bestFor: 'Most necklines — our most popular length' },
  { inches: '20"', cm: '50.8 cm', style: 'Matinee', placement: 'Above the bust', bestFor: 'High necklines, business wear' },
  { inches: '24"', cm: '61.0 cm', style: 'Opera', placement: 'At or below the bust', bestFor: 'Layering, evening wear' },
  { inches: '30"', cm: '76.2 cm', style: 'Rope', placement: 'Below the bust', bestFor: 'Layering, statement look' },
]

const braceletSizes = [
  { wrist: '5.5"', wristCm: '14 cm', bracelet: '6.5"', braceletCm: '16.5 cm', fit: 'Petite / Snug' },
  { wrist: '6"', wristCm: '15.2 cm', bracelet: '7"', braceletCm: '17.8 cm', fit: 'Small / Comfortable' },
  { wrist: '6.5"', wristCm: '16.5 cm', bracelet: '7.5"', braceletCm: '19.1 cm', fit: 'Medium / Standard' },
  { wrist: '7"', wristCm: '17.8 cm', bracelet: '8"', braceletCm: '20.3 cm', fit: 'Large / Relaxed' },
  { wrist: '7.5"', wristCm: '19.1 cm', bracelet: '8.5"', braceletCm: '21.6 cm', fit: 'XL / Loose' },
]

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<Tab>('ring')

  return (
    <div className="min-h-screen bg-bj-offwhite pt-[124px]">
      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-bj py-14 text-center">
          <p className="text-overline text-bj-pink mb-3">Fit Guide</p>
          <h1 className="text-display-lg text-bj-black mb-4">Size Guide</h1>
          <p className="text-body text-bj-gray-500 max-w-xl mx-auto">
            Find your perfect fit with our comprehensive sizing charts. Not sure? Our consultants are happy to help.
          </p>
        </div>
      </div>

      <div className="container-bj py-16">
        <div className="max-w-3xl mx-auto">

          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-10">
            {([
              { key: 'ring', label: 'Rings' },
              { key: 'necklace', label: 'Necklaces' },
              { key: 'bracelet', label: 'Bracelets' },
            ] as { key: Tab; label: string }[]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3.5 text-[13px] font-medium tracking-[0.08em] uppercase transition-colors border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? 'border-bj-black text-bj-black'
                    : 'border-transparent text-bj-gray-400 hover:text-bj-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Ring tab */}
          {activeTab === 'ring' && (
            <div>
              <div className="grid md:grid-cols-2 gap-10 mb-10">
                <div>
                  <h2 className="text-[16px] font-semibold text-bj-black mb-4">How to Measure</h2>
                  <ol className="space-y-3 text-[14px] text-bj-gray-500">
                    <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-bj-black text-white text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Cut a strip of paper about 10 cm long and 1 cm wide.</li>
                    <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-bj-black text-white text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Wrap it snugly around the base of the finger you plan to wear the ring on.</li>
                    <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-bj-black text-white text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Mark where the paper overlaps and measure the length in mm — that&apos;s your circumference.</li>
                    <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-bj-black text-white text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Match the measurement to the chart below.</li>
                  </ol>
                </div>
                <div className="bg-white p-6 border border-gray-100">
                  <h3 className="text-[13px] font-semibold text-bj-black mb-3">Pro Tips</h3>
                  <ul className="space-y-2 text-[13px] text-bj-gray-500">
                    <li>• Measure at end of day when fingers are largest</li>
                    <li>• Fingers swell in heat — measure at room temperature</li>
                    <li>• Between sizes? Size up for comfort</li>
                    <li>• Wide bands fit tighter — consider half size up</li>
                    <li>• Measure 3–4 times for accuracy</li>
                  </ul>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b-2 border-bj-black">
                      <th className="text-left py-3 pr-4 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">US Size</th>
                      <th className="text-left py-3 pr-4 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">UK Size</th>
                      <th className="text-left py-3 pr-4 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">EU Size</th>
                      <th className="text-left py-3 pr-4 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">Diameter</th>
                      <th className="text-left py-3 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">Circumference</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ringSizes.map((row, i) => (
                      <tr key={row.us} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : ''}`}>
                        <td className="py-3 pr-4 font-medium text-bj-black">{row.us}</td>
                        <td className="py-3 pr-4 text-bj-gray-500">{row.uk}</td>
                        <td className="py-3 pr-4 text-bj-gray-500">{row.eu}</td>
                        <td className="py-3 pr-4 text-bj-gray-500">{row.diameter}</td>
                        <td className="py-3 text-bj-gray-500">{row.circumference}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Necklace tab */}
          {activeTab === 'necklace' && (
            <div>
              <div className="mb-8">
                <h2 className="text-[16px] font-semibold text-bj-black mb-2">Necklace Lengths</h2>
                <p className="text-[14px] text-bj-gray-500">All lengths are total necklace length. Add 1–2&quot; if you prefer a looser fit.</p>
              </div>

              <div className="space-y-4">
                {necklaceLengths.map(row => (
                  <div key={row.inches} className="bg-white border border-gray-100 p-6 flex gap-6 items-start">
                    <div className="w-16 h-16 rounded-full border-2 border-bj-black flex items-center justify-center flex-shrink-0">
                      <span className="text-[14px] font-bold text-bj-black">{row.inches}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-[15px] font-semibold text-bj-black">{row.style}</span>
                        <span className="text-[13px] text-bj-gray-400">{row.inches} / {row.cm}</span>
                      </div>
                      <p className="text-[13px] text-bj-gray-500 mb-1">{row.placement}</p>
                      <p className="text-[12px] text-bj-pink">Best for: {row.bestFor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bracelet tab */}
          {activeTab === 'bracelet' && (
            <div>
              <div className="grid md:grid-cols-2 gap-10 mb-10">
                <div>
                  <h2 className="text-[16px] font-semibold text-bj-black mb-4">How to Measure Your Wrist</h2>
                  <ol className="space-y-3 text-[14px] text-bj-gray-500">
                    <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-bj-black text-white text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">1</span>Use a flexible tape measure or a strip of paper.</li>
                    <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-bj-black text-white text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">2</span>Wrap it around your wrist just below the wrist bone.</li>
                    <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-bj-black text-white text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">3</span>Note the measurement where the tape meets itself.</li>
                    <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-bj-black text-white text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5">4</span>Add 0.5–1&quot; for a comfortable fit, 1–1.5&quot; for a relaxed fit.</li>
                  </ol>
                </div>
                <div className="bg-white p-6 border border-gray-100">
                  <h3 className="text-[13px] font-semibold text-bj-black mb-3">Fit Preferences</h3>
                  <ul className="space-y-2 text-[13px] text-bj-gray-500">
                    <li>• <strong>Snug:</strong> Add 0.25–0.5&quot; to wrist size</li>
                    <li>• <strong>Comfortable:</strong> Add 0.75–1&quot; (most popular)</li>
                    <li>• <strong>Relaxed:</strong> Add 1.25–1.5&quot;</li>
                    <li>• Tennis bracelets are typically worn snug</li>
                    <li>• Chain bracelets look best at comfortable fit</li>
                  </ul>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr className="border-b-2 border-bj-black">
                      <th className="text-left py-3 pr-4 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">Wrist Size</th>
                      <th className="text-left py-3 pr-4 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">Wrist (cm)</th>
                      <th className="text-left py-3 pr-4 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">Bracelet Size</th>
                      <th className="text-left py-3 pr-4 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">Bracelet (cm)</th>
                      <th className="text-left py-3 font-semibold tracking-[0.08em] uppercase text-[11px] text-bj-black">Fit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {braceletSizes.map((row, i) => (
                      <tr key={row.wrist} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : ''}`}>
                        <td className="py-3 pr-4 font-medium text-bj-black">{row.wrist}</td>
                        <td className="py-3 pr-4 text-bj-gray-500">{row.wristCm}</td>
                        <td className="py-3 pr-4 text-bj-gray-500">{row.bracelet}</td>
                        <td className="py-3 pr-4 text-bj-gray-500">{row.braceletCm}</td>
                        <td className="py-3 text-bj-gray-500">{row.fit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 bg-bj-blush p-8 text-center">
            <p className="text-overline text-bj-pink mb-2">Need Help?</p>
            <h3 className="text-display-sm text-bj-black mb-3">Not Sure of Your Size?</h3>
            <p className="text-body text-bj-gray-500 mb-6">
              Book a complimentary consultation and one of our jewelry experts will help you find the perfect fit.
            </p>
            <a href="/consultation" className="btn-primary inline-block">
              Book a Consultation
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
