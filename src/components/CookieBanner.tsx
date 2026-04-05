import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, ChevronDown, ChevronUp, Shield, BarChart2, Settings2 } from 'lucide-react';
import Button from './Button';

const STORAGE_KEY = 'cookie_preferences';

interface Preferences {
  analytics: boolean;
  functional: boolean;
}

function loadPreferences(): Preferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Preferences) : null;
  } catch {
    return null;
  }
}

function savePreferences(prefs: Preferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

// ─── Toggle ─────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, disabled = false }: {
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${checked ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300 dark:bg-gray-600'}`}
    >
      <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-300
        ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}

// ─── Category row ────────────────────────────────────────────────────────────
function CategoryRow({ icon, title, description, details, checked, onChange, disabled = false, badge }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  badge?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-[var(--bg-subtle)] flex items-center justify-center text-purple-400">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-sm text-gray-900 dark:text-white">{title}</span>
            {badge && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wide">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{description}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Toggle checked={checked} onChange={onChange} disabled={disabled} />
          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
            aria-label="Toggle details"
          >
            {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed border-t border-[oklch(90%_0.012_349)] dark:border-white/10 pt-3">
              {details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'simple' | 'detailed'>('simple');
  const [showFloat, setShowFloat] = useState(false);
  const [prefs, setPrefs] = useState<Preferences>({ analytics: true, functional: true });

  useEffect(() => {
    const saved = loadPreferences();
    if (saved) {
      setPrefs(saved);
      setShowFloat(true);
    } else {
      setOpen(true);
      setView('simple');
    }
  }, []);

  function close(savedPrefs: Preferences) {
    savePreferences(savedPrefs);
    setOpen(false);
    setShowFloat(true);
  }

  function acceptAll() {
    const all: Preferences = { analytics: true, functional: true };
    setPrefs(all);
    close(all);
  }

  function declineAll() {
    const none: Preferences = { analytics: false, functional: false };
    setPrefs(none);
    close(none);
  }

  function saveCustom() {
    close(prefs);
  }

  function openPreferences() {
    setView('detailed');
    setOpen(true);
  }

  return (
    <>
      {/* ── Floating button ── */}
      <AnimatePresence>
        {showFloat && !open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={openPreferences}
            title="Cookie preferences"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full
              bg-gradient-to-br from-purple-500 to-pink-500
              flex items-center justify-center shadow-lg shadow-purple-500/30
              hover:scale-110 transition-transform duration-200"
          >
            <Cookie className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Panel ── */}
      <AnimatePresence mode="wait">
        {open && (
          <>
            {/* Backdrop — only for detailed view */}
            {view === 'detailed' && (
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                onClick={saveCustom}
              />
            )}

            {view === 'simple' ? (
              /* ── Simple banner ── */
              <motion.div
                key="simple"
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 80 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl"
              >
                <div className="bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/60 p-6 backdrop-blur-md">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Cookie className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-snug mb-1">
                        We use cookies
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                        This site uses cookies to remember your preferences and analyse performance.
                        No tracking, no ads.{' '}
                        <a href="/cookies-policy" target="_blank"
                          className="text-purple-400 hover:text-pink-400 underline underline-offset-2 transition-colors duration-200">
                          Learn more
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-5">
                    <Button onClick={acceptAll} gradient="from-purple-500 to-pink-500" className="flex-1">
                      Accept All
                    </Button>
                    <Button onClick={() => setView('detailed')} variant="secondary" className="flex-1">
                      Customize
                    </Button>
                    <Button onClick={declineAll} variant="secondary" className="flex-1">
                      Decline
                    </Button>
                  </div>
                </div>
              </motion.div>

            ) : (
              /* ── Detailed panel ── */
              <motion.div
                key="detailed"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 60 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2
                  z-50 w-full sm:w-[calc(100%-2rem)] sm:max-w-lg"
              >
                <div className="bg-[var(--bg-surface)] border border-[oklch(90%_0.012_349)] dark:border-white/10
                  rounded-t-3xl sm:rounded-2xl shadow-2xl shadow-black/30 dark:shadow-black/70 p-6">

                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Cookie className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white text-base leading-none">
                          Cookie Preferences
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          Choose what data you allow us to collect.{' '}
                          <a href="/cookies-policy" target="_blank"
                            className="text-purple-400 hover:text-pink-400 underline underline-offset-2 transition-colors duration-200">
                            Cookies Policy
                          </a>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={saveCustom}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-200 p-1"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="space-y-3 mb-5">
                    <CategoryRow
                      icon={<Shield className="w-4 h-4" />}
                      title="Essential"
                      description="Required for the site to work properly"
                      details="These include storing your dark/light mode preference (darkMode) and the admin session token (admin_session, set only for authenticated administrators). Cannot be disabled."
                      checked={true}
                      onChange={() => {}}
                      disabled={true}
                      badge="Always on"
                    />
                    <CategoryRow
                      icon={<BarChart2 className="w-4 h-4" />}
                      title="Analytics"
                      description="Anonymised performance monitoring"
                      details="Vercel Speed Insights collects Core Web Vitals (LCP, FID, CLS, TTFB) to help improve page performance. No personal data is collected — all metrics are anonymised and aggregated at domain level only."
                      checked={prefs.analytics}
                      onChange={v => setPrefs(p => ({ ...p, analytics: v }))}
                    />
                    <CategoryRow
                      icon={<Settings2 className="w-4 h-4" />}
                      title="Functional"
                      description="Enhanced features and personalisation"
                      details="Stores your UI preferences (such as theme) across sessions, so you don't have to reset them on each visit. No data is sent to external servers — stored locally in your browser only."
                      checked={prefs.functional}
                      onChange={v => setPrefs(p => ({ ...p, functional: v }))}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={acceptAll} gradient="from-purple-500 to-pink-500" className="flex-1" size="sm">
                      Accept All
                    </Button>
                    <Button onClick={saveCustom} variant="secondary" className="flex-1" size="sm">
                      Save Preferences
                    </Button>
                    <Button onClick={declineAll} variant="secondary" className="flex-1" size="sm">
                      Decline All
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}
