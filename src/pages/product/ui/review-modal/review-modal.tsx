import { useState } from 'react'
import type { FormEvent } from 'react'
import { isFilled } from '@/shared/lib/validate'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { Modal } from '@/shared/ui/modal'

interface ReviewModalProps {
  onClose: () => void
  onSubmit: (name: string, text: string) => void
}

export function ReviewModal({ onClose, onSubmit }: ReviewModalProps) {
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [errors, setErrors] = useState({ name: '', text: '' })

  function submit(event: FormEvent) {
    event.preventDefault()

    const found = {
      name: isFilled(name) ? '' : 'Введите имя',
      text: isFilled(text) ? '' : 'Напишите отзыв',
    }
    setErrors(found)

    if (!found.name && !found.text) onSubmit(name.trim(), text.trim())
  }

  return (
    <Modal label="Оставить отзыв" onClose={onClose}>
      <h2 className="modal-title">Оставить отзыв</h2>
      <form className="modal-form" onSubmit={submit} noValidate>
        <Field label="Ваше имя" value={name} error={errors.name} onChange={setName} />
        <Field label="Оставьте комментарий" multiline value={text} error={errors.text} onChange={setText} />
        <Button type="submit" full>
          Опубликовать
        </Button>
        <p className="modal-note">Нажимая на кнопку, вы соглашаетесь на обработку персональных данных</p>
      </form>
    </Modal>
  )
}
