import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BRANDS } from '@/entities/catalog'
import { brandImage } from '@/shared/config/images'
import { Arrows } from '@/shared/ui/arrows'
import './brands-strip.css'

const PER_PAGE = 6

export function BrandsStrip() {
  const [start, setStart] = useState(0)
  const visible = BRANDS.slice(start, start + PER_PAGE)

  return (
    <section className="brands-strip">
      <div className="container">
        <div className="brands-strip-head">
          <h2 className="block-title">Наши бренды</h2>
          <Arrows
            canPrev={start > 0}
            canNext={start + PER_PAGE < BRANDS.length}
            onPrev={() => setStart(start - 1)}
            onNext={() => setStart(start + 1)}
          />
        </div>
        <ul className="brands-strip-list">
          {visible.map((brand) => (
            <li key={brand.slug}>
              <Link to={'/brands/' + brand.slug}>
                <img src={brandImage(BRANDS.indexOf(brand))} alt={brand.name} loading="lazy" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
