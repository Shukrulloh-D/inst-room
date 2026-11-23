import { IMAGES } from '@/shared/config/images'
import { Button } from '@/shared/ui/button'
import './about-block.css'

export function AboutBlock() {
  return (
    <section className="about-block">
      <div className="container about-block-inner">
        <img src={IMAGES.home.about} alt="" loading="lazy" />
        <div>
          <h2 className="block-title">О нас</h2>
          <p>
            Торговая и производственная компания, предлагающая широкий ассортимент инструмента, малярных и
            электротоваров, спецодежды и товаров для дома и дачи. Мы работаем напрямую с производителями, поэтому
            держим честные цены и следим за качеством.
          </p>
          <p>
            Наши магазины работают в Москве и Санкт-Петербурге, а заказать товары можно на сайте с доставкой по всей
            России.
          </p>
          <Button variant="black" to="/catalog">
            Перейти в каталог
          </Button>
        </div>
      </div>
    </section>
  )
}
