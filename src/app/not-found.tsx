import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-8">
      <div className="text-center max-w-md">
        <p className="text-gold text-sm font-body font-semibold tracking-[0.25em] uppercase mb-4">
          404
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-white/60 text-sm leading-relaxed mb-10 font-body">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-body text-[12px] font-semibold tracking-[0.15em] uppercase transition-all hover:bg-white/90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
