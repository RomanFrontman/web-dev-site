// src/components/Pricing.tsx
const plans = [
    {
        name: 'Starter',
        price: '$199',
        features: ['1 Page Website', 'Responsive Design', 'Basic SEO', 'Email Support'],
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        name: 'Professional',
        price: '$499',
        features: ['Up to 5 Pages', 'Custom Design', 'SEO Optimization', 'Priority Support'],
        gradient: 'from-pink-500 to-blue-500',
    },
    {
        name: 'Enterprise',
        price: '$999',
        features: ['Unlimited Pages', 'Full Customization', 'Advanced Integrations', '24/7 Support'],
        gradient: 'from-blue-500 to-green-500',
    },
];

const Pricing = () => {
    return (
        <section id="pricing" className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-blue-900/10"></div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Pricing Plans
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Choose the plan that fits your needs. Transparent pricing. No hidden fees.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mt-6"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:scale-105 transition-transform duration-300 hover:shadow-xl`}
                        >
                            <div className={`text-3xl font-bold text-white mb-4`}>{plan.name}</div>
                            <div className={`text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient} mb-6`}>
                                {plan.price}
                            </div>
                            <ul className="space-y-3 text-gray-300 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <a
                                href="#contact"
                                className={`block text-center w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r ${plan.gradient} hover:opacity-90 transition`}
                            >
                                Choose Plan
                            </a>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
