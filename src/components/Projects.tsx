import { useState } from 'react';

const Projects = () => {
  const [showMore, setShowMore] = useState(false);

const mainProjects = [
  {
    title: 'Corporative Website',
    description: 'Professional corporate website built with WordPress using ACF and Elementor. Includes SEO optimization and custom theme setup.',
    image: '/images/portfolio2.png',
    link: 'https://www.connectivetechnologies.co.uk/',
    tech: ['WordPress', 'Elementor', 'ACF', 'SEO'],
    category: 'Corporate'
  },
  {
    title: 'Portfolio Website',
    description: 'Clean personal portfolio for a designer with animations and dark mode.',
    image: '/images/portfolio1.png',
    link: 'https://web-dev-site-eta.vercel.app/',
    tech: ['React', 'Vercel', 'Tailwind'],
    category: 'Frontend'
  },
  {
    title: 'Cleaning Service Website',
    description: 'Multi-page WordPress website for a cleaning company with service pages, SEO settings, and ACF + Elementor integration.',
    image: '/images/portfolio3.png',
    link: 'https://clean-clin.lviv.ua/',
    tech: ['WordPress', 'ACF', 'Elementor', 'SEO'],
    category: 'Service'
  }
];

const additionalProjects = [
  {
    title: 'Financial Literacy Landing Page',
    description: 'Single-page landing for online finance courses built with Bootstrap, JavaScript, and SCSS.',
    image: '/images/portfolio4.png',
    link: '#contact',
    tech: ['Bootstrap', 'JavaScript', 'SCSS'],
    category: 'Landing'
  },
  {
    title: 'Real Estate Platform',
    description: 'Property sales platform built with WordPress, SCSS, ACF, and custom filtering features.',
    image: '/images/portfolio5.png',
    link: 'https://www.romanchaus.pp.ua/',
    tech: ['WordPress', 'ACF', 'SCSS', 'Custom Plugins'],
    category: 'Real Estate'
  },
  {
    title: 'Veterinary Clinic Website',
    description: 'WordPress site for a veterinary clinic offering pet care. Includes personal account system, ACF, and Elementor.',
    image: '/images/portfolio6.png',
    link: 'https://merlion.com.ua/',
    tech: ['WordPress', 'Elementor', 'ACF', 'User Dashboard'],
    category: 'Healthcare'
  }
];


  const allProjects = showMore ? [...mainProjects, ...additionalProjects] : mainProjects;

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10"></div>
      
      {/* Floating background elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            My Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A selection of projects I've built for clients and personal growth.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all duration-500 hover:transform hover:scale-105"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative overflow-hidden h-48 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-purple-500/80 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                  {project.category}
                </div>
                
                {/* Hover View Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <a href={project.link} className="px-6 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white font-semibold hover:bg-white/30 transition-colors duration-300">
                    View Project
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs font-medium border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* View Link */}
                <a
                  href={project.link}
                  className="inline-flex items-center space-x-2 text-purple-400 hover:text-pink-400 font-semibold transition-colors duration-300 group/link"
                >
                  <span>View Project</span>
                  <span className="transform group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            {showMore ? 'Show Less' : 'View More Projects'}
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-purple-400 mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-gray-300 mb-6">
              I'm always excited to work on new challenges and bring creative ideas to life. 
              Let's discuss how I can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href='#contact' className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Get a Quote
              </a>
              <a href='#contact' className="px-6 py-3 border-2 border-purple-400 rounded-full text-purple-400 font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300">
                Schedule a Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}  

export default Projects;