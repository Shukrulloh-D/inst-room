import { Link } from 'react-router-dom'
import { IMAGES } from '@/shared/config/images'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import './hero.css'

export function Hero() {
  return (
    <section className="container hero">
      <div className="hero-main">
        <img src={IMAGES.home.hero1} alt="" />
        <div className="hero-main-text">
          <h1>DeWALT — Инструмент с настоящим характером</h1>
          <Button to="/catalog/instrument">Перейти в каталог</Button>
        </div>
      </div>

      <Link to="/collection/sale" className="hero-tile hero-tile-tall">
        <img src={IMAGES.home.hero2} alt="" />
        <span>Акции</span>
        <i>
          <Icon name="arrow-right" size={14} />
        </i>
      </Link>

      <Link to="/collection/new" className="hero-tile">
        <img src={IMAGES.home.hero3} alt="" />
        <span>Новинки инструмента</span>
        <i>
          <Icon name="arrow-right" size={14} />
        </i>
      </Link>

      <Link to="/collection/hits" className="hero-tile">
        <img src={IMAGES.home.hero4} alt="" />
        <span>Акции и скидки</span>
        <i>
          <Icon name="arrow-right" size={14} />
        </i>
      </Link>
    </section>
  )
}
