import { Monitor, Smartphone, Globe } from 'lucide-react';
import Button from './Button';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(96%_0.008_349)]/90 to-[oklch(93%_0.014_349)]/80 dark:from-black/60 dark:to-gray-800/60"></div>

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <div className="flex items-center justify-center space-x-4 mb-8" aria-hidden="true">
          <Monitor className="h-12 w-12 text-purple-400 animate-bounce" />
          <Smartphone className="h-12 w-12 text-pink-400 animate-bounce delay-300" />
          <Globe className="h-12 w-12 text-blue-400 animate-bounce delay-500" />
        </div>
        <h1 className="text-6xl md:text-8xl font-bold mb-6 
  bg-gradient-to-r 
  from-purple-400 via-pink-800 to-blue-800 
  dark:from-purple-300 dark:via-pink-300 dark:to-blue-300
  bg-clip-text text-transparent animate-pulse">
          Full-Stack Developer
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Crafting exceptional digital experiences with <span className="text-purple-400 font-semibold">WordPress</span>, <span className="text-pink-400 font-semibold"> React</span>, and cutting-edge technologies
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="#projects" size="lg">View My Work</Button>
          <Button href="#contact" variant="secondary" size="lg">Get In Touch</Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
