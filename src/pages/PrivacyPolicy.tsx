import { useState, useEffect } from 'react';
import { getPageBySlug } from '../lib/db';
import PageContent from '../components/PageContent';

const Section = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-semibold text-pink-400 mt-12 mb-4">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <h3 className="text-lg font-semibold text-purple-300 mt-6 mb-2">{title}</h3>
);

const PrivacyPolicy = () => {
  const [dbPage, setDbPage] = useState<{ title: string; content: string; updated_at: string } | null>(null);

  useEffect(() => {
    getPageBySlug('privacy-policy').then(p => { if (p) setDbPage(p); }).catch(() => {});
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
        <h1 className="text-5xl font-bold text-purple-400 mt-10 mb-4">Privacy Policy</h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-10">Last updated: April 5, 2025</p>

        <p>
          This Privacy Policy describes how Roman Frontman ("I", "me", "my") — a freelance web developer
          operating from Lviv, Ukraine — collects, uses, stores, and protects the personal data of visitors
          and clients who interact with this website (<strong>romanfrontman.dev</strong>). I am committed to
          handling your data transparently and in compliance with the General Data Protection Regulation
          (GDPR) and applicable Ukrainian data protection legislation.
        </p>

        <Section title="1. Data Controller" />
        <p>
          The data controller responsible for your personal information is:
        </p>
        <ul className="mt-3 space-y-1 list-none">
          <li><strong>Name:</strong> Roman Frontman</li>
          <li><strong>Location:</strong> Lviv, Ukraine</li>
          <li><strong>Email:</strong> <a href="mailto:roman@gmail.com" className="text-purple-400 hover:text-pink-400 transition-colors duration-200">roman@gmail.com</a></li>
        </ul>

        <Section title="2. Data We Collect" />
        <Sub title="2.1 Contact Form Submissions" />
        <p>
          When you use the contact form on this website, I collect:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>Full name</strong> — to address you correctly in correspondence</li>
          <li><strong>Email address</strong> — to reply to your inquiry</li>
          <li><strong>Message content</strong> — the details of your request or question</li>
          <li><strong>Submission timestamp</strong> — recorded automatically</li>
        </ul>

        <Sub title="2.2 Usage and Technical Data" />
        <p>
          When you visit this website, the following data may be collected automatically:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Approximate geographic location (country/region level)</li>
          <li>Pages visited and time spent on each page</li>
          <li>Referral source (how you found this site)</li>
          <li>Core Web Vitals performance metrics</li>
        </ul>

        <Sub title="2.3 Data You Do Not Need to Provide" />
        <p>
          I do not require you to create an account, and I do not collect payment card numbers, government
          IDs, or any sensitive categories of data as defined under GDPR Article 9.
        </p>

        <Section title="3. Legal Basis for Processing" />
        <p>I process your personal data on the following legal bases (GDPR Article 6):</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>
            <strong>Consent (Art. 6(1)(a)):</strong> When you submit the contact form and check the
            consent checkbox, you give explicit consent for me to process your name, email, and message.
          </li>
          <li>
            <strong>Legitimate interests (Art. 6(1)(f)):</strong> For website performance monitoring and
            security — to maintain a fast, reliable, and secure service.
          </li>
          <li>
            <strong>Contract performance (Art. 6(1)(b)):</strong> If we enter into a service agreement,
            I will process your data as necessary to fulfil that contract.
          </li>
        </ul>

        <Section title="4. How I Use Your Data" />
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>To respond to your contact form inquiry</li>
          <li>To send project proposals, invoices, or project-related communications</li>
          <li>To improve the performance and user experience of this website</li>
          <li>To comply with legal obligations</li>
        </ul>
        <p className="mt-4">
          I will never sell, rent, or trade your personal data to third parties for marketing purposes.
        </p>

        <Section title="5. Third-Party Services & Data Processors" />
        <p>
          I use the following third-party services that may process your data on my behalf. Each acts
          as a data processor under a data processing agreement or standard contractual clauses.
        </p>

        <Sub title="5.1 Supabase (supabase.com)" />
        <p>
          Contact form submissions (name, email, message) are stored in a Supabase PostgreSQL database
          hosted on AWS infrastructure in the EU region. Supabase is GDPR-compliant and provides
          data processing agreements. Data is encrypted in transit (TLS) and at rest.
        </p>

        <Sub title="5.2 FormSubmit (formsubmit.co)" />
        <p>
          Contact form submissions are also relayed to my email via FormSubmit, a third-party form
          forwarding service. FormSubmit processes your name, email, and message solely to deliver
          them to my inbox and does not retain them beyond delivery.
        </p>

        <Sub title="5.3 Vercel (vercel.com)" />
        <p>
          This website is hosted on Vercel's global edge network. Vercel may process your IP address
          and HTTP request data to serve pages and provide DDoS protection. Vercel is SOC 2 Type 2
          certified and GDPR-compliant.
        </p>

        <Sub title="5.4 Vercel Speed Insights" />
        <p>
          I use Vercel Speed Insights to collect anonymised Core Web Vitals performance metrics
          (LCP, FID, CLS, TTFB). No personally identifiable information is collected by this tool.
          Data is aggregated and cannot be traced back to individual users.
        </p>

        <Section title="6. Data Retention" />
        <p>
          I retain your personal data only for as long as necessary for the purposes outlined in this policy:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>
            <strong>Contact form messages:</strong> Retained for up to 2 years from submission, or until
            you request deletion, whichever comes first.
          </li>
          <li>
            <strong>Client project data:</strong> Retained for up to 5 years following project completion
            for accounting and legal purposes.
          </li>
          <li>
            <strong>Analytics data:</strong> Aggregated and anonymised; retained indefinitely in
            aggregate form.
          </li>
        </ul>

        <Section title="7. International Data Transfers" />
        <p>
          Your data may be transferred to and processed in countries outside the European Economic Area
          (EEA) where my third-party service providers operate. Such transfers are governed by standard
          contractual clauses (SCCs) approved by the European Commission or other appropriate safeguards
          as required by GDPR Chapter V.
        </p>

        <Section title="8. Your Rights Under GDPR" />
        <p>
          If you are located in the EU/EEA or Ukraine, you have the following rights regarding your
          personal data:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-3">
          <li>
            <strong>Right of access (Art. 15):</strong> Request a copy of the personal data I hold about you.
          </li>
          <li>
            <strong>Right to rectification (Art. 16):</strong> Request correction of inaccurate or
            incomplete data.
          </li>
          <li>
            <strong>Right to erasure (Art. 17):</strong> Request deletion of your personal data
            ("right to be forgotten"), subject to legal retention obligations.
          </li>
          <li>
            <strong>Right to restriction (Art. 18):</strong> Request that I restrict processing of your
            data in certain circumstances.
          </li>
          <li>
            <strong>Right to data portability (Art. 20):</strong> Receive your data in a structured,
            machine-readable format.
          </li>
          <li>
            <strong>Right to object (Art. 21):</strong> Object to processing based on legitimate interests.
          </li>
          <li>
            <strong>Right to withdraw consent:</strong> Where processing is based on consent, withdraw
            it at any time without affecting the lawfulness of prior processing.
          </li>
        </ul>
        <p className="mt-4">
          To exercise any of these rights, contact me at{" "}
          <a href="mailto:roman@gmail.com" className="text-purple-400 hover:text-pink-400 transition-colors duration-200">
            roman@gmail.com
          </a>. I will respond within 30 days. You also have the right to lodge a complaint with your
          local supervisory authority.
        </p>

        <Section title="9. Data Security" />
        <p>
          I implement appropriate technical and organisational measures to protect your personal data,
          including:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>TLS/HTTPS encryption for all data in transit</li>
          <li>Encryption at rest for database storage</li>
          <li>Row-level security policies on the database</li>
          <li>Access restricted to authorised personnel only (admin panel protected by bcrypt-hashed credentials)</li>
          <li>Regular security reviews of third-party dependencies</li>
        </ul>
        <p className="mt-4">
          No method of transmission over the Internet is 100% secure. In the event of a data breach
          that poses a high risk to your rights and freedoms, I will notify you without undue delay
          as required by GDPR Article 34.
        </p>

        <Section title="10. Children's Privacy" />
        <p>
          This website is not directed at children under the age of 16. I do not knowingly collect
          personal data from children. If you believe a child has submitted data to me, please contact
          me immediately and I will delete it promptly.
        </p>

        <Section title="11. Links to Third-Party Websites" />
        <p>
          This website may contain links to client project websites and other external resources. I am
          not responsible for the privacy practices of those sites and encourage you to review their
          own privacy policies before providing any personal data.
        </p>

        <Section title="12. Changes to This Policy" />
        <p>
          I may update this Privacy Policy periodically to reflect changes in my practices or legal
          requirements. The "Last updated" date at the top of this page will be revised accordingly.
          Continued use of this website after changes constitutes acceptance of the updated policy.
          For material changes, I will make reasonable efforts to notify you (e.g., via a notice on
          the homepage).
        </p>

        <Section title="13. Contact" />
        <p>
          For any privacy-related questions, data subject requests, or concerns, please contact:
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

export default PrivacyPolicy;

