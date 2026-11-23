import { useParams } from 'react-router-dom'
import { findSub, productsInSub } from '@/entities/catalog'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import { ProductListing } from '@/widgets/products'

export function SubcategoryPage() {
  const { category, sub } = useParams()
  const found = findSub(category, sub)

  if (!found) {
    return <EmptyState title="Раздел не найден" to="/catalog" button="В каталог" />
  }

  return (
    <div className="container page">
      <Breadcrumbs
        items={[
          { label: 'Главная', to: '/' },
          { label: 'Каталог', to: '/catalog' },
          { label: found.category.title, to: '/catalog/' + found.category.slug },
          { label: found.sub.title },
        ]}
      />
      <h1 className="page-title">{found.sub.title}</h1>
      <ProductListing key={found.sub.slug} products={productsInSub(found.sub.slug)} activeCategory={found.category.slug} />
    </div>
  )
}
