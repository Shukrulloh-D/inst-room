// всё, что лежит в localStorage, пользователь может подменить:
// читаем безопасно и проверяем данные функцией parse

export function readStored<T>(key: string, parse: (data: unknown) => T): T {
  try {
    const raw = localStorage.getItem(key)
    return parse(raw ? JSON.parse(raw) : null)
  } catch {
    return parse(null)
  }
}

export function writeStored(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // хранилище недоступно (приватный режим), работаем без него
  }
}
