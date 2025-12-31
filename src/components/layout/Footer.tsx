import Link from 'next/link';
import Logo from '@/components/ui/Logo';
import siteConfig from '@/config/site.json';

export default function Footer() {
  return (
    <footer className="bg-[var(--hw-chassis)] border-t border-[var(--hw-border)] pt-16 pb-8 relative overflow-hidden">
      {/* Engraved Lines Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, var(--hw-text-muted) 20px)'
      }}></div>

      <div className="mx-auto container px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="block mb-6 group">
              <Logo className="h-10 w-auto text-[var(--hw-text-main)] opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
            </Link>
            <p className="text-[var(--hw-text-muted)] text-sm font-mono leading-relaxed mb-6">
              MANUFACTURER: PIXPOC AI<br />
              ORIGIN: PUNE, MH, IN
            </p>
            <div className="flex space-x-3">
              {/* Social Buttons - Physical Style */}
              <a
                href={siteConfig.company.social.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--hw-panel)] rounded flex items-center justify-center border border-[var(--hw-border)] hover:border-[#FF5722] hover:text-[#FF5722] text-[var(--hw-text-muted)] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] group"
                aria-label="LinkedIn"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-110 transition-transform">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/pixpoc.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--hw-panel)] rounded flex items-center justify-center border border-[var(--hw-border)] hover:border-[#FF5722] hover:text-[#FF5722] text-[var(--hw-text-muted)] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] group"
                aria-label="Instagram"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-110 transition-transform">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href={siteConfig.company.social.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[var(--hw-panel)] rounded flex items-center justify-center border border-[var(--hw-border)] hover:border-[#FF5722] hover:text-[#FF5722] text-[var(--hw-text-muted)] transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] group"
                aria-label="X (Twitter)"
              >
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-110 transition-transform">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns - Technical Lists */}
          <div>
            <h3 className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-6 border-b border-[var(--hw-border)] pb-2 inline-block">System</h3>
            <ul className="space-y-3">
              {[
                { name: 'Features', href: '#features' },
                { name: 'How It Works', href: '#how-it-works' },
                { name: 'AI Agents', href: '#agents' },
                { name: 'FAQ', href: '#faq' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[var(--hw-text-muted)] hover:text-[#FF5722] text-sm font-mono transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-[var(--hw-text-main)] group-hover:bg-[#FF5722] transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-6 border-b border-[var(--hw-border)] pb-2 inline-block">Company</h3>
            <ul className="space-y-3">
              {[
                { name: 'Contact', href: '/contact' },
                { name: 'Careers', href: '/careers' },
                { name: 'Privacy Policy', href: '/privacy-policy' },
                { name: 'Terms of Service', href: '/terms-of-service' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[var(--hw-text-muted)] hover:text-[#FF5722] text-sm font-mono transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-[var(--hw-text-main)] group-hover:bg-[#FF5722] transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - Data Plate */}
          <div>
            <h3 className="text-[var(--hw-text-muted)] text-xs font-bold tracking-[0.2em] uppercase mb-6 border-b border-[var(--hw-border)] pb-2 inline-block">Contact Data</h3>
            <div className="bg-[var(--hw-panel)] p-4 rounded border border-[var(--hw-border)] font-mono text-xs text-[var(--hw-text-muted)] space-y-2">
              <p>EMAIL: founders@pixpoc.ai</p>
              <p>HQ: PUNE, INDIA</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--hw-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--hw-text-muted)] text-xs font-mono">
            &copy; {new Date().getFullYear()} PIXPOC AI TECHNOLOGIES PVT LTD.
          </p>
          <div className="flex gap-4">
            <div className="w-2 h-2 rounded-full bg-[#1A5C54]"></div>
            <div className="w-2 h-2 rounded-full bg-[#FF5722]"></div>
            <div className="w-2 h-2 rounded-full bg-[#E8E4D9]"></div>
          </div>
        </div>
      </div>
    </footer>
  );
} 
