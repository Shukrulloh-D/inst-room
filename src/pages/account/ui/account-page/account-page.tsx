import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth'
import { IMAGES } from '@/shared/config/images'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { Button } from '@/shared/ui/button'
import { OrdersList } from '../orders-list/orders-list'
import { ProfileForm } from '../profile-form/profile-form'
import './account-page.css'

export function AccountPage() {
  const { user, openLogin, logout } = useAuth()
  const [tab, setTab] = useState<'orders' | 'profile'>('orders')

  if (!user) {
    return (
      <div className="container empty-state-like">
        <h1 className="page-title">Личный кабинет</h1>
        <p className="account-page-text">Войдите в аккаунт, чтобы увидеть историю заказов и личные данные.</p>
        <Button onClick={openLogin}>Войти</Button>
      </div>
    )
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Личный кабинет' }]} />
      <h1 className="page-title">Личный кабинет</h1>

      <div className="account-page">
        <aside className="account-page-side">
          <div className="account-page-menu">
            <button className={tab === 'orders' ? 'account-page-tab account-page-tab-active' : 'account-page-tab'} onClick={() => setTab('orders')}>
              История заказов
            </button>
            <button className={tab === 'profile' ? 'account-page-tab account-page-tab-active' : 'account-page-tab'} onClick={() => setTab('profile')}>
              Личная информация
            </button>
            <button className="account-page-tab" onClick={logout}>
              Выйти
            </button>
          </div>

          <Link to="/collection/new" className="account-page-banner">
            <img src={IMAGES.common.banner1} alt="" loading="lazy" />
            <span>Новое поступление</span>
          </Link>
          <Link to="/catalog/sezonnoe" className="account-page-banner">
            <img src={IMAGES.common.banner2} alt="" loading="lazy" />
            <span>Печи на склад</span>
          </Link>
        </aside>

        <section className="account-page-content">{tab === 'orders' ? <OrdersList /> : <ProfileForm />}</section>
      </div>
    </div>
  )
}
