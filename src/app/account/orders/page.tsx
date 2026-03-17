'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { Package, Calendar, MapPin, Eye, Download, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface Order {
  orderId: string
  createdAt: string
  status: string
  total: number
  items: any[]
  estimatedDelivery?: string
  trackingNumber?: string
  shippingInfo: any
  environmentalImpact: {
    carbonSaved: string
    waterSaved: string
  }
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch('/api/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders)
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600" />
      case 'shipped':
        return <Truck className="w-5 h-5 text-purple-600" />
      case 'delivered':
        return <Package className="w-5 h-5 text-gray-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'delivered':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status.toLowerCase() === filterStatus
  )

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-medium text-stone-900 mb-2">My Orders</h1>
        <p className="text-stone-600">
          Track your bonjoojoo orders and view your sustainable jewelry purchases.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-stone-200 mb-6">
        <nav className="flex space-x-8">
          {[
            { id: 'all', label: 'All Orders', count: orders.length },
            { id: 'confirmed', label: 'Confirmed', count: orders.filter(o => o.status === 'confirmed').length },
            { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'processing').length },
            { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'shipped').length },
            { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'delivered').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                filterStatus === tab.id
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 bg-stone-100 text-stone-600 text-xs px-2 py-1 rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Orders List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
          <p className="text-stone-600">Loading your orders...</p>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order.orderId} className="border border-stone-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow">
              
              {/* Order Header */}
              <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="font-medium text-stone-900">{order.orderId}</h3>
                      <p className="text-sm text-stone-600">
                        Placed on {formatDateTime(order.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-lg font-bold text-stone-900">
                      ${order.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  
                  {/* Items */}
                  <div className="flex items-center">
                    <Package className="w-4 h-4 text-stone-400 mr-2" />
                    <span className="text-sm text-stone-600">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Delivery Date */}
                  {order.estimatedDelivery && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-stone-400 mr-2" />
                      <span className="text-sm text-stone-600">
                        Est. delivery: {formatDate(order.estimatedDelivery)}
                      </span>
                    </div>
                  )}

                  {/* Tracking */}
                  {order.trackingNumber && (
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 text-stone-400 mr-2" />
                      <span className="text-sm text-stone-600">
                        Track: {order.trackingNumber}
                      </span>
                    </div>
                  )}

                  {/* Shipping Address */}
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-stone-400 mr-2" />
                    <span className="text-sm text-stone-600">
                      {order.shippingInfo?.city}, {order.shippingInfo?.state}
                    </span>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="bg-green-50 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-green-900 mb-2 flex items-center">
                    🌱 Environmental Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-green-600 font-medium">{order.environmentalImpact.carbonSaved} CO₂ saved</span>
                    </div>
                    <div>
                      <span className="text-green-600 font-medium">{order.environmentalImpact.waterSaved} water conserved</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </button>
                  
                  <button className="flex items-center px-4 py-2 text-sm font-medium text-stone-700 bg-white border border-stone-300 rounded-md hover:bg-stone-50 transition-colors">
                    <Download className="w-4 h-4 mr-2" />
                    Download Invoice
                  </button>

                  {order.trackingNumber && (
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors">
                      <Truck className="w-4 h-4 mr-2" />
                      Track Package
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-lg font-medium text-stone-900 mb-2">
            {filterStatus === 'all' ? 'No orders yet' : `No ${filterStatus} orders`}
          </h3>
          <p className="text-stone-600 mb-4">
            {filterStatus === 'all' 
              ? 'Start building your sustainable jewelry collection today.'
              : `You don't have any ${filterStatus} orders at the moment.`
            }
          </p>
          <a 
            href="/#featured-collections"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Shop Lab-Grown Diamonds
          </a>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-stone-900 text-white p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif">Order Details</h3>
                  <p className="text-stone-300 text-sm">{selectedOrder.orderId}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-white hover:text-stone-300 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Order Items */}
              <div className="mb-6">
                <h4 className="font-medium text-stone-900 mb-4">Items Ordered</h4>
                <div className="space-y-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex space-x-4 p-4 border border-stone-200 rounded-lg">
                      <div className="w-16 h-16 bg-stone-100 rounded-lg"></div>
                      <div className="flex-1">
                        <h5 className="font-medium text-stone-900">{item.name}</h5>
                        <p className="text-sm text-stone-600">Quantity: {item.quantity}</p>
                        <p className="text-lg font-bold text-stone-900">${item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Info */}
              <div className="mb-6">
                <h4 className="font-medium text-stone-900 mb-4">Shipping Information</h4>
                <div className="bg-stone-50 p-4 rounded-lg">
                  <p className="text-stone-900 font-medium">
                    {selectedOrder.shippingInfo?.firstName} {selectedOrder.shippingInfo?.lastName}
                  </p>
                  <p className="text-stone-600">{selectedOrder.shippingInfo?.address}</p>
                  <p className="text-stone-600">
                    {selectedOrder.shippingInfo?.city}, {selectedOrder.shippingInfo?.state} {selectedOrder.shippingInfo?.zip}
                  </p>
                  <p className="text-stone-600">{selectedOrder.shippingInfo?.email}</p>
                  {selectedOrder.shippingInfo?.phone && (
                    <p className="text-stone-600">{selectedOrder.shippingInfo.phone}</p>
                  )}
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-900 mb-2 flex items-center">
                  🌱 Your Environmental Impact
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-800">{selectedOrder.environmentalImpact.carbonSaved}</div>
                    <div className="text-sm text-green-600">Carbon Saved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-800">{selectedOrder.environmentalImpact.waterSaved}</div>
                    <div className="text-sm text-green-600">Water Conserved</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}