import type { InferEntrySchema } from 'astro:content'

export type BlogProps = InferEntrySchema<'blog'> & {
  slug: string
}
