import { BRANDS } from './brands'
import { CATEGORIES } from './categories'

export type Badge = 'Новинка' | 'Хит' | 'Акция'

export interface Product {
  id: string
  name: string
  categorySlug: string
  subSlug: string
  brandSlug: string
  country: string
  color: string
  price: number
  oldPrice?: number
  inStock: boolean
  badge?: Badge
  pickup: boolean
  courier: boolean
  imageIndex: number
  popularity: number
  description: string
  specs: Array<[string, string]>
}

// номер картинки = номер товара в этом списке (см. public/images/products)
const TYPES = [
  'Эмаль Condor ПФ-115 жёлтая 1,8 кг',
  'Краска Condor Objekt белая 14 кг',
  'Бита крестовая PH2 Condor',
  'Отвёртка диэлектрическая Condor',
  'Куртка рабочая Condor',
  'Каска защитная оранжевая',
  'Ножницы по металлу Condor',
  'Вилы садовые усиленные',
  'Пена монтажная Condor',
  'Лопата штыковая',
  'Пистолет для монтажной пены',
  'Диск шлифовальный 125 мм',
]

export const COUNTRIES = ['Россия', 'Германия', 'Польша', 'Италия', 'Китай', 'Беларусь']
export const COLORS = ['Белый', 'Голубой', 'Жёлтый', 'Зелёный', 'Красный', 'Оранжевый', 'Розовый']

const SPEC_VALUES: Array<[string, string[]]> = [
  ['Тип', ['Эмаль', 'Краска', 'Грунт', 'Лак']],
  ['Назначение', ['Для деревянных поверхностей', 'Для металла', 'Для внутренних работ', 'Универсальное']],
  ['Тип работ', ['Наружные, внутренние', 'Внутренние', 'Наружные']],
  ['Основа', ['Акриловая', 'Алкидная', 'Водно-дисперсионная']],
  ['Разбавитель', ['Вода', 'Уайт-спирит', 'Не требуется']],
  ['Степень блеска', ['Глянцевая', 'Матовая', 'Полуматовая']],
  ['Вес', ['1,8 кг', '2,5 кг', '14 кг', '0,9 кг']],
  ['Расход', ['6-8 м² на 1 кг', '8-10 м² на 1 кг', '10-12 м² на 1 кг']],
]

const DESCRIPTION =
  'Быстросохнущая, высокоукрывистая защита от атмосферных воздействий, обеспечивает долговечность и эстетичный вид поверхности. Подходит для профессионального и домашнего использования, имеет сертификаты качества.'

function buildProducts(): Product[] {
  const list: Product[] = []
  let subIndex = 0

  for (const category of CATEGORIES) {
    for (const sub of category.subs) {
      for (let n = 0; n < 24; n++) {
        const type = (n + subIndex) % TYPES.length
        const price = 100 + ((subIndex * 37 + n * 113) % 49) * 100
        const color = COLORS[(n * 2 + subIndex) % COLORS.length]

        let badge: Badge | undefined
        if (n % 5 === 0) badge = 'Новинка'
        else if (n % 7 === 3) badge = 'Хит'
        else if (n % 6 === 2) badge = 'Акция'

        list.push({
          id: sub.slug + '-' + (n + 1),
          name: TYPES[type],
          categorySlug: category.slug,
          subSlug: sub.slug,
          brandSlug: BRANDS[(n * 3 + subIndex) % BRANDS.length].slug,
          country: COUNTRIES[(n + subIndex) % COUNTRIES.length],
          color,
          price,
          oldPrice: badge === 'Акция' ? Math.round((price * 1.25) / 10) * 10 : undefined,
          inStock: n % 9 !== 4,
          badge,
          pickup: n % 4 !== 3,
          courier: n % 5 !== 2,
          imageIndex: type,
          popularity: (n * 7 + subIndex * 3) % 100,
          description: DESCRIPTION,
          specs: [
            ...SPEC_VALUES.slice(0, 5).map(([key, values]): [string, string] => [key, values[(n + subIndex) % values.length]]),
            ['Цвет', color] as [string, string],
            ...SPEC_VALUES.slice(5).map(([key, values]): [string, string] => [key, values[(n + subIndex) % values.length]]),
          ],
        })
      }
      subIndex++
    }
  }

  return list
}

export const PRODUCTS: Product[] = buildProducts()

export function findProduct(id: string | undefined): Product | undefined {
  return PRODUCTS.find((product) => product.id === id)
}

export function productsInSub(subSlug: string): Product[] {
  return PRODUCTS.filter((product) => product.subSlug === subSlug)
}

export function productsByBrand(brandSlug: string): Product[] {
  return PRODUCTS.filter((product) => product.brandSlug === brandSlug)
}

export function productsByBadge(badge: Badge): Product[] {
  return PRODUCTS.filter((product) => product.badge === badge)
}

export function searchProducts(query: string): Product[] {
  const text = query.trim().toLowerCase().slice(0, 100)
  if (!text) return []
  return PRODUCTS.filter((product) => product.name.toLowerCase().includes(text))
}

export function productsInCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((product) => product.categorySlug === categorySlug)
}
