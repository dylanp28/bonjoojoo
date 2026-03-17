'use client'

import { MapPin, Plus, Edit, Trash2 } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">Shipping Addresses</h1>
        <p className="text-stone-600">
          Manage your shipping addresses for faster checkout.
        </p>
      </div>

      <div className="text-center py-12">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-stone-400" />
        </div>
        <h3 className="text-lg font-medium text-stone-900 mb-2">No addresses saved</h3>
        <p className="text-stone-600 mb-4">
          Add your shipping address to make checkout faster and easier.
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Shipping Address
        </button>
      </div>
    </div>
  )
}