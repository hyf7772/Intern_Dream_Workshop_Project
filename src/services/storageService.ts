const readLocal = <T,>(key: string, fallback: T): T => {
  try {
    const value = window.localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

const writeLocal = (key: string, value: unknown) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // 本地存储不可用时，页面仍可继续使用内存状态。
  }
}

export const storageService = {
  readLocal,
  writeLocal,
}
