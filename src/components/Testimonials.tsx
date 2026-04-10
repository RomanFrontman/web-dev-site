import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const TESTIMONIALS = [
  {
    name: 'James Hartley',
    title: 'Director, Connective Technologies',
    country: '🇬🇧 United Kingdom',
    quote:
      'Honestly wasn\'t sure what to expect hiring remotely, but Roman exceeded every expectation. He took our brief, asked exactly the right questions on day one, and just got on with it. The WordPress site came back clean, fast, and ranked well out of the gate. We\'ve had zero issues since launch.',
    image: 'https://randomuser.me/api/portraits/men/26.jpg',
  },
  {
    name: 'Sofia Marchetti',
    title: 'UX Designer, Freelance',
    country: '🇮🇹 Italy',
    quote:
      'The portfolio Roman built for me is exactly what I wanted — clean React with Framer Motion animations, dark mode, fully responsive. I sent him a rough Figma mockup and he turned it into working code faster than I expected. Two clients reached out through the site within the first month.',
    image: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
  {
    name: 'Olena Savchenko',
    title: 'Owner, CleanClin',
    country: '🇺🇦 Ukraine',
    quote:
      'We\'re a small cleaning company — I had a tight budget and wasn\'t sure if a proper website was worth it. Roman talked me through what actually matters for local SEO, built us a solid WordPress site with Elementor and ACF, and within two months we were showing up on the first page of Google. It paid for itself quickly.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'David Harrington',
    title: 'Founder, LaunchPad Finance',
    country: '🇺🇸 United States',
    quote:
      'Good landing page developer — rare find. Gave him a conversion-focused brief for our finance course launch and he delivered with Bootstrap and vanilla JS, no unnecessary frameworks. Page speed score was 96 on mobile. Sign-up rate beat our previous landing by a meaningful margin.',
    image: 'https://randomuser.me/api/portraits/men/52.jpg',
  },
  {
    name: 'Vasyl Bondarenko',
    title: 'CEO, RomanChaus Real Estate',
    country: '🇺🇦 Ukraine',
    quote:
      'We needed more than a brochure site — a real catalogue with filtering by district, price range, and property type. Roman built it all in WordPress with custom ACF fields and SCSS. Our agents stopped calling to ask how to update listings on day one. The admin side is that intuitive.',
    image: 'https://randomuser.me/api/portraits/men/31.jpg',
  },
  {
    name: 'Dr. Iryna Melnyk',
    title: 'Owner, Merlion Veterinary Clinic',
    country: '🇺🇦 Ukraine',
    quote:
      'I came to Roman with a very specific request — a clinic website where pet owners can log in and see their animal\'s visit history and book again. He built it in WordPress with Elementor and a custom user dashboard. My clients love it. Several have mentioned it\'s one of the most thoughtful things we\'ve done for them.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

type Testimonial = typeof TESTIMONIALS[number];

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} className="fill-purple-400 text-purple-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="bg-[var(--bg-surface)] backdrop-blur-md rounded-2xl p-6 border border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-purple-400/50 hover:ring-2 hover:ring-purple-400/15 transition-all duration-300 h-full flex flex-col">

      {/* Header: quote icon + country + stars */}
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-purple-400/20">
          <Quote size={16} className="text-purple-400" />
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-xs text-gray-500 dark:text-gray-400">{item.country}</span>
          <Stars />
        </div>
      </div>

      {/* Quote */}
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-5">
        {item.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-[oklch(90%_0.012_349)] dark:border-white/10">
        <div className="p-0.5 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
        <div>
          <div className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</div>
          <div className="text-xs text-purple-400">{item.title}</div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-purple-400/50 hover:bg-purple-500/10 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-purple-400 transition-all duration-200"
    >
      {children}
    </button>
  );
}

export default function Testimonials() {
  const total = TESTIMONIALS.length;
  const PER_PAGE = 3;
  const totalPages = Math.ceil(total / PER_PAGE);

  const [page, setPage] = useState(0);
  const [pageDir, setPageDir] = useState(1);

  function prevPage() { setPageDir(-1); setPage(p => (p - 1 + totalPages) % totalPages); }
  function nextPage() { setPageDir(1);  setPage(p => (p + 1) % totalPages); }
  function goToPage(p: number) { setPageDir(p > page ? 1 : -1); setPage(p); }

  const desktopIndices = [0, 1, 2].map(offset => page * PER_PAGE + offset);

  const [mobileIdx, setMobileIdx] = useState(0);
  const [mobileDir, setMobileDir] = useState(1);

  function prevMobile() { setMobileDir(-1); setMobileIdx(i => (i - 1 + total) % total); }
  function nextMobile() { setMobileDir(1);  setMobileIdx(i => (i + 1) % total); }

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

            {/* Mobile */}
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
                <NavButton onClick={prevMobile} label="Previous"><ChevronLeft size={18} /></NavButton>
                <div className="flex items-center gap-2">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { setMobileDir(i > mobileIdx ? 1 : -1); setMobileIdx(i); }}
                      aria-label={`Testimonial ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${i === mobileIdx ? 'w-5 h-2 bg-gradient-to-r from-purple-400 to-pink-400' : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400/50'}`}
                    />
                  ))}
                </div>
                <NavButton onClick={nextMobile} label="Next"><ChevronRight size={18} /></NavButton>
              </div>
            </div>

            {/* Desktop */}
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

              <div className="flex items-center justify-center gap-4 mt-8">
                <NavButton onClick={prevPage} label="Previous page"><ChevronLeft size={18} /></NavButton>
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i)}
                      aria-label={`Page ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${i === page ? 'w-6 h-2 bg-gradient-to-r from-purple-400 to-pink-400' : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-purple-400/50'}`}
                    />
                  ))}
                </div>
                <NavButton onClick={nextPage} label="Next page"><ChevronRight size={18} /></NavButton>
              </div>
            </div>

          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
