'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, Users, ShoppingCart, Eye, Clock, Leaf, Award } from 'lucide-react'

interface AnalyticsData {
  conversionMetrics: {
    overallConversionRate: number
    labGrownConversionRate: number
    traditionalConversionRate: number
    educationToCartRate: number
    mobileConversionRate: number
  }
  engagementMetrics: {
    educationPageViews: number
    avgTimeOnEducation: number
    comparisonToolUsage: number
    sustainabilityContentViews: number
    certificationClicks: number
  }
  businessMetrics: {
    labGrownRevenue: number
    labGrownOrderCount: number
    avgOrderValue: number
    returnCustomerRate: number
    customerLifetimeValue: number
  }
  trafficMetrics: {
    organicTraffic: number
    paidTraffic: number
    socialTraffic: number
    directTraffic: number
    mobileTraffic: number
  }
  trends: {
    period: string
    conversionTrend: number
    revenueTrend: number
    educationEngagementTrend: number
    sustainabilityInterestTrend: number
  }
}

// Mock data - in production this would come from your analytics API
const mockAnalyticsData: AnalyticsData = {
  conversionMetrics: {
    overallConversionRate: 4.2,
    labGrownConversionRate: 6.8,
    traditionalConversionRate: 2.1,
    educationToCartRate: 12.3,
    mobileConversionRate: 3.1
  },
  engagementMetrics: {
    educationPageViews: 15420,
    avgTimeOnEducation: 245,
    comparisonToolUsage: 8650,
    sustainabilityContentViews: 12300,
    certificationClicks: 5870
  },
  businessMetrics: {
    labGrownRevenue: 287500,
    labGrownOrderCount: 342,
    avgOrderValue: 840,
    returnCustomerRate: 28.5,
    customerLifetimeValue: 2150
  },
  trafficMetrics: {
    organicTraffic: 58.2,
    paidTraffic: 23.1,
    socialTraffic: 12.4,
    directTraffic: 6.3,
    mobileTraffic: 68.7
  },
  trends: {
    period: "vs. last month",
    conversionTrend: 15.2,
    revenueTrend: 23.7,
    educationEngagementTrend: 31.4,
    sustainabilityInterestTrend: 42.1
  }
}

export function LabGrownAnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockAnalyticsData)
      setIsLoading(false)
    }, 1000)
  }, [timeRange])

  if (isLoading) {
    return (
      <div className="p-8 bg-white rounded-2xl shadow-sm">
        <div className="animate-pulse">
          <div className="h-8 bg-stone-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-32 bg-stone-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  const MetricCard = ({ 
    title, 
    value, 
    trend, 
    icon: Icon, 
    format = 'number',
    color = 'green' 
  }: {
    title: string
    value: number
    trend?: number
    icon: any
    format?: 'number' | 'currency' | 'percentage' | 'time'
    color?: 'green' | 'blue' | 'purple' | 'orange'
  }) => {
    const formatValue = (val: number, fmt: string) => {
      switch (fmt) {
        case 'currency':
          return `$${val.toLocaleString()}`
        case 'percentage':
          return `${val.toFixed(1)}%`
        case 'time':
          return `${Math.floor(val / 60)}:${(val % 60).toString().padStart(2, '0')}`
        default:
          return val.toLocaleString()
      }
    }

    const colorClasses = {
      green: 'text-green-600 bg-green-50',
      blue: 'text-blue-600 bg-blue-50',
      purple: 'text-purple-600 bg-purple-50',
      orange: 'text-orange-600 bg-orange-50'
    }

    return (
      <div className="bg-white p-6 rounded-xl border border-stone-100 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
            <Icon size={20} />
          </div>
          {trend !== undefined && (
            <div className={`flex items-center text-sm ${
              trend >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span className="ml-1">{Math.abs(trend).toFixed(1)}%</span>
            </div>
          )}
        </div>
        <div className="text-2xl font-bold text-stone-900 mb-1">
          {formatValue(value, format)}
        </div>
        <div className="text-sm text-stone-600">{title}</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif text-stone-900 mb-2">
            Lab-Grown Diamond Analytics
          </h1>
          <p className="text-stone-600">
            Performance insights for your sustainable jewelry business
          </p>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Conversion Metrics */}
      <div>
        <h2 className="text-xl font-medium text-stone-900 mb-4 flex items-center">
          <ShoppingCart size={20} className="mr-2" />
          Conversion Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Overall Conversion Rate"
            value={data.conversionMetrics.overallConversionRate}
            trend={data.trends.conversionTrend}
            icon={TrendingUp}
            format="percentage"
          />
          <MetricCard
            title="Lab-Grown Conversion"
            value={data.conversionMetrics.labGrownConversionRate}
            trend={data.trends.conversionTrend * 1.2}
            icon={Leaf}
            format="percentage"
            color="green"
          />
          <MetricCard
            title="Education → Cart"
            value={data.conversionMetrics.educationToCartRate}
            trend={data.trends.educationEngagementTrend}
            icon={Award}
            format="percentage"
            color="blue"
          />
          <MetricCard
            title="Mobile Conversion"
            value={data.conversionMetrics.mobileConversionRate}
            trend={8.4}
            icon={Users}
            format="percentage"
            color="purple"
          />
          <MetricCard
            title="Avg Order Value"
            value={data.businessMetrics.avgOrderValue}
            trend={12.3}
            icon={TrendingUp}
            format="currency"
            color="orange"
          />
        </div>
      </div>

      {/* Education Engagement */}
      <div>
        <h2 className="text-xl font-medium text-stone-900 mb-4 flex items-center">
          <Eye size={20} className="mr-2" />
          Education & Engagement
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Education Page Views"
            value={data.engagementMetrics.educationPageViews}
            trend={data.trends.educationEngagementTrend}
            icon={Eye}
            color="blue"
          />
          <MetricCard
            title="Avg Time on Education"
            value={data.engagementMetrics.avgTimeOnEducation}
            trend={18.7}
            icon={Clock}
            format="time"
            color="purple"
          />
          <MetricCard
            title="Comparison Tool Usage"
            value={data.engagementMetrics.comparisonToolUsage}
            trend={25.3}
            icon={Award}
            color="green"
          />
          <MetricCard
            title="Sustainability Views"
            value={data.engagementMetrics.sustainabilityContentViews}
            trend={data.trends.sustainabilityInterestTrend}
            icon={Leaf}
            color="green"
          />
        </div>
      </div>

      {/* Revenue Metrics */}
      <div>
        <h2 className="text-xl font-medium text-stone-900 mb-4 flex items-center">
          <TrendingUp size={20} className="mr-2" />
          Business Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Lab-Grown Revenue"
            value={data.businessMetrics.labGrownRevenue}
            trend={data.trends.revenueTrend}
            icon={TrendingUp}
            format="currency"
          />
          <MetricCard
            title="Lab-Grown Orders"
            value={data.businessMetrics.labGrownOrderCount}
            trend={19.2}
            icon={ShoppingCart}
            color="blue"
          />
          <MetricCard
            title="Return Customer Rate"
            value={data.businessMetrics.returnCustomerRate}
            trend={14.8}
            icon={Users}
            format="percentage"
            color="purple"
          />
          <MetricCard
            title="Customer Lifetime Value"
            value={data.businessMetrics.customerLifetimeValue}
            trend={21.4}
            icon={Award}
            format="currency"
            color="orange"
          />
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="bg-white p-6 rounded-xl border border-stone-100">
        <h2 className="text-xl font-medium text-stone-900 mb-6 flex items-center">
          <Users size={20} className="mr-2" />
          Traffic Sources
        </h2>
        <div className="space-y-4">
          {[
            { name: 'Organic Search', value: data.trafficMetrics.organicTraffic, color: 'bg-green-500' },
            { name: 'Paid Advertising', value: data.trafficMetrics.paidTraffic, color: 'bg-blue-500' },
            { name: 'Social Media', value: data.trafficMetrics.socialTraffic, color: 'bg-purple-500' },
            { name: 'Direct Traffic', value: data.trafficMetrics.directTraffic, color: 'bg-orange-500' }
          ].map((source) => (
            <div key={source.name} className="flex items-center">
              <div className="w-24 text-sm text-stone-600">{source.name}</div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-stone-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${source.color}`}
                    style={{ width: `${source.value}%` }}
                  ></div>
                </div>
              </div>
              <div className="w-12 text-sm font-medium text-stone-900">
                {source.value.toFixed(1)}%
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="text-sm font-medium text-blue-900 mb-1">
            Mobile Traffic: {data.trafficMetrics.mobileTraffic.toFixed(1)}%
          </div>
          <div className="text-xs text-blue-700">
            Indicates strong mobile experience optimization
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
        <h2 className="text-xl font-medium text-stone-900 mb-4 flex items-center">
          <Award size={20} className="mr-2" />
          Key Insights & Recommendations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-medium text-green-900">🎯 Strong Performance</h3>
            <ul className="text-sm text-stone-700 space-y-1">
              <li>• Lab-grown conversion rate 3x higher than traditional</li>
              <li>• Education content driving 12.3% cart conversion</li>
              <li>• Sustainability content engagement up 42%</li>
              <li>• Mobile optimization showing results</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="font-medium text-blue-900">🚀 Optimization Opportunities</h3>
            <ul className="text-sm text-stone-700 space-y-1">
              <li>• Expand mobile-first education content</li>
              <li>• Increase certification trust signals</li>
              <li>• Develop more comparison tools</li>
              <li>• A/B test sustainability messaging</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Export & Actions */}
      <div className="flex items-center justify-between p-4 bg-stone-50 rounded-lg">
        <div className="text-sm text-stone-600">
          Last updated: {new Date().toLocaleString()}
        </div>
        <div className="space-x-3">
          <button className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-stone-900 text-white rounded-lg text-sm font-medium hover:bg-stone-800 transition-colors">
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  )
}

// Usage in your admin dashboard:
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-stone-50 p-8">
      <LabGrownAnalyticsDashboard />
    </div>
  )
}