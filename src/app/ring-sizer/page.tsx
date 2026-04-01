'use client'

import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Printer, Ruler, ChevronLeft, ChevronRight, Info } from 'lucide-react'

/* ── Ring size data with Japanese sizes ──────────────────────────────────── */

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

/* ── Credit card physical dimensions ─────────────────────────────────────── */
// A standard credit card is 85.60 mm wide × 53.98 mm tall (ISO/IEC 7810 ID-1)
const CARD_PHYSICAL_MM = 85.6

/* ── Component ────────────────────────────────────────────────────────────── */

type Tab = 'sizer' | 'chart'
type SizeSystem = 'us' | 'uk' | 'eu' | 'jp'

export default function RingSizerPage() {
  const [activeTab, setActiveTab] = useState<Tab>('sizer')
  const [sizeSystem, setSizeSystem] = useState<SizeSystem>('us')

  /* Calibration state — card width in pixels */
  const [cardPx, setCardPx] = useState(323) // ~96 DPI default for 85.6mm
  const [calibrated, setCalibrated] = useState(false)
  const [highlightSize, setHighlightSize] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(0)

  /* Measurement lookup */
  const [measMm, setMeasMm] = useState('')

  const dragging = useRef(false)
  const dragStart = useRef({ x: 0, cardPx: 0 })

  const pxPerMm = cardPx / CARD_PHYSICAL_MM
  const SIZES_PER_PAGE = 6
  const totalPages = Math.ceil(RING_SIZES.length / SIZES_PER_PAGE)
  const pageSizes = RING_SIZES.slice(currentPage * SIZES_PER_PAGE, (currentPage + 1) * SIZES_PER_PAGE)

  /* Drag handlers for card resize */
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    dragStart.current = { x: e.clientX, cardPx }
    e.preventDefault()
  }, [cardPx])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return
    const delta = e.clientX - dragStart.current.x
    const newPx = Math.max(200, Math.min(600, dragStart.current.cardPx + delta * 2))
    setCardPx(newPx)
  }, [])

  const onMouseUp = useCallback(() => {
    if (dragging.current) {
      dragging.current = false
      setCalibrated(true)
    }
  }, [])

  /* Touch handlers */
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true
    dragStart.current = { x: e.touches[0].clientX, cardPx }
  }, [cardPx])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current) return
    const delta = e.touches[0].clientX - dragStart.current.x
    const newPx = Math.max(200, Math.min(600, dragStart.current.cardPx + delta * 2))
    setCardPx(newPx)
  }, [])

  const onTouchEnd = useCallback(() => {
    if (dragging.current) {
      dragging.current = false
      setCalibrated(true)
    }
  }, [])

  /* Measurement lookup */
  const parsedMm = parseFloat(measMm)
  const measuredMatch = !isNaN(parsedMm) && parsedMm > 10
    ? RING_SIZES.reduce((prev, curr) =>
        Math.abs(parseFloat(curr.diameter) - parsedMm) < Math.abs(parseFloat(prev.diameter) - parsedMm)
          ? curr : prev)
    : null

  const tabs: { id: Tab; label: string }[] = [
    { id: 'sizer', label: 'Interactive Sizer' },
    { id: 'chart', label: 'Size Chart' },
  ]

  return (
    <div
      className="min-h-screen bg-bj-offwhite"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Page header */}
      <div className="bg-white border-b border-bj-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-bj-gray-400 mb-2">
            <Link href="/" className="hover:text-bj-black transition-colors">Home</Link>
            <span className="mx-2">/</span>
            Ring Sizer
          </p>
          <h1 className="text-[28px] sm:text-[36px] font-light text-bj-black tracking-tight">
            Find Your Ring Size
          </h1>
          <p className="text-[13px] text-bj-gray-500 mt-2">
            Use our interactive sizer to find your exact ring size — no ruler needed.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-10 space-y-6">

        {/* Tab nav */}
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

          {/* ── INTERACTIVE SIZER ─────────────────────────────────────────── */}
          {activeTab === 'sizer' && (
            <div className="p-6 sm:p-8 space-y-8">

              {/* Step 1 — Calibrate */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-white">1</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[13px] font-semibold text-bj-black uppercase tracking-wider">Calibrate Your Screen</h3>
                    <p className="text-[12px] text-bj-gray-600 leading-relaxed">
                      Hold a credit card (or any standard ID card) up to your screen. Drag the handle below until the card on screen matches your physical card exactly.
                    </p>
                  </div>
                </div>

                {/* Credit card visual */}
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="relative select-none">
                    {/* Card */}
                    <div
                      className="relative bg-gradient-to-br from-bj-black via-[#1a1a2e] to-[#2d1b4e] rounded-lg flex flex-col justify-between overflow-hidden shadow-xl"
                      style={{
                        width: `${cardPx}px`,
                        height: `${cardPx * (53.98 / 85.6)}px`,
                      }}
                    >
                      {/* Card chip */}
                      <div className="absolute top-[22%] left-[8%]">
                        <div
                          className="bg-gradient-to-br from-[#d4a843] to-[#f0c060] rounded-sm"
                          style={{ width: `${cardPx * 0.13}px`, height: `${cardPx * 0.1}px` }}
                        />
                      </div>
                      {/* Card number */}
                      <div
                        className="absolute bottom-[28%] left-[8%] text-white/70 font-mono tracking-widest"
                        style={{ fontSize: `${cardPx * 0.045}px` }}
                      >
                        •••• •••• •••• ••••
                      </div>
                      {/* Label */}
                      <div
                        className="absolute bottom-[10%] left-[8%] text-white/40 uppercase tracking-widest font-light"
                        style={{ fontSize: `${cardPx * 0.04}px` }}
                      >
                        Standard Card
                      </div>
                      {/* Width label */}
                      <div
                        className="absolute bottom-[10%] right-[8%] text-white/50 font-light"
                        style={{ fontSize: `${cardPx * 0.04}px` }}
                      >
                        85.6 mm
                      </div>
                      {/* Shine */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none rounded-lg" />
                    </div>

                    {/* Drag handle */}
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex items-center gap-1 cursor-ew-resize pl-2"
                      onMouseDown={onMouseDown}
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    >
                      <div className="w-8 h-8 bg-bj-pink rounded-full flex items-center justify-center shadow-lg hover:bg-bj-pink-hover transition-colors">
                        <Ruler size={14} className="text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Slider fallback */}
                  <div className="w-full max-w-xs space-y-2">
                    <label className="text-[10px] uppercase tracking-wider text-bj-gray-400 flex items-center gap-1">
                      <Info size={11} />
                      Or use the slider to resize the card
                    </label>
                    <input
                      type="range"
                      min={200}
                      max={600}
                      value={cardPx}
                      onChange={e => { setCardPx(Number(e.target.value)); setCalibrated(true) }}
                      className="w-full accent-bj-black"
                    />
                    <div className="flex justify-between text-[10px] text-bj-gray-400">
                      <span>Smaller</span>
                      <span>Larger</span>
                    </div>
                  </div>

                  {calibrated && (
                    <div className="flex items-center gap-2 text-[11px] text-bj-gray-500 bg-white border border-bj-gray-100 px-4 py-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
                      Calibrated — {pxPerMm.toFixed(2)} px/mm
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2 — Find your size */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${calibrated ? 'bg-bj-black' : 'bg-bj-gray-200'}`}>
                    <span className={`text-[10px] font-bold ${calibrated ? 'text-white' : 'text-bj-gray-400'}`}>2</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className={`text-[13px] font-semibold uppercase tracking-wider ${calibrated ? 'text-bj-black' : 'text-bj-gray-400'}`}>Place Your Ring Over the Screen</h3>
                    <p className="text-[12px] text-bj-gray-600 leading-relaxed">
                      {calibrated
                        ? 'Hold a ring over your screen and find the circle that matches the inside opening of your ring.'
                        : 'Complete calibration above first, then place your ring over the matching circle below.'}
                    </p>
                  </div>
                </div>

                {/* Ring circles */}
                <div className={`transition-opacity duration-300 ${calibrated ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  {/* Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] uppercase tracking-wider text-bj-gray-400">
                      Sizes {currentPage * SIZES_PER_PAGE + 1}–{Math.min((currentPage + 1) * SIZES_PER_PAGE, RING_SIZES.length)} of {RING_SIZES.length}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                        disabled={currentPage === 0}
                        className="w-8 h-8 flex items-center justify-center border border-bj-gray-200 hover:border-bj-black disabled:opacity-30 transition-colors"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                        disabled={currentPage === totalPages - 1}
                        className="w-8 h-8 flex items-center justify-center border border-bj-gray-200 hover:border-bj-black disabled:opacity-30 transition-colors"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                    {pageSizes.map(size => {
                      const diamPx = parseFloat(size.diameter) * pxPerMm
                      const isHighlighted = highlightSize === size.us
                      return (
                        <button
                          key={size.us}
                          onClick={() => setHighlightSize(isHighlighted ? null : size.us)}
                          className="flex flex-col items-center gap-2 group"
                        >
                          {/* Circle at calibrated physical size */}
                          <div
                            className={`rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                              isHighlighted
                                ? 'border-bj-pink bg-bj-pink/10'
                                : 'border-bj-gray-400 group-hover:border-bj-black'
                            }`}
                            style={{
                              width: `${diamPx}px`,
                              height: `${diamPx}px`,
                              minWidth: '32px',
                              minHeight: '32px',
                              maxWidth: '90px',
                              maxHeight: '90px',
                            }}
                          />
                          <div className="text-center">
                            <p className={`text-[11px] font-bold ${isHighlighted ? 'text-bj-pink' : 'text-bj-black'}`}>
                              US {size.us}
                            </p>
                            <p className="text-[9px] text-bj-gray-400">{size.diameter}mm</p>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {highlightSize && (
                    <div className="mt-6 bg-bj-blush border border-bj-pink/20 p-4">
                      {(() => {
                        const match = RING_SIZES.find(s => s.us === highlightSize)!
                        return (
                          <div className="flex flex-wrap items-center gap-6">
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-bj-gray-400 mb-1">Your size</p>
                              <p className="text-[22px] font-bold text-bj-black">US {match.us}</p>
                            </div>
                            <div className="flex gap-4 text-[12px] text-bj-gray-600">
                              <span><span className="font-semibold text-bj-black">UK</span> {match.uk}</span>
                              <span><span className="font-semibold text-bj-black">EU</span> {match.eu}</span>
                              <span><span className="font-semibold text-bj-black">JP</span> {match.jp}</span>
                              <span><span className="font-semibold text-bj-black">⌀</span> {match.diameter}mm</span>
                            </div>
                            <Link
                              href={`/category/rings`}
                              className="ml-auto btn-primary text-[11px] px-4 py-2 whitespace-nowrap"
                            >
                              Shop Rings →
                            </Link>
                          </div>
                        )
                      })()}
                    </div>
                  )}
                </div>
              </div>

              {/* Step 3 — Or measure */}
              <div className="border-t border-bj-gray-100 pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-bj-gray-800 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-white">3</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[13px] font-semibold text-bj-black uppercase tracking-wider">No Ring? Measure Instead</h3>
                    <p className="text-[12px] text-bj-gray-600">Wrap a strip of paper around your finger, mark the overlap, and enter the length (circumference) in mm.</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={measMm}
                    onChange={e => setMeasMm(e.target.value)}
                    placeholder="e.g. 54 (circumference mm)"
                    className="w-52 border border-bj-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:border-bj-black bg-white"
                  />
                  {measuredMatch && (
                    <div className="flex items-center gap-3 bg-bj-blush px-4 py-2 border border-bj-pink/20">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-bj-gray-400">Match</p>
                        <p className="text-[16px] font-bold text-bj-black">US {measuredMatch.us}</p>
                      </div>
                      <div className="text-[11px] text-bj-gray-500 space-y-0.5">
                        <p>UK {measuredMatch.uk} · EU {measuredMatch.eu} · JP {measuredMatch.jp}</p>
                        <p>⌀ {measuredMatch.diameter}mm</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Print / download */}
              <div className="border-t border-bj-gray-100 pt-6 flex flex-wrap gap-4">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 text-[11px] text-bj-gray-500 hover:text-bj-black transition-colors border border-bj-gray-200 px-4 py-2.5 hover:border-bj-black print:hidden"
                >
                  <Printer size={13} />
                  Print Ring Sizer
                </button>
                <Link
                  href="/size-guide"
                  className="flex items-center gap-2 text-[11px] text-bj-gray-500 hover:text-bj-black transition-colors border border-bj-gray-200 px-4 py-2.5 hover:border-bj-black"
                >
                  Full Sizing Guide (all jewelry) →
                </Link>
              </div>

              {/* Free resize promise */}
              <div className="bg-white border border-bj-gray-100 p-4">
                <p className="text-[12px] text-bj-gray-600">
                  <span className="font-semibold text-bj-black">Free resize within 30 days</span> — not sure between sizes? Order your best guess and we'll resize it for free.
                </p>
              </div>
            </div>
          )}

          {/* ── SIZE CHART ────────────────────────────────────────────────── */}
          {activeTab === 'chart' && (
            <div className="p-6 sm:p-8 space-y-6">

              {/* System toggle */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-[11px] text-bj-gray-500 uppercase tracking-wider">Highlight system:</span>
                {(['us', 'uk', 'eu', 'jp'] as SizeSystem[]).map(sys => (
                  <button
                    key={sys}
                    onClick={() => setSizeSystem(sys)}
                    className={`px-3 py-1 text-[11px] uppercase font-medium transition-colors ${
                      sizeSystem === sys ? 'bg-bj-black text-white' : 'border border-bj-gray-200 text-bj-gray-600 hover:border-bj-black'
                    }`}
                  >
                    {sys === 'jp' ? 'Japanese' : sys.toUpperCase()}
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

              {/* Measurement lookup */}
              <div className="bg-bj-offwhite p-5 space-y-3">
                <p className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">Find by Diameter</p>
                <div className="flex items-center gap-3 flex-wrap">
                  <input
                    type="number"
                    value={measMm}
                    onChange={e => setMeasMm(e.target.value)}
                    placeholder="e.g. 17.3 (mm)"
                    className="w-44 border border-bj-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:border-bj-black bg-white"
                  />
                  {measuredMatch && (
                    <div className="flex items-center gap-2 bg-white border border-bj-gray-100 px-4 py-2">
                      <p className="text-[10px] uppercase tracking-wider text-bj-gray-400">Match:</p>
                      <p className="text-[14px] font-bold text-bj-black">US {measuredMatch.us}</p>
                      <p className="text-[11px] text-bj-gray-500">/ UK {measuredMatch.uk} / EU {measuredMatch.eu} / JP {measuredMatch.jp}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Size table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-bj-gray-200">
                      <th className={`text-left py-3 pr-3 text-[10px] uppercase tracking-wider font-medium ${sizeSystem === 'us' ? 'text-bj-black' : 'text-bj-gray-400'}`}>US</th>
                      <th className={`text-left py-3 pr-3 text-[10px] uppercase tracking-wider font-medium ${sizeSystem === 'uk' ? 'text-bj-black' : 'text-bj-gray-400'}`}>UK</th>
                      <th className={`text-left py-3 pr-3 text-[10px] uppercase tracking-wider font-medium ${sizeSystem === 'eu' ? 'text-bj-black' : 'text-bj-gray-400'}`}>EU</th>
                      <th className={`text-left py-3 pr-3 text-[10px] uppercase tracking-wider font-medium ${sizeSystem === 'jp' ? 'text-bj-black' : 'text-bj-gray-400'}`}>Japan</th>
                      <th className="text-left py-3 pr-3 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Diameter (mm)</th>
                      <th className="text-left py-3 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Circ. (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {RING_SIZES.map(size => {
                      const isMatch = measuredMatch?.us === size.us
                      return (
                        <tr
                          key={size.us}
                          className={`border-b border-bj-gray-50 transition-colors ${isMatch ? 'bg-bj-blush' : 'hover:bg-bj-offwhite'}`}
                        >
                          <td className={`py-3 pr-3 ${sizeSystem === 'us' ? 'font-bold text-bj-black' : 'text-bj-gray-600'}`}>{size.us}</td>
                          <td className={`py-3 pr-3 ${sizeSystem === 'uk' ? 'font-bold text-bj-black' : 'text-bj-gray-600'}`}>{size.uk}</td>
                          <td className={`py-3 pr-3 ${sizeSystem === 'eu' ? 'font-bold text-bj-black' : 'text-bj-gray-600'}`}>{size.eu}</td>
                          <td className={`py-3 pr-3 ${sizeSystem === 'jp' ? 'font-bold text-bj-black' : 'text-bj-gray-600'}`}>{size.jp}</td>
                          <td className="py-3 pr-3 text-bj-gray-600">{size.diameter}</td>
                          <td className="py-3 text-bj-gray-600">{size.circumference}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Notes */}
              <div className="bg-bj-offwhite p-4 space-y-2">
                <p className="text-[11px] font-semibold text-bj-black uppercase tracking-wider">Sizing Tips</p>
                <ul className="space-y-1.5">
                  {[
                    'Measure later in the day — fingers are slightly larger in the afternoon and evening.',
                    'Cold hands can make fingers appear up to half a size smaller.',
                    'If between sizes, size up for comfort.',
                    'Wide band rings (6mm+) may feel tighter — consider sizing up by half a size.',
                  ].map((tip, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-bj-pink flex-shrink-0 font-bold text-[11px]">·</span>
                      <p className="text-[12px] text-bj-gray-600">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-bj-pink/5 border border-bj-pink/20 p-4">
                <p className="text-[12px] text-bj-gray-600">
                  <span className="font-semibold text-bj-black">Free resize within 30 days</span> — order with confidence, we'll make it fit perfectly.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom help row */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 bg-white border border-bj-gray-100 p-5 space-y-2">
            <p className="text-[13px] font-semibold text-bj-black">Need bracelets or necklaces?</p>
            <p className="text-[12px] text-bj-gray-500">Our full guide covers all jewelry types — rings, necklaces, and bracelets.</p>
            <Link href="/size-guide" className="text-[11px] text-bj-pink underline underline-offset-2 hover:text-bj-pink-hover transition-colors font-medium">
              View full sizing guide →
            </Link>
          </div>
          <div className="flex-1 bg-white border border-bj-gray-100 p-5 space-y-2">
            <p className="text-[13px] font-semibold text-bj-black">Still unsure?</p>
            <p className="text-[12px] text-bj-gray-500">Our jewelry consultants can help you find the perfect fit.</p>
            <Link href="/consultation" className="text-[11px] text-bj-pink underline underline-offset-2 hover:text-bj-pink-hover transition-colors font-medium">
              Book a consultation →
            </Link>
          </div>
        </div>

      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  )
}
