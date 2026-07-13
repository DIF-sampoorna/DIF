import React, { useState } from 'react';
import { BoardMember } from '../types';
import { RotateCw, MapPin } from 'lucide-react';

interface TeamMemberCardProps {
  member: BoardMember;
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-[380px] perspective-1000 cursor-pointer group"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full duration-700 preserve-3d transition-all ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* FRONT SIDE (IMAGE & HERO OVERLAY) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 shadow-md">
          {/* Avatar Image filling card */}
          <img 
            src={member.avatar} 
            alt={member.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Bottom Gradient overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 pt-20 flex flex-col justify-end">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#FDE047] font-semibold mb-1">
              {member.role.split(',')[0]}
            </span>
            <h4 className="font-display font-extrabold text-lg text-white leading-tight">
              {member.name}
            </h4>
            <div className="flex items-center gap-1 mt-1 text-[11px] font-mono text-slate-300">
              <MapPin size={10} className="text-[#FDE047]" />
              <span>{member.region}</span>
            </div>
            
            {/* Flip hint */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white p-2 rounded-full border border-slate-600/50 hover:bg-black/95 transition-colors shadow-lg">
              <RotateCw size={14} className="animate-spin-slow text-[#FDE047]" />
            </div>
          </div>
        </div>

        {/* BACK SIDE (DETAILS & BIO) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 border-mhe-orange bg-slate-910 p-6 flex flex-col justify-between shadow-xl text-left bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="flex flex-col gap-3">
            {/* Minimal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3">
              <div>
                <h4 className="font-display font-extrabold text-base text-white">
                  {member.name}
                </h4>
                <span className="text-xs text-mhe-orange font-mono font-bold block mt-0.5">
                  {member.role}
                </span>
                <span className="text-[10px] font-mono text-slate-400 block mt-0.5 flex items-center gap-1">
                  <MapPin size={8} /> {member.region}
                </span>
              </div>
              <div className="p-1.5 bg-slate-800/80 rounded-lg text-slate-400">
                <RotateCw size={12} />
              </div>
            </div>

            {/* Bio */}
            <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-6">
              {member.bio}
            </p>

            {/* Quote (if exists) */}
            {member.quote && (
              <div className="relative pl-3 border-l-2 border-[#FDE047]/60 my-2">
                <p className="text-[11px] italic text-[#FDE047] leading-relaxed">
                  "{member.quote}"
                </p>
              </div>
            )}
          </div>

          {/* Prompt at bottom */}
          <div className="text-center pt-2 border-t border-slate-850">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Click showing details • Click to see photo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
