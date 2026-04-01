import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Diamond Certification — IGI & GIA Explained - Bonjoojoo',
  description: 'Every Bonjoojoo lab-grown diamond comes with an IGI or GIA certificate. Learn what certification means, how to read your certificate, and how to verify it independently.',
}

export default function CertificationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-4">Quality Assurance</p>
          <h1 className="text-5xl font-light text-gray-900 mb-6">Certified Brilliance</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every Bonjoojoo diamond is independently graded by the world's most respected
            gemological laboratories. Your certificate is your guarantee.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20 sm:px-6 lg:px-8">

        {/* What is Certification */}
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-6">What Is Diamond Certification?</h2>
          <div className="prose prose-lg text-gray-600 max-w-none">
            <p className="mb-5 leading-relaxed">
              A diamond certificate — also called a grading report — is an independent, expert
              evaluation of your diamond's characteristics. It's produced by a gemological laboratory
              whose trained gemmologists examine the stone under magnification and controlled lighting
              to assess its quality according to internationally recognized standards.
            </p>
            <p className="mb-5 leading-relaxed">
              Certification exists to protect you. Without it, there is no objective way to verify a
              seller's claims about a diamond's quality. A certificate from a reputable lab gives you
              documented proof of exactly what you're buying — before, during, and after the purchase.
            </p>
            <p className="leading-relaxed">
              Every Bonjoojoo diamond comes with either an IGI (International Gemological Institute)
              or GIA (Gemological Institute of America) certificate — the two most trusted names in
              diamond grading worldwide.
            </p>
          </div>
        </section>

        {/* The 4 Cs */}
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-8">The 4 Cs — What Your Certificate Grades</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                letter: 'C',
                name: 'Cut',
                description: 'Cut refers to how well a diamond\'s facets interact with light — its proportions, symmetry, and polish. Cut quality ranges from Excellent to Poor. It is the single biggest factor in a diamond\'s visual brilliance, fire, and scintillation.',
                scale: 'Excellent → Very Good → Good → Fair → Poor'
              },
              {
                letter: 'C',
                name: 'Color',
                description: 'Diamond color is graded on a D-to-Z scale, where D is completely colorless (rarest, most valuable) and Z shows visible yellow or brown tints. Bonjoojoo diamonds are typically graded D through H — colorless to near-colorless.',
                scale: 'D (Colorless) → E → F → G → H → I → J → Z (Light Color)'
              },
              {
                letter: 'C',
                name: 'Clarity',
                description: 'Clarity measures the presence and visibility of internal inclusions and surface blemishes. Graded under 10× magnification by trained gemmologists, it reflects the diamond\'s purity. Most inclusions are invisible to the naked eye.',
                scale: 'FL → IF → VVS1/2 → VS1/2 → SI1/2 → I1/2/3'
              },
              {
                letter: 'C',
                name: 'Carat',
                description: 'Carat is the unit of weight for diamonds. One carat equals 0.2 grams. Larger diamonds are rarer and command higher prices per carat. Carat weight should be considered alongside cut, color, and clarity — a well-cut smaller diamond often appears larger than a poorly-cut heavier stone.',
                scale: '1 carat = 0.2 grams = 200 milligrams'
              }
            ].map((c, i) => (
              <div key={i} className="border border-gray-200 p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center text-2xl font-light flex-shrink-0">
                    {c.letter}
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 pt-2">{c.name}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{c.description}</p>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Scale</p>
                <p className="text-xs text-gray-500 mt-1">{c.scale}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sample Certificate Layout */}
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-8">Sample IGI Certificate</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Below is a representative IGI certificate layout. Your actual certificate will be
            specific to your diamond's unique characteristics.
          </p>

          {/* Mock Certificate */}
          <div className="border-2 border-gray-200 p-8 bg-gray-50 font-mono text-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">International Gemological Institute</p>
                <p className="text-2xl font-bold text-gray-900">IGI REPORT</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Report Number</p>
                <p className="font-bold text-gray-900">LG-524-087-***</p>
                <p className="text-xs text-gray-500 mt-1">Date: April 2024</p>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-6 grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Shape & Cutting Style</span>
                  <span className="text-gray-900 font-medium">ROUND BRILLIANT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Measurements</span>
                  <span className="text-gray-900 font-medium">6.43–6.46 × 4.00 mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Carat Weight</span>
                  <span className="text-gray-900 font-medium">1.00 ct</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Color Grade</span>
                  <span className="text-gray-900 font-medium">E</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Clarity Grade</span>
                  <span className="text-gray-900 font-medium">VS1</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Cut Grade</span>
                  <span className="text-gray-900 font-medium">EXCELLENT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Polish</span>
                  <span className="text-gray-900 font-medium">EXCELLENT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Symmetry</span>
                  <span className="text-gray-900 font-medium">EXCELLENT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Fluorescence</span>
                  <span className="text-gray-900 font-medium">NONE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Growth Type</span>
                  <span className="text-gray-900 font-medium">LAB GROWN (CVD)</span>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 mt-6 pt-4">
              <p className="text-xs text-gray-400 text-center">
                This grading report is not a guarantee, valuation, or appraisal. Verify at igi.org/report-check
              </p>
            </div>
          </div>
        </section>

        {/* IGI vs GIA */}
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-8">IGI vs. GIA — What's the Difference?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm">IGI</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900">International Gemological Institute</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Founded in 1975, IGI is the world's largest independent gemological laboratory. They
                were among the first major labs to develop standardized grading criteria specifically
                for lab-grown diamonds and have certified more lab-grown stones than any other lab.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Global leader in lab-grown diamond certification
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Reports include growth method (CVD or HPHT)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Verifiable at igi.org/report-check
                </li>
              </ul>
            </div>

            <div className="border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-50 border border-purple-100 flex items-center justify-center">
                  <span className="text-purple-700 font-bold text-sm">GIA</span>
                </div>
                <h3 className="text-xl font-medium text-gray-900">Gemological Institute of America</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Founded in 1931, GIA invented the 4 Cs grading system and remains the most widely
                recognized name in diamond certification globally. GIA is particularly well-known for
                the strictness and consistency of its natural diamond grades.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Inventor of the internationally used 4 Cs system
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Highest brand recognition in the industry
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  Verifiable at gia.edu/report-check
                </li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6 leading-relaxed">
            Both IGI and GIA certificates are widely accepted by jewelry retailers, insurers, and
            appraisers worldwide. All Bonjoojoo diamonds are certified by one of these two institutions.
            The certificate type is specified on every product page.
          </p>
        </section>

        {/* How to Verify */}
        <section className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-6">How to Verify Your Certificate</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Every Bonjoojoo certificate can be independently verified directly with the issuing lab.
            Here's how:
          </p>
          <div className="space-y-4">
            {[
              {
                step: '01',
                title: 'Locate your report number',
                body: 'Your certificate arrives with your jewelry. The unique report number is printed on the physical certificate and is also laser-inscribed on the diamond\'s girdle (the thin outer edge).'
              },
              {
                step: '02',
                title: 'Visit the lab\'s official verification portal',
                body: 'For IGI certificates, go to igi.org/report-check. For GIA certificates, go to gia.edu/report-check. Enter your report number in the search field.'
              },
              {
                step: '03',
                title: 'Compare the grading data',
                body: 'The lab\'s database entry should match your physical certificate exactly — same carat weight, color grade, clarity grade, and cut grade. Any discrepancy is a red flag worth investigating.'
              },
              {
                step: '04',
                title: 'Inspect the laser inscription (optional)',
                body: 'Use a 10× loupe (jeweler\'s magnifier) to view the girdle of your diamond. The report number is laser-etched there, invisible to the naked eye but readable under magnification. It\'s a tamper-evident link between the stone and the certificate.'
              }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-gray-50">
                <div className="text-3xl font-light text-gray-300 flex-shrink-0 w-10">{item.step}</div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* External Links */}
        <section className="mb-20 bg-gray-50 p-10">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Verify Your Certificate Directly</h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            We encourage every customer to independently verify their certificate. These are the
            official verification portals from each lab:
          </p>
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://www.igi.org/report-check.php"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 text-sm text-gray-700 hover:border-gray-900 transition-colors"
            >
              <span>IGI Report Check</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="https://www.gia.edu/report-check"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-gray-300 px-6 py-3 text-sm text-gray-700 hover:border-gray-900 transition-colors"
            >
              <span>GIA Report Check</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 border-t border-gray-200">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Shop Certified Diamonds</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Every piece in our collection ships with its IGI or GIA certificate. No exceptions.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/"
              className="inline-block bg-gray-900 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-gray-700 transition-colors"
            >
              Shop the Collection
            </a>
            <a
              href="/sustainability"
              className="inline-block border border-gray-300 text-gray-700 px-8 py-4 text-sm tracking-widest uppercase hover:border-gray-900 transition-colors"
            >
              Our Sustainability Promise
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
