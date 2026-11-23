import { findProduct } from '@/entities/catalog'

export interface CartItem {
  id: string
  qty: number
}

// корзина лежит в localStorage, поэтому проверяем каждую запись
export function parseCart(data: unknown): CartItem[] {
  if (!Array.isArray(data)) return []

  const items: CartItem[] = []

  for (const row of data) {
    if (typeof row !== 'object' || row === null) continue

    const { id, qty } = row as Record<string, unknown>

    if (typeof id !== 'string' || !findProduct(id)) continue
    if (typeof qty !== 'number' || !Number.isInteger(qty) || qty < 1 || qty > 99) continue
    if (items.some((item) => item.id === id)) continue

    items.push({ id, qty })
  }

  return items
}
