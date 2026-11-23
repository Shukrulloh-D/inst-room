export interface Shop {
  id: number
  city: string
  address: string
  phone: string
  lat: number
  lon: number
}

export const SHOPS: Shop[] = [
  { id: 1, city: 'Москва', address: 'ул. Дубровская, 15', phone: '+7 495 123-32-34', lat: 55.7129, lon: 37.6733 },
  { id: 2, city: 'Москва', address: 'ул. Марксистская, 120', phone: '+7 495 783-33-12', lat: 55.7405, lon: 37.6504 },
  { id: 3, city: 'Москва', address: 'ул. Мира, 2', phone: '+7 495 568-12-11', lat: 55.7826, lon: 37.6335 },
  { id: 4, city: 'Санкт-Петербург', address: 'Невский пр., 28', phone: '+7 812 123-45-67', lat: 59.9356, lon: 30.3258 },
  { id: 5, city: 'Санкт-Петербург', address: 'Лиговский пр., 50', phone: '+7 812 765-43-21', lat: 59.9235, lon: 30.3566 },
]

export const SHOP_CITIES = ['Москва', 'Санкт-Петербург']
