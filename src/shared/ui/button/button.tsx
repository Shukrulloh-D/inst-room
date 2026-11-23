import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './button.css'

interface ButtonProps {
  children: ReactNode
  variant?: 'orange' | 'black' | 'outline' | 'gray'
  to?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  full?: boolean
  onClick?: () => void
}

export function Button({ children, variant = 'orange', to, type = 'button', disabled, full, onClick }: ButtonProps) {
  let className = 'button button-' + variant
  if (full) className += ' button-full'

  if (to) {
    return (
      <Link to={to} className={className} onClick={onClick}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  )
}
