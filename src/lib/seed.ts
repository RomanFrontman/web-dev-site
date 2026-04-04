// src/lib/seed.ts
// Run once to populate empty Supabase tables with the original portfolio data.
//
// HOW TO RUN (browser console):
//   1. Temporarily add this line to src/main.tsx:
//        import './lib/seed';
//   2. Open the app in the browser — check the console for results.
//   3. Remove the import from main.tsx once seeding is done.
//
// The script is a no-op if either table already has rows.

import { supabase } from './supabase';
import type { Project, Skill } from '../types/database';

// ---------------------------------------------------------------------------
// Seed data — snake_case to match Supabase schema
// ---------------------------------------------------------------------------

const PROJECTS: Omit<Project, 'id' | 'created_at'>[] = [
  {
    title: 'Corporative Website',
    description: 'Professional corporate website built with WordPress using ACF and Elementor. Includes SEO optimization and custom theme setup.',
    tech: ['WordPress', 'Elementor', 'ACF', 'SEO'],
    live_url: 'https://www.connectivetechnologies.co.uk/',
    github_url: '',
    image: '/images/portfolio2.png',
    featured: true,
    category: 'Corporate',
    order: 1,
  },
  {
    title: 'Portfolio Website',
    description: 'Clean personal portfolio for a designer with animations and dark mode.',
    tech: ['React', 'Vercel', 'Tailwind'],
    live_url: 'https://web-dev-site-eta.vercel.app/',
    github_url: '',
    image: '/images/portfolio1.png',
    featured: true,
    category: 'Frontend',
    order: 2,
  },
  {
    title: 'Cleaning Service Website',
    description: 'Multi-page WordPress website for a cleaning company with service pages, SEO settings, and ACF + Elementor integration.',
    tech: ['WordPress', 'ACF', 'Elementor', 'SEO'],
    live_url: 'https://clean-clin.lviv.ua/',
    github_url: '',
    image: '/images/portfolio3.png',
    featured: true,
    category: 'Service',
    order: 3,
  },
  {
    title: 'Financial Literacy Landing Page',
    description: 'Single-page landing for online finance courses built with Bootstrap, JavaScript, and SCSS.',
    tech: ['Bootstrap', 'JavaScript', 'SCSS'],
    live_url: '#contact',
    github_url: '',
    image: '/images/portfolio4.png',
    featured: false,
    category: 'Landing',
    order: 4,
  },
  {
    title: 'Real Estate Platform',
    description: 'Property sales platform built with WordPress, SCSS, ACF, and custom filtering features.',
    tech: ['WordPress', 'ACF', 'SCSS', 'Custom Plugins'],
    live_url: 'https://www.romanchaus.pp.ua/',
    github_url: '',
    image: '/images/portfolio5.png',
    featured: false,
    category: 'Real Estate',
    order: 5,
  },
  {
    title: 'Veterinary Clinic Website',
    description: 'WordPress site for a veterinary clinic offering pet care. Includes personal account system, ACF, and Elementor.',
    tech: ['WordPress', 'Elementor', 'ACF', 'User Dashboard'],
    live_url: 'https://merlion.com.ua/',
    github_url: '',
    image: '/images/portfolio6.png',
    featured: false,
    category: 'Healthcare',
    order: 6,
  },
];

const SKILLS: Omit<Skill, 'id' | 'created_at'>[] = [
  { name: 'WordPress',    level: 95, category: 'Programming', icon: '🚀', color: 'from-blue-500 to-blue-600',     order: 1  },
  { name: 'React',        level: 90, category: 'Programming', icon: '⚛️', color: 'from-cyan-500 to-blue-500',     order: 2  },
  { name: 'JavaScript',   level: 88, category: 'Programming', icon: '🔥', color: 'from-yellow-400 to-yellow-500', order: 3  },
  { name: 'PHP',          level: 85, category: 'Programming', icon: '🐘', color: 'from-purple-500 to-purple-600', order: 4  },
  { name: 'MySQL',        level: 85, category: 'Programming', icon: '🗄️', color: 'from-orange-500 to-red-500',    order: 5  },
  { name: 'Tailwind CSS', level: 90, category: 'Programming', icon: '🎨', color: 'from-teal-400 to-cyan-500',     order: 6  },
  { name: 'Bootstrap',    level: 80, category: 'Programming', icon: '📘', color: 'from-indigo-500 to-indigo-600', order: 7  },
  { name: 'Git',          level: 0,  category: 'Tool',        icon: '🔧', color: 'from-gray-500 to-gray-600',     order: 8  },
  { name: 'Docker',       level: 0,  category: 'Tool',        icon: '🐳', color: 'from-blue-500 to-blue-600',     order: 9  },
  { name: 'Vercel',       level: 0,  category: 'Tool',        icon: '▲',  color: 'from-gray-700 to-gray-900',     order: 10 },
  { name: 'Figma',        level: 0,  category: 'Tool',        icon: '🎨', color: 'from-pink-500 to-purple-500',   order: 11 },
  { name: 'Gulp',         level: 0,  category: 'Tool',        icon: '📦', color: 'from-red-500 to-red-600',       order: 12 },
  { name: 'Sass',         level: 0,  category: 'Tool',        icon: '💅', color: 'from-pink-400 to-pink-600',     order: 13 },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

async function seedDatabase() {
  console.log('[seed] Starting…');
  console.log('[seed] Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

  // Check if tables already have data
  const [projectsCount, skillsCount] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('skills').select('*', { count: 'exact', head: true }),
  ]);

  console.log('[seed] projects count query →', { count: projectsCount.count, error: projectsCount.error });
  console.log('[seed] skills count query   →', { count: skillsCount.count,   error: skillsCount.error   });

  if ((projectsCount.count ?? 0) > 0 || (skillsCount.count ?? 0) > 0) {
    console.log(
      `[seed] Tables already populated — projects: ${projectsCount.count}, skills: ${skillsCount.count}. Skipping.`
    );
    return;
  }

  // Insert projects
  const projectsResult = await supabase.from('projects').insert(PROJECTS).select();
  console.log('[seed] projects insert data  →', projectsResult.data);
  console.log('[seed] projects insert error →', projectsResult.error);

  // Insert skills
  const skillsResult = await supabase.from('skills').insert(SKILLS).select();
  console.log('[seed] skills insert data  →', skillsResult.data);
  console.log('[seed] skills insert error →', skillsResult.error);

  if (!projectsResult.error && !skillsResult.error) {
    console.log('[seed] Done — inserted', PROJECTS.length, 'projects and', SKILLS.length, 'skills.');
  }
}

seedDatabase();
