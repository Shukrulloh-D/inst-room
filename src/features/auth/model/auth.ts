export interface User {
  name: string
  phone: string
}

export function parseUser(data: unknown): User | null {
  if (typeof data !== 'object' || data === null) return null

  const { name, phone } = data as Record<string, unknown>

  if (typeof name !== 'string' || typeof phone !== 'string') return null
  return { name: name.slice(0, 100), phone: phone.slice(0, 30) }
}
