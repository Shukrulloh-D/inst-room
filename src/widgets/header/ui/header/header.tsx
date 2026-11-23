import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { useCallbackModal } from '@/features/callback'
import { useCart, useCartLines } from '@/features/cart'
import { useCompare } from '@/features/compare'
import { useFavorites } from '@/features/favorites'
import { NAV_LINKS, SITE, phoneHref } from '@/shared/config/site'
import { formatPrice } from '@/shared/lib/format'
import { Icon } from '@/shared/ui/icon'
import { Logo } from '@/shared/ui/logo'
import { CatalogMenu } from '../catalog-menu/catalog-menu'
import { SearchBox } from '../search-box/search-box'
import './header.css'

interface HeaderIconProps {
  icon: string
  label: string
  count?: number
  active?: boolean
  to?: string
  onClick?: () => void
}

function HeaderIcon({ icon, label, count = 0, active, to, onClick }: HeaderIconProps) {
  const className = active ? 'header-icon header-icon-active' : 'header-icon'
  const content = (
    <>
      <Icon name={icon} size={20} />
      {count > 0 && <span className="header-icon-count">{count}</span>}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={className} aria-label={label}>
        {content}
      </Link>
    )
  }

  return (
    <button className={className} aria-label={label} onClick={onClick}>
      {content}
    </button>
  )
}

export function Header() {
  const { open: openCallback } = useCallbackModal()
  const { user, openLogin } = useAuth()
  const favorites = useFavorites()
  const compare = useCompare()
  const cart = useCart()
  const { total } = useCartLines()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-inner">
          <Logo />
          <p className="header-hours">{SITE.hours}</p>
          <div className="header-phone">
            <a href={phoneHref(SITE.phones[0])}>{SITE.phones[0]}</a>
            <button onClick={openCallback}>Заказать звонок</button>
          </div>

          <div className="header-icons">
            <HeaderIcon icon="heart" label="Избранное" count={favorites.ids.length} to="/favorites" />
            <HeaderIcon icon="scales" label="Сравнение" count={compare.ids.length} to="/compare" />
            {user ? (
              <HeaderIcon icon="user" label="Личный кабинет" active to="/account" />
            ) : (
              <HeaderIcon icon="user" label="Войти" onClick={openLogin} />
            )}
            <HeaderIcon icon="cart" label="Корзина" count={cart.count} to="/cart" />
          </div>

          <p className="header-sum">
            Товаров на сумму
            <b>{formatPrice(total)}</b>
          </p>

          <button className="header-burger" aria-label="Меню" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <div className="header-bottom">
        <div className="container header-bottom-inner">
          <CatalogMenu />

          <nav className={menuOpen ? 'header-nav header-nav-open' : 'header-nav'} aria-label="Основная навигация">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>

          <ul className="header-socials">
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={14} />
              </a>
            </li>
            <li>
              <a href={SITE.vk} target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте">
                <Icon name="vk" size={14} />
              </a>
            </li>
            <li>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Icon name="facebook" size={14} />
              </a>
            </li>
          </ul>

          <SearchBox />
        </div>
      </div>
    </header>
  )
}
