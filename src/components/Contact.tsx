"use client";
// src/components/Contact.tsx
import { useState } from "react";
import Button from "./Button";
import AnimatedSection from "./AnimatedSection";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formsubmit.co/roman1997lviv@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ name, email, message, _captcha: "false", _template: "box" }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatedSection><section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have a project in mind? Let's connect and bring your ideas to life.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Info */}
          <div className="space-y-6 text-gray-600 dark:text-gray-300">
            <div className="bg-[var(--bg-surface)] backdrop-blur-md p-6 rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10">
              <h4 className="text-xl font-semibold text-purple-400 mb-2">Email</h4>
              <p>hello@webdevpro.com</p>
            </div>
            <div className="bg-[var(--bg-surface)] backdrop-blur-md p-6 rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10">
              <h4 className="text-xl font-semibold text-pink-400 mb-2">Phone</h4>
              <p>+1 (234) 567-8901</p>
            </div>
            <div className="bg-[var(--bg-surface)] backdrop-blur-md p-6 rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10">
              <h4 className="text-xl font-semibold text-blue-400 mb-2">Location</h4>
              <p>Lviv, Ukraine</p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="bg-[var(--bg-surface)] backdrop-blur-md p-8 rounded-2xl border border-[oklch(90%_0.012_349)] dark:border-white/10 space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Your Name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[var(--bg-subtle)] dark:bg-black/20 border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Your Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[var(--bg-subtle)] dark:bg-black/20 border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-[var(--bg-subtle)] dark:bg-black/20 border border-[oklch(90%_0.012_349)] dark:border-white/10 rounded-lg px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              ></textarea>
            </div>
            <Button
              type="submit"
              gradient="from-purple-500 to-blue-500"
              disabled={status === "loading"}
              className="w-full"
            >
              {status === "loading" ? "Sending…" : "Send Message"}
            </Button>
            {status === "success" && (
              <p className="text-green-500 text-sm text-center">✅ Message sent! I'll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-sm text-center">❌ Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section></AnimatedSection>
  );
};

export default Contact;
