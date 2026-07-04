export function cleanText(value: string) {
  try {
    return decodeURIComponent(escape(value))
  } catch {
    return value
  }
}
