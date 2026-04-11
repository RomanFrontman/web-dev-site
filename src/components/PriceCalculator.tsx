// src/components/PriceCalculator.tsx
import { useState, useEffect } from "react";
import Button from "./Button";
import AnimatedSection from "./AnimatedSection";
import { getPricingOptions } from "../lib/db";

type CalcOption = { key: string; label: string; price: number; step: number };

interface Selections {
  websiteType: string | null;
  design: string | null;
  adminPanel: string | null;
  features: string[];
  deadline: string | null;
}

const FALLBACK_OPTIONS: CalcOption[] = [
  { key: "landing",      label: "Landing page (single-page)",                 price: 380,  step: 1 },
  { key: "multipage",    label: "Multi-page website (up to 5 pages)",          price: 900,  step: 1 },
  { key: "corporate",    label: "Corporate website (5–15 pages)",              price: 1900, step: 1 },
  { key: "template",     label: "Ready-made template",                         price: 0,    step: 2 },
  { key: "semicustom",   label: "Semi-custom design",                          price: 220,  step: 2 },
  { key: "fullcustom",   label: "Fully custom UI/UX design",                   price: 600,  step: 2 },
  { key: "none",         label: "Not required",                                price: 0,    step: 3 },
  { key: "basic",        label: "Basic (content editing)",                     price: 450,  step: 3 },
  { key: "advanced",     label: "Advanced (roles, analytics, dashboard)",      price: 1100, step: 3 },
  { key: "calculator",   label: "Price calculator",                            price: 220,  step: 4 },
  { key: "telegram",     label: "Lead submission to Telegram / WhatsApp",      price: 150,  step: 4 },
  { key: "blog",         label: "Blog / news",                                 price: 260,  step: 4 },
  { key: "i18n",         label: "Multilingual support (i18n)",                 price: 300,  step: 4 },
  { key: "payments",     label: "Online payments (Stripe / LiqPay)",           price: 450,  step: 4 },
  { key: "seo",          label: "SEO optimization",                            price: 260,  step: 4 },
  { key: "animations",   label: "Animations & interactivity",                  price: 220,  step: 4 },
  { key: "standard",     label: "Standard (3–6 weeks)",                        price: 0,    step: 5 },
  { key: "accelerated",  label: "Accelerated (1–2 weeks)",                     price: 220,  step: 5 },
  { key: "urgent",       label: "Urgent (up to 5 days)",                       price: 450,  step: 5 },
];

const STEP_TITLES = [
  "Website Type",
  "Design",
  "Admin Panel",
  "Additional Features",
  "Deadline",
];

function byStep(opts: CalcOption[], s: number) {
  return opts.filter(o => o.step === s);
}

function computeTotal(sel: Selections, opts: CalcOption[]): number {
  const base     = byStep(opts, 1).find(o => o.key === sel.websiteType)?.price ?? 0;
  const design   = byStep(opts, 2).find(o => o.key === sel.design)?.price ?? 0;
  const admin    = byStep(opts, 3).find(o => o.key === sel.adminPanel)?.price ?? 0;
  const features = sel.features.reduce((acc, k) => acc + (byStep(opts, 4).find(o => o.key === k)?.price ?? 0), 0);
  const deadline = byStep(opts, 5).find(o => o.key === sel.deadline)?.price ?? 0;
  return base + design + admin + features + deadline;
}

function formatPrice(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

const TOTAL_STEPS = 5;

const defaultSelections: Selections = {
  websiteType: null,
  design: null,
  adminPanel: null,
  features: [],
  deadline: null,
};

export default function PriceCalculator() {
  const [step, setStep] = useState(1);
  const [sel, setSel] = useState<Selections>(defaultSelections);
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");
  const [visible, setVisible] = useState(true);
  const [options, setOptions] = useState<CalcOption[]>(FALLBACK_OPTIONS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPricingOptions()
      .then(data => {
        if (data.length) {
          setOptions(data.map(o => ({ key: o.key, label: o.label, price: o.price, step: o.step })));
        }
      })
      .catch(() => { /* keep fallback */ })
      .finally(() => setLoading(false));
  }, []);

  const total = computeTotal(sel, options);

  function navigate(nextStep: number, dir: "forward" | "back") {
    setAnimDir(dir);
    setVisible(false);
    setTimeout(() => {
      setStep(nextStep);
      setVisible(true);
    }, 200);
  }

  function canProceed(): boolean {
    if (step === 1) return sel.websiteType !== null;
    if (step === 2) return sel.design !== null;
    if (step === 3) return sel.adminPanel !== null;
    if (step === 4) return true;
    if (step === 5) return sel.deadline !== null;
    return true;
  }

  function reset() {
    setAnimDir("back");
    setVisible(false);
    setTimeout(() => {
      setSel(defaultSelections);
      setStep(1);
      setVisible(true);
    }, 200);
  }

  function scrollToContact() {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  const progressPercent = step <= TOTAL_STEPS ? (step / TOTAL_STEPS) * 100 : 100;

  const slideClass = visible
    ? "opacity-100 translate-x-0"
    : animDir === "forward"
    ? "opacity-0 translate-x-6"
    : "opacity-0 -translate-x-6";

  return (
    <AnimatedSection><section id="price-calculator" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Calculate Your Project Cost
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Answer a few questions and get an estimated price
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mt-6" />
        </div>

        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="bg-[var(--bg-surface)] backdrop-blur-md rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 p-8 animate-pulse h-64" />
          ) : (
            <div className="bg-[var(--bg-surface)] backdrop-blur-md rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 overflow-hidden">
              {step <= TOTAL_STEPS && (
                <div className="px-8 pt-8 pb-4">
                  <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span>Step {step} of {TOTAL_STEPS}</span>
                    <span className="font-medium text-purple-400">{STEP_TITLES[step - 1]}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[var(--bg-subtle)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              <div className={`px-8 pb-4 transition-all duration-200 ${slideClass}`}>
                {step === 1 && (
                  <StepSingle
                    options={byStep(options, 1)}
                    selected={sel.websiteType}
                    onSelect={k => setSel({ ...sel, websiteType: k })}
                  />
                )}
                {step === 2 && (
                  <StepSingle
                    options={byStep(options, 2)}
                    selected={sel.design}
                    onSelect={k => setSel({ ...sel, design: k })}
                  />
                )}
                {step === 3 && (
                  <StepSingle
                    options={byStep(options, 3)}
                    selected={sel.adminPanel}
                    onSelect={k => setSel({ ...sel, adminPanel: k })}
                  />
                )}
                {step === 4 && (
                  <StepMulti
                    options={byStep(options, 4)}
                    selected={sel.features}
                    onToggle={k => {
                      setSel(prev => ({
                        ...prev,
                        features: prev.features.includes(k)
                          ? prev.features.filter(f => f !== k)
                          : [...prev.features, k],
                      }));
                    }}
                  />
                )}
                {step === 5 && (
                  <StepSingle
                    options={byStep(options, 5)}
                    selected={sel.deadline}
                    onSelect={k => setSel({ ...sel, deadline: k })}
                  />
                )}
                {step === 6 && (
                  <ResultScreen
                    sel={sel}
                    total={total}
                    options={options}
                    onDiscuss={scrollToContact}
                    onReset={reset}
                  />
                )}
              </div>

              {step <= TOTAL_STEPS && (
                <div className="px-8 py-5 border-t border-[oklch(90%_0.012_349)] dark:border-white/10 flex items-center justify-between gap-4">
                  <button
                    onClick={() => step > 1 && navigate(step - 1, "back")}
                    disabled={step === 1}
                    className="px-5 py-2 rounded-lg border border-[oklch(90%_0.012_349)] dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-[var(--bg-subtle)] transition disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>

                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400 tabular-nums">
                    Total:{" "}
                    <span className="text-purple-400 font-semibold">
                      {formatPrice(total)}
                    </span>
                  </span>

                  <button
                    onClick={() => {
                      if (!canProceed()) return;
                      navigate(step < TOTAL_STEPS ? step + 1 : 6, "forward");
                    }}
                    disabled={!canProceed()}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {step === TOTAL_STEPS ? "See Result" : "Next"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section></AnimatedSection>
  );
}

/* ── Sub-components ── */

function StepSingle({
  options,
  selected,
  onSelect,
}: {
  options: CalcOption[];
  selected: string | null;
  onSelect: (k: string) => void;
}) {
  return (
    <div className="space-y-3 py-4">
      {options.map(opt => {
        const isSelected = selected === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4
              ${isSelected
                ? "border-purple-500 bg-purple-500/10 text-gray-900 dark:text-white"
                : "border-[oklch(90%_0.012_349)] dark:border-white/10 bg-[var(--bg-subtle)] text-gray-700 dark:text-gray-300 hover:border-purple-400/50 hover:bg-purple-500/5"
              }`}
          >
            <span className="font-medium">{opt.label}</span>
            <span className={`text-sm font-semibold whitespace-nowrap ${isSelected ? "text-purple-400" : "text-gray-500 dark:text-gray-400"}`}>
              {opt.price === 0 ? "Included" : `+${formatPrice(opt.price)}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StepMulti({
  options,
  selected,
  onToggle,
}: {
  options: CalcOption[];
  selected: string[];
  onToggle: (k: string) => void;
}) {
  return (
    <div className="space-y-3 py-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Select any — or none.</p>
      {options.map(opt => {
        const isSelected = selected.includes(opt.key);
        return (
          <button
            key={opt.key}
            onClick={() => onToggle(opt.key)}
            className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4
              ${isSelected
                ? "border-purple-500 bg-purple-500/10 text-gray-900 dark:text-white"
                : "border-[oklch(90%_0.012_349)] dark:border-white/10 bg-[var(--bg-subtle)] text-gray-700 dark:text-gray-300 hover:border-purple-400/50 hover:bg-purple-500/5"
              }`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                ${isSelected ? "border-purple-500 bg-purple-500" : "border-gray-400 dark:border-gray-500"}`}>
                {isSelected && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span className="font-medium">{opt.label}</span>
            </div>
            <span className={`text-sm font-semibold whitespace-nowrap ${isSelected ? "text-purple-400" : "text-gray-500 dark:text-gray-400"}`}>
              +{formatPrice(opt.price)}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ResultScreen({
  sel,
  total,
  options,
  onDiscuss,
  onReset,
}: {
  sel: Selections;
  total: number;
  options: CalcOption[];
  onDiscuss: () => void;
  onReset: () => void;
}) {
  const upper = Math.round(total * 1.3);

  const summaryItems: string[] = [];
  if (sel.websiteType) {
    const opt = byStep(options, 1).find(o => o.key === sel.websiteType);
    if (opt) summaryItems.push(opt.label);
  }
  if (sel.design) {
    const opt = byStep(options, 2).find(o => o.key === sel.design);
    if (opt) summaryItems.push(opt.label);
  }
  if (sel.adminPanel) {
    const opt = byStep(options, 3).find(o => o.key === sel.adminPanel);
    if (opt && opt.price > 0) summaryItems.push(opt.label);
  }
  sel.features.forEach(k => {
    const opt = byStep(options, 4).find(o => o.key === k);
    if (opt) summaryItems.push(opt.label);
  });
  if (sel.deadline) {
    const opt = byStep(options, 5).find(o => o.key === sel.deadline);
    if (opt && opt.price > 0) summaryItems.push(opt.label);
  }

  return (
    <div className="py-6 space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Estimated project cost</p>
        <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          from {formatPrice(total)} to {formatPrice(upper)}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">Final price depends on detailed requirements</p>
      </div>

      {summaryItems.length > 0 && (
        <div className="bg-[var(--bg-subtle)] rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">Your selection includes:</p>
          <ul className="space-y-1.5">
            {summaryItems.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Button onClick={onDiscuss} gradient="from-purple-500 to-blue-500" className="w-full">
          Discuss the project
        </Button>
        <button
          onClick={onReset}
          className="w-full py-3 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-400 transition"
        >
          Recalculate
        </button>
      </div>
    </div>
  );
}
