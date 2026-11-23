import { Link, useParams } from 'react-router-dom'
import { brandImage, productImage } from '@/shared/config/images'
import { findBrand, brandIndex, findProduct, findSub, productsInCategory, productsInSub } from '@/entities/catalog'
import type { Product } from '@/entities/catalog'
import { useCart } from '@/features/cart'
import { useCompare } from '@/features/compare'
import { useFavorites } from '@/features/favorites'
import { formatPrice } from '@/shared/lib/format'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'
import { Icon } from '@/shared/ui/icon'
import { ProductSlider } from '@/widgets/products'
import { ProductTabs } from '../product-tabs/product-tabs'
import './product-page.css'

function ProductView({ product }: { product: Product }) {
  const cart = useCart()
  const favorites = useFavorites()
  const compare = useCompare()

  const found = findSub(product.categorySlug, product.subSlug)
  const brand = findBrand(product.brandSlug)
  const similar = productsInSub(product.subSlug).filter((item) => item.id !== product.id)
  const together = productsInCategory(product.categorySlug).filter((item) => item.subSlug !== product.subSlug)

  return (
    <div className="container page">
      <Breadcrumbs
        items={[
          { label: 'Главная', to: '/' },
          { label: 'Каталог', to: '/catalog' },
          ...(found
            ? [
                { label: found.category.title, to: '/catalog/' + found.category.slug },
                { label: found.sub.title, to: '/catalog/' + found.category.slug + '/' + found.sub.slug },
              ]
            : []),
          { label: product.name },
        ]}
      />

      <div className="product-page-card">
        <div className="product-page-image">
          {product.badge && <span className="product-page-badge">{product.badge}</span>}
          <img src={productImage(product.imageIndex)} alt={product.name} />
        </div>

        <div className="product-page-info">
          {brand && (
            <Link to={'/brands/' + brand.slug} className="product-page-brand">
              <img src={brandImage(brandIndex(brand.slug))} alt={brand.name} />
            </Link>
          )}
          <h1 className="product-page-name">{product.name}</h1>
          <p className={product.inStock ? 'product-page-stock' : 'product-page-stock product-page-stock-order'}>
            {product.inStock ? '✓ в наличии' : 'под заказ'}
          </p>
          <p className="product-page-text">{product.description}</p>

          <p className="product-page-price">
            <b>{formatPrice(product.price)}</b>
            {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
          </p>

          <div className="product-page-actions">
            {cart.has(product.id) ? (
              <Button variant="outline" to="/cart">
                Перейти в корзину
              </Button>
            ) : (
              <Button onClick={() => cart.add(product.id)}>В корзину</Button>
            )}
            <button
              className={compare.has(product.id) ? 'product-page-icon product-page-icon-active' : 'product-page-icon'}
              aria-label="Сравнить"
              aria-pressed={compare.has(product.id)}
              onClick={() => compare.toggle(product.id)}
            >
              <Icon name="scales" size={18} />
            </button>
            <button
              className={favorites.has(product.id) ? 'product-page-icon product-page-icon-active' : 'product-page-icon'}
              aria-label="В избранное"
              aria-pressed={favorites.has(product.id)}
              onClick={() => favorites.toggle(product.id)}
            >
              <Icon name="heart" size={18} />
            </button>
          </div>
        </div>
      </div>

      <ProductTabs product={product} />

      <div className="product-page-more">
        <ProductSlider title="Похожие товары" products={similar.slice(0, 12)} />
      </div>
      <div className="product-page-more">
        <ProductSlider title="С этим товаром покупают" products={together.slice(0, 12)} />
      </div>
    </div>
  )
}

export function ProductPage() {
  const { id } = useParams()
  const product = findProduct(id)

  if (!product) {
    return <EmptyState title="Товар не найден" to="/catalog" button="В каталог" />
  }

  return <ProductView key={product.id} product={product} />
}
