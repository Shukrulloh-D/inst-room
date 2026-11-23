import { Link } from 'react-router-dom'
import type { Product } from '@/entities/catalog'
import { useCart } from '@/features/cart'
import { useCompare } from '@/features/compare'
import { useFavorites } from '@/features/favorites'
import { productImage } from '@/shared/config/images'
import { formatPrice } from '@/shared/lib/format'
import { Icon } from '@/shared/ui/icon'
import './product-card.css'

interface ProductCardProps {
  product: Product
  variant?: 'grid' | 'list'
}

export function ProductCard({ product, variant = 'grid' }: ProductCardProps) {
  const cart = useCart()
  const favorites = useFavorites()
  const compare = useCompare()

  const link = '/product/' + product.id
  const inCart = cart.has(product.id)
  const isFavorite = favorites.has(product.id)
  const isCompared = compare.has(product.id)

  const price = (
    <p className="product-card-price">
      <b>{formatPrice(product.price)}</b>
      {product.oldPrice && <s>{formatPrice(product.oldPrice)}</s>}
    </p>
  )

  const stock = (
    <span className={product.inStock ? 'product-card-stock' : 'product-card-stock product-card-stock-order'}>
      {product.inStock ? '✓ в наличии' : 'под заказ'}
    </span>
  )

  const cartButton = inCart ? (
    <Link to="/cart" className="product-card-cart product-card-cart-active" aria-label="Товар в корзине, перейти в корзину">
      <Icon name="cart" size={18} />
    </Link>
  ) : (
    <button className="product-card-cart" aria-label="В корзину" onClick={() => cart.add(product.id)}>
      <Icon name="cart" size={18} />
    </button>
  )

  const icons = (
    <div className="product-card-icons">
      <button
        className={isCompared ? 'product-card-icon product-card-icon-active' : 'product-card-icon'}
        aria-label="Сравнить"
        aria-pressed={isCompared}
        onClick={() => compare.toggle(product.id)}
      >
        <Icon name="scales" size={14} />
      </button>
      <button
        className={isFavorite ? 'product-card-icon product-card-icon-active' : 'product-card-icon'}
        aria-label="В избранное"
        aria-pressed={isFavorite}
        onClick={() => favorites.toggle(product.id)}
      >
        <Icon name="heart" size={14} />
      </button>
    </div>
  )

  return (
    <article className={'product-card product-card-' + variant}>
      {product.badge && <span className="product-card-badge">{product.badge}</span>}

      <Link to={link} className="product-card-image" tabIndex={-1} aria-hidden="true">
        <img src={productImage(product.imageIndex)} alt="" loading="lazy" />
      </Link>

      <div className="product-card-info">
        <Link to={link} className="product-card-name">
          {product.name}
        </Link>
        {variant === 'list' && <p className="product-card-text">{product.description}</p>}
        {variant === 'list' && stock}
      </div>

      <div className="product-card-side">
        {icons}
        {price}
        {variant === 'grid' && stock}
        {cartButton}
      </div>
    </article>
  )
}
