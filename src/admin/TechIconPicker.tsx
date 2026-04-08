// src/admin/TechIconPicker.tsx
// Inline icon picker for admin forms.
// `value` stores the TECH_ICONS key (e.g. "WordPress").
// Shows a searchable grid of all icons from the library.

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { TECH_ICONS, TechIcon } from '../lib/tech-icons';

const ALL_ICONS = Object.keys(TECH_ICONS);

interface Props {
  value: string;
  onChange: (key: string) => void;
}

export default function TechIconPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? ALL_ICONS.filter(k => k.toLowerCase().includes(search.toLowerCase()))
    : ALL_ICONS;

  function select(key: string) {
    onChange(key);
    setOpen(false);
    setSearch('');
  }

  return (
    <div className="space-y-2">
      {/* Preview row */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-subtle)] border border-[oklch(90%_0.012_349)] dark:border-white/10 min-w-[130px]">
          {value && TECH_ICONS[value] ? (
            <>
              <TechIcon name={value} size={20} />
              <span className="text-xs text-gray-200 truncate">{value}</span>
            </>
          ) : (
            <span className="text-xs text-gray-500 italic">No icon selected</span>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="px-3 py-2 text-xs rounded-lg border border-[oklch(90%_0.012_349)] dark:border-white/10 text-gray-300 hover:border-purple-400 hover:text-purple-400 transition"
        >
          {open ? 'Close' : 'Pick icon'}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition"
            title="Clear icon"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Dropdown grid */}
      {open && (
        <div className="rounded-xl border border-[oklch(90%_0.012_349)] dark:border-white/10 bg-[var(--bg-subtle)] p-3 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search icons…"
              className="w-full bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5 max-h-56 overflow-y-auto pr-1">
            {filtered.map(key => (
              <button
                key={key}
                type="button"
                onClick={() => select(key)}
                title={key}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition
                  ${value === key
                    ? 'border-purple-400 bg-purple-500/15'
                    : 'border-transparent hover:border-white/15 hover:bg-white/5'
                  }`}
              >
                <TechIcon name={key} size={22} />
                <span className="text-[9px] text-gray-400 leading-tight text-center line-clamp-2 w-full">{key}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full text-center text-xs text-gray-500 py-4">No icons match</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
