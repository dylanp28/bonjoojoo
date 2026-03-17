'use client'

import { useState } from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'
import { categories } from '@/data/products'

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  category: string
  subcategory: string
  priceRange: [number, number]
  materials: string[]
  inStock: boolean
  sortBy: string
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    subcategory: '',
    priceRange: [0, 10000],
    materials: [],
    inStock: false,
    sortBy: 'featured'
  })

  const materials = [
    '18k Gold',
    '14k Gold',
    'Platinum',
    'Diamond',
    'Pearl',
    'Sapphire',
    'Ruby',
    'Emerald'
  ]

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest' }
  ]

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const toggleMaterial = (material: string) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter(m => m !== material)
      : [...filters.materials, material]
    updateFilter('materials', newMaterials)
  }

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      category: '',
      subcategory: '',
      priceRange: [0, 10000],
      materials: [],
      inStock: false,
      sortBy: 'featured'
    }
    setFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = filters.category || filters.materials.length > 0 || filters.inStock || filters.priceRange[0] > 0 || filters.priceRange[1] < 10000

  return (
    <div className="relative">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-white border border-neutral-300 px-4 py-2 rounded-lg hover:bg-neutral-50"
        >
          <Filter size={18} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-primary-600 rounded-full" />
          )}
          <ChevronDown 
            size={16} 
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Filters Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block bg-white rounded-lg border border-neutral-200 p-6`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg">Filters</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear All
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1 hover:bg-neutral-100 rounded"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => updateFilter('sortBy', e.target.value)}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Category
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.category === ''}
                  onChange={(e) => {
                    updateFilter('category', e.target.value)
                    updateFilter('subcategory', '')
                  }}
                  className="mr-3"
                />
                All Categories
              </label>
              {categories.map((category) => (
                <label key={category.id} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={filters.category === category.id}
                    onChange={(e) => {
                      updateFilter('category', e.target.value)
                      updateFilter('subcategory', '')
                    }}
                    className="mr-3"
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory */}
          {filters.category && (
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-3">
                Subcategory
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="subcategory"
                    value=""
                    checked={filters.subcategory === ''}
                    onChange={(e) => updateFilter('subcategory', e.target.value)}
                    className="mr-3"
                  />
                  All
                </label>
                {categories
                  .find(cat => cat.id === filters.category)
                  ?.subcategories.map((sub) => (
                    <label key={sub} className="flex items-center">
                      <input
                        type="radio"
                        name="subcategory"
                        value={sub}
                        checked={filters.subcategory === sub}
                        onChange={(e) => updateFilter('subcategory', e.target.value)}
                        className="mr-3"
                      />
                      {sub.charAt(0).toUpperCase() + sub.slice(1)}
                    </label>
                  ))}
              </div>
            </div>
          )}

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Price Range
            </label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => updateFilter('priceRange', [parseInt(e.target.value) || 0, filters.priceRange[1]])}
                  className="flex-1 border border-neutral-300 rounded px-3 py-2 text-sm"
                />
                <span className="text-neutral-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilter('priceRange', [filters.priceRange[0], parseInt(e.target.value) || 10000])}
                  className="flex-1 border border-neutral-300 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Materials */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Materials
            </label>
            <div className="space-y-2">
              {materials.map((material) => (
                <label key={material} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(material)}
                    onChange={() => toggleMaterial(material)}
                    className="mr-3"
                  />
                  {material}
                </label>
              ))}
            </div>
          </div>

          {/* In Stock */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => updateFilter('inStock', e.target.checked)}
                className="mr-3"
              />
              <span className="text-sm font-medium text-neutral-700">
                In Stock Only
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}