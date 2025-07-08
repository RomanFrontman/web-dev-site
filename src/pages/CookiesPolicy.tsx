
const CookiesPolicy = () => {
  return (
    <section className="min-h-screen py-20 px-6 max-w-4xl mx-auto text-gray-300">
      <h1 className="text-5xl font-bold text-purple-400 mb-10 text-center">Cookies Policy</h1>
      <div className="space-y-8 text-base md:text-lg leading-relaxed">

        <p>
          This Cookies Policy explains how we use cookies and similar technologies on our website.
          By using this site, you consent to our use of cookies in accordance with this policy.
        </p>

        <h2 className="text-2xl font-semibold text-pink-400 mt-8">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They help us
          recognize your device and remember your preferences or actions over time.
        </p>

        <h2 className="text-2xl font-semibold text-pink-400 mt-8">2. Types of Cookies We Use</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site.</li>
          <li><strong>Functionality Cookies:</strong> Remember your preferences and settings.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-pink-400 mt-8">3. How You Can Control Cookies</h2>
        <p>
          You can control and manage cookies using your browser settings. Most browsers allow you to
          view, delete, or block cookies for specific websites.
        </p>

        <h2 className="text-2xl font-semibold text-pink-400 mt-8">4. Third-Party Cookies</h2>
        <p>
          We may use third-party services (e.g., Google Analytics) that set their own cookies to collect
          usage statistics or serve content and ads.
        </p>

        <h2 className="text-2xl font-semibold text-pink-400 mt-8">5. Changes to This Policy</h2>
        <p>
          We may update this Cookies Policy from time to time. Any changes will be posted on this page
          with a revised date.
        </p>

        <p className="mt-8">
          If you have any questions about our use of cookies, please contact us at
          <a href="mailto:info@example.com" className="text-purple-400 underline ml-1">info@example.com</a>.
        </p>
      </div>
    </section>
  );
};

export default CookiesPolicy;
