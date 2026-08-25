import { z } from "zod";

export const BlogFrontmatterSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  author: z.string().min(1).max(100),
  authorImage: z.string().min(1),
  authorDesignation: z.string().min(1).max(100),
  coverImage: z.string().min(1),
  readingTime: z.string().min(1).max(50),
  tags: z.array(z.string().min(1).max(100).trim()).min(1),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;

export interface BlogPost extends BlogFrontmatter {
  slug: string;
  contentHtml: string;
}

export const MAX_PINNED_BLOGS = 3;

export const PinnedBlogsSchema = z
  .array(z.string().min(1))
  .max(
    MAX_PINNED_BLOGS,
    `at most ${MAX_PINNED_BLOGS} posts can be pinned at once`,
  );
