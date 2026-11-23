export const SITE = {
  name: 'Inst room',
  hours: 'Время работы: 10:00–20:00',
  phones: ['+7 495 123-32-34', '+7 495 123-32-35'],
  instagram: 'https://www.instagram.com/',
  vk: 'https://vk.com/',
  facebook: 'https://www.facebook.com/',
}

export function phoneHref(phone: string): string {
  return 'tel:' + phone.replace(/[^\d+]/g, '')
}

export const NAV_LINKS = [
  { label: 'О компании', to: '/about' },
  { label: 'Акции', to: '/collection/sale' },
  { label: 'Хиты сезона', to: '/collection/hits' },
  { label: 'Новинки', to: '/collection/new' },
]
