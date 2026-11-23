export interface SubCategory {
  slug: string
  title: string
}

export interface Category {
  slug: string
  title: string
  subs: SubCategory[]
}

function subs(pairs: string[][]): SubCategory[] {
  return pairs.map(([slug, title]) => ({ slug, title }))
}

export const CATEGORIES: Category[] = [
  {
    slug: 'malyarnye-tovary',
    title: 'Малярные товары',
    subs: subs([
      ['kraski-i-emali', 'Краски и эмали'],
      ['gruntovki', 'Грунтовки'],
      ['kisti-i-valiki', 'Кисти и валики'],
      ['shpateli', 'Шпатели'],
      ['malyarnyy-instrument', 'Малярный инструмент'],
      ['rastvoriteli', 'Растворители'],
    ]),
  },
  {
    slug: 'elektrooborudovanie',
    title: 'Электрооборудование',
    subs: subs([
      ['kabel-i-provod', 'Кабель и провод'],
      ['rozetki-i-vyklyuchateli', 'Розетки и выключатели'],
      ['lampy', 'Лампы'],
      ['udliniteli', 'Удлинители'],
      ['avtomaty-zashchity', 'Автоматы защиты'],
    ]),
  },
  {
    slug: 'specodezhda',
    title: 'Спецодежда',
    subs: subs([
      ['kurtki-i-kostyumy', 'Куртки и костюмы'],
      ['perchatki', 'Перчатки'],
      ['kaski-i-ochki', 'Каски и очки'],
      ['rabochaya-obuv', 'Рабочая обувь'],
      ['respiratory', 'Респираторы'],
    ]),
  },
  {
    slug: 'sezonnoe',
    title: 'Сезонное',
    subs: subs([
      ['snegouborka', 'Снегоуборочный инвентарь'],
      ['obogrevateli', 'Обогреватели'],
      ['pechnoe-litye', 'Печное литьё и аксессуары'],
      ['tovary-dlya-zimy', 'Товары для зимы'],
    ]),
  },
  {
    slug: 'dlya-doma-i-dachi',
    title: 'Для дома и дачи',
    subs: subs([
      ['sadovo-ogorodnyy-inventar', 'Садово-огородный инвентарь'],
      ['polivochnyy-inventar', 'Поливочный инвентарь'],
      ['pompovoe-oborudovanie', 'Помповое оборудование'],
      ['grunt', 'Грунт'],
      ['nasosy', 'Насосы'],
      ['setka-rabica', 'Сетка Рабица'],
      ['letniy-dush', 'Летний душ, умывальники'],
      ['pobelka', 'Побелка, краска садовая'],
      ['sadovyy-dekor', 'Садовый декор'],
      ['tovary-dlya-otdyha', 'Товары для отдыха'],
      ['teplicy', 'Теплицы и укрывной материал'],
      ['hozyaystvennye-tovary', 'Хозяйственные товары'],
    ]),
  },
  {
    slug: 'instrument',
    title: 'Инструмент',
    subs: subs([
      ['elektroinstrument', 'Электроинструмент'],
      ['ruchnoy-instrument', 'Ручной инструмент'],
      ['izmeritelnyy-instrument', 'Измерительный инструмент'],
      ['rashodniki', 'Расходные материалы'],
      ['krepezh', 'Крепёж'],
    ]),
  },
]

export function findCategory(slug: string | undefined): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug)
}

export function findSub(categorySlug: string | undefined, subSlug: string | undefined) {
  const category = findCategory(categorySlug)
  const sub = category?.subs.find((item) => item.slug === subSlug)

  if (!category || !sub) return undefined
  return { category, sub }
}
