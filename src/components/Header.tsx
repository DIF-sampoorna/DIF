/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Heart } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openDonationModal: () => void;
  logoUrl?: string;
}

export default function Header({ activeTab, setActiveTab, openDonationModal, logoUrl = '/LOGO_lite.png' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Our Work' },
    { id: 'blog', label: 'Blog & News' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'financials', label: 'Financials' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'get-involved', label: 'Get Involved' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full" id="mhe-main-header">
      {/* Dynamic Top Announcement Bar: Donate Now Ribbon */}
      {(activeTab === 'home' || activeTab === 'get-involved') && (
        <div 
          className="fixed bottom-0 left-0 w-full z-50 bg-mhe-yellow text-mhe-charcoal py-2 px-4 text-center text-xs md:text-sm font-extrabold tracking-wide border-t-2 border-mhe-charcoal flex items-center justify-center gap-2 md:gap-3 overflow-hidden shadow-lg"
          id="top-announcement-bar"
        >
          <span className="font-sans leading-none tracking-tight">Empowering communities across India. Support our holistic development initiatives today.</span>
          <button 
            onClick={openDonationModal}
            className="bg-mhe-teal text-white hover:bg-mhe-teal/90 text-xs font-mono px-3 py-1 rounded-md border-2 border-mhe-charcoal font-black tracking-tight shadow-[2px_2px_0px_0px_rgba(28,46,49,1)] transition-transform hover:translate-y-[-1px] active:translate-y-[1px] focus:outline-none flex items-center gap-1.5 cursor-pointer ml-1 animate-pulse"
          >
            <Heart className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
            <span>DONATE NOW</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Row */}
      <div 
        className={`w-full py-0 px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          isScrolled 
            ? 'bg-mhe-cream/95 backdrop-blur shadow-md border-b-2 border-mhe-charcoal' 
            : 'bg-mhe-cream border-b-2 border-mhe-charcoal'
        }`}
      >
        {/* NGO Brand Logo - Styled directly within the navigation container for perfect vertical alignment */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center justify-center cursor-pointer group select-none shrink-0"
          id="ngo-logo-wrapper"
        >
          {/* Only LOGO_lite.png is used across the site, matching container height naturally */}
          <img 
            src={logoUrl} 
            alt="DIF SAMPOORNA Logo" 
            referrerPolicy="no-referrer"
            className="w-[180px] h-auto object-contain transition-all duration-300 scale-100 group-hover:scale-105" 
          />
        </div>


        {/* Actions bar (Donate button removed per focus-mode selection) */}
        <div className="hidden md:flex items-center gap-4">
        </div>

        {/* Unified menu trigger - common for laptop, desktop, tablet, and mobile */}
        <div className="flex items-center gap-3">
          <button 
            onClick={openDonationModal}
            className="bg-mhe-orange text-white p-2 border-2 border-mhe-charcoal rounded-full mhe-badge-shadow md:hidden"
            id="mobile-immediate-donate-btn"
          >
            <Heart className="w-4 h-4 fill-current text-white" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 border-2 border-mhe-charcoal rounded-lg bg-mhe-cream text-mhe-charcoal hover:bg-mhe-mint/30 cursor-pointer"
            id="mobile-hamburger-trigger"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Sliding Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-mhe-charcoal z-40"
              id="mobile-nav-backdrop"
            />

            {/* Sidebar body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-[360px] bg-mhe-cream border-l-4 border-mhe-charcoal shadow-2xl z-50 p-4 md:p-5 flex flex-col justify-between"
              id="mobile-drawer-body"
            >
              <div>
                <div className="flex items-center justify-between pb-3.5 border-b-2 border-mhe-charcoal">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center shrink-0">
                      <img 
                        src={logoUrl} 
                        alt="DIF SAMPOORNA Logo" 
                        referrerPolicy="no-referrer"
                        className="w-32 h-auto object-contain" 
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 rounded-full border-2 border-mhe-charcoal bg-mhe-orange text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile list links */}
                <div className="flex flex-col gap-1.5 mt-4">
                  {navigationItems.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`mhe-nav-option ${
                          isActive ? 'mhe-nav-option-active' : 'mhe-nav-option-inactive'
                        }`}
                        style={{ paddingTop: '0.25rem', paddingBottom: '0.25rem' }}
                      >
                        <span>{item.label}</span>
                        {isActive && <span className="w-2.5 h-2.5 rounded-full bg-mhe-yellow" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile CTA drawer bottom footer */}
              <div className="mt-auto pt-4 border-t-2 border-mhe-charcoal flex flex-col gap-2">
                <button
                  onClick={() => {
                    openDonationModal();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mhe-btn-orange py-2.5 rounded-xl flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-current text-white" />
                  <span>DONATE TO OUR CAUSE</span>
                </button>
                <p className="text-[10px] text-center text-black font-mono">
                  Deepjyoti India Foundation Initiative • Registered NGO
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
