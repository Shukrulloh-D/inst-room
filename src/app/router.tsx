import { Route, Routes } from 'react-router-dom'
import { AboutPage } from '@/pages/about'
import { AccountPage } from '@/pages/account'
import { BrandPage } from '@/pages/brand'
import { BrandsPage } from '@/pages/brands'
import { CartPage } from '@/pages/cart'
import { CatalogPage } from '@/pages/catalog'
import { CheckoutPage } from '@/pages/checkout'
import { CollectionPage } from '@/pages/collection'
import { ComparePage } from '@/pages/compare'
import { ContactsPage } from '@/pages/contacts'
import { FavoritesPage } from '@/pages/favorites'
import { HomePage } from '@/pages/home'
import { NewsDetailPage } from '@/pages/news-detail'
import { NotFoundPage } from '@/pages/not-found'
import { ProductPage } from '@/pages/product'
import { SearchPage } from '@/pages/search'
import { SubcategoryPage } from '@/pages/subcategory'
import { Layout } from './layout/layout'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:category" element={<CatalogPage />} />
        <Route path="/catalog/:category/:sub" element={<SubcategoryPage />} />
        <Route path="/collection/:type" element={<CollectionPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/brands/:slug" element={<BrandPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/news/:id" element={<NewsDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
