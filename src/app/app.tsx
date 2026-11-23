import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/features/auth'
import { CallbackProvider } from '@/features/callback'
import { CartProvider } from '@/features/cart'
import { CompareProvider } from '@/features/compare'
import { FavoritesProvider } from '@/features/favorites'
import { AppRouter } from './router'

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <FavoritesProvider>
          <CompareProvider>
            <CallbackProvider>
              <AuthProvider>
                <AppRouter />
              </AuthProvider>
            </CallbackProvider>
          </CompareProvider>
        </FavoritesProvider>
      </CartProvider>
    </BrowserRouter>
  )
}
