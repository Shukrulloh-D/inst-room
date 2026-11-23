import { IMAGES } from '@/shared/config/images'
import { Button } from '@/shared/ui/button'
import './not-found-page.css'

export function NotFoundPage() {
  return (
    <section className="not-found">
      <img className="not-found-image" src={IMAGES.common.notFound} alt="" />
      <div className="not-found-content">
        <h1>К сожалению, страница не найдена</h1>
        <p>Мы обязательно всё починим, а пока попробуйте вернуться на главную.</p>
        <Button to="/">Вернуться на главную</Button>
        <p className="not-found-code">404</p>
      </div>
    </section>
  )
}
