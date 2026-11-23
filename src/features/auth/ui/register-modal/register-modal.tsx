import { useState } from 'react'
import type { FormEvent } from 'react'
import { cleanPhone, isEmail, isFilled, isPhone, isStrongPassword } from '@/shared/lib/validate'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import type { User } from '../../model/auth'

interface RegisterValues {
  name: string
  email: string
  phone: string
  password: string
  repeat: string
}

type RegisterErrors = Partial<Record<keyof RegisterValues, string>>

const EMPTY: RegisterValues = { name: '', email: '', phone: '', password: '', repeat: '' }

function validate(values: RegisterValues): RegisterErrors {
  const errors: RegisterErrors = {}

  if (!isFilled(values.name)) errors.name = 'Введите имя'
  if (!isEmail(values.email)) errors.email = 'Введите правильный email'
  if (!isPhone(values.phone)) errors.phone = 'Введите правильный номер телефона'
  if (!isStrongPassword(values.password)) errors.password = 'Не меньше 8 символов, буквы и цифры'
  if (values.password !== values.repeat) errors.repeat = 'Пароли не совпадают'

  return errors
}

interface RegisterModalProps {
  onClose: () => void
  onLogin: () => void
  onSuccess: (user: User) => void
}

export function RegisterModal({ onClose, onLogin, onSuccess }: RegisterModalProps) {
  const [values, setValues] = useState<RegisterValues>(EMPTY)
  const [errors, setErrors] = useState<RegisterErrors>({})

  function set(field: keyof RegisterValues, value: string) {
    setValues({ ...values, [field]: field === 'phone' ? cleanPhone(value) : value })
    setErrors({ ...errors, [field]: undefined })
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)

    if (Object.keys(found).length === 0) {
      onSuccess({ name: values.name.trim(), phone: values.phone })
    }
  }

  return (
    <Modal label="Регистрация" onClose={onClose}>
      <h2 className="modal-title">Регистрация</h2>
      <form className="modal-form" onSubmit={submit} noValidate>
        <Field label="Имя" value={values.name} error={errors.name} onChange={(v) => set('name', v)} />
        <Field label="Электронная почта" type="email" value={values.email} error={errors.email} onChange={(v) => set('email', v)} />
        <Field label="Телефон" type="tel" placeholder="+7" value={values.phone} error={errors.phone} onChange={(v) => set('phone', v)} />
        <Field label="Пароль" type="password" value={values.password} error={errors.password} onChange={(v) => set('password', v)} />
        <Field label="Повторите пароль" type="password" value={values.repeat} error={errors.repeat} onChange={(v) => set('repeat', v)} />
        <Button type="submit" variant="black" full>
          Регистрация
        </Button>
        <p className="modal-note">
          Уже есть аккаунт?{' '}
          <button type="button" className="link-orange" onClick={onLogin}>
            Войти
          </button>
        </p>
      </form>
    </Modal>
  )
}
