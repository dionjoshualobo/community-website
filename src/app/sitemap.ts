import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projects } from "@/constants";
import { getAllPosts } from "@/lib/blog";

const STATIC_ROUTES = [
  "",
  "/about",
  "/structure",
  "/communities",
  "/calendar",
  "/projects",
  "/join",
  "/showcase-event",
  "/blog",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.id}`,
  }));

  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
