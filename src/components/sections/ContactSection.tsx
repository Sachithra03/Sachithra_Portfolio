import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MapPinIcon, PhoneIcon, MailIcon, GithubIcon, LinkedinIcon } from 'lucide-react';
import { useScroll } from '../../context/ScrollContext';

export const ContactSection = () => {
  const { registerSection } = useScroll();
  const sectionRef = useRef<HTMLElement>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (sectionRef.current) {
      const { offsetTop, offsetHeight } = sectionRef.current;
      registerSection('contact', offsetTop, offsetTop + offsetHeight);
    }
  }, [registerSection]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;        // ✅ capture once (stable reference)
    if (sending) return;                 // ✅ prevent double fires
    setSending(true);

    try {
      const res = await emailjs.sendForm(
        'service_0o4otsc',
        'template_y4glzo9',               // your real template id
        form,
        { publicKey: 'kLqZck-2vG2bSXG9I' }
      );

      // EmailJS returns { status: 200, text: 'OK' } on success
      if (res?.status === 200) {
        alert('✅ Message sent successfully!');
        form.reset();
        return;                           // ✅ stop here—no fallthrough
      }
      throw new Error(`EmailJS responded ${res?.status} ${res?.text}`);
    } catch (err) {
      console.error('EmailJS error:', err);
      alert('❌ Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4 md:px-8 max-w-7xl mx-auto min-h-screen flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-slate-800 dark:text-white">Get In Touch</h2>
      <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
        Have a question or want to work together? Feel free to reach out!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-8 border border-white/20 dark:border-slate-700/20 shadow-lg">
          <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Send Me a Message</h3>

          {/* input names MUST match your EmailJS template: name, email, subject, message */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Name</label>
                <input id="name" name="name" required className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-white" placeholder="Enter your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
                <input id="email" name="email" type="email" required className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-white" placeholder="Enter your email" />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Subject</label>
              <input id="subject" name="subject" className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-white" placeholder="Subject" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 text-slate-800 dark:text-white resize-none" placeholder="Your message..." />
            </div>

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
              Send Message
            </button>
          </form>
        </div>

        {/* Info card (unchanged) */}
        <div className="space-y-8">
          <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-xl p-8 border border-white/20 dark:border-slate-700/20 shadow-lg">
            <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start"><MapPinIcon size={20} className="text-blue-500 dark:text-blue-400 mr-3 mt-1" /><div><h4 className="font-medium text-slate-800 dark:text-white">Location</h4><p className="text-slate-600 dark:text-slate-400">Malabe, Sri Lanka</p></div></div>
              <div className="flex items-start"><MailIcon size={20} className="text-blue-500 dark:text-blue-400 mr-3 mt-1" /><div><h4 className="font-medium text-slate-800 dark:text-white">Email</h4><p className="text-slate-600 dark:text-slate-400">sachithrai1003@gmail.com</p></div></div>
              <div className="flex items-start"><PhoneIcon size={20} className="text-blue-500 dark:text-blue-400 mr-3 mt-1" /><div><h4 className="font-medium text-slate-800 dark:text-white">Phone</h4><p className="text-slate-600 dark:text-slate-400">+94 (76) 3947 735</p></div></div>
            </div>
            <div className="mt-8">
              <h4 className="font-medium text-slate-800 dark:text-white mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/Sachithra03" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/50 dark:bg-slate-700/50 rounded-full border border-slate-300 dark:border-slate-600 transform transition-all duration-300 hover:scale-110 hover:-translate-y-1" aria-label="GitHub Profile">
                  <GithubIcon size={20} className="text-slate-700 dark:text-slate-300" />
                </a>
                <a href="https://www.linkedin.com/in/sachithra-indrachapa-9150b8190/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/50 dark:bg-slate-700/50 rounded-full border border-slate-300 dark:border-slate-600 transform transition-all duration-300 hover:scale-110 hover:-translate-y-1" aria-label="LinkedIn Profile">
                  <LinkedinIcon size={20} className="text-blue-600 dark:text-blue-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 dark:border-slate-700/20 shadow-lg h-64">
            <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <div className="text-center">
                <MapPinIcon size={32} className="text-red-500 mx-auto mb-2" />
                <p className="text-slate-700 dark:text-slate-300 font-medium">Malabe, Sri Lanka</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">6.9147° N, 79.9729° E</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12">
        <div className="mx-auto max-w-md rounded-xl p-4 bg-gradient-to-r from-blue-900 to-indigo-900 dark:from-slate-800 dark:to-blue-800 text-white shadow-lg">
          <p className="text-center text-sm font-medium">© 2025 Sachithra Indrachapa. All rights reserved.</p>
        </div>
      </footer>
    </section>
  );
};