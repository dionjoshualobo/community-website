"use client";

import { SearchX } from "lucide-react";
import { useState } from "react";
import { BlogCard } from "@/components/blog-card";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { BlogPost } from "@/types/blog";

interface BlogListProps {
  initialPosts: BlogPost[];
}

const ITEMS_PER_PAGE = 9;

function NoPostsCard() {
  return (
    <div className="col-span-full">
      <Card
        className="relative overflow-hidden bg-white/80 dark:bg-background/80 backdrop-blur-sm border-green-50 dark:border-green-900/30 shadow-lg"
        style={{ minHeight: "420px" }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-green-100/40 via-green-200/50 to-green-100/40" />

        <div className="flex flex-col items-center justify-center h-full py-16 px-8 gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100/50 dark:bg-green-900/20 rounded-full blur-xl" />
            <SearchX className="relative z-10 h-16 w-16 text-green-300 dark:text-green-700" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold text-gray-400 dark:text-gray-500">
              No posts yet
            </h3>
            <p className="text-gray-400 dark:text-gray-600 text-sm max-w-md leading-relaxed">
              Check back soon for updates from the DK24 community.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-green-300/50 to-transparent" />
      </Card>
    </div>
  );
}

export function BlogList({ initialPosts }: BlogListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(initialPosts.length / ITEMS_PER_PAGE);
  const paginatedPosts = initialPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="mt-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedPosts.length === 0 ? (
          <NoPostsCard />
        ) : (
          paginatedPosts.map((post) => <BlogCard key={post.slug} post={post} />)
        )}
      </div>

      {initialPosts.length > ITEMS_PER_PAGE && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage((p) => p - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage((p) => p + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
