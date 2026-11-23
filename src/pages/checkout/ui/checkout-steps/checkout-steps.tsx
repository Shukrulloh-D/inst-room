import { SHOPS } from '@/entities/shop'
import { cleanPhone } from '@/shared/lib/validate'
import { Choice } from '@/shared/ui/choice'
import { Field } from '@/shared/ui/field'
import { Select } from '@/shared/ui/select'
import type { Address, Contact, DeliveryMethod, Payment } from '../../model/checkout'
import './checkout-steps.css'

type Errors = Record<string, string | undefined>

interface ContactStepProps {
  value: Contact
  errors: Errors
  onChange: (value: Contact) => void
}

export function ContactStep({ value, errors, onChange }: ContactStepProps) {
  return (
    <div className="checkout-fields">
      <Field label="Имя" value={value.name} error={errors.name} onChange={(v) => onChange({ ...value, name: v })} />
      <Field
        label="Телефон"
        type="tel"
        placeholder="+7"
        value={value.phone}
        error={errors.phone}
        onChange={(v) => onChange({ ...value, phone: cleanPhone(v) })}
      />
      <Field label="Электронная почта" type="email" value={value.email} error={errors.email} onChange={(v) => onChange({ ...value, email: v })} />
    </div>
  )
}

interface DeliveryStepProps {
  method: DeliveryMethod
  address: Address
  shopId: number
  errors: Errors
  onMethod: (method: DeliveryMethod) => void
  onAddress: (address: Address) => void
  onShop: (id: number) => void
}

export function DeliveryStep({ method, address, shopId, errors, onMethod, onAddress, onShop }: DeliveryStepProps) {
  const shop = SHOPS.find((item) => item.id === shopId) ?? SHOPS[0]

  return (
    <div className="checkout-delivery">
      <div className="checkout-methods">
        <Choice type="radio" name="method" label="Доставка курьером" checked={method === 'courier'} onChange={() => onMethod('courier')} />
        <Choice type="radio" name="method" label="Самовывоз" checked={method === 'pickup'} onChange={() => onMethod('pickup')} />
      </div>

      {method === 'courier' ? (
        <div className="checkout-fields">
          <Field label="Город" value={address.city} error={errors.city} onChange={(v) => onAddress({ ...address, city: v })} />
          <Field label="Улица" value={address.street} error={errors.street} onChange={(v) => onAddress({ ...address, street: v })} />
          <Field label="Дом" value={address.house} error={errors.house} onChange={(v) => onAddress({ ...address, house: v })} />
          <Field label="Квартира" value={address.flat} onChange={(v) => onAddress({ ...address, flat: v })} />
          <Field label="Комментарий курьеру" value={address.comment} onChange={(v) => onAddress({ ...address, comment: v })} />
        </div>
      ) : (
        <div className="checkout-fields">
          <Select
            label="Выберите пункт самовывоза"
            value={shop.address}
            options={SHOPS.map((item) => item.city + ', ' + item.address)}
            onChange={(value) => {
              const found = SHOPS.find((item) => item.city + ', ' + item.address === value)
              if (found) onShop(found.id)
            }}
          />
          <p className="checkout-note">Заказ будет готов к выдаче в течение дня. Телефон магазина: {shop.phone}</p>
        </div>
      )}
    </div>
  )
}

interface PaymentStepProps {
  value: Payment
  onChange: (value: Payment) => void
}

export function PaymentStep({ value, onChange }: PaymentStepProps) {
  return (
    <div className="checkout-delivery">
      <div className="checkout-methods checkout-methods-column">
        <Choice type="radio" name="payment" label="Оплата при получении" checked={value === 'receipt'} onChange={() => onChange('receipt')} />
        <Choice type="radio" name="payment" label="Банковской картой онлайн" checked={value === 'online'} onChange={() => onChange('online')} />
      </div>
      <p className="checkout-note">Нажимая «Подтвердить заказ», вы соглашаетесь на обработку персональных данных.</p>
    </div>
  )
}
