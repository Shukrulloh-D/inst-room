import { Link } from 'react-router-dom'
import { CATEGORIES } from '@/entities/catalog'
import { IMAGES } from '@/shared/config/images'
import { SITE, phoneHref } from '@/shared/config/site'
import { Icon } from '@/shared/ui/icon'
import './footer.css'

const YEAR = new Date().getFullYear()

const COMPANY_LINKS = [
  { label: 'О компании', to: '/about' },
  { label: 'Контакты', to: '/contacts' },
  { label: 'Новинки', to: '/collection/new' },
  { label: 'Хиты сезона', to: '/collection/hits' },
  { label: 'Распродажи', to: '/collection/sale' },
  { label: 'Бренды', to: '/brands' },
]

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <nav aria-label="Каталог">
          <ul className="footer-links">
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link to={'/catalog/' + category.slug}>{category.title}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Компания">
          <ul className="footer-links">
            {COMPANY_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-contacts">
          <img src={IMAGES.logo} alt="Inst room" width={96} height={40} />
          {SITE.phones.map((phone) => (
            <a key={phone} href={phoneHref(phone)}>
              {phone}
            </a>
          ))}
          <ul className="footer-socials">
            <li>
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={14} />
              </a>
            </li>
            <li>
              <a href={SITE.vk} target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте">
                <Icon name="vk" size={14} />
              </a>
            </li>
            <li>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Icon name="facebook" size={14} />
              </a>
            </li>
          </ul>
          <p className="footer-note">Согласие на обработку персональных данных. © {YEAR} Inst room. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
