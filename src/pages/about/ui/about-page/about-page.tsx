import { IMAGES } from '@/shared/config/images'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import './about-page.css'

const TEXT =
  'Торговая и производственная компания, предлагающая широкий ассортимент инструмента, малярных и электротоваров, спецодежды и товаров для дома и дачи. Мы работаем напрямую с производителями и следим за качеством каждой партии.'

export function AboutPage() {
  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'О компании' }]} />
      <h1 className="page-title">О компании</h1>

      <div className="about-page-text">
        <p>{TEXT}</p>
        <ol>
          <li>Прямые поставки от производителей и честные цены.</li>
          <li>Собственные магазины в Москве и Санкт-Петербурге.</li>
          <li>Доставка по России курьером и самовывоз.</li>
          <li>Консультации мастеров и помощь в выборе.</li>
        </ol>
      </div>

      <img className="about-page-wide" src={IMAGES.pages.aboutWide} alt="" />

      <div className="about-page-two">
        <p>{TEXT}</p>
        <img src={IMAGES.pages.aboutSide} alt="" loading="lazy" />
      </div>
    </div>
  )
}
