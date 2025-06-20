import { getCollection } from 'astro:content'
import { MOCK_MODE, generateMockPosts } from './mockData'

export type BlogPost = Omit<
  Awaited<ReturnType<typeof getCollection>>[number]['data'],
  'draft'
> & {
  slug: string
}

export interface PostsData {
  allPosts: BlogPost[]
  initialPosts: BlogPost[]
}

/**
 * Get all blog posts - either from real content or mock data
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  let posts: BlogPost[] = []

  if (MOCK_MODE) {
    // Use mock data
    posts = generateMockPosts(1000)
    console.log(`🎭 Mock Mode: Generated ${posts.length} mock posts`)
  } else {
    // Use real data from content collection
    const realPosts = await getCollection('blog', ({ data }) => {
      return !data.draft
    })

    posts = realPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      heroImage: post.data.heroImage,
      tags: post.data.tags,
      slug: post.slug,
    }))

    // Sort by publication date
    posts.sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
    )
  }

  return posts
}

/**
 * Get posts data for the page with pagination
 */
export async function getPostsData(
  postsPerPage: number = 20,
): Promise<PostsData> {
  const allPosts = await getAllPosts()
  const initialPosts = allPosts.slice(0, postsPerPage)

  return {
    allPosts,
    initialPosts,
  }
}

/**
 * Format date for display
 */
export function formatDate(date: Date, locale: string = 'th-TH'): string {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Generate blog post URL
 */
export function getPostUrl(slug: string): string {
  return `/blog/${slug}`
}

/**
 * Check if post has image
 */
export function hasImage(post: BlogPost): boolean {
  return Boolean(post.heroImage)
}

/**
 * Get post excerpt
 */
export function getPostExcerpt(
  post: BlogPost,
  maxLength: number = 150,
): string {
  return truncateText(post.description, maxLength)
}

/**
 * Filter posts by tag
 */
export function filterPostsByTag(posts: BlogPost[], tag: string): BlogPost[] {
  return posts.filter((post) =>
    post.tags.some((postTag) =>
      postTag.toLowerCase().includes(tag.toLowerCase()),
    ),
  )
}

/**
 * Get unique tags from posts
 */
export function getUniqueTags(posts: BlogPost[]): string[] {
  const tags = posts.flatMap((post) => post.tags)
  return [...new Set(tags)].sort()
}

/**
 * Search posts by title or description
 */
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const searchTerm = query.toLowerCase()
  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.description.toLowerCase().includes(searchTerm),
  )
}
