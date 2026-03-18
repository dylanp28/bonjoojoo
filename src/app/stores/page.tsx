import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Store Locations - Bonjoojoo',
  description: 'Visit our Los Angeles showroom or explore our authorized retailers. Experience bonjoojoo lab-grown diamond jewelry in person.',
}

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-light text-gray-900 mb-6">Visit Us</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the brilliance of lab-grown diamonds in person at our Los Angeles showroom.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Showroom */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">Los Angeles Showroom</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">
                    123 Jewelry District<br />
                    Los Angeles, CA 90014<br />
                    United States
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>10:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>12:00 PM - 5:00 PM</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Contact</h3>
                  <p className="text-gray-600">
                    Phone: (213) 555-0123<br />
                    Email: showroom@bonjoojoo.com
                  </p>
                </div>
                
                <div className="pt-4">
                  <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Showroom Image</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-20">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Showroom Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Diamond Viewing</h3>
              <p className="text-gray-600">
                See and compare our lab-grown diamonds in person with professional lighting and magnification tools.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2M9 3h6a2 2 0 012 2v12a4 4 0 01-2 2h-6" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Ring Sizing</h3>
              <p className="text-gray-600">
                Professional ring sizing and fitting to ensure your perfect fit with our expert jewelers.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-4">Custom Design</h3>
              <p className="text-gray-600">
                Work with our designers to create bespoke pieces tailored to your vision and preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Appointment Info */}
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">Book Your Private Appointment</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Enjoy personalized service in our elegant showroom. Our jewelry experts will guide you through our collection 
            and help you find the perfect piece or create something uniquely yours.
          </p>
          <div className="space-x-4">
            <button className="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
              Schedule Visit
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium">
              Virtual Consultation
            </button>
          </div>
        </div>

        {/* Online Alternative */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-light text-gray-900 mb-4">Can't Visit In Person?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Explore our full collection online with detailed photography, 360° views, and comprehensive diamond specifications.
          </p>
          <a href="/" className="inline-block border border-gray-300 text-gray-700 px-8 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium">
            Shop Online Collection
          </a>
        </div>
      </div>
    </div>
  )
}