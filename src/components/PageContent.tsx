// Renders HTML stored in Supabase with consistent page typography.
// Used by existing legal pages (DB override) and new custom /p/:slug pages.
//
// DOMPurify strips <script>, event handlers (onclick, onerror…), and
// javascript: hrefs before any HTML reaches the DOM.
import DOMPurify from 'dompurify';

export default function PageContent({ html }: { html: string }) {
  const safe = DOMPurify.sanitize(html, {
    // Allow all standard content tags; DOMPurify blocks scripts/handlers by default.
    ADD_TAGS: ['table', 'thead', 'tbody', 'tr', 'th', 'td'],
    // Keep target="_blank" on links, but DOMPurify already allows href.
    ADD_ATTR: ['target', 'rel'],
  });

  return (
    <div
      className="
        [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-pink-400 [&_h2]:mt-12 [&_h2]:mb-4
        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-purple-300 [&_h3]:mt-6 [&_h3]:mb-2
        [&_p]:mb-4 [&_p]:leading-relaxed
        [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_ul]:mb-4
        [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:space-y-2 [&_ol]:mb-4
        [&_a]:text-purple-400 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:duration-200
        hover:[&_a]:text-pink-400
        [&_strong]:font-semibold [&_strong]:text-gray-900 dark:[&_strong]:text-white
        [&_table]:w-full [&_table]:text-sm [&_table]:mb-6
        [&_th]:text-left [&_th]:pb-2 [&_th]:pr-4 [&_th]:font-semibold
        [&_th]:border-b [&_th]:border-gray-200 dark:[&_th]:border-white/10
        [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top
        [&_td]:border-b [&_td]:border-gray-100 dark:[&_td]:border-white/5
        [&_blockquote]:border-l-4 [&_blockquote]:border-purple-400 [&_blockquote]:pl-4
        [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:mb-4
        [&_hr]:my-8 [&_hr]:border-gray-200 dark:[&_hr]:border-white/10
        [&_code]:font-mono [&_code]:text-sm [&_code]:bg-[var(--bg-subtle)]
        [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded
      "
      dangerouslySetInnerHTML={{ __html: safe }}
    />
  );
}
