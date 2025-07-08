import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookiesPolicy from './pages/CookiesPolicy';


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
              <Contact />
            </>
          }
        />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-use" element={<TermsOfUse />} /> 
        <Route path="/cookies-policy" element={<CookiesPolicy />} />
      </Route>
    </Routes>
  );
}

export default App;
