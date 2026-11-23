import { Icon } from '@/shared/ui/icon'
import './pagination.css'

interface PaginationProps {
  page: number
  total: number
  onChange: (page: number) => void
}

export function Pagination({ page, total, onChange }: PaginationProps) {
  if (total <= 1) return null

  const pages = Array.from({ length: total }, (_, index) => index + 1)

  return (
    <nav className="pagination" aria-label="Страницы">
      <button className="pagination-arrow" aria-label="Назад" disabled={page === 1} onClick={() => onChange(page - 1)}>
        <Icon name="chevron-left" size={12} />
      </button>
      {pages.map((number) => (
        <button
          key={number}
          className={number === page ? 'pagination-item pagination-active' : 'pagination-item'}
          aria-current={number === page}
          onClick={() => onChange(number)}
        >
          {number}
        </button>
      ))}
      <button className="pagination-arrow" aria-label="Вперёд" disabled={page === total} onClick={() => onChange(page + 1)}>
        <Icon name="chevron-right" size={12} />
      </button>
    </nav>
  )
}
