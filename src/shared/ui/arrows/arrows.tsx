import { Icon } from '@/shared/ui/icon'
import './arrows.css'

interface ArrowsProps {
  onPrev: () => void
  onNext: () => void
  canPrev?: boolean
  canNext?: boolean
}

export function Arrows({ onPrev, onNext, canPrev = true, canNext = true }: ArrowsProps) {
  return (
    <div className="arrows">
      <button aria-label="Назад" disabled={!canPrev} onClick={onPrev}>
        <Icon name="chevron-left" size={12} />
      </button>
      <button aria-label="Вперёд" disabled={!canNext} onClick={onNext}>
        <Icon name="chevron-right" size={12} />
      </button>
    </div>
  )
}
