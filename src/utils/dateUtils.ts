import { format } from 'date-fns'
import { th } from 'date-fns/locale'

export function formatThaiDate(date: Date): string {
  return format(date, 'dd MMMM yyyy', { locale: th })
}

export function formatDateISO(date: Date): string {
  return date.toISOString()
}

export function formatRelativeDate(date: Date): string {
  const now = new Date()
  const diffInDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffInDays === 0) {
    return 'วันนี้'
  } else if (diffInDays === 1) {
    return 'เมื่อวาน'
  } else if (diffInDays < 7) {
    return `${diffInDays} วันที่แล้ว`
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7)
    return `${weeks} สัปดาห์ที่แล้ว`
  } else {
    return formatThaiDate(date)
  }
}
