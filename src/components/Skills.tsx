"use client";
import { useState, useEffect } from 'react';
import { Code, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { getSkills } from '../lib/db';
import type { Skill } from '../types/database';

// Fallback data shown if Supabase fetch fails
const FALLBACK_SKILLS: Skill[] = [
  { id: '1', name: 'WordPress',   level: 95, category: 'Programming', icon: '🚀', color: 'from-blue-500 to-blue-600',    order: 1, created_at: '' },
  { id: '2', name: 'React',       level: 90, category: 'Programming', icon: '⚛️', color: 'from-cyan-500 to-blue-500',    order: 2, created_at: '' },
  { id: '3', name: 'JavaScript',  level: 88, category: 'Programming', icon: '🔥', color: 'from-yellow-400 to-yellow-500', order: 3, created_at: '' },
  { id: '4', name: 'PHP',         level: 85, category: 'Programming', icon: '🐘', color: 'from-purple-500 to-purple-600', order: 4, created_at: '' },
  { id: '5', name: 'MySQL',       level: 85, category: 'Programming', icon: '🗄️', color: 'from-orange-500 to-red-500',   order: 5, created_at: '' },
  { id: '6', name: 'Tailwind CSS',level: 90, category: 'Programming', icon: '🎨', color: 'from-teal-400 to-cyan-500',    order: 6, created_at: '' },
  { id: '7', name: 'Bootstrap',   level: 80, category: 'Programming', icon: '📘', color: 'from-indigo-500 to-indigo-600',order: 7, created_at: '' },
];
const FALLBACK_TOOLS: Skill[] = [
  { id: '8',  name: 'Git',    level: 0, category: 'Tool', icon: '🔧', color: 'from-gray-500 to-gray-600',   order: 8,  created_at: '' },
  { id: '9',  name: 'Docker', level: 0, category: 'Tool', icon: '🐳', color: 'from-blue-500 to-blue-600',   order: 9,  created_at: '' },
  { id: '10', name: 'Vercel', level: 0, category: 'Tool', icon: '▲',  color: 'from-gray-700 to-gray-900',   order: 10, created_at: '' },
  { id: '11', name: 'Figma',  level: 0, category: 'Tool', icon: '🎨', color: 'from-pink-500 to-purple-500', order: 11, created_at: '' },
  { id: '12', name: 'Gulp',   level: 0, category: 'Tool', icon: '📦', color: 'from-red-500 to-red-600',     order: 12, created_at: '' },
  { id: '13', name: 'Sass',   level: 0, category: 'Tool', icon: '💅', color: 'from-pink-400 to-pink-600',   order: 13, created_at: '' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(FALLBACK_SKILLS);
  const [tools, setTools]   = useState<Skill[]>(FALLBACK_TOOLS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSkills()
      .then(all => {
        setSkills(all.filter(s => s.category !== 'Tool').sort((a, b) => a.order - b.order));
        setTools(all.filter(s => s.category === 'Tool').sort((a, b) => a.order - b.order));
      })
      .catch(() => { /* fallback already set as default state */ })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AnimatedSection><section id="skills" className="py-20 relative">
      <div className="bg-gradient-to-br from-neutral-50/80 to-gray-100/60 dark:from-neutral-900/80 dark:to-gray-700/60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Constantly evolving and mastering the latest technologies to deliver cutting-edge solutions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mt-6"></div>
          </div>

          {loading ? (
            <div className="grid lg:grid-cols-2 gap-12">
              {[0, 1].map(col => (
                <div key={col} className="space-y-6">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className="bg-[var(--bg-surface)] rounded-xl p-6 border border-[oklch(90%_0.012_349)] dark:border-white/10 animate-pulse">
                      <div className="h-4 bg-[var(--bg-subtle)] rounded w-1/3 mb-4" />
                      <div className="h-3 bg-[var(--bg-subtle)] rounded w-full" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Programming Skills */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-purple-400 mb-8 flex items-center">
                  <Code className="mr-3 h-8 w-8" />
                  Programming Skills
                </h3>
                <motion.div className="space-y-6" variants={container} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.2 }}>
                  {skills.map(skill => (
                    <motion.div key={skill.id} variants={item} className="bg-[var(--bg-surface)] backdrop-blur-sm rounded-xl p-6 border border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-purple-400/50 transition-all duration-500">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{skill.icon}</span>
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">{skill.name}</span>
                        </div>
                        <span className="text-purple-400 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-[oklch(90%_0.012_349)] dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Tools & Frameworks */}
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-pink-400 mb-8 flex items-center">
                  <Monitor className="mr-3 h-8 w-8" />
                  Tools & Frameworks
                </h3>
                <motion.div className="grid grid-cols-2 gap-4" variants={container} whileInView="show" initial="hidden" viewport={{ once: true, amount: 0.2 }}>
                  {tools.map(tool => (
                    <motion.div key={tool.id} variants={item} className="bg-[var(--bg-surface)] backdrop-blur-sm rounded-xl p-6 border border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-pink-400/50 transition-all duration-500 hover:transform hover:scale-105 text-center">
                      <div className="text-4xl mb-3">{tool.icon}</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">{tool.name}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Specializations */}
                <div className="bg-[var(--bg-subtle)] dark:bg-gradient-to-br dark:from-purple-500/10 dark:to-pink-500/10 rounded-2xl p-8 border border-[oklch(88%_0.014_349)] dark:border-white/10">
                  <h4 className="text-2xl font-bold text-purple-400 mb-6">Specializations</h4>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Custom WordPress Development</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Responsive, cross-browser websites on React.js</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">E-commerce Solutions</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">API Development & Integration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section></AnimatedSection>
  );
}
