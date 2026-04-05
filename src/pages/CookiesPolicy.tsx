import { useState, useEffect } from 'react';
import { getPageBySlug } from '../lib/db';
import PageContent from '../components/PageContent';

const Section = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-semibold text-pink-400 mt-12 mb-4">{title}</h2>
);

const CookiesPolicy = () => {
  const [dbPage, setDbPage] = useState<{ title: string; content: string; updated_at: string } | null>(null);

  useEffect(() => {
    getPageBySlug('cookies-policy').then(p => { if (p) setDbPage(p); }).catch(() => {});
  }, []);

  if (dbPage) {
    return (
      <section className="min-h-screen py-20 px-6 max-w-4xl mx-auto text-gray-600 dark:text-gray-300">
        <div className="text-base md:text-lg leading-relaxed">
          <h1 className="text-5xl font-bold text-purple-400 mt-10 mb-4">{dbPage.title}</h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm mb-10">
            Last updated: {new Date(dbPage.updated_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <PageContent html={dbPage.content} />
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-20 px-6 max-w-4xl mx-auto text-gray-600 dark:text-gray-300">
      <div className="text-base md:text-lg leading-relaxed">
        <h1 className="text-5xl font-bold text-purple-400 mt-10 mb-4">Cookies Policy</h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-10">Last updated: April 5, 2025</p>

        <p>
          This Cookies Policy explains what cookies and similar storage technologies are, how Roman
          Frontman ("I", "me", "my") uses them on this website, and what choices you have regarding
          their use. This policy should be read alongside the{" "}
          <a href="/privacy-policy" className="text-purple-400 hover:text-pink-400 transition-colors duration-200">Privacy Policy</a>.
        </p>

        <Section title="1. What Are Cookies?" />
        <p>
          Cookies are small text files placed on your device (computer, tablet, or mobile phone) by
          a website when you visit it. They are widely used to make websites work efficiently, to
          remember your preferences, and to provide information to site owners.
        </p>
        <p className="mt-4">
          In addition to cookies, this website uses <strong>localStorage</strong> — a browser-based
          storage mechanism that persists data locally on your device between sessions. Unlike cookies,
          localStorage data is never sent to the server with HTTP requests.
        </p>

        <Section title="2. Cookies & Storage This Site Uses" />

        <div className="mt-4 space-y-6">
          {/* Essential */}
          <div className="bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Essential / Functional</h3>
            <p className="text-sm mb-4">
              These are strictly necessary for the website to function. They cannot be disabled without
              breaking core site features.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-[oklch(90%_0.012_349)] dark:border-white/10">
                  <th className="pb-2 pr-4 font-semibold">Name</th>
                  <th className="pb-2 pr-4 font-semibold">Type</th>
                  <th className="pb-2 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[oklch(90%_0.012_349)] dark:divide-white/10">
                <tr>
                  <td className="py-2 pr-4 font-mono text-purple-400">darkMode</td>
                  <td className="py-2 pr-4">localStorage</td>
                  <td className="py-2">Remembers your light/dark mode preference between visits</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-purple-400">admin_session</td>
                  <td className="py-2 pr-4">localStorage</td>
                  <td className="py-2">Admin panel session token (24h expiry). Only set for authenticated administrators — never for regular visitors</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Analytics */}
          <div className="bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-3">Performance & Analytics</h3>
            <p className="text-sm mb-4">
              These help me understand how visitors interact with the website so I can improve it.
              All data collected is anonymised and aggregated — it cannot be used to identify you personally.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b border-[oklch(90%_0.012_349)] dark:border-white/10">
                  <th className="pb-2 pr-4 font-semibold">Service</th>
                  <th className="pb-2 pr-4 font-semibold">Provider</th>
                  <th className="pb-2 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[oklch(90%_0.012_349)] dark:divide-white/10">
                <tr>
                  <td className="py-2 pr-4 font-mono text-purple-400">Speed Insights</td>
                  <td className="py-2 pr-4">Vercel</td>
                  <td className="py-2">Collects Core Web Vitals (LCP, FID, CLS, TTFB) to monitor page performance. No personal data. Data is aggregated at the domain level only.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Section title="3. What This Site Does NOT Use" />
        <p>This website does not use:</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>Google Analytics or any Google tracking pixels</li>
          <li>Facebook Pixel or any Meta advertising trackers</li>
          <li>Remarketing or behavioural advertising cookies</li>
          <li>Third-party social media tracking</li>
          <li>Any cookies that track your activity across other websites</li>
        </ul>

        <Section title="4. How Long Cookies Last" />
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>
            <strong>darkMode</strong> (localStorage): Persists indefinitely until you clear browser
            storage or toggle the setting manually.
          </li>
          <li>
            <strong>admin_session</strong> (localStorage): Expires automatically after 24 hours, or
            immediately upon logout.
          </li>
          <li>
            <strong>Vercel Speed Insights</strong>: Session-based. Does not set persistent cookies on
            your device.
          </li>
        </ul>

        <Section title="5. Managing & Disabling Cookies" />
        <p>
          You can control cookies through your browser settings. Most browsers allow you to:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>View all cookies and localStorage data currently stored</li>
          <li>Delete cookies and localStorage data for specific sites</li>
          <li>Block all cookies from specific sites</li>
          <li>Block all third-party cookies globally</li>
        </ul>
        <p className="mt-4">Instructions for popular browsers:</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
          <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
          <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
        </ul>
        <p className="mt-4">
          Please note that disabling the <strong>darkMode</strong> localStorage item will reset your
          colour theme preference on each visit. No other site functionality is affected by clearing
          cookies, as this site does not rely on session cookies for access.
        </p>

        <Section title="6. Consent" />
        <p>
          By continuing to use this website, you consent to the use of the cookies and storage
          technologies described in this policy. Because this site uses only strictly necessary
          functional storage (theme preference) and privacy-respecting, anonymised performance
          monitoring with no persistent tracking cookies, no cookie banner is legally required under
          ePrivacy Directive exemptions.
        </p>
        <p className="mt-4">
          If in the future any non-essential cookies requiring explicit consent are added, a consent
          mechanism will be implemented before they are activated.
        </p>

        <Section title="7. Changes to This Policy" />
        <p>
          This Cookies Policy may be updated to reflect changes in the technologies used on this site
          or changes in applicable law. The "Last updated" date at the top of this page will be
          revised with each update. I encourage you to review this page periodically.
        </p>

        <Section title="8. Contact" />
        <p>
          If you have any questions about this Cookies Policy or how I use storage technologies,
          please contact:
        </p>
        <ul className="mt-3 space-y-1 list-none">
          <li><strong>Roman Frontman</strong></li>
          <li>Lviv, Ukraine</li>
          <li>
            <a href="mailto:roman@gmail.com" className="text-purple-400 hover:text-pink-400 transition-colors duration-200">
              roman@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default CookiesPolicy;
