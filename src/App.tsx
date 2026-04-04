import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import PriceCalculator from './components/PriceCalculator';
import Contact from './components/Contact';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookiesPolicy from './pages/CookiesPolicy';
import NotFound from './pages/NotFound';

import AdminRoute from './admin/AdminRoute';
import AdminLayout from './admin/AdminLayout';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProjects from './admin/AdminProjects';
import AdminSkills from './admin/AdminSkills';
import AdminMessages from './admin/AdminMessages';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Pricing />
              <Testimonials />
              <PriceCalculator />
              <Contact />
            </>
          }
        />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-use" element={<TermsOfUse />} /> 
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin panel */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={<AdminRoute><AdminLayout /></AdminRoute>}
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects"  element={<AdminProjects />} />
        <Route path="skills"    element={<AdminSkills />} />
        <Route path="messages"  element={<AdminMessages />} />
      </Route>
    </Routes>
  );
}

export default App;
