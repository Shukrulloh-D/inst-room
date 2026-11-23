import { useState } from 'react'
import type { Product } from '@/entities/catalog'
import { SHOPS, SHOP_CITIES } from '@/entities/shop'
import { Button } from '@/shared/ui/button'
import { Choice } from '@/shared/ui/choice'
import { Select } from '@/shared/ui/select'
import { Tabs } from '@/shared/ui/tabs'
import { ReviewModal } from '../review-modal/review-modal'
import './product-tabs.css'

interface Review {
  name: string
  text: string
}

const START_REVIEWS: Review[] = [
  { name: 'Анна Фёдорова', text: 'Покупкой довольна: краска легла ровно, запаха почти нет, высохла быстро. Рекомендую для дачи.' },
  { name: 'Сергей Ильин', text: 'Хороший товар за свою цену. Доставили на следующий день, упаковка целая.' },
  { name: 'Мария Орлова', text: 'Брала для ремонта балкона, расход оказался даже меньше заявленного. Буду заказывать ещё.' },
  { name: 'Павел Громов', text: 'Качество отличное, цвет соответствует фото. Консультант в магазине подсказал, как разводить.' },
]

const TAB_NAMES = ['Описание', 'Характеристики', 'Доставка', 'Отзывы']

export function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState(TAB_NAMES[0])
  const [reviews, setReviews] = useState<Review[]>(START_REVIEWS)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [method, setMethod] = useState<'courier' | 'pickup'>('courier')
  const [city, setCity] = useState(SHOP_CITIES[0])
  const [shop, setShop] = useState(SHOPS[0].address)

  const tabs = TAB_NAMES.map((name) => (name === 'Отзывы' ? 'Отзывы (' + reviews.length + ')' : name))
  const activeTab = tab === 'Отзывы' ? 'Отзывы (' + reviews.length + ')' : tab

  function changeTab(label: string) {
    setTab(label.startsWith('Отзывы') ? 'Отзывы' : label)
  }

  return (
    <div className="product-tabs">
      <Tabs items={tabs} active={activeTab} onChange={changeTab} />

      <div className="product-tabs-body">
        {tab === 'Описание' && (
          <div className="product-tabs-text">
            <p>{product.description}</p>
            <h3>Преимущества</h3>
            <ul>
              <li>Хорошая укрывистость и стойкость к атмосферным воздействиям</li>
              <li>Подходит для профессиональных и домашних работ</li>
              <li>Сертифицировано, безопасно при использовании по назначению</li>
            </ul>
          </div>
        )}

        {tab === 'Характеристики' && (
          <dl className="product-tabs-specs">
            {product.specs.map(([key, value]) => (
              <div key={key}>
                <dt>{key}:</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {tab === 'Доставка' && (
          <div className="product-tabs-delivery">
            <div className="product-tabs-methods">
              <Choice type="radio" name="method" label="Доставка курьером" checked={method === 'courier'} onChange={() => setMethod('courier')} />
              <Choice type="radio" name="method" label="Самовывоз" checked={method === 'pickup'} onChange={() => setMethod('pickup')} />
            </div>

            {method === 'courier' ? (
              <>
                <Select label="Выберите город" value={city} options={SHOP_CITIES} onChange={setCity} />
                <p>Курьерская доставка: от 1 дня, 300 ₽. При заказе от 5 000 ₽ доставка бесплатная.</p>
              </>
            ) : (
              <>
                <Select label="Выберите пункт самовывоза" value={shop} options={SHOPS.map((item) => item.address)} onChange={setShop} />
                <p>Самовывоз из магазина бесплатно, товар будет готов сегодня.</p>
              </>
            )}
          </div>
        )}

        {tab === 'Отзывы' && (
          <div>
            <ul className="product-tabs-reviews">
              {reviews.map((review, index) => (
                <li key={index}>
                  <b>{review.name}</b>
                  <p>{review.text}</p>
                </li>
              ))}
            </ul>
            <Button onClick={() => setReviewOpen(true)}>Оставить отзыв</Button>
          </div>
        )}
      </div>

      {reviewOpen && (
        <ReviewModal
          onClose={() => setReviewOpen(false)}
          onSubmit={(name, text) => {
            setReviews([{ name, text }, ...reviews])
            setReviewOpen(false)
          }}
        />
      )}
    </div>
  )
}
