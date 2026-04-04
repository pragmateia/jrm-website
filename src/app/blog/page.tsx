import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tournament recaps, behind-the-scenes stories, and ministry updates from the Jesus Rules Ministries team competing on the professional beach volleyball tour.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-5">
            Journal
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-text-primary tracking-tight">
            Jesus Rules Blog
          </h1>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-20 sm:pb-28 bg-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-20">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-text-secondary">
                Posts coming soon. Follow{" "}
                <a
                  href="https://instagram.com/diegonickperez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  @diegonickperez
                </a>{" "}
                for updates.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col md:flex-row gap-8 py-10 first:pt-0"
                >
                  <div className="md:w-64 flex-shrink-0">
                    <div className="aspect-[16/10] relative overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 256px"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    </div>
                  </div>
                  <div className="flex-1 md:pt-1">
                    <p className="text-[11px] text-gold tracking-[0.15em] uppercase mb-3">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="font-heading text-xl sm:text-2xl text-text-primary mb-3 group-hover:text-gold transition-colors duration-300 tracking-tight">
                      {post.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-block mt-4 text-[12px] font-body font-medium tracking-[0.12em] uppercase text-text-muted group-hover:text-text-primary transition-colors">
                      Read
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
