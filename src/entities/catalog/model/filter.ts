import type { Product } from './products'

export interface Filters {
  priceFrom: string
  priceTo: string
  brands: string[]
  countries: string[]
  colors: string[]
  delivery: 'any' | 'pickup' | 'courier'
}

export const EMPTY_FILTERS: Filters = {
  priceFrom: '',
  priceTo: '',
  brands: [],
  countries: [],
  colors: [],
  delivery: 'any',
}

export const SORTS = ['Сначала новые', 'По популярности', 'По возрастанию цены', 'По убыванию цены', 'От А до Я', 'От Я до А']

export function filterProducts(list: Product[], filters: Filters): Product[] {
  const from = Number(filters.priceFrom) || 0
  const to = Number(filters.priceTo) || Infinity

  return list.filter((product) => {
    if (product.price < from || product.price > to) return false
    if (filters.brands.length && !filters.brands.includes(product.brandSlug)) return false
    if (filters.countries.length && !filters.countries.includes(product.country)) return false
    if (filters.colors.length && !filters.colors.includes(product.color)) return false
    if (filters.delivery === 'pickup' && !product.pickup) return false
    if (filters.delivery === 'courier' && !product.courier) return false
    return true
  })
}

export function sortProducts(list: Product[], sort: string): Product[] {
  const copy = [...list]

  switch (sort) {
    case 'По популярности':
      return copy.sort((a, b) => b.popularity - a.popularity)
    case 'По возрастанию цены':
      return copy.sort((a, b) => a.price - b.price)
    case 'По убыванию цены':
      return copy.sort((a, b) => b.price - a.price)
    case 'От А до Я':
      return copy.sort((a, b) => a.name.localeCompare(b.name, 'ru'))
    case 'От Я до А':
      return copy.sort((a, b) => b.name.localeCompare(a.name, 'ru'))
    default:
      // «Сначала новые»: новинки вперёд, остальные в прежнем порядке
      return copy.sort((a, b) => Number(b.badge === 'Новинка') - Number(a.badge === 'Новинка'))
  }
}
