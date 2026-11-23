import { Link } from 'react-router-dom'
import { NEWS } from '@/entities/news'
import { newsImage } from '@/shared/config/images'
import { Button } from '@/shared/ui/button'
import './news-block.css'

export function NewsBlock() {
  return (
    <section className="container news-block">
      <div className="news-block-text">
        <h2 className="block-title">Новости</h2>
        <p>
          Торговая и производственная компания делится новостями: новые поступления, советы мастеров и акции. Следите
          за обновлениями, чтобы не пропустить выгодные предложения.
        </p>
        <Button to={'/news/' + NEWS[0].id}>Перейти к новостям</Button>
      </div>

      <ul className="news-block-list">
        {NEWS.map((item, index) => (
          <li key={item.id}>
            <Link to={'/news/' + item.id}>
              <img src={newsImage(index)} alt="" loading="lazy" />
              <b>{item.title}</b>
              <span>{item.date}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
