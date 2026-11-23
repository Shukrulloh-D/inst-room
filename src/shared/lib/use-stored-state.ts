import { useEffect, useState } from 'react'
import { readStored, writeStored } from './storage'

// как useState, но значение сохраняется в localStorage
export function useStoredState<T>(key: string, parse: (data: unknown) => T) {
  const [value, setValue] = useState<T>(() => readStored(key, parse))

  useEffect(() => {
    writeStored(key, value)
  }, [key, value])

  return [value, setValue] as const
}

export function parseStringList(data: unknown): string[] {
  if (!Array.isArray(data)) return []
  return data.filter((item): item is string => typeof item === 'string').slice(0, 200)
}
