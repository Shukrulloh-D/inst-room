export interface Brand {
  slug: string
  name: string
  description: string
}

const TEXT =
  'Предприятие выпускает качественные строительные и малярные материалы. Выгодная цена, высокое качество и широкий ассортимент делают продукцию популярной у мастеров и домашних умельцев. Товары сертифицированы и проверены.'

export const BRANDS: Brand[] = ['Truper', 'Kapro', 'Farbitex', 'Ceresit', 'Sniezka', 'Finland', 'Центр Инструмент', 'Condor'].map(
  (name) => ({ slug: name.toLowerCase().replace(/\s+/g, '-'), name, description: TEXT }),
)

export function findBrand(slug: string | undefined): Brand | undefined {
  return BRANDS.find((brand) => brand.slug === slug)
}

export function brandIndex(slug: string): number {
  return BRANDS.findIndex((brand) => brand.slug === slug)
}
