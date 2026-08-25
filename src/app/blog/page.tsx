import { BackgroundPattern } from "@/components/background-pattern";
import { BlogList } from "@/components/blog-list";
import { PageHeader } from "@/components/page-header";
import { PinnedBlogRail } from "@/components/pinned-blog-rail";
import { getAllPosts, getPinnedPosts } from "@/lib/blog";
import { generatePageMetadata } from "@/lib/metadata";

export const metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Stories, deep dives, and updates from the DK24 community - Mangalore's network of college tech communities.",
  path: "/blog",
});

export default async function BlogPage() {
  const [posts, pinnedPosts] = await Promise.all([
    getAllPosts(),
    getPinnedPosts(),
  ]);

  const pinnedSlugs = new Set(pinnedPosts.map((post) => post.slug));
  const unpinnedPosts = posts.filter((post) => !pinnedSlugs.has(post.slug));

  return (
    <BackgroundPattern variant="default">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <PageHeader
          title="Blog"
          description="Stories, deep dives, and updates from the DK24 community"
        />

        <PinnedBlogRail posts={pinnedPosts} />

        {pinnedPosts.length > 0 && (
          <div className="mt-12 mb-8 h-1.5 rounded-full bg-green-200 dark:bg-green-800" />
        )}

        <BlogList initialPosts={unpinnedPosts} />
      </div>
    </BackgroundPattern>
  );
}
