import { useParams } from 'react-router-dom'
import { brandIndex, findBrand, productsByBrand } from '@/entities/catalog'
import { brandImage } from '@/shared/config/images'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import { ProductListing } from '@/widgets/products'
import './brand-page.css'

export function BrandPage() {
  const { slug } = useParams()
  const brand = findBrand(slug)

  if (!brand) {
    return <EmptyState title="Бренд не найден" to="/brands" button="Все бренды" />
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Бренды', to: '/brands' }, { label: brand.name }]} />
      <h1 className="page-title">{brand.name}</h1>

      <div className="brand-page-about">
        <img src={brandImage(brandIndex(brand.slug))} alt={brand.name} />
        <p>{brand.description}</p>
      </div>

      <h2 className="block-title brand-page-title">Товары {brand.name} в нашем магазине</h2>
      <ProductListing key={brand.slug} products={productsByBrand(brand.slug)} hideBrands />
    </div>
  )
}
