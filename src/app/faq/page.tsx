import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Bonjoojoo',
  description: 'Frequently asked questions about bonjoojoo lab-grown diamond jewelry, sizing, care, shipping, and more.',
}

export default function FAQPage() {
  const faqs = [
    {
      category: "Lab-Grown Diamonds",
      questions: [
        {
          q: "What are lab-grown diamonds?",
          a: "Lab-grown diamonds are real diamonds created in controlled laboratory conditions using advanced technology that replicates the natural diamond formation process. They have the same chemical, physical, and optical properties as mined diamonds."
        },
        {
          q: "Are lab-grown diamonds real diamonds?",
          a: "Yes, lab-grown diamonds are chemically and physically identical to mined diamonds. They're composed of pure carbon arranged in a diamond crystal structure and exhibit the same brilliance, fire, and scintillation."
        },
        {
          q: "How can you tell the difference between lab-grown and mined diamonds?",
          a: "Lab-grown and mined diamonds are virtually indistinguishable without specialized equipment. All our lab-grown diamonds are certified by IGI or GIA and clearly marked as lab-grown on the certification."
        },
        {
          q: "Why choose lab-grown diamonds?",
          a: "Lab-grown diamonds offer exceptional value, ethical sourcing, and 95% less environmental impact than mined diamonds. You get the same beauty and durability at a more accessible price point while supporting sustainable practices."
        }
      ]
    },
    {
      category: "Ordering & Sizing",
      questions: [
        {
          q: "How do I determine my ring size?",
          a: "We recommend getting professionally sized at a jewelry store for accuracy. Alternatively, you can download our ring sizer guide or order a free ring sizer kit. Ring sizes can vary between fingers and throughout the day."
        },
        {
          q: "What if I order the wrong size?",
          a: "We offer one free resize within 30 days of purchase. Simply contact our customer service team, and we'll arrange for your ring to be professionally resized by our jewelers."
        },
        {
          q: "Can I see the jewelry before purchasing?",
          a: "Yes! Visit our Los Angeles showroom by appointment, or we can arrange virtual consultations where our experts will show you pieces via video call and answer any questions."
        },
        {
          q: "Do you accept custom orders?",
          a: "Absolutely! We love creating custom pieces. Contact us with your vision, and our design team will work with you to create a one-of-a-kind piece. Custom orders typically take 4-6 weeks."
        }
      ]
    },
    {
      category: "Shipping & Returns",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping takes 5-7 business days within the US and is free on orders over $500. Express (2-3 days) and overnight options are also available. International shipping takes 7-14 days standard or 3-5 days express."
        },
        {
          q: "Is shipping insured?",
          a: "Yes, all shipments are fully insured for the declared value and require adult signature upon delivery. We use FedEx for secure, trackable delivery of all jewelry orders."
        },
        {
          q: "What is your return policy?",
          a: "We offer 30-day returns for a full refund on items in original condition. Returns are free with our prepaid shipping labels. Custom or personalized items cannot be returned unless there's a defect."
        },
        {
          q: "How do I return an item?",
          a: "Contact our returns team at returns@bonjoojoo.com or call 1-800-BONJOOJOO. We'll provide a return authorization number and prepaid shipping label. Package securely and drop off at any FedEx location."
        }
      ]
    },
    {
      category: "Care & Maintenance",
      questions: [
        {
          q: "How do I clean my jewelry?",
          a: "Clean regularly with warm soapy water and a soft brush. For deeper cleaning, use ultrasonic cleaners (safe for diamonds) or bring to a professional jeweler. Avoid harsh chemicals and store in soft pouches when not wearing."
        },
        {
          q: "What is your warranty?",
          a: "We provide a lifetime warranty covering manufacturing defects, stone setting issues, and structural problems. Normal wear and accidental damage are not covered. Contact us with any warranty concerns."
        },
        {
          q: "How often should I have my jewelry inspected?",
          a: "We recommend annual professional inspections to check stone settings, prongs, and overall condition. This helps prevent stone loss and extends the life of your jewelry."
        },
        {
          q: "Can lab-grown diamonds chip or break?",
          a: "Like all diamonds, lab-grown diamonds are very durable (10 on the Mohs hardness scale) but can chip or break if subjected to sharp impacts. Proper care and occasional professional inspection help maintain your jewelry's condition."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          q: "Why are lab-grown diamonds less expensive?",
          a: "Lab-grown diamonds cost significantly less than mined diamonds because they don't require mining operations, extensive supply chains, or the rarity premium. This allows us to offer exceptional value while maintaining the same quality and beauty."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and offer Klarna for flexible payment options including 4 interest-free payments."
        },
        {
          q: "Do you offer financing?",
          a: "Yes, through Klarna you can split your purchase into 4 interest-free payments or choose longer-term financing options. Financing is subject to approval and varies by order amount."
        },
        {
          q: "Are there additional costs like taxes?",
          a: "Sales tax is calculated at checkout based on your shipping address. International orders may be subject to additional duties or taxes imposed by the destination country."
        }
      ]
    },
    {
      category: "Certifications & Quality",
      questions: [
        {
          q: "Are your diamonds certified?",
          a: "Yes, all our diamonds come with certificates from respected gemological institutes like IGI (International Gemological Institute) or GIA (Gemological Institute of America)."
        },
        {
          q: "What do the 4 Cs mean?",
          a: "The 4 Cs are Cut, Color, Clarity, and Carat weight - the universal standards for evaluating diamond quality. Each affects the diamond's appearance and value. Our product pages include detailed 4 Cs information for every diamond."
        },
        {
          q: "What metals do you use?",
          a: "We use premium materials including 14K and 18K gold (yellow, white, and rose), platinum, and sterling silver. All metals are responsibly sourced and meet the highest quality standards."
        },
        {
          q: "How do I verify my diamond's authenticity?",
          a: "Each diamond comes with a certificate that includes a unique identification number. You can verify this number on the certifying institute's website (IGI or GIA) to confirm authenticity and specifications."
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our lab-grown diamond jewelry, ordering process, and policies.
          </p>
        </div>

        {/* Search could go here */}
        <div className="mb-12">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border-b border-gray-200 pb-12 last:border-b-0 last:pb-0">
              <h2 className="text-2xl font-light text-gray-900 mb-8">{category.category}</h2>
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex} className="border border-gray-200 rounded-lg">
                    <details className="group">
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50">
                        <h3 className="font-medium text-gray-900 pr-4">{faq.q}</h3>
                        <svg
                          className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Our jewelry experts are here to help. Contact us for personalized assistance with any questions about our jewelry, diamonds, or services.
          </p>
          <div className="space-x-4">
            <a href="/contact" className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
              Contact Us
            </a>
            <a href="tel:1-800-BONJOOJOO" className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium">
              Call Now
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Need Sizing Help?</h3>
            <a href="/sizing-guide" className="text-gray-600 hover:text-gray-900 underline">
              Download Ring Sizer Guide
            </a>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Learn About Diamonds</h3>
            <a href="/education" className="text-gray-600 hover:text-gray-900 underline">
              Diamond Education Center
            </a>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Care Instructions</h3>
            <a href="/jewelry-care" className="text-gray-600 hover:text-gray-900 underline">
              Jewelry Care Guide
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}