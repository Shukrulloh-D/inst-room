import { Link, useParams } from 'react-router-dom'
import { CATEGORIES, findCategory } from '@/entities/catalog'
import { categoryImage } from '@/shared/config/images'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import './catalog-page.css'

export function CatalogPage() {
  const { category: slug } = useParams()
  const active = slug ? findCategory(slug) : CATEGORIES[0]

  if (!active) {
    return <EmptyState title="Раздел не найден" to="/catalog" button="В каталог" />
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Каталог' }]} />
      <h1 className="page-title">Каталог</h1>

      <nav className="catalog-tabs" aria-label="Разделы каталога">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            to={'/catalog/' + category.slug}
            className={category.slug === active.slug ? 'catalog-tab catalog-tab-active' : 'catalog-tab'}
          >
            {category.title}
          </Link>
        ))}
      </nav>

      <ul className="catalog-tiles">
        {active.subs.map((sub, index) => (
          <li key={sub.slug}>
            <Link to={'/catalog/' + active.slug + '/' + sub.slug} className="catalog-tile">
              <img src={categoryImage(index)} alt="" loading="lazy" />
              <span>{sub.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
