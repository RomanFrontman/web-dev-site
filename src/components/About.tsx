import AnimatedCounter from './AnimatedCounter';

const About = () => {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
     <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-gray-800/60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            {/* Profile Photo Section */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl p-6 backdrop-blur-sm border border-white/10">
                  {/* Photo Container */}
                  <div className="relative mb-6">
                    <div className="w-full aspect-square bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-purple-400/50">
                     <div className="text-center">

    <img
      src="/images/developer1.jpg"
      alt="Your Name"
      className="w-full h-full object-cover rounded-2xl"
    />

</div>

                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500/30 rounded-full blur-sm"></div>
                    <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-pink-500/30 rounded-full blur-sm"></div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">  <AnimatedCounter target={30} />+</div>
                      <div className="text-gray-300 text-sm">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400 mb-1">  <AnimatedCounter target={3} />+</div>
                      <div className="text-gray-300 text-sm">Years</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">  <AnimatedCounter target={100} />%</div>
                      <div className="text-gray-300 text-sm">Quality</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">  <AnimatedCounter target={24} />/7</div>
                      <div className="text-gray-300 text-sm">Support</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Experience Cards */}
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:transform hover:scale-105">
                  <h3 className="text-xl font-bold text-purple-400 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-purple-400 rounded-full mr-3"></span>
                    Who am I?
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Greetings! I'm Roman — passionate and detail-oriented WordPress developer with more than 3 years of professional experience. Demonstrated excellence in crafting efficient code, with a solid understanding of UI/UX design principles and cross-browser layout techniques.
                    
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all duration-500 hover:transform hover:scale-105">
                  <h3 className="text-xl font-bold text-pink-400 mb-3 flex items-center">
                    <span className="w-3 h-3 bg-pink-400 rounded-full mr-3"></span>
                    WordPress Specialist
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Developed responsive, cross-browser websites on WordPress, created custom themes, 
                    worked with SEO plugins and optimized websites for SEO to achieve high speed performance. 
                    Extensive experience with Elementor PRO, ACF, Contact Form 7, LiteSpeed Cache, and YoastSEO.
                    Worked closely with teams of experts in website optimization, SEO and Analytics. 
                    Maintained content, developed new pages, and ensured overall UX quality and consistency 
                    across projects using various CMS capabilities including Drupal.
                  </p>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-blue-400 mb-4">Technical Expertise</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">HTML5, CSS3, SASS/SCSS</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">JavaScript, jQuery</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">React, Webpack</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">PHP, MySQL</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">WordPress, Drupal</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">Bootstrap, Git</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">Figma Design</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                      <span className="text-gray-300 text-sm">SEO Optimization</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* WordPress Plugins Expertise */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-purple-400 mb-4">WordPress Plugins Mastery</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Elementor PRO', 'Advanced Custom Fields', 'Contact Form 7', 
                    'Custom Post Type', 'LiteSpeed Cache', 'Yoast SEO', 
                    'WooCommerce', 'WPML', 'Gutenberg'
                  ].map((plugin, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-300"
                    >
                      {plugin}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;