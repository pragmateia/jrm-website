import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/blog";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      {/* Hero Image — stays dark with white text overlay */}
      <div className="relative h-72 sm:h-96 md:h-[28rem]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <article className="max-w-2xl mx-auto px-6 lg:px-10 -mt-24 relative z-10">
        <div className="mb-12">
          <p className="text-[11px] text-gold tracking-[0.15em] uppercase mb-4">
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            {" · "}
            {post.author}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight">
            {post.title}
          </h1>
        </div>

        <div className="bg-background pt-12">
          <div
            className="prose-jrm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Back to blog */}
        <div className="mt-20 pt-8 border-t border-white/5">
          <Link
            href="/blog"
            className="text-[12px] font-body font-medium tracking-[0.12em] uppercase text-text-muted hover:text-text-primary transition-colors link-underline"
          >
            Back to Journal
          </Link>
        </div>
      </article>

      <div className="h-28" />
    </div>
  );
}
