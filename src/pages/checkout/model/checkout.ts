export const FREE_DELIVERY_FROM = 5000
export const COURIER_PRICE = 300

export interface Contact {
  name: string
  phone: string
  email: string
}

export interface Address {
  city: string
  street: string
  house: string
  flat: string
  comment: string
}

export type DeliveryMethod = 'courier' | 'pickup'
export type Payment = 'receipt' | 'online'

export function deliveryCost(method: DeliveryMethod, total: number): number {
  if (method === 'pickup') return 0
  return total >= FREE_DELIVERY_FROM ? 0 : COURIER_PRICE
}
