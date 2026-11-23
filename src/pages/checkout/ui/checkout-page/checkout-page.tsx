import { useState } from 'react'
import { SHOPS } from '@/entities/shop'
import { useCart, useCartLines } from '@/features/cart'
import { formatPrice } from '@/shared/lib/format'
import { isEmail, isFilled, isPhone } from '@/shared/lib/validate'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { Button } from '@/shared/ui/button'
import { EmptyState } from '@/shared/ui/empty-state'
import { deliveryCost } from '../../model/checkout'
import type { Address, Contact, DeliveryMethod, Payment } from '../../model/checkout'
import { ContactStep, DeliveryStep, PaymentStep } from '../checkout-steps/checkout-steps'
import './checkout-page.css'

const STEPS = ['Данные покупателя', 'Доставка', 'Оплата']

export function CheckoutPage() {
  const cart = useCart()
  const { lines, total, discount } = useCartLines()

  const [step, setStep] = useState(0)
  const [contact, setContact] = useState<Contact>({ name: '', phone: '', email: '' })
  const [method, setMethod] = useState<DeliveryMethod>('courier')
  const [address, setAddress] = useState<Address>({ city: '', street: '', house: '', flat: '', comment: '' })
  const [shopId, setShopId] = useState(SHOPS[0].id)
  const [payment, setPayment] = useState<Payment>('receipt')
  const [errors, setErrors] = useState<Record<string, string | undefined>>({})
  const [orderNumber, setOrderNumber] = useState<number | null>(null)

  if (orderNumber !== null) {
    return (
      <EmptyState
        title="Спасибо за заказ"
        text={'Ваш заказ №' + orderNumber + ' принят. Мы свяжемся с вами для подтверждения.'}
        to="/"
        button="На главную"
      />
    )
  }

  if (lines.length === 0) {
    return <EmptyState title="Оформление заказа" text="В корзине нет товаров." to="/catalog" button="В каталог" />
  }

  const delivery = deliveryCost(method, total)

  function check(): Record<string, string | undefined> {
    const found: Record<string, string | undefined> = {}

    if (step === 0) {
      if (!isFilled(contact.name)) found.name = 'Введите имя'
      if (!isPhone(contact.phone)) found.phone = 'Введите правильный номер'
      if (!isEmail(contact.email)) found.email = 'Введите правильный email'
    }

    if (step === 1 && method === 'courier') {
      if (!isFilled(address.city)) found.city = 'Укажите город'
      if (!isFilled(address.street)) found.street = 'Укажите улицу'
      if (!isFilled(address.house)) found.house = 'Укажите дом'
    }

    return found
  }

  function next() {
    const found = check()
    setErrors(found)

    if (Object.keys(found).length > 0) return

    if (step < STEPS.length - 1) {
      setStep(step + 1)
      return
    }

    setOrderNumber(Math.floor(100000 + Math.random() * 900000))
    cart.clear()
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Корзина', to: '/cart' }, { label: 'Оформление заказа' }]} />
      <h1 className="page-title">Оформление заказа</h1>

      <div className="checkout">
        <div className="checkout-main">
          <ol className="checkout-steps">
            {STEPS.map((name, index) => (
              <li
                key={name}
                className={index === step ? 'checkout-step checkout-step-active' : index < step ? 'checkout-step checkout-step-done' : 'checkout-step'}
              >
                <button disabled={index >= step} onClick={() => setStep(index)}>
                  {name}
                </button>
              </li>
            ))}
          </ol>

          <div className="checkout-body">
            {step === 0 && <ContactStep value={contact} errors={errors} onChange={setContact} />}
            {step === 1 && (
              <DeliveryStep
                method={method}
                address={address}
                shopId={shopId}
                errors={errors}
                onMethod={setMethod}
                onAddress={setAddress}
                onShop={setShopId}
              />
            )}
            {step === 2 && <PaymentStep value={payment} onChange={setPayment} />}

            <div className="checkout-actions">
              <Button onClick={next}>{step === STEPS.length - 1 ? 'Подтвердить заказ' : 'Далее'}</Button>
            </div>
          </div>
        </div>

        <aside className="checkout-summary">
          <h2>Итого</h2>
          <p className="checkout-summary-total">{formatPrice(total + delivery)}</p>
          <p>
            <span>Товаров</span>
            <b>{cart.count}</b>
          </p>
          <p>
            <span>Скидка</span>
            <b>−{formatPrice(discount)}</b>
          </p>
          <p>
            <span>Доставка</span>
            <b>{delivery === 0 ? 'бесплатно' : formatPrice(delivery)}</b>
          </p>
        </aside>
      </div>
    </div>
  )
}
