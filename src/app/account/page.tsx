'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { ShoppingBag, Package, Heart, Award, Calendar, MapPin } from 'lucide-react'

interface Order {
  orderId: string
  createdAt: string
  status: string
  total: number
  items: any[]
  estimatedDelivery?: string
}

export default function AccountDashboard() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentOrders()
  }, [])

  const fetchRecentOrders = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders.slice(0, 3)) // Show only 3 most recent
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'shipped':
        return 'bg-purple-100 text-purple-800'
      case 'delivered':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  return (
    <div className="p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">
          Welcome back, {user?.firstName}
        </h1>
        <p className="text-stone-600">
          Manage your bonjoojoo account and view your sustainable jewelry collection.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-600 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-green-600 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-green-800">{orders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-blue-600 font-medium">Sustainability Points</p>
              <p className="text-2xl font-bold text-blue-800">
                {orders.length * 100}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-purple-600 font-medium">Wishlist Items</p>
              <p className="text-2xl font-bold text-purple-800">0</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-serif font-medium text-stone-900">Recent Orders</h2>
          <a 
            href="/account/orders"
            className="text-green-600 hover:text-green-700 font-medium text-sm"
          >
            View All Orders →
          </a>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-stone-900 mx-auto mb-4"></div>
            <p className="text-stone-600">Loading your orders...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.orderId} className="border border-stone-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-stone-900">{order.orderId}</h3>
                    <p className="text-sm text-stone-600">
                      Ordered on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-lg font-bold text-stone-900 mt-1">
                      ${order.total.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-stone-600">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-1" />
                    <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                  </div>
                  
                  {order.estimatedDelivery && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Est. delivery: {formatDate(order.estimatedDelivery)}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-stone-400" />
            </div>
            <h3 className="text-lg font-medium text-stone-900 mb-2">No orders yet</h3>
            <p className="text-stone-600 mb-4">
              Start building your sustainable jewelry collection today.
            </p>
            <a 
              href="/#featured-collections"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Shop Lab-Grown Diamonds
            </a>
          </div>
        )}
      </div>

      {/* Environmental Impact */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-medium text-green-900 mb-4">Your Environmental Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-800">
              {(orders.length * 2.5).toFixed(1)}kg
            </div>
            <div className="text-sm text-green-600">Carbon Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-800">
              {(orders.length * 890).toLocaleString()}L
            </div>
            <div className="text-sm text-green-600">Water Conserved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-800">
              {orders.length * 100}%
            </div>
            <div className="text-sm text-green-600">Ethical Sourcing</div>
          </div>
        </div>
        <p className="text-sm text-green-700 mt-4">
          Thank you for choosing lab-grown diamonds and supporting sustainable luxury.
        </p>
      </div>
    </div>
  )
}