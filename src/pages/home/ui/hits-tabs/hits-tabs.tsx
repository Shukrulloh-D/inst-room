import { useState } from 'react'
import { Link } from 'react-router-dom'
import { productsByBadge } from '@/entities/catalog'
import type { Badge } from '@/entities/catalog'
import { ProductSlider } from '@/widgets/products'
import './hits-tabs.css'

const TABS: Array<{ title: string; badge: Badge; to: string }> = [
  { title: 'Новинки', badge: 'Новинка', to: '/collection/new' },
  { title: 'Хиты', badge: 'Хит', to: '/collection/hits' },
  { title: 'Распродажа', badge: 'Акция', to: '/collection/sale' },
]

export function HitsTabs() {
  const [active, setActive] = useState(TABS[0])

  return (
    <section className="hits-tabs">
      <div className="container">
        <div className="hits-tabs-list" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.badge}
              role="tab"
              aria-selected={tab === active}
              className={tab === active ? 'hits-tab hits-tab-active' : 'hits-tab'}
              onClick={() => setActive(tab)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <ProductSlider
          key={active.badge}
          products={productsByBadge(active.badge).slice(0, 12)}
          extra={
            <Link to={active.to} className="hits-tabs-all">
              Смотреть все
            </Link>
          }
        />
      </div>
    </section>
  )
}
