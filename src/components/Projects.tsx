"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import AnimatedSection from './AnimatedSection';
import { getProjects } from '../lib/db';
import type { Project } from '../types/database';

const INITIAL_COUNT = 3;

// Fallback shown if Supabase fetch fails
const FALLBACK: Project[] = [
  { id: '1', title: 'Corporative Website',          description: 'Professional corporate website built with WordPress using ACF and Elementor. Includes SEO optimization and custom theme setup.',  image: '/images/portfolio2.png', live_url: 'https://www.connectivetechnologies.co.uk/', github_url: '', tech: ['WordPress', 'Elementor', 'ACF', 'SEO'],            category: 'Corporate',    featured: true,  order: 1, created_at: '' },
  { id: '2', title: 'Portfolio Website',             description: 'Clean personal portfolio for a designer with animations and dark mode.',                                                             image: '/images/portfolio1.png', live_url: 'https://web-dev-site-eta.vercel.app/',          github_url: '', tech: ['React', 'Vercel', 'Tailwind'],                        category: 'Frontend',     featured: true,  order: 2, created_at: '' },
  { id: '3', title: 'Cleaning Service Website',      description: 'Multi-page WordPress website for a cleaning company with service pages, SEO settings, and ACF + Elementor integration.',          image: '/images/portfolio3.png', live_url: 'https://clean-clin.lviv.ua/',                  github_url: '', tech: ['WordPress', 'ACF', 'Elementor', 'SEO'],            category: 'Service',      featured: true,  order: 3, created_at: '' },
  { id: '4', title: 'Financial Literacy Landing',    description: 'Single-page landing for online finance courses built with Bootstrap, JavaScript, and SCSS.',                                        image: '/images/portfolio4.png', live_url: '#contact',                                        github_url: '', tech: ['Bootstrap', 'JavaScript', 'SCSS'],                 category: 'Landing',      featured: false, order: 4, created_at: '' },
  { id: '5', title: 'Real Estate Platform',          description: 'Property sales platform built with WordPress, SCSS, ACF, and custom filtering features.',                                          image: '/images/portfolio5.png', live_url: 'https://www.romanchaus.pp.ua/',                github_url: '', tech: ['WordPress', 'ACF', 'SCSS', 'Custom Plugins'],      category: 'Real Estate',  featured: false, order: 5, created_at: '' },
  { id: '6', title: 'Veterinary Clinic Website',     description: 'WordPress site for a veterinary clinic offering pet care. Includes personal account system, ACF, and Elementor.',                 image: '/images/portfolio6.png', live_url: 'https://merlion.com.ua/',                      github_url: '', tech: ['WordPress', 'Elementor', 'ACF', 'User Dashboard'], category: 'Healthcare',   featured: false, order: 6, created_at: '' },
];


export default function Projects() {
  const [showMore, setShowMore] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then(data => setProjects(data.sort((a, b) => a.order - b.order)))
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  const displayed = showMore ? projects : projects.slice(0, INITIAL_COUNT);

  return (
    <AnimatedSection><section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A selection of projects I've built for clients and personal growth.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mt-6"></div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(n => (
              <div key={n} className="bg-[var(--bg-surface)] rounded-2xl overflow-hidden border border-[oklch(90%_0.012_349)] dark:border-white/10 animate-pulse">
                <div className="h-48 bg-[var(--bg-subtle)]" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-[var(--bg-subtle)] rounded w-3/4" />
                  <div className="h-3 bg-[var(--bg-subtle)] rounded w-full" />
                  <div className="h-3 bg-[var(--bg-subtle)] rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {displayed.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut' as const,
                    delay: (index < INITIAL_COUNT ? index : index - INITIAL_COUNT) * 0.1,
                  }}
                  className="group bg-[var(--bg-surface)] backdrop-blur-md border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 hover:transform hover:scale-105"
                >
                  <div className="relative overflow-hidden h-48 bg-gradient-to-br from-purple-100/60 to-pink-100/60 dark:from-purple-900/20 dark:to-pink-900/20">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      width="400"
                      height="192"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4 px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                      {project.category}
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <a href={project.live_url} className="px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-colors duration-300">
                        View Project
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.live_url}
                      className="inline-flex items-center space-x-2 text-purple-400 hover:text-pink-400 font-semibold transition-colors duration-300 group/link"
                    >
                      <span>View Project</span>
                      <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {projects.length > INITIAL_COUNT && (
          <div className="text-center mt-12">
            <Button onClick={() => setShowMore(!showMore)} size="lg">
              {showMore ? 'Show Less' : `View More Projects (${projects.length - INITIAL_COUNT} more)`}
            </Button>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="bg-[var(--bg-surface)] backdrop-blur-sm rounded-2xl p-8 border border-[oklch(90%_0.012_349)] dark:border-white/10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm always excited to work on new challenges and bring creative ideas to life.
              Let's discuss how I can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="#contact">Get a Quote</Button>
              <Button href="#contact" variant="secondary">Schedule a Call</Button>
            </div>
          </div>
        </div>
      </div>
    </section></AnimatedSection>
  );
}
