import { Link } from 'react-router-dom'
import { BRANDS } from '@/entities/catalog'
import { brandImage } from '@/shared/config/images'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import './brands-page.css'

export function BrandsPage() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Бренды' }]} />
      <h1 className="page-title">Бренды</h1>
      <ul className="brands-grid">
        {BRANDS.map((brand, index) => (
          <li key={brand.slug}>
            <Link to={'/brands/' + brand.slug}>
              <img src={brandImage(index)} alt={brand.name} loading="lazy" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
