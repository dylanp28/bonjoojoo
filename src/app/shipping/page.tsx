import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping Information - Bonjoojoo',
  description: 'Free shipping on every order. Learn about delivery times, international shipping, and our secure packaging.',
}

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Shipping Information</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Free shipping on every order. Fast, secure, and fully insured delivery of your precious jewelry worldwide.
          </p>
        </div>

        {/* Shipping Options */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Shipping Options</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-4">Domestic Shipping (USA)</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Standard Delivery</div>
                    <div className="text-sm text-gray-600">3–5 business days via FedEx</div>
                  </div>
                  <div className="text-gray-900 font-medium">Free</div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Expedited Delivery</div>
                    <div className="text-sm text-gray-600">1–2 business days via FedEx Express</div>
                  </div>
                  <div className="text-gray-900">$25</div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <div className="font-medium text-gray-900">Overnight Delivery</div>
                    <div className="text-sm text-gray-600">Next business day via FedEx Overnight</div>
                  </div>
                  <div className="text-gray-900">$45</div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-4">International Shipping</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <div className="font-medium text-gray-900">Standard International</div>
                    <div className="text-sm text-gray-600">7–14 business days · $500 minimum order</div>
                  </div>
                  <div className="text-gray-900">$75</div>
                </div>
                <div className="py-2 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-900 mb-1">Available countries:</div>
                  <div className="text-sm text-gray-600">
                    Canada, UK, Australia, Germany, France, Italy, Spain, Netherlands, Switzerland, Japan
                  </div>
                </div>
                <div className="py-2">
                  <div className="text-sm text-gray-600">
                    * Duties and taxes are the customer&apos;s responsibility
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security & Insurance */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Security & Insurance</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Fully Insured</h3>
                <p className="text-sm text-gray-600">
                  All shipments are fully insured for the declared value of your jewelry.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Signature Required</h3>
                <p className="text-sm text-gray-600">
                  Adult signature required upon delivery for security and peace of mind.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Package Tracking</h3>
                <p className="text-sm text-gray-600">
                  Real-time tracking information provided for all shipments.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Time */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Processing Time</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-gray-300 pl-6">
              <h3 className="font-medium text-gray-900 mb-2">Ready-to-Ship Items</h3>
              <p className="text-gray-600">
                In-stock jewelry ships within 1-2 business days after order confirmation and payment processing.
              </p>
            </div>
            
            <div className="border-l-4 border-gray-300 pl-6">
              <h3 className="font-medium text-gray-900 mb-2">Made-to-Order Items</h3>
              <p className="text-gray-600">
                Custom sizing or special orders typically require 7-14 business days before shipping, depending on the complexity of the piece.
              </p>
            </div>
            
            <div className="border-l-4 border-gray-300 pl-6">
              <h3 className="font-medium text-gray-900 mb-2">Custom Designs</h3>
              <p className="text-gray-600">
                Fully custom jewelry pieces require 4-6 weeks for design approval, creation, and quality inspection before shipping.
              </p>
            </div>
          </div>
        </div>

        {/* Packaging */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Luxury Packaging</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Complimentary Gift Packaging</h3>
              <p className="text-gray-600 mb-4">
                Every bonjoojoo piece arrives in our signature packaging, designed to make your unboxing experience as special as the jewelry inside.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Elegant jewelry box with soft interior</li>
                <li>• Protective jewelry pouch</li>
                <li>• Certificate of authenticity</li>
                <li>• Care instructions</li>
                <li>• Gift message card (upon request)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-bj-cream to-[#EDE6DE] h-64 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-20 border-2 border-bj-rose-gold/40 rounded mx-auto mb-3 flex items-center justify-center">
                  <div className="w-8 h-px bg-bj-rose-gold/60" />
                </div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-bj-gray-400">Signature Box</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Questions About Shipping?</h2>
          <p className="text-gray-600 mb-6">
            Our customer service team is here to help with any shipping questions or special delivery requirements.
          </p>
          <div className="space-x-4">
            <a href="/contact" className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
              Contact Us
            </a>
            <a href="tel:1-800-BONJOOJOO" className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}