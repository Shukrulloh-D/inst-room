import { useState } from 'react'
import type { FormEvent } from 'react'
import { cleanPhone, isFilled, isPhone } from '@/shared/lib/validate'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'

export function CallbackModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [question, setQuestion] = useState('')
  const [errors, setErrors] = useState({ name: '', phone: '' })
  const [sent, setSent] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()

    const found = {
      name: isFilled(name) ? '' : 'Введите имя',
      phone: isPhone(phone) ? '' : 'Введите правильный номер',
    }
    setErrors(found)

    if (!found.name && !found.phone) setSent(true)
  }

  if (sent) {
    return (
      <Modal label="Спасибо" onClose={onClose}>
        <h2 className="modal-title">Ваша заявка принята</h2>
        <p className="modal-text">Спасибо за обращение. Мы перезвоним вам в ближайшее время.</p>
        <Button full onClick={onClose}>
          Закрыть
        </Button>
      </Modal>
    )
  }

  return (
    <Modal label="Заказать звонок" onClose={onClose}>
      <h2 className="modal-title">Заказать звонок</h2>
      <form className="modal-form" onSubmit={submit} noValidate>
        <Field label="Ваше имя" value={name} error={errors.name} onChange={setName} />
        <Field
          label="Телефон"
          type="tel"
          placeholder="+7"
          value={phone}
          error={errors.phone}
          onChange={(value) => setPhone(cleanPhone(value))}
        />
        <Field label="Ваш вопрос" multiline value={question} onChange={setQuestion} />
        <Button type="submit" variant="black" full>
          Отправить
        </Button>
        <p className="modal-note">Нажимая на кнопку, вы соглашаетесь на обработку персональных данных</p>
      </form>
    </Modal>
  )
}
