// src/lib/tech-icons.tsx
// Maps skill/tool names → SI brand icon + brand color.
// Used in Skills.tsx to render real tech logos instead of emojis.
// Falls back to the emoji stored in the DB if a name isn't listed here.

import {
  SiJavascript, SiPhp, SiMysql, SiHtml5, SiCss,
  SiReact, SiTailwindcss, SiBootstrap,
  SiWordpress, SiShopify, SiWebflow,
  SiWoocommerce, SiElementor, SiYoast,
  SiStripe, SiGit, SiDocker, SiVercel, SiFigma,
} from 'react-icons/si';
import {
  Database, Mail, Zap, Globe, LayoutTemplate,
  Layers, Code2, type LucideProps,
} from 'lucide-react';
import type { IconType } from 'react-icons';

type IconEntry = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: IconType | ((props: LucideProps) => React.ReactElement | null);
  color: string;
};

export const TECH_ICONS: Record<string, IconEntry> = {
  // ── Core Skills ──────────────────────────────────────────────
  'JavaScript':             { icon: SiJavascript,   color: '#F7DF1E' },
  'PHP':                    { icon: SiPhp,           color: '#9B8AC4' },
  'SQL':                    { icon: SiMysql,         color: '#4479A1' },
  'HTML':                   { icon: SiHtml5,         color: '#E34F26' },
  'CSS':                    { icon: SiCss,           color: '#1572B6' },

  // ── Frameworks & Libraries ───────────────────────────────────
  'React':                  { icon: SiReact,         color: '#61DAFB' },
  'Tailwind CSS':           { icon: SiTailwindcss,   color: '#06B6D4' },
  'Bootstrap':              { icon: SiBootstrap,     color: '#7952B3' },

  // ── Platforms ────────────────────────────────────────────────
  'WordPress':              { icon: SiWordpress,     color: '#21759B' },
  'Shopify':                { icon: SiShopify,       color: '#7AB55C' },
  'Webflow':                { icon: SiWebflow,       color: '#4353FF' },

  // ── WordPress Ecosystem ──────────────────────────────────────
  'Advanced Custom Fields': { icon: Database,        color: '#3B82F6' },
  'WooCommerce':            { icon: SiWoocommerce,   color: '#96588A' },
  'Yoast SEO':              { icon: SiYoast,         color: '#A4286A' },
  'Elementor Pro':          { icon: SiElementor,     color: '#E1348B' },
  'Contact Form 7':         { icon: Mail,            color: '#F97316' },
  'LiteSpeed Cache':        { icon: Zap,             color: '#22C55E' },
  'WPML':                   { icon: Globe,           color: '#0EA5E9' },
  'Gutenberg':              { icon: LayoutTemplate,  color: '#0073AA' },
  'Custom Post Types':      { icon: Layers,          color: '#8B5CF6' },

  // ── Backend & Integrations ───────────────────────────────────
  'API Development':        { icon: Code2,           color: '#A78BFA' },
  'Stripe':                 { icon: SiStripe,        color: '#6772E5' },

  // ── Tools ────────────────────────────────────────────────────
  'Git':                    { icon: SiGit,           color: '#F05032' },
  'Docker':                 { icon: SiDocker,        color: '#2496ED' },
  'Vercel':                 { icon: SiVercel,        color: '#FFFFFF' },
  'Figma':                  { icon: SiFigma,         color: '#F24E1E' },
};

/** Renders the brand SVG icon for a given tech name at a consistent size. */
export function TechIcon({ name, size = 28 }: { name: string; size?: number }) {
  const entry = TECH_ICONS[name];
  if (!entry) return null;
  const Icon = entry.icon as IconType;
  return <Icon size={size} color={entry.color} />;
}
