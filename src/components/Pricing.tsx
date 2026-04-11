// src/components/Pricing.tsx
import { useState, useEffect } from 'react';
import Button from './Button';
import type { PricingPlan } from '../types/database';
import { getPricingPlans } from '../lib/db';

const FALLBACK_PLANS: PricingPlan[] = [
  { id: '1', name: 'Starter', price: 380, features: ['One-page landing page', 'Pre-made template', 'Application form', 'Standard deadline'], gradient: 'from-purple-500 to-pink-500', order: 1, created_at: '' },
  { id: '2', name: 'Business', price: 1370, features: ['Multi-page website', 'Semi-custom design', 'Basic admin panel', 'SEO optimization', 'Blog'], gradient: 'from-pink-500 to-blue-500', order: 2, created_at: '' },
  { id: '3', name: 'Pro', price: 2850, features: ['Corporate website', 'Fully custom UI/UX', 'Advanced admin panel', 'Telegram / WhatsApp integration', 'Multilingual', 'Animations', 'Accelerated deadline'], gradient: 'from-blue-500 to-green-500', order: 3, created_at: '' },
];

function formatPrice(n: number): string {
  return '$' + n.toLocaleString('en-US');
}

const Pricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPricingPlans()
      .then(data => setPlans(data.length ? data : FALLBACK_PLANS))
      .catch(() => setPlans(FALLBACK_PLANS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Choose the plan that fits your needs. Transparent pricing. No hidden fees.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div key={i} className="bg-[var(--bg-surface)] rounded-3xl p-8 animate-pulse h-96" />
              ))
            : plans.map(plan => (
                <div
                  key={plan.id}
                  className="bg-[var(--bg-surface)] backdrop-blur-md border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-3xl p-8 hover:scale-105 transition-transform duration-300 hover:shadow-xl"
                >
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{plan.name}</div>
                  <div className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient} mb-6`}>
                    {formatPrice(plan.price)}
                  </div>
                  <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-8">
                    {plan.features.map(feature => (
                      <li key={feature} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="#contact" gradient={plan.gradient} className="w-full">
                    Choose Plan
                  </Button>
                </div>
              ))
          }
        </div>
      </div>
    </section>
  );
};

export default Pricing;
