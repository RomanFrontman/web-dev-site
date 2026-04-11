// src/admin/AdminPricing.tsx
import { useState, useEffect } from 'react';
import type { PricingPlan, PricingOption } from '../types/database';
import { getPricingPlans, updatePricingPlan, getPricingOptions, updatePricingOption } from '../lib/db';

const STEP_TITLES = ['Website Type', 'Design', 'Admin Panel', 'Additional Features', 'Deadline'];

const GRADIENT_OPTIONS = [
  'from-purple-500 to-pink-500',
  'from-pink-500 to-blue-500',
  'from-blue-500 to-green-500',
  'from-purple-500 to-blue-500',
  'from-orange-500 to-pink-500',
  'from-green-500 to-teal-500',
  'from-blue-500 to-purple-500',
  'from-pink-500 to-orange-500',
];

export default function AdminPricing() {
  const [tab, setTab] = useState<'plans' | 'calculator'>('plans');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const [editedPlans, setEditedPlans] = useState<PricingPlan[]>([]);
  const [editedOptions, setEditedOptions] = useState<PricingOption[]>([]);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const [plans, opts] = await Promise.all([getPricingPlans(), getPricingOptions()]);
      setEditedPlans(plans);
      setEditedOptions(opts);
    } finally {
      setLoading(false);
    }
  }

  function updatePlanField(id: string, field: keyof PricingPlan, value: unknown) {
    setEditedPlans(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  }

  function updateOptionField(id: string, field: keyof PricingOption, value: unknown) {
    setEditedOptions(prev => prev.map(o => o.id === id ? { ...o, [field]: value } : o));
  }

  function showFeedback(msg: string) {
    setFeedback(msg);
    setTimeout(() => setFeedback(''), 3000);
  }

  async function savePlans() {
    setSaving(true);
    try {
      await Promise.all(
        editedPlans.map(p =>
          updatePricingPlan(p.id, {
            name: p.name,
            price: p.price,
            features: p.features.filter(f => f.trim() !== ''),
            gradient: p.gradient,
            order: p.order,
          })
        )
      );
      // Re-fetch to sync filtered features back to state
      const fresh = await getPricingPlans();
      setEditedPlans(fresh);
      showFeedback('Plans saved successfully.');
    } catch {
      showFeedback('Error: could not save plans.');
    } finally {
      setSaving(false);
    }
  }

  async function saveOptions() {
    setSaving(true);
    try {
      await Promise.all(
        editedOptions.map(o =>
          updatePricingOption(o.id, { label: o.label, price: o.price })
        )
      );
      showFeedback('Calculator options saved successfully.');
    } catch {
      showFeedback('Error: could not save options.');
    } finally {
      setSaving(false);
    }
  }

  const optionsByStep = STEP_TITLES.map((title, i) => ({
    step: i + 1,
    title,
    options: editedOptions.filter(o => o.step === i + 1).sort((a, b) => a.order - b.order),
  }));

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-24 bg-[var(--bg-surface)] rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-white/10">
        {(['plans', 'calculator'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setFeedback(''); }}
            className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors
              ${tab === t
                ? 'bg-[var(--bg-surface)] border border-b-[var(--bg-surface)] border-white/10 text-white'
                : 'text-gray-400 hover:text-white'
              }`}
          >
            {t === 'plans' ? 'Pricing Plans' : 'Calculator Options'}
          </button>
        ))}
      </div>

      {/* Feedback */}
      {feedback && (
        <p className={`text-sm font-medium ${feedback.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
          {feedback}
        </p>
      )}

      {/* ── Plans tab ── */}
      {tab === 'plans' && (
        <div className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {editedPlans.map(plan => (
              <div key={plan.id} className="bg-[var(--bg-surface)] rounded-2xl p-6 border border-white/10 space-y-4">
                {/* Gradient preview */}
                <div className={`h-1.5 rounded-full bg-gradient-to-r ${plan.gradient}`} />

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Plan Name</label>
                  <input
                    value={plan.name}
                    onChange={e => updatePlanField(plan.id, 'name', e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Price (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      min={0}
                      value={plan.price}
                      onChange={e => updatePlanField(plan.id, 'price', Number(e.target.value))}
                      className="w-full bg-[var(--bg-subtle)] border border-white/10 rounded-lg pl-7 pr-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Gradient</label>
                  <select
                    value={plan.gradient}
                    onChange={e => updatePlanField(plan.id, 'gradient', e.target.value)}
                    className="w-full bg-[var(--bg-subtle)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    {GRADIENT_OPTIONS.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Features (one per line)</label>
                  <textarea
                    rows={6}
                    value={plan.features.join('\n')}
                    onChange={e => updatePlanField(plan.id, 'features', e.target.value.split('\n'))}
                    className="w-full bg-[var(--bg-subtle)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-400 mb-1">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={plan.order}
                    onChange={e => updatePlanField(plan.id, 'order', Number(e.target.value))}
                    className="w-full bg-[var(--bg-subtle)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={savePlans}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save Plans'}
          </button>
        </div>
      )}

      {/* ── Calculator tab ── */}
      {tab === 'calculator' && (
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            Edit the label and price for each calculator option. The <span className="font-mono text-purple-400">key</span> is fixed and used internally for matching.
          </p>

          {optionsByStep.map(({ step, title, options }) => (
            <div key={step} className="bg-[var(--bg-surface)] rounded-2xl p-6 border border-white/10">
              <h3 className="text-sm font-semibold text-purple-400 mb-4">
                Step {step}: {title}
              </h3>
              <div className="space-y-3">
                {options.map(opt => (
                  <div key={opt.id} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 font-mono w-28 shrink-0 truncate" title={opt.key}>
                      {opt.key}
                    </span>
                    <input
                      value={opt.label}
                      onChange={e => updateOptionField(opt.id, 'label', e.target.value)}
                      className="flex-1 bg-[var(--bg-subtle)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 min-w-0"
                      placeholder="Label"
                    />
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-gray-400 text-sm">$</span>
                      <input
                        type="number"
                        min={0}
                        value={opt.price}
                        onChange={e => updateOptionField(opt.id, 'price', Number(e.target.value))}
                        className="w-24 bg-[var(--bg-subtle)] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={saveOptions}
            disabled={saving}
            className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Save Calculator Options'}
          </button>
        </div>
      )}
    </div>
  );
}
