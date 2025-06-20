// ระบบจัดการ Tags แบบง่ายๆ
export const VALID_TAGS = [
  'Astro',
  'Development',
  'Technology',
  'ธรรมะ',
  'ชีวิต',
  'การเรียนรู้',
  'ประสบการณ์',
]

// Helper functions
export const isValidTag = (tag: string) => {
  return VALID_TAGS.includes(tag)
}

// สำหรับใช้ใน Zod validation
export const validateTagsForZod = (tags: string[]) => {
  const invalidTags = tags.filter((tag) => !isValidTag(tag))
  return {
    isValid: invalidTags.length === 0,
    invalidTags,
    message:
      invalidTags.length > 0
        ? `❌ Invalid tags: "${invalidTags.join('", "')}"`
        : '',
  }
}
