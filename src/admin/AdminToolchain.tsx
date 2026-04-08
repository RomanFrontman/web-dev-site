"use client";
// src/admin/AdminToolchain.tsx
import { useState, useEffect, type FormEvent } from 'react';
import { GripVertical } from 'lucide-react';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../lib/db';
import type { Skill } from '../types/database';
import toolDescriptions from '../data/tool-descriptions.json';
import TechIconPicker from './TechIconPicker';
import { TechIcon, TECH_ICONS } from '../lib/tech-icons';

const TOOL_CATEGORIES = ['Platforms', 'WordPress Ecosystem', 'Backend & Integrations', 'Tools'];

type ToolForm = {
  name: string;
  icon: string;
  category: string;
  description: string;
  order: number;
  level: number;
  color: string;
};

const EMPTY_FORM: ToolForm = {
  name: '', icon: '', category: 'Platforms', description: '', order: 0,
  level: 0, color: 'from-pink-400 to-purple-400',
};

const INPUT = "w-full bg-[var(--bg-subtle)] dark:bg-black/20 border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500";

function descriptionHint(name: string): string | undefined {
  return (toolDescriptions as Record<string, string>)[name];
}

function DropLine({ colSpan }: { colSpan: number }) {
  return (
    <tr className="pointer-events-none select-none">
      <td colSpan={colSpan} className="p-0">
        <div className="relative mx-3 my-0.5">
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_8px_3px_rgba(244,114,182,0.6)]" />
          <div className="h-0.5 bg-pink-400 rounded-full shadow-[0_0_6px_2px_rgba(244,114,182,0.4)]" />
        </div>
      </td>
    </tr>
  );
}

export default function AdminToolchain() {
  const [tools, setTools] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ToolForm>(EMPTY_FORM);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [insertIdx, setInsertIdx] = useState<number | null>(null);

  useEffect(() => { void load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const all = await getSkills();
      setTools(
        all
          .filter(s => TOOL_CATEGORIES.includes(s.category) || s.category === 'Tool')
          .sort((a, b) => a.order - b.order)
      );
    } catch {
      flash(false, 'Failed to load toolchain.');
    } finally {
      setLoading(false);
    }
  }

  function flash(ok: boolean, msg: string) {
    setFeedback({ ok, msg });
    setTimeout(() => setFeedback(null), 3000);
  }

  function openAdd() { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); }

  function openEdit(t: Skill) {
    setEditId(t.id);
    setForm({
      name: t.name,
      icon: t.icon,
      category: t.category,
      description: t.description ?? descriptionHint(t.name) ?? '',
      order: t.order,
      level: t.level,
      color: t.color,
    });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this tool?')) return;
    setSaving(true);
    try {
      await deleteSkill(id);
      flash(true, 'Tool deleted.');
      await load();
    } catch {
      flash(false, 'Failed to delete tool.');
    } finally {
      setSaving(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editId) {
        await updateSkill(editId, form);
        flash(true, 'Tool updated.');
      } else {
        await addSkill(form);
        flash(true, 'Tool added.');
      }
      await load();
      setShowForm(false);
      setEditId(null);
    } catch {
      flash(false, 'Failed to save tool.');
    } finally {
      setSaving(false);
    }
  }

  function handleNameChange(name: string) {
    const hint = descriptionHint(name);
    setForm(prev => ({
      ...prev,
      name,
      description: prev.description === '' && hint ? hint : prev.description,
    }));
  }

  // ── Drag & drop ──────────────────────────────────────────────

  function handleDragStart(index: number) {
    setDragIdx(index);
  }

  function handleDragOver(e: React.DragEvent<HTMLTableRowElement>, index: number) {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const insert = e.clientY < rect.top + rect.height / 2 ? index : index + 1;
    if (insert !== insertIdx) setInsertIdx(insert);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    if (dragIdx === null || insertIdx === null) { resetDrag(); return; }
    const target = insertIdx > dragIdx ? insertIdx - 1 : insertIdx;
    if (target === dragIdx) { resetDrag(); return; }
    const reordered = [...tools];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(target, 0, moved);
    const withOrder = reordered.map((t, i) => ({ ...t, order: i + 1 }));
    setTools(withOrder);
    resetDrag();
    void saveOrder(withOrder);
  }

  function resetDrag() { setDragIdx(null); setInsertIdx(null); }

  async function saveOrder(ordered: Skill[]) {
    setSaving(true);
    try {
      await Promise.all(ordered.map((t, i) => updateSkill(t.id, { order: i + 1 })));
      flash(true, 'Order saved.');
    } catch {
      flash(false, 'Failed to save order.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Toolchain</h2>
        <button
          onClick={openAdd}
          disabled={saving}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 rounded-lg text-white text-sm font-medium transition disabled:opacity-50"
        >
          + Add Tool
        </button>
      </div>

      {feedback && (
        <div className={`px-4 py-3 rounded-lg text-sm ${feedback.ok ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {feedback.msg}
        </div>
      )}

      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">Loading…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(90%_0.012_349)] dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
                  <th className="w-8 px-2 py-3" />
                  <th className="text-left px-4 py-3 font-medium">Icon</th>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Category</th>
                  <th className="text-left px-4 py-3 font-medium">Description</th>
                  <th className="text-left px-4 py-3 font-medium">Order</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody onDragOver={e => e.preventDefault()}>
                {tools.map((t, i) => (
                  <>
                    {insertIdx === i && dragIdx !== null && dragIdx !== i && dragIdx !== i - 1 && (
                      <DropLine key={`drop-${i}`} colSpan={7} />
                    )}
                    <tr
                      key={t.id}
                      draggable
                      onDragStart={() => handleDragStart(i)}
                      onDragOver={e => handleDragOver(e, i)}
                      onDrop={handleDrop}
                      onDragEnd={resetDrag}
                      className={`border-b border-[oklch(90%_0.012_349)] dark:border-white/10 last:border-0 transition-colors
                        ${dragIdx === i ? 'opacity-40 bg-[var(--bg-subtle)]' : 'hover:bg-[var(--bg-subtle)]'}
                      `}
                    >
                      <td className="px-2 py-3 cursor-grab active:cursor-grabbing text-gray-400">
                        <GripVertical size={16} />
                      </td>
                      <td className="px-4 py-3">
                        {TECH_ICONS[t.icon] || TECH_ICONS[t.name]
                          ? <TechIcon name={TECH_ICONS[t.icon] ? t.icon : t.name} size={22} />
                          : <span className="text-lg">{t.icon || '—'}</span>}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{t.name}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">{t.category}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs">
                        <span className="line-clamp-1">
                          {t.description ?? descriptionHint(t.name) ?? <span className="italic opacity-50">—</span>}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{t.order}</td>
                      <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                        <button onClick={() => openEdit(t)} disabled={saving} className="px-3 py-1.5 text-xs rounded-lg border border-[oklch(90%_0.012_349)] dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-pink-400 hover:text-pink-400 transition disabled:opacity-50">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(t.id)} disabled={saving} className="px-3 py-1.5 text-xs rounded-lg text-red-400 hover:bg-red-500/10 transition disabled:opacity-50">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
                {insertIdx === tools.length && dragIdx !== null && dragIdx !== tools.length - 1 && (
                  <DropLine colSpan={7} />
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--bg-surface)] rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 p-6 space-y-4"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {editId ? 'Edit Tool' : 'Add Tool'}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                value={form.name}
                onChange={e => handleNameChange(e.target.value)}
                required
                className={INPUT}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Icon</label>
              <TechIconPicker value={form.icon} onChange={icon => setForm({ ...form, icon })} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={INPUT}>
                {TOOL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Order</label>
              <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} className={INPUT} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              rows={2}
              placeholder="Short description of what you can do with this tool…"
              className={INPUT + ' resize-none'}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 rounded-lg text-white text-sm font-medium transition disabled:opacity-50">
              {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Tool'}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => { setShowForm(false); setEditId(null); }}
              className="px-5 py-2 rounded-lg border border-[oklch(90%_0.012_349)] dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-[var(--bg-subtle)] text-sm transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
