import Image from "next/image";
import Link from "next/link";
import { getLatestPosts } from "@/lib/blog";

export default function LatestBlog() {
  const posts = getLatestPosts(2);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
          <div>
            <p className="text-[11px] font-body font-semibold text-gold tracking-[0.25em] uppercase mb-4">
              Journal
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-text-primary">
              From the Field
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-[12px] font-body font-medium tracking-[0.12em] uppercase text-text-secondary hover:text-text-primary transition-colors link-underline"
          >
            All Posts
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
            >
              <div className="aspect-[16/10] relative overflow-hidden mb-5">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <p className="text-[11px] font-body text-gold tracking-[0.15em] uppercase mb-2">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <h3 className="font-heading text-xl text-text-primary mb-2 group-hover:text-gold transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
