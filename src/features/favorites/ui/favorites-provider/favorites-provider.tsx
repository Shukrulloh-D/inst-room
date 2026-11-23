import type { ReactNode } from 'react'
import { findProduct } from '@/entities/catalog'
import { parseStringList, useStoredState } from '@/shared/lib/use-stored-state'
import { FavoritesContext } from '../../model/favorites-context'

function parseIds(data: unknown): string[] {
  return parseStringList(data).filter((id) => findProduct(id))
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useStoredState('inst-room-favorites', parseIds)

  function toggle(id: string) {
    setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  return <FavoritesContext.Provider value={{ ids, has: (id) => ids.includes(id), toggle }}>{children}</FavoritesContext.Provider>
}
