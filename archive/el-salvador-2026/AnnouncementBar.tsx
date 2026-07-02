import Link from "next/link";

export default function AnnouncementBar() {
  return (
    <Link
      href="/missions/el-salvador-2026"
      className="fixed top-0 left-0 right-0 z-[60] h-9 bg-gold hover:bg-gold-light text-background flex items-center justify-center text-center px-4 transition-colors group"
    >
      <span className="font-body text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase">
        <span className="hidden sm:inline">El Salvador Mission Trip · May 25 to June 1 · </span>
        <span className="sm:hidden">El Salvador · May 25 · </span>
        <span className="underline underline-offset-4 decoration-from-font">Fund this trip</span>
        <span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
