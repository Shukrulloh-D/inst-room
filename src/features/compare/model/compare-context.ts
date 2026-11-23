import { createContext, useContext } from 'react'

export const COMPARE_LIMIT = 4

export interface CompareValue {
  ids: string[]
  has: (id: string) => boolean
  toggle: (id: string) => void
  clear: () => void
}

export const CompareContext = createContext<CompareValue | null>(null)

export function useCompare(): CompareValue {
  const value = useContext(CompareContext)

  if (!value) {
    throw new Error('useCompare нужно вызывать внутри CompareProvider')
  }

  return value
}
