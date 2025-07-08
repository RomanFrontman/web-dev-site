import { Monitor, Smartphone, Globe } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-gray-800/60"></div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="flex items-center justify-center space-x-4 mb-8">
          <Monitor className="h-12 w-12 text-purple-400 animate-bounce" />
          <Smartphone className="h-12 w-12 text-pink-400 animate-bounce delay-300" />
          <Globe className="h-12 w-12 text-blue-400 animate-bounce delay-500" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
          Full-Stack Developer
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Crafting exceptional digital experiences with <span className="text-purple-400 font-semibold">WordPress</span>, <span className="text-pink-400 font-semibold"> React</span>, and cutting-edge technologies
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href='#projects' className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
            View My Work
          </a>
          <a href='#contact' className="px-8 py-4 border-2 border-purple-400 rounded-full text-purple-400 font-semibold hover:bg-purple-400 hover:text-white transition-all duration-300">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
