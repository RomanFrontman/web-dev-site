// src/components/Contact.tsx
const Contact = () => {
  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let’s connect and bring your ideas to life.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-300">
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <h4 className="text-xl font-semibold text-purple-400 mb-2">Email</h4>
              <p>hello@webdevpro.com</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <h4 className="text-xl font-semibold text-pink-400 mb-2">Phone</h4>
              <p>+1 (234) 567-8901</p>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <h4 className="text-xl font-semibold text-blue-400 mb-2">Location</h4>
              <p>Lviv, Ukraine</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 space-y-6">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Your Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Your Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300 mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg text-white font-semibold transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
