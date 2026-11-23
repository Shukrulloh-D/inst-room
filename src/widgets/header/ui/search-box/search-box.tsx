import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchProducts } from '@/entities/catalog'
import { productImage } from '@/shared/config/images'
import { formatPrice } from '@/shared/lib/format'
import { useOutsideClose } from '@/shared/lib/use-outside-click'
import { Icon } from '@/shared/ui/icon'
import './search-box.css'

export function SearchBox() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  useOutsideClose(rootRef, open, () => setOpen(false))

  const text = query.trim()
  const found = text.length >= 2 ? searchProducts(text) : []

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!text) return

    setOpen(false)
    navigate('/search?q=' + encodeURIComponent(text))
  }

  return (
    <form className="search-box" ref={rootRef} onSubmit={submit} role="search">
      <input
        type="search"
        value={query}
        maxLength={100}
        placeholder="Поиск по каталогу"
        aria-label="Поиск по каталогу"
        onChange={(event) => {
          setQuery(event.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />
      <button type="submit" aria-label="Найти">
        <Icon name="search" size={16} />
      </button>

      {open && text.length >= 2 && (
        <div className="search-box-panel">
          {found.length === 0 ? (
            <p className="search-box-empty">Нет результатов</p>
          ) : (
            <>
              <ul>
                {found.slice(0, 6).map((product) => (
                  <li key={product.id}>
                    <Link to={'/product/' + product.id} onClick={() => setOpen(false)}>
                      <img src={productImage(product.imageIndex)} alt="" width={28} height={28} />
                      <span>{product.name}</span>
                      <b>{formatPrice(product.price)}</b>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                className="search-box-all"
                to={'/search?q=' + encodeURIComponent(text)}
                onClick={() => setOpen(false)}
              >
                Показать все ({found.length})
              </Link>
            </>
          )}
        </div>
      )}
    </form>
  )
}
