import { useParams } from 'react-router-dom'
import { productsByBadge } from '@/entities/catalog'
import type { Badge } from '@/entities/catalog'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import { ProductListing } from '@/widgets/products'

const COLLECTIONS: Record<string, { title: string; badge: Badge }> = {
  sale: { title: 'Акции', badge: 'Акция' },
  hits: { title: 'Хиты сезона', badge: 'Хит' },
  new: { title: 'Новинки', badge: 'Новинка' },
}

export function CollectionPage() {
  const { type } = useParams()
  const collection = type ? COLLECTIONS[type] : undefined

  if (!collection) {
    return <EmptyState title="Подборка не найдена" to="/catalog" button="В каталог" />
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: collection.title }]} />
      <h1 className="page-title">{collection.title}</h1>
      <ProductListing key={type} products={productsByBadge(collection.badge)} />
    </div>
  )
}
