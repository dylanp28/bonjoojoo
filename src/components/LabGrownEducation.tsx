'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, CheckCircle, Award, Leaf, DollarSign, Atom, Diamond, Shield } from 'lucide-react'
import { labGrownEducationData } from '@/data/labGrownEducation'

export function LabGrownEducation() {
  const [activeTab, setActiveTab] = useState<'overview' | 'process' | 'comparison' | 'certification' | 'sustainability' | 'faq'>('overview')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Diamond },
    { id: 'process', label: 'Creation Process', icon: Atom },
    { id: 'comparison', label: 'Comparison', icon: CheckCircle },
    { id: 'certification', label: 'Certification', icon: Shield },
    { id: 'sustainability', label: 'Sustainability', icon: Leaf },
    { id: 'faq', label: 'FAQ', icon: Award }
  ]

  const getIcon = (iconName: string) => {
    const icons = {
      atom: Atom,
      diamond: Diamond,
      certificate: Shield,
      leaf: Leaf
    }
    const IconComponent = icons[iconName as keyof typeof icons] || Diamond
    return <IconComponent size={24} className="text-green-600" />
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-fluid max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-medium tracking-wider uppercase mb-4">
            Lab-Grown Diamond Education
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif text-stone-900 mb-6">
            {labGrownEducationData.hero.title}
          </h2>
          <p className="text-xl text-stone-600 mb-8 max-w-3xl mx-auto">
            {labGrownEducationData.hero.description}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {labGrownEducationData.hero.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-2 text-stone-700">
                <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-stone-200 mb-12">
          <nav className="flex space-x-0 overflow-x-auto">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium tracking-wider uppercase border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px]">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-serif text-stone-900 mb-6">
                  {labGrownEducationData.whatAreLabGrown.title}
                </h3>
                <p className="text-lg text-stone-600 mb-12 max-w-4xl mx-auto">
                  {labGrownEducationData.whatAreLabGrown.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {labGrownEducationData.whatAreLabGrown.keyPoints.map((point, index) => (
                  <div key={index} className="bg-stone-50 p-8 rounded-2xl">
                    <div className="flex items-center mb-4">
                      {getIcon(point.icon)}
                      <h4 className="text-xl font-medium text-stone-900 ml-3">
                        {point.title}
                      </h4>
                    </div>
                    <p className="text-stone-600 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Myth Busting Section */}
              <div className="bg-green-50 p-8 rounded-2xl">
                <h4 className="text-2xl font-serif text-stone-900 mb-6 text-center">
                  Common Myths Debunked
                </h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {labGrownEducationData.myths.mythsDebunked.slice(0, 4).map((myth, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl">
                      <h5 className="font-medium text-red-600 mb-3 text-sm">
                        MYTH: {myth.myth}
                      </h5>
                      <p className="text-stone-700 text-sm leading-relaxed mb-2">
                        <strong className="text-green-600">TRUTH:</strong> {myth.truth}
                      </p>
                      <p className="text-xs text-stone-500">
                        Source: {myth.source}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Creation Process Tab */}
          {activeTab === 'process' && (
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-serif text-stone-900 mb-6">
                  {labGrownEducationData.creationProcess.title}
                </h3>
                <p className="text-lg text-stone-600 mb-12 max-w-3xl mx-auto">
                  Two advanced technological processes create diamonds identical to those formed naturally over billions of years.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {labGrownEducationData.creationProcess.methods.map((method, index) => (
                  <div key={index} className="bg-stone-50 p-8 rounded-2xl">
                    <div className="text-center mb-8">
                      <h4 className="text-2xl font-serif text-stone-900 mb-2">
                        {method.name}
                      </h4>
                      <p className="text-stone-600 text-sm uppercase tracking-wider mb-4">
                        {method.fullName}
                      </p>
                      <p className="text-stone-700 leading-relaxed">
                        {method.description}
                      </p>
                    </div>

                    <div className="mb-8">
                      <h5 className="font-medium text-stone-900 mb-4">Process Steps:</h5>
                      <ol className="space-y-3">
                        {method.process.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-start">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center mr-3 mt-0.5">
                              {stepIndex + 1}
                            </span>
                            <span className="text-stone-700 text-sm">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h5 className="font-medium text-stone-900 mb-3">Key Advantages:</h5>
                      <ul className="space-y-2">
                        {method.advantages.map((advantage, advIndex) => (
                          <li key={advIndex} className="flex items-center">
                            <CheckCircle size={14} className="text-green-600 mr-2" />
                            <span className="text-stone-700 text-sm">{advantage}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-serif text-stone-900 mb-6">
                  {labGrownEducationData.comparison.title}
                </h3>
                <p className="text-lg text-stone-600 mb-12 max-w-3xl mx-auto">
                  Side-by-side comparison showing why lab-grown diamonds offer superior value and ethics without compromising quality.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-4 text-stone-900 font-medium">Category</th>
                      <th className="text-left py-4 text-green-600 font-medium">Lab-Grown Diamonds</th>
                      <th className="text-left py-4 text-stone-600 font-medium">Mined Diamonds</th>
                      <th className="text-center py-4 text-stone-900 font-medium">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labGrownEducationData.comparison.categories.map((category, index) => (
                      <tr key={index} className="border-b border-stone-100">
                        <td className="py-4 font-medium text-stone-900">{category.category}</td>
                        <td className="py-4 text-stone-700">{category.labGrown}</td>
                        <td className="py-4 text-stone-600">{category.mined}</td>
                        <td className="py-4 text-center">
                          {category.advantage === 'labGrown' ? (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle size={12} className="mr-1" />
                              Lab-Grown
                            </span>
                          ) : category.advantage === 'tie' ? (
                            <span className="text-stone-500 text-xs">Equal</span>
                          ) : (
                            <span className="text-stone-400 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Certification Tab */}
          {activeTab === 'certification' && (
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-serif text-stone-900 mb-6">
                  {labGrownEducationData.certification.title}
                </h3>
                <p className="text-lg text-stone-600 mb-12 max-w-3xl mx-auto">
                  {labGrownEducationData.certification.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {labGrownEducationData.certification.institutes.map((institute, index) => (
                  <div key={index} className="bg-stone-50 p-8 rounded-2xl text-center">
                    <div className="w-16 h-16 bg-stone-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <Shield size={24} className="text-stone-600" />
                    </div>
                    <h4 className="text-xl font-serif text-stone-900 mb-4">
                      {institute.name}
                    </h4>
                    <p className="text-stone-600 mb-4 leading-relaxed">
                      {institute.description}
                    </p>
                    <p className="text-sm font-medium text-green-600">
                      {institute.credentials}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 p-8 rounded-2xl">
                <h4 className="text-2xl font-serif text-stone-900 mb-6 text-center">
                  Every Certificate Includes
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {labGrownEducationData.certification.certificationIncludes.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle size={16} className="text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-stone-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sustainability Tab */}
          {activeTab === 'sustainability' && (
            <div className="space-y-12">
              <div className="text-center">
                <h3 className="text-3xl font-serif text-stone-900 mb-6">
                  {labGrownEducationData.sustainability.title}
                </h3>
                <p className="text-lg text-stone-600 mb-12 max-w-3xl mx-auto">
                  {labGrownEducationData.sustainability.description}
                </p>
              </div>

              {/* Environmental Impact Stats */}
              <div className="mb-12">
                <h4 className="text-2xl font-serif text-stone-900 mb-8 text-center">
                  {labGrownEducationData.sustainability.environmentalImpact.title}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {labGrownEducationData.sustainability.environmentalImpact.stats.map((stat, index) => (
                    <div key={index} className="bg-green-50 p-6 rounded-xl">
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="font-medium text-stone-900">{stat.metric}</h5>
                        <span className="text-sm font-bold text-green-600">{stat.improvement}</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-green-700">Lab-Grown:</span>
                          <span className="text-sm font-medium">{stat.labGrown}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-stone-600">Mined:</span>
                          <span className="text-sm">{stat.mined}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ethical Benefits */}
              <div className="bg-stone-50 p-8 rounded-2xl">
                <h4 className="text-2xl font-serif text-stone-900 mb-6 text-center">
                  {labGrownEducationData.sustainability.socialImpact.title}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {labGrownEducationData.sustainability.socialImpact.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle size={16} className="text-green-600 mr-3 flex-shrink-0" />
                      <span className="text-stone-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* FAQ Tab */}
          {activeTab === 'faq' && (
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl font-serif text-stone-900 mb-6">
                  {labGrownEducationData.faq.title}
                </h3>
                <p className="text-lg text-stone-600 mb-12 max-w-3xl mx-auto">
                  Everything you need to know about lab-grown diamonds answered by our experts.
                </p>
              </div>

              <div className="space-y-4">
                {labGrownEducationData.faq.questions.map((faq, index) => (
                  <div key={index} className="border border-stone-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-stone-50 transition-colors"
                    >
                      <span className="font-medium text-stone-900">{faq.question}</span>
                      {openFaq === index ? (
                        <ChevronUp size={20} className="text-stone-600" />
                      ) : (
                        <ChevronDown size={20} className="text-stone-600" />
                      )}
                    </button>
                    {openFaq === index && (
                      <div className="px-8 pb-6">
                        <p className="text-stone-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-stone-900 text-white p-12 rounded-2xl">
          <h3 className="text-3xl font-serif mb-6">
            Ready to Choose Conscious Luxury?
          </h3>
          <p className="text-stone-300 mb-8 max-w-2xl mx-auto">
            Explore our curated collection of lab-grown diamond jewelry and discover the perfect piece that aligns with your values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-stone-900 font-medium hover:bg-stone-100 transition-colors rounded">
              Shop Lab-Grown Collection
            </button>
            <button className="px-8 py-4 border border-white text-white hover:bg-white hover:text-stone-900 transition-colors rounded">
              Schedule Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}