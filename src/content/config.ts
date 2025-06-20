import { defineCollection, z } from 'astro:content'
import { validateTagsForZod } from '../utils/tags'

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    tags: z
      .array(z.string())
      .default([])
      .refine(
        (tags) => validateTagsForZod(tags).isValid,
        (tags) => {
          const validation = validateTagsForZod(tags)
          return {
            message: validation.message || 'Invalid tags detected',
          }
        },
      ),
    draft: z.boolean().default(false),
  }),
})

export const collections = {
  blog: blogCollection,
}
