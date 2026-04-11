"use client";
// src/components/Contact.tsx
import { useState } from "react";
import { Resend } from "resend";
import Button from "./Button";
import AnimatedSection from "./AnimatedSection";
import { addMessage } from "../lib/db";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const { error } = await resend.emails.send({
        from: import.meta.env.VITE_RESEND_FROM,
        to: [import.meta.env.VITE_CONTACT_EMAIL],
        replyTo: email,
        subject: `New message from ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <h2 style="color:#a855f7">New Contact Form Submission</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#6b7280;width:80px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#6b7280">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#a855f7">${email}</a></td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0">
            <p style="color:#6b7280;margin:0 0 8px">Message</p>
            <p style="white-space:pre-wrap;margin:0">${message}</p>
          </div>
        `,
      });
      if (error) {
        setStatus("error");
        return;
      }
      addMessage({ name, email, message }).catch(err => console.error("Failed to save message:", err));
      setStatus("success");
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
            <div className="flex items-start gap-3">
              <input
                id="privacy"
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-purple-500"
              />
              <label htmlFor="privacy" className="text-sm text-gray-600 dark:text-gray-400 leading-snug cursor-pointer">
                I agree to the{" "}
                <a href="/privacy-policy" target="_blank" className="text-purple-400 hover:text-pink-400 underline underline-offset-2 transition-colors duration-200">
                  Privacy Policy
                </a>{" "}
                and consent to the processing of my personal data.
              </label>
            </div>
            <Button
              type="submit"
              gradient="from-purple-500 to-blue-500"
              disabled={status === "loading" || !agreed}
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
