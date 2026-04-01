'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Printer } from 'lucide-react'

/* ── Data ─────────────────────────────────────────────────────────────────── */

const RING_SIZES = [
  { us: '4',    uk: 'H',  eu: '46.5', jp: '7',  diameter: '14.8', circumference: '46.5' },
  { us: '4.5',  uk: 'I',  eu: '48',   jp: '9',  diameter: '15.3', circumference: '48.0' },
  { us: '5',    uk: 'J',  eu: '49',   jp: '10', diameter: '15.7', circumference: '49.3' },
  { us: '5.5',  uk: 'K',  eu: '50.5', jp: '11', diameter: '16.1', circumference: '50.6' },
  { us: '6',    uk: 'L',  eu: '51.5', jp: '12', diameter: '16.5', circumference: '51.9' },
  { us: '6.5',  uk: 'M',  eu: '53',   jp: '13', diameter: '16.9', circumference: '53.1' },
  { us: '7',    uk: 'N',  eu: '54',   jp: '14', diameter: '17.3', circumference: '54.4' },
  { us: '7.5',  uk: 'O',  eu: '55.5', jp: '15', diameter: '17.7', circumference: '55.7' },
  { us: '8',    uk: 'P',  eu: '57',   jp: '17', diameter: '18.1', circumference: '57.0' },
  { us: '8.5',  uk: 'Q',  eu: '58',   jp: '18', diameter: '18.5', circumference: '58.3' },
  { us: '9',    uk: 'R',  eu: '59',   jp: '19', diameter: '18.9', circumference: '59.5' },
  { us: '9.5',  uk: 'S',  eu: '60.5', jp: '21', diameter: '19.4', circumference: '61.0' },
  { us: '10',   uk: 'T',  eu: '62',   jp: '22', diameter: '19.8', circumference: '62.1' },
  { us: '10.5', uk: 'U',  eu: '63',   jp: '23', diameter: '20.2', circumference: '63.4' },
  { us: '11',   uk: 'V',  eu: '64.5', jp: '25', diameter: '20.6', circumference: '64.7' },
  { us: '12',   uk: 'X',  eu: '67',   jp: '27', diameter: '21.4', circumference: '67.2' },
]

const NECKLACE_LENGTHS = [
  { inches: 14, name: 'Choker',   cm: '35.5', description: 'Sits snugly at the base of the neck.', tip: 'Best for V-necks and open necklines.' },
  { inches: 16, name: 'Collar',   cm: '40.5', description: 'Falls just at the collarbone.', tip: 'Works with nearly any neckline.' },
  { inches: 18, name: 'Princess', cm: '45.5', description: 'Rests just below the collarbone.', tip: 'Most popular; ideal for pendants.' },
  { inches: 20, name: 'Matinee',  cm: '51',   description: 'Hangs between collarbone and bust.', tip: 'Great for layering or standalone.' },
  { inches: 24, name: 'Opera',    cm: '61',   description: 'Falls at or below the bust.', tip: 'Elegant; can be doubled as a choker.' },
]

const BRACELET_SIZES = [
  { label: 'XS', wristMin: 0,   wristMax: 5.5, braceletIn: '6.5"', braceletCm: '16.5' },
  { label: 'S',  wristMin: 5.5, wristMax: 6.5, braceletIn: '7.0"', braceletCm: '17.8' },
  { label: 'M',  wristMin: 6.5, wristMax: 7.0, braceletIn: '7.5"', braceletCm: '19.0' },
  { label: 'L',  wristMin: 7.0, wristMax: 7.5, braceletIn: '8.0"', braceletCm: '20.3' },
  { label: 'XL', wristMin: 7.5, wristMax: 99,  braceletIn: '8.5"+', braceletCm: '21.5+' },
]

/* ── Component ────────────────────────────────────────────────────────────── */

type GuideTab = 'rings' | 'necklaces' | 'bracelets'

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<GuideTab>('rings')
  const [ringSizeSystem, setRingSizeSystem] = useState<'us' | 'eu' | 'uk'>('us')
  const [ringMm, setRingMm] = useState('')
  const [wristInput, setWristInput] = useState('')
  const [wristUnit, setWristUnit] = useState<'in' | 'cm'>('in')

  /* Ring lookup */
  const parsedRingMm = parseFloat(ringMm)
  const suggestedRing = !isNaN(parsedRingMm) && parsedRingMm > 10
    ? RING_SIZES.reduce((prev, curr) =>
        Math.abs(parseFloat(curr.diameter) - parsedRingMm) < Math.abs(parseFloat(prev.diameter) - parsedRingMm)
          ? curr : prev)
    : null

  /* Bracelet lookup */
  const wristInches = wristUnit === 'in' ? parseFloat(wristInput) : parseFloat(wristInput) / 2.54
  const suggestedBracelet = !isNaN(wristInches) && wristInches > 3
    ? BRACELET_SIZES.find(s => wristInches >= s.wristMin && wristInches < s.wristMax) ?? BRACELET_SIZES[BRACELET_SIZES.length - 1]
    : null

  const tabs: { id: GuideTab; label: string }[] = [
    { id: 'rings',     label: 'Rings' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'bracelets', label: 'Bracelets' },
  ]

  return (
    <div className="min-h-screen bg-bj-offwhite">
      {/* Page header */}
      <div className="bg-white border-b border-bj-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-bj-gray-400 mb-2">
            <Link href="/" className="hover:text-bj-black transition-colors">Home</Link>
            <span className="mx-2">/</span>
            Sizing Guide
          </p>
          <h1 className="text-[28px] sm:text-[36px] font-light text-bj-black tracking-tight">Sizing Guide</h1>
          <p className="text-[13px] text-bj-gray-500 mt-2">Find the perfect fit for every piece — rings, necklaces, and bracelets.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">

        {/* Tab navigation */}
        <div className="bg-white border border-bj-gray-100">
          <div className="flex border-b border-bj-gray-100">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-bj-black text-bj-black'
                    : 'border-transparent text-bj-gray-400 hover:text-bj-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── RINGS ──────────────────────────────────────────────────── */}
          {activeTab === 'rings' && (
            <div className="p-6 sm:p-8 space-y-8">

              {/* Size system toggle */}
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-bj-gray-500 uppercase tracking-wider">Size system:</span>
                {(['us', 'eu', 'uk'] as const).map(sys => (
                  <button
                    key={sys}
                    onClick={() => setRingSizeSystem(sys)}
                    className={`px-3 py-1 text-[11px] uppercase font-medium transition-colors ${
                      ringSizeSystem === sys ? 'bg-bj-black text-white' : 'border border-bj-gray-200 text-bj-gray-600 hover:border-bj-black'
                    }`}
                  >
                    {sys}
                  </button>
                ))}
                <button
                  onClick={() => window.print()}
                  className="ml-auto flex items-center gap-1.5 text-[11px] text-bj-gray-400 hover:text-bj-black transition-colors print:hidden"
                >
                  <Printer size={13} />
                  Print
                </button>
              </div>

              {/* Interactive ring sizer CTA */}
              <div className="bg-bj-black p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-[12px] font-semibold text-white">Try our interactive ring sizer</p>
                  <p className="text-[11px] text-white/60 mt-0.5">Calibrate your screen and place your ring over it to find your exact size.</p>
                </div>
                <Link href="/ring-sizer" className="flex-shrink-0 bg-white text-bj-black text-[11px] font-medium px-4 py-2 hover:bg-bj-offwhite transition-colors whitespace-nowrap">
                  Open Ring Sizer →
                </Link>
              </div>

              {/* Measure at home */}
              <div className="bg-bj-offwhite p-5 space-y-3">
                <p className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">Find Your Ring Size from Measurement</p>
                <p className="text-[12px] text-bj-gray-600">Enter your finger circumference or ring diameter in mm to get your size instantly.</p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={ringMm}
                    onChange={e => setRingMm(e.target.value)}
                    placeholder="e.g. 17.3 (diameter)"
                    className="w-44 border border-bj-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:border-bj-black bg-white"
                  />
                  <span className="text-[11px] text-bj-gray-400">mm</span>
                  {suggestedRing && (
                    <div className="flex items-center gap-2 bg-white border border-bj-gray-100 px-4 py-2">
                      <p className="text-[10px] uppercase tracking-wider text-bj-gray-400">Match:</p>
                      <p className="text-[14px] font-bold text-bj-black">US {suggestedRing.us}</p>
                      <p className="text-[11px] text-bj-gray-500">/ EU {suggestedRing.eu} / UK {suggestedRing.uk} / JP {suggestedRing.jp}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Size table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-bj-gray-200">
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">US</th>
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">UK</th>
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">EU</th>
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Japan</th>
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Diameter (mm)</th>
                      <th className="text-left py-3 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Circ. (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RING_SIZES.map(size => {
                      const isMatch = suggestedRing?.us === size.us
                      return (
                        <tr key={size.us} className={`border-b border-bj-gray-50 ${isMatch ? 'bg-bj-blush' : 'hover:bg-bj-offwhite'} transition-colors`}>
                          <td className="py-3 pr-4 font-semibold text-bj-black">{size.us}</td>
                          <td className="py-3 pr-4 text-bj-gray-600">{size.uk}</td>
                          <td className="py-3 pr-4 text-bj-gray-600">{size.eu}</td>
                          <td className="py-3 pr-4 text-bj-gray-600">{size.jp}</td>
                          <td className="py-3 pr-4 text-bj-gray-600">{size.diameter}</td>
                          <td className="py-3 text-bj-gray-600">{size.circumference}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="bg-bj-pink/5 border border-bj-pink/20 p-4">
                <p className="text-[12px] text-bj-gray-600">
                  <span className="font-semibold text-bj-black">Free resize within 30 days</span> — order with confidence, we'll make it fit perfectly.
                </p>
              </div>
            </div>
          )}

          {/* ── NECKLACES ──────────────────────────────────────────────── */}
          {activeTab === 'necklaces' && (
            <div className="p-6 sm:p-8 space-y-8">

              {/* Visual diagram */}
              <div className="bg-bj-offwhite p-6">
                <p className="text-[10px] uppercase tracking-wider font-medium text-bj-gray-400 mb-5 text-center">Necklace Lengths at a Glance</p>
                <div className="flex items-start justify-center gap-8">
                  <svg viewBox="0 0 120 280" className="w-28 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="60" cy="28" rx="18" ry="22" fill="#e8e0d8" />
                    <rect x="53" y="48" width="14" height="18" fill="#e8e0d8" />
                    <path d="M20 66 Q60 58 100 66 L108 160 Q60 168 12 160 Z" fill="#e8e0d8" />
                    <line x1="46" y1="72" x2="74" y2="72" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                    <line x1="38" y1="84" x2="82" y2="84" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                    <line x1="30" y1="100" x2="90" y2="100" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                    <line x1="24" y1="118" x2="96" y2="118" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                    <line x1="20" y1="144" x2="100" y2="144" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                  </svg>
                  <div className="flex flex-col gap-3 pt-2">
                    {NECKLACE_LENGTHS.map(l => (
                      <div key={l.inches} className="flex items-center gap-3">
                        <div className="w-8 h-0.5 border-t border-dashed border-bj-pink/70 flex-shrink-0" />
                        <span className="text-[12px] font-bold text-bj-black w-8">{l.inches}"</span>
                        <span className="text-[12px] text-bj-gray-700 font-medium">{l.name}</span>
                        <span className="text-[11px] text-bj-gray-400">{l.cm} cm</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Length cards */}
              <div className="space-y-3">
                <h3 className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">Length Details</h3>
                {NECKLACE_LENGTHS.map(l => (
                  <div key={l.inches} className="border border-bj-gray-100 p-4 space-y-2 bg-white">
                    <div className="flex items-center gap-3">
                      <span className="bg-bj-black text-white px-2.5 py-1 text-[11px] font-bold tracking-wider">{l.inches}"</span>
                      <span className="text-[13px] font-semibold text-bj-black uppercase tracking-wider">{l.name}</span>
                    </div>
                    <p className="text-[12px] text-bj-gray-600">{l.description}</p>
                    <p className="text-[11px] text-bj-gray-500"><span className="font-medium text-bj-black">Style tip:</span> {l.tip}</p>
                  </div>
                ))}
              </div>

              {/* How to measure */}
              <div className="bg-bj-offwhite p-5 space-y-3">
                <p className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">How to Measure</p>
                <ol className="space-y-2">
                  {[
                    'Use a soft tape measure or a piece of string.',
                    'Hold the end at the center of your collarbone and let it fall to your desired drop point.',
                    'Note the length in inches or centimeters.',
                    'Compare to the chart above to select your ideal necklace length.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-[11px] font-bold text-bj-pink flex-shrink-0">{i + 1}.</span>
                      <p className="text-[12px] text-bj-gray-600">{step}</p>
                    </li>
                  ))}
                </ol>
                <p className="text-[11px] text-bj-gray-500 border-t border-bj-gray-200 pt-3">
                  <span className="font-semibold text-bj-black">Layering tip:</span> For a layered look, choose necklace lengths at least 2" apart — for example 16" + 18" + 22".
                </p>
              </div>
            </div>
          )}

          {/* ── BRACELETS ──────────────────────────────────────────────── */}
          {activeTab === 'bracelets' && (
            <div className="p-6 sm:p-8 space-y-8">

              {/* Wrist finder */}
              <div className="bg-bj-offwhite p-5 space-y-4">
                <p className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">Find Your Bracelet Size</p>
                <p className="text-[12px] text-bj-gray-600">Wrap a soft tape measure snugly around the widest part of your wrist and enter your measurement below.</p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={wristInput}
                    onChange={e => setWristInput(e.target.value)}
                    placeholder={wristUnit === 'in' ? 'e.g. 6.5' : 'e.g. 16.5'}
                    className="w-32 border border-bj-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:border-bj-black bg-white"
                  />
                  <div className="flex">
                    {(['in', 'cm'] as const).map(u => (
                      <button
                        key={u}
                        onClick={() => { setWristUnit(u); setWristInput('') }}
                        className={`px-3 py-2 text-[11px] font-medium uppercase border transition-colors ${
                          wristUnit === u ? 'bg-bj-black text-white border-bj-black' : 'border-bj-gray-200 text-bj-gray-500 hover:border-bj-black'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
                {suggestedBracelet && (
                  <div className="bg-white border border-bj-gray-100 p-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[12px] font-bold text-white">{suggestedBracelet.label}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-bj-gray-400">Recommended</p>
                      <p className="text-[14px] font-bold text-bj-black">Size {suggestedBracelet.label} — Bracelet {suggestedBracelet.braceletIn}</p>
                    </div>
                  </div>
                )}
                <p className="text-[11px] text-bj-gray-500">
                  <span className="font-semibold text-bj-black">Comfort tip:</span> Add 0.5" to your wrist measurement for a comfortable everyday fit.
                </p>
              </div>

              {/* Size chart */}
              <div className="space-y-3">
                <h3 className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">Bracelet Size Chart</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-[12px]">
                    <thead>
                      <tr className="border-b border-bj-gray-200">
                        <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Size</th>
                        <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Wrist (inches)</th>
                        <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Bracelet (in)</th>
                        <th className="text-left py-3 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Bracelet (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BRACELET_SIZES.map(size => {
                        const isMatch = suggestedBracelet?.label === size.label
                        return (
                          <tr key={size.label} className={`border-b border-bj-gray-50 transition-colors ${isMatch ? 'bg-bj-blush' : 'hover:bg-bj-offwhite'}`}>
                            <td className="py-3 pr-4 font-bold text-bj-black">{size.label}</td>
                            <td className="py-3 pr-4 text-bj-gray-600">
                              {size.wristMin === 0
                                ? `< ${size.wristMax}"`
                                : size.wristMax === 99
                                ? `> ${size.wristMin}"`
                                : `${size.wristMin}" – ${size.wristMax}"`}
                            </td>
                            <td className="py-3 pr-4 text-bj-gray-600">{size.braceletIn}</td>
                            <td className="py-3 text-bj-gray-600">{size.braceletCm}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fit style guide */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { type: 'Snug', extra: '+0.25"', desc: 'Minimal movement. Ideal for bangles.' },
                  { type: 'Comfort', extra: '+0.5"', desc: 'Slight movement. Most popular fit.' },
                  { type: 'Loose', extra: '+1"', desc: 'Relaxed, stackable look.' },
                ].map(f => (
                  <div key={f.type} className="bg-bj-offwhite p-4 text-center space-y-1">
                    <p className="text-[12px] font-semibold text-bj-black">{f.type}</p>
                    <p className="text-[11px] text-bj-pink font-medium">{f.extra}</p>
                    <p className="text-[10px] text-bj-gray-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom help row */}
        <div className="flex flex-col sm:flex-row gap-4 text-center sm:text-left">
          <div className="flex-1 bg-white border border-bj-gray-100 p-5 space-y-2">
            <p className="text-[13px] font-semibold text-bj-black">Still unsure?</p>
            <p className="text-[12px] text-bj-gray-500">Our jewelry consultants can help you find the perfect fit.</p>
            <Link href="/contact" className="text-[11px] text-bj-pink underline underline-offset-2 hover:text-bj-pink-hover transition-colors font-medium">
              Contact us →
            </Link>
          </div>
          <div className="flex-1 bg-white border border-bj-gray-100 p-5 space-y-2">
            <p className="text-[13px] font-semibold text-bj-black">Book a consultation</p>
            <p className="text-[12px] text-bj-gray-500">Get personalized sizing advice via virtual or in-store appointment.</p>
            <Link href="/consultation" className="text-[11px] text-bj-pink underline underline-offset-2 hover:text-bj-pink-hover transition-colors font-medium">
              Book now →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
