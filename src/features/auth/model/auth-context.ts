import { createContext, useContext } from 'react'
import type { User } from './auth'

export interface AuthValue {
  user: User | null
  openLogin: () => void
  openRegister: () => void
  logout: () => void
}

export const AuthContext = createContext<AuthValue | null>(null)

export function useAuth(): AuthValue {
  const value = useContext(AuthContext)

  if (!value) {
    throw new Error('useAuth нужно вызывать внутри AuthProvider')
  }

  return value
}
