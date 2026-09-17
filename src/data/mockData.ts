import {
  ChildProfile,
  DailyTask,
  MedicalReport,
  Specialist,
  TherapySession,
  CommunityBlog,
  CommunityEvent,
  JournalEntry,
  EmergencyContact,
  ChatMessage,
  ChatContact,
  PreSavedActivity
} from '../types';

export const INITIAL_CHILD_PROFILE: ChildProfile = {
  id: 'child-vihaan-01',
  name: 'Vihaan Patel',
  relation: 'Son',
  gender: 'Male',
  age: 10,
  height: '134 cm',
  weight: '31 kg',
  communicationStyle: 'Verbal',
  supportNeed: 'Moderate',
  supportNeedDescription: 'Needs regular support with sensory regulation, social communication, and daily transitions.',
  triggers: ['Hungry', 'Loud Sound', 'Bright Light', 'Crowded Place'],
  strengths: ['Pattern recognition', 'Lego building', 'Visual memory', 'Gentle with animals'],
  interests: ['Building with Lego', 'Picture books', 'Cloud watching', 'Drawing shapes'],
  emergencyContactId: 'ec-1'
};

export const INITIAL_TASKS: DailyTask[] = [
  {
    id: 't-1',
    title: 'Morning Walk & Fresh Air',
    category: 'Daily Routine',
    time: '07:30 AM',
    completed: true,
    dateStr: '2025-12-04',
    description: 'Gentle 15-minute walk around the garden to wake up the senses'
  },
  {
    id: 't-2',
    title: 'Water the Plants',
    category: 'Daily Routine',
    time: '08:30 AM',
    completed: true,
    dateStr: '2025-12-04',
    description: 'Sensory water touch and caring for balcony plants'
  },
  {
    id: 't-3',
    title: 'Building with Lego',
    category: 'Creative and Expression',
    time: '10:00 AM',
    completed: true,
    dateStr: '2025-12-04',
    description: 'Color-sorted block tower building to stimulate fine motor skills'
  },
  {
    id: 't-4',
    title: 'Play with Sensory Toys',
    category: 'Sensory',
    time: '11:30 AM',
    completed: true,
    dateStr: '2025-12-04',
    description: 'Textured squish balls and calm sensory sand box'
  },
  {
    id: 't-5',
    title: 'Practice Eye Contact',
    category: 'Social',
    time: '02:00 PM',
    completed: false,
    dateStr: '2025-12-04',
    description: 'Gentle turn-taking game with eye-level mirror and favorite puppet'
  },
  {
    id: 't-6',
    title: 'Picture Book Reading',
    category: 'Creative and Expression',
    time: '03:30 PM',
    completed: false,
    dateStr: '2025-12-04',
    description: 'Pointing to emotional expressions and naming colors together'
  },
  {
    id: 't-7',
    title: 'Dance Session & Body Rhythm',
    category: 'Social',
    time: '05:00 PM',
    completed: false,
    dateStr: '2025-12-04',
    description: 'Calm ambient rhythmic dance to release afternoon physical energy'
  },
  {
    id: 't-8',
    title: 'Watch the Clouds & Quiet Time',
    category: 'Outdoor',
    time: '06:00 PM',
    completed: false,
    dateStr: '2025-12-04',
    description: 'Balcony cloud spotting before sunset to decompress'
  },
  {
    id: 't-9',
    title: 'Homework & Drawing Time',
    category: 'Daily Routine',
    time: '07:15 PM',
    completed: false,
    dateStr: '2025-12-04',
    description: 'Structured 20-minute visual tracing sheets with low lighting'
  }
];

export const INITIAL_PRE_SAVED_ACTIVITIES: PreSavedActivity[] = [
  // Sensory Domain
  {
    id: 'psa-sensory-1',
    title: 'Kinetic Sand & Textured Clay Play',
    category: 'Sensory',
    suggestedTime: '11:00 AM',
    durationMinutes: 20,
    description: 'Tactile desensitization and fine motor calming with soft textured kinetic sand and mold cups.',
    sensoryBenefit: 'Proprioceptive Calming',
    timeOfDay: 'Morning',
    tags: ['Calming', 'Tactile', 'Fine Motor']
  },
  {
    id: 'psa-sensory-2',
    title: 'Weighted Blanket & Deep Pressure Reset',
    category: 'Sensory',
    suggestedTime: '01:30 PM',
    durationMinutes: 15,
    description: '15-minute quiet resting under the 3.5kg sensory weighted blanket with soft lullaby ambient sound.',
    sensoryBenefit: 'Deep Pressure Therapy',
    timeOfDay: 'Afternoon',
    tags: ['De-escalation', 'Nervous System', 'Rest']
  },
  {
    id: 'psa-sensory-3',
    title: 'Bubble Blowing & Diaphragm Breathing',
    category: 'Sensory',
    suggestedTime: '04:30 PM',
    durationMinutes: 15,
    description: 'Gentle blowing wand technique that reinforces deep, slow diaphragmatic exhalations to relieve stress.',
    sensoryBenefit: 'Oral-Motor Regulation',
    timeOfDay: 'Afternoon',
    tags: ['Breathing', 'Speech Support', 'Fun']
  },
  {
    id: 'psa-sensory-4',
    title: 'Sensory Hammock / Indoor Swing Session',
    category: 'Sensory',
    suggestedTime: '05:30 PM',
    durationMinutes: 20,
    description: 'Rhythmic linear swinging to satisfy vestibular cravings and lower late-afternoon hyperactivity.',
    sensoryBenefit: 'Vestibular Integration',
    timeOfDay: 'Evening',
    tags: ['Vestibular', 'Balance', 'Soothing']
  },
  {
    id: 'psa-sensory-5',
    title: 'Warm Water Splash & Sponge Squeezing',
    category: 'Sensory',
    suggestedTime: '07:45 PM',
    durationMinutes: 20,
    description: 'Gentle warm water hydrotherapy with squeeze sponges before bedtime to ease muscle tension.',
    sensoryBenefit: 'Tactile Hydro-Relaxation',
    timeOfDay: 'Evening',
    tags: ['Water Play', 'Pre-bedtime', 'Calming']
  },

  // Daily Routine Domain
  {
    id: 'psa-routine-1',
    title: 'Toothbrushing with 2-Min Visual Timer',
    category: 'Daily Routine',
    suggestedTime: '07:45 AM',
    durationMinutes: 10,
    description: 'Four-quadrant picture card guidance using non-foaming mild strawberry paste.',
    sensoryBenefit: 'Oral Tactile Tolerance',
    timeOfDay: 'Morning',
    tags: ['Hygiene', 'Independence', 'Visual Cue']
  },
  {
    id: 'psa-routine-2',
    title: 'Getting Dressed & Tag-Free Clothes Choice',
    category: 'Daily Routine',
    suggestedTime: '08:00 AM',
    durationMinutes: 15,
    description: 'Choosing between 2 pre-selected soft cotton outfits to build autonomy without decision fatigue.',
    sensoryBenefit: 'Executive Function Agency',
    timeOfDay: 'Morning',
    tags: ['Self-Care', 'Decision Making']
  },
  {
    id: 'psa-routine-3',
    title: 'Balcony Flower & Plant Watering',
    category: 'Daily Routine',
    suggestedTime: '08:45 AM',
    durationMinutes: 15,
    description: 'Carrying the lightweight watering can gives gentle heavy work input while caring for green plants.',
    sensoryBenefit: 'Proprioceptive Heavy Work',
    timeOfDay: 'Morning',
    tags: ['Mindfulness', 'Heavy Work', 'Nature']
  },
  {
    id: 'psa-routine-4',
    title: 'Pack School Bag with Picture Checklist',
    category: 'Daily Routine',
    suggestedTime: '06:30 PM',
    durationMinutes: 15,
    description: 'Step-by-step pictorial checklist: Water bottle, snack box, sensory fidget, notebook.',
    sensoryBenefit: 'Visual Sequencing Skill',
    timeOfDay: 'Evening',
    tags: ['Organization', 'School Prep']
  },
  {
    id: 'psa-routine-5',
    title: 'Tidy Up Toys into Color-Coded Bins',
    category: 'Daily Routine',
    suggestedTime: '08:15 PM',
    durationMinutes: 15,
    description: 'Clean-up transition song with yellow bin for Lego, blue bin for books, green bin for cars.',
    sensoryBenefit: 'Spatial Order & Predictability',
    timeOfDay: 'Evening',
    tags: ['Closure', 'Night Routine']
  },

  // Creative & Expression Domain
  {
    id: 'psa-creative-1',
    title: 'Lego Color Sorting & Tower Architecture',
    category: 'Creative and Expression',
    suggestedTime: '10:30 AM',
    durationMinutes: 30,
    description: 'Sorting bricks by color gradients then building symmetrical towers. High focus and satisfaction.',
    sensoryBenefit: 'Visual-Spatial Organization',
    timeOfDay: 'Morning',
    tags: ['Focus', 'Fine Motor', 'Lego']
  },
  {
    id: 'psa-creative-2',
    title: 'Washable Finger Painting & Sponge Prints',
    category: 'Creative and Expression',
    suggestedTime: '02:30 PM',
    durationMinutes: 25,
    description: 'Spread roll paper on the floor with safe organic paints. Encourages joyful non-verbal expression.',
    sensoryBenefit: 'Expressive Sensory Release',
    timeOfDay: 'Afternoon',
    tags: ['Art', 'Free Play', 'Expression']
  },
  {
    id: 'psa-creative-3',
    title: 'Music Listening with Noise-Canceling Earphones',
    category: 'Creative and Expression',
    suggestedTime: '03:45 PM',
    durationMinutes: 20,
    description: 'Listening to instrumental piano and flute melodies without outside background clutter.',
    sensoryBenefit: 'Auditory Decompression',
    timeOfDay: 'Afternoon',
    tags: ['Auditory', 'Music', 'Peaceful']
  },
  {
    id: 'psa-creative-4',
    title: 'Play-Dough Rolling & Cookie Cutter Shapes',
    category: 'Creative and Expression',
    suggestedTime: '04:15 PM',
    durationMinutes: 20,
    description: 'Kneading lavender-scented dough with wooden rolling pins to exercise grip strength.',
    sensoryBenefit: 'Hand Grip Strength',
    timeOfDay: 'Afternoon',
    tags: ['Tactile', 'Fine Motor', 'Aroma']
  },

  // Social Domain
  {
    id: 'psa-social-1',
    title: 'Gentle Eye-Contact & Expression Mirror Game',
    category: 'Social',
    suggestedTime: '09:15 AM',
    durationMinutes: 15,
    description: 'Looking at full-length mirror together, making happy/surprised faces without conversational pressure.',
    sensoryBenefit: 'Social Emotional Mimicry',
    timeOfDay: 'Morning',
    tags: ['Facial Cues', 'Connection', 'Joy']
  },
  {
    id: 'psa-social-2',
    title: 'Turn-Taking Wooden Marble Maze',
    category: 'Social',
    suggestedTime: '12:00 PM',
    durationMinutes: 20,
    description: 'Parent rolls one marble, then Vihaan rolls one. Uses "My turn / Your turn" visual token.',
    sensoryBenefit: 'Reciprocal Social Rhythm',
    timeOfDay: 'Morning',
    tags: ['Turn-Taking', 'Patience', 'Games']
  },
  {
    id: 'psa-social-3',
    title: 'AAC Picture Symbol Snack Choice',
    category: 'Social',
    suggestedTime: '03:15 PM',
    durationMinutes: 15,
    description: 'Using picture communication board to point to apple slices, banana, or salted crackers.',
    sensoryBenefit: 'Functional Communication',
    timeOfDay: 'Afternoon',
    tags: ['AAC', 'Communication', 'Snack']
  },
  {
    id: 'psa-social-4',
    title: 'Bedtime Social Story with Illustrated Cards',
    category: 'Social',
    suggestedTime: '07:30 PM',
    durationMinutes: 20,
    description: 'Reading a custom illustrated story about tomorrow’s schedule so the mind rests with certainty.',
    sensoryBenefit: 'Anticipatory Anxiety Relief',
    timeOfDay: 'Evening',
    tags: ['Social Story', 'Bonding', 'Security']
  },

  // Outdoor Domain
  {
    id: 'psa-outdoor-1',
    title: 'Barefoot Garden Grass Walk',
    category: 'Outdoor',
    suggestedTime: '07:15 AM',
    durationMinutes: 15,
    description: 'Walking on moist morning grass to ground the nervous system with natural textures.',
    sensoryBenefit: 'Grounding Somatosensory Input',
    timeOfDay: 'Morning',
    tags: ['Nature', 'Grounding', 'Fresh Air']
  },
  {
    id: 'psa-outdoor-2',
    title: 'Balcony Cloud & Bird Watching',
    category: 'Outdoor',
    suggestedTime: '05:45 PM',
    durationMinutes: 20,
    description: 'Quiet sitting with small binoculars to observe moving evening clouds and flying birds.',
    sensoryBenefit: 'Visual Horizon Calming',
    timeOfDay: 'Evening',
    tags: ['Quiet Time', 'Observation', 'Peace']
  },
  {
    id: 'psa-outdoor-3',
    title: 'Park Playground Swing & Tire Climbing',
    category: 'Outdoor',
    suggestedTime: '06:15 PM',
    durationMinutes: 30,
    description: 'High-back safe swing pushing and rubber tire climbing to burn off stored kinetic energy.',
    sensoryBenefit: 'Gross Motor Proprioception',
    timeOfDay: 'Evening',
    tags: ['Gross Motor', 'Playground', 'Energy']
  }
];

export const INITIAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-1',
    title: 'Comprehensive Neuro-Developmental Assessment',
    doctorName: 'Dr. Aakash Mehta',
    specialty: 'Neurologist',
    hospital: 'Neuro Specialist Centre',
    date: '14 October 2025',
    type: 'Neurology',
    summary: 'Demonstrated 35% improvement in auditory focus filtering. Recommended continuing sensory-friendly morning routines and regulated visual checklists.',
    fileName: 'Vihaan_Neuro_Evaluation_Oct2025.pdf',
    fileSize: '2.4 MB'
  },
  {
    id: 'rep-2',
    title: 'Quarterly Behavioral & Emotional Milestones Review',
    doctorName: 'Dr. Vaishnavi Thakar',
    specialty: 'Child Psychologist',
    hospital: 'Sanjeev Hospital',
    date: '10 October 2025',
    type: 'Psychology',
    summary: 'Meltdown frequency decreased from 4x/week to 1x/week. Notable increase in spontaneous verbal requests when hungry rather than crying.',
    fileName: 'Vihaan_Psychological_Report_Oct2025.pdf',
    fileSize: '1.8 MB'
  },
  {
    id: 'rep-3',
    title: 'Occupational Sensory Integration Profile',
    doctorName: 'Dr. Vaishnavi Thakar',
    specialty: 'Sensory Specialist',
    hospital: 'Sanjeev Hospital',
    date: '27 September 2025',
    type: 'Sensory Assessment',
    summary: 'Tactile tolerance with water and kinetic sand has notably normalized. Continue avoiding noisy crowded cafeterias.',
    fileName: 'Vihaan_Sensory_Mapping_Sep2025.pdf',
    fileSize: '3.1 MB'
  },
  {
    id: 'rep-4',
    title: 'Speech & Pragmatic Communication Progress',
    doctorName: 'Dr. Aakash Mehta',
    specialty: 'Pediatric Specialist',
    hospital: 'Neuro Specialist Centre',
    date: '15 September 2025',
    type: 'Pediatric',
    summary: 'Vocabulary retention has expanded to multi-word phrases. Responding promptly to parental vocal cues in quiet settings.',
    fileName: 'Vihaan_Speech_Progression_Sep2025.pdf',
    fileSize: '1.6 MB'
  }
];

export const INITIAL_SPECIALISTS: Specialist[] = [
  {
    id: 'spec-1',
    name: 'Dr. Shivani Joshi',
    role: 'Child Psychologist & Autism Specialist',
    hospital: 'Aura Developmental Clinic, Ahmedabad',
    rating: 4.8,
    reviewsCount: 142,
    experienceYears: 12,
    avatar: 'https://images.unsplash.com/photo-1594824813589-9a2884a1e944?auto=format&fit=crop&q=80&w=300',
    availability: 'Available Today',
    sessionPrice: '₹ 800 / session',
    isOnline: true,
    about: 'Specializes in gentle behavioral transition therapy, emotional regulation for autistic children, and proactive parental counseling.'
  },
  {
    id: 'spec-2',
    name: 'Dr. Aakash Mehta',
    role: 'Senior Pediatric Neurologist',
    hospital: 'Neuro Specialist Centre',
    rating: 4.9,
    reviewsCount: 210,
    experienceYears: 16,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    availability: 'Available Tomorrow',
    sessionPrice: '₹ 1200 / session',
    isOnline: false,
    about: 'Leading neurologist focusing on sensory modulation, neurological development, and medication-free behavioral stabilization.'
  },
  {
    id: 'spec-3',
    name: 'Dr. Vaishnavi Thakar',
    role: 'Sensory Integration & Child Psychologist',
    hospital: 'Sanjeev Hospital',
    rating: 4.7,
    reviewsCount: 98,
    experienceYears: 9,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    availability: 'Available in 2 hrs',
    sessionPrice: '₹ 750 / session',
    isOnline: true,
    about: 'Passionate about sensory gyms, de-escalation routines, and empowering caregivers through empathy-grounded techniques.'
  },
  {
    id: 'spec-4',
    name: 'Neha Patel',
    role: 'Speech & Language Pathologist',
    hospital: 'Bloom Pediatric Center',
    rating: 4.9,
    reviewsCount: 84,
    experienceYears: 8,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    availability: 'Available on Friday',
    sessionPrice: '₹ 650 / session',
    isOnline: false,
    about: 'Helps verbal and non-verbal children explore joyful vocalization, AAC assistive tools, and conversational confidence.'
  }
];

export const INITIAL_SESSIONS: TherapySession[] = [
  {
    id: 'sess-1',
    specialistId: 'spec-1',
    specialistName: 'Dr. Shivani Joshi',
    role: 'Child Psychologist',
    hospital: 'Aura Developmental Clinic',
    rating: 4.8,
    dateStr: 'Today, Thursday 4 Dec',
    timeStr: '10:00 AM - 11:00 AM',
    type: 'Video',
    status: 'upcoming',
    doctorAvatar: 'https://images.unsplash.com/photo-1594824813589-9a2884a1e944?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'sess-2',
    specialistId: 'spec-2',
    specialistName: 'Dr. Aakash Mehta',
    role: 'Neurologist',
    hospital: 'Neuro Specialist Centre',
    rating: 4.9,
    dateStr: 'Saturday, 6 Dec 2025',
    timeStr: '01:00 PM - 02:00 PM',
    type: 'Audio',
    status: 'upcoming',
    doctorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300'
  }
];

export const INITIAL_BLOGS: CommunityBlog[] = [
  {
    id: 'b-1',
    title: 'She Said Mamma!',
    author: 'Shweta Goswami',
    authorRole: 'Mom of Yashvi',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
    postedDate: '1st May, 2025',
    readTime: '3 min read',
    snippet: 'I still remember the time when Yashvi got diagnosed with Autism. She was just 3, not making eye contact and not trying to talk...',
    content: `I still remember the time when Yashvi got diagnosed with Autism, she was just 3, not making eye contact and not even trying to talk. But cut to today, when she's 5 and a half, she smiled at me and said "MAMMA". 

I cried — it was just a moment of pure connection. Her eye contact is improving and meltdowns are getting lesser. Honestly, these are the small moments that are our biggest victories.

If you are a parent reading this and waiting for your star's version of this, hold on. It's going to happen. Maybe not today, maybe not tomorrow, but one day you'll blink through your tears because the time has finally come.

Celebrate the small steps because they are going to be your biggest wins. Where growth finds beauty, it blooms at its own sacred pace.`,
    likes: 184,
    hasLiked: true,
    commentsCount: 38,
    isSaved: true,
    category: 'Milestones',
    badge: 'Trending Story'
  },
  {
    id: 'b-2',
    title: 'Growth in my life!!',
    author: 'Shweta Patel',
    authorRole: 'Mom of Vihaan',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    postedDate: '9 October, 2025',
    readTime: '4 min read',
    snippet: 'For the longest time I tried to fix Vihaan. But the day I stopped asking "Why is he not like others?" and started with "How can I be better for him?"...',
    content: `For the longest time I tried to fix Vihaan. But the day I stopped asking "Why is he not like others?" and started asking "How can I be better for him?" was the day when everything started changing.

My son didn't need fixing, but he needed understanding. So it was my turn to unlearn and unlisten from the society and start to fix myself. I am still learning, but now we as a family smile and laugh more.

Setting up our daily visual schedules in Anura gave Vihaan predictability. When he knows what comes next, his anxiety drops. And when his anxiety drops, his natural warmth shines through.

Don't let anyone convince you that your child needs to conform to standard timelines. Cherish their unique rhythm.`,
    likes: 215,
    hasLiked: false,
    commentsCount: 47,
    isSaved: true,
    category: 'Parent Healing',
    badge: 'Caregiver Voice'
  },
  {
    id: 'b-3',
    title: 'It was me who had to change first!',
    author: 'Parth Patel',
    authorRole: 'Dad of Vihaan',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    postedDate: '29th April, 2025',
    readTime: '3 min read',
    snippet: 'As a father, my initial reaction was denial. I thought if I pushed harder, he would adapt faster. But love in autism is about pacing, not pushing...',
    content: `As a father, my initial reaction was denial. I thought if I pushed harder, he would adapt faster. But love in autism is about pacing, not pushing.

I started sitting on the floor with him, simply observing what fascinated him about Lego bricks instead of telling him how they 'should' be assembled. That was the breakthrough. When he realized I was entering his world rather than yanking him into mine, he reached out and handed me a red block.

Acceptance isn't giving up; acceptance is the foundation from which real growth begins.`,
    likes: 96,
    hasLiked: false,
    commentsCount: 19,
    isSaved: false,
    category: 'Parent Healing'
  },
  {
    id: 'b-4',
    title: 'Our Quiet Corner',
    author: 'Shweta Patel',
    authorRole: 'Mom of Vihaan',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    postedDate: '18 November, 2025',
    readTime: '2 min read',
    snippet: 'We made a small quiet corner with cushions, fairy lights, and his favourite soft toy. At first, he ignored it. But today, after a small meltdown, he walked to it himself...',
    content: `We made a small quiet corner with cushions, fairy lights, and his favourite soft toy. At first, he ignored it. But today, after a small sensory meltdown from outside car horns, he walked to it all by himself.

He sat there, taking deep breaths and holding his elephant plushie. I didn't have to say a single word. That quiet corner became his sanctuary of self-soothing.

To every parent wondering if your efforts matter: yes, they do. Every seed of comfort you plant will sprout when they need it most.`,
    likes: 142,
    hasLiked: false,
    commentsCount: 22,
    isSaved: false,
    category: 'Sensory Tips'
  },
  {
    id: 'b-5',
    title: 'When words don’t come...',
    author: 'Mamta Joshi',
    authorRole: 'Mom of Aarav (7 yrs)',
    authorAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150',
    postedDate: '12 September, 2025',
    readTime: '3 min read',
    snippet: 'He didn’t say a word today, but he looked at me and smiled. That small exchange felt like a whole conversation. Sometimes silence holds the loudest love...',
    content: `He didn't say a single word today, but he looked straight into my eyes and smiled. That small exchange felt like an entire heartfelt conversation.

Sometimes silence holds the loudest love. There's a kind of intimate language between us that doesn't need vocal sound. It's in the way he places his hand on my shoulder, or leans his head against mine after an afternoon routine.

Never underestimate the power of unspoken trust.`,
    likes: 178,
    hasLiked: true,
    commentsCount: 31,
    isSaved: false,
    category: 'Everyday Life'
  },
  {
    id: 'b-6',
    title: 'Rainy Day, Happy Heart',
    author: 'Ananya Sharma',
    authorRole: 'Mom of Kabir (6 yrs)',
    authorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=150',
    postedDate: '24 August, 2025',
    readTime: '3 min read',
    snippet: 'We stepped outside even though it was drizzling. Kabir ran barefoot, splashing through puddles, laughing uncontrollably. For once, I didn’t stop him...',
    content: `We stepped outside even though it was drizzling. Kabir ran barefoot, splashing through rainwater puddles, laughing uncontrollably.

For once, I didn't stop him. I didn't worry about clothes getting muddy or wet shoes. I let him be free, messy, and wild — and I joined him! That sound of his pure laughter in the rain was the sweetest melody I had heard in months.

Sometimes the best therapy is letting life be unscripted and joyful.`,
    likes: 129,
    hasLiked: false,
    commentsCount: 14,
    isSaved: false,
    category: 'Milestones'
  }
];

export const INITIAL_EVENTS: CommunityEvent[] = [
  {
    id: 'ev-1',
    title: 'Paint, Draw or Build... No Rules',
    targetAudience: 'kids',
    date: 'Sunday, 1st December 2025',
    dateDay: '01',
    dateMonth: 'Dec',
    dateStr: '2025-12-01',
    time: '5:00 p.m. to 8:00 p.m.',
    duration: '3 hours',
    location: 'Little Bloom Studio, Satellite, Ahmedabad',
    city: 'Ahmedabad',
    eventType: 'in-person',
    attendingCount: 14,
    maxCapacity: 20,
    price: 199,
    priceFormatted: '₹ 199',
    category: 'Art & Play',
    description: 'A sensory-safe space where imagination leads the way! Children are free to paint, draw, sculpt kinetic sand, or build with blocks with no rules, expectations, or sensory overwhelm.',
    activitiesList: [
      'Tactile finger-painting with organic non-toxic washable dyes',
      'Clay modeling and textured rolling pins',
      'Lego architecture & color sorting zone',
      'Cozy fairy-lit reading tent for sensory de-escalation'
    ],
    sensoryAccommodations: [
      'Dimmed warm lighting (no flickering fluorescents)',
      'Noise-cancelling earmuffs provided on request',
      'Dedicated quiet de-escalation corner with beanbags',
      'Visual schedules posted at every activity station'
    ],
    organizerName: 'Little Bloom Sensory Studio & Art Collective',
    organizerRole: 'Pediatric Art Therapists',
    bannerGradient: 'from-[#AEE1F9]/30 to-[#E7F6FE]',
    isRegistered: false
  },
  {
    id: 'ev-2',
    title: 'Expert Talks: Managing Sensory Overload at Home',
    targetAudience: 'parents',
    date: 'Tuesday, 3rd December 2025',
    dateDay: '03',
    dateMonth: 'Dec',
    dateStr: '2025-12-03',
    time: '4:00 p.m. to 6:00 p.m.',
    duration: '2 hours',
    location: 'Live Interactive Webinar / Aura Developmental Centre',
    city: 'Ahmedabad & Online',
    eventType: 'virtual',
    virtualLink: 'https://meet.google.com/anura-sensory-circle',
    attendingCount: 28,
    maxCapacity: 50,
    price: 0,
    priceFormatted: 'Free Community Session',
    category: 'Expert Talks',
    description: 'Hosted by Dr. Shivani Joshi. Practical tools for decoding sensory meltdowns before they peak, designing soothing corners at home, and navigating school IEP transitions with dignity.',
    activitiesList: [
      'Decoding physiological signs of impending sensory dysregulation',
      'Building a budget-friendly home sensory diet',
      'Interactive Live Q&A with pediatric specialists',
      'Downloadable Visual Transition Templates kit'
    ],
    sensoryAccommodations: [
      'Live closed captioning enabled',
      'Camera-optional comfort environment',
      'Full replay and presentation slides provided to all registrants'
    ],
    organizerName: 'Dr. Shivani Joshi',
    organizerRole: 'Child Psychologist, Aura Clinic',
    bannerGradient: 'from-[#FFF4EE] to-[#FFE2D6]',
    isRegistered: true
  },
  {
    id: 'ev-3',
    title: 'Parent Circle: A Warm Evening to Speak & Be Heard',
    targetAudience: 'parents',
    date: 'Wednesday, 4th December 2025',
    dateDay: '04',
    dateMonth: 'Dec',
    dateStr: '2025-12-04',
    time: '5:00 p.m. to 7:00 p.m.',
    duration: '2 hours',
    location: 'Serenity Cafe & Garden, Bodakdev (2 km away)',
    city: 'Ahmedabad',
    eventType: 'in-person',
    attendingCount: 12,
    maxCapacity: 16,
    price: 0,
    priceFormatted: 'Free RSVP',
    category: 'Parent Circle',
    description: 'A quiet, judgment-free gathering for mothers and fathers of neurodivergent children. Sip herbal tea, share tears or small daily victories, and realize you are surrounded by people who truly get it.',
    activitiesList: [
      'Warm cup of chamomile or masala chai welcome',
      'Open-floor caregiver sharing: "One thing that surprised me this week"',
      'Exchanging local school & therapist recommendations',
      'Guided 5-minute collective breathing relaxation'
    ],
    sensoryAccommodations: [
      'Private outdoor garden patio with quiet ambient water fountain',
      'Soft floor seating and ergonomic armchairs',
      'Strict confidentiality and zero-judgment pledge'
    ],
    organizerName: 'Shweta Patel & Pooja Desai',
    organizerRole: 'Autism Parent Ambassadors, Ahmedabad',
    bannerGradient: 'from-[#E8F7F0] to-[#E7F6FE]',
    isRegistered: false
  },
  {
    id: 'ev-4',
    title: 'Calm Mornings Together: Mindful Movement & Stretches',
    targetAudience: 'both',
    date: 'Saturday, 7th December 2025',
    dateDay: '07',
    dateMonth: 'Dec',
    dateStr: '2025-12-07',
    time: '8:30 a.m. to 10:00 a.m.',
    duration: '1.5 hours',
    location: 'Riverfront Biodiversity Park (Near Lawn 3), Ahmedabad',
    city: 'Ahmedabad',
    eventType: 'in-person',
    attendingCount: 18,
    maxCapacity: 24,
    price: 99,
    priceFormatted: '₹ 99',
    category: 'Local Meetup',
    description: 'Gentle morning somatic stretches, barefoot grounding grass walking, and sensory movement games designed to bring deep calm, proprioceptive harmony, and joy to both parents and children side-by-side.',
    activitiesList: [
      'Gentle animal-movement yoga poses (bear walk, butterfly wings, tall tree)',
      'Barefoot dew walking for natural sensory grounding',
      'Giant bubble popping and diaphragmatic breathing game',
      'Healthy fruit snack & quiet nature exploration'
    ],
    sensoryAccommodations: [
      'Wide open green lawn with natural shade from neem and banyan trees',
      'Flexible participation: children can join in or observe comfortably',
      'Sensory water spray bottles and hydration station'
    ],
    organizerName: 'Dr. Vaishnavi Thakar',
    organizerRole: 'Sensory Integration Specialist',
    bannerGradient: 'from-[#AEE1F9]/40 to-[#E7F6FE]',
    isRegistered: false
  },
  {
    id: 'ev-5',
    title: 'Kids Sensory Water & Kinetic Sand Playdate',
    targetAudience: 'kids',
    date: 'Sunday, 8th December 2025',
    dateDay: '08',
    dateMonth: 'Dec',
    dateStr: '2025-12-08',
    time: '4:00 p.m. to 5:30 p.m.',
    duration: '1.5 hours',
    location: 'Sunflower Montessori Clubhouse, Vastrapur, Ahmedabad',
    city: 'Ahmedabad',
    eventType: 'in-person',
    attendingCount: 10,
    maxCapacity: 15,
    price: 0,
    priceFormatted: 'Free Community Session',
    category: 'Local Meetup',
    description: 'A deeply regulating play session for kids who seek tactile exploration! We have water pouring tables, magnetic fishing rods, color-changing ice cubes, and kinetic sand castles.',
    activitiesList: [
      'Warm water pouring with funnels, cups, and water wheels',
      'Scented kinetic sand sculpting with ocean animal molds',
      'Soft sensory textured balance beam walkway',
      'Calming bubble blowing finish'
    ],
    sensoryAccommodations: [
      'Low lighting with soft twinkle lights',
      'Individual sensory bins to prevent crowding or sharing stress',
      'Waterproof aprons and towel station provided'
    ],
    organizerName: 'Pooja Desai (Mom of Reyansh)',
    organizerRole: 'Community Parent Host',
    isUserOrganized: false,
    bannerGradient: 'from-[#E7F6FE] to-[#D4E3ED]',
    isRegistered: false
  },
  {
    id: 'ev-6',
    title: 'Family Sunset Picnic & Acoustic Melodies',
    targetAudience: 'both',
    date: 'Saturday, 14th December 2025',
    dateDay: '14',
    dateMonth: 'Dec',
    dateStr: '2025-12-14',
    time: '4:30 p.m. to 6:30 p.m.',
    duration: '2 hours',
    location: 'Kankaria Lakefront Green Enclave, Ahmedabad',
    city: 'Ahmedabad',
    eventType: 'in-person',
    attendingCount: 22,
    maxCapacity: 30,
    price: 0,
    priceFormatted: 'Free RSVP',
    category: 'Outdoor Exploration',
    description: 'Organized by Shweta Patel (Vihaan’s mom) for everyone in our community! Bring your family mats, comfortable sensory toys, and home snacks. We will enjoy quiet acoustic guitar and kalimba melodies with sunset lake breezes.',
    activitiesList: [
      'Soft acoustic guitar & chime lullabies (low, soothing volume)',
      'Family picnic mats and shared snacks',
      'Parachute wave games and gentle sensory balls',
      'Sunset quiet breath observation by the lake'
    ],
    sensoryAccommodations: [
      'Quiet secluded enclave far from amusement rides or loudspeakers',
      'Weighted lap blankets and noise earmuffs available at the organizer table',
      'Safe visual boundaries with friendly parent volunteers'
    ],
    organizerName: 'Shweta Patel (Mom of Vihaan)',
    organizerRole: 'Caregiver Community Organizer',
    isUserOrganized: true,
    bannerGradient: 'from-[#FFF4EE] to-[#E7F6FE]',
    isRegistered: true
  }
];

export const INITIAL_JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'j-1',
    date: '2025-12-04',
    dateDisplay: 'Today, 4th Dec 2025',
    mood: 'grateful',
    title: 'A gentle breakthrough at the breakfast table',
    victoryToday: 'Vihaan pointed to his water bottle and made eye contact before drinking instead of getting frustrated.',
    content: 'Mornings used to feel like an uphill race against sensory overload. Today we took 10 deep breaths together before starting his visual schedule. He calmly traced his breakfast tile and smiled when I placed his favorite sliced apples.',
    tags: ['Breakthrough', 'Visual Schedule', 'Calm Morning']
  },
  {
    id: 'j-2',
    date: '2025-12-02',
    dateDisplay: '2nd Dec 2025',
    mood: 'hopeful',
    title: 'Walking through the neighborhood without ear defenders',
    victoryToday: 'He tolerated birds chirping and mild traffic without signs of sensory distress for 12 continuous minutes.',
    content: 'We walked together holding hands. He pointed to a golden retriever and waved gently. Dr. Shivani was right: desensitization works best when paired with emotional safety and zero pressure.',
    tags: ['Sensory Progress', 'Outdoor Walk', 'Pride']
  },
  {
    id: 'j-3',
    date: '2025-11-28',
    dateDisplay: '28th Nov 2025',
    mood: 'peaceful',
    title: 'Finding stillness in our quiet corner',
    victoryToday: 'I allowed myself 20 minutes to read a book while Vihaan enjoyed his sensory light cube peacefully.',
    content: 'Caregiver guilt is so insidious — I always felt like every second had to be active therapy. Today I learned that my calm presence is the strongest anchor I can offer him. We both rested deeply.',
    tags: ['Caregiver Care', 'Quiet Corner', 'Peace']
  }
];

export const INITIAL_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'ec-1',
    name: 'Geeta Yadav',
    relation: 'Grandmother & Primary Helper',
    phoneNumber: '+91 98765 43210',
    isPrimary: true
  },
  {
    id: 'ec-2',
    name: 'Parth Patel',
    relation: 'Father / Co-Parent',
    phoneNumber: '+91 98250 12345',
    isPrimary: false
  },
  {
    id: 'ec-3',
    name: 'Dr. Aakash Mehta',
    relation: 'Treating Neurologist (Hospital SOS)',
    phoneNumber: '+91 79268 99000',
    isPrimary: false
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'cm-1',
    sender: 'doctor',
    text: 'Hi Shweta, how are you and Vihaan doing today?',
    time: '8:30 AM'
  },
  {
    id: 'cm-2',
    sender: 'user',
    text: "We're okay. Vihaan seemed a little restless in the morning during the sound of the mixer, but calmed down once we moved to the balcony.",
    time: '8:40 AM'
  },
  {
    id: 'cm-3',
    sender: 'doctor',
    text: "That's completely understandable. Sudden high-frequency kitchen appliances can trigger auditory startle. Did you get a chance to try the new visual routine we discussed yesterday?",
    time: '8:45 AM'
  },
  {
    id: 'cm-4',
    sender: 'user',
    text: 'Yes! I set up the visual schedule with pictures like you suggested on Anura. He checked off the Morning Walk and Plant Watering himself! 🌿',
    time: '8:57 AM'
  },
  {
    id: 'cm-5',
    sender: 'doctor',
    text: 'That is fantastic progress, Shweta! Giving him visual ownership over the day reduces anticipatory anxiety by more than half. Keep up this gentle pace!',
    time: '9:00 AM',
    attachment: {
      type: 'report',
      title: 'Dr. Shivani Joshi - Sensory Morning Checklist.pdf'
    }
  }
];

export const DAILY_AFFIRMATIONS = [
  "They may not say it, but they feel your love.",
  "You are doing enough. Your presence is your child's safest harbor.",
  "Progress isn't a straight line; it's a garden that unfolds in seasons.",
  "Celebrate the quiet milestones. Silence can hold the loudest victories.",
  "Where growth finds beauty, patience is the sunlight."
];

export const INITIAL_CHAT_CONTACTS: ChatContact[] = [
  {
    id: 'contact-spec-1',
    name: 'Dr. Shivani Joshi',
    avatar: 'https://images.unsplash.com/photo-1594824813589-9a2884a1e944?auto=format&fit=crop&q=80&w=300',
    role: 'Child Psychologist & Autism Specialist',
    type: 'specialist',
    isOnline: true,
    lastSeen: 'Online',
    phone: '+91 98251 44520',
    unreadCount: 1,
    about: 'Specializes in gentle behavioral transition therapy and emotional regulation.',
    hospital: 'Aura Developmental Clinic, Ahmedabad',
    lastMessageTime: '9:00 AM',
    lastMessageSnippet: 'That is fantastic progress, Shweta! Giving him visual ownership over the day...'
  },
  {
    id: 'contact-spec-2',
    name: 'Dr. Aakash Mehta',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    role: 'Senior Pediatric Neurologist',
    type: 'specialist',
    isOnline: false,
    lastSeen: 'Today at 7:15 AM',
    phone: '+91 79268 99000',
    unreadCount: 0,
    about: 'Leading neurologist focusing on sensory modulation and neurological development.',
    hospital: 'Neuro Specialist Centre',
    lastMessageTime: 'Yesterday',
    lastMessageSnippet: 'EEG review looks stable. We will maintain the current sensory diet.'
  },
  {
    id: 'contact-spec-3',
    name: 'Dr. Vaishnavi Thakar',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
    role: 'Sensory Integration Specialist',
    type: 'specialist',
    isOnline: true,
    lastSeen: 'Online',
    phone: '+91 98980 77123',
    unreadCount: 0,
    about: 'Passionate about sensory gyms, de-escalation routines, and tactile therapy.',
    hospital: 'Sanjeev Hospital',
    lastMessageTime: 'Tuesday',
    lastMessageSnippet: 'The deep pressure blanket before bed was a brilliant adjustment!'
  },
  {
    id: 'contact-spec-4',
    name: 'Neha Patel',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    role: 'Speech & Language Pathologist',
    type: 'specialist',
    isOnline: false,
    lastSeen: 'Yesterday at 5:40 PM',
    phone: '+91 97234 11890',
    unreadCount: 0,
    about: 'Helps verbal and non-verbal children explore joyful vocalization and AAC tools.',
    hospital: 'Bloom Pediatric Center',
    lastMessageTime: 'Dec 1',
    lastMessageSnippet: 'Sent voice recording feedback for Vihaan.'
  },
  {
    id: 'contact-caregiver-1',
    name: 'Geeta Yadav',
    avatar: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&q=80&w=300',
    role: 'Grandmother & Primary Helper',
    type: 'caregiver',
    isOnline: true,
    lastSeen: 'Online',
    phone: '+91 98765 43210',
    unreadCount: 0,
    about: 'Primary caregiver helper at home in Bodakdev.',
    lastMessageTime: '11:45 AM',
    lastMessageSnippet: 'Vihaan finished his khichdi and is doing his coloring book peacefully.'
  },
  {
    id: 'contact-caregiver-2',
    name: 'Parth Patel',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    role: 'Father / Co-Parent',
    type: 'caregiver',
    isOnline: false,
    lastSeen: 'Today at 10:20 AM',
    phone: '+91 98250 12345',
    unreadCount: 0,
    about: 'Co-parent, handles morning sensory walks and evening storytime.',
    lastMessageTime: '10:15 AM',
    lastMessageSnippet: 'Picked up the weighted vest from the clinic on my way from office!'
  },
  {
    id: 'contact-group-1',
    name: 'Ahmedabad Autism Circle 💙',
    avatar: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=300',
    role: 'Community Support Group • 28 Parents',
    type: 'group',
    isOnline: true,
    lastSeen: '28 members',
    phone: '',
    unreadCount: 2,
    about: 'Local circle of parents sharing daily tips, sensory toy swaps, and school recommendations.',
    lastMessageTime: '11:10 AM',
    lastMessageSnippet: 'Kavita: We are meeting at Riverfront Park this Saturday morning at 8:30!'
  }
];

export const INITIAL_CONVERSATIONS: Record<string, ChatMessage[]> = {
  'contact-spec-1': INITIAL_CHAT_MESSAGES,
  'contact-spec-2': [
    {
      id: 'cm-201',
      sender: 'user',
      text: 'Good morning Dr. Mehta. I uploaded Vihaan’s latest sleep log and EEG follow-up report.',
      time: 'Yesterday 3:15 PM',
      status: 'read'
    },
    {
      id: 'cm-202',
      sender: 'contact',
      text: 'Thank you Shweta. The wave patterns are consistent with healthy calming cycles. How is his bedtime transition with the dim amber night lamp?',
      time: 'Yesterday 3:45 PM',
      status: 'read'
    },
    {
      id: 'cm-203',
      sender: 'user',
      text: 'Much better! Falling asleep within 25 minutes now without restlessness.',
      time: 'Yesterday 4:02 PM',
      status: 'read'
    },
    {
      id: 'cm-204',
      sender: 'contact',
      text: 'EEG review looks stable. We will maintain the current sensory diet.',
      time: 'Yesterday 4:10 PM',
      status: 'read'
    }
  ],
  'contact-spec-3': [
    {
      id: 'cm-301',
      sender: 'contact',
      text: 'Hi Shweta, checking in regarding the deep pressure proprioceptive inputs we planned.',
      time: 'Tuesday 11:00 AM',
      status: 'read'
    },
    {
      id: 'cm-302',
      sender: 'user',
      text: 'He loved the weighted lap pad during reading time! It helped him stay seated without squirming.',
      time: 'Tuesday 11:30 AM',
      status: 'read'
    },
    {
      id: 'cm-303',
      sender: 'contact',
      text: 'The deep pressure blanket before bed was a brilliant adjustment!',
      time: 'Tuesday 11:35 AM',
      status: 'read'
    }
  ],
  'contact-spec-4': [
    {
      id: 'cm-401',
      sender: 'user',
      text: 'Hi Neha, Vihaan used his 2-picture choice card to request "Apple Juice" yesterday!',
      time: 'Dec 1, 4:20 PM',
      status: 'read'
    },
    {
      id: 'cm-402',
      sender: 'contact',
      text: 'Sent voice recording feedback for Vihaan. He is connecting the phonetic sound of /a/ so wonderfully!',
      time: 'Dec 1, 5:10 PM',
      status: 'read',
      attachment: {
        type: 'voice',
        title: 'Voice Feedback - Phonetic Modeling.m4a',
        duration: '0:42'
      }
    }
  ],
  'contact-caregiver-1': [
    {
      id: 'cm-501',
      sender: 'contact',
      text: 'Beta, did Vihaan take his morning vitamins?',
      time: '10:30 AM',
      status: 'read'
    },
    {
      id: 'cm-502',
      sender: 'user',
      text: 'Yes Ma, right after breakfast. His visual schedule task was checked off!',
      time: '10:35 AM',
      status: 'read'
    },
    {
      id: 'cm-503',
      sender: 'contact',
      text: 'Vihaan finished his khichdi and is doing his coloring book peacefully.',
      time: '11:45 AM',
      status: 'read'
    }
  ],
  'contact-caregiver-2': [
    {
      id: 'cm-601',
      sender: 'user',
      text: 'Parth, please don’t forget to pick up the weighted vest from the clinic.',
      time: '9:30 AM',
      status: 'read'
    },
    {
      id: 'cm-602',
      sender: 'contact',
      text: 'Picked up the weighted vest from the clinic on my way from office!',
      time: '10:15 AM',
      status: 'read'
    }
  ],
  'contact-group-1': [
    {
      id: 'cm-701',
      sender: 'contact',
      text: 'Shweta Goswami: Has anyone tried the noise-reducing headphones from QuietKids? They are having a community discount.',
      time: '10:45 AM',
      status: 'read'
    },
    {
      id: 'cm-702',
      sender: 'contact',
      text: 'Kavita: We are meeting at Riverfront Park this Saturday morning at 8:30! Bringing the sensory bubble wand.',
      time: '11:10 AM',
      status: 'read'
    }
  ]
};

