import { Icon } from '@/shared/ui/icon'
import './quantity.css'

interface QuantityProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export function Quantity({ value, onChange, max = 99 }: QuantityProps) {
  return (
    <div className="quantity">
      <button aria-label="Меньше" disabled={value <= 1} onClick={() => onChange(value - 1)}>
        <Icon name="minus" size={12} />
      </button>
      <span>{value}</span>
      <button aria-label="Больше" disabled={value >= max} onClick={() => onChange(value + 1)}>
        <Icon name="plus" size={12} />
      </button>
    </div>
  )
}
