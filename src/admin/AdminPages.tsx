import { useState, useEffect, type FormEvent } from 'react';
import { getPages, addPage, updatePage, deletePage } from '../lib/db';
import PageContent from '../components/PageContent';
import type { Page } from '../types/database';

// These slugs belong to built-in routes — can be edited but never deleted.
const PROTECTED_SLUGS = ['privacy-policy', 'terms-of-use', 'cookies-policy'];

const EMPTY_FORM = {
  title: '',
  slug: '',
  content: '',
  is_published: true,
};

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, ''); // strip leading/trailing hyphens
}

type EditorTab = 'edit' | 'preview';

export default function AdminPages() {
  const [pages, setPages]       = useState<Page[]>([]);
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState<string | null>(null);
  const [form, setForm]         = useState(EMPTY_FORM);
  const [tab, setTab]           = useState<EditorTab>('edit');
  const [feedback, setFeedback] = useState('');

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try { setPages(await getPages()); } catch { setFeedback('Failed to load pages.'); }
    finally { setLoading(false); }
  }

  function openNew() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setTab('edit');
    setFeedback('');
    setShowForm(true);
  }

  function openEdit(page: Page) {
    setEditId(page.id);
    setForm({ title: page.title, slug: page.slug, content: page.content, is_published: page.is_published });
    setTab('edit');
    setFeedback('');
    setShowForm(true);
  }

  function cancel() {
    setShowForm(false);
    setEditId(null);
    setForm(EMPTY_FORM);
    setFeedback('');
  }

  function handleTitleChange(title: string) {
    setForm(f => ({
      ...f,
      title,
      // Auto-generate slug only when creating a new page and slug hasn't been manually edited
      slug: editId ? f.slug : toSlug(title),
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.slug) {
      setFeedback('Slug cannot be empty. Use a title with at least one letter or number.');
      return;
    }
    setSaving(true);
    setFeedback('');
    try {
      if (editId) {
        await updatePage(editId, form);
      } else {
        await addPage(form);
      }
      await load();
      cancel();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('duplicate') || msg.includes('unique')) {
        setFeedback(`A page with slug "${form.slug}" already exists. Choose a different slug.`);
      } else {
        setFeedback(msg || 'Save failed.');
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(page: Page) {
    if (!confirm(`Delete "${page.title}"? This cannot be undone.`)) return;
    try {
      await deletePage(page.id);
      await load();
    } catch { setFeedback('Delete failed.'); }
  }

  const inputCls = 'w-full bg-[var(--bg-subtle)] border border-white/10 rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500';
  const labelCls = 'block text-sm text-gray-400 mb-1';

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Pages</h2>
          <p className="text-sm text-gray-400 mt-0.5">Manage legal pages and create custom pages</p>
        </div>
        {!showForm && (
          <button onClick={openNew}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
            + New Page
          </button>
        )}
      </div>

      {feedback && (
        <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2">{feedback}</p>
      )}

      {/* ── Editor form ── */}
      {showForm && (
        <div className="bg-[var(--bg-surface)] border border-white/10 rounded-xl p-6 space-y-5">
          <h3 className="text-base font-semibold text-white">{editId ? 'Edit Page' : 'New Page'}</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className={labelCls}>Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={e => handleTitleChange(e.target.value)}
                  placeholder="Privacy Policy"
                  className={inputCls}
                />
              </div>
              {/* Slug */}
              <div>
                <label className={labelCls}>
                  Slug *
                  <span className="text-gray-500 ml-2 text-xs">— public URL: /p/<strong>{form.slug || '…'}</strong></span>
                </label>
                <input
                  required
                  value={form.slug}
                  onChange={e => setForm(f => ({ ...f, slug: toSlug(e.target.value) }))}
                  placeholder="privacy-policy"
                  className={inputCls}
                  disabled={PROTECTED_SLUGS.includes(form.slug) && !!editId}
                />
              </div>
            </div>

            {/* Published */}
            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={form.is_published}
                onChange={e => setForm(f => ({ ...f, is_published: e.target.checked }))}
                className="w-4 h-4 accent-purple-500"
              />
              <span className="text-sm text-gray-300">Published (visible to visitors)</span>
            </label>

            {/* Content editor with preview toggle */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className={labelCls}>Content (HTML)</label>
                <div className="flex text-xs rounded-lg overflow-hidden border border-white/10">
                  {(['edit', 'preview'] as EditorTab[]).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTab(t)}
                      className={`px-3 py-1 transition-colors duration-150 capitalize
                        ${tab === t ? 'bg-purple-500/30 text-purple-300' : 'text-gray-400 hover:text-white'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {tab === 'edit' ? (
                <textarea
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                  rows={18}
                  placeholder="<h2>Section heading</h2>&#10;<p>Your paragraph text here...</p>"
                  className={`${inputCls} font-mono text-xs leading-relaxed resize-y`}
                />
              ) : (
                <div className="min-h-[18rem] bg-[var(--bg-subtle)] border border-white/10 rounded-lg p-4 overflow-auto text-sm text-gray-300">
                  {form.content
                    ? <PageContent html={form.content} />
                    : <span className="text-gray-500 italic">Nothing to preview yet.</span>
                  }
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Use standard HTML tags: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;&lt;li&gt;, &lt;strong&gt;, &lt;a href=""&gt;, &lt;table&gt;, &lt;hr&gt;
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {saving ? 'Saving…' : editId ? 'Save Changes' : 'Create Page'}
              </button>
              <button type="button" onClick={cancel}
                className="px-5 py-2 border border-white/10 text-gray-300 text-sm rounded-lg hover:bg-white/5 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Pages list ── */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(n => (
            <div key={n} className="bg-[var(--bg-surface)] rounded-xl p-4 border border-white/10 animate-pulse h-16" />
          ))}
        </div>
      ) : pages.length === 0 ? (
        <div className="bg-[var(--bg-surface)] border border-white/10 rounded-xl p-10 text-center text-gray-400 text-sm">
          No pages yet. Create your first page above.
        </div>
      ) : (
        <div className="space-y-2">
          {pages.map(page => (
            <div key={page.id}
              className="bg-[var(--bg-surface)] border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-white text-sm truncate">{page.title}</span>
                  {PROTECTED_SLUGS.includes(page.slug) && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wide shrink-0">
                      Built-in
                    </span>
                  )}
                  {!page.is_published && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30 uppercase tracking-wide shrink-0">
                      Draft
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-gray-500 font-mono">/p/{page.slug}</span>
                  <span className="text-xs text-gray-600">
                    {new Date(page.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={PROTECTED_SLUGS.includes(page.slug)
                    ? `/${page.slug}`
                    : `/p/${page.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs text-gray-400 border border-white/10 rounded-lg hover:text-white hover:bg-white/5 transition-colors"
                >
                  View ↗
                </a>
                <button onClick={() => openEdit(page)}
                  className="px-3 py-1.5 text-xs text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/10 transition-colors">
                  Edit
                </button>
                {!PROTECTED_SLUGS.includes(page.slug) && (
                  <button onClick={() => handleDelete(page)}
                    className="px-3 py-1.5 text-xs text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors">
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
