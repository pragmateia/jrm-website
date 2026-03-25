import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  author: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  coverImage: string;
  author: string;
}

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        excerpt: data.excerpt || "",
        coverImage: data.coverImage || "/images/laguna-hero.png",
        author: data.author || "Diego Perez",
      };
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    excerpt: data.excerpt || "",
    coverImage: data.coverImage || "/images/laguna-hero.png",
    author: data.author || "Diego Perez",
    content: contentHtml,
  };
}

export function getLatestPosts(count: number = 3): BlogPostMeta[] {
  return getAllPosts().slice(0, count);
}
