import { useState } from 'react'
import { productImage } from '@/shared/config/images'
import { formatPrice } from '@/shared/lib/format'
import { Icon } from '@/shared/ui/icon'
import { ORDERS, orderTotal } from '../../model/orders'
import './orders-list.css'

export function OrdersList() {
  const [openNumber, setOpenNumber] = useState<string | null>(ORDERS[0].number)

  return (
    <ul className="orders">
      {ORDERS.map((order) => {
        const isOpen = openNumber === order.number

        return (
          <li key={order.number} className="order">
            <button className="order-head" aria-expanded={isOpen} onClick={() => setOpenNumber(isOpen ? null : order.number)}>
              <b>Заказ № {order.number}</b>
              <span>Создан: {order.date}</span>
              <span>Статус: {order.status}</span>
              <span>Сумма: {formatPrice(orderTotal(order))}</span>
              <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={14} />
            </button>

            {isOpen && (
              <ul className="order-lines">
                {order.lines.map(({ product, qty }) => (
                  <li key={product.id}>
                    <img src={productImage(product.imageIndex)} alt="" />
                    <span>{product.name}</span>
                    <span>
                      {formatPrice(product.price)} × {qty}
                    </span>
                    <b>{formatPrice(product.price * qty)}</b>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )
      })}
    </ul>
  )
}
