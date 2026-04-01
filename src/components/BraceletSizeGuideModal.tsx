'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

const BRACELET_SIZES = [
  {
    label: 'XS',
    wristMin: 0,
    wristMax: 6.0,
    braceletSize: '6.5"',
    cm: '16.5',
    description: 'For very slender wrists. Sits snugly for a delicate look.',
  },
  {
    label: 'S',
    wristMin: 5.5,
    wristMax: 6.5,
    braceletSize: '7.0"',
    cm: '17.8',
    description: 'Our most popular small size. Comfortable everyday wear.',
  },
  {
    label: 'M',
    wristMin: 6.5,
    wristMax: 7.0,
    braceletSize: '7.5"',
    cm: '19.0',
    description: 'The average adult wrist size. Relaxed, comfortable fit.',
  },
  {
    label: 'L',
    wristMin: 7.0,
    wristMax: 7.5,
    braceletSize: '8.0"',
    cm: '20.3',
    description: 'Slightly loose fit. Great for charm bracelets with extra links.',
  },
  {
    label: 'XL',
    wristMin: 7.5,
    wristMax: 99,
    braceletSize: '8.5"+',
    cm: '21.5+',
    description: 'For larger wrists or those who prefer a loose, stacked look.',
  },
]

interface BraceletSizeGuideModalProps {
  open: boolean
  onClose: () => void
}

export default function BraceletSizeGuideModal({ open, onClose }: BraceletSizeGuideModalProps) {
  const [wristInput, setWristInput] = useState('')
  const [unit, setUnit] = useState<'in' | 'cm'>('in')

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const wristInches = unit === 'in'
    ? parseFloat(wristInput)
    : parseFloat(wristInput) / 2.54

  const suggestedSize = !isNaN(wristInches) && wristInches > 3
    ? BRACELET_SIZES.find(s => wristInches >= s.wristMin && wristInches < s.wristMax) ?? BRACELET_SIZES[BRACELET_SIZES.length - 1]
    : null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-2xl bg-white sm:rounded-none max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-bj-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-bj-black uppercase tracking-[0.12em]">Bracelet Size Guide</h2>
            <p className="text-[11px] text-bj-gray-400 mt-0.5">Find your perfect fit in seconds</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center hover:bg-bj-gray-50 transition-colors rounded-full">
            <X size={18} className="text-bj-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">

            {/* Quick finder */}
            <div className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">Find Your Size Instantly</h3>
              <div className="bg-bj-offwhite p-5 space-y-4">
                <p className="text-[12px] text-bj-gray-600 leading-relaxed">
                  Measure your wrist with a soft tape measure or a strip of paper. Wrap it snugly (not tight) around the widest part of your wrist.
                </p>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={wristInput}
                    onChange={e => setWristInput(e.target.value)}
                    placeholder={unit === 'in' ? 'e.g. 6.5' : 'e.g. 16.5'}
                    className="w-32 border border-bj-gray-300 px-3 py-2 text-[13px] focus:outline-none focus:border-bj-black"
                  />
                  <div className="flex">
                    {(['in', 'cm'] as const).map(u => (
                      <button
                        key={u}
                        onClick={() => { setUnit(u); setWristInput('') }}
                        className={`px-3 py-2 text-[11px] font-medium uppercase border transition-colors ${
                          unit === u
                            ? 'bg-bj-black text-white border-bj-black'
                            : 'border-bj-gray-200 text-bj-gray-500 hover:border-bj-black'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>

                {suggestedSize && (
                  <div className="bg-white border border-bj-gray-100 p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-bj-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[13px] font-bold text-white">{suggestedSize.label}</span>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-bj-gray-400">Recommended for you</p>
                      <p className="text-[14px] font-bold text-bj-black">{suggestedSize.label} — Bracelet {suggestedSize.braceletSize}</p>
                      <p className="text-[11px] text-bj-gray-500 mt-0.5">{suggestedSize.description}</p>
                    </div>
                  </div>
                )}

                <p className="text-[11px] text-bj-gray-500">
                  <span className="font-semibold text-bj-black">Comfort tip:</span> Add 0.5" to your wrist measurement for a comfortable fit. Add 1" for a loose, stackable look.
                </p>
              </div>
            </div>

            {/* Size chart */}
            <div className="space-y-3">
              <h3 className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-bj-gray-200">
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Size</th>
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Wrist (in)</th>
                      <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Bracelet (in)</th>
                      <th className="text-left py-3 text-[10px] uppercase tracking-wider text-bj-gray-400 font-medium">Bracelet (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {BRACELET_SIZES.map(size => {
                      const isHighlighted = suggestedSize?.label === size.label
                      return (
                        <tr
                          key={size.label}
                          className={`border-b border-bj-gray-50 transition-colors ${isHighlighted ? 'bg-bj-blush' : 'hover:bg-bj-offwhite'}`}
                        >
                          <td className="py-3 pr-4 font-bold text-bj-black">{size.label}</td>
                          <td className="py-3 pr-4 text-bj-gray-600">
                            {size.wristMin === 0
                              ? `< ${size.wristMax}"`
                              : size.wristMax === 99
                              ? `> ${size.wristMin}"`
                              : `${size.wristMin}" – ${size.wristMax}"`}
                          </td>
                          <td className="py-3 pr-4 text-bj-gray-600">{size.braceletSize}</td>
                          <td className="py-3 text-bj-gray-600">{size.cm}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-bj-gray-400">Bracelet lengths include a 0.5" comfort allowance over wrist size.</p>
            </div>

            {/* How to measure steps */}
            <div className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">How to Measure Your Wrist</h3>
              <div className="space-y-3">
                {[
                  { step: 1, text: 'Use a flexible measuring tape or a strip of paper about 30 cm long.' },
                  { step: 2, text: 'Wrap it around the widest part of your wrist, just below the wrist bone.' },
                  { step: 3, text: 'Note where the end meets the tape (or mark the paper strip and measure it against a ruler).' },
                  { step: 4, text: 'This is your wrist measurement. Add 0.5" for a snug fit, or 1" for a relaxed look.' },
                ].map(({ step, text }) => (
                  <div key={step} className="flex gap-4">
                    <span className="text-[11px] font-bold text-bj-pink flex-shrink-0 w-4">{step}.</span>
                    <p className="text-[12px] text-bj-gray-600 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fit guide */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { type: 'Snug', extra: '+0.25"', desc: 'Minimal movement. Best for bangles.' },
                { type: 'Comfort', extra: '+0.5"', desc: 'Slight movement. Most popular fit.' },
                { type: 'Loose', extra: '+1"', desc: 'Casual, stackable feel.' },
              ].map(f => (
                <div key={f.type} className="bg-bj-offwhite p-3 text-center space-y-1">
                  <p className="text-[12px] font-semibold text-bj-black">{f.type}</p>
                  <p className="text-[11px] text-bj-pink font-medium">{f.extra} wrist size</p>
                  <p className="text-[10px] text-bj-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-bj-gray-100 flex-shrink-0 flex items-center justify-between bg-white">
          <p className="text-[11px] text-bj-gray-400">
            Need help? <a href="/contact" className="text-bj-black underline underline-offset-2 hover:text-bj-pink transition-colors">Contact us</a>
          </p>
          <a href="/size-guide" className="text-[11px] text-bj-gray-400 hover:text-bj-black transition-colors underline underline-offset-2">
            Full size guide
          </a>
        </div>
      </div>
    </div>
  )
}
