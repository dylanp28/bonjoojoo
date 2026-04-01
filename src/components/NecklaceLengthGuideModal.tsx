'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

const NECKLACE_LENGTHS = [
  {
    inches: 14,
    name: 'Choker',
    cm: '35.5',
    description: 'Sits snugly at the base of the neck. Best for V-necks, off-shoulder tops, and open necklines. Elongates the neck.',
    occasion: 'Everyday, date night',
    bodyTip: 'Suits all body types; especially flattering on longer necks',
  },
  {
    inches: 16,
    name: 'Collar',
    cm: '40.5',
    description: 'Sits just below the collarbone. The most universally flattering length — works with nearly any neckline.',
    occasion: 'Office, casual, dressy',
    bodyTip: 'Most versatile length; ideal for high and crew necks',
  },
  {
    inches: 18,
    name: 'Princess',
    cm: '45.5',
    description: 'Falls just below the collarbone. The most popular and classic length. Perfect for pendants and solitaires.',
    occasion: 'Everyday, all occasions',
    bodyTip: 'Universally flattering; our most-gifted length',
  },
  {
    inches: 20,
    name: 'Matinee',
    cm: '51',
    description: 'Rests between the collarbone and bust. Elegant and versatile — great for layering or wearing solo.',
    occasion: 'Business, casual, layering',
    bodyTip: 'Elongating; works well with turtlenecks and scoop necks',
  },
  {
    inches: 24,
    name: 'Opera',
    cm: '61',
    description: 'Falls at or below the bust. Makes a bold, dramatic statement. Ideal for evening wear and layering.',
    occasion: 'Formal, evening, layering',
    bodyTip: 'Stunning on petite frames; can be doubled as a choker',
  },
]

interface NecklaceLengthGuideModalProps {
  open: boolean
  onClose: () => void
}

export default function NecklaceLengthGuideModal({ open, onClose }: NecklaceLengthGuideModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full sm:max-w-2xl bg-white sm:rounded-none max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-bj-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-[15px] font-semibold text-bj-black uppercase tracking-[0.12em]">Necklace Length Guide</h2>
            <p className="text-[11px] text-bj-gray-400 mt-0.5">Find the perfect length for every look</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center hover:bg-bj-gray-50 transition-colors rounded-full">
            <X size={18} className="text-bj-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8">

            {/* Visual silhouette diagram */}
            <div className="bg-bj-offwhite p-6">
              <p className="text-[10px] uppercase tracking-wider font-medium text-bj-gray-400 mb-5 text-center">Necklace Lengths at a Glance</p>
              <div className="flex items-start justify-center gap-4 sm:gap-8">
                {/* Silhouette SVG with length markers */}
                <svg
                  viewBox="0 0 120 280"
                  className="w-24 sm:w-32 flex-shrink-0"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Head */}
                  <ellipse cx="60" cy="28" rx="18" ry="22" fill="#e8e0d8" />
                  {/* Neck */}
                  <rect x="53" y="48" width="14" height="18" fill="#e8e0d8" />
                  {/* Shoulders + torso */}
                  <path d="M20 66 Q60 58 100 66 L108 160 Q60 168 12 160 Z" fill="#e8e0d8" />
                  {/* 14in choker line */}
                  <line x1="46" y1="72" x2="74" y2="72" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                  {/* 16in collar line */}
                  <line x1="38" y1="84" x2="82" y2="84" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                  {/* 18in princess line */}
                  <line x1="30" y1="100" x2="90" y2="100" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                  {/* 20in matinee line */}
                  <line x1="24" y1="118" x2="96" y2="118" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                  {/* 24in opera line */}
                  <line x1="20" y1="144" x2="100" y2="144" stroke="#c8a4a4" strokeWidth="1.5" strokeDasharray="3,2" />
                </svg>

                {/* Legend */}
                <div className="flex flex-col gap-2.5 pt-2">
                  {NECKLACE_LENGTHS.map(l => (
                    <div key={l.inches} className="flex items-center gap-2.5">
                      <div className="w-6 h-0.5 bg-bj-pink/50 border-t border-dashed border-bj-pink/70 flex-shrink-0" />
                      <div>
                        <span className="text-[12px] font-semibold text-bj-black">{l.inches}"</span>
                        <span className="text-[12px] text-bj-gray-500 ml-1.5">— {l.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Length detail cards */}
            <div className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">Length Details</h3>
              {NECKLACE_LENGTHS.map(l => (
                <div key={l.inches} className="border border-bj-gray-100 p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-bj-black text-white px-2.5 py-1 text-[11px] font-bold tracking-wider flex-shrink-0">
                      {l.inches}"
                    </div>
                    <span className="text-[13px] font-semibold text-bj-black uppercase tracking-wider">{l.name}</span>
                    <span className="text-[11px] text-bj-gray-400 ml-auto">{l.cm} cm</span>
                  </div>
                  <p className="text-[12px] text-bj-gray-600 leading-relaxed">{l.description}</p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    <span className="text-[10px] bg-bj-offwhite px-2.5 py-1 text-bj-gray-500">
                      <span className="font-medium text-bj-black">Occasions:</span> {l.occasion}
                    </span>
                    <span className="text-[10px] bg-bj-offwhite px-2.5 py-1 text-bj-gray-500">
                      <span className="font-medium text-bj-black">Tip:</span> {l.bodyTip}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* How to measure */}
            <div className="space-y-4">
              <h3 className="text-[11px] uppercase tracking-wider font-medium text-bj-gray-400">How to Measure</h3>
              <div className="bg-bj-offwhite p-5 space-y-3">
                <ol className="space-y-3">
                  {[
                    'Use a soft tape measure or a piece of string.',
                    'Hold the end at the center of your collarbone and let it fall to where you want the necklace to hang.',
                    'Note the measurement at that point — this is your ideal necklace length.',
                    'If using string, lay it flat on a ruler to get the measurement in inches or centimeters.',
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-[11px] font-bold text-bj-pink flex-shrink-0 w-4">{i + 1}.</span>
                      <p className="text-[12px] text-bj-gray-600 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
                <div className="pt-2 border-t border-bj-gray-200">
                  <p className="text-[11px] text-bj-gray-500">
                    <span className="font-semibold text-bj-black">Layering tip:</span> For a layered look, choose lengths that are at least 2" apart (e.g., 16" + 18" + 22").
                  </p>
                </div>
              </div>
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
