import { footerLinks } from '../../data/navigationData';

export default function Footer({ className = '' }) {
  return (
    <footer className={`w-full py-12 border-t border-[var(--color-outline-variant)]/20 bg-[var(--color-surface-bright)] ${className}`}>
      <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-label-md font-black text-[var(--color-on-surface)] tracking-tighter">CityPulse AI</span>
          <p className="text-label-sm text-[var(--color-on-surface-variant)]">© 2026 CityPulse AI. Engineering smarter urban futures.</p>
        </div>
        <div className="flex gap-8">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              className="text-label-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors"
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
