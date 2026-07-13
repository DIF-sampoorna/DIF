import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_ITEMS, PROGRAM_PILLARS } from '../data';
import { GalleryItem } from '../types';
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  ChevronDown, 
  Play, 
  X, 
  Maximize2,
  FolderOpen,
  Filter,
  Volume2
} from 'lucide-react';

interface GalleryViewProps {
  initialSelectedItem: GalleryItem | null;
  onClearSelectedItem: () => void;
  openDonationModal: () => void;
  galleryItems?: GalleryItem[];
  galleryDomains?: { id: string; title: string; nativeTitle?: string; color?: string; bgColor?: string }[];
}

export function GalleryView({ initialSelectedItem, onClearSelectedItem, openDonationModal, galleryItems, galleryDomains }: GalleryViewProps) {
  const itemsList = galleryItems || GALLERY_ITEMS;
  
  // Media filter state: 'all' | 'photo' | 'video'
  const [mediaFilter, setMediaFilter] = useState<'all' | 'photo' | 'video'>('all');

  const defaultDomains: { id: string; title: string; nativeTitle?: string; color?: string; bgColor?: string }[] = [
    { "id": "health", "title": "Community Health & Care (Domain 1)" },
    { "id": "mental_health", "title": "Mental Health & Resilience (Domain 2)" },
    { "id": "youth_development", "title": "Youth Soft Skills & Guidance (Domain 3)" },
    { "id": "research", "title": "Research & Evidence (Domain 4)" }
  ];

  const domainsList = galleryDomains || defaultDomains;
  
  // Track open/collapsed state of each of the domains
  const [openDomains, setOpenDomains] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    domainsList.forEach(d => {
      initial[d.id] = true;
    });
    return initial;
  });

  // Track the active item for the modal lightbox player
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  // When an item is clicked in another page (passed as initialSelectedItem)
  useEffect(() => {
    if (initialSelectedItem) {
      setSelectedItem(initialSelectedItem);
      // Ensure the domain of this item is expanded
      setOpenDomains((prev) => ({
        ...prev,
        [initialSelectedItem.domainId]: true,
      }));
      onClearSelectedItem();
    }
  }, [initialSelectedItem, onClearSelectedItem]);

  // Update openDomains state if domainsList changes
  useEffect(() => {
    const nextStates: Record<string, boolean> = {};
    domainsList.forEach(d => {
      nextStates[d.id] = openDomains[d.id] !== undefined ? openDomains[d.id] : true;
    });
    setOpenDomains(nextStates);
  }, [galleryDomains]);

  // Toggle domain accordion
  const toggleDomain = (domainId: string) => {
    setOpenDomains((prev) => ({
      ...prev,
      [domainId]: !prev[domainId],
    }));
  };

  // Expand / collapse all helper
  const setAllDomainsState = (isOpen: boolean) => {
    const nextStates: Record<string, boolean> = {};
    domainsList.forEach(d => {
      nextStates[d.id] = isOpen;
    });
    setOpenDomains(nextStates);
  };

  return (
    <div className="flex flex-col gap-8 pb-16" id="gallery-page-container">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-[10px] font-mono font-bold text-mhe-orange tracking-widest uppercase">
          DIF Multimedia Records
        </span>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl text-mhe-charcoal tracking-tight mt-1 leading-tight uppercase">
          Field Operations Gallery
        </h1>
        <p className="text-sm md:text-base text-black mt-2 font-sans">
          Actual photos and media briefings documenting the field actions of Project Sampoorna, OYF, and research cohorts across our 4 domains.
        </p>
      </div>

      {/* Main Filter Toolbar */}
      <div 
        className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border-2 border-mhe-charcoal p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,46,49,1)]"
        id="gallery-filter-toolbar"
      >
        {/* Buttons for types */}
        <div className="flex bg-mhe-cream p-1 rounded-xl border border-mhe-charcoal w-full sm:w-auto">
          <button
            onClick={() => setMediaFilter('all')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-display font-extrabold uppercase transition-all cursor-pointer ${
              mediaFilter === 'all'
                ? 'bg-mhe-teal text-white border-2 border-mhe-charcoal shadow-[2px_2px_0px_0px_rgba(28,46,49,1)]'
                : 'text-mhe-charcoal hover:bg-mhe-teal-light'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>All media</span>
          </button>
          
          <button
            onClick={() => setMediaFilter('photo')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-display font-extrabold uppercase transition-all cursor-pointer ${
              mediaFilter === 'photo'
                ? 'bg-mhe-teal text-white border-2 border-mhe-charcoal shadow-[2px_2px_0px_0px_rgba(28,46,49,1)]'
                : 'text-mhe-charcoal hover:bg-mhe-teal-light'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Photos</span>
          </button>

          <button
            onClick={() => setMediaFilter('video')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-display font-extrabold uppercase transition-all cursor-pointer ${
              mediaFilter === 'video'
                ? 'bg-mhe-teal text-white border-2 border-mhe-charcoal shadow-[2px_2px_0px_0px_rgba(28,46,49,1)]'
                : 'text-mhe-charcoal hover:bg-mhe-teal-light'
            }`}
          >
            <VideoIcon className="w-3.5 h-3.5" />
            <span>Videos</span>
          </button>
        </div>

        {/* Global accordion control */}
        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setAllDomainsState(true)}
            className="text-[10px] font-mono font-extrabold text-mhe-teal hover:underline cursor-pointer"
          >
            [ EXPAND ALL SECTIONS ]
          </button>
          <span className="text-[10px] font-mono font-semibold text-gray-300">|</span>
          <button
            onClick={() => setAllDomainsState(false)}
            className="text-[10px] font-mono font-extrabold text-mhe-orange hover:underline cursor-pointer"
          >
            [ COLLAPSE ALL ]
          </button>
        </div>
      </div>

      {/* Collapsible Domains */}
      <div className="flex flex-col gap-6" id="gallery-domains-list">
        {domainsList.map((pillar) => {
          // Find if there is a predefined styling in PROGRAM_PILLARS for color matching
          const basePillar = PROGRAM_PILLARS.find(p => p.id === pillar.id);
          const color = pillar.color || basePillar?.color || 'bg-mhe-orange';
          const bgColor = pillar.bgColor || basePillar?.bgColor || 'bg-[#FCF7E6]';
          const nativeTitle = pillar.nativeTitle || basePillar?.nativeTitle || `${pillar.title.toUpperCase()} MULTIMEDIA DATABASE`;

          // Filter items belonging to this pillar and matching selected type filter
          const matchingItems = itemsList.filter((item) => {
            const matchesDomain = item.domainId === pillar.id;
            const matchesType = mediaFilter === 'all' || item.type === mediaFilter;
            return matchesDomain && matchesType;
          });

          const isExpanded = openDomains[pillar.id];

          return (
            <div 
              key={pillar.id}
              className={`border-4 border-mhe-charcoal rounded-3xl overflow-hidden transition-all duration-300 shadow-[5px_5px_0px_0px_rgba(28,46,49,1)] ${
                isExpanded ? bgColor : 'bg-white'
              }`}
              id={`gallery-accordion-${pillar.id}`}
            >
              {/* Accordion Trigger Header */}
              <button
                onClick={() => toggleDomain(pillar.id)}
                className="w-full px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-left border-b-2 border-mhe-charcoal bg-white select-none cursor-pointer focus:outline-none hover:bg-mhe-cream"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${color} border-2 border-mhe-charcoal flex items-center justify-center text-white mhe-badge-shadow shrink-0`}>
                    <FolderOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-extrabold uppercase text-gray-400">
                      {nativeTitle}
                    </span>
                    <h2 className="font-display font-black text-sm md:text-base text-mhe-charcoal uppercase leading-tight">
                      {pillar.title.split('(')[0].trim()}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-auto">
                  <span className="bg-mhe-cream border border-mhe-charcoal px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black text-mhe-charcoal shadow-sm">
                    {matchingItems.length} {matchingItems.length === 1 ? 'FILE' : 'FILES'}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-mhe-charcoal transform transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`} 
                  />
                </div>
              </button>

              {/* Accordion Content Grid */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="p-6">
                      {matchingItems.length === 0 ? (
                        <div className="bg-white border-2 border-dashed border-mhe-charcoal/40 rounded-2xl py-8 px-4 text-center">
                          <span className="text-xl">📁</span>
                          <p className="text-xs md:text-sm text-black font-mono font-semibold mt-2">
                            No {mediaFilter}s found under this domain. Toggle filter to see items.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                          {matchingItems.map((item, idx) => {
                            const isVideo = item.type === 'video';

                            return (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.04 }}
                                onClick={() => setSelectedItem(item)}
                                className="group bg-white border-2 border-mhe-charcoal rounded-2xl overflow-hidden shadow-sm flex flex-col cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(28,46,49,1)] transition-all duration-300 hover:translate-y-[-2px]"
                              >
                                {/* Media Container */}
                                <div className="relative aspect-video overflow-hidden bg-mhe-charcoal">
                                  <img 
                                    src={item.url} 
                                    alt={item.title} 
                                    referrerPolicy="no-referrer"
                                    className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                                  />
                                  
                                  {/* Badges Overlay */}
                                  <span className="absolute top-2 left-2 bg-white border border-mhe-charcoal text-[8px] font-mono font-black px-2 py-0.5 rounded-full uppercase shadow">
                                    {item.category}
                                  </span>

                                  {/* Media Type Icon indicator (top-right) */}
                                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-mhe-charcoal flex items-center justify-center shadow-sm">
                                    {isVideo ? (
                                      <VideoIcon className="w-3.5 h-3.5 text-mhe-orange" />
                                    ) : (
                                      <ImageIcon className="w-3.5 h-3.5 text-mhe-teal" />
                                    )}
                                  </div>

                                  {/* Play/Zoom interactive overlays */}
                                  <div className="absolute inset-0 bg-mhe-charcoal/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    {isVideo ? (
                                      <div className="w-12 h-12 rounded-full bg-mhe-orange border-2 border-mhe-charcoal text-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(28,46,49,1)] transform scale-90 group-hover:scale-100 transition-transform">
                                        <Play className="w-6 h-6 fill-current text-white transform translate-x-0.5" />
                                      </div>
                                    ) : (
                                      <div className="w-10 h-10 rounded-full bg-mhe-teal border-2 border-mhe-charcoal text-white flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(28,46,49,1)] transform scale-90 group-hover:scale-100 transition-transform">
                                        <Maximize2 className="w-4 h-4 text-white" />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Caption Text block */}
                                <div className="p-3 border-t border-mhe-charcoal flex-grow bg-white flex flex-col justify-between">
                                  <h4 className="font-display font-extrabold text-[11px] leading-tight text-mhe-charcoal line-clamp-2">
                                    {item.title}
                                  </h4>
                                  <div className="mt-2 pt-2 border-t border-dashed border-gray-100 flex items-center justify-between">
                                    <span className="text-[8px] font-mono font-bold text-gray-400 uppercase">
                                      {item.type} media
                                    </span>
                                    <span className="text-[8px] font-mono font-bold text-mhe-teal hover:underline">
                                      {isVideo ? 'Play clip ❯' : 'View full ❯'}
                                    </span>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Media Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-mhe-charcoal/90 backdrop-blur-sm"
            />

            {/* Playback Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl bg-mhe-cream border-4 border-mhe-charcoal rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(28,46,49,1)] z-10"
              id="gallery-modal-player"
            >
              {/* Modal header row */}
              <div className="flex justify-between items-center bg-white px-5 py-3 border-b-2 border-mhe-charcoal">
                <div className="flex items-center gap-2">
                  <span className="bg-mhe-yellow text-mhe-charcoal text-[9px] font-mono font-black border border-mhe-charcoal px-2 py-0.5 rounded-full uppercase">
                    {selectedItem.category}
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="text-[10px] font-mono font-bold text-black uppercase">
                    {selectedItem.type === 'video' ? '📽️ Field Recording' : '📸 Operations Photo'}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full border border-mhe-charcoal bg-mhe-cream flex items-center justify-center hover:bg-mhe-orange hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Media Body */}
              <div className="bg-black aspect-video relative flex items-center justify-center">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Action caption bottom footer */}
              <div className="p-5 md:p-6 bg-white border-t-2 border-mhe-charcoal flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-grow">
                  <h3 className="font-display font-extrabold text-base md:text-lg text-mhe-charcoal leading-snug">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-mono font-bold uppercase mt-1">
                    📍 DEEPJYOTI INDIA FOUNDATION RECORDED COMMUNITY CAMPS
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    openDonationModal();
                  }}
                  className="mhe-btn-orange px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span>SUPPORT FIELD ACTIONS</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
