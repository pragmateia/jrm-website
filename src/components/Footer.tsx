import Link from "next/link";
import Image from "next/image";

const footerNav = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/schedule", label: "Schedule" },
  { href: "/outreach", label: "Outreach" },
  { href: "/donate", label: "Donate" },
  { href: "/shop", label: "Shop" },
];

export default function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Main footer */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <Image
                src="/images/logo-white.png"
                alt="Jesus Rules Ministries"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase">
                Jesus Rules
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              A 501(c)(3) nonprofit ministry using professional beach volleyball
              excellence to spread the Gospel worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-5">
              Pages
            </h3>
            <ul className="space-y-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-3">
            <h3 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-5">
              Connect
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:info@jesusrules.co"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  info@jesusrules.co
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/jesusrules.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@jesusrulesministries"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors"
                >
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h3 className="text-[11px] font-semibold text-white/50 uppercase tracking-[0.2em] mb-5">
              Tax Info
            </h3>
            <p className="text-sm text-white/50">EIN 33-3630279</p>
            <p className="text-sm text-white/50 mt-1">501(c)(3) Tax-Exempt</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-white/50 tracking-wide">
            &copy; {new Date().getFullYear()} Jesus Rules Ministries
          </p>
          <p className="text-[11px] text-white/50 tracking-wide">
            All donations are tax-deductible to the fullest extent of the law.
          </p>
        </div>
      </div>
    </footer>
  );
}
