// src/components/Testimonials.tsx
const testimonials = [
  {
    name: 'Anna Petrova',
    title: 'CEO at StartHub',
    quote:
      'WebDev Pro delivered a stunning website that boosted our conversions by 30%. Fast, reliable, and creative!',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Michael Lee',
    title: 'Founder of CodeCraft',
    quote:
      'Their attention to detail and ability to translate our vision into code was outstanding. Highly recommend!',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Sophie Nguyen',
    title: 'Marketing Lead at PixelFlow',
    quote:
      'Professional service, beautiful design, and excellent support. We will work with them again!',
    image: 'https://randomuser.me/api/portraits/women/47.jpg',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-blue-900/10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Testimonials
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            What our happy clients say about working with us.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition transform hover:scale-105"
            >
              <p className="text-gray-300 mb-6 leading-relaxed">“{item.quote}”</p>
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 shadow-md"
                />
                <div>
                  <p className="text-white font-semibold">{item.name}</p>
                  <p className="text-sm text-purple-400">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
