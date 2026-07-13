/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProgramPillar, StatItem, BoardMember, DonationTier, GalleryItem } from './types';

export const PROGRAM_PILLARS: ProgramPillar[] = [
  {
    id: 'health',
    title: 'Community Health & Preventive Care (Project Sampoorna)',
    nativeTitle: 'Domain 1: Primary Health',
    tagline: 'Delivering point-of-care medical screening, diagnostics, and emergency preparedness',
    iconName: 'HeartPulse',
    color: 'bg-mhe-teal',
    accentColor: '#0D5B67',
    bgColor: 'bg-mhe-teal-light',
    description: 'Brings free clinical resources directly to remote pockets, including specialized women\'s screening cycles, overall community wellbeing, and comprehensive holistic elderly care across multiple states.',
    keyInitiatives: [
      '16 Monthly Health Camps: Serving Bonda, Panjabari, Amsing, Panikhaiti (Guwahati), Shillong, and Mumbai.',
      'Women\'s 6-Month Care Cycle: Launched on International Women\'s Day (March 6, 2026) at Bonda, providing a structured longitudinal support ecosystem.',
      'Elderly Wellbeing & Geriatric Care: Providing regular medical monitoring, baseline parameter logs, nutrition, and compassionate guidance to elders.',
      'CPR & Emergency Preparedness: Hands-on demonstration in basic CPR, first-aid for choking/cardiac distress, and regional risk identification.',
      'Preventive Diagnostics: Focused on early non-symptomatic detection of hypertension, anemia, thyroid, diabetes, and overall physiological risks.'
    ],
    impactStats: [
      { label: 'INDIVIDUALS SCREENED', value: '6,000+' },
      { label: 'HEALTH CAMPS', value: '16' },
      { label: 'DIAGNOSTIC TESTS', value: '1,200+' }
    ],
    headlineStory: {
      title: 'A Simple Check-Up That Changed Everything',
      body: 'At a preventive health camp in Amsing, Assam, a middle-aged resident sat for a routine screening. For the first time in her life, her blood pressure and blood sugar were measured. The findings were alarming—her blood sugar was dangerously elevated despite no visual symptoms. The medical team explained the situation in simple language and guided her to specialized follow-up. Within weeks, she adopted lifestyle changes and regular monitoring: "Early identification helped me begin timely management. I am grateful to Deepjyoti India Foundation."',
      location: 'Amsing, Guwahati Health Camp'
    }
  },
  {
    id: 'mental_health',
    title: 'Mental Health & Emotional Well-being',
    nativeTitle: 'Domain 2: Mental Health & Emotional Well-being',
    tagline: 'Building emotional resilience, self-awareness, psychological well-being, and healthy coping skills across all stages of life.',
    iconName: 'Brain',
    color: 'bg-mhe-orange',
    accentColor: '#E65F2B',
    bgColor: 'bg-mhe-orange-light',
    description: 'Owning Your Feelings (OYF) is our core resilience and emotional literacy initiative. Under this domain, we design and deliver evidence-based, participant-centered programmes to empower students, schools, families, and elderly communities with essential psychological tools and coping strategies.',
    keyInitiatives: [
      'Owning Your Feelings (OYF): A structured 3-month emotional well-being and resilience programme that equips young people with the knowledge and skills to understand, express, and regulate their emotions.',
      'OYF Advanced Cohort: A 3-month advanced learning programme for graduates of the OYF foundation course, offering continued mentorship and experiential peer support.',
      'Mental Health Workshops for Schools & Colleges: Standalone interactive workshops tailored to the developmental needs of different age groups to promote stress management and resilience.',
      'Monthly Mental Health Webinar Series: A recurring online learning platform featuring psychologists, psychiatrists, and counsellors addressing contemporary mental health topics.',
      'Community Counselling & Emotional Support: Accessible counselling services providing individuals and families with emotional support and early psychosocial intervention.',
      'Geriatric Counselling & Emotional Wellness: A specialised programme supporting older adults with loneliness, grief, and healthy ageing.',
      'High School & College Youth Guidance: A career exploration and personal development programme helping students make informed academic choices and build confidence.'
    ],
    subPrograms: [
      {
        title: 'Owning Your Feelings (OYF)',
        description: "A structured 3-month emotional well-being and resilience programme that equips young people with the knowledge and skills to understand, express, and regulate their emotions. Through interactive workshops, guided reflection, group discussions, and practical coping techniques, participants strengthen emotional awareness, resilience, empathy, and communication skills while developing healthy responses to everyday challenges.",
        outcomes: [
          'Improved emotional awareness and self-reflection',
          'Healthy emotional regulation and coping strategies',
          'Stronger resilience and self-confidence',
          'Enhanced interpersonal relationships and empathy'
        ]
      },
      {
        title: 'OYF Advanced Cohort',
        description: "A 3-month advanced learning programme for graduates of the OYF foundation course. The cohort provides continued mentorship, experiential learning, guided discussions, and reflective practice to deepen emotional intelligence, strengthen resilience, and reinforce positive behavioural change. Participants become part of a supportive peer community that encourages sustained emotional growth and lifelong well-being.",
        outcomes: [
          'Advanced emotional resilience and self-management',
          'Improved communication and conflict resolution skills',
          'Stronger peer support and community engagement',
          'Long-term emotional well-being practices'
        ]
      },
      {
        title: 'Mental Health Workshops for Schools & Colleges',
        description: "Interactive standalone workshops designed for schools, colleges, universities, and educational institutions to promote emotional well-being, stress management, resilience, healthy relationships, examination preparedness, self-esteem, and mental health awareness. Sessions are tailored to the developmental needs of different age groups and delivered through engaging, evidence-informed methods.",
        outcomes: [
          'Increased mental health awareness and emotional literacy',
          'Early identification of emotional challenges',
          'Reduced stigma surrounding mental health',
          'Practical coping and stress management skills'
        ]
      },
      {
        title: 'Monthly Mental Health Webinar Series',
        description: "A recurring online learning platform featuring psychologists, psychiatrists, counsellors, educators, and subject experts who address contemporary mental health topics relevant to students, parents, educators, professionals, and the wider community. Each webinar combines expert insights with interactive discussions and practical takeaways.",
        outcomes: [
          'Increased public awareness of mental health',
          'Access to expert guidance and evidence-based information',
          'Practical strategies for emotional well-being',
          'Ongoing community engagement and learning'
        ]
      },
      {
        title: 'Community Counselling & Emotional Support',
        description: "Accessible counselling services that provide individuals and families with emotional support, guidance, and coping strategies for managing stress, anxiety, relationship challenges, grief, life transitions, and other psychosocial concerns. Services may include individual counselling, family counselling, group support sessions, and referrals where required.",
        outcomes: [
          'Improved emotional well-being and resilience',
          'Early psychosocial intervention and support',
          'Strengthened coping and problem-solving skills',
          'Enhanced family and community well-being'
        ]
      },
      {
        title: 'Geriatric Counselling & Emotional Wellness',
        description: "A specialised counselling programme supporting the emotional, psychological, and social well-being of older adults. The programme addresses loneliness, grief, ageing-related transitions, caregiver support, cognitive well-being, and healthy ageing through counselling, support groups, wellness sessions, and community engagement.",
        outcomes: [
          'Reduced loneliness and social isolation',
          'Improved emotional resilience and quality of life',
          'Better adjustment to ageing and life transitions',
          'Strengthened family support and intergenerational relationships'
        ]
      },
      {
        title: 'High School & College Youth Guidance',
        description: "A career exploration and personal development programme that helps students discover their strengths, interests, and aspirations while making informed academic and career decisions. Through aptitude exploration, self-reflection, and mentorship, students gain greater clarity, confidence, and direction for their educational and professional journeys.",
        outcomes: [
          'Career awareness and informed decision-making',
          'Greater self-understanding and confidence',
          'Goal setting and future planning skills',
          'Improved academic and career readiness'
        ]
      }
    ],
    impactStats: [
      { label: 'PARTICIPANTS', value: '500+' },
      { label: 'ASSESSMENTS', value: '98%' }, // 98% medium-high resilience
      { label: 'HIGH RESILIENCE', value: '47%' }
    ],
    headlineStory: {
      title: 'From Future Anxiety to Mindful Awareness',
      body: 'During the OYF Advance Cohort at Handique Girls\' College, a 19-year-old psychology student arrived gripped by chronic worry about her future. After learning "Thought Sampling", she paused, observed her exact worry-thoughts, and named them aloud. "I became aware of what I am thinking," she shared. The session gave her tools to create space between her thoughts and reactive emotions, letting her find relief and clarity.',
      location: 'Handique Girls\' College, Guwahati'
    }
  },
  {
    id: 'youth_development',
    title: 'Youth Development & Community Joy',
    nativeTitle: 'Domain 3: Youth & Engagement',
    tagline: 'Empowering young minds through career counseling, skill workshops, and dignity-led giving',
    iconName: 'Briefcase',
    color: 'bg-mhe-yellow',
    accentColor: '#FABD24',
    bgColor: 'bg-[#FCF7E6]',
    description: 'Uplifts the younger generation through interactive entrepreneurship programs and fosters social connection through seasonal celebration drives.',
    keyInitiatives: [
      'Academic Guidance & Interest Reflection (Circle of Healing): Classroom counseling sessions for Classes 9 & 10 in high school cohorts to reduce future path anxieties.',
      'Entrepreneurship Workshops: 1-day sessions held at Ferrando Shelter Home, Shillong to introduce 100 beneficiaries to basic business plans.',
      'Joy of Giving Festive Events: Spreading inclusive celebrations, toys, Santa visits, and meals across Guwahati, Shillong, and Mumbai.',
      'Food Distribution Drives: Supporting seasonal check-up camps with large-scale nutrition kits representing over 5,000+ individuals.',
      'Volunteer Networks: Connecting college youth ambassadors to lead civic care, mentoring, and localized community fundraising campaigns.'
    ],
    impactStats: [
      { label: 'STUDENTS SERVED', value: '200' },
      { label: 'CITIES COVERED', value: '3' }, // Guwahati, Shillong, Mumbai
      { label: 'BENEFICIARIES', value: '5,000+' }
    ],
    headlineStory: {
      title: 'The Courage to Voice One\'s Aspiration',
      body: 'At a secondary school in Shillong, a Class 10 student sat quietly, feeling overwhelmed by her family\'s social pressure to pursue the science stream when she loved writing. During our interest reflection session, she raised her hand to share her passion for journalism. Seeing her courage, several others followed. "It made us feel less anxious about making decisions after school."',
      location: 'Guwahati & Shillong High School Cohorts'
    }
  },
  {
    id: 'research',
    title: 'Research & Field Outreach (Data-Driven Models)',
    nativeTitle: 'Domain 4: Data & Research',
    tagline: 'Establishing evidence-based, longitudinal health tracking and replicable project designs',
    iconName: 'BookOpen',
    color: 'bg-mhe-mint',
    accentColor: '#00A88F',
    bgColor: 'bg-slate-50',
    description: 'Converts grassroots insights into rigorous documentation and evidence-based frameworks designed to support national development goals.',
    keyInitiatives: [
      'Before-and-After Metrics: Integrating pre-session and post-session testing to scientifically measure emotional resilience gains.',
      'Individual Health Cards: Creating structured care records monitoring vitals, Hb ratings, BMI, and clinical doctor signatures monthly.',
      'Master Excel Database: Cataloging participant parameters from Unique IDs BNW-001 to BNW-100 to map health progress over 6 months.',
      'Disease Category Sheets: Categorizing clinical risks (Red/Yellow/Green) to ensure targeted referral compliances and timely interventions.',
      'Replicable Framework Design: Fully documenting operational budgets, clinical team composition, and templates for state-wide scale-up.'
    ],
    impactStats: [
      { label: 'COHORT WOMEN', value: '100' },
      { label: 'TIME DURATION', value: '6 Months' },
      { label: 'KPI DATASETS', value: 'Replicable' }
    ],
    headlineStory: {
      title: 'A Rigorous Model Built for Replication',
      body: 'Deepjyoti India Foundation has successfully moved community care from simple camp days to a longitudinal tracking framework. By monitoring attendance, hemoglobin increases (targeting text increments >=1 g/dL), and blood sugar levels across the 6-month cycle, we generate reliable outcomes. This structured model ensures every donor rupee and volunteer hour leads to verifiable community progress.',
      location: 'Bonda-Narengi Research Cohort'
    }
  }
];

export const GENERAL_STATS: StatItem[] = [
  {
    id: 'reached',
    value: 6000,
    suffix: '+',
    label: 'Individuals Reached',
    description: 'Community members supported through health screenings, emotional literacy, and Joy of Giving.',
    iconName: 'Users'
  },
  {
    id: 'screenings',
    value: 4000,
    suffix: '+',
    label: 'Health Screenings',
    description: 'Point-of-care clinical check-ups completed across community camps and specialized cohorts.',
    iconName: 'HeartPulse'
  },
  {
    id: 'tests',
    value: 1200,
    suffix: '+',
    label: 'Diagnostic Tests',
    description: 'Laboratory investigations, including blood glucose, anemia check-ups, and holistic parameters tracking.',
    iconName: 'Activity'
  },
  {
    id: 'camps',
    value: 16,
    suffix: '',
    label: 'Community Health Camps',
    description: 'Free medical outreach camps organized across Assam, Meghalaya, and Maharashtra.',
    iconName: 'Calendar'
  }
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    name: 'Ashok Garg',
    role: 'Founder, Deepjyoti India Foundation',
    avatar: '/father 2.PNG',
    bio: 'Guided by the belief that societal progress begins when health and dignity are placed at the center of development, Ashok helps DIF translate strategic plans into long-term community partnerships.',
    quote: 'Our journey has been guided by a simple yet enduring belief that true progress in society begins when health, emotional wellbeing, and human dignity are placed at the centre of development.',
    region: 'Mumbai'
  },
  {
    name: 'Taranna Deepjyoti Garg',
    role: 'Founder, Deepjyoti India Foundation',
    avatar: '/Taranna.JPG',
    bio: 'Taranna founded DIF to align primary physical screenings with youth emotional resilience, establishing the flagship Project Sampoorna and OYF programs across multiple states.',
    quote: 'Meaningful social change rarely happens in a straight line. It unfolds through learning, community collaboration, and a deep commitment to listening to the people we serve.',
    region: 'Mumbai'
  },
  {
    name: 'Deepshika Garg',
    role: 'Entrepreneur',
    avatar: '/sis2.webp',
    bio: 'Deepshika manages school youth counseling systems and OYF cohorts, ensuring child development and school-level support are handled with absolute Care and clinical fidelity.',
    quote: 'Empathy in action transforms standard clinical screenings into spaces of deep warmth and developmental growth.',
    region: 'Mumbai'
  },
  {
    name: 'Amrita Borkotoky',
    role: 'Program Director',
    avatar: '/Amrita Borkotoky.jpeg',
    bio: 'Amrita directs program execution and field coordination for OYF and Project Sampoorna, ensuring clinical diagnostic fidelity and emotional support services are met seamlessly on the ground.',
    quote: 'We strive to bridge the critical gaps between community challenges and access to mental health and healthcare support. Our journey continues to be guided by compassion and collaboration.',
    region: 'Guwahati, Assam'
  },
  {
    name: 'Murchana',
    role: 'Program coordinator',
    avatar: '/Murchana.JPG',
    bio: 'Murchana spearheads the OYF (Owning Your Feelings) emotional literacy cohorts, facilitating interactive wellness workshops and reflective development clinics for students.',
    quote: 'Mental health awareness begins with acknowledgment. Once we own our feelings, the path to healing opens.',
    region: 'Assam'
  },
  {
    name: 'Deep Jyoti Saikia',
    role: 'Media Design Head',
    avatar: '/Deep%20Jyoti%20Saikia.JPG',
    bio: 'Deep Jyoti coordinates the ground logistics of Project Sampoorna across Assam, ensuring mobile medical units and outreach clinics reach remote or underserved communities with efficiency.',
    quote: 'Reaching the unreached with high-quality healthcare is not just a duty; it is our foundation.',
    region: 'Assam'
  },
  {
    name: 'Dharmendra Bansal',
    role: 'Accounts Head',
    avatar: '/accountant.jpeg',
    bio: 'Dharmendra oversees budgetary accountability, compliance audits, and absolute transparency in the allocation of programmatic resources for DIF\'s field clinics.',
    quote: 'Every rupee accounted for and directed to targeted clinics ensures trust and sustainable community impact.',
    region: 'Mumbai'
  },
  {
    name: 'Puja Sinha',
    role: 'HR Head',
    avatar: '/sis.jpeg',
    bio: 'Puja directs human resources, volunteer onboarding, and staff welfare across DIF\'s regional offices, fostering a compassionate, purpose-driven team environment.',
    quote: 'Our people are our greatest strength; empowering the team ensures we can serve our communities with ultimate dedication.',
    region: 'Mumbai'
  }
];

export const DONATION_TIERS: DonationTier[] = [
  {
    id: 'dt_camp',
    amount: 24000,
    title: 'Sponsor a Community Health Camp',
    description: 'Covers the full operational cost (₹24,000) of one monthly medical clinic camp, providing free physician consultations, lab diagnostics, medicines, and BLS demonstrations.',
    outcome: 'Funds 1 full health camp check-up serving 100+ rural or slum residents.',
    iconName: 'HeartPulse',
    popular: true
  },
  {
    id: 'dt_oyf',
    amount: 1200,
    title: 'Support OYF Youth Training',
    description: 'Provides session worksheets, emotional logbooks, and reflective training materials for one college student under the Owning Your Feelings syllabus.',
    outcome: 'Supports 1 student\'s intensive 3-month emotional literacy journey.',
    iconName: 'GraduationCap'
  },
  {
    id: 'dt_women_card',
    amount: 3600,
    title: 'Women\'s 6-Month Care Record',
    description: 'Funds individual health card parameters monitoring, hemoglobin check-ups, menstrual pads, and multi-specialist referrals under Domain 4 longitudinal studies.',
    outcome: 'Ensures dedicated physical and emotional tracking for 1 cohort participant.',
    iconName: 'Sparkles'
  }
];

// Testimonials data exactly from pages 43 and 44
export const TESTIMONIALS = [
  {
    id: 't1',
    text: 'The program organized today by Deepjyoti India Foundation is actually very important. The First Aid training has been conducted in many schools through the JRC and YRC from the Indian Red Cross Society. However, if you invite us again in the future, we will make the students aware of it. If people are aware of First Aid, then during emergencies such as accidents, electric shocks, or other sudden situations, we can provide immediate help using the available resources. If people know these basic techniques, it will definitely benefit society. If we regularly conduct such training in schools, people can learn CPR and know what to do when someone has a heart attack. In such situations, we may be able to help and possibly save someone\'s life. We even have real examples, even after someone has a heart attack, once they are taken to the doctor, we can still help.',
    author: 'Indian Red Cross Society Representative',
    location: 'First Aid & CPR Training Event, Guwahati'
  },
  {
    id: 't2',
    text: 'Today, a health awareness camp was organized in our school by Deepjyoti India Foundation. We benefited greatly from this camp. The students had their eyes checked for various diseases. They were given advice based on whether they had any health problems or not. In addition, a demonstration was given to the students on how to perform CPR (Cardiopulmonary Resuscitation). The students learned a lot from this, and it will help them during emergency situations. I would like to express my sincere thanks to Deepjyoti India Foundation, and we hope to have more such camps in the future. Thank You.',
    author: 'School Coordinator & Teacher',
    location: 'Guwahati Student Health Camp'
  },
  {
    id: 't3',
    text: 'During the health camp, doctors were present and educated us, (womens) about menstrual health issues. They also Informed us about cervical cancer, which has created an alarming situation across india. I\'m happy that steps are being taken to raise awareness. I believe these women will also create awareness among other women in the village, inform the nearby women, and educate their children in the same way. Thank you.',
    author: 'Self-Help Group Member / Village Participant',
    location: 'Women\'s Health Camp, Bonda'
  },
  {
    id: 't4',
    text: 'Today\'s session was really helpful. It helped us with identifying our own thoughts and in turn that helped us regulate our emotions. We had a very good interactive session as well wherein we discussed our thoughts and did an activity where we identified the situation and the emotion and our thoughts and work on them. So the activity which was held in today\'s session was really very interactive and it was also very interesting for the students and it help us to identify our thoughts, emotions and to reflect on our basically on our thinking pattern and cognitive functioning. So yes we have enjoyed today\'s session.',
    author: 'OYF Participant Student',
    location: 'Handique Girls\' College Session, Guwahati'
  },
  {
    id: 't5',
    text: 'These life skills sessions helped me rediscover my confidence. I use what I learned every day.',
    author: 'Baishali',
    location: 'College Cohort Student, Guwahati'
  },
  {
    id: 't6',
    text: 'The derma camp treated my years-old skin problems. I can finally go out without shame.',
    author: 'Mrs. Sharma',
    location: 'Community Health Beneficiary, Guwahati'
  },
  {
    id: 't7',
    text: 'The clowning sessions made me laugh again during treatment. It meant the world to me.',
    author: 'Hospital Patient Participant',
    location: 'Medical Clowning Event, Mumbai'
  }
];

export const CERTIFICATIONS = [
  {
    title: '12A Registration',
    desc: 'Government of India income-tax exemption enabling Deepjyoti India Foundation to retain programmatic development funds.'
  },
  {
    title: '80G Certification',
    desc: 'Donors receive a 50% tax deduction on financial contributions, incentivizing philanthropic giving for civic society.'
  },
  {
    title: 'CSR Compliant',
    desc: 'Fully registered and eligible to receive Corporate Social Responsibility funds under Section 135 of the Companies Act 2013.'
  },
  {
    title: 'NITI Aayog Darpan',
    desc: 'Officially registered on the Government of India\'s central NGO portal, maintaining absolute metrics of transparency and public accountability.'
  }
];

export const PARTNERS = [
  'Indian Red Cross Society',
  'Art of Living Foundation',
  'Cotton University',
  'Down Town Hospital, Guwahati',
  'Apex Cooperative Bank',
  'Handique Girls\' College',
  'ENT Department, Gauhati Medical College & Hospital (GMCH)',
  'Intas Foundation, Assam',
  'Assam State Rural Livelihood Mission (ASRLM)'
];

// Financial metrics exactly from page 42 of DIF Annual Report 2024-2026
export const FINANCIAL_OVERVIEW = {
  years: ['FY 24 (Audited)', 'FY 25 (Unaudited)'],
  income: {
    grants: [353603, 263846],
    total: [353603, 263846]
  },
  expenditure: {
    healthCamps: [235870, 0], // In FY25, grouped or zero
    careerGuidance: [41950, 0],
    otherProjectEvents: [742771, 345200],
    honoraria: [567913, 371000],
    travelOps: [13060, 0],
    adminOffice: [77924, 102],
    auditFees: [129500, 5000],
    total: [1808988, 721302]
  },
  deficit: [-1455385, -457456],
  deficitReduction: '67% SMALLER'
};

// Gallery data matching pages 45 and 46, updated with types, domains, and video capabilities
export const GALLERY_ITEMS: GalleryItem[] = [
  // 1. Health
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600',
    title: 'Community Health Screening Camp, Bonda Narengi',
    category: 'Preventive Care',
    domainId: 'health',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600',
    title: 'First Aid Demonstration with Red Cross Society trainers',
    category: 'BLS Training',
    domainId: 'health',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600',
    title: 'Regular vitals screening for rural elderly and children',
    category: 'Preventive Care',
    domainId: 'health',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=600',
    title: 'Local auxiliary nurses conducting immunization awareness sessions',
    category: 'Preventive Care',
    domainId: 'health',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600',
    title: 'Hands-on Basic Life Support & CPR Demonstration',
    category: 'Emergency Preparedness Video',
    domainId: 'health',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    url: 'https://images.unsplash.com/photo-1584515222906-5a3892404349?auto=format&fit=crop&q=80&w=600',
    title: 'Project Sampoorna Mobile Clinic & Physician Consultations',
    category: 'Mobile Camp Video',
    domainId: 'health',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  },

  // 2. Mental Health
  {
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    title: 'Guwahati Yoga & Stress Relief Workshops',
    category: 'Mental Health',
    domainId: 'mental_health',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600',
    title: 'OYF Discussion Circle at Handique Girls\' College',
    category: 'Emotional Literacy',
    domainId: 'mental_health',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
    title: 'Outdoor mindful breathing and somatic resilience workshop',
    category: 'Mental Health',
    domainId: 'mental_health',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1461532241246-13355554743b?auto=format&fit=crop&q=80&w=600',
    title: 'Support group circles foster mental well-being and emotional sharing',
    category: 'Emotional Literacy',
    domainId: 'mental_health',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600',
    title: 'Interactive Group Exercises & Emotional Literacy Discussions',
    category: 'Emotional Mindfulness Video',
    domainId: 'mental_health',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600',
    title: 'Therapeutic Laughter Session with Medical Clowning',
    category: 'Medical Clowning Video',
    domainId: 'mental_health',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  },

  // 3. Youth Development & Community Joy
  {
    url: 'https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&q=80&w=600',
    title: 'Career Counselling for Class 9 & 10 Studens in Shillong',
    category: 'Youth Development',
    domainId: 'youth_development',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80&w=600',
    title: 'Joy of Giving festive santa distribution',
    category: 'Community Joy',
    domainId: 'youth_development',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600',
    title: 'Interactive group work during soft skills and confidence building bootcamps',
    category: 'Youth Development',
    domainId: 'youth_development',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600',
    title: 'Youth public speaking training session in secondary schools',
    category: 'Youth Development',
    domainId: 'youth_development',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600',
    title: 'Ferrando Shelter Home Entrepreneurship Lectures',
    category: 'Skill Building Video',
    domainId: 'youth_development',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
    title: 'Shillong College Youth Interest Reflection Session',
    category: 'Youth Consultation Video',
    domainId: 'youth_development',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  },

  // 4. Research & Field Outreach
  {
    url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=600',
    title: 'Master Health Card Verification & Field Audits',
    category: 'Data Integration',
    domainId: 'research',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600',
    title: 'Longitudinal Community Health Parameters Collection',
    category: 'Grassroots Research',
    domainId: 'research',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600',
    title: 'Grassroots survey enumerators planning village household mapping',
    category: 'Grassroots Research',
    domainId: 'research',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
    title: 'Bi-annual community health indicators and comparative trend analysis',
    category: 'Data Integration',
    domainId: 'research',
    type: 'photo'
  },
  {
    url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
    title: 'Evidence-Based Community Care Design Framework Presentation',
    category: 'Strategic Models Video',
    domainId: 'research',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4'
  },
  {
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    title: 'Project Sampoorna Assam Health Data Analysis Report',
    category: 'Survey Data Video',
    domainId: 'research',
    type: 'video',
    videoUrl: 'https://www.w3schools.com/html/movie.mp4'
  }
];
