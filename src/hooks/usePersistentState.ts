import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { loadFromStorage, saveToStorage } from '../services/storage/localStorage'

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => loadFromStorage<T>(key, initialValue))

  useEffect(() => {
    saveToStorage(key, value)
  }, [key, value])

  return [value, setValue]
}
