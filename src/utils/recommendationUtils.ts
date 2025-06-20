import type { CollectionEntry } from 'astro:content'

export function getRecommendedPosts(
  allPosts: CollectionEntry<'blog'>[],
  currentSlug: string,
): CollectionEntry<'blog'>[] {
  // Sort posts by date (newest first)
  const sortedPosts = allPosts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  )

  // Find current post index
  const currentIndex = sortedPosts.findIndex((p) => p.slug === currentSlug)

  const recommended: CollectionEntry<'blog'>[] = []

  // Get 2 posts before
  for (let i = Math.max(0, currentIndex - 2); i < currentIndex; i++) {
    if (sortedPosts[i]) recommended.push(sortedPosts[i])
  }

  // Get 2 posts after
  for (
    let i = currentIndex + 1;
    i < Math.min(sortedPosts.length, currentIndex + 3);
    i++
  ) {
    if (sortedPosts[i]) recommended.push(sortedPosts[i])
  }

  // If we don't have enough, fill with latest posts
  if (recommended.length < 3) {
    const additional = sortedPosts
      .filter(
        (p) =>
          p.slug !== currentSlug && !recommended.find((r) => r.slug === p.slug),
      )
      .slice(0, 4 - recommended.length)
    recommended.push(...additional)
  }

  return recommended.slice(0, 3)
}

export function sortPostsByDate(
  posts: CollectionEntry<'blog'>[],
): CollectionEntry<'blog'>[] {
  return posts.sort(
    (a, b) =>
      new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime(),
  )
}
