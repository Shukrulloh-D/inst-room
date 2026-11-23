import { useState } from 'react'
import { Link } from 'react-router-dom'
import { findProduct } from '@/entities/catalog'
import type { Product } from '@/entities/catalog'
import { useCart } from '@/features/cart'
import { useCompare } from '@/features/compare'
import { productImage } from '@/shared/config/images'
import { formatPrice } from '@/shared/lib/format'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import { Icon } from '@/shared/ui/icon'
import './compare-page.css'

export function ComparePage() {
  const { ids, toggle, clear } = useCompare()
  const cart = useCart()
  const [onlyDifferent, setOnlyDifferent] = useState(false)
  const [open, setOpen] = useState(true)

  const products = ids.map((id) => findProduct(id)).filter((product): product is Product => product !== undefined)

  if (products.length === 0) {
    return <EmptyState title="Сравнение товаров" text="Добавьте товары кнопкой со столбиками, чтобы сравнить их." to="/catalog" button="В каталог" />
  }

  const keys = products[0].specs.map(([key]) => key)

  function valueOf(product: Product, key: string): string {
    return product.specs.find(([name]) => name === key)?.[1] ?? '—'
  }

  const rows = keys.filter((key) => !onlyDifferent || new Set(products.map((product) => valueOf(product, key))).size > 1)

  return (
    <div className="compare">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Сравнение' }]} />
        <h1 className="page-title">Сравнение товаров</h1>

        <div className="compare-tools">
          <button onClick={() => setOnlyDifferent(!onlyDifferent)}>
            {onlyDifferent ? 'Показать все характеристики' : 'Показать только отличия'}
          </button>
          <button onClick={clear}>Очистить сравнение</button>
        </div>

        <div className="compare-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th />
                {products.map((product) => (
                  <th key={product.id}>
                    <div className="compare-product">
                      <button className="compare-remove" aria-label="Убрать из сравнения" onClick={() => toggle(product.id)}>
                        <Icon name="close" size={12} />
                      </button>
                      <img src={productImage(product.imageIndex)} alt="" />
                      <Link to={'/product/' + product.id}>{product.name}</Link>
                      <div className="compare-product-bottom">
                        <b>{formatPrice(product.price)}</b>
                        <button aria-label="В корзину" onClick={() => cart.add(product.id)}>
                          <Icon name="cart" size={16} />
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={products.length + 1}>
                  <button className="compare-group" aria-expanded={open} onClick={() => setOpen(!open)}>
                    Основные характеристики
                    <Icon name={open ? 'chevron-up' : 'chevron-down'} size={14} />
                  </button>
                </td>
              </tr>
              {open &&
                rows.map((key) => (
                  <tr key={key}>
                    <th scope="row">{key}</th>
                    {products.map((product) => (
                      <td key={product.id}>{valueOf(product, key)}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
