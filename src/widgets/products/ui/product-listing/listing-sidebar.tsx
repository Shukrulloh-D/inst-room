import { Link } from 'react-router-dom'
import { BRANDS, CATEGORIES, COLORS, COUNTRIES } from '@/entities/catalog'
import type { Filters } from '@/entities/catalog'
import { IMAGES } from '@/shared/config/images'
import { Button } from '@/shared/ui/button'
import { Choice } from '@/shared/ui/choice'
import { Icon } from '@/shared/ui/icon'
import './listing-sidebar.css'

interface ListingSidebarProps {
  filters: Filters
  onChange: (filters: Filters) => void
  onReset: () => void
  activeCategory?: string
  hideBrands?: boolean
}

function toggle(list: string[], value: string, checked: boolean): string[] {
  return checked ? [...list, value] : list.filter((item) => item !== value)
}

export function ListingSidebar({ filters, onChange, onReset, activeCategory, hideBrands }: ListingSidebarProps) {
  return (
    <aside className="listing-sidebar">
      <ul className="listing-menu">
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              to={'/catalog/' + category.slug}
              className={category.slug === activeCategory ? 'listing-menu-item listing-menu-item-active' : 'listing-menu-item'}
            >
              {category.title}
              <Icon name="chevron-right" size={12} />
            </Link>
          </li>
        ))}
      </ul>

      <div className="listing-filters">
        <section className="listing-group">
          <h3>Цена, ₽</h3>
          <div className="listing-price">
            <input
              type="number"
              min={0}
              placeholder="от"
              aria-label="Цена от"
              value={filters.priceFrom}
              onChange={(event) => onChange({ ...filters, priceFrom: event.target.value })}
            />
            <input
              type="number"
              min={0}
              placeholder="до"
              aria-label="Цена до"
              value={filters.priceTo}
              onChange={(event) => onChange({ ...filters, priceTo: event.target.value })}
            />
          </div>
        </section>

        {!hideBrands && (
          <section className="listing-group">
            <h3>Бренд</h3>
            <div className="listing-options">
              {BRANDS.map((brand) => (
                <Choice
                  key={brand.slug}
                  type="checkbox"
                  label={brand.name}
                  checked={filters.brands.includes(brand.slug)}
                  onChange={(checked) => onChange({ ...filters, brands: toggle(filters.brands, brand.slug, checked) })}
                />
              ))}
            </div>
          </section>
        )}

        <section className="listing-group">
          <h3>Страна производитель</h3>
          <div className="listing-options">
            {COUNTRIES.map((country) => (
              <Choice
                key={country}
                type="checkbox"
                label={country}
                checked={filters.countries.includes(country)}
                onChange={(checked) => onChange({ ...filters, countries: toggle(filters.countries, country, checked) })}
              />
            ))}
          </div>
        </section>

        <section className="listing-group">
          <h3>Цвет</h3>
          <div className="listing-options">
            {COLORS.map((color) => (
              <Choice
                key={color}
                type="checkbox"
                label={color}
                checked={filters.colors.includes(color)}
                onChange={(checked) => onChange({ ...filters, colors: toggle(filters.colors, color, checked) })}
              />
            ))}
          </div>
        </section>

        <section className="listing-group">
          <h3>Способ доставки</h3>
          <div className="listing-options">
            <Choice type="radio" name="delivery" label="Самовывоз" checked={filters.delivery === 'pickup'} onChange={() => onChange({ ...filters, delivery: 'pickup' })} />
            <Choice type="radio" name="delivery" label="Доставка курьером" checked={filters.delivery === 'courier'} onChange={() => onChange({ ...filters, delivery: 'courier' })} />
            <Choice type="radio" name="delivery" label="Любой" checked={filters.delivery === 'any'} onChange={() => onChange({ ...filters, delivery: 'any' })} />
          </div>
        </section>

        <Button variant="gray" full onClick={onReset}>
          Сбросить фильтр
        </Button>
      </div>

      <Link to="/collection/new" className="listing-banner">
        <img src={IMAGES.common.banner1} alt="" loading="lazy" />
        <span>
          Новое поступление
          <small>Ознакомьтесь с новинками</small>
        </span>
      </Link>
      <Link to="/catalog/sezonnoe" className="listing-banner">
        <img src={IMAGES.common.banner2} alt="" loading="lazy" />
        <span>
          Печи на склад
          <small>Всё для тёплого дома</small>
        </span>
      </Link>
    </aside>
  )
}
