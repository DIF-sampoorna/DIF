/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SubProgram {
  title: string;
  description: string;
  outcomes: string[];
}

export interface ProgramPillar {
  id: string;
  title: string;
  nativeTitle: string;
  tagline: string;
  iconName: string;
  color: string;
  accentColor: string;
  bgColor: string;
  description: string;
  keyInitiatives: string[];
  subPrograms?: SubProgram[];
  impactStats: { label: string; value: string }[];
  headlineStory: {
    title: string;
    body: string;
    location: string;
  };
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  iconName: string;
}

export interface BoardMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  quote?: string;
  region: string;
}

export interface SimulationWeek {
  week: number;
  title: string;
  description: string;
  impactMetrics: { malnutritionLevel: string; weightGain: string };
  actionLabel: string;
  choices: {
    id: string;
    label: string;
    points: number;
    feedback: string;
    type: 'nutrition' | 'hygiene' | 'education' | 'monitoring' | 'shakti';
  }[];
}

export interface DonationTier {
  id: string;
  amount: number;
  title: string;
  description: string;
  outcome: string;
  iconName: string;
  popular?: boolean;
}

export interface DistrictData {
  id: string;
  name: string;
  healthCenterCount: number;
  childrenSupported: number;
  womenEmpoweredCount: number;
  povertyIndex: string;
  activeStatus: 'High' | 'Medium' | 'Planning';
}

export interface GalleryItem {
  url: string;
  title: string;
  category: string;
  domainId: string;
  type: 'photo' | 'video';
  videoUrl?: string;
}

