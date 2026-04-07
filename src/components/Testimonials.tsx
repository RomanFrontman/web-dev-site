import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

const TESTIMONIALS = [
  {
    name: 'Oleksiy Petrenko',
    title: 'CTO, SoftVision UA',
    country: '🇺🇦 Ukraine',
    quote:
      'Roman built a fully custom WordPress theme for our SaaS platform from scratch — no page builders, no templates. Hand-coded PHP, Tailwind, and custom post types. PageSpeed went from 54 to 97 after launch. Exactly the level of quality we needed.',
    image: 'https://randomuser.me/api/portraits/men/26.jpg',
  },
  {
    name: 'Natalia Kovalchuk',
    title: 'Owner, NatKoval Shop',
    country: '🇺🇦 Ukraine',
    quote:
      'We had a complex WooCommerce setup — custom checkout flow, ACF product fields, and a membership integration. Roman understood the requirements immediately and delivered in two weeks without any back-and-forth. Would hire again without hesitation.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    name: 'Tomasz Wojciechowski',
    title: 'Founder, TechCraft Agency',
    country: '🇵🇱 Poland',
    quote:
      'I run a digital agency in Warsaw and subcontract demanding frontend work to Roman. His React and Tailwind output is clean, deadlines are always met, and communication is smooth. One of the most dependable freelancers in my network.',
    image: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    name: 'Agnieszka Dąbrowska',
    title: 'Marketing Manager, FinGroup PL',
    country: '🇵🇱 Poland',
    quote:
      'Roman rebuilt our corporate site on WordPress under a tight deadline. He handled everything — custom Elementor Pro sections, Yoast SEO configuration, speed optimisation with LiteSpeed Cache. Results were outstanding and the team was impressed.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'David Harrington',
    title: 'Founder, LaunchPad Inc.',
    country: '🇺🇸 United States',
    quote:
      'Hired Roman for a React + Tailwind marketing site with Stripe payment integration. He understood the spec quickly, asked the right questions upfront, and shipped clean, well-structured code on schedule. Will definitely work together again.',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    name: 'Emma Clarke',
    title: 'Product Lead, Brightwave UK',
    country: '🇬🇧 United Kingdom',
    quote:
      'Roman rebuilt our company website and wired up a Stripe-based subscription flow. The project had a lot of moving parts but he managed it professionally — clear updates at every stage, zero major issues, delivered on time.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

type Testimonial = typeof TESTIMONIALS[number];

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="relative bg-[var(--bg-surface)] backdrop-blur-md rounded-xl p-6 border border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-purple-400/50 hover:ring-2 hover:ring-purple-400/15 transition-all duration-300 overflow-visible h-full flex flex-col">
      {/* Diamond accent */}
      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rotate-45 bg-gradient-to-br from-purple-400 to-pink-400" />

      {/* Header row */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-purple-400/60 text-3xl leading-none font-serif">❝</span>
        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">{item.country}</span>
      </div>

      {/* Quote */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-5">
        {item.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[oklch(90%_0.012_349)] dark:border-white/10">
        <img
          src={item.image}
          alt={item.name}
          className="w-11 h-11 rounded-full object-cover border-2 border-purple-500/40"
        />
        <div>
          <div className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</div>
          <div className="text-xs text-purple-400">{item.title}</div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const total = TESTIMONIALS.length;
  const PER_PAGE = 3;
  const totalPages = Math.ceil(total / PER_PAGE); // 2 pages of 3

  // Desktop: page-based navigation (jumps all 3 at once)
  const [page, setPage] = useState(0);
  const [pageDir, setPageDir] = useState(1);

  function prevPage() {
    setPageDir(-1);
    setPage(p => (p - 1 + totalPages) % totalPages);
  }
  function nextPage() {
    setPageDir(1);
    setPage(p => (p + 1) % totalPages);
  }
  function goToPage(p: number) {
    setPageDir(p > page ? 1 : -1);
    setPage(p);
  }

  const desktopIndices = [0, 1, 2].map(offset => page * PER_PAGE + offset);

  // Mobile: individual card navigation
  const [mobileIdx, setMobileIdx] = useState(0);
  const [mobileDir, setMobileDir] = useState(1);

  function prevMobile() {
    setMobileDir(-1);
    setMobileIdx(i => (i - 1 + total) % total);
  }
  function nextMobile() {
    setMobileDir(1);
    setMobileIdx(i => (i + 1) % total);
  }

  return (
    <AnimatedSection>
      <section id="testimonials" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Testimonials
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                What clients say after working with me.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mt-6" />
            </div>

            {/* Mobile: single card, navigates one at a time */}
            <div className="lg:hidden mb-8 min-h-[340px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileIdx}
                  initial={{ opacity: 0, x: mobileDir * 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: mobileDir * -50 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <TestimonialCard item={TESTIMONIALS[mobileIdx]} />
                </motion.div>
              </AnimatePresence>

              <div className="flex items-center justify-center gap-4 mt-6">
                <button onClick={prevMobile} aria-label="Previous" className="w-9 h-9 rounded-full bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-purple-400/50 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-purple-400 transition-all duration-200">◀</button>
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button key={i} onClick={() => { setMobileDir(i > mobileIdx ? 1 : -1); setMobileIdx(i); }} aria-label={`Testimonial ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${i === mobileIdx ? 'w-5 h-2 bg-gradient-to-r from-purple-400 to-pink-400' : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400/50'}`}
                    />
                  ))}
                </div>
                <button onClick={nextMobile} aria-label="Next" className="w-9 h-9 rounded-full bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-purple-400/50 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-purple-400 transition-all duration-200">▶</button>
              </div>
            </div>

            {/* Desktop: 3 cards per page, entire group swaps at once */}
            <div className="hidden lg:block mb-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={page}
                  initial={{ opacity: 0, x: pageDir * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: pageDir * -60 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="grid grid-cols-3 gap-6"
                >
                  {desktopIndices.map((idx, pos) => (
                    <TestimonialCard key={`${page}-${pos}`} item={TESTIMONIALS[idx]} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Desktop navigation — 2 page dots */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <button
                  onClick={prevPage}
                  aria-label="Previous page"
                  className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-purple-400/50 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-purple-400 transition-all duration-200"
                >
                  ◀
                </button>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      aria-label={`Page ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === page
                          ? 'w-6 h-2 bg-gradient-to-r from-purple-400 to-pink-400'
                          : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400/50'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextPage}
                  aria-label="Next page"
                  className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-purple-400/50 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-purple-400 transition-all duration-200"
                >
                  ▶
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
