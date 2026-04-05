import { useState, useEffect } from 'react';
import { getPageBySlug } from '../lib/db';
import PageContent from '../components/PageContent';

const Section = ({ title }: { title: string }) => (
  <h2 className="text-2xl font-semibold text-pink-400 mt-12 mb-4">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <h3 className="text-lg font-semibold text-purple-300 mt-6 mb-2">{title}</h3>
);

const TermsOfUse = () => {
  const [dbPage, setDbPage] = useState<{ title: string; content: string; updated_at: string } | null>(null);

  useEffect(() => {
    getPageBySlug('terms-of-use').then(p => { if (p) setDbPage(p); }).catch(() => {});
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
        <h1 className="text-5xl font-bold text-purple-400 mt-10 mb-4">Terms of Use</h1>
        <p className="text-gray-400 dark:text-gray-500 text-sm mb-10">Last updated: April 5, 2025</p>

        <p>
          These Terms of Use ("Terms") constitute a legally binding agreement between you ("Client",
          "you", "your") and Roman Frontman ("Developer", "I", "me", "my"), a freelance web developer
          based in Lviv, Ukraine. By accessing this website or engaging my services, you agree to be
          bound by these Terms. If you do not agree, please do not use this website or engage my services.
        </p>

        <Section title="1. Services Provided" />
        <p>I offer the following professional web development services:</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>Custom website design and development (React, WordPress, vanilla HTML/CSS/JS)</li>
          <li>E-commerce solutions (WooCommerce, custom integrations)</li>
          <li>WordPress theme and plugin development</li>
          <li>Website maintenance, updates, and technical support</li>
          <li>Performance optimisation and SEO technical setup</li>
          <li>API development and third-party service integrations</li>
          <li>Landing page creation and conversion optimisation</li>
        </ul>
        <p className="mt-4">
          The specific scope, deliverables, timeline, and price for any project are defined in a
          separate written agreement, proposal, or Statement of Work ("SOW") agreed upon before
          work commences.
        </p>

        <Section title="2. Acceptance of Terms" />
        <p>
          By submitting a contact form inquiry, engaging in written communication about a project,
          making a payment, or signing a project proposal, you confirm that you have read, understood,
          and agree to these Terms. These Terms apply to all visitors of this website and all clients
          who commission services.
        </p>

        <Section title="3. Project Process & Client Obligations" />
        <Sub title="3.1 Project Initiation" />
        <p>
          All projects begin with a discovery phase in which requirements, goals, timeline, and budget
          are established. A written proposal or SOW is issued before any development work begins.
          Work commences only after written approval and receipt of any agreed deposit.
        </p>

        <Sub title="3.2 Client Responsibilities" />
        <p>To ensure timely delivery, you agree to:</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>Provide all required content (text, images, branding assets, credentials) by agreed dates</li>
          <li>Provide timely feedback and approvals — typically within 5 business days of review requests</li>
          <li>Designate a single point of contact for the project</li>
          <li>Ensure that all content and materials you provide are legally owned by you or properly licensed</li>
          <li>Not share login credentials or project access with unauthorised third parties</li>
        </ul>
        <p className="mt-4">
          Delays caused by late client feedback or missing materials may result in revised timelines
          and additional charges, which will be communicated in writing before being applied.
        </p>

        <Sub title="3.3 Revisions" />
        <p>
          Each project phase includes a reasonable number of revision rounds as specified in the SOW
          (typically two rounds per major deliverable). Revisions that fall outside the agreed scope
          will be quoted and billed separately.
        </p>

        <Section title="4. Payment Terms" />
        <Sub title="4.1 Pricing" />
        <p>
          All prices are quoted in USD unless otherwise agreed. Price estimates on this website are
          indicative only. A fixed price or hourly rate is confirmed in the project proposal after
          reviewing your specific requirements.
        </p>

        <Sub title="4.2 Payment Schedule" />
        <p>Standard payment terms are:</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li><strong>50% deposit</strong> — due before work commences</li>
          <li><strong>50% final payment</strong> — due upon project completion, before final files/deployment are handed over</li>
        </ul>
        <p className="mt-4">
          For larger projects, milestone-based payment schedules may be agreed in the SOW.
        </p>

        <Sub title="4.3 Late Payments" />
        <p>
          Invoices are due within 14 calendar days of issue. Overdue payments accrue interest at
          1.5% per month. I reserve the right to suspend access to deliverables or hosting until
          outstanding balances are settled.
        </p>

        <Sub title="4.4 Refunds" />
        <p>
          The deposit is non-refundable once work has commenced. If a project is cancelled mid-way
          by the client, payment is due for all work completed to the point of cancellation. If I
          am unable to complete the project through no fault of the client, a pro-rata refund will
          be issued.
        </p>

        <Section title="5. Intellectual Property" />
        <Sub title="5.1 Ownership of Final Deliverables" />
        <p>
          Upon receipt of full payment, you receive full ownership of the final, custom-created
          design and code specific to your project ("Final Deliverables"). Ownership transfers only
          after all invoices are paid in full.
        </p>

        <Sub title="5.2 Third-Party Components" />
        <p>
          Projects may incorporate open-source libraries, frameworks, WordPress themes, stock photography,
          or other third-party assets. These remain subject to their own respective licences. I will
          disclose any significant third-party components used in your project and ensure appropriate
          licences are in place.
        </p>

        <Sub title="5.3 Developer Portfolio Rights" />
        <p>
          Unless you request otherwise in writing, I reserve the right to display the completed
          project in my portfolio, case studies, and social media as an example of my work. No
          confidential business information or proprietary content will be disclosed without your
          written consent.
        </p>

        <Sub title="5.4 Website Content" />
        <p>
          All content on this website — including text, graphics, code samples, and design — is my
          intellectual property and is protected by copyright. You may not reproduce, distribute,
          or use any content from this site without prior written permission.
        </p>

        <Section title="6. Confidentiality" />
        <p>
          I treat all client information — including business plans, pricing, technical architecture,
          and any data shared during the project — as strictly confidential. I will not disclose such
          information to third parties without your consent, except as required by law or to perform
          the services (e.g., sharing credentials with a hosting provider).
        </p>
        <p className="mt-4">
          If a mutual non-disclosure agreement (NDA) is required, it can be executed prior to the
          start of the project upon written request.
        </p>

        <Section title="7. Warranties & Representations" />
        <Sub title="7.1 My Warranties" />
        <p>I warrant that:</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>I have the right and authority to enter into this agreement</li>
          <li>Work will be performed with professional skill and care</li>
          <li>Deliverables will conform to the agreed specifications at the time of delivery</li>
          <li>I will not knowingly incorporate materials that infringe third-party intellectual property rights</li>
        </ul>

        <Sub title="7.2 Disclaimer" />
        <p>
          Except as expressly stated, services and this website are provided "as is" without warranties
          of any kind, express or implied, including but not limited to merchantability, fitness for a
          particular purpose, or non-infringement. I do not warrant that the website will be error-free
          or uninterrupted at all times.
        </p>

        <Section title="8. Limitation of Liability" />
        <p>
          To the fullest extent permitted by applicable law, my total liability to you for any claim
          arising out of or related to these Terms or services provided shall not exceed the total
          fees paid by you for the specific project giving rise to the claim in the 12 months
          preceding the claim.
        </p>
        <p className="mt-4">
          I shall not be liable for any indirect, incidental, special, consequential, or punitive
          damages, including loss of profits, data, business opportunities, or goodwill, even if
          advised of the possibility of such damages.
        </p>
        <p className="mt-4">
          I am not responsible for issues arising from third-party services, hosting providers,
          domain registrars, or any software not developed by me, including but not limited to
          server downtime, security breaches, or data loss at the hosting level.
        </p>

        <Section title="9. Post-Launch Support & Maintenance" />
        <p>
          Unless a separate maintenance agreement is in place, post-launch support is limited to a
          30-day bug-fix period covering defects in the original deliverables. Issues arising from
          client modifications, third-party plugin updates, or new feature requests are outside this
          warranty and are billed at my standard hourly rate.
        </p>
        <p className="mt-4">
          Ongoing maintenance, security updates, content changes, and performance monitoring are
          available as separate monthly retainer packages.
        </p>

        <Section title="10. Termination" />
        <p>
          Either party may terminate the project engagement with 14 days written notice. Upon
          termination:
        </p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>All work completed to date is billable and payable within 14 days</li>
          <li>All client-owned materials and data will be returned or deleted upon request</li>
          <li>Ownership of any partially completed work remains with me until all outstanding invoices are settled</li>
        </ul>

        <Section title="11. Force Majeure" />
        <p>
          Neither party shall be liable for delays or failure to perform obligations resulting from
          circumstances beyond reasonable control, including natural disasters, war, civil unrest,
          government actions, power failures, or internet outages.
        </p>

        <Section title="12. Acceptable Use of This Website" />
        <p>You agree not to use this website to:</p>
        <ul className="list-disc list-inside mt-3 space-y-2">
          <li>Transmit any unlawful, harassing, defamatory, or harmful content</li>
          <li>Attempt to gain unauthorised access to any part of the site or its infrastructure</li>
          <li>Introduce malware, viruses, or other malicious code</li>
          <li>Scrape or harvest data from the website without written permission</li>
          <li>Use the site in any way that could damage its reputation or impair its functionality</li>
        </ul>

        <Section title="13. Governing Law & Dispute Resolution" />
        <p>
          These Terms are governed by and construed in accordance with the laws of Ukraine. Any
          disputes arising out of or in connection with these Terms that cannot be resolved amicably
          shall be subject to the exclusive jurisdiction of the courts of Lviv, Ukraine.
        </p>
        <p className="mt-4">
          Before initiating any legal proceedings, both parties agree to attempt good-faith negotiation
          for a period of at least 30 days.
        </p>

        <Section title="14. Changes to These Terms" />
        <p>
          I reserve the right to update these Terms at any time. Changes take effect upon posting to
          this page. Continued use of this website or engagement of services after changes are posted
          constitutes acceptance of the revised Terms. Active clients under existing agreements are
          governed by the Terms in effect at the time their project agreement was signed.
        </p>

        <Section title="15. Contact" />
        <p>
          For questions about these Terms or to discuss a project, please contact:
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

export default TermsOfUse;
