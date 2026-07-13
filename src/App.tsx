/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ArrowRight, 
  Users, 
  ChevronRight, 
  Sparkles, 
  HeartPulse, 
  GraduationCap, 
  TrendingUp, 
  Leaf, 
  Award, 
  Calendar, 
  BookOpen, 
  Clock, 
  Briefcase, 
  Check, 
  Inbox, 
  ChevronDown,
  Brain,
  ShieldCheck,
  TrendingDown,
  FileText,
  Activity,
  User,
  Mail,
  Phone,
  MapPin,
  Upload,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
  Image as ImageIcon,
  Play,
  Pause,
  SkipForward
} from 'lucide-react';

import { Trash2, Lock, LogOut, RefreshCw, Plus, Edit3, Camera } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import FileUploader from './components/FileUploader';
import { AnimatedCounter } from './components/AnimatedCounter';
import { GalleryView } from './components/GalleryView';
import { TeamMemberCard } from './components/TeamMemberCard';
import { GalleryItem, BoardMember } from './types';
import { 
  PROGRAM_PILLARS, 
  GENERAL_STATS, 
  BOARD_MEMBERS, 
  DONATION_TIERS,
  TESTIMONIALS,
  CERTIFICATIONS,
  PARTNERS,
  FINANCIAL_OVERVIEW,
  GALLERY_ITEMS
} from './data';

const LOCATION_DETAILS: Record<string, {
  name: string;
  state: string;
  type: string;
  badgeColor: string;
  tagline: string;
  initiatives: string[];
}> = {
  assam: {
    name: 'Guwahati & Jorhat Cluster',
    state: 'Assam',
    type: 'Primary Intervention Base',
    badgeColor: 'bg-mhe-teal text-white border-mhe-teal',
    tagline: 'Empowering communities through recurring medical camps, student metrics, and women\'s care cycles.',
    initiatives: [
      '16 Monthly health checkup clinics in rural pockets.',
      'Longitudinal cohort tracking: 100 women registered health cards.',
      'OYF 3-Month Workshops at Cotton University and Handique Girls\' College.',
      'Core diagnostic testing: Hb increments tracking, BMI, and glucose.'
    ]
  },
  meghalaya: {
    name: 'Shillong Outreach',
    state: 'Meghalaya',
    type: 'Youth & Livelihood Center',
    badgeColor: 'bg-mhe-yellow text-mhe-charcoal border-mhe-yellow',
    tagline: 'Fostering academic orientation, self-reflection guidance, and inclusive winter festive support.',
    initiatives: [
      'Academic path counselling & anxiety reduction for Classes 9 & 10.',
      'Youth entrepreneurship workshops at Ferrando Shelter Home.',
      'Joy of Giving winter distributions of warm garments and nutrition.'
    ]
  },
  maharashtra: {
    name: 'Mumbai Naka Base',
    state: 'Maharashtra',
    type: 'HQ & Pediatric Joy Hub',
    badgeColor: 'bg-purple-600 text-white border-purple-600',
    tagline: 'Administrative oversight and therapeutic clowning sessions across municipal geriatric centers.',
    initiatives: [
      'Compassionate therapeutic hospital clowning in elderly/pediatric wards.',
      'Corporate wellness campaigns and central donor matching.',
      'Registered headquarters governance and operational audits.'
    ]
  },
  haryana: {
    name: 'Faridabad Expansion',
    state: 'Haryana',
    type: 'Strategic 2026 Expansion',
    badgeColor: 'bg-mhe-orange text-white border-mhe-orange',
    tagline: 'Formulating replicable primary healthcare models and matching corporate CSR goals.',
    initiatives: [
      'Deploying Project Sampoorna clinical framework templates.',
      'Building local municipal and primary school guidance collaborations.',
      'Launching local point-of-care baseline diagnostics starting Q3 2026.'
    ]
  },
  karela: {
    name: 'Kerala Outreach',
    state: 'Kerala',
    type: 'Coming Soon',
    badgeColor: 'bg-mhe-orange text-white border-mhe-orange animate-pulse',
    tagline: 'Planning to scale health camps and emotional literacy initiatives down south.',
    initiatives: [
      'Establishing partnership networks for Project Sampoorna.',
      'Scouting local community centers and regional healthcare needs.',
      'Adapting emotional wellness modules for local regional languages.'
    ]
  }
};

const HERO_VIDEOS = [
  '/Video.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
];

const CHAR_DATA: Record<string, { title: string; subtitle: string; description: string; emoji: string; color: string; outcomes?: string[] }> = {
  'center': {
    title: 'The Logo - Tree',
    subtitle: 'Brand & Vision Core',
    description: 'Driving holistic development through research, innovation, collaboration, and community-centered programs that create sustainable social impact.',
    emoji: '🌳',
    color: 'text-mhe-teal bg-mhe-teal-light border-mhe-teal'
  },
  'inner-top': {
    title: 'Women’s 6-Month Care',
    subtitle: 'Longitudinal Study at Bonda',
    description: 'Began March 6, 2026 (Women’s Day). Tracks 100 cohort women on monthly health cards monitoring vitals, Hb levels, BMI, and clinical signatures.',
    emoji: '📈',
    color: 'text-violet-600 bg-violet-50 border-violet-300'
  },
  'inner-bottom': {
    title: 'Operations',
    subtitle: 'National Expansion',
    description: 'Coordinating programs, administration, and partnerships across Assam and Maharashtra, while leading our expansion into Haryana to extend DIF\'s impact nationwide.',
    emoji: '📋',
    color: 'text-blue-600 bg-blue-50 border-blue-300'
  },
  'middle-left': {
    title: 'Team',
    subtitle: 'Multidisciplinary Team',
    description: 'A multidisciplinary team of psychologists, facilitators, researchers, program coordinators, and volunteers working together to design, deliver, and continuously improve OYF through evidence-based, participant-centered approaches .',
    emoji: '🧠',
    color: 'text-sky-600 bg-sky-50 border-sky-300'
  },
  'middle-right': {
    title: 'Logistics',
    subtitle: 'Operational Planning',
    description: 'Ensuring seamless planning, resource management, transportation, procurement, and on-ground coordination to support every initiative efficiently.',
    emoji: '🚚',
    color: 'text-pink-600 bg-pink-50 border-pink-300'
  },
  'outer-top-left': {
    title: 'Colleges',
    subtitle: 'Educational Collaborations',
    description: 'Collaborating with educational institutions to integrate emotional well-being, resilience, and life skills into the student experience through interactive workshops, advanced cohorts, and campus initiatives.',
    emoji: '👩‍🎓',
    color: 'text-amber-600 bg-amber-50 border-amber-300'
  },
  'outer-top-right': {
    title: 'Youth Guidance',
    subtitle: 'Career & Personal Growth',
    description: 'A career exploration and personal development programme that helps students discover their strengths, interests, and aspirations while making informed academic and career decisions. Through aptitude exploration, self-reflection, and mentorship, students gain greater clarity, confidence, and direction for their educational and professional journeys.',
    emoji: '🎓',
    color: 'text-red-600 bg-red-50 border-red-300',
    outcomes: [
      'Career awareness and informed decision-making',
      'Greater self-understanding and confidence',
      'Goal setting and future planning skills',
      'Improved academic and career readiness'
    ]
  },
  'outer-bottom-left': {
    title: 'Therapeutic Clowning Unit',
    subtitle: 'Elderly Care & Hospital Drives',
    description: 'Therapeutic laughter clinics, medical clowning, and creative drama workshops bringing relief to geriatric clinics, old age homes, and children units.',
    emoji: '🤡',
    color: 'text-rose-600 bg-rose-50 border-rose-300'
  },
  'outer-bottom-right': {
    title: 'Women Cohorts',
    subtitle: 'Preventive Health',
    description: 'A six-month community health initiative, providing regular health screenings, awareness sessions, referrals, and follow-up support to improve preventive healthcare and overall well-being.',
    emoji: '🩺',
    color: 'text-emerald-600 bg-emerald-50 border-emerald-300'
  }
};

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  imageColor: string;
  emoji: string;
  likes: number;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Expanding Care: DIF Initiates Mental Health & Cognitive-Emotional Resilience Toolkits in Faridabad",
    excerpt: "Deepjyoti India Foundation has successfully extended its field operations into Faridabad, Haryana, launching interactive mental wellness workshops for school cohorts and underserved communities.",
    content: [
      "FARIDABAD, HARYANA — In our continuous mission to bring emotional literacy and psychological safety directly to grassroots communities, Deepjyoti India Foundation (DIF) is proud to announce the launch of its secondary intervention base in Faridabad, Haryana.",
      "Building on the robust foundation established by our teams in Guwahati and Mumbai, this expansion represents a significant milestone in our regional outreach. The new Faridabad cluster will initially focus on children and youth cohorts, deploying our proprietary Cognitive-Emotional Resilience Toolkits. These toolkits are designed to equip adolescents with practical emotional regulation tools, anxiety management methods, and collaborative healing exercises.",
      "The program was kicked off at two state schools in Faridabad with interactive group circles led by certified emotional counsellors. Over 250 students participated in these initial circles, learning to articulate emotional baselines and construct personal coping guides. Initial feedback has been overwhelmingly positive, with teachers reporting noticeable improvements in classroom attentiveness and cooperative problem-solving.",
      "We extend our sincere gratitude to our regional volunteers, donors, and school administrators who made this deployment possible. If you are located in the Delhi-NCR area and wish to join this initiative as an emotional literacy facilitator, please reach out to us through our Volunteer Network."
    ],
    category: "Field Operations",
    author: "Research & Outreach Team",
    authorRole: "Guwahati Desk Lead",
    date: "June 24, 2026",
    readTime: "4 min read",
    imageColor: "bg-mhe-teal-light",
    emoji: "⛺",
    likes: 42
  },
  {
    id: 2,
    title: "Owning Your Feelings (OYF): Empathetic Listening Networks Across Guwahati & Mumbai Naka",
    excerpt: "An inside look at our flagship mental health initiative. Learn how OYF's empathetic listening networks are creating safe spaces for youth to articulate emotional boundaries and manage anxiety.",
    content: [
      "GUWAHATI / MUMBAI — The rapid pace of modern life, academic pressure, and changing societal structures have created an unprecedented surge in youth anxiety and emotional distress. At Deepjyoti India Foundation, we believe that emotional well-being is not a luxury, but the very foundation of healthy communities.",
      "Through our flagship program, 'Owning Your Feelings' (OYF), we have spent the past year building empathetic listening networks inside college campuses and municipal centers. By training volunteer peers, teachers, and student champions, we are breaking down the historical stigmas surrounding mental health care.",
      "This month, we successfully completed a series of intensive workshops at Cotton University and Handique Girls' College in Guwahati. These interactive circles focused on emotional boundaries, active listening, and constructive conflict resolution. Our workbook exercises encouraged participants to journal their trigger responses and identify peer holding spaces where they can speak without judgment.",
      "Simultaneously, at our Mumbai Naka Base, we have paired clinical guidance with community-driven circles. The outcome of this dual-approach has been remarkable. We have seen a 40% reduction in self-reported anxiety scales among regular cohort participants, proving that structural empathy can heal communities in ways that traditional isolated approaches cannot."
    ],
    category: "Mental Health",
    author: "Dr. Arundhati Barua",
    authorRole: "Consulting Clinical Lead",
    date: "May 18, 2026",
    readTime: "5 min read",
    imageColor: "bg-[#FCF7E6]",
    emoji: "🧠",
    likes: 68
  },
  {
    id: 3,
    title: "Nurturing Civic Resilience: Audited Financials & Transparency as a Foundation",
    excerpt: "Transparency isn't just about spreadsheets; it is a civic duty. DIF celebrates its registration with NITI Aayog's Darpan Portal and outlines its commitment to direct program routing.",
    content: [
      "NEW DELHI / MUMBAI — In the non-profit sector, trust is the currency that fuels change. At Deepjyoti India Foundation, we hold ourselves to the highest standards of financial integrity and civic governance. We believe that every single rupee pledged by our partners and individual donors must be tracked, audited, and spent directly on program deliverables.",
      "This quarter, we are pleased to present our fully compiled Audited Financial Statements, confirming that 100% of individual and corporate CSR donations are routed directly to on-field health clinics, school supplies, and emotional literacy toolkits. Our central administrative overheads continue to be funded independently by our Board of Trustees.",
      "Furthermore, our official registration with NITI Aayog's NGO-Darpan Portal has been successfully updated, solidifying our standing as a fully compliant, collaborative partner for government agencies and corporate CSR departments.",
      "We invite all our stakeholders, partners, and community members to review our detailed financials under the 'Financials' tab. By maintaining radical transparency, we demonstrate that a lean, values-driven NGO can achieve scalable community impact with perfect alignment between donor intent and on-the-ground outcomes."
    ],
    category: "Governance",
    author: "Board of Trustees",
    authorRole: "DIF Finance Desk",
    date: "April 30, 2026",
    readTime: "3 min read",
    imageColor: "bg-[#EBF7F4]",
    emoji: "📋",
    likes: 31
  },
  {
    id: 4,
    title: "The Power of Therapeutic Joy: Pediatric Clown Drives in Mumbai Municipal Wards",
    excerpt: "Laughter as medicine: how our trained therapeutic clowns bring pediatric emotional support and relief to municipal clinics and geriatric centers.",
    content: [
      "MUMBAI, MAHARASHTRA — Clinical environments can often feel sterile, intimidating, and emotionally draining, especially for children undergoing intensive treatments. To combat this emotional strain, DIF's Mumbai Naka Base has pioneered a dedicated Therapeutic Hospital Clowning program.",
      "Our team of trained clowns—equipped with soft skills, emotional intelligence training, and a deep understanding of medical environments—visits municipal pediatric wards and geriatric care centers twice a week. Through gentle humor, magic tricks, custom stories, and creative drama, they help transform these spaces into rooms of active, restorative joy.",
      "The results go far beyond simple smiles. Medical staff have consistently noted that patients' stress markers decrease, and their cooperative behavior during complex procedures increases when our therapeutic clowns are present. For elderly residents, these interactions provide deep cognitive stimulation, nostalgic reflection, and a vital feeling of being heard and valued.",
      "Laughter is a core component of the healing process. By introducing structured therapeutic joy into municipal hospital wings, we are addressing the mental well-being of patients alongside their physical treatments, bringing holistic health to where it is needed most."
    ],
    category: "Community",
    author: "Rohan Shirke",
    authorRole: "Pediatric Joy Coordinator",
    date: "March 12, 2026",
    readTime: "4 min read",
    imageColor: "bg-mhe-orange-light",
    emoji: "🎈",
    likes: 54
  },
  {
    id: 5,
    title: "The Silent Resilience of Hills: Academic Counseling in the Shelters of Shillong",
    excerpt: "DIF is expanding support networks to adolescents in Shillong's Ferrando Shelter Home, delivering positive youth orientation and career counseling.",
    content: [
      "SHILLONG, MEGHALAYA — In the quiet hills of Meghalaya, young students face distinct academic and social obstacles. Academic anxiety, lack of structured career resources, and economic factors often limit the goals of bright youth.",
      "Deepjyoti India Foundation has partnered with local educators and the Ferrando Shelter Home in Shillong to launch a series of intensive academic path workshops and youth orientation circles. Rather than focusing purely on grade scores, our curriculum emphasizes self-reflection, personal strengths, and emotional coping mechanisms for exam-related anxiety.",
      "Our facilitators worked directly with girls in Classes 9 and 10 to establish collaborative study circles, peer encouragement logs, and personalized career roadmaps. By connecting these adolescents with positive professional mentors and training them in confidence-building exercises, we are sparking a durable cycle of ambition and community action.",
      "As we enter the next school term, we are planning to scale this model to three more remote schools in East Khasi Hills. The silent resilience of these children is an inspiration, and we are committed to providing the structural holding spaces they deserve."
    ],
    category: "Community",
    author: "Banri Kharkongor",
    authorRole: "Shillong Program Lead",
    date: "February 27, 2026",
    readTime: "6 min read",
    imageColor: "bg-mhe-teal-light",
    emoji: "🏔️",
    likes: 49
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [donationModalOpen, setDonationModalOpen] = useState<boolean>(false);
  const [activeStoryPillarId, setActiveStoryPillarId] = useState<string | null>(null);
  const [hoveredChar, setHoveredChar] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string>('assam');

  // Blog states
  const [blogCategory, setBlogCategory] = useState<string>('All');
  const [blogSearchQuery, setBlogSearchQuery] = useState<string>('');
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [likedBlogPosts, setLikedBlogPosts] = useState<number[]>([]);

  // Notifications instead of window.alert
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);
  const [donationPledgedText, setDonationPledgedText] = useState<string | null>(null);

  // Hero Video Control States
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState<boolean>(true);
  const [currentHeroVideoIndex, setCurrentHeroVideoIndex] = useState<number>(0);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // CMS dynamic states
  const [cmsData, setCmsData] = useState<{
    HERO_VIDEOS: string[];
    BLOG_POSTS: BlogPost[];
    GALLERY_ITEMS: GalleryItem[];
    TESTIMONIALS: any[];
    LOGO_URL?: string;
    BOARD_MEMBERS?: BoardMember[];
    GALLERY_CATEGORIES?: string[];
    GALLERY_DOMAINS?: { id: string; title: string; nativeTitle?: string; color?: string; bgColor?: string }[];
  } | null>(null);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('dif_admin_logged_in') === 'true';
  });
  const [adminEmail, setAdminEmail] = useState<string>('');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [adminLoginError, setAdminLoginError] = useState<string>('');
  const [adminIsLoading, setAdminIsLoading] = useState<boolean>(false);
  const [cmsSyncStatus, setCmsSyncStatus] = useState<string>(''); // 'idle', 'syncing', 'success', 'error'

  // Sub-tabs for CMS Dashboard
  const [cmsSubTab, setCmsSubTab] = useState<'gallery' | 'blog' | 'testimonials' | 'videos' | 'photos'>('gallery');

  // Gallery Item editing states
  const [editingGalIndex, setEditingGalIndex] = useState<number | null>(null);
  const [editGalTitle, setEditGalTitle] = useState('');
  const [editGalUrl, setEditGalUrl] = useState('');
  const [editGalCategory, setEditGalCategory] = useState('');
  const [editGalDomain, setEditGalDomain] = useState('');
  const [editGalType, setEditGalType] = useState<'photo' | 'video'>('photo');
  const [editGalVideoUrl, setEditGalVideoUrl] = useState('');

  // Program Photo Lightbox State
  const [selectedProgramPhoto, setSelectedProgramPhoto] = useState<any | null>(null);
  const [isEditingProgramPhoto, setIsEditingProgramPhoto] = useState(false);
  const [lightboxEditTitle, setLightboxEditTitle] = useState('');
  const [lightboxEditUrl, setLightboxEditUrl] = useState('');
  const [lightboxEditCategory, setLightboxEditCategory] = useState('');
  const [lightboxEditDomain, setLightboxEditDomain] = useState('');

  // Testimonial editing states
  const [editingTestiId, setEditingTestiId] = useState<string | null>(null);
  const [editTestiText, setEditTestiText] = useState('');
  const [editTestiAuthor, setEditTestiAuthor] = useState('');
  const [editTestiLocation, setEditTestiLocation] = useState('');
  const [editTestiImageUrl, setEditTestiImageUrl] = useState('');

  // Gallery custom category and domain creation states
  const [newCustomCategory, setNewCustomCategory] = useState('');
  const [newCustomDomainId, setNewCustomDomainId] = useState('');
  const [newCustomDomainTitle, setNewCustomDomainTitle] = useState('');

  // Form states for adding items in CMS
  // 1. Gallery
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalCategory, setNewGalCategory] = useState('Preventive Care');
  const [newGalDomain, setNewGalDomain] = useState('health');
  const [newGalType, setNewGalType] = useState<'photo' | 'video'>('photo');
  const [newGalUrl, setNewGalUrl] = useState('');
  const [newGalVideoUrl, setNewGalVideoUrl] = useState('');

  // 2. Blog
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogCategory, setNewBlogCategory] = useState('Field Operations');
  const [newBlogAuthor, setNewBlogAuthor] = useState('DIF Admin Team');
  const [newBlogAuthorRole, setNewBlogAuthorRole] = useState('Field Officer');
  const [newBlogEmoji, setNewBlogEmoji] = useState('📝');
  const [newBlogColor, setNewBlogColor] = useState('bg-mhe-teal-light');

  // 3. Testimonials
  const [newTestiText, setNewTestiText] = useState('');
  const [newTestiAuthor, setNewTestiAuthor] = useState('');
  const [newTestiLocation, setNewTestiLocation] = useState('');
  const [newTestiImageUrl, setNewTestiImageUrl] = useState('');

  // 4. Video (TV)
  const [newVideoUrl, setNewVideoUrl] = useState('');

  // Fetch CMS data on mount
  useEffect(() => {
    fetch('/api/cms')
      .then(res => res.json())
      .then(data => {
        if (data) {
          setCmsData(data);
        }
      })
      .catch(err => console.error("Error fetching CMS data:", err));
  }, []);

  const currentHeroVideos = cmsData?.HERO_VIDEOS || HERO_VIDEOS;
  const currentBlogPosts = cmsData?.BLOG_POSTS || BLOG_POSTS;
  const currentGalleryItems = cmsData?.GALLERY_ITEMS || GALLERY_ITEMS;
  const currentTestimonials = cmsData?.TESTIMONIALS || TESTIMONIALS;
  const currentBoardMembers = cmsData?.BOARD_MEMBERS || BOARD_MEMBERS;
  const currentLogoUrl = cmsData?.LOGO_URL || '/LOGO_lite.png';

  const currentGalleryCategories = cmsData?.GALLERY_CATEGORIES || [
    "Preventive Care",
    "Menstrual Health",
    "Anemia Screening",
    "Diagnostic Vitals",
    "OYF Workshop",
    "Medical Clowning",
    "Livelihoods Training",
    "School Outreach",
    "Field Report"
  ];

  const currentGalleryDomains = (cmsData?.GALLERY_DOMAINS || [
    { "id": "health", "title": "Community Health & Care (Domain 1)", "coverImage": "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600" },
    { "id": "mental_health", "title": "Mental Health & Resilience (Domain 2)", "coverImage": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600" },
    { "id": "youth_development", "title": "Youth Soft Skills & Guidance (Domain 3)", "coverImage": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600" },
    { "id": "research", "title": "Research & Evidence (Domain 4)", "coverImage": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600" }
  ]) as { id: string; title: string; coverImage?: string }[];

  // Function to sync CMS data
  const syncCmsData = async (updatedData: any) => {
    if (!updatedData) return;
    setCmsSyncStatus('syncing');
    try {
      const res = await fetch('/api/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminEmail: 'contact@dif-sampoorna.ngo',
          data: updatedData
        })
      });
      const resJson = await res.json();
      if (resJson.success) {
        setCmsSyncStatus('success');
        setTimeout(() => setCmsSyncStatus(''), 3000);
      } else {
        setCmsSyncStatus('error');
      }
    } catch (err) {
      console.error(err);
      setCmsSyncStatus('error');
    }
  };

  const handleUpdateLogo = (newUrl: string) => {
    const baseCms = cmsData || {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials,
    };
    const updated = {
      ...baseCms,
      LOGO_URL: newUrl,
      BOARD_MEMBERS: currentBoardMembers
    };
    setCmsData(updated);
    syncCmsData(updated);
  };

  const handleUpdateBoardMemberAvatar = (index: number, newAvatarUrl: string) => {
    const baseCms = cmsData || {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials,
    };
    const updatedMembers = [...currentBoardMembers];
    updatedMembers[index] = {
      ...updatedMembers[index],
      avatar: newAvatarUrl
    };
    const updated = {
      ...baseCms,
      LOGO_URL: currentLogoUrl,
      BOARD_MEMBERS: updatedMembers
    };
    setCmsData(updated);
    syncCmsData(updated);
  };

  const handleUpdateDomainCoverImage = (domainId: string, newCoverUrl: string) => {
    const baseCms = cmsData || {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials,
    };
    const updatedDomains = currentGalleryDomains.map(d => {
      if (d.id === domainId) {
        return { ...d, coverImage: newCoverUrl };
      }
      return d;
    });
    const updated = {
      ...baseCms,
      LOGO_URL: currentLogoUrl,
      BOARD_MEMBERS: currentBoardMembers,
      GALLERY_DOMAINS: updatedDomains
    };
    setCmsData(updated);
    syncCmsData(updated);
  };

  const handleAdminLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    setAdminIsLoading(true);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword })
      });
      const data = await res.json();
      if (data.success) {
        setIsAdminLoggedIn(true);
        localStorage.setItem('dif_admin_logged_in', 'true');
      } else {
        setAdminLoginError(data.message || 'Access Denied');
      }
    } catch (err) {
      setAdminLoginError('Server error, please try again.');
    } finally {
      setAdminIsLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('dif_admin_logged_in');
  };

  const handleAddGalleryItem = (e: FormEvent) => {
    e.preventDefault();
    if (!newGalTitle || !newGalUrl) {
      alert("Please fill in Title and URL");
      return;
    }
    const newItem: GalleryItem = {
      title: newGalTitle,
      category: newGalCategory,
      domainId: newGalDomain,
      type: newGalType,
      url: newGalUrl,
      videoUrl: newGalType === 'video' ? newGalVideoUrl : undefined
    };
    const updatedGallery = [newItem, ...currentGalleryItems];
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: updatedGallery,
      TESTIMONIALS: currentTestimonials,
      BOARD_MEMBERS: currentBoardMembers,
      LOGO_URL: currentLogoUrl,
      GALLERY_CATEGORIES: currentGalleryCategories,
      GALLERY_DOMAINS: currentGalleryDomains
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
    
    // Reset fields
    setNewGalTitle('');
    setNewGalUrl('');
    setNewGalVideoUrl('');
  };

  const handleDeleteGalleryItem = (indexToDelete: number) => {
    const updatedGallery = currentGalleryItems.filter((_, idx) => idx !== indexToDelete);
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: updatedGallery,
      TESTIMONIALS: currentTestimonials,
      BOARD_MEMBERS: currentBoardMembers,
      LOGO_URL: currentLogoUrl,
      GALLERY_CATEGORIES: currentGalleryCategories,
      GALLERY_DOMAINS: currentGalleryDomains
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
  };

  const handleStartEditGalleryItem = (index: number) => {
    const item = currentGalleryItems[index];
    setEditingGalIndex(index);
    setEditGalTitle(item.title);
    setEditGalUrl(item.url);
    setEditGalCategory(item.category);
    setEditGalDomain(item.domainId);
    setEditGalType(item.type);
    setEditGalVideoUrl(item.videoUrl || '');
  };

  const handleSaveEditGalleryItem = (e: FormEvent) => {
    e.preventDefault();
    if (editingGalIndex === null) return;
    if (!editGalTitle || !editGalUrl) {
      alert("Please fill in Title and URL");
      return;
    }
    const updatedGallery = [...currentGalleryItems];
    updatedGallery[editingGalIndex] = {
      title: editGalTitle,
      url: editGalUrl,
      category: editGalCategory,
      domainId: editGalDomain,
      type: editGalType,
      videoUrl: editGalType === 'video' ? editGalVideoUrl : undefined
    };
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: updatedGallery,
      TESTIMONIALS: currentTestimonials,
      BOARD_MEMBERS: currentBoardMembers,
      LOGO_URL: currentLogoUrl,
      GALLERY_CATEGORIES: currentGalleryCategories,
      GALLERY_DOMAINS: currentGalleryDomains
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
    setEditingGalIndex(null);
  };

  const handleOpenProgramPhoto = (photo: any) => {
    setSelectedProgramPhoto(photo);
    setIsEditingProgramPhoto(false);
    setLightboxEditTitle(photo.title);
    setLightboxEditUrl(photo.url);
    setLightboxEditCategory(photo.category || '');
    setLightboxEditDomain(photo.domainId || '');
  };

  const handleSaveLightboxPhoto = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedProgramPhoto) return;
    if (!lightboxEditTitle || !lightboxEditUrl) {
      alert("Please fill in Title and URL");
      return;
    }
    
    const idx = currentGalleryItems.findIndex(
      (item) => item.url === selectedProgramPhoto.url && item.title === selectedProgramPhoto.title
    );
    if (idx === -1) return;

    const updatedGallery = [...currentGalleryItems];
    const originalItem = updatedGallery[idx];
    
    updatedGallery[idx] = {
      ...originalItem,
      title: lightboxEditTitle,
      url: lightboxEditUrl,
      category: lightboxEditCategory,
      domainId: lightboxEditDomain,
    };

    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: updatedGallery,
      TESTIMONIALS: currentTestimonials,
      BOARD_MEMBERS: currentBoardMembers,
      LOGO_URL: currentLogoUrl,
      GALLERY_CATEGORIES: currentGalleryCategories,
      GALLERY_DOMAINS: currentGalleryDomains
    };
    
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
    
    setSelectedProgramPhoto(updatedGallery[idx]);
    setIsEditingProgramPhoto(false);
  };

  const handleDeleteLightboxPhoto = () => {
    if (!selectedProgramPhoto) return;
    if (!confirm("Are you sure you want to delete this photo from the gallery?")) return;
    
    const idx = currentGalleryItems.findIndex(
      (item) => item.url === selectedProgramPhoto.url && item.title === selectedProgramPhoto.title
    );
    if (idx === -1) return;

    const updatedGallery = currentGalleryItems.filter((_, i) => i !== idx);

    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: updatedGallery,
      TESTIMONIALS: currentTestimonials,
      BOARD_MEMBERS: currentBoardMembers,
      LOGO_URL: currentLogoUrl,
      GALLERY_CATEGORIES: currentGalleryCategories,
      GALLERY_DOMAINS: currentGalleryDomains
    };
    
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
    
    setSelectedProgramPhoto(null);
    setIsEditingProgramPhoto(false);
  };

  const handleAddCategory = (cat: string) => {
    const cleanCat = cat.trim();
    if (!cleanCat) return;
    if (currentGalleryCategories.includes(cleanCat)) {
      alert("Category already exists");
      return;
    }
    const updatedCategories = [...currentGalleryCategories, cleanCat];
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials,
      BOARD_MEMBERS: currentBoardMembers,
      LOGO_URL: currentLogoUrl,
      GALLERY_CATEGORIES: updatedCategories,
      GALLERY_DOMAINS: currentGalleryDomains
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
    setNewCustomCategory('');
  };

  const handleDeleteCategory = (catToDelete: string) => {
    const updatedCategories = currentGalleryCategories.filter(c => c !== catToDelete);
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials,
      BOARD_MEMBERS: currentBoardMembers,
      LOGO_URL: currentLogoUrl,
      GALLERY_CATEGORIES: updatedCategories,
      GALLERY_DOMAINS: currentGalleryDomains
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
  };

  const handleAddDomain = (id: string, title: string) => {
    const cleanId = id.trim().toLowerCase().replace(/\s+/g, '_');
    const cleanTitle = title.trim();
    if (!cleanId || !cleanTitle) {
      alert("Please fill in both Domain ID and Title");
      return;
    }
    if (currentGalleryDomains.some(d => d.id === cleanId)) {
      alert("Domain ID already exists");
      return;
    }
    const updatedDomains = [
      ...currentGalleryDomains,
      { id: cleanId, title: cleanTitle }
    ];
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials,
      BOARD_MEMBERS: currentBoardMembers,
      LOGO_URL: currentLogoUrl,
      GALLERY_CATEGORIES: currentGalleryCategories,
      GALLERY_DOMAINS: updatedDomains
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
    setNewCustomDomainId('');
    setNewCustomDomainTitle('');
  };

  const handleDeleteDomain = (domainIdToDelete: string) => {
    const updatedDomains = currentGalleryDomains.filter(d => d.id !== domainIdToDelete);
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials,
      BOARD_MEMBERS: currentBoardMembers,
      LOGO_URL: currentLogoUrl,
      GALLERY_CATEGORIES: currentGalleryCategories,
      GALLERY_DOMAINS: updatedDomains
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
  };

  const handleAddBlogPost = (e: FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogExcerpt || !newBlogContent) {
      alert("Please fill in all core fields");
      return;
    }
    const paragraphs = newBlogContent.split('\n').map(p => p.trim()).filter(p => p.length > 0);
    const dateObj = new Date();
    const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const nextId = currentBlogPosts.length > 0 ? Math.max(...currentBlogPosts.map(p => p.id)) + 1 : 1;
    
    const newPost: BlogPost = {
      id: nextId,
      title: newBlogTitle,
      excerpt: newBlogExcerpt,
      content: paragraphs,
      category: newBlogCategory,
      author: newBlogAuthor || "DIF Admin Team",
      authorRole: newBlogAuthorRole || "Field Officer",
      date: formattedDate,
      readTime: `${Math.ceil(paragraphs.join(' ').split(' ').length / 150) || 2} Min Read`,
      imageColor: newBlogColor,
      emoji: newBlogEmoji || "📝",
      likes: 0
    };

    const updatedBlog = [newPost, ...currentBlogPosts];
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: updatedBlog,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);

    // Reset fields
    setNewBlogTitle('');
    setNewBlogExcerpt('');
    setNewBlogContent('');
    setNewBlogEmoji('📝');
  };

  const handleDeleteBlogPost = (idToDelete: number) => {
    const updatedBlog = currentBlogPosts.filter(post => post.id !== idToDelete);
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: updatedBlog,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
  };

  const handleAddTestimonial = (e: FormEvent) => {
    e.preventDefault();
    if (!newTestiText || !newTestiAuthor || !newTestiLocation) {
      alert("Please fill in all fields");
      return;
    }
    const nextId = currentTestimonials.length > 0 ? Math.max(...currentTestimonials.map(t => parseInt(t.id) || 0)) + 1 : 1;
    const newTesti = {
      id: nextId.toString(),
      text: newTestiText,
      author: newTestiAuthor,
      location: newTestiLocation,
      imageUrl: newTestiImageUrl || undefined
    };
    const updatedTestimonials = [newTesti, ...currentTestimonials];
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: updatedTestimonials
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);

    // Reset fields
    setNewTestiText('');
    setNewTestiAuthor('');
    setNewTestiLocation('');
    setNewTestiImageUrl('');
  };

  const handleDeleteTestimonial = (idToDelete: string) => {
    const updatedTestimonials = currentTestimonials.filter(t => t.id !== idToDelete);
    const updatedCms = {
      HERO_VIDEOS: currentHeroVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: updatedTestimonials
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
  };

  const handleStartEditTestimonial = (id: string) => {
    const item = currentTestimonials.find(t => t.id === id);
    if (!item) return;
    setEditingTestiId(id);
    setEditTestiText(item.text);
    setEditTestiAuthor(item.author);
    setEditTestiLocation(item.location || '');
    setEditTestiImageUrl(item.imageUrl || '');
  };

  const handleSaveEditTestimonial = (e: FormEvent) => {
    e.preventDefault();
    if (!editingTestiId) return;

    const updatedTestimonials = currentTestimonials.map(t => {
      if (t.id === editingTestiId) {
        return {
          ...t,
          text: editTestiText,
          author: editTestiAuthor,
          location: editTestiLocation,
          imageUrl: editTestiImageUrl
        };
      }
      return t;
    });

    const updatedCms = {
      ...cmsData,
      TESTIMONIALS: updatedTestimonials
    };

    setCmsData(updatedCms);
    syncCmsData(updatedCms);
    setEditingTestiId(null);
  };

  const handleAddHeroVideo = (e: FormEvent) => {
    e.preventDefault();
    if (!newVideoUrl) return;
    const updatedVideos = [...currentHeroVideos, newVideoUrl];
    const updatedCms = {
      HERO_VIDEOS: updatedVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);

    // Reset fields
    setNewVideoUrl('');
  };

  const handleDeleteHeroVideo = (indexToDelete: number) => {
    if (currentHeroVideos.length <= 1) {
      alert("At least one video must remain in the CRT TV playlist.");
      return;
    }
    const updatedVideos = currentHeroVideos.filter((_, idx) => idx !== indexToDelete);
    if (currentHeroVideoIndex >= updatedVideos.length) {
      setCurrentHeroVideoIndex(0);
    }
    const updatedCms = {
      HERO_VIDEOS: updatedVideos,
      BLOG_POSTS: currentBlogPosts,
      GALLERY_ITEMS: currentGalleryItems,
      TESTIMONIALS: currentTestimonials
    };
    setCmsData(updatedCms);
    syncCmsData(updatedCms);
  };

  const togglePlayPause = () => {
    setIsHeroVideoPlaying((prev) => !prev);
  };

  const playNextVideo = () => {
    setCurrentHeroVideoIndex((prevIndex) => (prevIndex + 1) % currentHeroVideos.length);
    setIsHeroVideoPlaying(true);
  };

  // 1. Handle source loading ONLY when currentHeroVideoIndex changes to prevent reloading on play/pause
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    // Hard guarantee muted settings to satisfy browser autoplay requirements
    video.muted = true;
    video.defaultMuted = true;

    video.src = currentHeroVideos[currentHeroVideoIndex];
    video.load();

    if (isHeroVideoPlaying) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay programmatic play prevented on source load:", err);
        });
      }
    }
  }, [currentHeroVideoIndex]);

  // 2. Handle play/pause commands ONLY, preserving playhead position
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    video.muted = true;
    if (isHeroVideoPlaying) {
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Play toggle prevented:", err);
          });
        }
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
    }
  }, [isHeroVideoPlaying]);

  // Volunteer form state
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [volunteerCountry, setVolunteerCountry] = useState('India');
  const [volunteerAddress, setVolunteerAddress] = useState('');
  const [volunteerCity, setVolunteerCity] = useState('');
  const [volunteerZip, setVolunteerZip] = useState('');
  const [volunteerInterests, setVolunteerInterests] = useState<string[]>([]);
  const [volunteerSkillsExperience, setVolunteerSkillsExperience] = useState('');
  const [volunteerAvailability, setVolunteerAvailability] = useState('Weekdays');
  const [volunteerAdditional, setVolunteerAdditional] = useState('');
  const [submittingVolunteer, setSubmittingVolunteer] = useState(false);
  const [volunteerMatchResult, setVolunteerMatchResult] = useState<string | null>(null);

  // Sub-tabs for Get Involved page
  const [getInvolvedSubTab, setGetInvolvedSubTab] = useState<'volunteer' | 'careers' | 'inquiry'>('volunteer');

  // Careers form state
  const [careerName, setCareerName] = useState('');
  const [careerEmail, setCareerEmail] = useState('');
  const [careerPhone, setCareerPhone] = useState('');
  const [careerCountry, setCareerCountry] = useState('India');
  const [careerAddress, setCareerAddress] = useState('');
  const [careerCity, setCareerCity] = useState('');
  const [careerZip, setCareerZip] = useState('');
  const [careerSubject, setCareerSubject] = useState('Job Application');
  const [careerRoleText, setCareerRoleText] = useState('');
  const [careerFileName, setCareerFileName] = useState<string | null>(null);
  const [careerLinkedIn, setCareerLinkedIn] = useState('');
  const [careerAvailability, setCareerAvailability] = useState('Full time');
  const [careerAdditional, setCareerAdditional] = useState('');
  const [careerSubmitted, setCareerSubmitted] = useState(false);
  const [careerIsSubmitting, setCareerIsSubmitting] = useState(false);

  const handleCareerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!careerName || !careerEmail || !careerPhone) return;
    setCareerIsSubmitting(true);
    try {
      await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'Career Application',
          name: careerName,
          email: careerEmail,
          phone: careerPhone,
          details: careerRoleText || `Applied for topic: ${careerSubject}`,
          extra: {
            country: careerCountry,
            address: careerAddress,
            city: careerCity,
            zip: careerZip,
            subject: careerSubject,
            linkedin: careerLinkedIn,
            availability: careerAvailability,
            fileName: careerFileName,
            additional: careerAdditional
          }
        })
      });
    } catch (err) {
      console.error("Error submitting career form:", err);
    } finally {
      setCareerIsSubmitting(false);
      setCareerSubmitted(true);
    }
  };

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactIsSubmitting, setContactIsSubmitting] = useState(false);

  const handleInterestToggle = (interest: string) => {
    setVolunteerInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const handleVolunteerSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!volunteerName || !volunteerEmail || !volunteerPhone || !volunteerAddress || !volunteerCity) return;

    setSubmittingVolunteer(true);
    
    // Match based on selected Interests
    let primaryInterest = volunteerInterests[0] || 'Community Volunteer';
    let role = `${primaryInterest} General Facilitator`;
    if (volunteerInterests.includes('Health camps')) {
      role = 'Preventive Health Camp Assistant Coordinator (Domain 1)';
    } else if (volunteerInterests.includes('Mental health workshops')) {
      role = 'OYF Emotional Literacy Peer Co-Facilitator (Domain 2)';
    } else if (volunteerInterests.includes('Teaching')) {
      role = 'Youth Career Guidance & Educational Mentor (Domain 3)';
    } else if (volunteerInterests.includes('Fundraising')) {
      role = 'CSR Partnership and Donation Ambassador';
    } else if (volunteerInterests.includes('Social media')) {
      role = 'Creative Media Campaigns & PR Intern';
    } else if (volunteerInterests.includes('Photography')) {
      role = 'Field Documentation Specialist & Photographer';
    }

    try {
      await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'Volunteer Enrollment',
          name: volunteerName,
          email: volunteerEmail,
          phone: volunteerPhone,
          details: `Skills/Experience: ${volunteerSkillsExperience}. Additional notes: ${volunteerAdditional}`,
          extra: {
            address: volunteerAddress,
            city: volunteerCity,
            zip: volunteerZip,
            interests: volunteerInterests,
            availability: volunteerAvailability,
            roleDetected: role
          }
        })
      });
    } catch (err) {
      console.error("Error submitting volunteer form:", err);
    } finally {
      setSubmittingVolunteer(false);
      setVolunteerMatchResult(role);
    }
  };

  const handleContactSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setContactIsSubmitting(true);
    try {
      await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'General Inquiry',
          name: contactName,
          email: contactEmail,
          phone: '',
          details: contactMessage
        })
      });
    } catch (err) {
      console.error("Error submitting general contact form:", err);
    } finally {
      setContactIsSubmitting(false);
      setContactSubmitted(true);
    }
  };

  const openDonationModal = () => {
    setDonationPledgedText(null);
    setDonationModalOpen(true);
  };

  // Switch tabs and scroll to top smoothly
  const handleNavChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Switch to careers section with robust scrolling poller fallback
  const navigateToCareers = () => {
    setActiveTab('get-involved');
    setGetInvolvedSubTab('careers');
    const attemptScroll = (retries = 0) => {
      const element = document.getElementById('careers-form-container');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (retries < 15) {
        setTimeout(() => attemptScroll(retries + 1), 50);
      }
    };
    setTimeout(() => attemptScroll(), 80);
  };

  return (
    <div className="min-h-screen bg-mhe-cream flex flex-col font-sans text-mhe-charcoal">
      {/* Top navigation Header bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={handleNavChange} 
        openDonationModal={openDonationModal} 
        logoUrl={currentLogoUrl}
      />

      {/* Main Container */}
      <main className="flex-grow pt-4">
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-16 pb-20"
              id="home-view-port"
            >
              {/* Dynamic HERO SECTION with bold display text of MHE style */}
              <section 
                className="max-w-7xl mx-auto px-6 md:px-12 pt-4 md:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative"
                id="hero-section"
              >
                {/* Visual decoration circles behind */}
                <div className="absolute top-0 -left-10 w-72 h-72 rounded-full bg-mhe-teal/20 -z-20 blur-3xl animate-pulse" />
                <div className="absolute right-10 top-0 w-80 h-80 rounded-full bg-mhe-orange/20 -z-20 blur-3xl" />
                <div className="absolute left-1/3 bottom-10 w-64 h-64 rounded-full bg-mhe-yellow/25 -z-20 blur-3xl animate-pulse" />
                <div className="absolute right-12 bottom-6 w-[350px] h-[350px] rounded-full bg-mhe-mint/30 -z-20 blur-3xl" />

                <div className="lg:col-span-7 flex flex-col gap-4 text-left">


                  <h1 className="font-display font-extrabold text-3xl md:text-4xl lg:text-5xl text-mhe-charcoal leading-[1.05] tracking-tight">
                    Every moment of care <br />
                    <span className="bg-mhe-yellow text-mhe-charcoal px-2.5 py-0.5 rounded-md border-2 border-mhe-charcoal inline-block transform rotate-[-1.5deg] mt-1 shadow-[3px_3px_0px_0px_rgba(28,46,49,1)]">
                      mends a quiet struggle.
                    </span> <br />
                    Your support matters.
                  </h1>

                  <p className="text-sm md:text-base text-mhe-charcoal/80 leading-relaxed font-medium font-sans">
                    Deepjyoti India Foundation (DIF) was founded on a simple but profound belief: wellbeing is a fundamental human right, not a privilege. Since 2015, we have been building resilient communities by bridging two critical gaps—preventive healthcare and emotional literacy. Through our flagship initiatives, Project Sampoorna and Owning Your Feelings (OYF), we deliver holistic care to women, youth, and the elderly across Guwahati, Shillong, and Mumbai. By educating and empowering underserved populations before crises emerge, we are creating sustainable change that supports the mind, body, and spirit.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-1">
                    <button 
                      onClick={() => handleNavChange('programs')}
                      className="mhe-btn-teal px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <span>EXPLORE OUR 4 DOMAINS</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={openDonationModal}
                      className="mhe-btn-orange px-6 py-2.5 rounded-xl flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span>SUPPORT THE WORK</span>
                    </button>
                  </div>
                </div>

                {/* Right Hero block: Retro CRT Television Display */}
                <div className="lg:col-span-5 flex flex-col items-center gap-3 relative mt-16 lg:mt-12 pt-12 lg:pt-16" id="hero-interactive-card">
                  {/* Outer Relative Container for the TV */}
                  <div className="relative w-full h-72 md:h-[19rem] flex flex-col items-center">
                    
                    {/* Deep-Set Antenna Structure (Absolute) */}
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-16 pointer-events-none z-10">
                      {/* Left antenna */}
                      <div className="absolute bottom-0 left-1/4 w-1 h-20 bg-zinc-500 origin-bottom -rotate-[30deg] rounded-full">
                        <div className="w-3 h-3 bg-zinc-900 rounded-full absolute -top-1.5 -left-[4px] shadow-sm" />
                      </div>
                      {/* Right antenna */}
                      <div className="absolute bottom-0 right-1/4 w-1 h-24 bg-zinc-500 origin-bottom rotate-[35deg] rounded-full">
                        <div className="w-3 h-3 bg-zinc-900 rounded-full absolute -top-1.5 -left-[4px] shadow-sm" />
                      </div>
                      {/* Center mount base */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-zinc-900 rounded-t-full border-t border-zinc-700 shadow-md" />
                    </div>

                    {/* Retro Wooden Cabinet/TV Body (Flex Container) */}
                    <div 
                      className="relative w-full h-full p-3 rounded-[2rem] overflow-hidden group flex gap-3"
                      style={{
                        backgroundColor: '#553311',
                        border: '8px solid #3a200a',
                        boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5), inset 0 2px 25px rgba(255,255,255,0.08)',
                        backgroundImage: 'repeating-linear-gradient(180deg, rgba(45, 26, 10, 0.3) 0px, rgba(45, 26, 10, 0.3) 2px, transparent 2px, transparent 18px), repeating-linear-gradient(90deg, rgba(62, 35, 14, 0.5) 0px, rgba(62, 35, 14, 0.5) 4px, transparent 4px, transparent 24px), linear-gradient(to bottom, rgba(255, 250, 240, 0.05) 0%, rgba(0, 0, 0, 0.4) 100%)'
                      }}
                    >
                      {/* Left Panel (CRT Screen Area) */}
                      <div 
                        onClick={togglePlayPause}
                        title={isHeroVideoPlaying ? "Click Screen to Pause" : "Click Screen to Play"}
                        className="relative flex-[2.8] h-full bg-zinc-900 rounded-[1.2rem] overflow-hidden border-[5px] border-zinc-700 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] cursor-pointer group/screen"
                      >
                        {/* Real-life DIF community empowerment & healthcare camp video with nature/social fallback */}
                        <video 
                          ref={heroVideoRef}
                          src={currentHeroVideos[currentHeroVideoIndex]}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                          autoPlay 
                          muted 
                          loop 
                          playsInline 
                          preload="auto"
                        />

                        {/* Hover feedback play/pause overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/screen:opacity-100 transition-opacity bg-black/30 pointer-events-none z-20">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-lg transform scale-90 group-hover/screen:scale-100 transition-all duration-300">
                            {isHeroVideoPlaying ? (
                              <Pause className="w-6 h-6 text-white" />
                            ) : (
                              <Play className="w-6 h-6 text-white ml-1" />
                            )}
                          </div>
                        </div>

                        {/* Custom Glass Glare overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

                        {/* Scanline CRT effect */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] z-10 bg-[length:100%_4px]" />

                        {/* Screen Edge Vignette */}
                        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.6)] pointer-events-none" />
                      </div>

                      {/* Right Panel (Mechanical Control console) */}
                      <div className="flex-[1.2] h-full bg-zinc-100 rounded-[1.2rem] border-[3px] border-zinc-700 flex flex-col items-center py-6 gap-6 shadow-inner relative overflow-hidden min-w-[110px]">
                        {/* Subtle top lighting */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />

                        {/* Dual Tuning Knobs (Vertical alignment with Vintage Labels) */}
                        <div className="flex flex-col gap-6 mt-2 w-full px-2">
                          {/* Knob 1 - Play / Pause Container */}
                          <div className="flex flex-col items-center gap-1.5 font-mono text-zinc-600 font-bold uppercase w-full">
                            <span className="text-[9px] text-zinc-500 tracking-widest text-center select-none pointer-events-none font-black leading-none">PLAY/PAUSE</span>
                            <div 
                              onClick={togglePlayPause}
                              title={isHeroVideoPlaying ? "Pause Video" : "Play Video"}
                              className="w-10 h-10 rounded-full bg-zinc-900 border-[3px] border-zinc-700 shadow-lg flex items-center justify-center relative cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0 group/knob1"
                              style={{
                                transform: isHeroVideoPlaying ? 'rotate(0deg)' : 'rotate(90deg)'
                              }}
                            >
                              {/* Knob 1 indicator line */}
                              <div className="w-0.5 h-3.5 bg-zinc-400 rounded-full" />
                              {/* Play/Pause icon display on hover inside the knob */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/knob1:opacity-100 bg-zinc-900/85 rounded-full transition-opacity duration-200">
                                {isHeroVideoPlaying ? (
                                  <Pause className="w-3.5 h-3.5 text-white" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 text-white ml-0.5" />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Knob 2 - Next Video Container */}
                          <div className="flex flex-col items-center gap-1.5 font-mono text-zinc-600 font-bold uppercase w-full">
                            <span className="text-[9px] text-zinc-500 tracking-widest text-center select-none pointer-events-none font-black leading-none">NEXT</span>
                            <div 
                              onClick={playNextVideo}
                              title="Next Video"
                              className="w-10 h-10 rounded-full bg-zinc-900 border-[3px] border-zinc-700 shadow-lg flex items-center justify-center relative cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 flex-shrink-0 group/knob2"
                              style={{
                                transform: `rotate(${currentHeroVideoIndex * 90}deg)`
                              }}
                            >
                              {/* Knob 2 indicator line */}
                              <div className="w-3.5 h-0.5 bg-zinc-400 rounded-full" />
                              {/* Next/Chevron icon display on hover inside the knob */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/knob2:opacity-100 bg-zinc-900/85 rounded-full transition-opacity duration-200">
                                <SkipForward className="w-3.5 h-3.5 text-white" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Retro Speaker Grille */}
                        <div className="w-12 flex flex-col gap-1.5 mt-auto mb-4">
                          <div className="w-full h-1 bg-zinc-700/40 rounded-full" />
                          <div className="w-full h-1 bg-zinc-700/40 rounded-full" />
                          <div className="w-full h-1 bg-zinc-700/40 rounded-full" />
                          <div className="w-full h-1 bg-zinc-700/40 rounded-full" />
                          <div className="w-full h-1 bg-zinc-700/40 rounded-full" />
                          <div className="w-full h-1 bg-zinc-700/40 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Chunky Support Feet (Bottom Center) */}
                    <div className="flex gap-20 -mt-2 relative z-10 w-full justify-center px-10">
                      <div className="w-10 h-4 bg-zinc-900 rounded-b-xl shadow-xl border-x border-b border-zinc-950" />
                      <div className="w-10 h-4 bg-zinc-900 rounded-b-xl shadow-xl border-x border-b border-zinc-950" />
                    </div>
                  </div>

                  {/* Floating visual detail badge */}
                  <div className="absolute bottom-[-15px] left-[-15px] bg-mhe-yellow border-2 border-mhe-charcoal px-4 py-2.5 rounded-2xl shadow-[4px_4px_0px_0px_rgba(28,46,49,1)] font-display font-bold text-xs transform rotate-[-4deg] flex items-center gap-2 z-20">
                    <Award className="w-5 h-5 text-mhe-charcoal shrink-0" />
                    <span>Lives touched</span>
                  </div>
                </div>
              </section>

              {/* STATS SECTION: Annual Report Numbers (Page 7) */}
              <section className="bg-mhe-orange border-y-4 border-mhe-charcoal py-12 px-6 md:px-12 text-white shadow-md relative mt-16 md:mt-24 lg:mt-32" id="stats-section">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-2 divide-white/20 justify-around gap-6 text-center">
                  {GENERAL_STATS.map((stat) => (
                    <div key={stat.id} className="py-4 md:py-0 px-4 flex flex-col gap-1 items-center">
                      <span className="text-4xl lg:text-5xl font-mono font-extrabold text-white tracking-tight">
                        <AnimatedCounter value={stat.value} />{stat.suffix}
                      </span>
                      <span className="font-display font-medium text-sm text-white uppercase tracking-wider mt-1">
                        {stat.label}
                      </span>
                      <p className="text-xs text-white max-w-[200px] leading-snug mt-1">
                        {stat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CORE FOCUS PILLARS GRID */}
              <section className="max-w-7xl mx-auto px-6 md:px-12" id="pillars-summary-section">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-mhe-orange uppercase">
                    Integrated Development Suite
                  </span>
                  <h2 className="font-display font-extrabold text-3xl md:text-4xl text-mhe-charcoal tracking-tight mt-1">
                    Four Pillars of Holistic Action
                  </h2>
                  <p className="text-sm text-black mt-2">
                    Wellbeing is a fundamental human right, not a privilege. DIF coordinates essential healthcare and mental agency to protect underserved populations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PROGRAM_PILLARS.map((p, index) => {
                    // Map each domain key to an exquisite, premium colored panel with smooth hover highlights
                    const getPillarBgClass = (id: string) => {
                      switch (id) {
                        case 'health': return 'bg-mhe-teal-light hover:bg-[#D5E6E4]';
                        case 'mental_health': return 'bg-mhe-orange-light hover:bg-[#FDDED2]';
                        case 'youth_development': return 'bg-[#FCF7E6] hover:bg-[#FAEBB3]';
                        case 'research': return 'bg-[#EBF7F4] hover:bg-[#CEF0E8]';
                        default: return 'bg-white';
                      }
                    };
                    const bgClass = getPillarBgClass(p.id);
                    const associatedDomain = currentGalleryDomains.find(d => d.id === p.id);

                    return (
                      <div 
                        key={p.id}
                        onClick={() => handleNavChange('programs')}
                        className={`${bgClass} border-4 border-mhe-charcoal p-6 rounded-3xl mhe-card-shadow cursor-pointer relative group flex flex-col justify-between transition-colors duration-300`}
                        id={`pillar-card-${p.id}`}
                      >
                        <div>
                          {associatedDomain?.coverImage && (
                            <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border-2 border-mhe-charcoal mb-4 bg-mhe-cream relative">
                              <img 
                                src={associatedDomain.coverImage} 
                                alt={p.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}

                          <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-full ${p.color} border-2 border-mhe-charcoal flex items-center justify-center text-white mhe-badge-shadow shrink-0 transition-transform group-hover:scale-110`}>
                              {p.id === 'health' && <HeartPulse className="w-4 h-4 text-white" />}
                              {p.id === 'mental_health' && <Brain className="w-4 h-4 text-white" />}
                              {p.id === 'youth_development' && <Briefcase className="w-4 h-4 text-white" />}
                              {p.id === 'research' && <BookOpen className="w-4 h-4 text-white" />}
                            </div>
                            <div>
                              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-gray-400 block leading-none">
                                {p.nativeTitle}
                              </span>
                            </div>
                          </div>

                          <h3 className="font-display font-extrabold text-base text-mhe-charcoal mt-1 tracking-tight leading-tight">
                            {p.title}
                          </h3>
                          <p className="text-xs text-black mt-2.5 leading-relaxed font-sans font-medium">
                            {p.description}
                          </p>
                        </div>

                        <div className="mt-6 pt-3 border-t border-dashed border-gray-200 flex items-center justify-between text-xs font-mono font-extrabold text-mhe-charcoal">
                          <span>EXPLORE PILLAR</span>
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform text-mhe-orange" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* THE CONIC CIRCLE OF HEALING - PROMINENT STANDALONE SECTION */}
              <section className="bg-[#FAF7F0] py-16 px-6 md:px-12 border-b-4 border-mhe-charcoal" id="conic-circle-of-healing-standalone">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 flex flex-col gap-5 text-left">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-mhe-orange uppercase">
                      Core Philosophical Model
                    </span>
                    <h2 className="font-display font-extrabold text-3xl md:text-4xl text-mhe-charcoal tracking-tight leading-tight">
                      The Conic Circle of Healing
                    </h2>
                    <p className="text-sm md:text-base text-mhe-charcoal/90 leading-relaxed font-sans">
                      Our interventions are built as a continuous, circular holding ecosystem. Instead of isolated clinics or single-session workshops, our teams and academic cohorts work in lockstep to support community health, emotional wellbeing, and civic resilience.
                    </p>
                    <p className="text-xs md:text-sm text-mhe-charcoal/80 leading-relaxed font-sans">
                      <strong>Interactive Guide:</strong> Hover or tap the nodes on the concentric ring system to explore how Project Sampoorna, Owning Your Feelings (OYF), and our student research cohorts intersect to form a unified blanket of care.
                    </p>
                  </div>

                  {/* Rendering the interactive conic circle */}
                  <div className="lg:col-span-12 xl:col-span-7 flex flex-col md:flex-row items-center justify-center gap-6 relative animate-fade-in" id="conic-circle-rendering-container">
                    <svg viewBox="0 0 500 500" className="w-full max-w-[460px] md:max-w-[500px] lg:max-w-[540px] h-auto select-none overflow-visible">
                      <style>{`
                        @keyframes dash-flow {
                          to {
                            stroke-dashoffset: -100;
                          }
                        }
                        @keyframes pulse-glow {
                          0%, 100% {
                            transform: scale(1);
                            opacity: 0.15;
                          }
                          50% {
                            transform: scale(1.15);
                            opacity: 0.35;
                          }
                        }
                        @keyframes float-1 {
                          0%, 100% { transform: translateY(0px) rotate(0deg); }
                          50% { transform: translateY(-4px) rotate(1deg); }
                        }
                        @keyframes float-2 {
                          0%, 100% { transform: translateY(0px) rotate(0deg); }
                          50% { transform: translateY(-5px) rotate(-1deg); }
                        }
                        @keyframes float-3 {
                          0%, 100% { transform: translateY(0px) rotate(0deg); }
                          50% { transform: translateY(-3px) rotate(0.5deg); }
                        }
                        .track-pulse-cw {
                          stroke-dasharray: 12 24;
                          animation: dash-flow 6s linear infinite;
                        }
                        .track-pulse-ccw {
                          stroke-dasharray: 14 28;
                          animation: dash-flow 8s linear reverse infinite;
                        }
                        .anim-float-1 {
                          animation: float-1 5s ease-in-out infinite;
                        }
                        .anim-float-2 {
                          animation: float-2 5.5s ease-in-out infinite;
                        }
                        .anim-float-3 {
                          animation: float-3 6s ease-in-out infinite;
                        }
                      `}</style>

                      <defs>
                        <clipPath id="center-tree-clip">
                          <circle cx="250" cy="250" r="28" />
                        </clipPath>
                      </defs>

                      {/* Concentric Circle Rings representing layers of the organization */}
                      {/* Ring 1: Center Hub Ring (120px Diameter / 60px Radius) */}
                      <circle cx="250" cy="250" r="60" fill="none" stroke="#0D5B67" strokeWidth="3" opacity="0.8" />
                      {/* Ring 2: Intermediate/Team Ring (240px Diameter / 120px Radius) */}
                      <circle cx="250" cy="250" r="120" fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeDasharray="5 5" opacity="0.85" />
                      {/* Ring 3: Field Clinics/Operational Ring (360px Diameter / 180px Radius) */}
                      <circle cx="250" cy="250" r="180" fill="none" stroke="#F97316" strokeWidth="7" className="track-pulse-cw opacity-85" />
                      {/* Ring 4: Outer Advocacy/Support Ring (460px Diameter / 230px Radius) */}
                      <circle cx="250" cy="250" r="230" fill="none" stroke="#3B82F6" strokeWidth="6" className="track-pulse-ccw opacity-80" />

                      {/* Radial flow connecting lines radiating outwards to show integration */}
                      <g stroke="#E2E8F0" strokeWidth="1.5" opacity="0.45" strokeDasharray="3 3">
                        <line x1="250" y1="250" x2="250" y2="20" />
                        <line x1="250" y1="250" x2="250" y2="480" />
                        <line x1="250" y1="250" x2="20" y2="250" />
                        <line x1="250" y1="250" x2="480" y2="250" />
                        <line x1="250" y1="250" x2="87" y2="87" />
                        <line x1="250" y1="250" x2="413" y2="413" />
                        <line x1="250" y1="250" x2="413" y2="87" />
                        <line x1="250" y1="250" x2="87" y2="413" />
                      </g>

                      {/* CENTER SEED CONTAINER - THE FOUNDATIONAL HUB */}
                      <g 
                        className="cursor-pointer group/center transition-transform" 
                        id="char-node-center"
                        onClick={() => setHoveredChar('center')}
                        onMouseEnter={() => setHoveredChar('center')}
                      >
                        {/* Glow Behind */}
                        <circle cx="250" cy="250" r="55" fill="#0D5B67" fillOpacity="0.08" className="animate-pulse" />
                        {/* Solid Backing */}
                        <circle cx="250" cy="250" r="34" fill="white" stroke="#1C2E31" strokeWidth="4.5" className="group-hover/center:scale-105 transition-transform" />
                        {/* Decorative inner dotted circle */}
                        <circle cx="250" cy="250" r="28" fill="none" stroke="#FEF08A" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                        {/* Founders Icon - Tree from Logo */}
                        <image
                          href="/LOGO DESIGN_fevicon.png"
                          x={222}
                          y={222}
                          width={56}
                          height={56}
                          clipPath="url(#center-tree-clip)"
                          className="group-hover/center:scale-110 transition-transform pointer-events-none"
                          style={{ transformOrigin: '250px 250px' }}
                        />
                      </g>

                      {/* MIDDLE LAYER COHORTS (REPRESENTING STAFF / INTERN VOLUNTEERS) */}
                      {/* Middle Top (Research Lead / Database Core) */}
                      <g 
                        className="cursor-pointer group/mid anim-float-1" 
                        id="char-node-inner-top"
                        onClick={() => setHoveredChar('inner-top')}
                        onMouseEnter={() => setHoveredChar('inner-top')}
                      >
                        <circle cx="250" cy="130" r="28" fill="#FFFFFF" stroke="#1C2E31" strokeWidth="3" className="group-hover/mid:fill-[#E6F4F1] transition-colors" />
                        <circle cx="250" cy="130" r="22" fill="#E6F4F1" />
                        <text x="250" y="137" textAnchor="middle" className="text-xl">👩‍🔬</text>
                        <text x="250" y="172" textAnchor="middle" className="font-mono font-black text-[8px] fill-mhe-charcoal bg-white px-1 border border-mhe-charcoal rounded">RESEARCH</text>
                      </g>

                      {/* Middle Bottom (Clinical Coordinators / Operations Desk) */}
                      <g 
                        className="cursor-pointer group/mid anim-float-2" 
                        id="char-node-inner-bottom"
                        onClick={() => setHoveredChar('inner-bottom')}
                        onMouseEnter={() => setHoveredChar('inner-bottom')}
                      >
                        <circle cx="250" cy="370" r="28" fill="#FFFFFF" stroke="#1C2E31" strokeWidth="3" className="group-hover/mid:fill-[#FCF7E6] transition-colors" />
                        <circle cx="250" cy="370" r="22" fill="#FCF7E6" />
                        <text x="250" y="377" textAnchor="middle" className="text-xl">📋</text>
                        <text x="250" y="412" textAnchor="middle" className="font-mono font-black text-[8px] fill-mhe-charcoal bg-white px-1 border border-mhe-charcoal rounded">OPERATIONS</text>
                      </g>

                      {/* Middle Left (OYF Program Counselors / College Ambassadors) */}
                      <g 
                        className="cursor-pointer group/mid anim-float-3" 
                        id="char-node-middle-left"
                        onClick={() => setHoveredChar('middle-left')}
                        onMouseEnter={() => setHoveredChar('middle-left')}
                      >
                        <circle cx="130" cy="250" r="28" fill="#FFFFFF" stroke="#1C2E31" strokeWidth="3" className="group-hover/mid:fill-orange-50 transition-colors" />
                        <circle cx="130" cy="250" r="22" fill="orange-50" />
                        <text x="130" y="257" textAnchor="middle" className="text-xl">🧠</text>
                        <text x="130" y="292" textAnchor="middle" className="font-mono font-black text-[8px] fill-mhe-charcoal bg-white px-1 border border-mhe-charcoal rounded">OYF TEAM</text>
                      </g>

                      {/* Middle Right (Media Storytelling / Field Logistics Core) */}
                      <g 
                        className="cursor-pointer group/mid anim-float-1" 
                        id="char-node-middle-right"
                        onClick={() => setHoveredChar('middle-right')}
                        onMouseEnter={() => setHoveredChar('middle-right')}
                      >
                        <circle cx="370" cy="250" r="28" fill="#FFFFFF" stroke="#1C2E31" strokeWidth="3" className="group-hover/mid:fill-[#FCF7E6] transition-colors" />
                        <circle cx="370" cy="250" r="22" fill="#FCF7E6" />
                        <text x="370" y="257" textAnchor="middle" className="text-xl">🚚</text>
                        <text x="370" y="292" textAnchor="middle" className="font-mono font-black text-[8px] fill-mhe-charcoal bg-white px-1 border border-mhe-charcoal rounded">LOGISTICS</text>
                      </g>

                      {/* OUTER LAYER NODES (ACTUAL BENEFICIARIES / OUTREACH CLINICS / STUDENT BODIES) */}
                      {/* Outer Top Left (College Workshops - Cotton University & Handique) */}
                      <g 
                        className="cursor-pointer group/outer anim-float-2" 
                        id="char-node-outer-top-left"
                        onClick={() => setHoveredChar('outer-top-left')}
                        onMouseEnter={() => setHoveredChar('outer-top-left')}
                      >
                        <circle cx="87" cy="87" r="30" fill="#FFFFFF" stroke="#1C2E31" strokeWidth="3.5" className="group-hover/outer:fill-orange-50 transition-colors" />
                        {/* Highlight Badge */}
                        <circle cx="110" cy="65" r="9" fill="#E65F2B" stroke="#1C2E31" strokeWidth="1.5" />
                        <text x="110" y="68" textAnchor="middle" className="font-mono text-[7px] font-extrabold fill-white">OYF</text>
                        <text x="87" y="95" textAnchor="middle" className="text-2xl">👩‍🎓</text>
                        <text x="87" y="132" textAnchor="middle" className="font-mono font-black text-[8px] fill-mhe-charcoal bg-white px-1.5 py-0.5 border-2 border-mhe-charcoal rounded-md">COLLEGES</text>
                      </g>

                      {/* Outer Top Right (Youth counseling hubs - General High Schools) */}
                      <g 
                        className="cursor-pointer group/outer anim-float-3" 
                        id="char-node-outer-top-right"
                        onClick={() => setHoveredChar('outer-top-right')}
                        onMouseEnter={() => setHoveredChar('outer-top-right')}
                      >
                        <circle cx="413" cy="87" r="30" fill="#FFFFFF" stroke="#1C2E31" strokeWidth="3.5" className="group-hover/outer:fill-[#FCF7E6] transition-colors" />
                        {/* Highlight Badge */}
                        <circle cx="390" cy="65" r="9" fill="#FABD24" stroke="#1C2E31" strokeWidth="1.5" />
                        <text x="390" y="68" textAnchor="middle" className="font-mono text-[7px] font-extrabold fill-mhe-charcoal">EDU</text>
                        <text x="413" y="95" textAnchor="middle" className="text-2xl">🏫</text>
                        <text x="413" y="132" textAnchor="middle" className="font-mono font-black text-[8px] fill-mhe-charcoal bg-white px-1.5 py-0.5 border-2 border-mhe-charcoal rounded-md">YOUTH GUIDANCE</text>
                      </g>

                      {/* Outer Bottom Left (Therapeutic Clowning Units / Old Age Homes) */}
                      <g 
                        className="cursor-pointer group/outer anim-float-1" 
                        id="char-node-outer-bottom-left"
                        onClick={() => setHoveredChar('outer-bottom-left')}
                        onMouseEnter={() => setHoveredChar('outer-bottom-left')}
                      >
                        <circle cx="87" cy="413" r="30" fill="#FFFFFF" stroke="#1C2E31" strokeWidth="3.5" className="group-hover/outer:fill-red-50 transition-colors" />
                        {/* Highlight Badge */}
                        <circle cx="110" cy="435" r="9" fill="#EF4444" stroke="#1C2E31" strokeWidth="1.5" />
                        <text x="110" y="438" textAnchor="middle" className="font-mono text-[7px] font-extrabold fill-white">CLW</text>
                        {/* Clown face */}
                        <circle cx="87" cy="413" r="15" fill="#FEF08A" />
                        <circle cx="82" cy="411" r="1.5" fill="#1E293B" />
                        <circle cx="92" cy="411" r="1.5" fill="#1E293B" />
                        <circle cx="87" cy="416" r="4" fill="#EF4444" />
                        <path d="M 80 420 C 83 423, 91 423, 94 420" stroke="#EF4444" strokeWidth="1.5" fill="none" />
                        <text x="87" y="458" textAnchor="middle" className="font-mono font-black text-[8px] fill-mhe-charcoal bg-white px-1.5 py-0.5 border-2 border-mhe-charcoal rounded-md">THERAPEUTIC JOY</text>
                      </g>

                      {/* Outer Bottom Right (Primary Health camps - Sampoorna Women's screening outposts) */}
                      <g 
                        className="cursor-pointer group/outer anim-float-2" 
                        id="char-node-outer-bottom-right"
                        onClick={() => setHoveredChar('outer-bottom-right')}
                        onMouseEnter={() => setHoveredChar('outer-bottom-right')}
                      >
                        <circle cx="413" cy="413" r="30" fill="#FFFFFF" stroke="#1C2E31" strokeWidth="3.5" className="group-hover/outer:fill-teal-50 transition-colors" />
                        {/* Highlight Badge */}
                        <circle cx="390" cy="435" r="9" fill="#0D5B67" stroke="#1C2E31" strokeWidth="1.5" />
                        <text x="390" y="438" textAnchor="middle" className="font-mono text-[6.5px] font-extrabold fill-white uppercase">SAM</text>
                        <text x="413" y="421" textAnchor="middle" className="text-2xl">🩺</text>
                        <text x="413" y="458" textAnchor="middle" className="font-mono font-black text-[8px] fill-mhe-charcoal bg-white px-1.5 py-0.5 border-2 border-mhe-charcoal rounded-md">WOMEN COHORTS</text>
                      </g>

                      {/* Decorative elements representing Clowning features */}
                      <g id="clowning-decorations-overlay" className="pointer-events-none">
                        {/* Red clown nose on Bottom Left */}
                        <circle cx="87" cy="416" r="4" fill="#EF4444" />
                        {/* Small subtle bubbles on Bottom Left representation */}
                        <circle cx="102" cy="385" r="4.5" fill="#3B82F6" opacity="0.3" className="animate-bounce" style={{ animationDelay: '0.4s' }} />
                        <circle cx="109" cy="378" r="3" fill="#10B981" opacity="0.25" className="animate-bounce" style={{ animationDelay: '0.9s' }} />
                      </g>
                    </svg>

                    {/* Interactive Speech Bubble or Voice of Support Card */}
                    <div className="w-full md:w-[245px] lg:w-[275px] mt-4 md:mt-0 transition-all duration-300 flex flex-col justify-center shrink-0">
                      {hoveredChar && CHAR_DATA[hoveredChar] ? (
                        <div className="p-4 rounded-xl border-4 border-mhe-charcoal bg-white shadow-[4px_4px_0px_0px_#1C2E31] transition-all duration-300 transform scale-100 flex gap-3.5 items-start relative max-h-[300px] overflow-y-auto">
                          <div className="w-9 h-9 rounded-full border-2 border-mhe-charcoal flex items-center justify-center text-xl shrink-0 bg-[#E6F4F1] shadow-sm transform rotate-6 animate-pulse">
                            {CHAR_DATA[hoveredChar].emoji}
                          </div>
                          <div className="flex-1">
                            <span className="text-[9px] font-mono font-black uppercase text-mhe-orange block tracking-wider leading-none">
                              {CHAR_DATA[hoveredChar].subtitle}
                            </span>
                            <h4 className="font-display font-extrabold text-[11px] text-mhe-charcoal mt-1 leading-tight uppercase">
                              {CHAR_DATA[hoveredChar].title}
                            </h4>
                            <p className="text-[10px] md:text-[10.5px] leading-relaxed text-slate-600 mt-1 leading-relaxed font-sans font-medium">
                              {CHAR_DATA[hoveredChar].description}
                            </p>
                            {CHAR_DATA[hoveredChar].outcomes && (
                              <div className="mt-2.5 pt-2 border-t border-dashed border-mhe-charcoal/20">
                                <span className="text-[8px] font-mono font-extrabold text-mhe-orange uppercase tracking-wider block mb-1">
                                  Core Outcomes:
                                </span>
                                <div className="flex flex-col gap-1">
                                  {CHAR_DATA[hoveredChar].outcomes.map((o, oi) => (
                                    <div key={oi} className="flex items-start gap-1 text-[9px] font-bold text-mhe-charcoal/90">
                                      <span className="text-mhe-orange">✓</span>
                                      <span className="leading-tight">{o}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl border-4 border-mhe-charcoal border-dashed bg-white/50 text-center flex flex-col items-center justify-center py-5 shadow-[4px_4px_0px_0px_#1C2E31]">
                          <span className="text-xl animate-bounce mb-1.5">💫</span>
                          <h4 className="font-display font-extrabold text-[11px] text-mhe-charcoal uppercase tracking-wider">
                            The Conic Circle of Healing
                          </h4>
                          <p className="text-[10px] text-slate-500 max-w-[210px] mt-1.5 leading-normal font-sans font-medium">
                            Hover or tap any individual above to explore their connection.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* OVERALL IMPACT SUMMARY MAP CALLOUT */}
              <section className="bg-mhe-teal-light py-16 px-6 md:px-12 border-b-4 border-mhe-charcoal -mt-16" id="reach-highlight-section">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column Description */}
                    <div className="lg:col-span-4 flex flex-col gap-5 text-left">
                      <span className="text-[10px] font-mono font-bold tracking-widest text-mhe-orange uppercase">
                        Operational Geographies
                      </span>
                      <h2 className="font-display font-extrabold text-3xl text-mhe-charcoal tracking-tight leading-tight">
                        Multistate Field Operations
                      </h2>
                      <p className="text-sm md:text-base text-mhe-charcoal/80 leading-relaxed font-sans">
                        DIF delivers structured interventions across <strong>Assam</strong> (Guwahati cluster and Jorhat), <strong>Meghalaya</strong> (Shillong), and <strong>Maharashtra</strong> (Mumbai Naka). In 2026, we are expanding strategic activities into <strong>Faridabad, Haryana</strong>, and planning future outreach in <strong>Kerala</strong>.
                      </p>


                    </div>

                    {/* Right Column Interactive Map and Stats Grid */}
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-7 flex justify-center">
                        <svg viewBox="0 0 612 696" className="w-full max-w-[400px] md:max-w-full h-auto select-none overflow-visible bg-white border-4 border-mhe-charcoal rounded-3xl p-4 shadow-[6px_6px_0px_0px_rgba(28,46,49,1)]">
                          <defs>
                            <pattern id="map-grid-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#map-grid-pattern)" rx="16" />

                          {/* Complete, High-Fidelity blank India map from local assets */}
                          <image 
                            href="/india_map.svg" 
                            x="0" 
                            y="0" 
                            width="612" 
                            height="696" 
                            preserveAspectRatio="xMidYMid meet"
                            opacity="0.9"
                          />

                          {/* Connection Routing Channels */}
                          <g stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 6" fill="none" opacity="0.65">
                            <path d="M 110 435 Q 120 300 164 195" className="track-pulse-cw" />
                            <path d="M 164 195 Q 340 180 516 271" className="track-pulse-cw" />
                            <path d="M 516 271 L 484 283" />
                            <path d="M 110 435 Q 312 300 484 283" className="track-pulse-ccw" />
                            <path d="M 110 435 Q 110 520 166 615" className="track-pulse-cw" />
                          </g>

                          {/* Interactive pulsating nodes */}
                          {/* Assam */}
                          <g 
                            className="cursor-pointer group/pin"
                            onClick={() => setSelectedLocationId('assam')}
                            onMouseEnter={() => setSelectedLocationId('assam')}
                          >
                            <circle cx="516" cy="271" r="16" fill="#0D5B67" fillOpacity="0.2" className="animate-pulse" />
                            <circle cx="516" cy="271" r="7" fill="#0D5B67" stroke="#1E293B" strokeWidth="2" className="group-hover/pin:scale-125 transition-transform" />
                            <text x="528" y="267" textAnchor="start" className="font-mono font-black text-[10px] fill-mhe-charcoal bg-white/95 px-1.5 py-0.5 rounded border border-mhe-charcoal shadow-sm">ASSAM</text>
                          </g>

                          {/* Meghalaya */}
                          <g 
                            className="cursor-pointer group/pin"
                            onClick={() => setSelectedLocationId('meghalaya')}
                            onMouseEnter={() => setSelectedLocationId('meghalaya')}
                          >
                            <circle cx="484" cy="283" r="14" fill="#FABD24" fillOpacity="0.2" className="animate-pulse" />
                            <circle cx="484" cy="283" r="6" fill="#FABD24" stroke="#1E293B" strokeWidth="2" className="group-hover/pin:scale-125 transition-transform" />
                            <text x="484" y="305" textAnchor="middle" className="font-mono font-black text-[10px] fill-mhe-charcoal bg-white/95 px-1.5 py-0.5 rounded border border-mhe-charcoal shadow-sm">MEGHALAYA</text>
                          </g>

                          {/* Maharashtra */}
                          <g 
                            className="cursor-pointer group/pin"
                            onClick={() => setSelectedLocationId('maharashtra')}
                            onMouseEnter={() => setSelectedLocationId('maharashtra')}
                          >
                            <circle cx="110" cy="435" r="14" fill="#8B5CF6" fillOpacity="0.2" className="animate-pulse" />
                            <circle cx="110" cy="435" r="6" fill="#8B5CF6" stroke="#1E293B" strokeWidth="2" className="group-hover/pin:scale-125 transition-transform" />
                            <text x="100" y="451" textAnchor="end" className="font-mono font-black text-[10px] fill-mhe-charcoal bg-white/95 px-1.5 py-0.5 rounded border border-mhe-charcoal shadow-sm">MUMBAI</text>
                          </g>

                          {/* Haryana */}
                          <g 
                            className="cursor-pointer group/pin"
                            onClick={() => setSelectedLocationId('haryana')}
                            onMouseEnter={() => setSelectedLocationId('haryana')}
                          >
                            <circle cx="164" cy="195" r="14" fill="#F97316" fillOpacity="0.2" className="animate-pulse" />
                            <circle cx="164" cy="195" r="6" fill="#F97316" stroke="#1E293B" strokeWidth="2" className="group-hover/pin:scale-125 transition-transform" />
                            <text x="164" y="179" textAnchor="middle" className="font-mono font-black text-[10px] fill-mhe-charcoal bg-white/95 px-1.5 py-0.5 rounded border border-mhe-charcoal shadow-sm">HARYANA</text>
                          </g>

                          {/* Karela (Coming Soon) */}
                          <g 
                            className="cursor-pointer group/pin"
                            onClick={() => setSelectedLocationId('karela')}
                            onMouseEnter={() => setSelectedLocationId('karela')}
                          >
                            <circle cx="166" cy="615" r="14" fill="#E65F2B" fillOpacity="0.2" className="animate-pulse" />
                            <circle cx="166" cy="615" r="6" fill="#E65F2B" stroke="#1E293B" strokeWidth="2" className="group-hover/pin:scale-125 transition-transform" />
                            <text x="178" y="619" textAnchor="start" className="font-mono font-black text-[10px] fill-mhe-charcoal bg-white/95 px-1.5 py-0.5 rounded border border-mhe-charcoal shadow-sm">KERALA (SOON)</text>
                          </g>


                        </svg>
                      </div>

                      {/* Interactive Geographic Hub Fact Card */}
                      <div className="md:col-span-5 flex flex-col justify-center">
                        <div className="p-5 rounded-2xl border-4 border-mhe-charcoal bg-white shadow-[6px_6px_0px_0px_rgba(28,46,49,1)] transition-all duration-300 text-left">
                          <div className="flex flex-wrap gap-2 items-center mb-3">
                            <span className={`text-[9px] font-mono font-black px-2 py-0.5 rounded-full border-2 border-mhe-charcoal ${LOCATION_DETAILS[selectedLocationId].badgeColor}`}>
                              {LOCATION_DETAILS[selectedLocationId].type}
                            </span>
                            <span className="text-[10px] font-mono text-mhe-orange uppercase font-extrabold">{LOCATION_DETAILS[selectedLocationId].state}</span>
                          </div>
                          <h3 className="font-display font-black text-lg text-mhe-charcoal leading-tight mb-1.5 font-sans">
                            {LOCATION_DETAILS[selectedLocationId].name}
                          </h3>
                          <p className="text-xs text-slate-600 leading-relaxed font-sans mb-4 font-medium">
                            {LOCATION_DETAILS[selectedLocationId].tagline}
                          </p>
                          <div className="border-t border-dashed border-gray-200 pt-3">
                            <h4 className="font-mono text-[9px] font-black text-mhe-orange uppercase tracking-wider mb-2">Key Initiatives:</h4>
                            <ul className="flex flex-col gap-2">
                              {LOCATION_DETAILS[selectedLocationId].initiatives.map((init, i) => (
                                <li key={i} className="text-[11px] text-mhe-charcoal font-sans flex items-start gap-2 leading-relaxed">
                                  <span className="text-mhe-orange font-extrabold text-xs shrink-0">•</span>
                                  <span className="font-sans">{init}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Program locations list cards resembling layout from page 7 */}
                  <div className="hidden" id="states-reached-grid">
                    <svg viewBox="0 0 500 500" className="w-full max-w-[460px] md:max-w-[500px] lg:max-w-[540px] h-auto select-none overflow-visible">
                      <style>{`
                        @keyframes dash-flow {
                          to {
                            stroke-dashoffset: -100;
                          }
                        }
                        @keyframes pulse-glow {
                          0%, 100% {
                            transform: scale(1);
                            opacity: 0.15;
                          }
                          50% {
                            transform: scale(1.15);
                            opacity: 0.35;
                          }
                        }
                        @keyframes float-1 {
                          0%, 100% { transform: translateY(0px) rotate(0deg); }
                          50% { transform: translateY(-4px) rotate(1deg); }
                        }
                        @keyframes float-2 {
                          0%, 100% { transform: translateY(0px) rotate(0deg); }
                          50% { transform: translateY(-5px) rotate(-1deg); }
                        }
                        @keyframes float-3 {
                          0%, 100% { transform: translateY(0px) rotate(0deg); }
                          50% { transform: translateY(-3px) rotate(0.5deg); }
                        }
                        .track-pulse-cw {
                          stroke-dasharray: 6 15;
                          animation: dash-flow 6s linear infinite;
                        }
                        .track-pulse-ccw {
                          stroke-dasharray: 8 18;
                          animation: dash-flow 8s linear reverse infinite;
                        }
                        .anim-float-1 {
                          animation: float-1 5s ease-in-out infinite;
                        }
                        .anim-float-2 {
                          animation: float-2 5.5s ease-in-out infinite;
                        }
                        .anim-float-3 {
                          animation: float-3 6s ease-in-out infinite;
                        }
                        .center-pulse {
                          animation: pulse-glow 3s ease-in-out infinite;
                          transform-origin: 250px 250px;
                        }
                      `}</style>

                      {/* Gentle background glow */}
                      <circle cx="250" cy="250" r="210" fill="#F8FAFC" />

                      {/* Animated breathing pulse around green core */}
                      <circle cx="250" cy="250" r="62" fill="#E6F4F1" className="center-pulse" />

                      {/* Decorative background grids & elements */}
                      <g fill="#94A3B8" opacity="0.25">
                        <circle cx="430" cy="120" r="2" />
                        <circle cx="442" cy="120" r="2" />
                        <circle cx="454" cy="120" r="2" />
                        <circle cx="430" cy="132" r="2" />
                        <circle cx="442" cy="132" r="2" />
                        <circle cx="454" cy="132" r="2" />
                        <circle cx="430" cy="144" r="2" />
                        <circle cx="442" cy="144" r="2" />
                        <circle cx="454" cy="144" r="2" />
                        
                        <circle cx="50" cy="370" r="2" />
                        <circle cx="62" cy="370" r="2" />
                        <circle cx="74" cy="370" r="2" />
                        <circle cx="50" cy="382" r="2" />
                        <circle cx="62" cy="382" r="2" />
                        <circle cx="74" cy="382" r="2" />
                        <circle cx="50" cy="394" r="2" />
                        <circle cx="62" cy="394" r="2" />
                        <circle cx="74" cy="394" r="2" />
                      </g>

                      {/* Light decorative pastel orbs */}
                      <circle cx="90" cy="90" r="28" fill="#E2F0ED" opacity="0.75" />
                      <circle cx="415" cy="85" r="14" fill="none" stroke="#FDE047" strokeWidth="2" strokeDasharray="3 3" />
                      <circle cx="60" cy="425" r="12" fill="#FCE7F3" opacity="0.8" />
                      <circle cx="430" cy="410" r="18" fill="#EFF6FF" opacity="0.9" />

                      {/* Main Concentric Ring System */}
                      {/* Outer yellow-orange supportive arm ring */}
                      <path d="M 100 250 A 150 150 0 0 1 400 250" fill="none" stroke="#FEF08A" strokeWidth="32" strokeLinecap="round" />
                      <path d="M 400 250 A 150 150 0 0 1 100 250" fill="none" stroke="#F87171" strokeWidth="32" strokeLinecap="round" opacity="0.85" />
                      <circle cx="250" cy="250" r="150" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.6" strokeDasharray="5 15" className="track-pulse-cw" />

                      {/* Middle lavender support ring */}
                      <circle cx="250" cy="250" r="115" fill="none" stroke="#C4B5FD" strokeWidth="24" strokeLinecap="round" />
                      <circle cx="250" cy="250" r="115" fill="none" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.7" strokeDasharray="6 20" className="track-pulse-ccw" />

                      {/* Inner sky-blue track */}
                      <circle cx="250" cy="250" r="80" fill="none" stroke="#93C5FD" strokeWidth="18" />
                      <circle cx="250" cy="250" r="80" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.8" strokeDasharray="4 12" className="track-pulse-cw" />

                      {/* Center Green Circle Core */}
                      <circle cx="250" cy="250" r="50" fill="#E6F4F1" stroke="#34D399" strokeWidth="5" />

                      {/* === Center Couple (Green Core) === */}
                      <g 
                        id="char-center"
                        className={`cursor-pointer transition-all duration-300 origin-[250px_250px] ${
                          hoveredChar === 'center' 
                            ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(16,185,129,0.85)] z-50' 
                            : hoveredChar 
                              ? 'opacity-30 scale-95 saturate-[0.3]' 
                              : 'hover:scale-115'
                        } anim-float-1`}
                        onMouseEnter={() => setHoveredChar('center')}
                        onMouseLeave={() => setHoveredChar(null)}
                      >
                        {/* Center person 1 */}
                        <path d="M 230 250 C 230 238, 255 238, 255 250 Z" fill="#10B981" />
                        <circle cx="242" cy="232" r="11" fill="#FDBA74" />
                        <path d="M 232 232 A 11 11 0 0 1 252 232 Z" fill="#1E293B" /> {/* Hair */}
                        {/* Eyes */}
                        <path d="M 237 232 Q 239 233 241 232" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        <path d="M 244 232 Q 246 233 248 232" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        <path d="M 240 236 Q 242 237 244 236" stroke="#1E293B" strokeWidth="1" fill="none" />
                        {/* Medical Badge overlays */}
                        <circle cx="242.5" cy="244" r="3.5" fill="white" />
                        <path d="M 241 244 L 244 244 M 242.5 242.5 L 242.5 245.5" stroke="#10B981" strokeWidth="1" />
                        
                        {/* Center person 2 */}
                        <path d="M 245 264 C 245 254, 270 254, 270 264 Z" fill="#34D399" />
                        <circle cx="258" cy="248" r="10" fill="#FED7AA" />
                        <path d="M 248 248 A 10 10 0 0 1 268 248 Z" fill="#4B5563" /> {/* Hair */}
                        {/* Eyes */}
                        <path d="M 253 248 Q 255 249 257 248" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        <path d="M 260 248 Q 262 249 264 248" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        {/* Small white plus overlay */}
                        <path d="M 255.5 259 L 260.5 259 M 258 256.5 L 258 261.5" stroke="white" strokeWidth="1" />
                      </g>

                      {/* === Inner Ring Characters (Blue track) === */}
                      {/* Character Top Center-Left */}
                      <g 
                        id="char-inner-top"
                        className={`cursor-pointer transition-all duration-300 origin-[210px_200px] ${
                          hoveredChar === 'inner-top' 
                            ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(139,92,246,0.85)] z-50' 
                            : hoveredChar 
                              ? 'opacity-30 scale-95 saturate-[0.3]' 
                              : 'hover:scale-115'
                        } anim-float-2`}
                        onMouseEnter={() => setHoveredChar('inner-top')}
                        onMouseLeave={() => setHoveredChar(null)}
                      >
                        <path d="M 195 210 C 195 195, 225 195, 225 210 Z" fill="#A78BFA" /> {/* Purple dress */}
                        <circle cx="210" cy="188" r="13" fill="#FED7AA" />
                        <path d="M 197 188 A 13 13 0 0 1 223 188 Z" fill="#1F2937" /> {/* Hair */}
                        <path d="M 197 188 C 197 205, 201 205, 201 188 Z" fill="#1F2937" />
                        <path d="M 223 188 C 223 205, 219 205, 219 188 Z" fill="#1F2937" />
                        <path d="M 205 188 Q 207 189 209 188" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        <path d="M 212 188 Q 214 189 216 188" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        {/* Floating trend stats line badge */}
                        <circle cx="225" cy="176" r="7" fill="white" stroke="#8B5CF6" strokeWidth="1.2" />
                        <path d="M 221 178 L 224 175 L 226 176 L 229 172" stroke="#EF4444" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      </g>

                      {/* Character Bottom Center-Right */}
                      <g 
                        id="char-inner-bottom"
                        className={`cursor-pointer transition-all duration-300 origin-[280px_285px] ${
                          hoveredChar === 'inner-bottom' 
                            ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(59,130,246,0.85)] z-50' 
                            : hoveredChar 
                              ? 'opacity-30 scale-95 saturate-[0.3]' 
                              : 'hover:scale-115'
                        } anim-float-3`}
                        onMouseEnter={() => setHoveredChar('inner-bottom')}
                        onMouseLeave={() => setHoveredChar(null)}
                      >
                        <path d="M 265 295 C 265 280, 295 280, 295 295 Z" fill="#3B82F6" />
                        <circle cx="280" cy="275" r="12" fill="#FED7AA" />
                        <path d="M 268 275 A 12 12 0 0 1 292 275 Z" fill="#1E293B" /> {/* Hair */}
                        <path d="M 275 275 Q 277 276 279 275" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        <path d="M 282 275 Q 284 276 286 275" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        {/* Overlooking Thought bubble checklist icon */}
                        <circle cx="293" cy="261" r="6" fill="white" stroke="#3B82F6" strokeWidth="1.2" />
                        <path d="M 290 262 L 293 259 L 296 262" stroke="#3B82F6" strokeWidth="1" fill="none" />
                        <circle cx="288" cy="267" r="1.5" fill="#3B82F6" opacity="0.8" />
                      </g>

                      {/* === Middle Ring Characters (Lavender Track) === */}
                      {/* Character Far Right */}
                      <g 
                        id="char-middle-right"
                        className={`cursor-pointer transition-all duration-300 origin-[350px_240px] ${
                          hoveredChar === 'middle-right' 
                            ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(236,72,153,0.85)] z-50' 
                            : hoveredChar 
                              ? 'opacity-30 scale-95 saturate-[0.3]' 
                              : 'hover:scale-115'
                        } anim-float-1`}
                        onMouseEnter={() => setHoveredChar('middle-right')}
                        onMouseLeave={() => setHoveredChar(null)}
                      >
                        <path d="M 335 250 C 335 235, 365 235, 365 250 Z" fill="#EF4444" /> {/* Red Cross theme */}
                        <circle cx="350" cy="230" r="14" fill="#FDBA74" />
                        <path d="M 336 230 A 14 14 0 0 1 364 230 Z" fill="#312E81" /> {/* Hair */}
                        <circle cx="350" cy="216" r="5" fill="#312E81" /> {/* Hair bun */}
                        <path d="M 344 230 Q 346 231 348 230" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        <path d="M 352 230 Q 354 231 356 230" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        {/* First aid badge */}
                        <circle cx="366" cy="218" r="7" fill="white" stroke="#EF4444" strokeWidth="1.2" />
                        <path d="M 363 218 L 369 218 M 366 215 L 366 221" stroke="#EF4444" strokeWidth="1.8" />
                      </g>

                      {/* Character Far Left */}
                      <g 
                        id="char-middle-left"
                        className={`cursor-pointer transition-all duration-300 origin-[150px_240px] ${
                          hoveredChar === 'middle-left' 
                            ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(14,165,233,0.85)] z-50' 
                            : hoveredChar 
                              ? 'opacity-30 scale-95 saturate-[0.3]' 
                              : 'hover:scale-115'
                        } anim-float-2`}
                        onMouseEnter={() => setHoveredChar('middle-left')}
                        onMouseLeave={() => setHoveredChar(null)}
                      >
                        <path d="M 135 250 C 135 235, 165 235, 165 250 Z" fill="#F59E0B" /> {/* Professional suit orange */}
                        <circle cx="150" cy="230" r="14" fill="#FFD8A8" />
                        <path d="M 136 230 A 14 14 0 0 1 164 230 Z" fill="#1F2937" /> {/* Hair */}
                        <path d="M 144 230 Q 146 231 148 230" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        <path d="M 152 230 Q 154 231 156 230" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        {/* Small Briefcase Icon */}
                        <rect x="131" y="215" width="10" height="7" rx="1.5" fill="#D97706" />
                        <path d="M 134 215 L 134 213 L 138 213 L 138 215" stroke="#78350F" strokeWidth="1" fill="none" />
                      </g>

                      {/* === Outer Ring Characters (Yellow/Red Ring) === */}
                      {/* Character Top Right */}
                      <g 
                        id="char-outer-top-right"
                        className={`cursor-pointer transition-all duration-300 origin-[337px_105px] ${
                          hoveredChar === 'outer-top-right' 
                            ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(248,113,113,0.85)] z-50' 
                            : hoveredChar 
                              ? 'opacity-30 scale-95 saturate-[0.3]' 
                              : 'hover:scale-115'
                        } anim-float-3`}
                        onMouseEnter={() => setHoveredChar('outer-top-right')}
                        onMouseLeave={() => setHoveredChar(null)}
                      >
                        <path d="M 320 115 C 320 100, 355 100, 355 115 Z" fill="#3B82F6" /> {/* Academic blue */}
                        <circle cx="337" cy="95" r="16" fill="#FDBA74" />
                        <path d="M 321 95 A 16 16 0 0 1 353 95 Z" fill="#1E293B" /> {/* Hair */}
                        <path d="M 331 95 Q 333 96 335 95" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        <path d="M 339 95 Q 341 96 343 95" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        {/* Mini graduation cap */}
                        <polygon points="325,75 337,70 349,75 337,80" fill="#1E293B" />
                        <rect x="331" y="78" width="12" height="4" fill="#1E293B" />
                        <path d="M 345 77 L 347 84" stroke="#FBBF24" strokeWidth="0.8" />
                      </g>

                      {/* Character Bottom Left */}
                      <g 
                        id="char-outer-top-left"
                        className={`cursor-pointer transition-all duration-300 origin-[162px_375px] ${
                          hoveredChar === 'outer-top-left' 
                            ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.85)] z-50' 
                            : hoveredChar 
                              ? 'opacity-30 scale-95 saturate-[0.3]' 
                              : 'hover:scale-115'
                        } anim-float-1`}
                        onMouseEnter={() => setHoveredChar('outer-top-left')}
                        onMouseLeave={() => setHoveredChar(null)}
                      >
                        <path d="M 145 385 C 145 370, 180 370, 180 385 Z" fill="#10B981" /> {/* Preventive Green */}
                        <circle cx="162" cy="365" r="16" fill="#FED7AA" />
                        <path d="M 146 365 A 16 16 0 0 1 178 365 Z" fill="#312E81" /> {/* Hair */}
                        <circle cx="162" cy="349" r="6" fill="#312E81" /> {/* Hair bun */}
                        <path d="M 156 365 Q 158 366 160 365" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        <path d="M 164 365 Q 166 366 168 365" stroke="#1E293B" strokeWidth="1.2" fill="none" />
                        {/* Floating diagnostics stethoscope badge */}
                        <circle cx="146" cy="350" r="7" fill="white" stroke="#10B981" strokeWidth="1.2" />
                        <path d="M 143 348 C 143 352, 149 352, 149 348" stroke="#10B981" strokeWidth="1" fill="none" />
                        <circle cx="146" cy="352" r="1.5" fill="#10B981" />
                      </g>

                      {/* Character Bottom Right (Afro-Hair Curly) */}
                      <g 
                        id="char-outer-bottom-right"
                        className={`cursor-pointer transition-all duration-300 origin-[337px_375px] ${
                          hoveredChar === 'outer-bottom-right' 
                            ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(16,185,129,0.85)] z-50' 
                            : hoveredChar 
                              ? 'opacity-30 scale-95 saturate-[0.3]' 
                              : 'hover:scale-115'
                        } anim-float-2`}
                        onMouseEnter={() => setHoveredChar('outer-bottom-right')}
                        onMouseLeave={() => setHoveredChar(null)}
                      >
                        <path d="M 320 385 C 320 370, 355 370, 355 385 Z" fill="#0D9488" /> {/* Registry teal */}
                        <circle cx="337" cy="365" r="16" fill="#8D4F28" />
                        {/* Curly Afro Shape using overlapping circles */}
                        <circle cx="337" cy="349" r="10" fill="#111827" />
                        <circle cx="323" cy="357" r="9" fill="#111827" />
                        <circle cx="351" cy="357" r="9" fill="#111827" />
                        <path d="M 331 365 Q 333 366 335 365" stroke="#FDE047" strokeWidth="1.2" fill="none" />
                        <path d="M 339 365 Q 341 366 343 365" stroke="#FDE047" strokeWidth="1.2" fill="none" />
                        {/* Floating mini health card registry checklist board */}
                        <rect x="352" y="344" width="10" height="13" rx="1.5" fill="white" stroke="#0D9488" strokeWidth="1.2" />
                        <line x1="354" y1="348" x2="360" y2="348" stroke="#0D9488" strokeWidth="1.2" />
                        <line x1="354" y1="351" x2="358" y2="351" stroke="#34D399" strokeWidth="1.2" />
                        <circle cx="357" cy="354" r="1" fill="#F43F5E" />
                      </g>

                      {/* Character Top Left */}
                      <g 
                        id="char-outer-bottom-left"
                        className={`cursor-pointer transition-all duration-300 origin-[162px_105px] ${
                          hoveredChar === 'outer-bottom-left' 
                            ? 'scale-125 filter drop-shadow-[0_0_12px_rgba(244,63,94,0.85)] z-50' 
                            : hoveredChar 
                              ? 'opacity-30 scale-95 saturate-[0.3]' 
                              : 'hover:scale-115'
                        } anim-float-3`}
                        onMouseEnter={() => setHoveredChar('outer-bottom-left')}
                        onMouseLeave={() => setHoveredChar(null)}
                      >
                        <path d="M 145 115 C 145 100, 180 100, 180 115 Z" fill="#FCD34D" /> {/* Bright clown suit */}
                        <circle cx="162" cy="95" r="16" fill="#FFD8A8" />
                        {/* Colorful Therapeutic Clown Hair puffs! */}
                        <circle cx="147" cy="94" r="5" fill="#EF4444" />
                        <circle cx="152" cy="84" r="5" fill="#10B981" />
                        <circle cx="162" cy="81" r="5" fill="#8B5CF6" />
                        <circle cx="172" cy="84" r="5" fill="#F97316" />
                        <circle cx="177" cy="94" r="5" fill="#EC4899" />
                        {/* Eyes */}
                        <circle cx="157" cy="94" r="1.5" fill="#1E293B" />
                        <circle cx="167" cy="94" r="1.5" fill="#1E293B" />
                        {/* Bright Red Nose */}
                        <circle cx="162" cy="97" r="4.5" fill="#EF4444" className="animate-pulse" stroke="#1E293B" strokeWidth="0.5" />
                        {/* Heart on cheek */}
                        <path d="M 152 101 L 154 103 L 156 101" stroke="#EF4444" strokeWidth="0.8" fill="none" />
                      </g>
                    </svg>

                    {/* Interactive Speech Bubble or Voice of Support Card */}
                    <div className="w-full md:w-[245px] lg:w-[275px] mt-4 md:mt-0 transition-all duration-300 flex flex-col justify-center shrink-0">
                      {hoveredChar && CHAR_DATA[hoveredChar] ? (
                        <div className={`p-4 rounded-xl border-4 border-mhe-charcoal bg-white shadow-[4px_4px_0px_0px_#1C2E31] transition-all duration-300 transform scale-100 flex gap-3.5 items-start relative`}>
                          {/* Rich Badge Indicator */}
                          <div className="w-9 h-9 rounded-full border-2 border-mhe-charcoal flex items-center justify-center text-xl shrink-0 bg-[#E6F4F1] shadow-sm transform rotate-6 animate-pulse">
                            {CHAR_DATA[hoveredChar].emoji}
                          </div>
                          <div>
                            <span className="text-[9px] font-mono font-black uppercase text-mhe-orange block tracking-wider leading-none">
                              {CHAR_DATA[hoveredChar].subtitle}
                            </span>
                            <h4 className="font-display font-extrabold text-[11px] text-mhe-charcoal mt-1 leading-tight">
                              {CHAR_DATA[hoveredChar].title}
                            </h4>
                            <p className="text-[10px] md:text-[10.5px] leading-relaxed text-slate-600 mt-1 leading-relaxed font-sans font-medium">
                              {CHAR_DATA[hoveredChar].description}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl border-4 border-mhe-charcoal border-dashed bg-white/50 text-center flex flex-col items-center justify-center py-5 shadow-[4px_4px_0px_0px_#1C2E31]">
                          <span className="text-xl animate-bounce mb-1.5">💫</span>
                          <h4 className="font-display font-extrabold text-[11px] text-mhe-charcoal uppercase tracking-wider">
                            The Conic Circle of Healing
                          </h4>
                          <p className="text-[10px] text-slate-500 max-w-[210px] mt-1.5 leading-normal font-sans font-medium">
                            Hover or tap any individual above to explore their connection.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>

              {/* TESTIMONY QUICK CAROUSEL PREVIEW */}
              <section className="max-w-7xl mx-auto px-6 md:px-12 text-center" id="testimony-quick-carousel">
                <span className="text-[10px] font-mono font-bold tracking-widest text-mhe-orange uppercase">
                  Community Voices
                </span>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-mhe-charcoal mt-1 mb-8">
                  Dignity is in the Healing
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {currentTestimonials.slice(3, 5).map((testimony, index) => {
                    const bgClass = index % 2 === 0 ? 'bg-mhe-teal-light' : 'bg-[#FCF7E6]';
                    return (
                      <div key={testimony.id} className={`${bgClass} border-4 border-mhe-charcoal p-6 rounded-2xl relative mhe-card-shadow`}>
                        <span className="text-4xl text-mhe-teal opacity-20 absolute top-2 right-4">“</span>
                        <p className="text-xs md:text-sm text-gray-600 font-sans italic leading-relaxed mb-4">
                          {testimony.text.length > 250 ? `${testimony.text.slice(0, 250)}...` : testimony.text}
                        </p>
                        <div className="border-t-2 border-dashed border-mhe-charcoal/20 pt-3 flex items-center gap-3">
                          {testimony.imageUrl ? (
                            <img 
                              src={testimony.imageUrl} 
                              alt={testimony.author}
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 rounded-full object-cover border-2 border-mhe-charcoal shadow-sm shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-white text-mhe-charcoal font-sans text-xs flex items-center justify-center border-2 border-mhe-charcoal shadow-sm shrink-0">
                              👤
                            </div>
                          )}
                          <div>
                            <h4 className="font-display font-bold text-xs text-mhe-charcoal leading-tight">{testimony.author}</h4>
                            <span className="text-[9px] font-mono text-mhe-orange uppercase font-bold block">{testimony.location}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button 
                  onClick={() => handleNavChange('testimonials')}
                  className="mt-6 text-xs font-mono font-bold text-mhe-teal underline flex items-center gap-1 mx-auto cursor-pointer"
                >
                  <span>SEE ALL COMMUNITY TESTIMONIALS</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </section>
            </motion.div>
          )}

          {/* OUR WORK VIEW - THE 4 DOMAINS IN FULL */}
          {activeTab === 'programs' && (
            <motion.div
              key="programs"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-4 flex flex-col gap-12"
              id="programs-view-port"
            >
              {/* Program Overview Banner */}
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[10px] font-mono font-bold text-mhe-orange tracking-widest uppercase">
                  Our Direct Interventions
                </span>
                <h1 className="font-display font-extrabold text-3xl md:text-5xl text-mhe-charcoal tracking-tight mt-1 leading-tight">
                  Our Programmatic Domains
                </h1>
                <p className="text-sm md:text-base text-black mt-2 font-sans">
                  The 2024–2026 Annual Report details the four pillars of Deepjyoti India Foundation. Each represents coordinates of community resilience.
                </p>
              </div>

              {/* Detailed Domains display */}
              <div className="flex flex-col gap-12" id="programs-detailed-block">
                {PROGRAM_PILLARS.map((p, index) => {
                  const isStoryExpanded = activeStoryPillarId === p.id;

                  return (
                    <div 
                      key={p.id}
                      className={`border-4 border-mhe-charcoal rounded-3xl p-6 md:p-10 ${p.bgColor} shadow-[6px_6px_0px_0px_rgba(28,46,49,1)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative`}
                      id={`detailed-program-${p.id}`}
                    >
                      {/* Column 1: Information summary (7 cols) */}
                      <div className="lg:col-span-7 flex flex-col gap-6">
                        <div className="flex items-center gap-3 border-b-2 border-dashed border-mhe-charcoal pb-4">
                          <div className={`w-12 h-12 rounded-full ${p.color} border-2 border-mhe-charcoal flex items-center justify-center text-white mhe-badge-shadow shrink-0`}>
                            {p.id === 'health' && <HeartPulse className="w-5 h-5 text-white" />}
                            {p.id === 'mental_health' && <Brain className="w-5 h-5 text-white" />}
                            {p.id === 'youth_development' && <Briefcase className="w-5 h-5 text-white" />}
                            {p.id === 'research' && <BookOpen className="w-5 h-5 text-white" />}
                          </div>

                          <div>
                            <span className="text-[11px] font-mono font-extrabold text-mhe-charcoal/80 uppercase">
                              {p.nativeTitle}
                            </span>
                            <h2 className="font-display font-extrabold text-xl md:text-2xl text-mhe-charcoal leading-none">
                              {p.title}
                            </h2>
                          </div>
                        </div>

                        {/* Tagline */}
                        <h3 className="font-display font-bold text-base text-mhe-teal leading-tight">
                          {p.tagline}
                        </h3>

                        <p className="text-sm md:text-base text-black font-sans leading-relaxed">
                          {p.description}
                        </p>

                        {/* List of key initiatives or subPrograms if present */}
                        {p.subPrograms ? (
                          <div className="flex flex-col gap-6 mt-2">
                            <span className="text-[10px] font-mono font-extrabold text-black uppercase tracking-wider border-b-2 border-dashed border-mhe-charcoal/20 pb-2">
                              OUR PROGRAMMES &amp; CORE OUTCOMES
                            </span>
                            <div className="flex flex-col gap-6">
                              {p.subPrograms.map((sub, i) => (
                                <div key={i} className="bg-white/90 border-2 border-mhe-charcoal rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
                                  <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-mhe-orange shrink-0 animate-pulse" />
                                    <h4 className="font-display font-black text-sm md:text-base text-mhe-charcoal uppercase tracking-tight">
                                      {sub.title}
                                    </h4>
                                  </div>
                                  <p className="text-xs md:text-sm text-mhe-charcoal/90 font-sans leading-relaxed">
                                    {sub.description}
                                  </p>
                                  <div className="bg-mhe-orange-light/10 border border-mhe-orange/20 rounded-xl p-3.5 mt-1">
                                    <span className="text-[9px] font-mono font-extrabold text-mhe-orange uppercase tracking-wider block mb-2">
                                      Core Outcomes:
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                      {sub.outcomes.map((outcome, oi) => (
                                        <div key={oi} className="flex items-start gap-2">
                                          <span className="text-mhe-orange font-mono text-xs mt-0.5 shrink-0">✓</span>
                                          <span className="text-xs font-semibold text-mhe-charcoal/85 leading-snug">{outcome}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-mono font-extrabold text-black uppercase tracking-wider">
                              CORE DELIVERABLES &amp; TARGETS
                            </span>
                            <ul className="flex flex-col gap-2">
                              {p.keyInitiatives.map((item, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-xs md:text-sm font-medium text-mhe-charcoal">
                                  <span className={`w-5 h-5 rounded-full ${p.color} text-white border border-mhe-charcoal flex items-center justify-center font-mono font-semibold text-[9px] shrink-0 mt-0.5 shadow-sm`}>
                                    ✓
                                  </span>
                                  <span>
                                    {item.includes(': ') ? (
                                      <>
                                        <strong className="font-extrabold text-mhe-charcoal">{item.split(': ')[0]}:</strong>
                                        {item.substring(item.indexOf(': ') + 1)}
                                      </>
                                    ) : (
                                      item
                                    )}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Column 2: Stats and expand story (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col gap-5 justify-between h-full">
                        {/* Domain Cover Image if available */}
                        {(() => {
                          const associatedDomain = currentGalleryDomains.find(d => d.id === p.id);
                          if (!associatedDomain?.coverImage) return null;
                          return (
                            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-mhe-charcoal bg-mhe-cream relative shadow-sm shrink-0">
                              <img 
                                src={associatedDomain.coverImage} 
                                alt={p.title} 
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          );
                        })()}

                        {/* Interactive stats block */}
                        <div className="bg-white border-2 border-mhe-charcoal p-5 rounded-2xl shadow-inner">
                          <span className="text-[10px] font-mono font-extrabold text-gray-400 block mb-3">PILLAR SPECIFIC MEASURED METRICS</span>
                          <div className="grid grid-cols-3 gap-2">
                            {p.impactStats.map((stat, i) => (
                              <div key={i} className="text-center py-2 bg-mhe-cream border border-mhe-charcoal rounded-xl flex flex-col justify-center">
                                <span className="text-base font-mono font-extrabold text-mhe-orange leading-none">{stat.value}</span>
                                <span className="text-[8px] font-mono leading-tight uppercase font-extrabold text-gray-400 mt-1">{stat.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Expandable case study card */}
                        <div className="border-2 border-mhe-charcoal rounded-2xl bg-white overflow-hidden shadow-sm">
                          <button
                            onClick={() => setActiveStoryPillarId(isStoryExpanded ? null : p.id)}
                            className="w-full px-4 py-3 bg-mhe-cream hover:bg-mhe-teal-light border-b border-mhe-charcoal text-left flex items-center justify-between font-display font-bold text-xs uppercase tracking-wide cursor-pointer focus:outline-none"
                          >
                            <span>Case study: Read Real-Life Narrative</span>
                            <ChevronDown className={`w-4 h-4 transform transition-transform ${isStoryExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          <AnimatePresence initial={false}>
                            {isStoryExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-5 py-4 text-xs md:text-sm text-mhe-charcoal leading-relaxed"
                              >
                                <h4 className="font-display font-extrabold text-sm text-mhe-charcoal mb-1">{p.headlineStory.title}</h4>
                                <p className="text-black font-mono text-[9px] uppercase font-bold mb-2 flex items-center gap-1">
                                  <span>📍 Location:</span>
                                  <span>{p.headlineStory.location}</span>
                                </p>
                                <p className="font-sans text-gray-600 leading-relaxed">{p.headlineStory.body}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        <button
                          onClick={openDonationModal}
                          className="mhe-btn-orange py-3 rounded-full text-xs font-display font-extrabold tracking-wide text-center uppercase cursor-pointer"
                        >
                          Sponsor {p.id === 'health' ? 'Project Sampoorna' : 'OYF'} Operations
                        </button>
                      </div>

                      {/* Photo Section for this domain (12 cols) */}
                      {(() => {
                        const domainPhotos = currentGalleryItems.filter(
                          (item: any) => item.domainId === p.id && item.type === 'photo'
                        );
                        if (domainPhotos.length === 0) return null;
                        return (
                          <div className="lg:col-span-12 border-t-2 border-dashed border-mhe-charcoal/20 pt-6 mt-2 flex flex-col gap-4 text-left">
                            <div className="flex items-center gap-2">
                              <Camera className="w-4 h-4 text-mhe-orange animate-pulse" />
                              <h4 className="font-display font-extrabold text-xs uppercase tracking-wider text-mhe-charcoal">
                                Live Field Gallery — {p.title} Photos
                              </h4>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                              {domainPhotos.map((photo: any, pIdx: number) => (
                                <div 
                                  key={pIdx}
                                  onClick={() => handleOpenProgramPhoto(photo)}
                                  className="group relative bg-white border-2 border-mhe-charcoal rounded-2xl overflow-hidden p-2 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:rotate-1"
                                >
                                  {isAdminLoggedIn && (
                                    <div className="absolute top-3 right-3 bg-mhe-teal border border-mhe-charcoal text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow-sm z-10 flex items-center gap-1 animate-pulse">
                                      <span>✏️</span>
                                      <span>Edit</span>
                                    </div>
                                  )}
                                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                                    <img 
                                      src={photo.url} 
                                      alt={photo.title}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                  <div className="mt-2 text-[10px] font-mono font-bold text-mhe-charcoal leading-tight truncate px-1" title={photo.title}>
                                    {photo.title}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  );
                })}
              </div>

              {/* IMAGE GALLERY SECTION (Pages 45 - 46) */}
              <section className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(28,46,49,1)]">
                <div className="mb-8">
                  <span className="text-[10px] font-mono font-bold text-mhe-orange block uppercase font-extrabold">Field Action Report</span>
                  <h2 className="font-display font-extrabold text-xl md:text-2xl text-mhe-charcoal mt-1 uppercase">Community Operations Gallery</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {currentGalleryItems.slice(0, 6).map((item, index) => (
                    <div 
                      key={index} 
                      onClick={() => {
                        if (isAdminLoggedIn) {
                          handleOpenProgramPhoto(item);
                        } else {
                          setSelectedGalleryItem(item);
                          handleNavChange('gallery');
                        }
                      }}
                      className="group relative border-2 border-mhe-charcoal rounded-xl bg-mhe-cream overflow-hidden shadow-sm flex flex-col cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(28,46,49,1)] transition-all duration-300 hover:translate-y-[-2px] select-none"
                    >
                      <div className="relative aspect-video overflow-hidden bg-mhe-charcoal">
                        {isAdminLoggedIn && (
                          <div className="absolute top-2 right-10 bg-mhe-teal border border-mhe-charcoal text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full shadow-sm z-10 flex items-center gap-1 animate-pulse">
                            <span>✏️</span>
                            <span>Edit</span>
                          </div>
                        )}
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          referrerPolicy="no-referrer"
                          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2 left-2 bg-mhe-teal text-white border border-mhe-charcoal text-[9px] font-mono px-2 py-0.5 rounded-full uppercase">
                          {item.category}
                        </span>
                        
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white border border-mhe-charcoal flex items-center justify-center shadow-sm z-10">
                          {item.type === 'video' ? (
                            <span className="text-[10px]">📽️</span>
                          ) : (
                            <span className="text-[10px]">📸</span>
                          )}
                        </div>
                      </div>
                      <div className="p-3 bg-white border-t border-mhe-charcoal flex-grow flex flex-col justify-between">
                        <h4 className="font-display font-medium text-xs text-mhe-charcoal">{item.title}</h4>
                        <span className="text-[9px] font-mono font-bold text-mhe-teal mt-2 block hover:underline">
                          View in Gallery →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-4 border-t border-dashed border-gray-200 text-center">
                  <button
                    onClick={() => handleNavChange('gallery')}
                    className="mhe-btn-teal px-6 py-2.5 rounded-xl inline-flex items-center gap-2 text-xs cursor-pointer uppercase"
                  >
                    <span>EXPLORE ALL 16 COLLAPSIBLE GALLERIES &amp; VIDEO FILTERS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>

              {/* Program Photo Lightbox Modal */}
              <AnimatePresence>
                {selectedProgramPhoto && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-mhe-charcoal/85 backdrop-blur-sm"
                    onClick={() => {
                      setSelectedProgramPhoto(null);
                      setIsEditingProgramPhoto(false);
                    }}
                  >
                    <motion.div 
                      initial={{ scale: 0.95, y: 15 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.95, y: 15 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                      className="relative w-full max-w-2xl bg-white border-4 border-mhe-charcoal rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(28,46,49,1)] p-5 md:p-7"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button 
                        onClick={() => {
                          setSelectedProgramPhoto(null);
                          setIsEditingProgramPhoto(false);
                        }}
                        className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white border-2 border-mhe-charcoal flex items-center justify-center text-mhe-charcoal hover:bg-mhe-cream cursor-pointer transition-colors shadow-sm font-bold text-sm"
                      >
                        ✕
                      </button>
                      
                      {!isEditingProgramPhoto ? (
                        <>
                          <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border-2 border-mhe-charcoal bg-mhe-cream relative">
                            <img 
                              src={selectedProgramPhoto.url} 
                              alt={selectedProgramPhoto.title}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          
                          <div className="mt-4 flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1 text-left">
                              <span className="text-[10px] font-mono font-bold text-mhe-orange uppercase tracking-wider">
                                {selectedProgramPhoto.category || 'Field Photo'}
                              </span>
                              <h3 className="font-display font-extrabold text-base md:text-lg text-mhe-charcoal leading-snug">
                                {selectedProgramPhoto.title}
                              </h3>
                            </div>
                            
                            {isAdminLoggedIn && (
                              <button
                                onClick={() => setIsEditingProgramPhoto(true)}
                                className="px-3.5 py-1.5 bg-mhe-teal hover:bg-mhe-teal/95 text-white border-2 border-mhe-charcoal rounded-xl text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-transform hover:-translate-y-0.5 shrink-0"
                              >
                                <span>✏️</span>
                                <span>Edit Photo</span>
                              </button>
                            )}
                          </div>
                        </>
                      ) : (
                        <form onSubmit={handleSaveLightboxPhoto} className="flex flex-col gap-4 text-left">
                          <div className="flex items-center justify-between border-b-2 border-dashed border-mhe-charcoal pb-2 mb-2">
                            <h3 className="font-display font-black text-sm uppercase text-mhe-charcoal flex items-center gap-1.5">
                              <span>✏️</span>
                              <span>Edit Field Photo details</span>
                            </h3>
                            <span className="text-[9px] font-mono bg-mhe-orange text-white border border-mhe-charcoal px-2 py-0.5 rounded-full uppercase font-bold">
                              Author Workspace
                            </span>
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Title / Caption*</label>
                            <input
                              type="text"
                              required
                              value={lightboxEditTitle}
                              onChange={(e) => setLightboxEditTitle(e.target.value)}
                              placeholder="Title / Caption"
                              className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl w-full font-medium"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Pillar Domain*</label>
                              <select
                                value={lightboxEditDomain}
                                onChange={(e) => setLightboxEditDomain(e.target.value)}
                                className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream text-sm text-mhe-charcoal font-sans rounded-xl font-bold w-full"
                              >
                                {currentGalleryDomains.map((d) => (
                                  <option key={d.id} value={d.id}>{d.title}</option>
                                ))}
                              </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Category Label*</label>
                              <select
                                value={lightboxEditCategory}
                                onChange={(e) => setLightboxEditCategory(e.target.value)}
                                className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream text-sm text-mhe-charcoal font-sans rounded-xl font-bold w-full"
                              >
                                {currentGalleryCategories.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Media Image File*</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/15">
                              <div className="md:col-span-1">
                                <FileUploader 
                                  accept="image/*"
                                  onUploadSuccess={(url) => setLightboxEditUrl(url)}
                                  label="Upload Photo"
                                  helperText="PNG, JPG, or JPEG"
                                />
                              </div>
                              <div className="md:col-span-1 flex flex-col gap-1.5 justify-center">
                                <label className="text-[10px] font-mono font-bold text-mhe-charcoal uppercase">Remote URL link</label>
                                <input
                                  type="text"
                                  required
                                  value={lightboxEditUrl}
                                  onChange={(e) => setLightboxEditUrl(e.target.value)}
                                  className="px-3 py-1.5 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-xs text-mhe-charcoal font-sans rounded-xl w-full"
                                />
                              </div>
                              <div className="md:col-span-1 flex flex-col items-center justify-center border-2 border-dashed border-mhe-charcoal/20 p-2 rounded-xl bg-mhe-cream/10 h-full min-h-[120px]">
                                <span className="text-[9px] font-mono font-bold uppercase text-gray-400 mb-1">Live Image Preview</span>
                                {lightboxEditUrl ? (
                                  <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-mhe-charcoal bg-mhe-cream relative group shadow-sm">
                                    <img 
                                      src={lightboxEditUrl} 
                                      alt="Preview" 
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover"
                                    />
                                    <button 
                                      type="button"
                                      onClick={() => setLightboxEditUrl('')}
                                      className="absolute top-0.5 right-0.5 bg-rose-600 text-white rounded-full w-4.5 h-4.5 text-[8px] flex items-center justify-center font-bold"
                                      title="Clear Image"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-center text-[10px] font-mono text-gray-400">
                                    No Image Selected
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t-2 border-dashed border-mhe-charcoal/20">
                            <button
                              type="button"
                              onClick={handleDeleteLightboxPhoto}
                              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white border-2 border-mhe-charcoal rounded-xl text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <span>🗑️</span>
                              <span>Delete Photo</span>
                            </button>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => setIsEditingProgramPhoto(false)}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-mhe-charcoal border-2 border-mhe-charcoal rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-5 py-2 bg-mhe-orange hover:bg-mhe-orange/95 text-white border-2 border-mhe-charcoal rounded-xl text-xs font-mono font-bold cursor-pointer shadow-[2px_2px_0px_0px_rgba(28,46,49,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(28,46,49,1)] transition-all"
                              >
                                Save Changes
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* GALLERY VIEW - COLLAPSED BY DOMAINS & VIDEO FILTERS */}
          {activeTab === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-4"
              id="gallery-view-port"
            >
              <GalleryView 
                galleryItems={currentGalleryItems}
                galleryDomains={currentGalleryDomains}
                initialSelectedItem={selectedGalleryItem}
                onClearSelectedItem={() => setSelectedGalleryItem(null)}
                openDonationModal={openDonationModal}
              />
            </motion.div>
          )}

          {/* ABOUT US VIEW - LEADERSHIP, CORE VALUES & TRUST */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-4 flex flex-col gap-12"
              id="about-view-port"
            >
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[10px] font-mono font-bold tracking-widest text-mhe-orange uppercase">
                  DIF Institutional Roots
                </span>
                <h1 className="font-display font-extrabold text-3xl md:text-5xl text-mhe-charcoal tracking-tight mt-1 leading-tight">
                  About DIF &amp; Our Foundations
                </h1>
                <p className="text-sm text-black mt-2 font-sans">
                  Deepjyoti India Foundation was officially established in 2015 to bridge critical gaps: inadequate preventive care access and a lack of structures supporting young minds.
                </p>
              </div>

              {/* Vision and Mission Cards */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-mhe-teal-light border-4 border-mhe-charcoal p-8 rounded-3xl shadow-[5px_5px_0px_0px_#1C2E31] flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-full bg-mhe-teal text-white border border-mhe-charcoal flex items-center justify-center text-lg shadow-sm">
                    👁️
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-mhe-charcoal">Our Vision</h3>
                  <p className="text-sm text-black font-sans leading-relaxed">
                    To enable healthier individuals and communities by enhancing well-being through integrated healthcare, resilient mental health support, and core life-skills. We believe wellbeing is a fundamental human right, not a privilege.
                  </p>
                </div>

                <div className="bg-mhe-orange-light border-4 border-mhe-charcoal p-8 rounded-3xl shadow-[5px_5px_0px_0px_#1C2E31] flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-full bg-mhe-orange text-white border border-mhe-charcoal flex items-center justify-center text-lg shadow-sm">
                    🎯
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-mhe-charcoal">Our Mission</h3>
                  <p className="text-sm text-black font-sans leading-relaxed">
                    To empower individuals and communities by promoting well-being through integrated healthcare, mental health support, and life-skills education before crises emerge.
                  </p>
                </div>
              </section>

              {/* Executive Messages from Taranna Deepjyoti Garg & Ashok Garg (Pages 4, 5, 6) */}
              <section className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(28,46,49,1)] flex flex-col gap-8">
                <div className="border-b border-gray-100 pb-4">
                  <span className="text-[10px] font-mono font-bold text-mhe-orange block uppercase">Founder Epistles</span>
                  <h2 className="font-display font-extrabold text-2xl text-mhe-charcoal">Messages from our Founders</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Taranna card */}
                  <div className="flex flex-col gap-4 border-r-0 lg:border-r border-gray-150 pr-0 lg:pr-8">
                    <div className="flex items-center gap-4">
                      <img 
                        src={currentBoardMembers.find((m: any) => m.name.toLowerCase().includes('taranna'))?.avatar || currentBoardMembers[1]?.avatar} 
                        alt="Taranna Garg"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-full border-2 border-mhe-charcoal object-cover shadow-sm shrink-0"
                      />
                      <div>
                        <h4 className="font-display font-extrabold text-base text-mhe-charcoal leading-tight">Taranna Deepjyoti Garg</h4>
                        <span className="text-xs text-mhe-orange font-mono font-bold uppercase">Founder of DIF</span>
                      </div>
                    </div>
                    <p className="text-xs text-black font-mono italic">
                      "Meaningful social change rarely happens in a straight line. It unfolds through learning, community collaboration, and a deep commitment to listening to the people we serve."
                    </p>
                    <p className="text-xs text-black font-sans leading-relaxed">
                      Our community health initiatives focus heavily on preventive care, screening, and awareness. Data collected during our multi-state camps in rural areas highlight recurring ailments like hypertension, anemia, and diabetes—conditions that are highly preventable with timely engagement.
                    </p>
                    <p className="text-xs text-black font-sans leading-relaxed">
                      Similarly, our Owning Your Feelings (OYF) sessions demonstrate the immense need for emotional literacy. Pre- and post-session assessments show that while immediate awareness increases, sustained mental health requires long-term frameworks and strategic partnerships.
                    </p>
                  </div>

                  {/* Ashok Card */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={currentBoardMembers.find((m: any) => m.name.toLowerCase().includes('ashok'))?.avatar || currentBoardMembers[0]?.avatar} 
                        alt="Ashok Garg"
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-full border-2 border-mhe-charcoal object-cover shadow-sm shrink-0"
                      />
                      <div>
                        <h4 className="font-display font-extrabold text-base text-mhe-charcoal leading-tight">Ashok Garg</h4>
                        <span className="text-xs text-mhe-orange font-mono font-bold uppercase">Founder of DIF</span>
                      </div>
                    </div>
                    <p className="text-xs text-black font-mono italic">
                      "Our journey has been guided by a simple yet enduring belief that true progress in society begins when health, emotional wellbeing, and human dignity are placed at the centre of development."
                    </p>
                    <p className="text-xs text-black font-sans leading-relaxed">
                      I have witnessed with immense pride how DIF translates these values into meaningful grassroots action. From preventive health camps reaching thousands, to mental health programs empowering youth, we treat every milestone as a direct moment that shapes young lives.
                    </p>
                    <p className="text-xs text-black font-sans leading-relaxed">
                      Looking forward, our focus continues to be strengthening impact through deeper community engagement, building strong institutional collaborations, and ensuring that our programs evolve alongside the changing needs of the beautiful communities we serve.
                    </p>
                  </div>
                </div>
              </section>

              {/* Trustees and program director */}
              <section className="bg-mhe-charcoal text-white rounded-3xl p-6 md:p-10 border-4 border-mhe-charcoal relative overflow-hidden" id="governance-trustees">
                <div className="absolute top-[-40px] right-[-30px] w-28 h-28 rounded-full bg-mhe-orange/15" />
                
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4 relative z-10 border-b border-slate-800 pb-6">
                  <div>
                    <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white uppercase">Our Team</h2>
                    <p className="text-xs text-slate-400 mt-1 max-w-xl font-sans">
                      DIF’s staff consists of diagnostics engineers, life-skills coordinators, developmental clinicians, and field supervisors working hand-in-hand. Click on any card to flip and view their bios/quotes.
                    </p>
                  </div>
                </div>

                {/* Grid layout with micro-animations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
                  {currentBoardMembers.map((member, i) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <TeamMemberCard member={member} key={member.name} />
                    </motion.div>
                  ))}

                  {/* Custom 8th card - Interactive Career Referral to Contact Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: currentBoardMembers.length * 0.05 }}
                    className="w-full h-[380px] group cursor-pointer"
                    onClick={navigateToCareers}
                  >
                    <div className="relative w-full h-full rounded-2xl border-2 border-dashed border-mhe-orange/50 bg-gradient-to-b from-slate-900 via-slate-950 to-black p-6 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-mhe-orange hover:shadow-2xl hover:scale-[1.02] text-left">
                      <div className="flex flex-col gap-4">
                        {/* Status / Badge */}
                        <div className="flex items-center justify-between">
                          <span className="bg-mhe-orange/10 text-mhe-orange text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-mhe-orange/20 animate-pulse">
                            ACTIVE RECRUITMENT
                          </span>
                          <span className="text-[10px] font-mono text-slate-500 font-bold">
                            MUMBAI &amp; GUWAHATI
                          </span>
                        </div>

                        {/* Title and Pitch */}
                        <div className="space-y-2 mt-4">
                          <h4 className="font-display font-extrabold text-xl text-white tracking-tight leading-tight group-hover:text-mhe-orange transition-colors">
                            Work with DIF
                          </h4>
                          <p className="text-xs text-slate-400 font-sans leading-relaxed">
                            We are actively seeking diagnostic engineers, life-skills coordinators, emotional counselors, and field supervisors to strengthen community clinical hubs.
                          </p>
                        </div>

                        {/* Position quick references */}
                        <div className="space-y-1.5 pt-3">
                          <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">OPEN ROLES</div>
                          <div className="flex flex-wrap gap-1.5">
                            {['Diagnostic Exec', 'OYF Facilitator', 'CSR Operations'].map((role) => (
                              <span key={role} className="bg-slate-800/80 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700/50">
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Call-to-Action section */}
                      <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
                        <div 
                          className="flex items-center justify-between text-xs text-mhe-orange font-mono font-bold group-hover:translate-x-1 transition-all bg-mhe-orange/10 hover:bg-mhe-orange hover:text-white px-3 py-2 rounded-xl border border-mhe-orange/20 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToCareers();
                          }}
                        >
                          <span>Apply / Contact Us</span>
                          <span className="text-sm font-sans">➔</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500 block uppercase tracking-wider text-center">
                          Click to open career inquiry form
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Certifications Card layout (Page 40) */}
              <section className="bg-[#FCF7E6] border-4 border-mhe-charcoal rounded-3xl p-6 md:p-10 shadow-[6px_6px_0px_0px_#1C2E31]">
                <div className="mb-8">
                  <span className="text-[10px] font-mono font-bold text-mhe-orange block uppercase tracking-wider font-extrabold">Audits &amp; Compliances</span>
                  <h2 className="font-display font-extrabold text-xl md:text-2xl text-mhe-charcoal mt-1">Official NGO Certifications</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CERTIFICATIONS.map((cert, index) => {
                    const colors = [
                      'bg-mhe-teal-light',
                      'bg-mhe-orange-light',
                      'bg-[#FCF7E6]',
                      'bg-[#EBF7F4]'
                    ];
                    const bgClass = colors[index % colors.length];
                    return (
                      <div key={index} className={`${bgClass} border-2 border-mhe-charcoal p-5 rounded-2xl flex flex-col gap-2 relative shadow-[3px_3px_0px_0px_rgba(28,46,49,1)] transition-transform hover:scale-[1.02] duration-200`}>
                        <div className="w-8 h-8 rounded-full bg-mhe-yellow leading-none font-bold font-mono text-xs text-mhe-charcoal border-2 border-mhe-charcoal flex items-center justify-center shadow-sm">
                          {index + 1}
                        </div>
                        <h4 className="font-display font-bold text-sm text-mhe-charcoal mt-2">{cert.title}</h4>
                        <p className="text-xs text-gray-600 font-sans leading-relaxed">{cert.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {/* FINANCIALS TAB (Page 42) */}
          {activeTab === 'financials' && (
            <motion.div
              key="financials"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-4 flex flex-col gap-12"
              id="financials-view-port"
            >
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[10px] font-mono font-bold text-mhe-orange uppercase tracking-wider block font-extrabold">Audit and Ledger transparency</span>
                <h1 className="font-display font-extrabold text-3xl md:text-5xl text-mhe-charcoal mt-1">Audited Financial Statement</h1>
                <p className="text-sm text-black mt-2 font-sans">
                  Deepjyoti India Foundation ensures absolute financial integrity. Compare audited and unaudited reports for Year-on-Year metrics (2024–2026), amounts in Indian Rupees (₹).
                </p>
              </div>

              {/* Fiscal Comparison Bar Chart Card */}
              <section className="bg-mhe-charcoal text-white rounded-3xl p-6 md:p-10 border-4 border-mhe-charcoal shadow-[6px_6px_0px_0px_rgba(28,46,49,1)] flex flex-col gap-8">
                <div>
                  <span className="text-[10px] font-mono font-bold text-mhe-yellow block uppercase">Audit summary ledger</span>
                  <h3 className="font-display font-extrabold text-lg text-white mt-1">Year-on-Year Expenditure Reduction</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Custom Visual Bar Chart */}
                  <div className="lg:col-span-8 flex flex-col gap-5">
                    <p className="text-xs font-mono text-gray-400">INCOME VS EXPENDITURE TRENDS (INR ₹)</p>
                    
                    {/* FY 2024 Row */}
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono bg-mhe-yellow text-mhe-charcoal px-2 py-0.5 rounded font-black">FY 2024 (Audited)</span>
                      </div>
                      <div className="flex gap-4 items-center">
                        {/* Income bar */}
                        <div className="w-full flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-gray-400">Income: ₹3,53,603</span>
                          <div className="h-6 bg-mhe-teal border border-mhe-charcoal rounded-md" style={{ width: '20%' }} />
                        </div>
                        {/* Expenditure Bar */}
                        <div className="w-full flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-gray-400">Expenditure: ₹18,08,988</span>
                          <div className="h-6 bg-mhe-orange border border-mhe-charcoal rounded-md" style={{ width: '100%' }} />
                        </div>
                      </div>
                    </div>

                    {/* FY 2025 Row */}
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono bg-mhe-yellow text-mhe-charcoal px-2 py-0.5 rounded font-black">FY 2025 (Unaudited)</span>
                      </div>
                      <div className="flex gap-4 items-center">
                        {/* Income bar */}
                        <div className="w-full flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-gray-400">Income: ₹2,63,846</span>
                          <div className="h-6 bg-mhe-teal border border-mhe-charcoal rounded-md" style={{ width: '15%' }} />
                        </div>
                        {/* Expenditure Bar */}
                        <div className="w-full flex flex-col gap-1">
                          <span className="text-[10px] font-mono text-gray-400">Expenditure: ₹7,21,302</span>
                          <div className="h-6 bg-mhe-orange border border-mhe-charcoal rounded-md" style={{ width: '40%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Visual highlights of savings */}
                  <div className="lg:col-span-4 bg-white/10 border border-gray-700 p-6 rounded-2xl flex flex-col justify-center text-center">
                    <span className="text-3xl mb-1 flex justify-center">🎯</span>
                    <span className="text-xs font-mono text-mhe-yellow uppercase font-bold tracking-widest block">Year Over Year Deficit</span>
                    <h3 className="text-3xl font-mono font-black text-white mt-1">67% SMALLER</h3>
                    <p className="text-[11px] text-gray-400 font-sans mt-2 leading-relaxed">
                      Strategic reductions in other events and administrative honoraria let DIF shrink fiscal deficits over audited year-on-year calculations.
                    </p>
                  </div>
                </div>
              </section>

              {/* Strict Audit Table from page 42 */}
              <section className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(28,46,49,1)] overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-mhe-charcoal bg-mhe-teal-light">
                      <th className="p-4 font-display font-extrabold text-sm text-mhe-charcoal">Particulars</th>
                      <th className="p-4 font-mono font-bold text-sm text-mhe-charcoal text-right">FY 2024 (Audited)</th>
                      <th className="p-4 font-mono font-bold text-sm text-mhe-charcoal text-right">FY 2025 (Unaudited)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td className="p-4 font-sans font-bold text-xs text-mhe-teal" colSpan={3}>A. INCOME STATEMENT</td>
                    </tr>
                    <tr className="border-b border-gray-100 text-xs">
                      <td className="p-4 font-semibold text-gray-700">Grants &amp; Donations Received</td>
                      <td className="p-4 font-mono text-right">₹3,53,603</td>
                      <td className="p-4 font-mono text-right">₹2,63,846</td>
                    </tr>
                    <tr className="border-b-2 border-mhe-charcoal text-xs bg-mhe-cream">
                      <td className="p-4 font-extrabold text-mhe-charcoal">TOTAL INCOME STATEMENT</td>
                      <td className="p-4 font-mono font-extrabold text-right">₹3,53,603</td>
                      <td className="p-4 font-mono font-extrabold text-right">₹2,63,846</td>
                    </tr>

                    <tr className="bg-gray-50 border-b border-gray-200">
                      <td className="p-4 font-sans font-bold text-xs text-mhe-orange" colSpan={3}>B. EXPENDITURE STATEMENT</td>
                    </tr>
                    <tr className="border-b border-gray-100 text-xs">
                      <td className="p-4 text-gray-700 font-semibold">Health Camp Programme Expenses</td>
                      <td className="p-4 font-mono text-right">₹2,35,870</td>
                      <td className="p-4 font-mono text-right text-gray-400">—</td>
                    </tr>
                    <tr className="border-b border-gray-100 text-xs">
                      <td className="p-4 text-gray-700 font-semibold">Youth &amp; Career Guidance Expenses</td>
                      <td className="p-4 font-mono text-right">₹41,950</td>
                      <td className="p-4 font-mono text-right text-gray-400">—</td>
                    </tr>
                    <tr className="border-b border-gray-100 text-xs text-gray-700">
                      <td className="p-4 font-semibold">Other Events &amp; Project Expenses</td>
                      <td className="p-4 font-mono text-right">₹7,42,771</td>
                      <td className="p-4 font-mono text-right">₹3,45,200</td>
                    </tr>
                    <tr className="border-b border-gray-100 text-xs text-gray-700">
                      <td className="p-4 font-semibold">Staff &amp; Volunteer Honoraria</td>
                      <td className="p-4 font-mono text-right">₹5,67,913</td>
                      <td className="p-4 font-mono text-right">₹3,71,000</td>
                    </tr>
                    <tr className="border-b border-gray-100 text-xs text-gray-700">
                      <td className="p-4 font-semibold">Travel &amp; Field Operations</td>
                      <td className="p-4 font-mono text-right">₹13,060</td>
                      <td className="p-4 font-mono text-right text-gray-400">—</td>
                    </tr>
                    <tr className="border-b border-gray-100 text-xs text-gray-700">
                      <td className="p-4 font-semibold">Administrative &amp; Office Expenses</td>
                      <td className="p-4 font-mono text-right">₹77,924</td>
                      <td className="p-4 font-mono text-right">₹102</td>
                    </tr>
                    <tr className="border-b border-gray-100 text-xs text-gray-700">
                      <td className="p-4 font-semibold">Professional &amp; Audit Fees</td>
                      <td className="p-4 font-mono text-right">₹1,29,500</td>
                      <td className="p-4 font-mono text-right">₹5,000</td>
                    </tr>
                    <tr className="border-b-2 border-mhe-charcoal text-xs bg-mhe-cream">
                      <td className="p-4 font-extrabold text-mhe-charcoal">TOTAL EXPENDITURE LEDGER</td>
                      <td className="p-4 font-mono font-extrabold text-right">₹18,08,988</td>
                      <td className="p-4 font-mono font-extrabold text-right">₹7,21,302</td>
                    </tr>

                    <tr className="text-xs bg-red-50">
                      <td className="p-4 font-sans font-bold text-red-700">NET SURPLUS / (DEFICIT)</td>
                      <td className="p-4 font-mono font-bold text-right text-red-700">(₹14,55,385)</td>
                      <td className="p-4 font-mono font-bold text-right text-red-700">(₹4,57,456)</td>
                    </tr>
                  </tbody>
                </table>
              </section>

              {/* Partners mention cloud representing pages 41 */}
              <section className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(28,46,49,1)]">
                <div className="text-center max-w-xl mx-auto mb-10">
                  <span className="text-[10px] font-mono font-bold text-mhe-orange block uppercase tracking-wider font-extrabold">Public Recognition</span>
                  <h3 className="font-display font-extrabold text-xl md:text-2xl text-mhe-charcoal mt-1">Our Trusted Partners</h3>
                  <p className="text-xs text-black mt-1">DIF initiatives are recognized by institutions, educational centers, and healthcare medical divisions across Northeast India.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" id="partners-mention-cloud">
                  {PARTNERS.map((partner, index) => {
                    const partnerBgColors = [
                      'bg-mhe-teal-light hover:bg-[#CBE0DD]',
                      'bg-mhe-orange-light hover:bg-[#FDD5C6]',
                      'bg-[#FCF7E6] hover:bg-[#F4E8BE]',
                      'bg-[#EBF7F4] hover:bg-[#C9ECE1]'
                    ];
                    const bgClass = partnerBgColors[index % partnerBgColors.length];
                    return (
                      <div key={index} className={`${bgClass} border-2 border-mhe-charcoal rounded-xl py-3 px-4 text-center text-xs font-display font-bold flex items-center justify-center mhe-badge-shadow transition-colors duration-200 cursor-default`}>
                        {partner}
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {/* TESTIMONIALS VIEW - PAGES 43 & 44 */}
          {activeTab === 'testimonials' && (
            <motion.div
              key="testimonials"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-4 flex flex-col gap-12"
              id="testimonials-view-port"
            >
              <div className="text-center max-w-3xl mx-auto">
                <span className="text-[10px] font-mono font-bold text-mhe-orange block uppercase tracking-wider font-extrabold">Ground Truth Testimony</span>
                <h1 className="font-display font-extrabold text-3xl md:text-5xl text-mhe-charcoal mt-1">Voices from the Field</h1>
                <p className="text-sm text-black mt-2 font-sans">
                  The true value of Deepjyoti India Foundation are the students, teachers, and rural women who find resilience and safety through our direct programs.
                </p>
              </div>

              {/* Grid Layout of testimonials */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start" id="testimonials-full-grid">
                {currentTestimonials.map((testimony, index) => {
                  const colors = [
                    'bg-mhe-teal-light',
                    'bg-mhe-orange-light',
                    'bg-[#FCF7E6]',
                    'bg-[#EBF7F4]'
                  ];
                  const bgClass = colors[index % colors.length];
                  return (
                    <div key={testimony.id} className={`${bgClass} border-4 border-mhe-charcoal p-6 md:p-8 rounded-3xl relative mhe-card-shadow flex flex-col justify-between transition-all duration-300`}>
                      <span className="text-5xl text-mhe-teal opacity-10 absolute top-4 right-6 font-display">“</span>
                      <div>
                        {/* Title of location */}
                        <span className="text-[9px] font-mono bg-white text-mhe-charcoal px-2.5 py-0.5 rounded-full font-black uppercase inline-block mb-4 border border-mhe-charcoal shadow-sm">
                          {testimony.location}
                        </span>
                        
                        <p className="text-xs md:text-sm text-black leading-relaxed font-sans italic">
                          "{testimony.text}"
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t-2 border-dashed border-mhe-charcoal/20 flex items-center gap-3">
                        {testimony.imageUrl ? (
                          <img 
                            src={testimony.imageUrl} 
                            alt={testimony.author}
                            referrerPolicy="no-referrer"
                            className="w-10 h-10 rounded-full object-cover border-2 border-mhe-charcoal shadow-sm shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white text-mhe-charcoal font-sans text-xs flex items-center justify-center border-2 border-mhe-charcoal shadow-sm shrink-0">
                            👤
                          </div>
                        )}
                        <div>
                          <h4 className="font-display font-bold text-xs text-mhe-charcoal leading-none">{testimony.author}</h4>
                          <span className="text-[9px] text-gray-400 font-mono tracking-wide">{testimony.location.split(',')[1] || testimony.location}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            </motion.div>
          )}

          {/* GET INVOLVED VIEW - FORM AND MATCHMAKER */}
          {activeTab === 'get-involved' && (
            <motion.div
              key="get-involved"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-4 flex flex-col gap-12"
              id="get-involved-view-port"
            >
              {/* Involved Banner */}
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-[10px] font-mono font-bold tracking-widest text-mhe-orange uppercase">
                  Join the Fellowship
                </span>
                <h1 className="font-display font-extrabold text-3xl md:text-5xl text-mhe-charcoal tracking-tight mt-1 leading-tight">
                  Get Involved Today
                </h1>
                <p className="text-sm text-black mt-2 font-sans overflow-hidden animate-slideUp">
                  We are constantly looking for clinicians, educators, emotional literacy volunteers, and donation ambassadors to help expand our network.
                </p>
              </div>

              {/* Sub-tabs for Volunteer, Careers and Inquiries */}
              <div className="flex justify-center border-b-2 border-slate-200/60 max-w-xl mx-auto -mt-6" id="get-involved-subtabs-row">
                <button 
                  onClick={() => setGetInvolvedSubTab('volunteer')}
                  className={`px-6 sm:px-8 py-3 text-sm font-mono font-bold tracking-wider relative cursor-pointer outline-none transition-colors ${
                    getInvolvedSubTab === 'volunteer' ? 'text-mhe-orange' : 'text-gray-400 hover:text-mhe-charcoal'
                  }`}
                >
                  <span>VOLUNTEER</span>
                  {getInvolvedSubTab === 'volunteer' && (
                    <motion.div 
                      layoutId="getInvolvedActiveTab" 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-mhe-orange rounded-full" 
                    />
                  )}
                </button>
                <button 
                  onClick={() => setGetInvolvedSubTab('careers')}
                  className={`px-6 sm:px-8 py-3 text-sm font-mono font-bold tracking-wider relative cursor-pointer outline-none transition-colors ${
                    getInvolvedSubTab === 'careers' ? 'text-mhe-orange' : 'text-gray-400 hover:text-mhe-charcoal'
                  }`}
                >
                  <span>CAREERS</span>
                  {getInvolvedSubTab === 'careers' && (
                    <motion.div 
                      layoutId="getInvolvedActiveTab" 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-mhe-orange rounded-full" 
                    />
                  )}
                </button>
                <button 
                  onClick={() => setGetInvolvedSubTab('inquiry')}
                  className={`px-6 sm:px-8 py-3 text-sm font-mono font-bold tracking-wider relative cursor-pointer outline-none transition-colors ${
                    getInvolvedSubTab === 'inquiry' ? 'text-mhe-orange' : 'text-gray-400 hover:text-mhe-charcoal'
                  }`}
                >
                  <span>INQUIRIES</span>
                  {getInvolvedSubTab === 'inquiry' && (
                    <motion.div 
                      layoutId="getInvolvedActiveTab" 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-mhe-orange rounded-full" 
                    />
                  )}
                </button>
              </div>

              {getInvolvedSubTab === 'volunteer' ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  id="volunteer-form-container"
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 border-t-[8px] border-t-[#4A8CD2] max-w-4xl mx-auto w-full p-6 md:p-10 text-left relative overflow-hidden"
                >
                  <p className="text-center font-sans text-sm md:text-base text-black pb-6 mb-8 mt-1 border-b border-dashed border-gray-100 leading-relaxed">
                    Join hands with us to bring healthcare, education, and empowerment to those who need it most.
                  </p>

                  {!volunteerMatchResult ? (
                    /* High-fidelity Volunteer Form */
                    <form onSubmit={handleVolunteerSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-1 block">Full Name*</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#bc5a4b]" />
                            <input 
                              type="text" 
                              required
                              value={volunteerName}
                              onChange={(e) => setVolunteerName(e.target.value)}
                              placeholder="Enter your full name"
                              className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 text-sm font-sans placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 focus:border-[#4A8CD2] transition-all"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-1 block">Email*</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#bc5a4b]" />
                            <input 
                              type="email" 
                              required
                              value={volunteerEmail}
                              onChange={(e) => setVolunteerEmail(e.target.value)}
                              placeholder="example@email.com"
                              className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 text-sm font-sans placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 focus:border-[#4A8CD2] transition-all"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-1 block">Phone*</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#bc5a4b]" />
                            <input 
                              type="tel" 
                              required
                              value={volunteerPhone}
                              onChange={(e) => setVolunteerPhone(e.target.value)}
                              placeholder="Enter your phone number"
                              className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 text-sm font-sans placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 focus:border-[#4A8CD2] transition-all"
                            />
                          </div>
                        </div>

                        {/* Country/Region */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-1 block">Country/Region*</label>
                          <div className="relative">
                            <select 
                              value={volunteerCountry}
                              onChange={(e) => setVolunteerCountry(e.target.value)}
                              className="px-4 py-3 w-full rounded-lg border border-gray-300 text-sm font-sans text-gray-700 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 focus:border-[#4A8CD2] transition-all pr-10"
                            >
                              <option value="India">India</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Sri Lanka">Sri Lanka</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Other">Other</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-1 block">Address*</label>
                        <input 
                          type="text" 
                          required
                          value={volunteerAddress}
                          onChange={(e) => setVolunteerAddress(e.target.value)}
                          placeholder="Enter your street address"
                          className="px-4 py-3 w-full rounded-lg border border-gray-300 text-sm font-sans placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 focus:border-[#4A8CD2] transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* City */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-1 block">City*</label>
                          <input 
                            type="text" 
                            required
                            value={volunteerCity}
                            onChange={(e) => setVolunteerCity(e.target.value)}
                            placeholder="Enter your city"
                            className="px-4 py-3 w-full rounded-lg border border-gray-300 text-sm font-sans placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 focus:border-[#4A8CD2] transition-all"
                          />
                        </div>

                        {/* Zip / Postal Code */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-1 block">Zip / Postal Code*</label>
                          <input 
                            type="text" 
                            required
                            value={volunteerZip}
                            onChange={(e) => setVolunteerZip(e.target.value)}
                            placeholder="Enter your postal code"
                            className="px-4 py-3 w-full rounded-lg border border-gray-300 text-sm font-sans placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 focus:border-[#4A8CD2] transition-all"
                          />
                        </div>
                      </div>

                      {/* Area of Interest */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-3 block">Area of Interest*</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-4">
                          {[
                            'Health camps',
                            'Mental health workshops',
                            'Fundraising',
                            'Social media',
                            'Photography',
                            'Teaching'
                          ].map((interest) => {
                            const isChecked = volunteerInterests.includes(interest);
                            return (
                              <label key={interest} className="flex items-center gap-3 cursor-pointer select-none">
                                <input 
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => handleInterestToggle(interest)}
                                  className="w-4 h-4 text-[#4A8CD2] border-gray-300 rounded focus:ring-[#4A8CD2] cursor-pointer"
                                />
                                <span className="text-sm font-sans text-gray-600">{interest}</span>
                              </label>
                            );
                          })}
                        </div>
                      </div>

                      {/* Relevant Skills or Experience */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-1 block">Relevant Skills or Experience (optional)</label>
                        <textarea 
                          rows={4}
                          value={volunteerSkillsExperience}
                          onChange={(e) => setVolunteerSkillsExperience(e.target.value)}
                          placeholder="Tell us about your skills"
                          className="px-4 py-3 w-full rounded-lg border border-gray-300 text-sm font-sans placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 focus:border-[#4A8CD2] transition-all"
                        />
                      </div>

                      {/* Availability */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-3 block">Availability*</label>
                        <div className="flex flex-wrap gap-6">
                          {['Weekdays', 'Weekends', 'Flexible'].map((type) => (
                            <label key={type} className="flex items-center gap-2.5 cursor-pointer select-none">
                              <input 
                                type="radio"
                                name="volunteerAvailability"
                                value={type}
                                checked={volunteerAvailability === type}
                                onChange={() => setVolunteerAvailability(type)}
                                className="w-4 h-4 text-[#4A8CD2] border-gray-300 focus:ring-[#4A8CD2] cursor-pointer"
                              />
                              <span className="text-sm font-sans text-gray-600">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Anything else you would like to share */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-sans font-semibold text-[#bc5a4b] mb-1 block">Anything else you would like to share? (optional)</label>
                        <textarea 
                          rows={4}
                          value={volunteerAdditional}
                          onChange={(e) => setVolunteerAdditional(e.target.value)}
                          placeholder="Any additional information"
                          className="px-4 py-3 w-full rounded-lg border border-gray-300 text-sm font-sans placeholder-gray-400 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 focus:border-[#4A8CD2] transition-all"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={submittingVolunteer}
                        className="bg-[#4A8CD2] hover:bg-[#3D7EC5] text-white py-3.5 rounded-lg text-sm font-sans font-bold tracking-widest uppercase cursor-pointer transition-colors disabled:opacity-50 w-full mt-4"
                      >
                        {submittingVolunteer ? 'SUBMITTING...' : 'SUBMIT'}
                      </button>
                    </form>
                  ) : (
                    /* Success outcome matching profile */
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-200 p-6 md:p-8 rounded-2xl text-center flex flex-col gap-5 items-center max-w-lg mx-auto shadow-sm"
                      id="volunteer-matchmaker-outcome"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center text-2xl shadow-md">
                        ✓
                      </div>

                      <div>
                        <h3 className="font-sans font-bold text-xl text-gray-800 leading-tight">Thank you, {volunteerName}!</h3>
                        <p className="text-xs text-emerald-600 mt-1.5 font-sans font-semibold uppercase tracking-wider">Application Received Successfully</p>
                      </div>

                      <div className="bg-white border border-gray-150 p-5 rounded-xl w-full text-left">
                        <span className="text-[10px] font-sans font-bold text-gray-400 block mb-1 uppercase tracking-wider">RECOMMENDED ROLE DETECTED</span>
                        <span className="font-sans font-bold text-base text-[#bc5a4b] block mb-2">{volunteerMatchResult}</span>
                        <p className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed">
                          We appreciate your interest in supporting DIF. Your registration details has been copied directly to <strong>contact@dif-sampoorna.ngo</strong>. Our coordinating desks in Mumbai &amp; Guwahati will reach out to you within 2 business days at <strong>{volunteerEmail}</strong> with details on orientation and current program slots matching your <strong>{volunteerAvailability}</strong> availability!
                        </p>
                      </div>

                      <button 
                        onClick={() => {
                          setVolunteerMatchResult(null);
                          setVolunteerName('');
                          setVolunteerEmail('');
                          setVolunteerPhone('');
                          setVolunteerAddress('');
                          setVolunteerCity('');
                          setVolunteerZip('');
                          setVolunteerInterests([]);
                          setVolunteerSkillsExperience('');
                          setVolunteerAdditional('');
                        }}
                        className="bg-white border border-gray-300 text-gray-700 font-sans text-xs font-bold px-5 py-2.5 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#4A8CD2]/40 transition-colors cursor-pointer"
                      >
                        Submit Another Volunteer Application
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ) : getInvolvedSubTab === 'careers' ? (
                /* High-fidelity Careers Section (aligns perfectly with user screenshot) */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  id="careers-form-container"
                  className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-10 mhe-card-shadow max-w-4xl mx-auto w-full text-left"
                >
                  <p className="text-center text-black font-sans text-sm md:text-base border-b-2 border-dashed border-slate-100 pb-6 mb-8 mt-1">
                    Be part of a team working for health, empowerment, and social change across India.
                  </p>

                  {!careerSubmitted ? (
                    <form onSubmit={handleCareerSubmit} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Full Name */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Full Name*</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-[18px] text-mhe-orange" />
                            <input 
                              type="text" 
                              required
                              value={careerName}
                              onChange={(e) => setCareerName(e.target.value)}
                              placeholder="Enter your full name"
                              className="pl-11 pr-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                            />
                          </div>
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Email*</label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-[18px] text-mhe-orange" />
                            <input 
                              type="email" 
                              required
                              value={careerEmail}
                              onChange={(e) => setCareerEmail(e.target.value)}
                              placeholder="example@email.com"
                              className="pl-11 pr-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                            />
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Phone*</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-[18px] text-mhe-orange" />
                            <input 
                              type="tel" 
                              required
                              value={careerPhone}
                              onChange={(e) => setCareerPhone(e.target.value)}
                              placeholder="Enter your phone number"
                              className="pl-11 pr-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                            />
                          </div>
                        </div>

                        {/* Country/Region */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Country/Region*</label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mhe-orange" />
                            <select 
                              value={careerCountry}
                              onChange={(e) => setCareerCountry(e.target.value)}
                              className="pl-11 pr-10 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal appearance-none font-sans font-medium"
                            >
                              <option value="India">India</option>
                              <option value="Nepal">Nepal</option>
                              <option value="Bangladesh">Bangladesh</option>
                              <option value="Sri Lanka">Sri Lanka</option>
                              <option value="Bhutan">Bhutan</option>
                              <option value="Other">Other</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-mhe-charcoal pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Address*</label>
                        <input 
                          type="text" 
                          required
                          value={careerAddress}
                          onChange={(e) => setCareerAddress(e.target.value)}
                          placeholder="Enter your street address"
                          className="px-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* City */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">City*</label>
                          <input 
                            type="text" 
                            required
                            value={careerCity}
                            onChange={(e) => setCareerCity(e.target.value)}
                            placeholder="Enter your city"
                            className="px-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                          />
                        </div>

                        {/* Zip/Postal */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Zip / Postal Code*</label>
                          <input 
                            type="text" 
                            required
                            value={careerZip}
                            onChange={(e) => setCareerZip(e.target.value)}
                            placeholder="Enter your postal code"
                            className="px-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Subject (Choose one)*</label>
                        <div className="flex gap-8 mt-1 flex-wrap">
                          <label className="flex items-center gap-2.5 cursor-pointer font-sans text-sm text-mhe-charcoal font-bold">
                            <input 
                              type="radio" 
                              name="careerSubject" 
                              checked={careerSubject === 'Job Application'} 
                              onChange={() => setCareerSubject('Job Application')} 
                              className="w-4.5 h-4.5 accent-mhe-orange text-mhe-orange border-2 border-mhe-charcoal focus:ring-0 cursor-pointer"
                            />
                            <span>Job Application</span>
                          </label>
                          <label className="flex items-center gap-2.5 cursor-pointer font-sans text-sm text-mhe-charcoal font-bold">
                            <input 
                              type="radio" 
                              name="careerSubject" 
                              checked={careerSubject === 'Internship Application'} 
                              onChange={() => setCareerSubject('Internship Application')} 
                              className="w-4.5 h-4.5 accent-mhe-orange text-mhe-orange border-2 border-mhe-charcoal focus:ring-0 cursor-pointer"
                            />
                            <span>Internship Application</span>
                          </label>
                        </div>
                      </div>

                      {/* Position/Role Text */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Position/Role Applied For/Why do you want to work with us?*</label>
                        <textarea 
                          rows={3}
                          required
                          value={careerRoleText}
                          onChange={(e) => setCareerRoleText(e.target.value)}
                          placeholder="e.g., 'Project Manager' or 'Internship in Marketing'"
                          className="px-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white font-sans text-mhe-charcoal"
                        />
                      </div>

                      {/* Resume / CV upload */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Upload Resume/CV (PDF or Word)*</label>
                        <div 
                          className="p-8 border-2 border-dashed border-slate-400 hover:border-mhe-orange rounded-xl bg-mhe-cream/50 hover:bg-white cursor-pointer transition-colors flex flex-col items-center justify-center gap-3 relative text-center group"
                          onClick={() => document.getElementById('career-file-input')?.click()}
                        >
                          <input 
                            type="file" 
                            id="career-file-input" 
                            className="hidden" 
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setCareerFileName(e.target.files[0].name);
                              }
                            }}
                          />
                          <Upload className="w-8 h-8 text-mhe-teal group-hover:scale-110 transition-transform duration-200" />
                          <div>
                            <span className="text-xs font-sans text-gray-600 block">
                              {careerFileName ? (
                                <span className="text-mhe-teal font-extrabold bg-mhe-teal-light border-2 border-mhe-teal/40 px-3.5 py-2 rounded-lg inline-block font-mono max-w-sm truncate shadow-[2px_2px_0px_0px_#1C2E31]">
                                  📎 {careerFileName}
                                </span>
                              ) : (
                                <>
                                  <span className="text-mhe-orange hover:underline font-bold">Upload a file</span> or drag and drop
                                </>
                              )}
                            </span>
                            {!careerFileName && <span className="text-[10px] text-gray-400 font-mono block mt-1 uppercase tracking-wider">PDF, DOC, DOCX up to 10MB</span>}
                          </div>
                        </div>
                      </div>

                      {/* LinkedIn Profile */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">LinkedIn Profile (optional)</label>
                        <div className="relative">
                          <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-[18px] text-mhe-orange" />
                          <input 
                            type="url" 
                            value={careerLinkedIn}
                            onChange={(e) => setCareerLinkedIn(e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="pl-11 pr-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                          />
                        </div>
                      </div>

                      {/* Availability */}
                      <div className="flex flex-col gap-2">
                        <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Availability*</label>
                        <div className="flex gap-8 mt-1 flex-wrap">
                          {['Part time', 'Full time', 'Internship'].map((avail) => (
                            <label key={avail} className="flex items-center gap-2.5 cursor-pointer font-sans text-sm text-mhe-charcoal font-bold">
                              <input 
                                type="radio" 
                                name="careerAvailability" 
                                checked={careerAvailability === avail} 
                                onChange={() => setCareerAvailability(avail)} 
                                className="w-4.5 h-4.5 accent-mhe-orange text-mhe-orange border-2 border-mhe-charcoal focus:ring-0 cursor-pointer"
                              />
                              <span>{avail}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Additional share */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Anything else you would like to share? (optional)</label>
                        <textarea 
                          rows={3}
                          value={careerAdditional}
                          onChange={(e) => setCareerAdditional(e.target.value)}
                          placeholder="Any additional information"
                          className="px-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white font-sans text-mhe-charcoal"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={careerIsSubmitting}
                        className="mhe-btn-orange w-full py-3.5 rounded-xl text-xs uppercase flex items-center justify-center gap-2 font-extrabold cursor-pointer disabled:opacity-50 mt-4 tracking-wider"
                      >
                        {careerIsSubmitting ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                            <span>submitting application...</span>
                          </>
                        ) : (
                          <span>Submit Application</span>
                        )}
                      </button>
                    </form>
                  ) : (
                    /* Submission success view */
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-mhe-teal-light border-4 border-mhe-charcoal p-6 md:p-10 rounded-2xl text-center flex flex-col gap-6 items-center mhe-card-shadow"
                    >
                      <div className="w-16 h-16 rounded-full bg-mhe-yellow border-4 border-mhe-charcoal flex items-center justify-center text-mhe-charcoal text-3xl mhe-badge-shadow">
                        ✓
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-display font-extrabold text-2xl text-mhe-charcoal leading-tight">Position Request Logged!</h3>
                        <p className="text-xs text-mhe-orange font-mono uppercase font-bold tracking-wider">CAREER DOSSIER RECEIVED</p>
                      </div>

                      <div className="bg-white border-2 border-mhe-charcoal p-6 rounded-xl w-full text-left space-y-4 shadow-sm">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-gray-400 block">APPLICANT</span>
                          <span className="font-display font-extrabold text-base text-mhe-charcoal block">{careerName}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                          <div>
                            <span className="text-[10px] font-mono font-bold text-gray-400 block">TYPE</span>
                            <span className="font-sans font-bold text-xs text-mhe-teal uppercase">{careerSubject}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-bold text-gray-400 block">AVAILABILITY</span>
                            <span className="font-sans font-bold text-xs text-mhe-teal uppercase">{careerAvailability}</span>
                          </div>
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                          <span className="text-[10px] font-mono font-bold text-gray-400 block">APPLICATION SUMMARY</span>
                          <p className="text-xs text-gray-600 font-sans leading-relaxed mt-1">
                            Our team in Guwahati and Mumbai will review your application doc copy dispatched to <strong>contact@dif-sampoorna.ngo</strong> (including your uploaded <strong>{careerFileName || 'Resume'}</strong>) and we will get back to you within 5 business days at <strong>{careerEmail}</strong>.
                          </p>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          setCareerSubmitted(false);
                          setCareerName('');
                          setCareerEmail('');
                          setCareerPhone('');
                          setCareerAddress('');
                          setCareerCity('');
                          setCareerZip('');
                          setCareerRoleText('');
                          setCareerFileName(null);
                          setCareerLinkedIn('');
                          setCareerAvailability('Full time');
                          setCareerAdditional('');
                        }}
                        className="mhe-btn-outline px-6 py-2.5 rounded-xl text-xs uppercase font-extrabold"
                      >
                        Submit another application
                      </button>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                /* Inquiry/Contact Form Section with gorgeous 2-column layout */
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  id="inquiry-form-container"
                  className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-8 mhe-card-shadow max-w-5xl mx-auto w-full text-left"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Column: Coordinates details aligning with screenshot styles */}
                    <div className="lg:col-span-2 bg-gradient-to-b from-stone-900 to-black text-white rounded-2xl p-6 md:p-8 flex flex-col justify-between border-2 border-mhe-charcoal shadow-xl relative overflow-hidden">
                      {/* Sub-decorative sphere */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-mhe-orange/10 to-transparent rounded-full blur-2xl" />

                      <div className="space-y-6 z-10">
                        <div>
                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#E9967A] uppercase">
                            REGIONAL DESK
                          </span>
                          <h3 className="font-display font-black text-2xl md:text-3xl text-mhe-cream mt-1">
                            Contact
                          </h3>
                          <p className="text-xs text-stone-400 mt-2 font-sans leading-relaxed">
                            For CSR alliances, programmatic partnerships, field updates, tax receipts, or community operations, contact our desk.
                          </p>
                        </div>

                        {/* Visual details exactly as shown in user instruction image */}
                        <div className="space-y-5 pt-2">
                          {/* Phone */}
                          <div className="flex items-start gap-3.5 group">
                            <div className="w-10 h-10 shrink-0 bg-[#bc5a4b]/10 border border-[#bc5a4b]/30 rounded-xl flex items-center justify-center text-[#E9967A]">
                              <Phone className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <span className="text-[9px] font-mono font-bold text-stone-500 block uppercase">Phone Hotline</span>
                              <a href="tel:+917428008008" className="font-sans font-bold text-sm md:text-base text-stone-100 hover:text-mhe-orange transition-colors">
                                (+91) 7428008008
                              </a>
                            </div>
                          </div>

                          {/* Email */}
                          <div className="flex items-start gap-3.5 group">
                            <div className="w-10 h-10 shrink-0 bg-[#bc5a4b]/10 border border-[#bc5a4b]/30 rounded-xl flex items-center justify-center text-[#E9967A]">
                              <Mail className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <span className="text-[9px] font-mono font-bold text-stone-500 block uppercase">Inquiry Email</span>
                              <a href="mailto:contact@dif-sampoorna.ngo" className="font-sans font-bold text-xs md:text-sm text-stone-100 hover:text-mhe-orange transition-colors break-all">
                                contact@dif-sampoorna.ngo
                              </a>
                            </div>
                          </div>

                          {/* Address */}
                          <div className="flex items-start gap-3.5 group">
                            <div className="w-10 h-10 shrink-0 bg-[#bc5a4b]/10 border border-[#bc5a4b]/30 rounded-xl flex items-center justify-center text-[#E9967A]">
                              <MapPin className="w-4.5 h-4.5 text-[#E9967A]" />
                            </div>
                            <div>
                              <span className="text-[9px] font-mono font-bold text-stone-500 block uppercase">Address</span>
                              <p className="font-sans text-xs text-stone-200 leading-relaxed font-semibold">
                                Ready Money Terrace (Commercial building), 167, Dr. A. B. Road, Worli Naka, Bhim Nagar, Worli, Mumbai, Maharashtra 400018
                              </p>
                            </div>
                          </div>

                          {/* Social Fields */}
                          <div className="flex flex-col gap-2 pt-2 border-t border-stone-800">
                            <span className="text-[9px] font-mono font-bold text-stone-500 uppercase">Official Channels</span>
                            <div className="flex items-center gap-3">
                              <a href="https://www.facebook.com/share/1RW93rNWZw/" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-xl bg-stone-800 hover:bg-mhe-orange text-stone-300 hover:text-white transition-all flex items-center justify-center" title="Facebook">
                                <Facebook className="w-4 h-4" />
                              </a>
                              <a href="https://www.instagram.com/dif_sampoorna?igsh=MW9tY2dkZDdpeGl2eQ==" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-xl bg-stone-800 hover:bg-mhe-orange text-stone-300 hover:text-white transition-all flex items-center justify-center" title="Instagram">
                                <Instagram className="w-4 h-4" />
                              </a>
                              <a href="https://www.linkedin.com/company/sampoorna-by-deepjyoti-india-foundation/" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-xl bg-stone-800 hover:bg-mhe-orange text-stone-300 hover:text-white transition-all flex items-center justify-center" title="LinkedIn">
                                <Linkedin className="w-4 h-4" />
                              </a>
                              <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer" className="w-[34px] h-[34px] rounded-xl bg-stone-800 hover:bg-mhe-orange text-stone-300 hover:text-white transition-all flex items-center justify-center" title="Twitter / X">
                                <Twitter className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 pt-4 border-t border-stone-800 text-[9px] font-mono text-stone-400 z-10 flex flex-col gap-1">
                        <p>✓ All submissions copy to contact@dif-sampoorna.ngo</p>
                        <p>✓ NITI Aayog Portal Registered NGO</p>
                      </div>
                    </div>

                    {/* Right Column: Interactive Form */}
                    <div className="lg:col-span-3">
                      <h2 className="font-display font-extrabold text-xl text-mhe-charcoal mb-4 flex items-center gap-2">
                        <Inbox className="w-5 h-5 text-mhe-orange" />
                        <span>Leave an inquiry</span>
                      </h2>

                      <p className="text-xs md:text-sm text-black mb-6 font-sans leading-relaxed">
                        Have a corporate CSR partnership inquiry, regional clinic question, or general query? Submit your details below and our team will correspond within 2 business days. Form submission copy is dispatched straight to <strong>contact@dif-sampoorna.ngo</strong>.
                      </p>

                      {!contactSubmitted ? (
                        <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                          {/* Name */}
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Your Name*</label>
                            <input 
                              type="text" 
                              required
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="e.g., Anjali Kalita"
                              className="px-4 py-2 text-sm border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans font-medium rounded-xl"
                            />
                          </div>

                          {/* Email */}
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Email Address*</label>
                            <input 
                              type="email" 
                              required
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="e.g., anjalikalita@outlook.com"
                              className="px-4 py-2 text-sm border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans font-medium rounded-xl"
                            />
                          </div>

                          {/* Message */}
                          <div className="flex flex-col gap-1">
                            <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Inquiry Description*</label>
                            <textarea 
                              rows={4}
                              required
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                              placeholder="Describe your corporate/CSR pairing or general question..."
                              className="px-4 py-2 text-sm border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white font-sans text-mhe-charcoal font-medium rounded-xl"
                            />
                          </div>

                          <button 
                            type="submit" 
                            disabled={contactIsSubmitting}
                            className="mhe-btn-teal py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider cursor-pointer w-full mt-2 disabled:opacity-50"
                          >
                            {contactIsSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
                          </button>
                        </form>
                      ) : (
                        <div className="text-center py-6 flex flex-col gap-4 items-center animate-fadeIn" id="contact-success-prompter">
                          <div className="w-14 h-14 rounded-full bg-[#00A88F] text-white flex items-center justify-center font-bold text-2xl mhe-badge-shadow border-4 border-mhe-charcoal">
                            ✓
                          </div>
                          <h4 className="font-display font-extrabold text-xl text-mhe-charcoal">Inquiry logged!</h4>
                          <p className="text-xs md:text-sm text-black font-sans leading-relaxed px-2 max-w-md text-center">
                            Thank you, {contactName}! Your inquiry details have been forwarded directly to key leads at <strong>contact@dif-sampoorna.ngo</strong>. Our desk will respond inside 2 business days at <strong>{contactEmail}</strong>.
                          </p>

                          <button 
                            onClick={() => {
                              setContactSubmitted(false);
                              setContactName('');
                              setContactEmail('');
                              setContactMessage('');
                            }}
                            className="mhe-btn-outline px-6 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider mt-4"
                          >
                            Write another message
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* BLOG & NEWS VIEW - THE FIELD DISPATCH */}
          {activeTab === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-4 flex flex-col gap-10"
              id="blog-view-port"
            >
              {/* Blog Page Hero Header */}
              <div className="text-center max-w-3xl mx-auto flex flex-col gap-3">
                <span className="text-[10px] font-mono font-bold text-mhe-orange block uppercase tracking-widest font-extrabold">
                  The Field Dispatch
                </span>
                <h1 className="font-display font-black text-3xl md:text-5xl text-mhe-charcoal mt-1">
                  Stories of Healing &amp; Action
                </h1>
                <p className="text-sm text-black font-sans leading-relaxed">
                  Welcome to our direct journals, evidence-based field results, and community stories logged from Guwahati, Mumbai, Shillong, and our new clusters.
                </p>
              </div>

              {/* Search and Category Filter Toolbar */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between border-4 border-mhe-charcoal bg-mhe-mint/20 p-5 rounded-3xl mhe-card-shadow">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
                  {['All', 'Field Operations', 'Mental Health', 'Governance', 'Community'].map((cat) => {
                    const isSelected = blogCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setBlogCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold font-mono transition-all duration-200 cursor-pointer border-2 border-mhe-charcoal focus:outline-none ${
                          isSelected 
                            ? 'bg-mhe-orange text-white mhe-badge-shadow scale-102' 
                            : 'bg-white text-mhe-charcoal hover:bg-mhe-cream'
                        }`}
                      >
                        {cat.toUpperCase()}
                      </button>
                    );
                  })}
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72 shrink-0">
                  <input
                    type="text"
                    value={blogSearchQuery}
                    onChange={(e) => setBlogSearchQuery(e.target.value)}
                    placeholder="Search field reports..."
                    className="w-full px-4 py-2 border-2 border-mhe-charcoal bg-white rounded-xl text-xs font-sans text-mhe-charcoal focus:outline-none focus:ring-2 focus:ring-mhe-teal/20"
                  />
                  {blogSearchQuery && (
                    <button 
                      onClick={() => setBlogSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-mhe-orange font-bold text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Filtered Articles Rendering */}
              {(() => {
                const filtered = currentBlogPosts.filter(post => {
                  const matchesCat = blogCategory === 'All' || post.category === blogCategory;
                  const matchesSearch = post.title.toLowerCase().includes(blogSearchQuery.toLowerCase()) || 
                                        post.excerpt.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
                                        post.author.toLowerCase().includes(blogSearchQuery.toLowerCase());
                  return matchesCat && matchesSearch;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="text-center py-20 bg-mhe-cream border-4 border-mhe-charcoal border-dashed rounded-3xl p-10">
                      <div className="text-4xl mb-4">📭</div>
                      <h3 className="font-display font-extrabold text-xl text-mhe-charcoal">No Dispatches Found</h3>
                      <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
                        We couldn't find any articles matching "{blogSearchQuery}" under the category "{blogCategory}". Try adjusting your filters.
                      </p>
                      <button
                        onClick={() => { setBlogCategory('All'); setBlogSearchQuery(''); }}
                        className="mhe-btn-outline px-6 py-2 rounded-xl text-xs font-mono uppercase mt-4"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  );
                }

                // If we have posts, let's designate the first one as featured when no category/search search is narrow
                const featuredPost = filtered[0];
                const restPosts = filtered.slice(1);

                return (
                  <div className="flex flex-col gap-10">
                    {/* Featured Dispatch Banner */}
                    {blogSearchQuery === '' && (
                      <div 
                        className="bg-white border-4 border-mhe-charcoal rounded-3xl overflow-hidden mhe-card-shadow grid grid-cols-1 lg:grid-cols-12 group transition-all duration-300"
                        id="featured-dispatch-card"
                      >
                        {/* Featured Left Decorative/Graphic Cover */}
                        <div className={`lg:col-span-5 p-8 md:p-12 ${featuredPost.imageColor} flex flex-col justify-between border-b-4 lg:border-b-0 lg:border-r-4 border-mhe-charcoal relative min-h-[220px] lg:min-h-auto`}>
                          <span className="text-6xl md:text-8xl select-none opacity-90 animate-bounce">{featuredPost.emoji}</span>
                          <div>
                            <span className="text-[10px] font-mono font-bold bg-mhe-charcoal text-white px-2.5 py-1 rounded-md uppercase tracking-wider">
                              FEATURED DISPATCH
                            </span>
                          </div>
                        </div>

                        {/* Featured Right Content */}
                        <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-between gap-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-mono bg-mhe-teal-light text-mhe-teal px-2.5 py-0.5 rounded-full font-extrabold uppercase border border-mhe-teal/40 shadow-sm">
                                {featuredPost.category}
                              </span>
                              <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5" />
                                {featuredPost.date}
                              </span>
                            </div>

                            <h2 
                              onClick={() => setSelectedBlogPost(featuredPost)}
                              className="font-display font-black text-xl md:text-3xl text-mhe-charcoal leading-snug hover:text-mhe-orange hover:underline cursor-pointer transition-colors"
                            >
                              {featuredPost.title}
                            </h2>

                            <p className="text-sm text-gray-600 leading-relaxed font-sans">
                              {featuredPost.excerpt}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-gray-100 mt-2">
                            {/* Author details */}
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-mhe-cream border-2 border-mhe-charcoal flex items-center justify-center text-sm shadow-sm">
                                ✍️
                              </div>
                              <div>
                                <h4 className="font-display font-bold text-xs text-mhe-charcoal leading-none">{featuredPost.author}</h4>
                                <span className="text-[9px] text-gray-400 font-mono">{featuredPost.authorRole}</span>
                              </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex items-center gap-3">
                              {/* Like Button */}
                              <button
                                onClick={() => {
                                  if (likedBlogPosts.includes(featuredPost.id)) {
                                    setLikedBlogPosts(likedBlogPosts.filter(id => id !== featuredPost.id));
                                  } else {
                                    setLikedBlogPosts([...likedBlogPosts, featuredPost.id]);
                                  }
                                }}
                                className={`p-2 rounded-xl border-2 border-mhe-charcoal flex items-center gap-1.5 text-xs font-mono font-extrabold transition-all duration-200 cursor-pointer focus:outline-none ${
                                  likedBlogPosts.includes(featuredPost.id)
                                    ? 'bg-[#ffe4e6] text-rose-600 mhe-badge-shadow scale-102'
                                    : 'bg-white text-gray-500 hover:bg-gray-50'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${likedBlogPosts.includes(featuredPost.id) ? 'fill-current text-rose-600' : ''}`} />
                                <span>{featuredPost.likes + (likedBlogPosts.includes(featuredPost.id) ? 1 : 0)}</span>
                              </button>

                              <button
                                onClick={() => setSelectedBlogPost(featuredPost)}
                                className="mhe-btn-teal px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                              >
                                <span>READ ARTICLE</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Standard Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6" id="blog-grid-system">
                      {(blogSearchQuery === '' ? restPosts : filtered).map((post) => {
                        const isLiked = likedBlogPosts.includes(post.id);
                        return (
                          <motion.article
                            key={post.id}
                            className="bg-white border-4 border-mhe-charcoal rounded-3xl overflow-hidden mhe-card-shadow flex flex-col justify-between transition-all duration-300 hover:translate-y-[-2px]"
                          >
                            {/* Card Top Block */}
                            <div>
                              <div className={`p-6 border-b-2 border-mhe-charcoal ${post.imageColor} flex items-center justify-between`}>
                                <span className="text-3xl select-none">{post.emoji}</span>
                                <span className="text-[10px] font-mono bg-mhe-charcoal text-white px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                                  {post.category}
                                </span>
                              </div>

                              <div className="p-6 space-y-3">
                                <div className="text-xs text-gray-400 font-mono flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  {post.date}
                                  <span className="mx-1">•</span>
                                  <Clock className="w-3.5 h-3.5" />
                                  {post.readTime}
                                </div>

                                <h3 
                                  onClick={() => setSelectedBlogPost(post)}
                                  className="font-display font-extrabold text-lg md:text-xl text-mhe-charcoal leading-snug hover:text-mhe-orange hover:underline cursor-pointer transition-colors line-clamp-2"
                                >
                                  {post.title}
                                </h3>

                                <p className="text-xs text-gray-600 font-sans leading-relaxed line-clamp-3">
                                  {post.excerpt}
                                </p>
                              </div>
                            </div>

                            {/* Card Bottom Block */}
                            <div className="px-6 pb-6 pt-4 border-t-2 border-dashed border-gray-100 flex items-center justify-between bg-gray-50/50">
                              {/* Author metadata */}
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-white border border-mhe-charcoal flex items-center justify-center text-xs shadow-sm">
                                  👤
                                </div>
                                <div className="leading-tight">
                                  <h4 className="font-display font-bold text-[10px] text-mhe-charcoal">{post.author}</h4>
                                  <span className="text-[8px] text-gray-400 font-mono">{post.authorRole}</span>
                                </div>
                              </div>

                              {/* Interactive actions */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => {
                                    if (isLiked) {
                                      setLikedBlogPosts(likedBlogPosts.filter(id => id !== post.id));
                                    } else {
                                      setLikedBlogPosts([...likedBlogPosts, post.id]);
                                    }
                                  }}
                                  className={`p-1.5 rounded-lg border-2 border-mhe-charcoal flex items-center gap-1 text-[10px] font-mono font-extrabold transition-all duration-150 cursor-pointer focus:outline-none ${
                                    isLiked
                                      ? 'bg-[#ffe4e6] text-rose-600 mhe-badge-shadow'
                                      : 'bg-white text-gray-500 hover:bg-gray-50'
                                  }`}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-rose-600' : ''}`} />
                                  <span>{post.likes + (isLiked ? 1 : 0)}</span>
                                </button>

                                <button
                                  onClick={() => setSelectedBlogPost(post)}
                                  className="mhe-btn-outline px-3 py-1.5 rounded-lg text-[10px] font-bold"
                                >
                                  READ
                                </button>
                              </div>
                            </div>
                          </motion.article>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* ADMIN PORTAL VIEW */}
          {activeTab === 'admin-portal' && (
            <motion.div
              key="admin-portal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="max-w-7xl mx-auto px-6 md:px-12 pb-20 pt-4 flex flex-col gap-8"
              id="admin-portal-view-port"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-4 border-mhe-charcoal pb-6 bg-white p-6 rounded-3xl mhe-card-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-mhe-charcoal border-2 border-mhe-charcoal flex items-center justify-center text-white mhe-badge-shadow shrink-0">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-mhe-orange block uppercase tracking-widest font-extrabold animate-pulse">
                      DIF SAMPOORNA SECURE CMS
                    </span>
                    <h1 className="font-display font-black text-2xl md:text-3xl text-mhe-charcoal leading-tight">
                      Administrator Workspace
                    </h1>
                  </div>
                </div>

                {isAdminLoggedIn && (
                  <div className="flex flex-wrap items-center gap-3 self-stretch md:self-auto justify-between border-t border-dashed border-gray-100 pt-4 md:pt-0 md:border-none w-full md:w-auto">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00A88F] animate-pulse shrink-0" />
                      <span className="text-xs font-mono font-bold text-mhe-charcoal">
                        contact@dif-sampoorna.ngo
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {cmsSyncStatus === 'syncing' ? (
                        <span className="flex items-center gap-1.5 bg-mhe-yellow-light text-mhe-charcoal text-[10px] font-mono font-black border border-mhe-charcoal px-2.5 py-1 rounded-lg">
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span>SYNCING...</span>
                        </span>
                      ) : cmsSyncStatus === 'success' ? (
                        <span className="bg-[#EBF7F4] text-[#00A88F] text-[10px] font-mono font-black border border-[#00A88F] px-2.5 py-1 rounded-lg">
                          ✓ SYNCED
                        </span>
                      ) : cmsSyncStatus === 'error' ? (
                        <span className="bg-[#ffe4e6] text-rose-600 text-[10px] font-mono font-black border border-rose-600 px-2.5 py-1 rounded-lg">
                          ⚠ ERROR
                        </span>
                      ) : null}

                      <button
                        onClick={handleAdminLogout}
                        className="flex items-center gap-1.5 bg-white border-2 border-mhe-charcoal px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-mhe-orange hover:text-white hover:border-mhe-orange transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>LOGOUT</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {!isAdminLoggedIn ? (
                /* Login Card */
                <div className="max-w-md w-full mx-auto bg-white border-4 border-mhe-charcoal rounded-3xl p-8 mhe-card-shadow text-center">
                  <div className="w-14 h-14 rounded-full bg-[#FCF7E6] border-2 border-mhe-charcoal flex items-center justify-center mx-auto mb-4 text-mhe-orange">
                    <Lock className="w-7 h-7" />
                  </div>
                  <h2 className="font-display font-black text-xl text-mhe-charcoal">Authorized Access Only</h2>
                  <p className="text-xs text-gray-500 font-sans mt-2 mb-6 leading-relaxed">
                    Please log in with the administrator email of Deepjyoti India Foundation and password to manage gallery, site photos, testimonials, and video play sources.
                  </p>

                  <form onSubmit={handleAdminLogin} className="flex flex-col gap-4 text-left">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Admin Email*</label>
                      <input
                        type="email"
                        required
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="contact@dif-sampoorna.ngo"
                        className="px-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Admin Password*</label>
                      <input
                        type="password"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="px-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                      />
                    </div>

                    {adminLoginError && (
                      <p className="text-xs text-rose-600 font-mono font-bold bg-[#ffe4e6] border border-rose-100 p-3 rounded-lg text-center">
                        ⚠ {adminLoginError}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={adminIsLoading}
                      className="mhe-btn-orange py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider cursor-pointer w-full mt-2 disabled:opacity-50"
                    >
                      {adminIsLoading ? "Verifying..." : "Verify Identity"}
                    </button>
                  </form>

                  <div className="mt-6 pt-4 border-t border-dashed border-gray-100 text-[10px] font-mono text-gray-400">
                    <p>Allowed email: contact@dif-sampoorna.ngo</p>
                  </div>
                </div>
              ) : (
                /* CMS Dashboard */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left sidebar nav for dashboard */}
                  <div className="lg:col-span-3 bg-white border-4 border-mhe-charcoal p-5 rounded-3xl mhe-card-shadow flex flex-col gap-2">
                    <span className="text-[9px] font-mono font-extrabold text-gray-400 uppercase tracking-wider pb-2 border-b border-gray-100">
                      CMS Content Modules
                    </span>
                    <button
                      onClick={() => setCmsSubTab('gallery')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-display font-extrabold text-xs transition-all cursor-pointer border ${
                        cmsSubTab === 'gallery'
                          ? 'bg-mhe-teal text-white border-mhe-charcoal shadow-[2px_2px_0px_0px_rgba(28,46,49,1)]'
                          : 'text-mhe-charcoal hover:bg-mhe-teal-light/40 border-transparent'
                      }`}
                    >
                      <span>📁 Operations Gallery</span>
                      <span className="text-[10px] bg-mhe-cream text-mhe-charcoal border border-mhe-charcoal px-2 py-0.5 rounded-full font-mono font-black scale-90">
                        {currentGalleryItems.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setCmsSubTab('blog')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-display font-extrabold text-xs transition-all cursor-pointer border ${
                        cmsSubTab === 'blog'
                          ? 'bg-mhe-teal text-white border-mhe-charcoal shadow-[2px_2px_0px_0px_rgba(28,46,49,1)]'
                          : 'text-mhe-charcoal hover:bg-mhe-teal-light/40 border-transparent'
                      }`}
                    >
                      <span>✍️ Blog &amp; News</span>
                      <span className="text-[10px] bg-mhe-cream text-mhe-charcoal border border-mhe-charcoal px-2 py-0.5 rounded-full font-mono font-black scale-90">
                        {currentBlogPosts.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setCmsSubTab('testimonials')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-display font-extrabold text-xs transition-all cursor-pointer border ${
                        cmsSubTab === 'testimonials'
                          ? 'bg-mhe-teal text-white border-mhe-charcoal shadow-[2px_2px_0px_0px_rgba(28,46,49,1)]'
                          : 'text-mhe-charcoal hover:bg-mhe-teal-light/40 border-transparent'
                      }`}
                    >
                      <span>💬 Testimonials</span>
                      <span className="text-[10px] bg-mhe-cream text-mhe-charcoal border border-mhe-charcoal px-2 py-0.5 rounded-full font-mono font-black scale-90">
                        {currentTestimonials.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setCmsSubTab('videos')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-display font-extrabold text-xs transition-all cursor-pointer border ${
                        cmsSubTab === 'videos'
                          ? 'bg-mhe-teal text-white border-mhe-charcoal shadow-[2px_2px_0px_0px_rgba(28,46,49,1)]'
                          : 'text-mhe-charcoal hover:bg-mhe-teal-light/40 border-transparent'
                      }`}
                    >
                      <span>📺 CRT TV Videos</span>
                      <span className="text-[10px] bg-mhe-cream text-mhe-charcoal border border-mhe-charcoal px-2 py-0.5 rounded-full font-mono font-black scale-90">
                        {currentHeroVideos.length}
                      </span>
                    </button>

                    <button
                      onClick={() => setCmsSubTab('photos')}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left font-display font-extrabold text-xs transition-all cursor-pointer border ${
                        cmsSubTab === 'photos'
                          ? 'bg-mhe-teal text-white border-mhe-charcoal shadow-[2px_2px_0px_0px_rgba(28,46,49,1)]'
                          : 'text-mhe-charcoal hover:bg-mhe-teal-light/40 border-transparent'
                      }`}
                    >
                      <span>🖼️ Photos &amp; Logo</span>
                      <span className="text-[10px] bg-mhe-cream text-mhe-charcoal border border-mhe-charcoal px-2 py-0.5 rounded-full font-mono font-black scale-90">
                        {1 + currentBoardMembers.length}
                      </span>
                    </button>

                    <div className="border-t border-dashed border-gray-100 pt-3 mt-3 flex flex-col gap-2">
                      <button
                        onClick={() => handleNavChange('home')}
                        className="w-full text-center py-2 border-2 border-dashed border-mhe-charcoal text-mhe-charcoal hover:bg-mhe-cream rounded-xl text-xs font-mono font-bold cursor-pointer"
                      >
                        ← Back to Homepage
                      </button>
                    </div>
                  </div>

                  {/* Main Work Area */}
                  <div className="lg:col-span-9 flex flex-col gap-8 w-full">
                    {/* MODULE 1: GALLERY */}
                    {cmsSubTab === 'gallery' && (
                      <div className="flex flex-col gap-8 animate-fadeIn w-full">
                        {/* Add form */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-8 mhe-card-shadow">
                          <h2 className="font-display font-black text-lg text-mhe-charcoal mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-mhe-orange" />
                            <span>Add photo or video to Field Action Gallery</span>
                          </h2>

                          <form onSubmit={handleAddGalleryItem} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Title / Caption*</label>
                              <input
                                type="text"
                                required
                                value={newGalTitle}
                                onChange={(e) => setNewGalTitle(e.target.value)}
                                placeholder="e.g., Blood Pressure Diagnostics at Shillong Clinic"
                                className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl"
                              />
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Pillar Domain*</label>
                              <select
                                value={newGalDomain}
                                onChange={(e) => setNewGalDomain(e.target.value)}
                                className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream text-sm text-mhe-charcoal font-sans rounded-xl font-medium"
                              >
                                {currentGalleryDomains.map((d) => (
                                  <option key={d.id} value={d.id}>{d.title}</option>
                                ))}
                              </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Category Label*</label>
                              <select
                                value={newGalCategory}
                                onChange={(e) => setNewGalCategory(e.target.value)}
                                className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream text-sm text-mhe-charcoal font-sans rounded-xl font-medium"
                              >
                                {currentGalleryCategories.map((c) => (
                                  <option key={c} value={c}>{c}</option>
                                ))}
                              </select>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Media Type*</label>
                              <div className="flex gap-4 p-2 bg-mhe-cream border-2 border-mhe-charcoal rounded-xl">
                                <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono font-bold select-none">
                                  <input
                                    type="radio"
                                    checked={newGalType === 'photo'}
                                    onChange={() => setNewGalType('photo')}
                                    className="accent-mhe-orange"
                                  />
                                  <span>Photo</span>
                                </label>
                                <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono font-bold select-none">
                                  <input
                                    type="radio"
                                    checked={newGalType === 'video'}
                                    onChange={() => setNewGalType('video')}
                                    className="accent-mhe-orange"
                                  />
                                  <span>Video Clip</span>
                                </label>
                              </div>
                            </div>

                            <div className="flex flex-col gap-3 md:col-span-2 border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/10">
                              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                <span className="text-xs font-display font-black text-mhe-charcoal uppercase">
                                  Image Thumbnail (Photo or Video Cover)*
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                <div className="md:col-span-1">
                                  <FileUploader 
                                    accept="image/*"
                                    onUploadSuccess={(url) => setNewGalUrl(url)}
                                    label="Option A: Direct File Upload"
                                    helperText="Drag & drop PNG, JPG, or JPEG images"
                                  />
                                </div>
                                <div className="md:col-span-1 flex flex-col gap-1.5 justify-center">
                                  <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Option B: Remote URL link</label>
                                  <input
                                    type="text"
                                    required
                                    value={newGalUrl}
                                    onChange={(e) => setNewGalUrl(e.target.value)}
                                    placeholder="https://images.unsplash.com/... or relative path"
                                    className="px-4 py-2.5 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl w-full"
                                  />
                                  <p className="text-[10px] text-gray-400 font-sans mt-1">
                                    Pasting a URL or uploading above fills this input automatically.
                                  </p>
                                </div>
                                <div className="md:col-span-1 flex flex-col items-center justify-center border-2 border-dashed border-mhe-charcoal/20 p-3 rounded-xl bg-mhe-cream/10 h-full min-h-[140px]">
                                  <span className="text-[9px] font-mono font-bold uppercase text-gray-400 mb-2">Live Thumbnail Preview</span>
                                  {newGalUrl ? (
                                    <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-mhe-charcoal bg-mhe-cream relative group shadow-sm">
                                      <img 
                                        src={newGalUrl} 
                                        alt="Preview" 
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                      />
                                      <button 
                                        type="button"
                                        onClick={() => setNewGalUrl('')}
                                        className="absolute top-1 right-1 bg-rose-600 text-white rounded-full w-4 h-4 text-[8px] flex items-center justify-center font-bold"
                                        title="Clear Image"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center text-[10px] font-mono text-gray-400">
                                      No Image Selected
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {newGalType === 'video' && (
                              <div className="flex flex-col gap-3 md:col-span-2 border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/10 animate-fadeIn">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                  <span className="text-xs font-display font-black text-mhe-charcoal uppercase">
                                    Direct MP4 Video Source*
                                  </span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <FileUploader 
                                    accept="video/mp4"
                                    onUploadSuccess={(url) => setNewGalVideoUrl(url)}
                                    label="Option A: Direct Video Upload"
                                    helperText="Drag & drop direct MP4 video files"
                                  />
                                  <div className="flex flex-col gap-1.5 justify-center">
                                    <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Option B: Remote Video Link</label>
                                    <input
                                      type="text"
                                      required
                                      value={newGalVideoUrl}
                                      onChange={(e) => setNewGalVideoUrl(e.target.value)}
                                      placeholder="e.g., https://assets.mixkit.co/videos/preview/..."
                                      className="px-4 py-2.5 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl w-full"
                                    />
                                    <p className="text-[10px] text-gray-400 font-sans mt-1">
                                      Paste an MP4 video link or upload above to fill this automatically.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="md:col-span-2 flex justify-end pt-2">
                              <button
                                type="submit"
                                className="mhe-btn-orange px-6 py-2.5 rounded-xl text-xs font-mono font-bold"
                              >
                                + ADD FILE TO ACCORDION
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* Dynamic Classification Configuration Panel */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-mhe-mint/10 border-4 border-mhe-charcoal rounded-3xl p-6 mhe-card-shadow">
                          {/* Manage Categories */}
                          <div className="flex flex-col gap-4">
                            <h3 className="font-display font-extrabold text-sm text-mhe-charcoal uppercase border-b-2 border-mhe-charcoal pb-2">
                              🏷️ Manage Gallery Categories
                            </h3>
                            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-white border border-mhe-charcoal rounded-xl shadow-inner">
                              {currentGalleryCategories.map((cat) => (
                                <span key={cat} className="inline-flex items-center gap-1 bg-mhe-cream border border-mhe-charcoal text-[9px] font-mono font-extrabold px-2.5 py-1 rounded-full uppercase">
                                  <span>{cat}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCategory(cat)}
                                    className="text-rose-600 hover:text-rose-800 font-bold ml-1 cursor-pointer"
                                    title="Delete category"
                                  >
                                    ×
                                  </button>
                                </span>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="New category label..."
                                value={newCustomCategory}
                                onChange={(e) => setNewCustomCategory(e.target.value)}
                                className="flex-grow px-3 py-1.5 border-2 border-mhe-charcoal bg-white focus:outline-none text-xs font-mono rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => handleAddCategory(newCustomCategory)}
                                className="bg-mhe-teal hover:bg-mhe-teal-light text-white font-mono font-bold text-xs px-3 py-1.5 border-2 border-mhe-charcoal rounded-lg shadow-sm cursor-pointer"
                              >
                                ADD
                              </button>
                            </div>
                          </div>

                          {/* Manage Domains */}
                          <div className="flex flex-col gap-4 border-t-2 md:border-t-0 md:border-l-2 border-dashed border-mhe-charcoal/20 pt-4 md:pt-0 md:pl-6">
                            <h3 className="font-display font-extrabold text-sm text-mhe-charcoal uppercase border-b-2 border-mhe-charcoal pb-2">
                              🌐 Manage Program Domains
                            </h3>
                            <div className="flex flex-col gap-1 max-h-40 overflow-y-auto p-2 bg-white border border-mhe-charcoal rounded-xl shadow-inner">
                              {currentGalleryDomains.map((domain) => (
                                <div key={domain.id} className="flex items-center justify-between bg-mhe-cream/50 border border-mhe-charcoal px-2 py-1.5 rounded-lg text-[10px] font-mono">
                                  <div>
                                    <span className="font-bold text-mhe-teal uppercase">[{domain.id}]</span>
                                    <span className="ml-1 text-mhe-charcoal font-sans">{domain.title}</span>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteDomain(domain.id)}
                                    className="text-rose-600 hover:text-rose-800 font-bold ml-1 px-1.5 hover:bg-rose-50 rounded cursor-pointer"
                                    title="Delete domain"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="domain_id (lowercase)"
                                  value={newCustomDomainId}
                                  onChange={(e) => setNewCustomDomainId(e.target.value)}
                                  className="px-3 py-1.5 border-2 border-mhe-charcoal bg-white focus:outline-none text-xs font-mono rounded-lg"
                                />
                                <input
                                  type="text"
                                  placeholder="Domain Title..."
                                  value={newCustomDomainTitle}
                                  onChange={(e) => setNewCustomDomainTitle(e.target.value)}
                                  className="px-3 py-1.5 border-2 border-mhe-charcoal bg-white focus:outline-none text-xs font-sans rounded-lg"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleAddDomain(newCustomDomainId, newCustomDomainTitle)}
                                className="bg-mhe-orange hover:bg-mhe-orange-light text-white font-mono font-bold text-xs py-1.5 border-2 border-mhe-charcoal rounded-lg shadow-sm cursor-pointer"
                              >
                                + ADD NEW CLASSIFICATION DOMAIN
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Edit Gallery Item Modal */}
                        {editingGalIndex !== null && (
                          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                            <div 
                              className="absolute inset-0 bg-mhe-charcoal/80 backdrop-blur-sm"
                              onClick={() => setEditingGalIndex(null)}
                            />
                            <div className="relative w-full max-w-xl bg-white border-4 border-mhe-charcoal rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(28,46,49,1)] z-10 p-6 md:p-8">
                              <h3 className="font-display font-extrabold text-lg text-mhe-charcoal mb-4 uppercase">
                                Edit Gallery Media Item
                              </h3>
                              <form onSubmit={handleSaveEditGalleryItem} className="flex flex-col gap-4 text-left">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Title / Caption*</label>
                                  <input
                                    type="text"
                                    required
                                    value={editGalTitle}
                                    onChange={(e) => setEditGalTitle(e.target.value)}
                                    placeholder="Title / Caption"
                                    className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl w-full"
                                  />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Pillar Domain*</label>
                                    <select
                                      value={editGalDomain}
                                      onChange={(e) => setEditGalDomain(e.target.value)}
                                      className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream text-sm text-mhe-charcoal font-sans rounded-xl font-medium w-full"
                                    >
                                      {currentGalleryDomains.map((d) => (
                                        <option key={d.id} value={d.id}>{d.title}</option>
                                      ))}
                                    </select>
                                  </div>

                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Category Label*</label>
                                    <select
                                      value={editGalCategory}
                                      onChange={(e) => setEditGalCategory(e.target.value)}
                                      className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream text-sm text-mhe-charcoal font-sans rounded-xl font-medium w-full"
                                    >
                                      {currentGalleryCategories.map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Media Type*</label>
                                  <div className="flex gap-4 p-2 bg-mhe-cream border-2 border-mhe-charcoal rounded-xl">
                                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono font-bold select-none">
                                      <input
                                        type="radio"
                                        checked={editGalType === 'photo'}
                                        onChange={() => setEditGalType('photo')}
                                        className="accent-mhe-orange"
                                      />
                                      <span>Photo</span>
                                    </label>
                                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono font-bold select-none">
                                      <input
                                        type="radio"
                                        checked={editGalType === 'video'}
                                        onChange={() => setEditGalType('video')}
                                        className="accent-mhe-orange"
                                      />
                                      <span>Video Clip</span>
                                    </label>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-3 border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/10">
                                  <span className="text-xs font-display font-black text-mhe-charcoal uppercase">
                                    Image Thumbnail (Photo or Video Cover)*
                                  </span>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <div className="md:col-span-1">
                                      <FileUploader 
                                        accept="image/*"
                                        onUploadSuccess={(url) => setEditGalUrl(url)}
                                        label="Upload Photo"
                                        helperText="PNG, JPG, or JPEG"
                                      />
                                    </div>
                                    <div className="md:col-span-1 flex flex-col gap-1.5 justify-center">
                                      <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Remote URL link</label>
                                      <input
                                        type="text"
                                        required
                                        value={editGalUrl}
                                        onChange={(e) => setEditGalUrl(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="px-4 py-2.5 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-xs text-mhe-charcoal font-sans rounded-xl w-full"
                                      />
                                    </div>
                                    <div className="md:col-span-1 flex flex-col items-center justify-center border-2 border-dashed border-mhe-charcoal/20 p-3 rounded-xl bg-mhe-cream/10 h-full min-h-[140px]">
                                      <span className="text-[9px] font-mono font-bold uppercase text-gray-400 mb-2">Current Image Preview</span>
                                      {editGalUrl ? (
                                        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-mhe-charcoal bg-mhe-cream relative group shadow-sm">
                                          <img 
                                            src={editGalUrl} 
                                            alt="Preview" 
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover"
                                          />
                                          <button 
                                            type="button"
                                            onClick={() => setEditGalUrl('')}
                                            className="absolute top-1 right-1 bg-rose-600 text-white rounded-full w-4 h-4 text-[8px] flex items-center justify-center font-bold"
                                            title="Clear Image"
                                          >
                                            ✕
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="text-center text-[10px] font-mono text-gray-400">
                                          No Image Selected
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {editGalType === 'video' && (
                                  <div className="flex flex-col gap-3 border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/10 animate-fadeIn">
                                    <span className="text-xs font-display font-black text-mhe-charcoal uppercase">
                                      Direct MP4 Video Source*
                                    </span>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <FileUploader 
                                        accept="video/mp4"
                                        onUploadSuccess={(url) => setEditGalVideoUrl(url)}
                                        label="Upload Video"
                                        helperText="MP4 format only"
                                      />
                                      <div className="flex flex-col gap-1.5 justify-center">
                                        <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Remote Video Link</label>
                                        <input
                                          type="text"
                                          required
                                          value={editGalVideoUrl}
                                          onChange={(e) => setEditGalVideoUrl(e.target.value)}
                                          placeholder="https://example.com/video.mp4"
                                          className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-xs text-mhe-charcoal font-sans rounded-xl w-full"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="flex justify-end gap-3 pt-2">
                                  <button
                                    type="button"
                                    onClick={() => setEditingGalIndex(null)}
                                    className="px-4 py-2 border-2 border-mhe-charcoal hover:bg-mhe-cream rounded-xl text-xs font-mono font-bold cursor-pointer"
                                  >
                                    CANCEL
                                  </button>
                                  <button
                                    type="submit"
                                    className="mhe-btn-orange px-6 py-2 border-2 border-mhe-charcoal rounded-xl text-xs font-mono font-bold cursor-pointer"
                                  >
                                    SAVE CHANGES
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}

                        {/* List current */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 mhe-card-shadow">
                          <h3 className="font-display font-extrabold text-sm text-mhe-charcoal mb-4 uppercase">
                            Current Gallery Media Inventory ({currentGalleryItems.length} items)
                          </h3>

                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {currentGalleryItems.map((item, idx) => (
                              <div key={idx} className="border-2 border-mhe-charcoal rounded-2xl overflow-hidden bg-mhe-cream flex flex-col justify-between">
                                <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                                  <img
                                    src={item.url}
                                    alt={item.title}
                                    referrerPolicy="no-referrer"
                                    className="object-cover w-full h-full"
                                  />
                                  <span className="absolute top-1.5 left-1.5 bg-white text-[8px] border border-mhe-charcoal px-2 py-0.5 rounded-full font-mono font-black uppercase">
                                    {item.category}
                                  </span>
                                  <span className="absolute top-1.5 right-1.5 bg-mhe-charcoal text-white text-[8px] px-1.5 py-0.5 rounded uppercase font-mono font-bold">
                                    {item.type}
                                  </span>
                                </div>
                                <div className="p-3 bg-white flex-grow flex flex-col justify-between border-t border-mhe-charcoal">
                                  <p className="text-[11px] font-sans font-bold text-mhe-charcoal leading-snug line-clamp-2">
                                    {item.title}
                                  </p>
                                  <div className="pt-2 border-t border-dashed border-gray-100 flex items-center justify-between mt-2">
                                    <span className="text-[9px] font-mono text-gray-400 font-bold">Pillar: {item.domainId}</span>
                                    <div className="flex gap-1.5">
                                      <button
                                        onClick={() => handleStartEditGalleryItem(idx)}
                                        className="p-1 text-mhe-teal hover:bg-mhe-teal-light border border-transparent hover:border-mhe-teal rounded cursor-pointer transition-colors"
                                        title="Edit Item"
                                      >
                                        <Edit3 className="w-3.5 h-3.5" />
                                      </button>
                                      <button
                                        onClick={() => handleDeleteGalleryItem(idx)}
                                        className="p-1 text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-300 rounded cursor-pointer transition-colors"
                                        title="Delete Item"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MODULE 2: BLOG & NEWS */}
                    {cmsSubTab === 'blog' && (
                      <div className="flex flex-col gap-8 animate-fadeIn w-full">
                        {/* Add blog */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-8 mhe-card-shadow">
                          <h2 className="font-display font-black text-lg text-mhe-charcoal mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-mhe-orange" />
                            <span>Publish New Field Story or Journal Dispatch</span>
                          </h2>

                          <form onSubmit={handleAddBlogPost} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Article Title*</label>
                                <input
                                  type="text"
                                  required
                                  value={newBlogTitle}
                                  onChange={(e) => setNewBlogTitle(e.target.value)}
                                  placeholder="e.g., Expanding clinical care to rural Maharashtra"
                                  className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Excerpt / Teaser text*</label>
                                <input
                                  type="text"
                                  required
                                  value={newBlogExcerpt}
                                  onChange={(e) => setNewBlogExcerpt(e.target.value)}
                                  placeholder="A brief 1-sentence summary displayed on cards..."
                                  className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Author Name*</label>
                                <input
                                  type="text"
                                  required
                                  value={newBlogAuthor}
                                  onChange={(e) => setNewBlogAuthor(e.target.value)}
                                  placeholder="DIF Admin Team"
                                  className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Author Role / Affiliation*</label>
                                <input
                                  type="text"
                                  required
                                  value={newBlogAuthorRole}
                                  onChange={(e) => setNewBlogAuthorRole(e.target.value)}
                                  placeholder="e.g., Field Operations Lead"
                                  className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Dispatch Category*</label>
                                <select
                                  value={newBlogCategory}
                                  onChange={(e) => setNewBlogCategory(e.target.value)}
                                  className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream text-sm text-mhe-charcoal font-sans rounded-xl font-medium"
                                >
                                  <option value="Field Operations">Field Operations</option>
                                  <option value="Mental Health">Mental Health</option>
                                  <option value="Governance">Governance</option>
                                  <option value="Community">Community</option>
                                </select>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Emoji Icon*</label>
                                  <input
                                    type="text"
                                    required
                                    value={newBlogEmoji}
                                    onChange={(e) => setNewBlogEmoji(e.target.value)}
                                    placeholder="🏥, 📝, 👩‍🌾"
                                    className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream text-center text-sm text-mhe-charcoal font-sans rounded-xl"
                                  />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Card BG color*</label>
                                  <select
                                    value={newBlogColor}
                                    onChange={(e) => setNewBlogColor(e.target.value)}
                                    className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream text-sm text-mhe-charcoal font-sans rounded-xl font-medium"
                                  >
                                    <option value="bg-mhe-teal-light">Mint Teal</option>
                                    <option value="bg-mhe-orange-light">Warm Orange</option>
                                    <option value="bg-[#FCF7E6]">Sand Yellow</option>
                                    <option value="bg-[#EBF7F4]">Pale Green</option>
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Article Body Content* (Press Enter/Return for paragraphs)</label>
                              <textarea
                                rows={8}
                                required
                                value={newBlogContent}
                                onChange={(e) => setNewBlogContent(e.target.value)}
                                placeholder="Write the full stories, findings, and journals. Enter creates a clear new paragraph in the live story reader..."
                                className="p-4 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl leading-relaxed"
                              />
                            </div>

                            <div className="flex justify-end pt-2">
                              <button
                                type="submit"
                                className="mhe-btn-orange px-6 py-2.5 rounded-xl text-xs font-mono font-bold"
                              >
                                PUBLISH FIELD ARTICLE
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* List current blogs */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 mhe-card-shadow">
                          <h3 className="font-display font-extrabold text-sm text-mhe-charcoal mb-4 uppercase">
                            Published Articles Registry ({currentBlogPosts.length} dispatches)
                          </h3>

                          <div className="flex flex-col gap-4">
                            {currentBlogPosts.map((post) => (
                              <div key={post.id} className="border-2 border-mhe-charcoal rounded-2xl p-4 bg-white hover:bg-mhe-cream/10 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full border border-mhe-charcoal bg-mhe-cream flex items-center justify-center text-xl shrink-0">
                                    {post.emoji}
                                  </div>
                                  <div>
                                    <span className="text-[9px] font-mono font-extrabold text-mhe-teal uppercase bg-mhe-teal-light border border-mhe-teal/20 px-2 py-0.5 rounded-full">
                                      {post.category}
                                    </span>
                                    <h4 className="font-display font-extrabold text-sm text-mhe-charcoal leading-snug mt-1">
                                      {post.title}
                                    </h4>
                                    <span className="text-[10px] text-gray-400 font-mono">
                                      Published by {post.author} • {post.date}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => handleDeleteBlogPost(post.id)}
                                  className="flex items-center gap-1 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer self-end md:self-auto shrink-0"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MODULE 3: TESTIMONIALS */}
                    {cmsSubTab === 'testimonials' && (
                      <div className="flex flex-col gap-8 animate-fadeIn w-full">
                        {/* Add testi */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-8 mhe-card-shadow">
                          <h2 className="font-display font-black text-lg text-mhe-charcoal mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-mhe-orange" />
                            <span>Add Ground Testimony from Beneficiary</span>
                          </h2>

                          <form onSubmit={handleAddTestimonial} className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Beneficiary / Representative Name*</label>
                                <input
                                  type="text"
                                  required
                                  value={newTestiAuthor}
                                  onChange={(e) => setNewTestiAuthor(e.target.value)}
                                  placeholder="e.g., Baishali Sharma"
                                  className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl"
                                />
                              </div>

                              <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Location / Context Info*</label>
                                <input
                                  type="text"
                                  required
                                  value={newTestiLocation}
                                  onChange={(e) => setNewTestiLocation(e.target.value)}
                                  placeholder="e.g., Bonda Guwahati Diagnostic Camp"
                                  className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl"
                                />
                              </div>
                            </div>

                            {/* Testimonial Photo */}
                            <div className="flex flex-col gap-3 border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/10">
                              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                <span className="text-xs font-display font-black text-mhe-charcoal uppercase">
                                  Beneficiary Photo / Avatar (Optional)
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                <div className="md:col-span-1">
                                  <FileUploader 
                                    accept="image/*"
                                    onUploadSuccess={(url) => setNewTestiImageUrl(url)}
                                    label="Option A: Direct Image Upload"
                                    helperText="Drag & drop PNG, JPG, or JPEG images"
                                  />
                                </div>
                                <div className="md:col-span-1 flex flex-col gap-1.5 justify-center">
                                  <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Option B: Remote URL link</label>
                                  <input
                                    type="text"
                                    value={newTestiImageUrl}
                                    onChange={(e) => setNewTestiImageUrl(e.target.value)}
                                    placeholder="https://images.unsplash.com/... or relative path"
                                    className="px-4 py-2.5 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl w-full"
                                  />
                                  <p className="text-[10px] text-gray-400 font-sans mt-1">
                                    Pasting a URL or uploading above fills this input automatically.
                                  </p>
                                </div>
                                <div className="md:col-span-1 flex flex-col items-center justify-center border-2 border-dashed border-mhe-charcoal/20 p-3 rounded-xl bg-mhe-cream/10 h-full min-h-[140px]">
                                  <span className="text-[9px] font-mono font-bold uppercase text-gray-400 mb-2">Live Thumbnail Preview</span>
                                  {newTestiImageUrl ? (
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-mhe-charcoal bg-mhe-cream relative group shadow-sm">
                                      <img 
                                        src={newTestiImageUrl} 
                                        alt="Preview" 
                                        referrerPolicy="no-referrer"
                                        className="w-full h-full object-cover"
                                      />
                                      <button 
                                        type="button"
                                        onClick={() => setNewTestiImageUrl('')}
                                        className="absolute top-0 right-0 bg-rose-600 text-white rounded-full w-3.5 h-3.5 text-[8px] flex items-center justify-center font-bold"
                                        title="Clear Image"
                                      >
                                        ✕
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="text-center text-[10px] font-mono text-gray-400">
                                      No Image Selected
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Testimonial Quote / Text*</label>
                              <textarea
                                rows={4}
                                required
                                value={newTestiText}
                                onChange={(e) => setNewTestiText(e.target.value)}
                                placeholder="I started feeling safer after..."
                                className="p-4 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl leading-relaxed"
                              />
                            </div>

                            <div className="flex justify-end pt-2">
                              <button
                                type="submit"
                                className="mhe-btn-orange px-6 py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer"
                              >
                                + ADD TESTIMONIAL
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* Edit Testimonial Modal */}
                        {editingTestiId !== null && (
                          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                            <div 
                              className="absolute inset-0 bg-mhe-charcoal/80 backdrop-blur-sm"
                              onClick={() => setEditingTestiId(null)}
                            />
                            <div className="relative w-full max-w-xl bg-white border-4 border-mhe-charcoal rounded-3xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(28,46,49,1)] z-10 p-6 md:p-8">
                              <h3 className="font-display font-extrabold text-lg text-mhe-charcoal mb-4 uppercase">
                                Edit Testimonial
                              </h3>
                              <form onSubmit={handleSaveEditTestimonial} className="flex flex-col gap-4 text-left">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Name*</label>
                                    <input
                                      type="text"
                                      required
                                      value={editTestiAuthor}
                                      onChange={(e) => setEditTestiAuthor(e.target.value)}
                                      className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl w-full"
                                    />
                                  </div>

                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Location / Context*</label>
                                    <input
                                      type="text"
                                      required
                                      value={editTestiLocation}
                                      onChange={(e) => setEditTestiLocation(e.target.value)}
                                      className="px-4 py-2 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl w-full"
                                    />
                                  </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                  <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Quote / Text*</label>
                                  <textarea
                                    rows={4}
                                    required
                                    value={editTestiText}
                                    onChange={(e) => setEditTestiText(e.target.value)}
                                    className="p-4 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-sm text-mhe-charcoal font-sans rounded-xl leading-relaxed"
                                  />
                                </div>

                                <div className="flex flex-col gap-3 border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/10">
                                  <span className="text-xs font-display font-black text-mhe-charcoal uppercase">
                                    Beneficiary Photo / Avatar (Optional)
                                  </span>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <div className="md:col-span-1">
                                      <FileUploader 
                                        accept="image/*"
                                        onUploadSuccess={(url) => setEditTestiImageUrl(url)}
                                        label="Upload Photo"
                                        helperText="PNG, JPG, or JPEG"
                                      />
                                    </div>
                                    <div className="md:col-span-1 flex flex-col gap-1.5 justify-center">
                                      <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Remote URL link</label>
                                      <input
                                        type="text"
                                        value={editTestiImageUrl}
                                        onChange={(e) => setEditTestiImageUrl(e.target.value)}
                                        placeholder="https://images.unsplash.com/..."
                                        className="px-4 py-2.5 border-2 border-mhe-charcoal bg-mhe-cream focus:outline-none focus:bg-white text-xs text-mhe-charcoal font-sans rounded-xl w-full"
                                      />
                                    </div>
                                    <div className="md:col-span-1 flex flex-col items-center justify-center border-2 border-dashed border-mhe-charcoal/20 p-3 rounded-xl bg-mhe-cream/10 h-full min-h-[140px]">
                                      <span className="text-[9px] font-mono font-bold uppercase text-gray-400 mb-2">Current Image Preview</span>
                                      {editTestiImageUrl ? (
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-mhe-charcoal bg-mhe-cream relative group shadow-sm">
                                          <img 
                                            src={editTestiImageUrl} 
                                            alt="Preview" 
                                            referrerPolicy="no-referrer"
                                            className="w-full h-full object-cover"
                                          />
                                          <button 
                                            type="button"
                                            onClick={() => setEditTestiImageUrl('')}
                                            className="absolute top-0 right-0 bg-rose-600 text-white rounded-full w-3.5 h-3.5 text-[8px] flex items-center justify-center font-bold"
                                            title="Clear Image"
                                          >
                                            ✕
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="text-center text-[10px] font-mono text-gray-400">
                                          No Image Selected
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-2">
                                  <button
                                    type="button"
                                    onClick={() => setEditingTestiId(null)}
                                    className="px-4 py-2 border-2 border-mhe-charcoal hover:bg-mhe-cream rounded-xl text-xs font-mono font-bold cursor-pointer"
                                  >
                                    CANCEL
                                  </button>
                                  <button
                                    type="submit"
                                    className="mhe-btn-orange px-6 py-2 border-2 border-mhe-charcoal rounded-xl text-xs font-mono font-bold cursor-pointer"
                                  >
                                    SAVE CHANGES
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}

                        {/* List current testimonials */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 mhe-card-shadow">
                          <h3 className="font-display font-extrabold text-sm text-mhe-charcoal mb-4 uppercase">
                            Testimonial Ledger ({currentTestimonials.length} quotes)
                          </h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentTestimonials.map((t) => (
                              <div key={t.id} className="border-2 border-mhe-charcoal rounded-2xl p-4 bg-mhe-cream/10 hover:bg-mhe-cream/30 transition-all flex flex-col justify-between gap-4">
                                <div>
                                  <span className="text-2xl text-mhe-teal select-none font-bold">“</span>
                                  <p className="text-[11px] font-sans italic text-gray-600 leading-relaxed">
                                    {t.text}
                                  </p>
                                </div>
                                <div className="border-t border-dashed border-gray-200 pt-3 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    {t.imageUrl ? (
                                      <img 
                                        src={t.imageUrl} 
                                        alt={t.author} 
                                        referrerPolicy="no-referrer"
                                        className="w-8 h-8 rounded-full object-cover border border-mhe-charcoal shrink-0"
                                      />
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-white text-mhe-charcoal font-sans text-xs flex items-center justify-center border border-mhe-charcoal shrink-0">
                                        👤
                                      </div>
                                    )}
                                    <div>
                                      <h5 className="font-display font-bold text-[11px] text-mhe-charcoal leading-none">{t.author}</h5>
                                      <span className="text-[8px] font-mono text-mhe-orange uppercase font-black block mt-0.5">{t.location}</span>
                                    </div>
                                  </div>

                                  <div className="flex gap-1.5 shrink-0">
                                    <button
                                      onClick={() => handleStartEditTestimonial(t.id)}
                                      className="p-1.5 text-mhe-teal hover:bg-mhe-teal-light border border-transparent hover:border-mhe-teal rounded cursor-pointer"
                                      title="Edit Testimony"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTestimonial(t.id)}
                                      className="p-1.5 text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-300 rounded cursor-pointer"
                                      title="Delete Testimony"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MODULE 4: TV VIDEO POOL */}
                    {cmsSubTab === 'videos' && (
                      <div className="flex flex-col gap-8 animate-fadeIn w-full">
                        {/* Add video */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-8 mhe-card-shadow">
                          <h2 className="font-display font-black text-lg text-mhe-charcoal mb-4 flex items-center gap-2">
                            <Plus className="w-5 h-5 text-mhe-orange" />
                            <span>Add MP4 Video to CRT TV Pool</span>
                          </h2>

                          <form onSubmit={handleAddHeroVideo} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-3 border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/10">
                              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                <span className="text-xs font-display font-black text-mhe-charcoal uppercase">
                                  MP4 Video Source for CRT TV Pool*
                                </span>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FileUploader 
                                  accept="video/mp4"
                                  onUploadSuccess={(url) => setNewVideoUrl(url)}
                                  label="Option A: Direct Video Upload"
                                  helperText="Drag & drop direct MP4 video files"
                                />
                                <div className="flex flex-col gap-1.5 justify-center">
                                  <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Option B: Remote Video Link</label>
                                  <input
                                    type="text"
                                    required
                                    value={newVideoUrl}
                                    onChange={(e) => setNewVideoUrl(e.target.value)}
                                    placeholder="e.g., https://assets.mixkit.co/videos/preview/..."
                                    className="px-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                                  />
                                  <p className="text-[10px] text-gray-400 font-sans mt-1">
                                    Pasting an MP4 video link or uploading above fills this input automatically.
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <button
                                type="submit"
                                className="mhe-btn-orange px-6 py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer"
                              >
                                + ADD VIDEO URL TO PLAYLIST
                              </button>
                            </div>
                          </form>
                        </div>

                        {/* List current videos */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 mhe-card-shadow">
                          <h3 className="font-display font-extrabold text-sm text-mhe-charcoal mb-4 uppercase">
                            Active Playlist for CRT TV Screen ({currentHeroVideos.length} sources)
                          </h3>

                          <div className="flex flex-col gap-4">
                            {currentHeroVideos.map((url, idx) => (
                              <div key={idx} className="border-2 border-mhe-charcoal rounded-2xl p-4 bg-white flex justify-between items-center gap-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full border border-mhe-charcoal bg-mhe-cream flex items-center justify-center text-mhe-orange text-xs font-mono font-black shrink-0">
                                    {idx + 1}
                                  </div>
                                  <span className="text-[11px] font-mono text-gray-600 break-all leading-tight">
                                    {url}
                                  </span>
                                </div>

                                <button
                                  onClick={() => handleDeleteHeroVideo(idx)}
                                  disabled={currentHeroVideos.length <= 1}
                                  className="flex items-center gap-1 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer disabled:opacity-40"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MODULE 5: SITE PHOTOS & LOGO */}
                    {cmsSubTab === 'photos' && (
                      <div className="flex flex-col gap-8 animate-fadeIn w-full">
                        {/* Site Brand Logo */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-8 mhe-card-shadow">
                          <h2 className="font-display font-black text-lg text-mhe-charcoal mb-4 flex items-center gap-2">
                            <span className="text-xl">🎨</span>
                            <span>Update Brand Logo</span>
                          </h2>
                          <p className="text-xs text-gray-400 mb-6 font-sans">
                            Modify the main brand logo used in the header and footer navigation components across the site.
                          </p>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                            {/* Current Logo Preview */}
                            <div className="lg:col-span-4 flex flex-col items-center justify-center border-2 border-dashed border-mhe-charcoal/20 p-6 rounded-2xl bg-mhe-cream/10 h-full">
                              <span className="text-[10px] font-mono font-bold uppercase text-gray-400 mb-3">Current Logo Preview</span>
                              <div className="bg-mhe-charcoal p-4 rounded-xl border-2 border-mhe-charcoal flex items-center justify-center w-full max-w-[200px] aspect-[3/1]">
                                <img 
                                  src={currentLogoUrl} 
                                  alt="Brand Logo" 
                                  referrerPolicy="no-referrer"
                                  className="max-w-full max-h-full object-contain"
                                />
                              </div>
                            </div>

                            {/* Logo Edit Controls */}
                            <div className="lg:col-span-8 flex flex-col gap-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FileUploader 
                                  accept="image/*"
                                  onUploadSuccess={(url) => {
                                    handleUpdateLogo(url);
                                  }}
                                  label="Option A: Upload Logo Image"
                                  helperText="Upload transparent PNG or clean SVG logo"
                                />
                                <div className="flex flex-col gap-1.5 justify-center">
                                  <label className="text-xs font-mono font-bold text-mhe-charcoal uppercase">Option B: Logo Image URL</label>
                                  <div className="flex gap-2">
                                    <input
                                      type="text"
                                      defaultValue={currentLogoUrl}
                                      onBlur={(e) => {
                                        if (e.target.value && e.target.value !== currentLogoUrl) {
                                          handleUpdateLogo(e.target.value);
                                        }
                                      }}
                                      placeholder="/LOGO_lite.png or external link"
                                      className="px-4 py-2.5 w-full rounded-xl border-2 border-mhe-charcoal text-sm bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                                    />
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                        if (input && input.value !== currentLogoUrl) {
                                          handleUpdateLogo(input.value);
                                        }
                                      }}
                                      className="mhe-btn-orange px-4 py-2.5 rounded-xl text-xs font-mono font-bold cursor-pointer shrink-0"
                                    >
                                      Apply
                                    </button>
                                  </div>
                                  <p className="text-[10px] text-gray-400 font-sans mt-1">
                                    Type or paste URL, then press Apply or Tab-out to save.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Team Members & Board Avatars */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-8 mhe-card-shadow">
                          <h2 className="font-display font-black text-lg text-mhe-charcoal mb-4 flex items-center gap-2">
                            <span className="text-xl">👥</span>
                            <span>Board Members &amp; Team Avatars</span>
                          </h2>
                          <p className="text-xs text-gray-400 mb-6 font-sans">
                            Manage the display avatars and profile photos of founders, directors, coordinators, and heads. Changes are updated immediately on the About and Home page.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentBoardMembers.map((member: any, index: number) => (
                              <div key={member.name} className="border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/5 flex flex-col gap-4">
                                <div className="flex items-center gap-3 pb-3 border-b border-mhe-charcoal/10">
                                  <img 
                                    src={member.avatar} 
                                    alt={member.name} 
                                    referrerPolicy="no-referrer"
                                    className="w-12 h-12 rounded-full object-cover border-2 border-mhe-charcoal shrink-0"
                                  />
                                  <div>
                                    <h4 className="font-display font-extrabold text-sm text-mhe-charcoal leading-tight">{member.name}</h4>
                                    <p className="text-[10px] font-mono text-mhe-orange font-bold uppercase mt-0.5">{member.role}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                  {/* Direct Avatar Uploader */}
                                  <div>
                                    <FileUploader 
                                      accept="image/*"
                                      onUploadSuccess={(url) => {
                                        handleUpdateBoardMemberAvatar(index, url);
                                      }}
                                      label={`Upload Avatar for ${member.name.split(' ')[0]}`}
                                      helperText="Square PNG/JPG recommended"
                                    />
                                  </div>

                                  {/* Manual URL input with Apply button */}
                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-mono font-bold text-mhe-charcoal uppercase">Manual Avatar URL</label>
                                    <div className="flex gap-2">
                                      <input
                                        type="text"
                                        defaultValue={member.avatar}
                                        onBlur={(e) => {
                                          if (e.target.value && e.target.value !== member.avatar) {
                                            handleUpdateBoardMemberAvatar(index, e.target.value);
                                          }
                                        }}
                                        placeholder="Image URL"
                                        className="px-3 py-2 w-full rounded-lg border-2 border-mhe-charcoal text-xs bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                                      />
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                          if (input && input.value !== member.avatar) {
                                            handleUpdateBoardMemberAvatar(index, input.value);
                                          }
                                        }}
                                        className="mhe-btn-orange px-3 py-2 rounded-lg text-[10px] font-mono font-bold cursor-pointer shrink-0"
                                      >
                                        Apply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Domain Cover Images */}
                        <div className="bg-white border-4 border-mhe-charcoal rounded-3xl p-6 md:p-8 mhe-card-shadow animate-fadeIn">
                          <h2 className="font-display font-black text-lg text-mhe-charcoal mb-4 flex items-center gap-2">
                            <span className="text-xl">🗺️</span>
                            <span>Domain Cover Images</span>
                          </h2>
                          <p className="text-xs text-gray-400 mb-6 font-sans">
                            Manage the main representative background/cover images for the four programmatic domains. Changes are updated in real-time in the core focus cards and detailed work modules.
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {currentGalleryDomains.map((domain: any) => (
                              <div key={domain.id} className="border-2 border-mhe-charcoal p-4 rounded-2xl bg-mhe-cream/5 flex flex-col gap-4">
                                <div className="pb-3 border-b border-mhe-charcoal/10">
                                  <h4 className="font-display font-extrabold text-sm text-mhe-charcoal leading-tight">
                                    {domain.title}
                                  </h4>
                                  <p className="text-[10px] font-mono text-mhe-orange font-bold uppercase mt-0.5">
                                    Pillar ID: {domain.id}
                                  </p>
                                </div>

                                {domain.coverImage && (
                                  <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border-2 border-mhe-charcoal bg-mhe-cream relative">
                                    <img 
                                      src={domain.coverImage} 
                                      alt={domain.title} 
                                      referrerPolicy="no-referrer"
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}

                                <div className="grid grid-cols-1 gap-4">
                                  {/* Direct Image Uploader */}
                                  <div>
                                    <FileUploader 
                                      accept="image/*"
                                      onUploadSuccess={(url) => {
                                        handleUpdateDomainCoverImage(domain.id, url);
                                      }}
                                      label={`Upload New Cover for ${domain.title.split(' ')[0]}`}
                                      helperText="16:9 Aspect Ratio Landscape Recommended"
                                    />
                                  </div>

                                  {/* Manual URL Input */}
                                  <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-mono font-bold text-mhe-charcoal uppercase">Manual Cover URL</label>
                                    <div className="flex gap-2">
                                      <input
                                        type="text"
                                        defaultValue={domain.coverImage || ''}
                                        onBlur={(e) => {
                                          if (e.target.value && e.target.value !== domain.coverImage) {
                                            handleUpdateDomainCoverImage(domain.id, e.target.value);
                                          }
                                        }}
                                        placeholder="Paste image URL here"
                                        className="px-3 py-2 w-full rounded-lg border-2 border-mhe-charcoal text-xs bg-mhe-cream focus:outline-none focus:bg-white text-mhe-charcoal font-sans"
                                      />
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                          if (input && input.value !== domain.coverImage) {
                                            handleUpdateDomainCoverImage(domain.id, input.value);
                                          }
                                        }}
                                        className="mhe-btn-orange px-3 py-2 rounded-lg text-[10px] font-mono font-bold cursor-pointer shrink-0"
                                      >
                                        Apply
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Full Article Reader Modal Backdrop */}
          <AnimatePresence>
            {selectedBlogPost && (
              <div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mhe-charcoal/60 backdrop-blur-sm"
                id="blog-reader-modal-overlay"
              >
                {/* Click outside backdrop to close */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSelectedBlogPost(null)}
                  className="absolute inset-0 cursor-pointer"
                />

                {/* Modal Body */}
                <motion.div
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  className="bg-mhe-cream border-4 border-mhe-charcoal rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative z-60"
                  id="blog-reader-modal-body"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedBlogPost(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-mhe-charcoal bg-mhe-orange text-white flex items-center justify-center font-bold shadow-md hover:scale-105 active:scale-95 transition-transform duration-100 cursor-pointer focus:outline-none"
                    title="Close"
                  >
                    ✕
                  </button>

                  <div className="space-y-6">
                    {/* Category & Date Header line */}
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-[10px] font-mono bg-mhe-teal text-white px-2.5 py-0.5 rounded-full font-extrabold uppercase border border-mhe-teal/40">
                        {selectedBlogPost.category}
                      </span>
                      <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {selectedBlogPost.date}
                        <span className="mx-1">•</span>
                        <Clock className="w-3.5 h-3.5" />
                        {selectedBlogPost.readTime}
                      </span>
                    </div>

                    {/* Headline title */}
                    <h2 className="font-display font-black text-xl md:text-3xl text-mhe-charcoal leading-snug">
                      {selectedBlogPost.title}
                    </h2>

                    {/* Excerpt card */}
                    <div className="p-4 bg-white border-2 border-l-8 border-mhe-charcoal border-l-mhe-orange rounded-xl font-sans text-xs italic text-gray-600 leading-relaxed shadow-sm">
                      "{selectedBlogPost.excerpt}"
                    </div>

                    {/* Full Paragraphs */}
                    <div className="space-y-4 text-xs md:text-sm text-black font-sans leading-relaxed">
                      {selectedBlogPost.content.map((paragraph, idx) => (
                        <p key={idx} className="indent-4 md:indent-6">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Divider line */}
                    <div className="border-t-2 border-dashed border-mhe-charcoal/10 pt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6">
                      {/* Author credentials */}
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white border-2 border-mhe-charcoal flex items-center justify-center text-base shadow-sm">
                          ✍️
                        </div>
                        <div>
                          <h4 className="font-display font-black text-xs text-mhe-charcoal">{selectedBlogPost.author}</h4>
                          <span className="text-[10px] text-gray-400 font-mono block">{selectedBlogPost.authorRole} • Deepjyoti India Foundation</span>
                        </div>
                      </div>

                      {/* Modal Footer Controls */}
                      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                        {/* Like */}
                        <button
                          onClick={() => {
                            if (likedBlogPosts.includes(selectedBlogPost.id)) {
                              setLikedBlogPosts(likedBlogPosts.filter(id => id !== selectedBlogPost.id));
                            } else {
                              setLikedBlogPosts([...likedBlogPosts, selectedBlogPost.id]);
                            }
                          }}
                          className={`px-4 py-2 rounded-xl border-2 border-mhe-charcoal flex items-center gap-1.5 text-xs font-mono font-extrabold transition-all duration-150 cursor-pointer focus:outline-none ${
                            likedBlogPosts.includes(selectedBlogPost.id)
                              ? 'bg-[#ffe4e6] text-rose-600 mhe-badge-shadow'
                              : 'bg-white text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${likedBlogPosts.includes(selectedBlogPost.id) ? 'fill-current text-rose-600 animate-pulse' : ''}`} />
                          <span>{selectedBlogPost.likes + (likedBlogPosts.includes(selectedBlogPost.id) ? 1 : 0)} Likes</span>
                        </button>

                        <button
                          onClick={() => setSelectedBlogPost(null)}
                          className="bg-white border-2 border-mhe-charcoal hover:bg-gray-50 text-mhe-charcoal px-5 py-2 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer"
                        >
                          Close Dispatch
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </AnimatePresence>
      </main>

      {/* Shared Donation preset Modal across views */}
      <AnimatePresence>
        {donationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="shared-donation-modal">
            {/* Backdrop cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setDonationModalOpen(false)}
              className="absolute inset-0 bg-mhe-charcoal cursor-pointer"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-mhe-cream border-4 border-mhe-charcoal rounded-3xl max-w-md w-full p-6 shadow-2xl relative z-60 overflow-hidden"
            >
              {/* Decorative graphic */}
              <div className="absolute top-[-40px] right-[-40px] w-24 h-24 rounded-full bg-mhe-yellow/50 border border-mhe-charcoal -z-10" />

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-mhe-orange border-2 border-mhe-charcoal flex items-center justify-center mx-auto mb-3 text-white mhe-badge-shadow">
                  <Heart className="w-6 h-6 fill-current text-white" />
                </div>
                <h3 className="font-display font-extrabold text-xl text-mhe-charcoal">Support DIF Project Sampoorna</h3>
                <p className="text-xs text-black mt-1 leading-relaxed">
                  Your donation directly funds healthcare diagnostics under Project Sampoorna, students life-skills logbooks under OYF, or women's preventative checkups.
                </p>
              </div>

              {/* Pledge message state instead of alert boxes */}
              {donationPledgedText ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-mhe-teal-light border-2 border-mhe-charcoal rounded-xl text-center flex flex-col gap-2"
                >
                  <span className="text-lg">💖</span>
                  <p className="text-xs text-mhe-charcoal font-semibold leading-relaxed">
                    {donationPledgedText}
                  </p>
                  <button 
                    onClick={() => setDonationModalOpen(false)}
                    className="bg-mhe-teal text-white font-mono text-[10px] font-bold px-3 py-1.5 rounded-lg border border-mhe-charcoal mx-auto cursor-pointer"
                  >
                    CLOSE WINDOW
                  </button>
                </motion.div>
              ) : (
                /* Tiers list shortcut */
                <div className="flex flex-col gap-3 mt-5">
                  <p className="text-xs font-mono font-bold text-mhe-charcoal uppercase text-left">Pledge options:</p>
                  {DONATION_TIERS.map((tier, index) => {
                    const colors = [
                      'bg-[#FCF7E6] hover:bg-[#F2E5B1]',
                      'bg-mhe-teal-light hover:bg-[#D5E6E4]',
                      'bg-[#EBF7F4] hover:bg-[#CEF0E8]',
                      'bg-mhe-orange-light hover:bg-[#FDDED2]'
                    ];
                    const bgClass = colors[index % colors.length];
                    return (
                      <button 
                        key={tier.id} 
                        onClick={() => {
                          setDonationPledgedText(`Sincere Thanks! You have pledged ₹${tier.amount.toLocaleString('en-IN')} specifically to: "${tier.title}". This helps DIF coordinates clinical checkpoints and cognitive-emotional resilience toolkits.`);
                        }}
                        className={`p-3 ${bgClass} border-2 border-mhe-charcoal rounded-2xl flex flex-col gap-1 text-left relative mhe-badge-shadow cursor-pointer w-full focus:outline-none transition-all duration-200 active:scale-98`}
                      >
                        {tier.popular && (
                          <span className="absolute top-2.5 right-2 a-z bg-mhe-orange text-white text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-full border border-mhe-charcoal">
                            POPULAR
                          </span>
                        )}
                        <h4 className="font-display font-extrabold text-xs text-mhe-charcoal">
                          {tier.title} — ₹{tier.amount.toLocaleString('en-IN')}
                        </h4>
                        <p className="text-[10px] text-black leading-tight">
                          {tier.description}
                        </p>
                        <p className="text-[10px] text-mhe-teal font-semibold mt-1">
                          Direct Target: {tier.outcome}
                        </p>
                      </button>
                    );
                  })}

                  <button
                    onClick={() => setDonationModalOpen(false)}
                    className="w-full bg-white border-2 border-mhe-charcoal py-2 rounded-2xl text-xs font-bold text-mhe-charcoal hover:bg-gray-50 cursor-pointer text-center"
                  >
                    Close Dialog
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Core modern Footer */}
      <Footer 
        setActiveTab={handleNavChange} 
        openDonationModal={openDonationModal} 
        activeTab={activeTab}
        logoUrl={currentLogoUrl}
      />

      {/* Sampoorna AI Virtual Interactive Assistant */}
      <Chatbot 
        onNavigate={handleNavChange} 
        openDonationModal={openDonationModal} 
      />
    </div>
  );
}
