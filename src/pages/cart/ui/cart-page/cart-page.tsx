import { Link } from 'react-router-dom'
import { useCart, useCartLines } from '@/features/cart'
import { productImage } from '@/shared/config/images'
import { formatPrice } from '@/shared/lib/format'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'
import { Icon } from '@/shared/ui/icon'
import { Quantity } from '@/shared/ui/quantity'
import './cart-page.css'

export function CartPage() {
  const { setQty, remove } = useCart()
  const { lines, total, discount } = useCartLines()

  if (lines.length === 0) {
    return <EmptyState title="Корзина" text="В корзине пока ничего нет." to="/catalog" button="В каталог" />
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Корзина' }]} />
      <div className="cart-head">
        <h1 className="page-title">Корзина</h1>
        <Link to="/catalog" className="link-orange">
          Продолжить покупки
        </Link>
      </div>

      <div className="cart-wrap">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Стоимость</th>
              <th>Количество</th>
              <th>Итого</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {lines.map(({ product, qty, sum }) => (
              <tr key={product.id}>
                <td>
                  <Link to={'/product/' + product.id} className="cart-product">
                    <img src={productImage(product.imageIndex)} alt="" />
                    <span>{product.name}</span>
                  </Link>
                </td>
                <td>{formatPrice(product.price)}</td>
                <td>
                  <Quantity value={qty} onChange={(value) => setQty(product.id, value)} />
                </td>
                <td>
                  <b>{formatPrice(sum)}</b>
                </td>
                <td>
                  <button className="cart-remove" aria-label="Убрать из корзины" onClick={() => remove(product.id)}>
                    <Icon name="close" size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cart-summary">
        <p>
          <span>Сумма:</span>
          <b>{formatPrice(total + discount)}</b>
        </p>
        <p>
          <span>Скидка:</span>
          <b>−{formatPrice(discount)}</b>
        </p>
        <p className="cart-summary-total">
          <span>К оплате:</span>
          <b>{formatPrice(total)}</b>
        </p>
        <Button full to="/checkout">
          Перейти к оформлению
        </Button>
      </div>
    </div>
  )
}
