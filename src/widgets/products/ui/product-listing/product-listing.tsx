import { useState } from 'react'
import { EMPTY_FILTERS, SORTS, filterProducts, sortProducts } from '@/entities/catalog'
import type { Filters, Product } from '@/entities/catalog'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { Pagination } from '@/shared/ui/pagination'
import { Select } from '@/shared/ui/select'
import { ProductCard } from '../product-card/product-card'
import { ListingSidebar } from './listing-sidebar'
import './product-listing.css'

const PER_PAGE = 12

interface ProductListingProps {
  products: Product[]
  activeCategory?: string
  hideBrands?: boolean
}

export function ProductListing({ products, activeCategory, hideBrands }: ProductListingProps) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS)
  const [sort, setSort] = useState(SORTS[0])
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(1)
  const [loaded, setLoaded] = useState(1)

  const list = sortProducts(filterProducts(products, filters), sort)
  const totalPages = Math.max(1, Math.ceil(list.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const start = (current - 1) * PER_PAGE
  const visible = list.slice(start, start + loaded * PER_PAGE)
  const hasMore = start + loaded * PER_PAGE < list.length

  function changeFilters(next: Filters) {
    setFilters(next)
    setPage(1)
    setLoaded(1)
  }

  function changePage(next: number) {
    setPage(next)
    setLoaded(1)
  }

  return (
    <div className="listing">
      <ListingSidebar
        filters={filters}
        onChange={changeFilters}
        onReset={() => changeFilters(EMPTY_FILTERS)}
        activeCategory={activeCategory}
        hideBrands={hideBrands}
      />

      <div className="listing-main">
        <div className="listing-toolbar">
          <div className="listing-sort">
            <Select label="Сортировать:" value={sort} options={SORTS} onChange={setSort} />
          </div>
          <span className="listing-count">Найдено: {list.length}</span>
          <div className="listing-view">
            <button
              className={view === 'grid' ? 'listing-view-button listing-view-active' : 'listing-view-button'}
              aria-label="Сеткой"
              aria-pressed={view === 'grid'}
              onClick={() => setView('grid')}
            >
              <Icon name="grid" size={16} />
            </button>
            <button
              className={view === 'list' ? 'listing-view-button listing-view-active' : 'listing-view-button'}
              aria-label="Списком"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
            >
              <Icon name="rows" size={16} />
            </button>
          </div>
        </div>

        {visible.length > 0 ? (
          <div className={view === 'grid' ? 'listing-grid' : 'listing-rows'}>
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} variant={view} />
            ))}
          </div>
        ) : (
          <p className="listing-empty">По выбранным параметрам ничего не найдено. Попробуйте сбросить фильтр.</p>
        )}

        {hasMore && (
          <div className="listing-more">
            <Button variant="gray" onClick={() => setLoaded(loaded + 1)}>
              <Icon name="refresh" size={14} />
              Показать ещё
            </Button>
          </div>
        )}

        <Pagination page={current} total={totalPages} onChange={changePage} />
      </div>
    </div>
  )
}
