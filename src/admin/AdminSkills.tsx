"use client";
// src/admin/AdminSkills.tsx
import { useState, useEffect, type FormEvent } from 'react';
import { GripVertical } from 'lucide-react';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../lib/db';
import type { Skill } from '../types/database';
import TechIconPicker from './TechIconPicker';
import { TechIcon, TECH_ICONS } from '../lib/tech-icons';

const SKILL_CATEGORIES = ['Core Skills', 'Frameworks & Libraries'];

const EMPTY_FORM: Omit<Skill, 'id' | 'created_at'> = {
  name: '', level: 80, category: 'Core Skills', icon: '',
  color: 'from-purple-500 to-blue-500', order: 0,
};

const INPUT = "w-full bg-[var(--bg-subtle)] dark:bg-black/20 border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500";

function DropLine({ colSpan }: { colSpan: number }) {
  return (
    <tr className="pointer-events-none select-none">
      <td colSpan={colSpan} className="p-0">
        <div className="relative mx-3 my-0.5">
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_3px_rgba(192,132,252,0.6)]" />
          <div className="h-0.5 bg-purple-400 rounded-full shadow-[0_0_6px_2px_rgba(192,132,252,0.4)]" />
        </div>
      </td>
    </tr>
  );
}

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Skill, 'id' | 'created_at'>>(EMPTY_FORM);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [insertIdx, setInsertIdx] = useState<number | null>(null);

  useEffect(() => { void load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const all = await getSkills();
      setSkills(all.filter(s => SKILL_CATEGORIES.includes(s.category) || s.category === 'Programming'));
    } catch {
      flash(false, 'Failed to load skills.');
    } finally {
      setLoading(false);
    }
  }

  function flash(ok: boolean, msg: string) {
    setFeedback({ ok, msg });
    setTimeout(() => setFeedback(null), 3000);
  }

  function openAdd() { setEditId(null); setForm(EMPTY_FORM); setShowForm(true); }

  function openEdit(s: Skill) {
    setEditId(s.id);
    setForm({ name: s.name, level: s.level, category: s.category, icon: s.icon, color: s.color, order: s.order });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this skill?')) return;
    setSaving(true);
    try {
      await deleteSkill(id);
      flash(true, 'Skill deleted.');
      await load();
    } catch {
      flash(false, 'Failed to delete skill.');
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
        flash(true, 'Skill updated.');
      } else {
        await addSkill(form);
        flash(true, 'Skill added.');
      }
      await load();
      setShowForm(false);
      setEditId(null);
    } catch {
      flash(false, 'Failed to save skill.');
    } finally {
      setSaving(false);
    }
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
    // Adjust target index since we're removing dragIdx first
    const target = insertIdx > dragIdx ? insertIdx - 1 : insertIdx;
    if (target === dragIdx) { resetDrag(); return; }
    const reordered = [...skills];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(target, 0, moved);
    const withOrder = reordered.map((s, i) => ({ ...s, order: i + 1 }));
    setSkills(withOrder);
    resetDrag();
    void saveOrder(withOrder);
  }

  function resetDrag() { setDragIdx(null); setInsertIdx(null); }

  async function saveOrder(ordered: Skill[]) {
    setSaving(true);
    try {
      await Promise.all(ordered.map((s, i) => updateSkill(s.id, { order: i + 1 })));
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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Skills</h2>
        <button
          onClick={openAdd}
          disabled={saving}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 rounded-lg text-white text-sm font-medium transition disabled:opacity-50"
        >
          + Add Skill
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
                  <th className="text-left px-4 py-3 font-medium">Level</th>
                  <th className="text-left px-4 py-3 font-medium">Order</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody onDragOver={e => e.preventDefault()}>
                {skills.map((s, i) => (
                  <>
                    {insertIdx === i && dragIdx !== null && dragIdx !== i && dragIdx !== i - 1 && (
                      <DropLine key={`drop-${i}`} colSpan={7} />
                    )}
                    <tr
                      key={s.id}
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
                        {TECH_ICONS[s.icon] || TECH_ICONS[s.name]
                          ? <TechIcon name={TECH_ICONS[s.icon] ? s.icon : s.name} size={22} />
                          : <span className="text-lg">{s.icon || '—'}</span>}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{s.category}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-[oklch(90%_0.012_349)] dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${s.color} rounded-full`} style={{ width: `${s.level}%` }} />
                          </div>
                          <span className="text-xs text-gray-400">{s.level}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{s.order}</td>
                      <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                        <button onClick={() => openEdit(s)} disabled={saving} className="px-3 py-1.5 text-xs rounded-lg border border-[oklch(90%_0.012_349)] dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-purple-400 hover:text-purple-400 transition disabled:opacity-50">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(s.id)} disabled={saving} className="px-3 py-1.5 text-xs rounded-lg text-red-400 hover:bg-red-500/10 transition disabled:opacity-50">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
                {insertIdx === skills.length && dragIdx !== null && dragIdx !== skills.length - 1 && (
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
            {editId ? 'Edit Skill' : 'Add Skill'}
          </h3>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
              Name <span className="text-red-400">*</span>
            </label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className={INPUT} />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Icon</label>
            <TechIconPicker value={form.icon} onChange={icon => setForm({ ...form, icon })} />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={INPUT}>
                {SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Order</label>
              <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} className={INPUT} />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
              Level: <span className="text-purple-400 font-medium">{form.level}%</span>
            </label>
            <input
              type="range" min={0} max={100} value={form.level}
              onChange={e => setForm({ ...form, level: Number(e.target.value) })}
              className="w-full accent-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
              Gradient color (Tailwind classes)
            </label>
            <input value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className={INPUT} placeholder="from-purple-500 to-blue-500" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 rounded-lg text-white text-sm font-medium transition disabled:opacity-50">
              {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Skill'}
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
