import { Pin } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import type { BlogPost } from "@/types/blog";

interface PinnedBlogRailProps {
  posts: BlogPost[];
}

export function PinnedBlogRail({ posts }: PinnedBlogRailProps) {
  if (posts.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-6">
        <Pin className="h-4 w-4 text-green-600 dark:text-green-400" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Pinned
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
