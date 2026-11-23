import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '@/entities/catalog'
import { ProductCard } from '../product-card/product-card'
import { Arrows } from '@/shared/ui/arrows'
import './product-slider.css'

interface ProductSliderProps {
  title?: string
  products: Product[]
  perPage?: 2 | 3 | 4
  extra?: ReactNode
}

export function ProductSlider({ title, products, perPage = 4, extra }: ProductSliderProps) {
  const [page, setPage] = useState(0)
  const pages = Math.max(1, Math.ceil(products.length / perPage))
  const visible = products.slice(page * perPage, (page + 1) * perPage)

  return (
    <section className="product-slider">
      <div className="product-slider-head">
        {title && <h2 className="block-title">{title}</h2>}
        <div className="product-slider-tools">
          {extra}
          <Arrows
            canPrev={page > 0}
            canNext={page < pages - 1}
            onPrev={() => setPage(page - 1)}
            onNext={() => setPage(page + 1)}
          />
        </div>
      </div>
      <div className={'product-slider-grid product-slider-' + perPage}>
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
