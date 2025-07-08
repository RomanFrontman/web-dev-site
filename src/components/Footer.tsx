import { Github, Linkedin, Twitter, Instagram, Dribbble } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: <Github size={24} />, href: 'https://github.com/romanFrontman', color: 'hover:text-purple-400' },
    { name: 'LinkedIn', icon: <Linkedin size={24} />, href: 'https://linkedin.com/in/roman-chaus/', color: 'hover:text-blue-400' },
    { name: 'Twitter', icon: <Twitter size={24} />, href: 'https://x.com/yourusername', color: 'hover:text-cyan-400' },
    { name: 'Instagram', icon: <Instagram size={24} />, href: 'https://instagram.com/romeo_el_chausone', color: 'hover:text-pink-400' },
    { name: 'Dribbble', icon: <Dribbble size={24} />, href: 'https://dribbble.com/yourusername', color: 'hover:text-purple-400' },
  ];


  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'WordPress Development',
    'React Applications',
    'E-commerce Solutions',
    'API Development',
    'UI/UX Design',
    'Performance Optimization'
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-white/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">

              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                WebDev Pro
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Crafting exceptional digital experiences with modern technologies.
              Let's build something amazing together.
            </p>
            <div className="flex justify-center gap-6 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white ${social.color} transition duration-300`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-purple-400 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-purple-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-pink-400 mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-300 flex items-center group">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-3 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-blue-400 mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-lg">📧</span>
                <span>hello@webdevpro.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-lg">📱</span>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <span className="text-lg">🌍</span>
                <span>Available Worldwide</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a href="#contact" className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                Start Your Project
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} WebDev Pro. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="/privacy-policy" className="text-sm text-gray-400 hover:text-purple-400">
                Privacy Policy
              </a>
              <a href="/terms-of-use" className="text-sm text-gray-400 hover:text-purple-400">
                Terms of Service
              </a>

              <a href="/cookies-policy" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"></div>
    </footer>
  );
}
export default Footer;