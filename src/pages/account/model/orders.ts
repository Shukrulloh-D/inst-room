import { PRODUCTS } from '@/entities/catalog'
import type { Product } from '@/entities/catalog'

export interface OrderLine {
  product: Product
  qty: number
}

export interface Order {
  number: string
  date: string
  status: string
  lines: OrderLine[]
}

function lines(from: number, count: number): OrderLine[] {
  return PRODUCTS.slice(from, from + count).map((product, index) => ({ product, qty: index + 1 }))
}

// временные данные: настоящей истории заказов пока нет
export const ORDERS: Order[] = [
  { number: '25463', date: '12.02.2021', status: 'Выполнен', lines: lines(0, 2) },
  { number: '25464', date: '20.02.2021', status: 'Выполнен', lines: lines(5, 1) },
  { number: '25465', date: '03.03.2021', status: 'В пути', lines: lines(9, 5) },
  { number: '25466', date: '15.03.2021', status: 'Собирается', lines: lines(14, 3) },
]

export function orderTotal(order: Order): number {
  return order.lines.reduce((sum, line) => sum + line.product.price * line.qty, 0)
}
