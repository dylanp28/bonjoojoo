'use client'

import { useState, useEffect } from 'react'
import { X, Printer, ChevronRight, ChevronLeft, Ruler, Circle, BookOpen } from 'lucide-react'

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

type Tab = 'table' | 'measure' | 'finder'

interface RingSizeGuideModalProps {
  open: boolean
  onClose: () => void
  onSizeSelect?: (size: string) => void
  highlightSize?: string
}

export default function RingSizeGuideModal({ open, onClose, onSizeSelect, highlightSize }: RingSizeGuideModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('table')
  const [measureStep, setMeasureStep] = useState(0)
  const [measuredMm, setMeasuredMm] = useState('')
  const [finderStep, setFinderStep] = useState(0)
  const [knownSize, setKnownSize] = useState<'yes' | 'no' | null>(null)
  const [sizeSystem, setSizeSystem] = useState<'us' | 'eu' | 'uk'>('us')
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const getSuggestedSize = (mm: number) => {
    const match = RING_SIZES.reduce((prev, curr) => {
      return Math.abs(parseFloat(curr.diameter) - mm) < Math.abs(parseFloat(prev.diameter) - mm)
        ? curr
        : prev
    })
    return match
  }

  const parsedMm = parseFloat(measuredMm)
  const suggestedSize = !isNaN(parsedMm) && parsedMm > 10 ? getSuggestedSize(parsedMm) : null

  const handleSizeConfirm = (us: string) => {
    setSelectedSize(us)
    onSizeSelect?.(us)
    onClose()
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'table', label: 'Size Chart', icon: <BookOpen size={14} /> },
    { id: 'measure', label: 'Measure at Home', icon: <Ruler size={14} /> },
    { id: 'finder', label: 'Size Finder', icon: <Circle size={14} /> },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-2xl bg-white sm:rounded-none max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-bj-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-bj-black uppercase tracking-[0.12em]">Ring Size Guide</h2>
            <p className="text-[11px] text-bj-gray-400 mt-0.5">Find your perfect fit in minutes</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center hover:bg-bj-gray-50 transition-colors rounded-full">
            <X size={18} className="text-bj-gray-500" />
          </button>
        </div>

        {/* Resize promise banner */}
        <div className="bg-bj-blush border-b border-bj-pink/10 px-6 py-3 flex-shrink-0">
          <p className="text-[11px] text-bj-gray-600 text-center">
            <span className="font-semibold text-bj-pink">Free resize within 30 days</span> — order with confidence, we'll make it fit.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-bj-gray-100 flex-shrink-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-3.5 text-[11px] font-medium tracking-wider uppercase transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-bj-black text-bj-black'
                  : 'border-transparent text-bj-gray-400 hover:text-bj-black'
              }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">

          {/* ── SIZE CHART TAB ── */}
          {activeTab === 'table' && (
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 text-[11px] text-bj-gray-500">
                <span>Display sizes in:</span>
                {(['us', 'eu', 'uk'] as const).map(sys => (
                  <button
                    key={sys}
                    onClick={() => setSizeSystem(sys)}
                    className={`px-3 py-1 uppercase font-medium transition-colors ${
                      sizeSystem === sys ? 'bg-bj-black text-white' : 'border border-bj-gray-200 hover:border-bj-black text-bj-gray-600'
                    }`}
                  >
                    {sys}
                  </button>
                ))}
              </div>

              {/* Printable note */}
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 text-[11px] text-bj-gray-500 hover:text-bj-black transition-colors print:hidden"
              >
                <Printer size={13} />
                Print this page for a physical reference
              </button>

              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-bj-gray-200">
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">US</th>
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">UK</th>
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">EU</th>
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Diameter (mm)</th>
                      <th className="text-left py-3 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Circ. (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RING_SIZES.map((size) => {
                      const isHighlighted = highlightSize === size.us
                      return (
                        <tr
                          key={size.us}
                          className={`border-b border-bj-gray-50 cursor-pointer hover:bg-bj-offwhite transition-colors ${isHighlighted ? 'bg-bj-blush' : ''}`}
                          onClick={() => handleSizeConfirm(size.us)}
                        >
                          <td className="py-3 pr-4 font-semibold text-bj-black">{size.us}</td>
                          <td className="py-3 pr-4 text-bj-gray-600">{size.uk}</td>
                          <td className="py-3 pr-4 text-bj-gray-600">{size.eu}</td>
                          <td className="py-3 pr-4 text-bj-gray-600">{size.diameter}</td>
                          <td className="py-3 text-bj-gray-600">{size.circumference}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Demographics note */}
              <div className="bg-bj-offwhite p-4 space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider font-medium text-bj-gray-400">Common Sizes</p>
                <div className="flex gap-6">
                  <div>
                    <p className="text-[12px] text-bj-gray-600"><span className="font-semibold text-bj-black">Women:</span> avg US 7 (EU 54)</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-bj-gray-600"><span className="font-semibold text-bj-black">Men:</span> avg US 10 (EU 62)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── MEASURE AT HOME TAB ── */}
          {activeTab === 'measure' && (
            <div className="p-6 space-y-8">
              {/* Method A: String/Paper */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-white">A</span>
                  </div>
                  <h3 className="text-[13px] font-semibold text-bj-black uppercase tracking-wider">String or Paper Strip Method</h3>
                </div>
                <ol className="space-y-4">
                  {[
                    { n: 1, text: 'Cut a thin strip of paper about 15 cm long and 5 mm wide (or use a piece of string).' },
                    { n: 2, text: 'Wrap it snugly around the base of the finger you plan to wear the ring on. It should fit comfortably — not too tight, not too loose.' },
                    { n: 3, text: 'Mark where the paper or string overlaps with a pen.' },
                    { n: 4, text: 'Lay it flat and measure the length in millimeters from the end to your mark — this is your finger\'s circumference.' },
                    { n: 5, text: 'Find your circumference in the table below to get your ring size.' },
                  ].map(step => (
                    <li key={step.n} className="flex gap-4">
                      <span className="text-[11px] font-bold text-bj-pink flex-shrink-0 w-5">{step.n}.</span>
                      <p className="text-[12px] text-bj-gray-600 leading-relaxed">{step.text}</p>
                    </li>
                  ))}
                </ol>

                {/* Circumference lookup */}
                <div className="space-y-3">
                  <label className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-500">
                    Enter your measurement (mm)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={measuredMm}
                      onChange={e => setMeasuredMm(e.target.value)}
                      placeholder="e.g. 54"
                      className="w-32 border border-bj-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:border-bj-black"
                    />
                    {suggestedSize && (
                      <div className="flex items-center gap-3 bg-bj-blush px-4 py-2">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-bj-gray-400">Recommended</p>
                          <p className="text-[14px] font-bold text-bj-black">US {suggestedSize.us}</p>
                        </div>
                        <button
                          onClick={() => handleSizeConfirm(suggestedSize.us)}
                          className="text-[11px] font-medium text-bj-pink underline underline-offset-2 hover:text-bj-pink-hover transition-colors"
                        >
                          Select
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <hr className="border-bj-gray-100" />

              {/* Method B: Existing ring */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-white">B</span>
                  </div>
                  <h3 className="text-[13px] font-semibold text-bj-black uppercase tracking-wider">Measure a Ring You Already Own</h3>
                </div>
                <ol className="space-y-4">
                  {[
                    { n: 1, text: 'Pick a ring that fits the finger you\'ll wear the new ring on.' },
                    { n: 2, text: 'Place it flat on a ruler and measure the inside diameter (the opening) in millimeters.' },
                    { n: 3, text: 'Enter your diameter below to find your size.' },
                  ].map(step => (
                    <li key={step.n} className="flex gap-4">
                      <span className="text-[11px] font-bold text-bj-pink flex-shrink-0 w-5">{step.n}.</span>
                      <p className="text-[12px] text-bj-gray-600 leading-relaxed">{step.text}</p>
                    </li>
                  ))}
                </ol>

                {/* Visual printable sizer circles */}
                <div className="bg-bj-offwhite p-5 space-y-3">
                  <p className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">Printable Reference Circles</p>
                  <p className="text-[11px] text-bj-gray-500">Print this page at 100% scale and place your ring over each circle to find your match.</p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    {RING_SIZES.filter((_, i) => i % 2 === 0).map(size => (
                      <div key={size.us} className="flex flex-col items-center gap-1">
                        <div
                          className="rounded-full border-2 border-bj-black flex items-center justify-center"
                          style={{ width: `${parseFloat(size.diameter) * 3.78}px`, height: `${parseFloat(size.diameter) * 3.78}px` }}
                        >
                          <span className="text-[8px] font-bold text-bj-gray-400">US {size.us}</span>
                        </div>
                        <span className="text-[9px] text-bj-gray-400">{size.diameter}mm</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-bj-offwhite p-4 rounded">
                <p className="text-[11px] text-bj-gray-500"><span className="font-semibold text-bj-black">Tip:</span> Measure later in the day when fingers are slightly larger. Cold hands can make your finger appear smaller than normal.</p>
              </div>
            </div>
          )}

          {/* ── SIZE FINDER TAB ── */}
          {activeTab === 'finder' && (
            <div className="p-6">
              {finderStep === 0 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-overline text-bj-pink">Let's Find Your Size</p>
                    <h3 className="text-[18px] font-light text-bj-black">Do you already know your ring size?</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                    <button
                      onClick={() => { setKnownSize('yes'); setFinderStep(1) }}
                      className="py-6 border-2 border-bj-gray-200 hover:border-bj-black transition-all text-center group"
                    >
                      <span className="text-[22px] block mb-1">✓</span>
                      <span className="text-[13px] font-medium text-bj-black">Yes, I know it</span>
                    </button>
                    <button
                      onClick={() => { setKnownSize('no'); setFinderStep(2) }}
                      className="py-6 border-2 border-bj-gray-200 hover:border-bj-black transition-all text-center group"
                    >
                      <span className="text-[22px] block mb-1">?</span>
                      <span className="text-[13px] font-medium text-bj-black">Not sure</span>
                    </button>
                  </div>
                </div>
              )}

              {finderStep === 1 && knownSize === 'yes' && (
                <div className="space-y-6">
                  <button onClick={() => setFinderStep(0)} className="flex items-center gap-1.5 text-[11px] text-bj-gray-400 hover:text-bj-black transition-colors">
                    <ChevronLeft size={14} /> Back
                  </button>
                  <div className="text-center space-y-2">
                    <h3 className="text-[18px] font-light text-bj-black">Select your size system</h3>
                  </div>
                  <div className="flex justify-center gap-3">
                    {(['us', 'eu', 'uk'] as const).map(sys => (
                      <button
                        key={sys}
                        onClick={() => { setSizeSystem(sys); setFinderStep(3) }}
                        className="px-6 py-3 border-2 border-bj-gray-200 hover:border-bj-black transition-all text-[13px] font-medium text-bj-black uppercase"
                      >
                        {sys}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {finderStep === 2 && knownSize === 'no' && (
                <div className="space-y-6">
                  <button onClick={() => setFinderStep(0)} className="flex items-center gap-1.5 text-[11px] text-bj-gray-400 hover:text-bj-black transition-colors">
                    <ChevronLeft size={14} /> Back
                  </button>
                  <div className="text-center space-y-3 max-w-sm mx-auto">
                    <h3 className="text-[18px] font-light text-bj-black">No problem — measure at home in 2 minutes</h3>
                    <p className="text-[12px] text-bj-gray-500 leading-relaxed">Use our step-by-step guide to find your exact size using a piece of string or an existing ring.</p>
                  </div>
                  <div className="flex flex-col gap-3 max-w-sm mx-auto">
                    <button
                      onClick={() => setActiveTab('measure')}
                      className="w-full btn-primary py-4 flex items-center justify-center gap-2"
                    >
                      <Ruler size={16} />
                      Measure My Finger
                      <ChevronRight size={16} />
                    </button>
                    <p className="text-center text-[11px] text-bj-gray-400">
                      Or order your best guess — <span className="font-medium text-bj-black">free resize within 30 days</span>.
                    </p>
                  </div>
                </div>
              )}

              {finderStep === 3 && (
                <div className="space-y-6">
                  <button onClick={() => setFinderStep(1)} className="flex items-center gap-1.5 text-[11px] text-bj-gray-400 hover:text-bj-black transition-colors">
                    <ChevronLeft size={14} /> Back
                  </button>
                  <div className="text-center space-y-2">
                    <h3 className="text-[18px] font-light text-bj-black">Select your {sizeSystem.toUpperCase()} size</h3>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {RING_SIZES.map(size => {
                      const displaySize = sizeSystem === 'us' ? size.us : sizeSystem === 'eu' ? size.eu : size.uk
                      return (
                        <button
                          key={size.us}
                          onClick={() => handleSizeConfirm(size.us)}
                          className="aspect-square border-2 border-bj-gray-200 hover:border-bj-black hover:bg-bj-black hover:text-white transition-all text-[13px] font-medium text-bj-black"
                        >
                          {displaySize}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-bj-gray-100 flex-shrink-0 flex items-center justify-between bg-white">
          <p className="text-[11px] text-bj-gray-400">
            Need help? <a href="/contact" className="text-bj-black underline underline-offset-2 hover:text-bj-pink transition-colors">Contact us</a>
          </p>
          <a href="/help/sizing" className="text-[11px] text-bj-gray-400 hover:text-bj-black transition-colors underline underline-offset-2">
            Full size guide
          </a>
        </div>
      </div>
    </div>
  )
}
