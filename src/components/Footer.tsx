/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, HeartPulse, GraduationCap, TrendingUp, Leaf, Send, Brain, Briefcase, BookOpen, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openDonationModal: () => void;
  activeTab?: string;
  logoUrl?: string;
}

export default function Footer({ setActiveTab, openDonationModal, activeTab, logoUrl = '/LOGO_lite.png' }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const showDonateBar = activeTab === 'home' || activeTab === 'get-involved';

  return (
    <footer className={`bg-mhe-charcoal text-mhe-cream border-t-4 border-mhe-charcoal pt-10 md:pt-12 px-6 md:px-12 transition-all ${showDonateBar ? 'pb-24 md:pb-28' : 'pb-12 md:pb-16'}`} id="mhe-main-footer">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10" id="footer-grid-container">
        {/* NGO Info Column */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center shrink-0 bg-white p-1 rounded-lg border border-zinc-200 shadow-sm w-12 h-auto">
              <img 
                src={logoUrl} 
                alt="DIF SAMPOORNA Logo" 
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain" 
              />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-xl text-white tracking-tight leading-tight">
                DIF SAMPOORNA
              </h2>
              <p className="text-[10px] text-mhe-mint font-bold tracking-widest uppercase">
                Deepjyoti India Foundation
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed font-sans">
            A registered non-profit organization dedicated to fostering community empowerment, holistic education, academic support, women's vocational livelihoods, and environmental restoration across Northeast India & Mumbai.
          </p>

          <div className="text-xs text-gray-300 font-mono mt-2 space-y-1 bg-white/5 p-3 rounded-xl border border-white/10">
            <p className="text-mhe-orange font-bold text-[10px] uppercase tracking-wider mb-1">Connect With Us</p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://www.facebook.com/share/1RW93rNWZw/" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-mhe-orange hover:text-white transition-all text-gray-300" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/dif_sampoorna?igsh=MW9tY2dkZDdpeGl2eQ==" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-mhe-orange hover:text-white transition-all text-gray-300" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/sampoorna-by-deepjyoti-india-foundation/" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-mhe-orange hover:text-white transition-all text-gray-300" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer" className="p-1.5 rounded bg-white/5 hover:bg-mhe-orange hover:text-white transition-all text-gray-300" title="Twitter / X">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Our Primary Core Pillars Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-lg text-mhe-yellow tracking-tight">
            Our Programmatic Domains
          </h3>
          <ul className="flex flex-col gap-2.5">
            <li>
              <button 
                onClick={() => setActiveTab('programs')} 
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:underline focus:outline-none cursor-pointer"
              >
                <HeartPulse className="w-4 h-4 text-mhe-teal-light" />
                <span>Domain 1: Community Health</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('programs')} 
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:underline focus:outline-none cursor-pointer"
              >
                <Brain className="w-4 h-4 text-mhe-orange" />
                <span>Domain 2: Mental Health &amp; OYF</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('programs')} 
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:underline focus:outline-none cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-mhe-yellow" />
                <span>Domain 3: Youth Development</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('programs')} 
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white hover:underline focus:outline-none cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-mhe-mint" />
                <span>Domain 4: Research &amp; Outreach</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-lg text-white tracking-tight">
            Quick Navigation
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-gray-300">
            <li>
              <button onClick={() => setActiveTab('home')} className="hover:text-white hover:underline cursor-pointer">
                Return to Home
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('about')} className="hover:text-white hover:underline cursor-pointer">
                Our Story &amp; Leadership
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('financials')} className="hover:text-white hover:underline cursor-pointer">
                Audited Financial Report
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('testimonials')} className="hover:text-white hover:underline cursor-pointer">
                Field Testimonials
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('get-involved')} className="hover:text-white hover:underline cursor-pointer">
                Volunteer Network &amp; Join Us
              </button>
            </li>
            <li>
              <button onClick={() => setActiveTab('blog')} className="hover:text-white hover:underline cursor-pointer font-bold text-mhe-yellow">
                Blog &amp; Latest News
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup Column */}
        <div className="flex flex-col gap-4">
          <h3 className="font-display font-bold text-lg text-mhe-orange tracking-tight">
            Stay in the Loop
          </h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Subscribe to our seasonal newsletter detailing our community impact, school support, and literacy drives. No spam, only impact.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Successfully subscribed to the DIF Sampoorna seasonal impact newsletter!');
            }}
            className="flex flex-col sm:flex-row gap-2 mt-2"
          >
            <input 
              type="email" 
              placeholder="Your email address" 
              required
              className="px-4 py-2.5 rounded-lg border-2 border-white bg-transparent text-white text-sm focus:outline-none focus:border-mhe-yellow w-full"
            />
            <button 
              type="submit" 
              className="bg-mhe-teal hover:bg-mhe-teal/80 text-white border-2 border-white px-4 py-2.5 rounded-lg flex items-center justify-center mhe-badge-shadow shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Sub-footer metadata bottom bar */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-6" id="sub-footer-container">
        <div className="text-xs text-gray-400 font-sans text-center md:text-left">
          <p>© {currentYear} DIF SAMPOORNA • Deepjyoti India Foundation (registered under the Societies Registration Act, XXI of 1860).</p>
          <p className="mt-1">Registered Office: Ready Money Terrace (Commercial building), 167, Dr. A. B. Road, Worli Naka, Bhim Nagar, Worli, Mumbai, Maharashtra 400018</p>
        </div>

        <div className="text-xs text-gray-400 font-sans text-center md:text-right flex flex-col items-center md:items-end gap-1 select-none">
          <p>Website designed by <a href="https://www.eqcglobal.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-mhe-cream hover:text-white underline underline-offset-2 transition-colors duration-200">EQC Global</a></p>
          <button 
            id="admin-login-footer-btn"
            onClick={() => setActiveTab('admin-portal')} 
            className="text-[10px] uppercase tracking-wider font-sans text-gray-500 hover:text-mhe-orange transition-colors cursor-pointer focus:outline-none pt-1"
          >
            🔒 Admin Portal
          </button>
        </div>
      </div>
    </footer>
  );
}
