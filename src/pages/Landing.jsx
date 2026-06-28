import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroData, statsData, featuresData, stepsData, howItWorksImage, testimonialsData } from '../data/landingData';
import { landingNavLinks, footerLinks } from '../data/navigationData';
import MaterialIcon from '../components/ui/MaterialIcon';
import CityScene from '../components/3d/CityScene/CityScene';
import Counter from '../components/ui/Counter';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

export default function Landing() {
  return (
    <div className="antialiased overflow-x-hidden bg-[#faf8ff]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#070b19]/85 backdrop-blur-xl border-b border-white/10 text-white shadow-sm h-20 transition-all duration-300">
        <div className="flex justify-between items-center w-full px-[var(--spacing-margin-desktop)] max-w-[var(--spacing-container-max)] mx-auto h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-headline-sm font-bold text-[#06b6d4] tracking-tight">CityPulse AI</Link>
            <div className="hidden md:flex items-center gap-6">
              {landingNavLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-label-md transition-colors duration-200 ${
                    link.active
                      ? 'text-[#06b6d4] font-semibold border-b-2 border-[#06b6d4]'
                      : 'text-[#94a3b8] font-medium hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a className="hidden sm:inline-block text-[#94a3b8] font-medium text-label-md hover:text-white transition-colors" href="#">Log In</a>
            <Link to="/dashboard" className="bg-[#06b6d4] text-white px-6 py-2.5 rounded-full text-label-md font-semibold hover:opacity-90 active:scale-95 transition-all shadow-md">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center bg-[#070b19] overflow-hidden">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
          
          {/* Left Column: Heading, Subheading, CTAs, Scroll Indicator */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <motion.div {...fadeUp}>
              <span className="inline-block px-4 py-1.5 mb-6 text-label-sm text-[#06b6d4] bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-full font-bold uppercase tracking-wider">
                {heroData.badge}
              </span>
              <h1 className="text-display-lg text-white mb-6 leading-tight">
                {heroData.title}<br />
                <span className="text-[#06b6d4]">{heroData.titleHighlight}</span>
              </h1>
              <p className="text-body-lg text-[#94a3b8] mb-10 max-w-lg leading-relaxed">{heroData.description}</p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/dashboard" className="bg-[#06b6d4] text-white px-8 py-4 rounded-full font-semibold text-body-md hover:shadow-lg hover:shadow-[#06b6d4]/20 active:scale-95 transition-all">
                  Explore Dashboard
                </Link>
                <Link to="/report" className="bg-transparent border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-body-md hover:bg-white/5 active:scale-95 transition-all">
                  Report Issue
                </Link>
              </div>
              
              {/* Scroll down indicator */}
              <div className="flex items-center gap-2 text-xs font-mono text-[#94a3b8]/60 uppercase tracking-widest animate-bounce">
                <MaterialIcon icon="arrow_downward" className="text-lg" />
                <span>Scroll to explore urban insights</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Smart City canvas */}
          <div className="lg:col-span-7 w-full h-[450px] lg:h-[650px] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl relative">
            <CityScene />
          </div>
          
        </div>
        
        {/* Dark-to-light gradient at the bottom to blend hero into the statistics section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf8ff] to-transparent pointer-events-none z-10"></div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-[#faf8ff]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsData.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i + 1) * 0.1 }}
                              className="light-glass-card p-8 flex flex-col items-center text-center">
                <div className="text-[var(--color-primary)] mb-2">
                  <MaterialIcon icon={stat.icon} filled className="text-[40px]" />
                </div>
                <div className="text-display-lg text-[var(--color-on-surface)]">
                  <Counter value={stat.value} />
                </div>
                <div className="text-label-md text-[var(--color-on-surface-variant)] uppercase tracking-wider">{stat.label}</div>
                <p className="mt-4 text-body-md text-[var(--color-on-surface-variant)]">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-[var(--color-surface-container-lowest)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)]">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-headline-md text-[var(--color-on-surface)] mb-4">Intelligence for the Modern Metropolis</h2>
            <p className="text-body-lg text-[var(--color-on-surface-variant)]">Our platform integrates multi-source data to create a living digital twin of your city.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-gutter)]">
            {featuresData.map((feature, i) => (
              <motion.div key={feature.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i + 1) * 0.1 }}
                className="bg-white p-10 rounded-[20px] border border-[var(--color-outline-variant)]/30 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-[var(--color-primary)]/5 rounded-2xl flex items-center justify-center text-[var(--color-primary)] mb-8 group-hover:bg-[var(--color-primary-container)] group-hover:text-white transition-all">
                  <MaterialIcon icon={feature.icon} className="text-3xl" />
                </div>
                <h3 className="text-headline-sm text-[var(--color-on-surface)] mb-4">{feature.title}</h3>
                <p className="text-body-md text-[var(--color-on-surface-variant)] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)]">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div {...fadeUp} className="w-full lg:w-1/2">
              <div className="relative w-full aspect-square bg-[var(--color-surface-container)] rounded-[20px] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4/5 h-4/5 light-glass-card flex items-center justify-center p-8 overflow-hidden shadow-2xl">
                    <img className="w-full h-full object-cover rounded-xl" src={howItWorksImage} alt="3D map interface" />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="w-full lg:w-1/2 space-y-12">
              <div>
                <h2 className="text-headline-md text-[var(--color-on-surface)] mb-8">Implementing Change</h2>
                <div className="space-y-10">
                  {stepsData.map((step) => (
                    <div key={step.number} className="flex gap-6">
                      <div className="flex-shrink-0 w-10 h-10 bg-[var(--color-primary-container)] text-white rounded-full flex items-center justify-center font-bold">{step.number}</div>
                      <div>
                        <h4 className="text-label-md font-bold text-[var(--color-on-surface)] uppercase mb-1">{step.title}</h4>
                        <p className="text-body-md text-[var(--color-on-surface-variant)]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-[var(--color-surface-container-low)]">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)]">
          <motion.h2 {...fadeUp} className="text-headline-md text-[var(--color-on-surface)] text-center mb-16">Trusted by Urban Leaders</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-gutter)]">
            {testimonialsData.map((t, i) => (
              <motion.div key={t.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: (i + 1) * 0.1 }}
                                className="light-glass-card p-8 flex flex-col justify-between">
                <p className="text-body-lg text-[var(--color-on-surface)] italic mb-8">{t.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--color-outline-variant)]">
                    <img className="w-full h-full object-cover" src={t.avatar} alt={t.name} />
                  </div>
                  <div>
                    <div className="text-label-md font-bold text-[var(--color-on-surface)]">{t.name}</div>
                    <div className="text-label-sm text-[var(--color-on-surface-variant)]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)]">
        <motion.div {...fadeUp} className="cta-gradient rounded-[32px] p-12 md:p-24 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-1/2 -left-1/4 w-full h-full bg-white rounded-full blur-[120px]"></div>
            <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-white rounded-full blur-[120px]"></div>
          </div>
          <div className="relative z-10">
            <h2 className="text-display-lg mb-6">Build the Future Smarter</h2>
            <p className="text-body-lg mb-10 max-w-2xl mx-auto opacity-90">Join 120+ forward-thinking cities using CityPulse AI to revolutionize urban living for millions.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold text-body-md hover:shadow-xl transition-all active:scale-95">Get a Custom Demo</button>
              <button className="bg-[var(--color-primary)]/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-body-md hover:bg-white/20 transition-all active:scale-95">Contact Sales</button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 bg-[var(--color-surface-bright)] border-t border-[var(--color-outline-variant)]/20">
        <div className="max-w-[var(--spacing-container-max)] mx-auto px-[var(--spacing-margin-desktop)] flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-label-md font-black text-[var(--color-on-surface)] mb-2">CityPulse AI</div>
            <p className="text-body-md text-[var(--color-on-surface-variant)] text-center md:text-left">© 2026 CityPulse AI. Engineering smarter urban futures.</p>
          </div>
          <div className="flex gap-8">
            {footerLinks.map((link) => (
              <a key={link.label} className="text-label-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors" href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
