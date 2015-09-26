/**
 * Wrappers for window.URL APIs
 */
const { File, URL } = global

export function createObjectURL (file: File): string {
  return URL.createObjectURL(file)
}

export function revokeObjectURL (url: string): void {
  URL.revokeObjectURL(url)
}
