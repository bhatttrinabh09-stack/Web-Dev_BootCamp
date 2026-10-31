export interface Article {
  slug: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  content: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'mastering-css-grid',
    title: 'Mastering CSS Grid and Subgrid',
    publishedAt: 'October 15, 2026',
    excerpt: 'Deep dive into 2D layout mechanisms and fluid track sizing.',
    content: 'CSS Grid provides full spatial control over rows and columns simultaneously...',
  },
  {
    slug: 'event-loop-demystified',
    title: 'The JavaScript Event Loop Demystified',
    publishedAt: 'October 22, 2026',
    excerpt: 'Understand microtasks, macrotasks, and rendering intervals.',
    content: 'The browser event loop continuously coordinates the call stack and queues...',
  },
];
