import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Bonjoojoo',
  description: 'Get in touch with our jewelry experts. We\'re here to help with questions about lab-grown diamonds, sizing, custom pieces, and more.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our jewelry experts are here to help you find the perfect piece or answer any questions about our lab-grown diamonds.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-light text-gray-900 mb-6">Send us a message</h2>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="general">General Inquiry</option>
                  <option value="product">Product Question</option>
                  <option value="order">Order Support</option>
                  <option value="sizing">Sizing Help</option>
                  <option value="custom">Custom Piece</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-light text-gray-900 mb-4">Get in touch</h3>
              <div className="space-y-4">
                <div>
                  <dt className="font-medium text-gray-900">Email</dt>
                  <dd className="text-gray-600">hello@bonjoojoo.com</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Phone</dt>
                  <dd className="text-gray-600">1-800-BONJOOJOO</dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Business Hours</dt>
                  <dd className="text-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                    Saturday: 10:00 AM - 4:00 PM PST<br />
                    Sunday: Closed
                  </dd>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-light text-gray-900 mb-4">Showroom</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  123 Jewelry District<br />
                  Los Angeles, CA 90014
                </p>
                <p className="text-sm text-gray-500">By appointment only</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-light text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <div><a href="/shipping" className="text-gray-600 hover:text-gray-900">Shipping Information</a></div>
                <div><a href="/returns" className="text-gray-600 hover:text-gray-900">Returns & Exchanges</a></div>
                <div><a href="/faq" className="text-gray-600 hover:text-gray-900">FAQ</a></div>
                <div><a href="/education" className="text-gray-600 hover:text-gray-900">Diamond Education</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}