export function isFilled(value: string): boolean {
  return value.trim().length > 0
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

export function isPhone(value: string): boolean {
  const digits = value.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 13
}

// в телефон пропускаем только цифры и знаки + ( ) -
export function cleanPhone(value: string): string {
  return value.replace(/[^\d+\s()-]/g, '')
}

// пароль: от 8 символов, есть буква и цифра
export function isStrongPassword(value: string): boolean {
  return value.length >= 8 && /[A-Za-zА-Яа-я]/.test(value) && /\d/.test(value)
}
