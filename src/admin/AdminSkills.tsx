"use client";
// src/admin/AdminSkills.tsx
import { useState, useEffect, type FormEvent } from 'react';
import { getSkills, addSkill, updateSkill, deleteSkill } from '../lib/db';
import type { Skill } from '../types/database';

const EMPTY_FORM: Omit<Skill, 'id' | 'created_at'> = {
  name: '', level: 80, category: 'Programming', icon: '🔧',
  color: 'from-purple-500 to-blue-500', order: 0,
};

const CATEGORIES = ['Programming', 'Backend', 'Tool', 'Other'];

const INPUT = "w-full bg-[var(--bg-subtle)] dark:bg-black/20 border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500";

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Skill, 'id' | 'created_at'>>(EMPTY_FORM);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => { void load(); }, []);

  async function load() {
    setLoading(true);
    try {
      setSkills(await getSkills());
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
                  <th className="text-left px-4 py-3 font-medium">Icon</th>
                  <th className="text-left px-4 py-3 font-medium">Name</th>
                  <th className="text-left px-4 py-3 font-medium">Category</th>
                  <th className="text-left px-4 py-3 font-medium">Level</th>
                  <th className="text-left px-4 py-3 font-medium">Order</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map(s => (
                  <tr key={s.id} className="border-b border-[oklch(90%_0.012_349)] dark:border-white/10 last:border-0 hover:bg-[var(--bg-subtle)] transition-colors">
                    <td className="px-4 py-3 text-xl">{s.icon}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{s.name}</td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{s.category}</td>
                    <td className="px-4 py-3">
                      {s.level > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-[oklch(90%_0.012_349)] dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className={`h-full bg-gradient-to-r ${s.color} rounded-full`} style={{ width: `${s.level}%` }} />
                          </div>
                          <span className="text-xs text-gray-400">{s.level}%</span>
                        </div>
                      ) : <span className="text-xs text-gray-400">—</span>}
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
                ))}
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

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
                Name <span className="text-red-400">*</span>
              </label>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className={INPUT} />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Icon (emoji)</label>
              <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className={INPUT} placeholder="⚛️" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={INPUT}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
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
              <span className="text-xs text-gray-400 ml-2">(set to 0 to hide progress bar — use for tools)</span>
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
