import { CATEGORIES, productsInCategory } from '@/entities/catalog'
import { ProductSlider } from '@/widgets/products'
import './category-blocks.css'

export function CategoryBlocks() {
  return (
    <section className="container category-blocks">
      {CATEGORIES.map((category) => (
        <ProductSlider key={category.slug} title={category.title} products={productsInCategory(category.slug).slice(0, 8)} perPage={2} />
      ))}
    </section>
  )
}
