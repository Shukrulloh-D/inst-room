import type { ReactNode } from 'react'
import { useStoredState } from '@/shared/lib/use-stored-state'
import { parseCart } from '../../model/cart'
import { CartContext } from '../../model/cart-context'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useStoredState('inst-room-cart', parseCart)

  function add(id: string) {
    setItems((current) => {
      const found = current.find((item) => item.id === id)

      if (!found) return [...current, { id, qty: 1 }]
      return current.map((item) => (item.id === id ? { ...item, qty: Math.min(item.qty + 1, 99) } : item))
    })
  }

  function setQty(id: string, qty: number) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, qty } : item)))
  }

  function remove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id))
  }

  const value = {
    items,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    has: (id: string) => items.some((item) => item.id === id),
    add,
    setQty,
    remove,
    clear: () => setItems([]),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
