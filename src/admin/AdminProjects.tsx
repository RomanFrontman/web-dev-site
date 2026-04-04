"use client";
// src/admin/AdminProjects.tsx
import { useState, useEffect, type FormEvent } from 'react';
import { getProjects, addProject, updateProject, deleteProject } from '../lib/db';
import type { Project } from '../types/database';

const EMPTY_FORM: Omit<Project, 'id' | 'created_at'> = {
  title: '', description: '', tech: [], live_url: '', github_url: '',
  image: '', featured: false, category: '', order: 0,
};

const INPUT = "w-full bg-[var(--bg-subtle)] dark:bg-black/20 border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1.5">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Project, 'id' | 'created_at'>>(EMPTY_FORM);
  const [techInput, setTechInput] = useState('');
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  useEffect(() => { void load(); }, []);

  async function load() {
    setLoading(true);
    try {
      setProjects(await getProjects());
    } catch {
      flash(false, 'Failed to load projects.');
    } finally {
      setLoading(false);
    }
  }

  function flash(ok: boolean, msg: string) {
    setFeedback({ ok, msg });
    setTimeout(() => setFeedback(null), 3000);
  }

  function openAdd() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setTechInput('');
    setShowForm(true);
  }

  function openEdit(p: Project) {
    setEditId(p.id);
    setForm({ title: p.title, description: p.description, tech: p.tech, live_url: p.live_url, github_url: p.github_url, image: p.image, featured: p.featured, category: p.category, order: p.order });
    setTechInput(p.tech.join(', '));
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Delete this project?')) return;
    setSaving(true);
    try {
      await deleteProject(id);
      flash(true, 'Project deleted.');
      await load();
    } catch {
      flash(false, 'Failed to delete project.');
    } finally {
      setSaving(false);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const data: Omit<Project, 'id' | 'created_at'> = {
        ...form,
        tech: techInput.split(',').map(t => t.trim()).filter(Boolean),
      };
      if (editId) {
        await updateProject(editId, data);
        flash(true, 'Project updated.');
      } else {
        await addProject(data);
        flash(true, 'Project added.');
      }
      await load();
      setShowForm(false);
      setEditId(null);
    } catch {
      flash(false, 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Projects</h2>
        <button
          onClick={openAdd}
          disabled={saving}
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 rounded-lg text-white text-sm font-medium transition disabled:opacity-50"
        >
          + Add Project
        </button>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className={`px-4 py-3 rounded-lg text-sm ${feedback.ok ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {feedback.msg}
        </div>
      )}

      {/* Table */}
      <div className="bg-[var(--bg-surface)] rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">Loading…</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[oklch(90%_0.012_349)] dark:border-white/10 text-xs text-gray-500 dark:text-gray-400">
                  <th className="text-left px-4 py-3 font-medium">Order</th>
                  <th className="text-left px-4 py-3 font-medium">Title</th>
                  <th className="text-left px-4 py-3 font-medium">Tech</th>
                  <th className="text-left px-4 py-3 font-medium">Featured</th>
                  <th className="text-right px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map(p => (
                  <tr key={p.id} className="border-b border-[oklch(90%_0.012_349)] dark:border-white/10 last:border-0 hover:bg-[var(--bg-subtle)] transition-colors">
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{p.order}</td>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{p.title}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {p.tech.slice(0, 3).map(t => (
                          <span key={t} className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded text-xs">{t}</span>
                        ))}
                        {p.tech.length > 3 && <span className="text-gray-400 text-xs">+{p.tech.length - 3}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {p.featured
                        ? <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs">Yes</span>
                        : <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs">No</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => openEdit(p)} disabled={saving} className="px-3 py-1.5 text-xs rounded-lg border border-[oklch(90%_0.012_349)] dark:border-white/10 text-gray-600 dark:text-gray-300 hover:border-purple-400 hover:text-purple-400 transition disabled:opacity-50">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(p.id)} disabled={saving} className="px-3 py-1.5 text-xs rounded-lg text-red-400 hover:bg-red-500/10 transition disabled:opacity-50">
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

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--bg-surface)] rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 p-6 space-y-4"
        >
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            {editId ? 'Edit Project' : 'Add Project'}
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title" required>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required className={INPUT} />
            </Field>
            <Field label="Category">
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={INPUT} placeholder="Corporate, Frontend…" />
            </Field>
          </div>

          <Field label="Description">
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} className={INPUT} />
          </Field>

          <Field label="Tech (comma-separated)">
            <input value={techInput} onChange={e => setTechInput(e.target.value)} className={INPUT} placeholder="React, TypeScript, Tailwind" />
          </Field>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Live URL">
              <input value={form.live_url} onChange={e => setForm({ ...form, live_url: e.target.value })} className={INPUT} />
            </Field>
            <Field label="GitHub URL">
              <input value={form.github_url} onChange={e => setForm({ ...form, github_url: e.target.value })} className={INPUT} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Image path">
              <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className={INPUT} placeholder="/images/portfolio1.png" />
            </Field>
            <Field label="Order">
              <input type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} className={INPUT} />
            </Field>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={form.featured}
              onChange={e => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 rounded accent-purple-500"
            />
            <label htmlFor="featured" className="text-sm text-gray-600 dark:text-gray-300">
              Featured — shown on the public portfolio
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 rounded-lg text-white text-sm font-medium transition disabled:opacity-50">
              {saving ? 'Saving…' : editId ? 'Save Changes' : 'Add Project'}
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
