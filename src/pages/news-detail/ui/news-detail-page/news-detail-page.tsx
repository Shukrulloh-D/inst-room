import { useParams } from 'react-router-dom'
import { findNews } from '@/entities/news'
import { IMAGES } from '@/shared/config/images'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
import { EmptyState } from '@/shared/ui/empty-state'
import './news-detail-page.css'

const PARAGRAPH =
  'Рынок товаров для дома и ремонта продолжает расти: покупатели чаще выбирают качественный инструмент и проверенные материалы. Компании отмечают, что вместе со спросом растёт интерес к консультациям и сервису, поэтому мы расширяем ассортимент и обучаем продавцов.'

export function NewsDetailPage() {
  const { id } = useParams()
  const news = findNews(id)

  if (!news) {
    return <EmptyState title="Новость не найдена" to="/" button="На главную" />
  }

  return (
    <div className="container page">
      <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Новости' }, { label: news.title }]} />
      <h1 className="page-title news-detail-title">{news.title}</h1>
      <p className="news-detail-date">{news.date}</p>

      <img className="news-detail-cover" src={IMAGES.newsDetail.cover} alt="" />

      <div className="news-detail-body">
        <p>{PARAGRAPH}</p>
        <blockquote>
          Спрос на инструменты для домохозяйств вырос на 38% за год, и мы ожидаем, что тенденция сохранится.
        </blockquote>
        <p>{PARAGRAPH}</p>
        <img src={IMAGES.newsDetail.photo} alt="" loading="lazy" />
        <h2>Онлайн — генератор прохожих спроса</h2>
        <ul>
          <li>Покупатели чаще сравнивают товары перед покупкой</li>
          <li>Растёт доля заказов с самовывозом из магазина</li>
          <li>Популярны наборы инструмента для дома и дачи</li>
        </ul>
        <p>{PARAGRAPH}</p>
        <img src={IMAGES.newsDetail.bottom} alt="" loading="lazy" />
      </div>
    </div>
  )
}
