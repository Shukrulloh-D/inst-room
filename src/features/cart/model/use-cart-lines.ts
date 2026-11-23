import { findProduct } from '@/entities/catalog'
import type { Product } from '@/entities/catalog'
import { useCart } from './cart-context'

export interface CartLine {
  product: Product
  qty: number
  sum: number
}

// строки корзины с товарами и суммами
export function useCartLines() {
  const { items } = useCart()

  const lines: CartLine[] = []

  for (const item of items) {
    const product = findProduct(item.id)
    if (product) lines.push({ product, qty: item.qty, sum: product.price * item.qty })
  }

  const total = lines.reduce((sum, line) => sum + line.sum, 0)
  const oldTotal = lines.reduce((sum, line) => sum + (line.product.oldPrice ?? line.product.price) * line.qty, 0)

  return { lines, total, discount: oldTotal - total }
}
