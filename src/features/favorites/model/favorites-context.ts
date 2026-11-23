import { createContext, useContext } from 'react'

export interface FavoritesValue {
  ids: string[]
  has: (id: string) => boolean
  toggle: (id: string) => void
}

export const FavoritesContext = createContext<FavoritesValue | null>(null)

export function useFavorites(): FavoritesValue {
  const value = useContext(FavoritesContext)

  if (!value) {
    throw new Error('useFavorites нужно вызывать внутри FavoritesProvider')
  }

  return value
}
