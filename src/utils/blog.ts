import { getCollection } from 'astro:content'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

export interface BlogPost {
  slug: string
  data: {
    title: string
    description: string
    pubDate: Date
    updatedDate?: Date
    heroImage?: string
    tags: string[]
    draft: boolean
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => {
    return !data.draft
  })

  return posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  )
}

export function filterPostsBySearch(
  posts: BlogPost[],
  query: string,
): BlogPost[] {
  if (!query) return posts

  const lowerQuery = query.toLowerCase()
  return posts.filter(
    (post) =>
      post.data.title.toLowerCase().includes(lowerQuery) ||
      post.data.description.toLowerCase().includes(lowerQuery) ||
      post.data.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  )
}

export function filterPostsByDate(posts: BlogPost[], date: string): BlogPost[] {
  if (!date) return posts

  const targetDate = new Date(date)
  return posts.filter(
    (post) => format(post.data.pubDate, 'yyyy-MM-dd') === date,
  )
}

export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  if (!tag) return posts

  return posts.filter((post) => post.data.tags.includes(tag))
}

export function getAllTags(posts: BlogPost[]): string[] {
  return [...new Set(posts.flatMap((post) => post.data.tags))]
}

export function getPostsByDateRange(
  posts: BlogPost[],
  startDate: Date,
  endDate: Date,
): BlogPost[] {
  return posts.filter((post) => {
    const postDate = post.data.pubDate
    return postDate >= startDate && postDate <= endDate
  })
}

export function formatDate(date: Date): string {
  return format(date, 'dd MMMM yyyy', { locale: th })
}

export function getPostDates(posts: BlogPost[]): Date[] {
  return posts.map((post) => post.data.pubDate)
}
