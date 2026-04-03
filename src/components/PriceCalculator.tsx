"use client";
// src/components/PriceCalculator.tsx
import { useState } from "react";
import Button from "./Button";

type Step1Key = "landing" | "multipage" | "corporate";
type Step2Key = "template" | "semicustom" | "fullcustom";
type Step3Key = "none" | "basic" | "advanced";
type Step4Key =
  | "calculator"
  | "telegram"
  | "blog"
  | "i18n"
  | "payments"
  | "seo"
  | "animations";
type Step5Key = "standard" | "accelerated" | "urgent";

interface Selections {
  websiteType: Step1Key | null;
  design: Step2Key | null;
  adminPanel: Step3Key | null;
  features: Step4Key[];
  deadline: Step5Key | null;
}

const STEP1_OPTIONS: { key: Step1Key; label: string; price: number }[] = [
  { key: "landing", label: "Landing page (single-page)", price: 380 },
  { key: "multipage", label: "Multi-page website (up to 5 pages)", price: 900 },
  { key: "corporate", label: "Corporate website (5–15 pages)", price: 1900 },
];

const STEP2_OPTIONS: { key: Step2Key; label: string; price: number }[] = [
  { key: "template", label: "Ready-made template", price: 0 },
  { key: "semicustom", label: "Semi-custom design", price: 220 },
  { key: "fullcustom", label: "Fully custom UI/UX design", price: 600 },
];

const STEP3_OPTIONS: { key: Step3Key; label: string; price: number }[] = [
  { key: "none", label: "Not required", price: 0 },
  { key: "basic", label: "Basic (content editing)", price: 450 },
  { key: "advanced", label: "Advanced (roles, analytics, dashboard)", price: 1100 },
];

const STEP4_OPTIONS: { key: Step4Key; label: string; price: number }[] = [
  { key: "calculator", label: "Price calculator", price: 220 },
  { key: "telegram", label: "Lead submission to Telegram / WhatsApp", price: 150 },
  { key: "blog", label: "Blog / news", price: 260 },
  { key: "i18n", label: "Multilingual support (i18n)", price: 300 },
  { key: "payments", label: "Online payments (Stripe / LiqPay)", price: 450 },
  { key: "seo", label: "SEO optimization", price: 260 },
  { key: "animations", label: "Animations & interactivity", price: 220 },
];

const STEP5_OPTIONS: { key: Step5Key; label: string; price: number }[] = [
  { key: "standard", label: "Standard (3–6 weeks)", price: 0 },
  { key: "accelerated", label: "Accelerated (1–2 weeks)", price: 220 },
  { key: "urgent", label: "Urgent (up to 5 days)", price: 450 },
];

const STEP_TITLES = [
  "Website Type",
  "Design",
  "Admin Panel",
  "Additional Features",
  "Deadline",
];

function computeTotal(sel: Selections): number {
  const base = STEP1_OPTIONS.find((o) => o.key === sel.websiteType)?.price ?? 0;
  const design = STEP2_OPTIONS.find((o) => o.key === sel.design)?.price ?? 0;
  const admin = STEP3_OPTIONS.find((o) => o.key === sel.adminPanel)?.price ?? 0;
  const features = sel.features.reduce((acc, k) => {
    return acc + (STEP4_OPTIONS.find((o) => o.key === k)?.price ?? 0);
  }, 0);
  const deadline = STEP5_OPTIONS.find((o) => o.key === sel.deadline)?.price ?? 0;
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
  const [step, setStep] = useState(1); // 1–5, or 6 = result
  const [sel, setSel] = useState<Selections>(defaultSelections);
  const [animDir, setAnimDir] = useState<"forward" | "back">("forward");
  const [visible, setVisible] = useState(true);

  const total = computeTotal(sel);

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
    if (step === 4) return true; // multi-select, zero allowed
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
    <section id="price-calculator" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Calculate Your Project Cost
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Answer a few questions and get an estimated price
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mt-6" />
        </div>

        {/* Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[var(--bg-surface)] backdrop-blur-md rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 overflow-hidden">
            {/* Progress bar */}
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

            {/* Step content */}
            <div
              className={`px-8 pb-4 transition-all duration-200 ${slideClass}`}
            >
              {step === 1 && (
                <StepSingle
                  options={STEP1_OPTIONS}
                  selected={sel.websiteType}
                  onSelect={(k) => setSel({ ...sel, websiteType: k as Step1Key })}
                />
              )}
              {step === 2 && (
                <StepSingle
                  options={STEP2_OPTIONS}
                  selected={sel.design}
                  onSelect={(k) => setSel({ ...sel, design: k as Step2Key })}
                />
              )}
              {step === 3 && (
                <StepSingle
                  options={STEP3_OPTIONS}
                  selected={sel.adminPanel}
                  onSelect={(k) => setSel({ ...sel, adminPanel: k as Step3Key })}
                />
              )}
              {step === 4 && (
                <StepMulti
                  options={STEP4_OPTIONS}
                  selected={sel.features}
                  onToggle={(k) => {
                    const key = k as Step4Key;
                    setSel((prev) => ({
                      ...prev,
                      features: prev.features.includes(key)
                        ? prev.features.filter((f) => f !== key)
                        : [...prev.features, key],
                    }));
                  }}
                />
              )}
              {step === 5 && (
                <StepSingle
                  options={STEP5_OPTIONS}
                  selected={sel.deadline}
                  onSelect={(k) => setSel({ ...sel, deadline: k as Step5Key })}
                />
              )}
              {step === 6 && (
                <ResultScreen
                  sel={sel}
                  total={total}
                  onDiscuss={scrollToContact}
                  onReset={reset}
                />
              )}
            </div>

            {/* Footer: price counter + nav */}
            {step <= TOTAL_STEPS && (
              <div className="px-8 py-5 border-t border-[oklch(90%_0.012_349)] dark:border-white/10 flex items-center justify-between gap-4">
                <button
                  onClick={() => step > 1 && navigate(step - 1, "back")}
                  disabled={step === 1}
                  className="px-5 py-2 rounded-lg border border-[oklch(90%_0.012_349)] dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-[var(--bg-subtle)] transition disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Back
                </button>

                {/* Live price */}
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
        </div>
      </div>
    </section>
  );
}

/* ── Sub-components ── */

function StepSingle<K extends string>({
  options,
  selected,
  onSelect,
}: {
  options: { key: K; label: string; price: number }[];
  selected: K | null;
  onSelect: (k: K) => void;
}) {
  return (
    <div className="space-y-3 py-4">
      {options.map((opt) => {
        const isSelected = selected === opt.key;
        return (
          <button
            key={opt.key}
            onClick={() => onSelect(opt.key)}
            className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4
              ${
                isSelected
                  ? "border-purple-500 bg-purple-500/10 text-gray-900 dark:text-white"
                  : "border-[oklch(90%_0.012_349)] dark:border-white/10 bg-[var(--bg-subtle)] text-gray-700 dark:text-gray-300 hover:border-purple-400/50 hover:bg-purple-500/5"
              }`}
          >
            <span className="font-medium">{opt.label}</span>
            <span
              className={`text-sm font-semibold whitespace-nowrap ${
                isSelected ? "text-purple-400" : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {opt.price === 0 ? "Included" : `+${formatPrice(opt.price)}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StepMulti<K extends string>({
  options,
  selected,
  onToggle,
}: {
  options: { key: K; label: string; price: number }[];
  selected: K[];
  onToggle: (k: K) => void;
}) {
  return (
    <div className="space-y-3 py-4">
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        Select any — or none.
      </p>
      {options.map((opt) => {
        const isSelected = selected.includes(opt.key);
        return (
          <button
            key={opt.key}
            onClick={() => onToggle(opt.key)}
            className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4
              ${
                isSelected
                  ? "border-purple-500 bg-purple-500/10 text-gray-900 dark:text-white"
                  : "border-[oklch(90%_0.012_349)] dark:border-white/10 bg-[var(--bg-subtle)] text-gray-700 dark:text-gray-300 hover:border-purple-400/50 hover:bg-purple-500/5"
              }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                  ${isSelected ? "border-purple-500 bg-purple-500" : "border-gray-400 dark:border-gray-500"}`}
              >
                {isSelected && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <path
                      d="M1.5 5L4 7.5L8.5 2.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="font-medium">{opt.label}</span>
            </div>
            <span
              className={`text-sm font-semibold whitespace-nowrap ${
                isSelected ? "text-purple-400" : "text-gray-500 dark:text-gray-400"
              }`}
            >
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
  onDiscuss,
  onReset,
}: {
  sel: Selections;
  total: number;
  onDiscuss: () => void;
  onReset: () => void;
}) {
  const upper = Math.round(total * 1.3);

  const summaryItems: string[] = [];
  if (sel.websiteType) {
    const opt = STEP1_OPTIONS.find((o) => o.key === sel.websiteType);
    if (opt) summaryItems.push(opt.label);
  }
  if (sel.design) {
    const opt = STEP2_OPTIONS.find((o) => o.key === sel.design);
    if (opt) summaryItems.push(opt.label);
  }
  if (sel.adminPanel) {
    const opt = STEP3_OPTIONS.find((o) => o.key === sel.adminPanel);
    if (opt && opt.price > 0) summaryItems.push(opt.label);
  }
  sel.features.forEach((k) => {
    const opt = STEP4_OPTIONS.find((o) => o.key === k);
    if (opt) summaryItems.push(opt.label);
  });
  if (sel.deadline) {
    const opt = STEP5_OPTIONS.find((o) => o.key === sel.deadline);
    if (opt && opt.price > 0) summaryItems.push(opt.label);
  }

  return (
    <div className="py-6 space-y-6">
      {/* Price range */}
      <div className="text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          Estimated project cost
        </p>
        <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          from {formatPrice(total)} to {formatPrice(upper)}
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
          Final price depends on detailed requirements
        </p>
      </div>

      {/* Summary */}
      {summaryItems.length > 0 && (
        <div className="bg-[var(--bg-subtle)] rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
            Your selection includes:
          </p>
          <ul className="space-y-1.5">
            {summaryItems.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={onDiscuss}
          gradient="from-purple-500 to-blue-500"
          className="w-full"
        >
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
