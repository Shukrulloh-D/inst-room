export interface NewsItem {
  id: number
  title: string
  date: string
}

export const NEWS: NewsItem[] = [
  { id: 1, title: 'Спрос на инструменты для домохозяйств вырос на 38% за год', date: '12 января 2021' },
  { id: 2, title: 'Новая коллекция садового инвентаря уже в продаже', date: '5 февраля 2021' },
  { id: 3, title: 'Как выбрать краску для фасада: советы мастеров', date: '18 февраля 2021' },
  { id: 4, title: 'Открытие нового магазина в Санкт-Петербурге', date: '2 марта 2021' },
]

export function findNews(id: string | undefined): NewsItem | undefined {
  return NEWS.find((item) => String(item.id) === id)
}
