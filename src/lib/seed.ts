// src/lib/seed.ts
// Run once to populate empty Supabase tables with the original portfolio data.
//
// HOW TO RUN (browser console):
//   1. Temporarily add this line to src/main.tsx:
//        import './lib/seed';
//   2. Open the app in the browser — check the console for results.
//   3. Remove the import from main.tsx once seeding is done.
//
// The script is a no-op if either table already has rows.

import { supabase } from './supabase';
import type { Project, Skill, Page } from '../types/database';

// ---------------------------------------------------------------------------
// Seed data — snake_case to match Supabase schema
// ---------------------------------------------------------------------------

const PROJECTS: Omit<Project, 'id' | 'created_at'>[] = [
  {
    title: 'Corporative Website',
    description: 'Professional corporate website built with WordPress using ACF and Elementor. Includes SEO optimization and custom theme setup.',
    tech: ['WordPress', 'Elementor', 'ACF', 'SEO'],
    live_url: 'https://www.connectivetechnologies.co.uk/',
    github_url: '',
    image: '/images/portfolio2.png',
    featured: true,
    category: 'Corporate',
    order: 1,
  },
  {
    title: 'Portfolio Website',
    description: 'Clean personal portfolio for a designer with animations and dark mode.',
    tech: ['React', 'Vercel', 'Tailwind'],
    live_url: 'https://web-dev-site-eta.vercel.app/',
    github_url: '',
    image: '/images/portfolio1.png',
    featured: true,
    category: 'Frontend',
    order: 2,
  },
  {
    title: 'Cleaning Service Website',
    description: 'Multi-page WordPress website for a cleaning company with service pages, SEO settings, and ACF + Elementor integration.',
    tech: ['WordPress', 'ACF', 'Elementor', 'SEO'],
    live_url: 'https://clean-clin.lviv.ua/',
    github_url: '',
    image: '/images/portfolio3.png',
    featured: true,
    category: 'Service',
    order: 3,
  },
  {
    title: 'Financial Literacy Landing Page',
    description: 'Single-page landing for online finance courses built with Bootstrap, JavaScript, and SCSS.',
    tech: ['Bootstrap', 'JavaScript', 'SCSS'],
    live_url: '#contact',
    github_url: '',
    image: '/images/portfolio4.png',
    featured: false,
    category: 'Landing',
    order: 4,
  },
  {
    title: 'Real Estate Platform',
    description: 'Property sales platform built with WordPress, SCSS, ACF, and custom filtering features.',
    tech: ['WordPress', 'ACF', 'SCSS', 'Custom Plugins'],
    live_url: 'https://www.romanchaus.pp.ua/',
    github_url: '',
    image: '/images/portfolio5.png',
    featured: false,
    category: 'Real Estate',
    order: 5,
  },
  {
    title: 'Veterinary Clinic Website',
    description: 'WordPress site for a veterinary clinic offering pet care. Includes personal account system, ACF, and Elementor.',
    tech: ['WordPress', 'Elementor', 'ACF', 'User Dashboard'],
    live_url: 'https://merlion.com.ua/',
    github_url: '',
    image: '/images/portfolio6.png',
    featured: false,
    category: 'Healthcare',
    order: 6,
  },
];

const SKILLS: Omit<Skill, 'id' | 'created_at'>[] = [
  { name: 'WordPress',    level: 95, category: 'Programming', icon: '🚀', color: 'from-blue-500 to-blue-600',     order: 1  },
  { name: 'React',        level: 90, category: 'Programming', icon: '⚛️', color: 'from-cyan-500 to-blue-500',     order: 2  },
  { name: 'JavaScript',   level: 88, category: 'Programming', icon: '🔥', color: 'from-yellow-400 to-yellow-500', order: 3  },
  { name: 'PHP',          level: 85, category: 'Programming', icon: '🐘', color: 'from-purple-500 to-purple-600', order: 4  },
  { name: 'MySQL',        level: 85, category: 'Programming', icon: '🗄️', color: 'from-orange-500 to-red-500',    order: 5  },
  { name: 'Tailwind CSS', level: 90, category: 'Programming', icon: '🎨', color: 'from-teal-400 to-cyan-500',     order: 6  },
  { name: 'Bootstrap',    level: 80, category: 'Programming', icon: '📘', color: 'from-indigo-500 to-indigo-600', order: 7  },
  { name: 'Git',          level: 0,  category: 'Tool',        icon: '🔧', color: 'from-gray-500 to-gray-600',     order: 8  },
  { name: 'Docker',       level: 0,  category: 'Tool',        icon: '🐳', color: 'from-blue-500 to-blue-600',     order: 9  },
  { name: 'Vercel',       level: 0,  category: 'Tool',        icon: '▲',  color: 'from-gray-700 to-gray-900',     order: 10 },
  { name: 'Figma',        level: 0,  category: 'Tool',        icon: '🎨', color: 'from-pink-500 to-purple-500',   order: 11 },
  { name: 'Gulp',         level: 0,  category: 'Tool',        icon: '📦', color: 'from-red-500 to-red-600',       order: 12 },
  { name: 'Sass',         level: 0,  category: 'Tool',        icon: '💅', color: 'from-pink-400 to-pink-600',     order: 13 },
];

// ---------------------------------------------------------------------------
// Seed function
// ---------------------------------------------------------------------------

async function seedDatabase() {
  console.log('[seed] Starting…');
  console.log('[seed] Supabase URL:', import.meta.env.VITE_SUPABASE_URL);

  // Check if tables already have data
  const [projectsCount, skillsCount] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('skills').select('*', { count: 'exact', head: true }),
  ]);

  console.log('[seed] projects count query →', { count: projectsCount.count, error: projectsCount.error });
  console.log('[seed] skills count query   →', { count: skillsCount.count,   error: skillsCount.error   });

  if ((projectsCount.count ?? 0) > 0 || (skillsCount.count ?? 0) > 0) {
    console.log(
      `[seed] Tables already populated — projects: ${projectsCount.count}, skills: ${skillsCount.count}. Skipping.`
    );
    return;
  }

  // Insert projects
  const projectsResult = await supabase.from('projects').insert(PROJECTS).select();
  console.log('[seed] projects insert data  →', projectsResult.data);
  console.log('[seed] projects insert error →', projectsResult.error);

  // Insert skills
  const skillsResult = await supabase.from('skills').insert(SKILLS).select();
  console.log('[seed] skills insert data  →', skillsResult.data);
  console.log('[seed] skills insert error →', skillsResult.error);

  if (!projectsResult.error && !skillsResult.error) {
    console.log('[seed] Done — inserted', PROJECTS.length, 'projects and', SKILLS.length, 'skills.');
  }
}

seedDatabase();

// ---------------------------------------------------------------------------
// Pages seed
// ---------------------------------------------------------------------------

const PAGES: Omit<Page, 'id' | 'updated_at'>[] = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    is_published: true,
    content: `
<p>This Privacy Policy describes how Roman Frontman ("I", "me", "my") — a freelance web developer operating from Lviv, Ukraine — collects, uses, stores, and protects the personal data of visitors and clients who interact with this website. I am committed to handling your data transparently and in compliance with the General Data Protection Regulation (GDPR) and applicable Ukrainian data protection legislation.</p>

<h2>1. Data Controller</h2>
<ul>
  <li><strong>Name:</strong> Roman Frontman</li>
  <li><strong>Location:</strong> Lviv, Ukraine</li>
  <li><strong>Email:</strong> <a href="mailto:roman@gmail.com">roman@gmail.com</a></li>
</ul>

<h2>2. Data We Collect</h2>
<h3>2.1 Contact Form Submissions</h3>
<p>When you use the contact form on this website, I collect:</p>
<ul>
  <li><strong>Full name</strong> — to address you correctly in correspondence</li>
  <li><strong>Email address</strong> — to reply to your inquiry</li>
  <li><strong>Message content</strong> — the details of your request or question</li>
  <li><strong>Submission timestamp</strong> — recorded automatically</li>
</ul>

<h3>2.2 Usage and Technical Data</h3>
<p>When you visit this website, the following data may be collected automatically:</p>
<ul>
  <li>Browser type and version</li>
  <li>Operating system</li>
  <li>Approximate geographic location (country/region level)</li>
  <li>Pages visited and time spent on each page</li>
  <li>Referral source (how you found this site)</li>
  <li>Core Web Vitals performance metrics</li>
</ul>

<h3>2.3 Data You Do Not Need to Provide</h3>
<p>I do not require you to create an account, and I do not collect payment card numbers, government IDs, or any sensitive categories of data as defined under GDPR Article 9.</p>

<h2>3. Legal Basis for Processing</h2>
<p>I process your personal data on the following legal bases (GDPR Article 6):</p>
<ul>
  <li><strong>Consent (Art. 6(1)(a)):</strong> When you submit the contact form and check the consent checkbox, you give explicit consent for me to process your name, email, and message.</li>
  <li><strong>Legitimate interests (Art. 6(1)(f)):</strong> For website performance monitoring and security — to maintain a fast, reliable, and secure service.</li>
  <li><strong>Contract performance (Art. 6(1)(b)):</strong> If we enter into a service agreement, I will process your data as necessary to fulfil that contract.</li>
</ul>

<h2>4. How I Use Your Data</h2>
<ul>
  <li>To respond to your contact form inquiry</li>
  <li>To send project proposals, invoices, or project-related communications</li>
  <li>To improve the performance and user experience of this website</li>
  <li>To comply with legal obligations</li>
</ul>
<p>I will never sell, rent, or trade your personal data to third parties for marketing purposes.</p>

<h2>5. Third-Party Services &amp; Data Processors</h2>
<h3>5.1 Supabase</h3>
<p>Contact form submissions are stored in a Supabase PostgreSQL database hosted on AWS infrastructure in the EU region. Supabase is GDPR-compliant. Data is encrypted in transit (TLS) and at rest.</p>

<h3>5.2 FormSubmit</h3>
<p>Contact form submissions are relayed to my email via FormSubmit. FormSubmit processes your name, email, and message solely to deliver them to my inbox and does not retain them beyond delivery.</p>

<h3>5.3 Vercel</h3>
<p>This website is hosted on Vercel's global edge network. Vercel may process your IP address and HTTP request data to serve pages and provide DDoS protection. Vercel is SOC 2 Type 2 certified and GDPR-compliant.</p>

<h3>5.4 Vercel Speed Insights</h3>
<p>I use Vercel Speed Insights to collect anonymised Core Web Vitals performance metrics. No personally identifiable information is collected. Data is aggregated and cannot be traced back to individual users.</p>

<h2>6. Data Retention</h2>
<ul>
  <li><strong>Contact form messages:</strong> Retained for up to 2 years from submission, or until you request deletion.</li>
  <li><strong>Client project data:</strong> Retained for up to 5 years following project completion for accounting and legal purposes.</li>
  <li><strong>Analytics data:</strong> Aggregated and anonymised; retained indefinitely in aggregate form.</li>
</ul>

<h2>7. International Data Transfers</h2>
<p>Your data may be transferred to and processed in countries outside the EEA where my third-party service providers operate. Such transfers are governed by standard contractual clauses (SCCs) approved by the European Commission.</p>

<h2>8. Your Rights Under GDPR</h2>
<ul>
  <li><strong>Right of access (Art. 15):</strong> Request a copy of the personal data I hold about you.</li>
  <li><strong>Right to rectification (Art. 16):</strong> Request correction of inaccurate or incomplete data.</li>
  <li><strong>Right to erasure (Art. 17):</strong> Request deletion of your personal data ("right to be forgotten").</li>
  <li><strong>Right to restriction (Art. 18):</strong> Request that I restrict processing of your data in certain circumstances.</li>
  <li><strong>Right to data portability (Art. 20):</strong> Receive your data in a structured, machine-readable format.</li>
  <li><strong>Right to object (Art. 21):</strong> Object to processing based on legitimate interests.</li>
  <li><strong>Right to withdraw consent:</strong> Withdraw consent at any time without affecting the lawfulness of prior processing.</li>
</ul>
<p>To exercise any of these rights, contact me at <a href="mailto:roman@gmail.com">roman@gmail.com</a>. I will respond within 30 days.</p>

<h2>9. Data Security</h2>
<p>I implement appropriate technical and organisational measures to protect your personal data, including:</p>
<ul>
  <li>TLS/HTTPS encryption for all data in transit</li>
  <li>Encryption at rest for database storage</li>
  <li>Row-level security policies on the database</li>
  <li>Access restricted to authorised personnel only</li>
  <li>Regular security reviews of third-party dependencies</li>
</ul>

<h2>10. Children's Privacy</h2>
<p>This website is not directed at children under the age of 16. I do not knowingly collect personal data from children. If you believe a child has submitted data to me, please contact me immediately.</p>

<h2>11. Links to Third-Party Websites</h2>
<p>This website may contain links to client project websites and other external resources. I am not responsible for the privacy practices of those sites.</p>

<h2>12. Changes to This Policy</h2>
<p>I may update this Privacy Policy periodically. The "Last updated" date will be revised accordingly. Continued use of this website after changes constitutes acceptance of the updated policy.</p>

<h2>13. Contact</h2>
<ul>
  <li><strong>Roman Frontman</strong></li>
  <li>Lviv, Ukraine</li>
  <li><a href="mailto:roman@gmail.com">roman@gmail.com</a></li>
</ul>
`.trim(),
  },
  {
    slug: 'terms-of-use',
    title: 'Terms of Use',
    is_published: true,
    content: `
<p>These Terms of Use ("Terms") constitute a legally binding agreement between you ("Client") and Roman Frontman ("Developer"), a freelance web developer based in Lviv, Ukraine. By accessing this website or engaging my services, you agree to be bound by these Terms.</p>

<h2>1. Services Provided</h2>
<p>I offer the following professional web development services:</p>
<ul>
  <li>Custom website design and development (React, WordPress, vanilla HTML/CSS/JS)</li>
  <li>E-commerce solutions (WooCommerce, custom integrations)</li>
  <li>WordPress theme and plugin development</li>
  <li>Website maintenance, updates, and technical support</li>
  <li>Performance optimisation and SEO technical setup</li>
  <li>API development and third-party service integrations</li>
  <li>Landing page creation and conversion optimisation</li>
</ul>

<h2>2. Acceptance of Terms</h2>
<p>By submitting a contact form inquiry, making a payment, or signing a project proposal, you confirm that you have read, understood, and agree to these Terms.</p>

<h2>3. Project Process &amp; Client Obligations</h2>
<h3>3.1 Project Initiation</h3>
<p>All projects begin with a discovery phase. A written proposal or Statement of Work is issued before any development work begins. Work commences only after written approval and receipt of any agreed deposit.</p>

<h3>3.2 Client Responsibilities</h3>
<ul>
  <li>Provide all required content (text, images, branding assets, credentials) by agreed dates</li>
  <li>Provide timely feedback and approvals — typically within 5 business days</li>
  <li>Designate a single point of contact for the project</li>
  <li>Ensure that all content and materials you provide are legally owned by you or properly licensed</li>
</ul>

<h3>3.3 Revisions</h3>
<p>Each project phase includes a reasonable number of revision rounds as specified in the proposal (typically two rounds per major deliverable). Revisions outside the agreed scope will be quoted and billed separately.</p>

<h2>4. Payment Terms</h2>
<h3>4.1 Payment Schedule</h3>
<ul>
  <li><strong>50% deposit</strong> — due before work commences</li>
  <li><strong>50% final payment</strong> — due upon project completion, before final files/deployment are handed over</li>
</ul>

<h3>4.2 Late Payments</h3>
<p>Invoices are due within 14 calendar days of issue. Overdue payments accrue interest at 1.5% per month.</p>

<h3>4.3 Refunds</h3>
<p>The deposit is non-refundable once work has commenced. If a project is cancelled mid-way by the client, payment is due for all work completed to the point of cancellation.</p>

<h2>5. Intellectual Property</h2>
<h3>5.1 Ownership of Final Deliverables</h3>
<p>Upon receipt of full payment, you receive full ownership of the final, custom-created design and code specific to your project. Ownership transfers only after all invoices are paid in full.</p>

<h3>5.2 Third-Party Components</h3>
<p>Projects may incorporate open-source libraries, WordPress themes, stock photography, or other third-party assets. These remain subject to their own respective licences.</p>

<h3>5.3 Developer Portfolio Rights</h3>
<p>Unless you request otherwise in writing, I reserve the right to display the completed project in my portfolio as an example of my work.</p>

<h2>6. Confidentiality</h2>
<p>I treat all client information as strictly confidential and will not disclose it to third parties without your consent, except as required by law or to perform the services. An NDA can be executed prior to the start of the project upon written request.</p>

<h2>7. Warranties &amp; Disclaimer</h2>
<p>I warrant that work will be performed with professional skill and care and that deliverables will conform to the agreed specifications at the time of delivery. Except as expressly stated, services are provided "as is" without warranties of any kind.</p>

<h2>8. Limitation of Liability</h2>
<p>My total liability for any claim shall not exceed the total fees paid by you for the specific project in the 12 months preceding the claim. I shall not be liable for any indirect, incidental, or consequential damages.</p>

<h2>9. Post-Launch Support</h2>
<p>Unless a separate maintenance agreement is in place, post-launch support is limited to a 30-day bug-fix period covering defects in the original deliverables. Ongoing maintenance is available as a separate monthly retainer.</p>

<h2>10. Termination</h2>
<p>Either party may terminate the project engagement with 14 days written notice. Upon termination, all work completed to date is billable and payable within 14 days.</p>

<h2>11. Force Majeure</h2>
<p>Neither party shall be liable for delays or failure to perform obligations resulting from circumstances beyond reasonable control.</p>

<h2>12. Acceptable Use</h2>
<p>You agree not to use this website to transmit unlawful content, attempt unauthorised access, introduce malware, scrape data, or impair the site's functionality.</p>

<h2>13. Governing Law</h2>
<p>These Terms are governed by the laws of Ukraine. Disputes shall be subject to the exclusive jurisdiction of the courts of Lviv, Ukraine. Both parties agree to attempt good-faith negotiation for at least 30 days before initiating legal proceedings.</p>

<h2>14. Changes to These Terms</h2>
<p>I reserve the right to update these Terms at any time. Continued use of this website after changes constitutes acceptance of the revised Terms.</p>

<h2>15. Contact</h2>
<ul>
  <li><strong>Roman Frontman</strong></li>
  <li>Lviv, Ukraine</li>
  <li><a href="mailto:roman@gmail.com">roman@gmail.com</a></li>
</ul>
`.trim(),
  },
  {
    slug: 'cookies-policy',
    title: 'Cookies Policy',
    is_published: true,
    content: `
<p>This Cookies Policy explains what cookies and similar storage technologies are, how Roman Frontman uses them on this website, and what choices you have. This policy should be read alongside the <a href="/privacy-policy">Privacy Policy</a>.</p>

<h2>1. What Are Cookies?</h2>
<p>Cookies are small text files placed on your device by a website when you visit it. They are used to make websites work efficiently, remember your preferences, and provide information to site owners.</p>
<p>In addition to cookies, this website uses <strong>localStorage</strong> — a browser-based storage mechanism that persists data locally on your device. Unlike cookies, localStorage data is never sent to the server with HTTP requests.</p>

<h2>2. Cookies &amp; Storage This Site Uses</h2>
<h3>Essential / Functional</h3>
<p>These are strictly necessary for the website to function and cannot be disabled.</p>
<table>
  <thead>
    <tr><th>Name</th><th>Type</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td>darkMode</td><td>localStorage</td><td>Remembers your light/dark mode preference between visits</td></tr>
    <tr><td>admin_session</td><td>localStorage</td><td>Admin panel session token (24h expiry). Only set for authenticated administrators — never for regular visitors</td></tr>
    <tr><td>cookie_preferences</td><td>localStorage</td><td>Stores your cookie consent choices</td></tr>
  </tbody>
</table>

<h3>Performance &amp; Analytics</h3>
<p>These help me understand how visitors interact with the website. All data is anonymised and cannot identify you personally.</p>
<table>
  <thead>
    <tr><th>Service</th><th>Provider</th><th>Purpose</th></tr>
  </thead>
  <tbody>
    <tr><td>Speed Insights</td><td>Vercel</td><td>Collects Core Web Vitals (LCP, FID, CLS, TTFB) to monitor page performance. No personal data. Aggregated at domain level only.</td></tr>
  </tbody>
</table>

<h2>3. What This Site Does NOT Use</h2>
<ul>
  <li>Google Analytics or any Google tracking pixels</li>
  <li>Facebook Pixel or any Meta advertising trackers</li>
  <li>Remarketing or behavioural advertising cookies</li>
  <li>Any cookies that track your activity across other websites</li>
</ul>

<h2>4. How Long Cookies Last</h2>
<ul>
  <li><strong>darkMode:</strong> Persists until you clear browser storage or toggle the setting manually.</li>
  <li><strong>admin_session:</strong> Expires automatically after 24 hours, or immediately upon logout.</li>
  <li><strong>cookie_preferences:</strong> Persists until you clear browser storage or reset your preferences.</li>
  <li><strong>Vercel Speed Insights:</strong> Session-based. Does not set persistent cookies on your device.</li>
</ul>

<h2>5. Managing &amp; Disabling Cookies</h2>
<p>You can control cookies through your browser settings:</p>
<ul>
  <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
  <li><strong>Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data</li>
  <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
  <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
</ul>
<p>You can also update your preferences at any time by clicking the cookie icon in the bottom-right corner of the page.</p>

<h2>6. Consent</h2>
<p>By continuing to use this website, you consent to the use of the cookies and storage technologies described in this policy. Because this site uses only strictly necessary functional storage and privacy-respecting, anonymised performance monitoring, no cookie banner is legally required under ePrivacy Directive exemptions. If non-essential cookies are added in the future, a consent mechanism will be implemented before they are activated.</p>

<h2>7. Changes to This Policy</h2>
<p>This Cookies Policy may be updated to reflect changes in the technologies used on this site or changes in applicable law. The "Last updated" date at the top of this page will be revised with each update.</p>

<h2>8. Contact</h2>
<ul>
  <li><strong>Roman Frontman</strong></li>
  <li>Lviv, Ukraine</li>
  <li><a href="mailto:roman@gmail.com">roman@gmail.com</a></li>
</ul>
`.trim(),
  },
];

async function seedPages() {
  const { count } = await supabase.from('pages').select('*', { count: 'exact', head: true });
  if ((count ?? 0) > 0) {
    console.log(`[seed] pages already populated (${count} rows). Skipping.`);
    return;
  }
  const { data, error } = await supabase.from('pages').insert(PAGES).select();
  console.log('[seed] pages insert data  →', data);
  console.log('[seed] pages insert error →', error);
  if (!error) console.log(`[seed] Inserted ${PAGES.length} pages.`);
}

seedPages();
