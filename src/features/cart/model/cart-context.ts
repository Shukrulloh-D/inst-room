import { createContext, useContext } from 'react'
import type { CartItem } from './cart'

export interface CartValue {
  items: CartItem[]
  count: number
  has: (id: string) => boolean
  add: (id: string) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
}

export const CartContext = createContext<CartValue | null>(null)

export function useCart(): CartValue {
  const value = useContext(CartContext)

  if (!value) {
    throw new Error('useCart нужно вызывать внутри CartProvider')
  }

  return value
}
