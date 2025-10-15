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
    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <p className="text-primary text-lg font-semibold tracking-wider uppercase mb-4">
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6">
            <span className="text-white">LET'S WORK</span>{" "}
            <span className="gradient-text">TOGETHER</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Have a project in mind? Let's create something amazing together
          </p>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Form */}
        <div className="card-dark fade-in-up">
          <h3 className="text-2xl font-bold mb-6 text-white">Send Me a Message</h3>

          {/* input names MUST match your EmailJS template: name, email, subject, message */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  id="name" 
                  name="name" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-dark-200/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500 transition-all" 
                  placeholder="Enter your name" 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full px-4 py-3 rounded-lg bg-dark-200/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500 transition-all" 
                  placeholder="Enter your email" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
              <input 
                id="subject" 
                name="subject" 
                className="w-full px-4 py-3 rounded-lg bg-dark-200/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500 transition-all" 
                placeholder="Subject" 
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={5} 
                required 
                className="w-full px-4 py-3 rounded-lg bg-dark-200/50 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-500 resize-none transition-all" 
                placeholder="Your message..." 
              />
            </div>

            <button 
              type="submit" 
              disabled={sending}
              className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Info card */}
        <div className="space-y-8 fade-in-up delay-200">
          <div className="card-dark">
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Location</h4>
                  <p className="text-gray-400">Malabe, Sri Lanka</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MailIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <a href="mailto:sachithrai1003@gmail.com" className="text-gray-400 hover:text-primary transition-colors">
                    sachithrai1003@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone</h4>
                  <a href="tel:+94763947735" className="text-gray-400 hover:text-primary transition-colors">
                    +94 (76) 3947 735
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h4 className="font-semibold text-white mb-4">Connect With Me</h4>
              <div className="flex gap-4">
                <a 
                  href="https://github.com/Sachithra03" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-100 border border-gray-700 hover:border-primary hover:bg-primary/10 transition-all duration-300" 
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5 text-gray-400 hover:text-primary" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/sachithra-indrachapa-9150b8190/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-dark-100 border border-gray-700 hover:border-primary hover:bg-primary/10 transition-all duration-300" 
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5 text-gray-400 hover:text-primary" />
                </a>
              </div>
            </div>
          </div>

          <div className="card-dark">
            <div className="flex items-center justify-center h-64 rounded-lg bg-dark-200/50 border border-gray-700">
              <div className="text-center">
                <MapPinIcon size={48} className="text-primary mx-auto mb-4" />
                <p className="text-white font-semibold text-lg">Malabe, Sri Lanka</p>
                <p className="text-gray-400 text-sm mt-2">6.9147° N, 79.9729° E</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-gray-800 fade-in-up delay-400">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 <span className="text-primary font-semibold">Sachithra Indrachapa</span>. All rights reserved.
          </p>
        </div>
      </footer>
      </div>
    </section>
  );
};