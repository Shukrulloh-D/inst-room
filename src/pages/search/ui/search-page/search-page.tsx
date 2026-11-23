import { useSearchParams } from 'react-router-dom'
import { searchProducts } from '@/entities/catalog'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { ProductListing } from '@/widgets/products'

export function SearchPage() {
  const [params] = useSearchParams()
  const query = (params.get('q') ?? '').slice(0, 100)

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Поиск' }]} />
      <h1 className="page-title">Результаты поиска</h1>
      <p>Запрос: «{query}»</p>
      <ProductListing key={query} products={searchProducts(query)} />
    </div>
  )
}
