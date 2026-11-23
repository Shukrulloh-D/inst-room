import { useState } from 'react'
import { SHOPS, SHOP_CITIES } from '@/entities/shop'
import { phoneHref } from '@/shared/config/site'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { Tabs } from '@/shared/ui/tabs'
import './contacts-page.css'

// координаты берём из данных магазина (числа), поэтому адрес карты безопасен
function mapUrl(lat: number, lon: number): string {
  const bbox = [lon - 0.012, lat - 0.007, lon + 0.012, lat + 0.007].join(',')
  return 'https://www.openstreetmap.org/export/embed.html?bbox=' + bbox + '&layer=mapnik&marker=' + lat + ',' + lon
}

export function ContactsPage() {
  const [city, setCity] = useState(SHOP_CITIES[0])
  const shops = SHOPS.filter((shop) => shop.city === city)
  const [selectedId, setSelectedId] = useState(shops[0].id)

  const selected = shops.find((shop) => shop.id === selectedId) ?? shops[0]

  function changeCity(next: string) {
    setCity(next)
    setSelectedId(SHOPS.filter((shop) => shop.city === next)[0].id)
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Контакты' }]} />
      <h1 className="page-title">Контакты</h1>

      <div className="contacts">
        <iframe className="contacts-map" title="Карта магазинов" src={mapUrl(selected.lat, selected.lon)} loading="lazy" referrerPolicy="no-referrer" />

        <div className="contacts-list">
          <Tabs items={SHOP_CITIES} active={city} onChange={changeCity} />
          <ul>
            {shops.map((shop) => (
              <li key={shop.id}>
                <button
                  className={shop.id === selected.id ? 'contacts-shop contacts-shop-active' : 'contacts-shop'}
                  aria-pressed={shop.id === selected.id}
                  onClick={() => setSelectedId(shop.id)}
                >
                  <b>{shop.address}</b>
                  <span>{shop.city}</span>
                </button>
                <a href={phoneHref(shop.phone)}>{shop.phone}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
