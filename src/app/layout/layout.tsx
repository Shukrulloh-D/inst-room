import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'

export function Layout() {
  const { pathname, search } = useLocation()

  // при переходе на другую страницу возвращаемся наверх
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
