import { findProduct } from '@/entities/catalog'
import type { Product } from '@/entities/catalog'
import { useFavorites } from '@/features/favorites'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import { ProductCard } from '@/widgets/products'
import './favorites-page.css'

export function FavoritesPage() {
  const { ids } = useFavorites()
  const products = ids.map((id) => findProduct(id)).filter((product): product is Product => product !== undefined)

  if (products.length === 0) {
    return <EmptyState title="Избранное" text="Здесь будут товары, которые вы отметили сердечком." to="/catalog" button="В каталог" />
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Избранное' }]} />
      <h1 className="page-title">Избранное</h1>
      <p className="favorites-count">{products.length} товаров</p>
      <div className="favorites-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
