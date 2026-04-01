'use client'

export default function FAQClient() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-light tracking-wide text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-12">Everything you need to know about Bonjoojoo lab-grown diamond jewelry.</p>
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Lab-Grown Diamonds</h2>
            <div className="space-y-4">
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-medium cursor-pointer">What are lab-grown diamonds?</summary>
                <p className="mt-2 text-gray-600">Lab-grown diamonds are real diamonds created in controlled laboratory conditions using advanced technology that replicates the natural diamond formation process. They have the same chemical, physical, and optical properties as mined diamonds.</p>
              </details>
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-medium cursor-pointer">Are lab-grown diamonds real diamonds?</summary>
                <p className="mt-2 text-gray-600">Yes, lab-grown diamonds are chemically and physically identical to mined diamonds. They&apos;re composed of pure carbon arranged in a diamond crystal structure and exhibit the same brilliance, fire, and scintillation.</p>
              </details>
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-medium cursor-pointer">Why choose lab-grown diamonds?</summary>
                <p className="mt-2 text-gray-600">Lab-grown diamonds offer exceptional value, ethical sourcing, and 95% less environmental impact than mined diamonds. You get the same beauty and durability at a more accessible price point while supporting sustainable practices.</p>
              </details>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Shipping & Returns</h2>
            <div className="space-y-4">
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-medium cursor-pointer">How long does shipping take?</summary>
                <p className="mt-2 text-gray-600">Standard shipping takes 5–7 business days. Express shipping (2–3 business days) is available at checkout. All orders include free standard shipping.</p>
              </details>
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-medium cursor-pointer">What is your return policy?</summary>
                <p className="mt-2 text-gray-600">We offer 30-day hassle-free returns on all items in their original condition. Custom and engraved pieces are final sale. Contact us to initiate a return.</p>
              </details>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-medium text-gray-900 mb-4">Care & Maintenance</h2>
            <div className="space-y-4">
              <details className="border border-gray-200 rounded-lg p-4">
                <summary className="font-medium cursor-pointer">How do I care for my jewelry?</summary>
                <p className="mt-2 text-gray-600">Clean your jewelry with warm water, mild soap, and a soft brush. Store in a separate pouch or box to avoid scratching. Avoid exposing to harsh chemicals, chlorine, or extreme heat.</p>
              </details>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
