import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { getSkills } from '../lib/db';
import type { Skill } from '../types/database';
import toolDescriptions from '../data/tool-descriptions.json';

// Categories that carry a proficiency level (shown in left column).
// 'Programming' is the legacy DB value — kept for backward compatibility.
const SKILL_CATS = new Set(['Core Skills', 'Frameworks & Libraries', 'Programming']);
const SKILL_CATEGORY_ORDER = ['Core Skills', 'Frameworks & Libraries', 'Programming'] as const;
// 'Tool' is the legacy DB value for the right column — kept for backward compatibility.
const TOOL_CATEGORY_ORDER  = ['Platforms', 'WordPress Ecosystem', 'Backend & Integrations', 'Tools', 'Tool'] as const;

// Fallback data shown if Supabase fetch fails.
// Add / edit entries via the admin panel to persist them in production.
const FALLBACK_SKILLS: Skill[] = [
  // Core Skills
  { id: '1', name: 'JavaScript',  level: 88, category: 'Core Skills',            icon: '🔥', color: 'from-yellow-400 to-yellow-500',  order: 1, created_at: '' },
  { id: '2', name: 'PHP',         level: 85, category: 'Core Skills',            icon: '🐘', color: 'from-purple-500 to-purple-600',  order: 2, created_at: '' },
  { id: '3', name: 'SQL',         level: 85, category: 'Core Skills',            icon: '🗄️', color: 'from-orange-500 to-red-500',    order: 3, created_at: '' },
  { id: '4', name: 'HTML',        level: 95, category: 'Core Skills',            icon: '🌐', color: 'from-orange-400 to-orange-600',  order: 4, created_at: '' },
  { id: '5', name: 'CSS',         level: 93, category: 'Core Skills',            icon: '💎', color: 'from-sky-400 to-blue-500',       order: 5, created_at: '' },
  // Frameworks & Libraries
  { id: '6', name: 'React',       level: 90, category: 'Frameworks & Libraries', icon: '⚛️', color: 'from-cyan-500 to-blue-500',     order: 6, created_at: '' },
  { id: '7', name: 'Tailwind CSS',level: 90, category: 'Frameworks & Libraries', icon: '🎨', color: 'from-teal-400 to-cyan-500',     order: 7, created_at: '' },
  { id: '8', name: 'Bootstrap',   level: 80, category: 'Frameworks & Libraries', icon: '📘', color: 'from-indigo-500 to-indigo-600', order: 8, created_at: '' },
];
const FALLBACK_TOOLS: Skill[] = [
  // Platforms
  { id: '9',  name: 'WordPress', level: 0, category: 'Platforms', icon: '🚀', color: 'from-blue-500 to-blue-600',    order: 1, created_at: '' },
  { id: '10', name: 'Shopify',   level: 0, category: 'Platforms', icon: '🛍️', color: 'from-green-500 to-teal-500',  order: 2, created_at: '' },
  { id: '11', name: 'Webflow',   level: 0, category: 'Platforms', icon: '🌊', color: 'from-blue-400 to-cyan-400',   order: 3, created_at: '' },
  // WordPress Ecosystem
  { id: '12', name: 'Advanced Custom Fields', level: 0, category: 'WordPress Ecosystem', icon: '📝', color: 'from-blue-400 to-blue-600',     order: 4,  created_at: '' },
  { id: '13', name: 'WooCommerce',            level: 0, category: 'WordPress Ecosystem', icon: '🛒', color: 'from-purple-600 to-violet-600', order: 5,  created_at: '' },
  { id: '14', name: 'Yoast SEO',              level: 0, category: 'WordPress Ecosystem', icon: '🔍', color: 'from-purple-500 to-violet-500', order: 6,  created_at: '' },
  { id: '15', name: 'Elementor Pro',          level: 0, category: 'WordPress Ecosystem', icon: '✨', color: 'from-pink-500 to-purple-400',   order: 7,  created_at: '' },
  { id: '16', name: 'Contact Form 7',         level: 0, category: 'WordPress Ecosystem', icon: '📧', color: 'from-orange-500 to-red-400',    order: 8,  created_at: '' },
  { id: '17', name: 'LiteSpeed Cache',        level: 0, category: 'WordPress Ecosystem', icon: '🔋', color: 'from-green-400 to-teal-400',    order: 9,  created_at: '' },
  { id: '18', name: 'WPML',                   level: 0, category: 'WordPress Ecosystem', icon: '🗺️', color: 'from-sky-500 to-blue-600',     order: 10, created_at: '' },
  { id: '19', name: 'Gutenberg',              level: 0, category: 'WordPress Ecosystem', icon: '✏️', color: 'from-gray-500 to-slate-500',    order: 11, created_at: '' },
  { id: '20', name: 'Custom Post Types',      level: 0, category: 'WordPress Ecosystem', icon: '📋', color: 'from-gray-600 to-slate-600',    order: 12, created_at: '' },
  // Backend & Integrations
  { id: '21', name: 'API Development', level: 0, category: 'Backend & Integrations', icon: '🔌', color: 'from-violet-500 to-purple-600', order: 13, created_at: '' },
  { id: '22', name: 'Stripe',          level: 0, category: 'Backend & Integrations', icon: '💳', color: 'from-indigo-500 to-blue-500',   order: 14, created_at: '' },
  // Tools
  { id: '23', name: 'Git',    level: 0, category: 'Tools', icon: '🔧', color: 'from-gray-500 to-gray-600',   order: 15, created_at: '' },
  { id: '24', name: 'Docker', level: 0, category: 'Tools', icon: '🐳', color: 'from-blue-500 to-blue-600',   order: 16, created_at: '' },
  { id: '25', name: 'Vercel', level: 0, category: 'Tools', icon: '▲',  color: 'from-gray-700 to-gray-900',   order: 17, created_at: '' },
  { id: '26', name: 'Figma',  level: 0, category: 'Tools', icon: '🖌️', color: 'from-pink-500 to-purple-500', order: 18, created_at: '' },
];

function getRank(level: number): string {
  if (level >= 90) return 'Master';
  if (level >= 70) return 'Expert';
  if (level >= 50) return 'Adept';
  return 'Apprentice';
}
function getRankTextColor(level: number): string {
  if (level >= 90) return 'text-yellow-400';
  if (level >= 70) return 'text-purple-400';
  if (level >= 50) return 'text-blue-400';
  return 'text-gray-400';
}

interface SkillCardProps { skill: Skill; index: number; selected: boolean; onSelect: () => void; }

function SkillCard({ skill, index, selected, onSelect }: SkillCardProps) {
  const rank = getRank(skill.level);
  const [barWidth, setBarWidth] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!selected) { setTransitioning(false); setBarWidth(0); return; }
    const id = setTimeout(() => { setTransitioning(true); setBarWidth(skill.level); }, 150);
    return () => clearTimeout(id);
  }, [selected, skill.level]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.08 }}
        onClick={onSelect}
        className={`relative bg-[var(--bg-surface)] backdrop-blur-md rounded-xl p-5 border cursor-pointer
          transition-all duration-300 hover:scale-105 overflow-visible
          ${selected
            ? 'border-purple-400/70 ring-2 ring-purple-400/25'
            : 'border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-purple-400/50 hover:ring-2 hover:ring-purple-400/20'
          }`}
      >
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rotate-45 bg-gradient-to-br from-purple-400 to-pink-400" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{skill.icon}</span>
            <div>
              <div className="text-base font-bold text-gray-900 dark:text-white leading-tight">{skill.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{skill.category}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold text-sm tabular-nums">{skill.level}%</span>
            <span className="text-gray-400 dark:text-gray-500 text-xs">{selected ? '▲' : '▼'}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mt-1.5 mb-1 mx-1 bg-[var(--bg-subtle)] rounded-lg p-4 border border-purple-400/30 space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Proficiency</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-400 tabular-nums">{skill.level}%</span>
                    <span className={`text-xs font-bold ${getRankTextColor(skill.level)}`}>{rank}</span>
                  </div>
                </div>
                <div className="w-full bg-[oklch(90%_0.012_349)] dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full ${transitioning ? 'transition-[width] duration-1000 ease-out' : 'transition-none'}`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center text-sm pt-1 border-t border-white/5">
                <span className="text-gray-500 dark:text-gray-400">Category</span>
                <span className="text-purple-400 font-medium">{skill.category}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ToolCardProps { tool: Skill; index: number; selected: boolean; onSelect: () => void; description: string; }

function ToolCard({ tool, index, selected, onSelect, description }: ToolCardProps) {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.06 }}
        onClick={onSelect}
        className={`relative bg-[var(--bg-surface)] backdrop-blur-md rounded-xl p-4 border cursor-pointer
          transition-all duration-300 hover:scale-105 text-center overflow-visible
          ${selected
            ? 'border-pink-400/70 ring-2 ring-pink-400/25'
            : 'border-[oklch(90%_0.012_349)] dark:border-white/10 hover:border-pink-400/50 hover:ring-2 hover:ring-pink-400/20'
          }`}
      >
        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rotate-45 bg-gradient-to-br from-pink-400 to-purple-400" />
        <div className="text-2xl mb-1.5">{tool.icon}</div>
        <div className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{tool.name}</div>
      </motion.div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mt-1.5 mb-1 bg-[var(--bg-subtle)] rounded-lg p-3 border border-pink-400/30 text-left">
              <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed">{description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Legacy category names from the old DB schema — hidden from display
const LEGACY_CATS = new Set(['Programming', 'Tool']);

// Thin label separating category groups inside a column.
// Legacy catch-all groups render without a label so old DB data stays visible
// while the admin panel is being updated to the new category names.
function CategoryLabel({ label }: { label: string }) {
  if (LEGACY_CATS.has(label)) return null;
  return (
    <div className="flex items-center gap-3 pt-2">
      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-[oklch(90%_0.012_349)] dark:bg-white/10" />
    </div>
  );
}

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>(FALLBACK_SKILLS);
  const [tools, setTools]   = useState<Skill[]>(FALLBACK_TOOLS);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    getSkills()
      .then(all => {
        setSkills(
          all.filter(s => SKILL_CATS.has(s.category)).sort((a, b) => a.order - b.order)
        );
        setTools(
          all.filter(s => !SKILL_CATS.has(s.category)).sort((a, b) => a.order - b.order)
        );
      })
      .catch(() => { /* fallback already set as default state */ })
      .finally(() => setLoading(false));
  }, []);

  function toggleSelect(id: string) {
    setSelectedId(prev => prev === id ? null : id);
  }

  // Group helpers
  function groupByCategory(items: Skill[], order: readonly string[]) {
    const map = new Map<string, Skill[]>();
    for (const cat of order) map.set(cat, []);
    for (const item of items) {
      const bucket = map.get(item.category);
      if (bucket) bucket.push(item);
    }
    return map;
  }

  const skillGroups = groupByCategory(skills, SKILL_CATEGORY_ORDER);
  const toolGroups  = groupByCategory(tools,  TOOL_CATEGORY_ORDER);

  // Global stagger index across all skill groups (so cards animate in sequence down the column)
  let skillAnimIdx = 0;

  return (
    <AnimatedSection>
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Skills & Technologies
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Constantly evolving and mastering the latest technologies to deliver cutting-edge solutions
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mt-6" />
            </div>

            {loading ? (
              <div className="grid lg:grid-cols-2 gap-12">
                {[0, 1].map(col => (
                  <div key={col} className="space-y-4">
                    {[1, 2, 3, 4].map(n => (
                      <div key={n} className="bg-[var(--bg-surface)] rounded-xl p-5 border border-[oklch(90%_0.012_349)] dark:border-white/10 animate-pulse">
                        <div className="h-4 bg-[var(--bg-subtle)] rounded w-1/3 mb-3" />
                        <div className="h-2 bg-[var(--bg-subtle)] rounded w-full" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

                {/* ── Left column: proficiency skills ── */}
                <div className="space-y-2">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-purple-400 flex items-center gap-2">⚔️ Skills</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Languages & frameworks I've built proficiency in — click to inspect my level.
                    </p>
                  </div>

                  {SKILL_CATEGORY_ORDER.map(cat => {
                    const group = skillGroups.get(cat) ?? [];
                    if (group.length === 0) return null;
                    return (
                      <div key={cat} className="space-y-2">
                        <CategoryLabel label={cat} />
                        {group.map(skill => {
                          const idx = skillAnimIdx++;
                          return (
                            <SkillCard
                              key={skill.id}
                              skill={skill}
                              index={idx}
                              selected={selectedId === skill.id}
                              onSelect={() => toggleSelect(skill.id)}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {/* ── Right column: platforms & tools ── */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-pink-400 flex items-center gap-2">🛡️ Toolchain</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Platforms & tools I reach for on every project.
                    </p>
                  </div>

                  {TOOL_CATEGORY_ORDER.map(cat => {
                    const group = toolGroups.get(cat) ?? [];
                    if (group.length === 0) return null;
                    return (
                      <div key={cat} className="space-y-3">
                        <CategoryLabel label={cat} />
                        <div className="grid grid-cols-2 gap-3">
                          {group.map((tool, i) => (
                            <ToolCard
                              key={tool.id}
                              tool={tool}
                              index={i}
                              selected={selectedId === tool.id}
                              onSelect={() => toggleSelect(tool.id)}
                              description={tool.description ?? (toolDescriptions as Record<string, string>)[tool.name] ?? 'Used actively in my workflow.'}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {/* Abilities */}
                  <div className="bg-[var(--bg-subtle)] dark:bg-gradient-to-br dark:from-purple-500/10 dark:to-pink-500/10 rounded-2xl p-8 border border-[oklch(88%_0.014_349)] dark:border-white/10 mt-4">
                    <h4 className="text-2xl font-bold text-purple-400 mb-6">Abilities</h4>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <span>⚔️</span>
                        <span className="text-gray-600 dark:text-gray-300">Custom WordPress Development</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span>⭐</span>
                        <span className="text-gray-600 dark:text-gray-300">Responsive, cross-browser websites on React.js</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span>⚔️</span>
                        <span className="text-gray-600 dark:text-gray-300">E-commerce Solutions</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span>⭐</span>
                        <span className="text-gray-600 dark:text-gray-300">API Development & Integration</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}
