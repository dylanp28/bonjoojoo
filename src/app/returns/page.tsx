import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Returns & Exchanges - Bonjoojoo',
  description: 'Learn about bonjoojoo return and exchange policy. 30-day returns, lifetime warranty, and satisfaction guarantee.',
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Returns & Exchanges</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Your satisfaction is guaranteed. Learn about our flexible return policy and lifetime warranty.
          </p>
          <Link
            href="/returns/start"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium text-lg"
          >
            Start a Return
          </Link>
        </div>

        {/* Policy Overview */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">30-Day Returns</h3>
              <p className="text-sm text-gray-600">
                Return any item within 30 days for a full refund or exchange.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Lifetime Warranty</h3>
              <p className="text-sm text-gray-600">
                Manufacturing defects covered for the lifetime of your jewelry.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Free Returns</h3>
              <p className="text-sm text-gray-600">
                No cost returns with our prepaid shipping labels.
              </p>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">How to Return</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Contact Our Team</h3>
                <p className="text-gray-600">
                  Email us at returns@bonjoojoo.com or call 1-800-BONJOOJOO to initiate your return. 
                  We'll provide you with a return authorization number and prepaid shipping label.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Package Your Item</h3>
                <p className="text-gray-600">
                  Securely package your jewelry in its original box with all included materials 
                  (certificate, warranty card, etc.). Include the return form we'll provide.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Ship It Back</h3>
                <p className="text-gray-600">
                  Attach the prepaid return label and drop off at any FedEx location. 
                  Your item will be fully insured during transit back to us.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                4
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Receive Your Refund</h3>
                <p className="text-gray-600">
                  Once we receive and inspect your return, we'll process your refund within 3-5 business days 
                  to your original payment method.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Return Conditions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Eligible for Return</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Items in original condition</li>
                <li>• Returned within 30 days</li>
                <li>• Includes all original packaging</li>
                <li>• Certificate and warranty card included</li>
                <li>• No signs of wear or damage</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Not Eligible for Return</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Earrings (hygiene reasons)</li>
                <li>• Custom or engraved items</li>
                <li>• Items damaged by customer</li>
                <li>• Jewelry showing signs of wear</li>
                <li>• Rings resized after delivery</li>
                <li>• Returns after 30-day window</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Exchanges */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Exchanges</h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Size Exchanges</h3>
                <p className="text-gray-600 mb-4">
                  Need a different ring size? We offer one free size exchange within 30 days of purchase.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Free shipping both ways</li>
                  <li>• Usually ships within 3-5 business days</li>
                  <li>• Professional resizing by our jewelers</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Style Exchanges</h3>
                <p className="text-gray-600 mb-4">
                  Want to exchange for a different style? We'll apply your original purchase toward a new piece.
                </p>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Credit applied to new purchase</li>
                  <li>• Pay only the difference if upgrading</li>
                  <li>• Receive refund if exchanging for lower-priced item</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Lifetime Warranty */}
        <div className="mb-16">
          <h2 className="text-2xl font-light text-gray-900 mb-8">Lifetime Warranty</h2>
          <div className="border border-gray-200 rounded-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-gray-900 mb-4">What's Covered</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Manufacturing defects</li>
                  <li>• Stone setting issues</li>
                  <li>• Structural problems with metalwork</li>
                  <li>• Prong damage or loosening</li>
                  <li>• Clasp or closure malfunctions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-4">What's Not Covered</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Normal wear and tear</li>
                  <li>• Accidental damage or loss</li>
                  <li>• Damage from improper care</li>
                  <li>• Scratches or surface wear</li>
                  <li>• Damage from third-party repairs</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                To use your lifetime warranty, simply contact our customer service team with photos of the issue. 
                We'll provide repair instructions or replacement if necessary.
              </p>
            </div>
          </div>
        </div>

        {/* Contact for Returns */}
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Ready to Start Your Return?</h2>
          <p className="text-gray-600 mb-6">
            Use our self-service portal to start a return or exchange in minutes — no phone calls needed.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/returns/start" className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
              Start a Return
            </Link>
            <a href="mailto:returns@bonjoojoo.com" className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium">
              Email Returns Team
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}