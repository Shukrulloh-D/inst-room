import { Link } from 'react-router-dom'
import { IMAGES } from '@/shared/config/images'

export function Logo() {
  return (
    <Link to="/" aria-label="Inst room — на главную">
      <img src={IMAGES.logo} alt="Inst room" width={96} height={40} />
    </Link>
  )
}
