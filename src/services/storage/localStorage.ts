export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const rawValue = window.localStorage.getItem(key)

    return rawValue ? (JSON.parse(rawValue) as T) : fallback
  } catch {
    return fallback
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value))
}
