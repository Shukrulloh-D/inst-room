import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '@/features/auth'
import { cleanPhone, isEmail, isFilled, isPhone, isStrongPassword } from '@/shared/lib/validate'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import './profile-form.css'

interface ProfileValues {
  name: string
  email: string
  phone: string
  city: string
  password: string
  repeat: string
}

type ProfileErrors = Partial<Record<keyof ProfileValues, string>>

function validate(values: ProfileValues): ProfileErrors {
  const errors: ProfileErrors = {}

  if (!isFilled(values.name)) errors.name = 'Введите имя'
  if (!isEmail(values.email)) errors.email = 'Введите правильный email'
  if (!isPhone(values.phone)) errors.phone = 'Введите правильный номер'

  // пароль меняем, только если его ввели
  if (values.password && !isStrongPassword(values.password)) errors.password = 'Не меньше 8 символов, буквы и цифры'
  if (values.password !== values.repeat) errors.repeat = 'Пароли не совпадают'

  return errors
}

export function ProfileForm() {
  const { user } = useAuth()
  const [values, setValues] = useState<ProfileValues>({
    name: user?.name ?? '',
    email: '',
    phone: user?.phone ?? '',
    city: '',
    password: '',
    repeat: '',
  })
  const [errors, setErrors] = useState<ProfileErrors>({})
  const [saved, setSaved] = useState(false)

  function set(field: keyof ProfileValues, value: string) {
    setValues({ ...values, [field]: field === 'phone' ? cleanPhone(value) : value })
    setErrors({ ...errors, [field]: undefined })
    setSaved(false)
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    setSaved(Object.keys(found).length === 0)
  }

  return (
    <form className="profile-form" onSubmit={submit} noValidate>
      <h2 className="block-title">Личные данные</h2>
      <div className="profile-form-grid">
        <Field label="Имя" value={values.name} error={errors.name} onChange={(v) => set('name', v)} />
        <Field label="Электронная почта" type="email" value={values.email} error={errors.email} onChange={(v) => set('email', v)} />
        <Field label="Телефон" type="tel" value={values.phone} error={errors.phone} onChange={(v) => set('phone', v)} />
        <Field label="Город" value={values.city} onChange={(v) => set('city', v)} />
      </div>

      <h2 className="block-title">Изменение пароля</h2>
      <div className="profile-form-grid">
        <Field label="Новый пароль" type="password" value={values.password} error={errors.password} onChange={(v) => set('password', v)} />
        <Field label="Повторите пароль" type="password" value={values.repeat} error={errors.repeat} onChange={(v) => set('repeat', v)} />
      </div>

      <div className="profile-form-actions">
        <Button type="submit">Сохранить</Button>
        {saved && (
          <p className="profile-form-saved" role="status">
            Данные сохранены
          </p>
        )}
      </div>
    </form>
  )
}
