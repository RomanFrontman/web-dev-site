import { Code, Monitor } from 'lucide-react';

const Skills = () => {
  const skills = [
    { name: 'WordPress', level: 95, color: 'from-blue-500 to-blue-600', icon: '🚀' },
    { name: 'React', level: 90, color: 'from-cyan-500 to-blue-500', icon: '⚛️' },
    { name: 'JavaScript', level: 88, color: 'from-yellow-400 to-yellow-500', icon: '🔥' },
    { name: 'PHP', level: 85, color: 'from-purple-500 to-purple-600', icon: '🐘' },
    { name: 'MySQL', level: 85, color: 'from-orange-500 to-red-500', icon: '🗄️' },
    { name: 'Tailwind CSS', level: 90, color: 'from-teal-400 to-cyan-500', icon: '🎨' },
    { name: 'Bootstrap', level: 80, color: 'from-indigo-500 to-indigo-600', icon: '📘' }
  ];


  const tools = [
    { name: 'Git', icon: '🔧' },
    { name: 'Docker', icon: '🐳' },
    { name: 'AWS', icon: '☁️' },
    { name: 'Figma', icon: '🎨' },
    { name: 'Gulp', icon: '📦' },
    { name: 'Sass', icon: '💅' }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="bg-gradient-to-br from-neutral-900/80 to-gray-700/60"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Constantly evolving and mastering the latest technologies to deliver cutting-edge solutions
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Programming Skills */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-purple-400 mb-8 flex items-center">
                <Code className="mr-3 h-8 w-8" />
                Programming Skills
              </h3>

              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-500">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <span className="text-lg font-semibold text-white">{skill.name}</span>
                      </div>
                      <span className="text-purple-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Tools & Frameworks */}
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-pink-400 mb-8 flex items-center">
                <Monitor className="mr-3 h-8 w-8" />
                Tools & Frameworks
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <div key={tool.name} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-pink-400/50 transition-all duration-500 hover:transform hover:scale-105 text-center">
                    <div className="text-4xl mb-3">{tool.icon}</div>
                    <div className="text-lg font-semibold text-white">{tool.name}</div>
                  </div>
                ))}
              </div>

              {/* Specializations */}
              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-white/10">
                <h4 className="text-2xl font-bold text-purple-400 mb-6">Specializations</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300">Custom WordPress Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span className="text-gray-300">React.js & Next.js Applications</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300">E-commerce Solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300">API Development & Integration</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;