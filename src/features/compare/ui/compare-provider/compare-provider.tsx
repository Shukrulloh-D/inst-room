import type { ReactNode } from 'react'
import { findProduct } from '@/entities/catalog'
import { parseStringList, useStoredState } from '@/shared/lib/use-stored-state'
import { COMPARE_LIMIT, CompareContext } from '../../model/compare-context'

function parseIds(data: unknown): string[] {
  return parseStringList(data)
    .filter((id) => findProduct(id))
    .slice(0, COMPARE_LIMIT)
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useStoredState('inst-room-compare', parseIds)

  function toggle(id: string) {
    setIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id)
      // в сравнении не больше четырёх товаров: новый вытесняет самый старый
      return [...current, id].slice(-COMPARE_LIMIT)
    })
  }

  const value = { ids, has: (id: string) => ids.includes(id), toggle, clear: () => setIds([]) }

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
}
