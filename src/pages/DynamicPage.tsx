import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPageBySlug } from '../lib/db';
import PageContent from '../components/PageContent';
import type { Page } from '../types/database';

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }
    getPageBySlug(slug)
      .then(p => { if (p) setPage(p); else setNotFound(true); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <section className="min-h-screen py-20 px-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4 mt-16">
          <div className="h-10 bg-[var(--bg-subtle)] rounded w-1/2" />
          <div className="h-4 bg-[var(--bg-subtle)] rounded w-1/4" />
          <div className="mt-8 space-y-3">
            {[1,2,3,4,5].map(n => <div key={n} className="h-4 bg-[var(--bg-subtle)] rounded" />)}
          </div>
        </div>
      </section>
    );
  }

  if (notFound || !page) {
    return (
      <section className="min-h-screen py-20 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-purple-400 mt-16 mb-4">Page Not Found</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page <code className="text-purple-400">/{slug}</code> doesn't exist or is not published.
        </p>
        <Link to="/" className="text-purple-400 hover:text-pink-400 underline underline-offset-2 transition-colors duration-200">
          ← Back to home
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-6 max-w-4xl mx-auto text-gray-600 dark:text-gray-300">
      <div className="text-base md:text-lg leading-relaxed">
        <h1 className="text-5xl font-bold text-purple-400 mt-10 mb-4">{page.title}</h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-10">
          Last updated:{' '}
          {new Date(page.updated_at).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}
        </p>
        <PageContent html={page.content} />
      </div>
    </section>
  );
}
