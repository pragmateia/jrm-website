import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jesusrules.co";

  // Static routes with their priorities and change frequencies
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/outreach`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/schedule`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Dynamic blog post routes
  const blogDir = path.join(process.cwd(), "src/content/blog");
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".md"));
    blogRoutes = files.map((file) => {
      const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
      const { data } = matter(raw);
      const slug = file.replace(/\.md$/, "");

      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: data.date ? new Date(data.date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });
  } catch {
    // Blog directory doesn't exist or is empty — skip
  }

  return [...staticRoutes, ...blogRoutes];
}
