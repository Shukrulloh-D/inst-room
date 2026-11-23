import { useState } from 'react'
import type { FormEvent } from 'react'
import { cleanPhone, isPhone } from '@/shared/lib/validate'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'
import type { User } from '../../model/auth'

interface LoginModalProps {
  onClose: () => void
  onRegister: () => void
  onSuccess: (user: User) => void
}

export function LoginModal({ onClose, onRegister, onSuccess }: LoginModalProps) {
  const [step, setStep] = useState<'phone' | 'code'>('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')

  function sendCode(event: FormEvent) {
    event.preventDefault()

    if (!isPhone(phone)) {
      setError('Введите правильный номер телефона')
      return
    }

    setStep('code')
  }

  function checkCode(event: FormEvent) {
    event.preventDefault()

    // демо: настоящей проверки нет, подходит любой код из 4 цифр
    if (!/^\d{4}$/.test(code)) {
      setError('Введите 4 цифры из СМС')
      return
    }

    onSuccess({ name: 'Покупатель', phone })
  }

  return (
    <Modal label="Вход" onClose={onClose}>
      <h2 className="modal-title">{step === 'phone' ? 'Вход' : 'Введите код из СМС'}</h2>

      {step === 'phone' ? (
        <form className="modal-form" onSubmit={sendCode} noValidate>
          <Field
            label="Телефон"
            type="tel"
            placeholder="+7"
            value={phone}
            error={error}
            onChange={(value) => {
              setPhone(cleanPhone(value))
              setError('')
            }}
          />
          <Button type="submit" variant="black" full>
            Получить код
          </Button>
          <p className="modal-note">
            Нет аккаунта?{' '}
            <button type="button" className="link-orange" onClick={onRegister}>
              Зарегистрироваться
            </button>
          </p>
        </form>
      ) : (
        <form className="modal-form" onSubmit={checkCode} noValidate>
          <Field
            label="Код"
            placeholder="0000"
            maxLength={4}
            value={code}
            error={error}
            onChange={(value) => {
              setCode(value.replace(/\D/g, ''))
              setError('')
            }}
          />
          <Button type="submit" variant="black" full>
            Войти
          </Button>
          <p className="modal-note">Демо-версия: подойдёт любой код из 4 цифр</p>
        </form>
      )}
    </Modal>
  )
}
