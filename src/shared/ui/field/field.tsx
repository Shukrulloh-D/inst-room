import { useId } from 'react'
import './field.css'

interface FieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'tel' | 'password'
  multiline?: boolean
  error?: string
  maxLength?: number
}

export function Field({ label, value, onChange, placeholder, type = 'text', multiline, error, maxLength = 100 }: FieldProps) {
  const id = useId()

  return (
    <div className={error ? 'field field-error' : 'field'}>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className="field-input field-textarea"
          value={value}
          placeholder={placeholder}
          maxLength={1000}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          className="field-input"
          type={type}
          value={value}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {error && <p className="field-message">{error}</p>}
    </div>
  )
}
