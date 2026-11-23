import { useId } from 'react'
import './select.css'

interface SelectProps {
  label?: string
  value: string
  options: string[]
  onChange: (value: string) => void
  placeholder?: string
}

export function Select({ label, value, options, onChange, placeholder }: SelectProps) {
  const id = useId()

  return (
    <div className="select">
      {label && (
        <label className="select-label" htmlFor={id}>
          {label}
        </label>
      )}
      <select id={id} className="select-input" value={value} onChange={(event) => onChange(event.target.value)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
