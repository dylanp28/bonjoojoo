'use client'

import { useEffect, useState } from 'react'
import { MapPin, Plus, Edit2, Trash2, Check, X } from 'lucide-react'

interface Address {
  id: string
  label: string
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

const STORAGE_KEY = 'bonjoojoo-addresses'

function emptyForm(): Omit<Address, 'id' | 'isDefault'> {
  return { label: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '', country: 'US' }
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY','DC',
]

export default function ShippingPage() {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm())
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setAddresses(saved)
    } catch {}
  }, [])

  const save = (updated: Address[]) => {
    setAddresses(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const validate = () => {
    const e: Partial<typeof form> = {}
    const required = ['firstName', 'lastName', 'address', 'city', 'state', 'zip'] as const
    required.forEach(f => { if (!form[f].trim()) e[f] = 'Required' })
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    if (editingId) {
      save(addresses.map(a => a.id === editingId ? { ...a, ...form } : a))
    } else {
      const newAddr: Address = {
        ...form,
        id: Date.now().toString(),
        isDefault: addresses.length === 0,
      }
      save([...addresses, newAddr])
    }
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm())
    setErrors({})
  }

  const handleEdit = (addr: Address) => {
    setForm({ label: addr.label, firstName: addr.firstName, lastName: addr.lastName, address: addr.address, city: addr.city, state: addr.state, zip: addr.zip, country: addr.country })
    setEditingId(addr.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    const updated = addresses.filter(a => a.id !== id)
    // If we deleted the default, make first remaining the default
    if (updated.length > 0 && !updated.find(a => a.isDefault)) {
      updated[0].isDefault = true
    }
    save(updated)
  }

  const handleSetDefault = (id: string) => {
    save(addresses.map(a => ({ ...a, isDefault: a.id === id })))
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setForm(emptyForm())
    setErrors({})
  }

  const field = (key: keyof typeof form, label: string, placeholder: string, optional = false) => (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">
        {label}{optional && <span className="text-stone-400 font-normal ml-1">(optional)</span>}
      </label>
      <input
        type="text"
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-colors ${errors[key] ? 'border-red-400 bg-red-50' : 'border-stone-300'}`}
      />
      {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-medium text-stone-900 mb-1">Shipping Addresses</h1>
          <p className="text-stone-600 text-sm">Manage your saved addresses for faster checkout.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm()) }}
            className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors"
          >
            <Plus size={15} />
            Add Address
          </button>
        )}
      </div>

      {/* Address Form */}
      {showForm && (
        <div className="border border-stone-200 rounded-lg p-6 mb-6 bg-stone-50">
          <h2 className="font-medium text-stone-900 mb-4">{editingId ? 'Edit Address' : 'New Address'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {field('label', 'Address Label', 'e.g. Home, Work', true)}
            <div className="grid grid-cols-2 gap-4">
              {field('firstName', 'First Name', 'Jane')}
              {field('lastName', 'Last Name', 'Smith')}
            </div>
            {field('address', 'Street Address', '123 Main St')}
            <div className="grid grid-cols-3 gap-4">
              {field('city', 'City', 'New York')}
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">State</label>
                <select
                  value={form.state}
                  onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
                  className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 transition-colors bg-white ${errors.state ? 'border-red-400' : 'border-stone-300'}`}
                >
                  <option value="">State</option>
                  {US_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
              {field('zip', 'ZIP', '10001')}
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Country</label>
              <select
                value={form.country}
                onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                className="w-full px-3 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="GB">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={handleCancel} className="flex items-center gap-1.5 px-4 py-2 text-sm text-stone-600 hover:text-stone-900 transition-colors">
                <X size={14} /> Cancel
              </button>
              <button type="submit" className="flex items-center gap-1.5 px-5 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors">
                <Check size={14} /> {editingId ? 'Save Changes' : 'Add Address'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map(addr => (
            <div key={addr.id} className={`border rounded-lg p-5 ${addr.isDefault ? 'border-stone-900 bg-stone-50' : 'border-stone-200'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-stone-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {addr.label && <span className="text-sm font-medium text-stone-900">{addr.label}</span>}
                      {addr.isDefault && (
                        <span className="text-xs bg-stone-900 text-white px-2 py-0.5 rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-stone-900 text-sm">{addr.firstName} {addr.lastName}</p>
                    <p className="text-stone-600 text-sm">{addr.address}</p>
                    <p className="text-stone-600 text-sm">{addr.city}, {addr.state} {addr.zip}</p>
                    <p className="text-stone-600 text-sm">{addr.country}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!addr.isDefault && (
                    <button
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-xs text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-400 px-2 py-1 rounded transition-colors"
                    >
                      Set default
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(addr)}
                    className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-stone-700 transition-colors"
                    aria-label="Edit address"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-red-500 transition-colors"
                    aria-label="Delete address"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : !showForm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-900 mb-2">No addresses saved</h3>
          <p className="text-stone-600 mb-4">Add an address to speed up your checkout.</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 bg-stone-900 text-white rounded-md hover:bg-stone-800 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Shipping Address
          </button>
        </div>
      )}
    </div>
  )
}
