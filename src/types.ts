export type NavigationTab = 
  | 'dashboard'
  | 'schedule'
  | 'child-profile'
  | 'therapy'
  | 'chat'
  | 'community'
  | 'events'
  | 'journal'
  | 'settings';

export type CommunicationStyle = 'Verbal' | 'Non Verbal' | 'AAC Devices' | 'Other';
export type SupportNeedLevel = 'Mild' | 'Moderate' | 'High';

export interface ChildProfile {
  id: string;
  name: string;
  relation: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  height: string;
  weight: string;
  communicationStyle: CommunicationStyle;
  supportNeed: SupportNeedLevel;
  supportNeedDescription: string;
  triggers: string[];
  strengths: string[];
  interests: string[];
  emergencyContactId: string;
}

export type TaskCategory = 
  | 'Daily Routine'
  | 'Creative and Expression'
  | 'Sensory'
  | 'Social'
  | 'Outdoor';

export interface DailyTask {
  id: string;
  title: string;
  category: TaskCategory;
  time: string;
  completed: boolean;
  dateStr: string; // YYYY-MM-DD or readable
  iconName?: string;
  description?: string;
}

export interface PreSavedActivity {
  id: string;
  title: string;
  category: TaskCategory;
  suggestedTime: string;
  durationMinutes: number;
  description: string;
  sensoryBenefit: string;
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Anytime';
  iconName?: string;
  tags?: string[];
  isCustom?: boolean;
}

export interface MedicalReport {
  id: string;
  title: string;
  doctorName: string;
  specialty: string;
  hospital: string;
  date: string;
  type: 'Neurology' | 'Psychology' | 'Sensory Assessment' | 'Pediatric';
  summary: string;
  fileName: string;
  fileSize: string;
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  hospital: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  avatar: string;
  availability: string;
  sessionPrice: string;
  isOnline: boolean;
  about: string;
}

export interface TherapySession {
  id: string;
  specialistId: string;
  specialistName: string;
  role: string;
  hospital: string;
  rating: number;
  dateStr: string;
  timeStr: string;
  type: 'Video' | 'Audio' | 'Chat';
  status: 'upcoming' | 'completed' | 'in-progress';
  doctorAvatar: string;
}

export interface CommunityBlog {
  id: string;
  title: string;
  author: string;
  authorRole: string; // e.g. "Mom of Yashvi" or "Dad of Vihaan"
  authorAvatar?: string;
  postedDate: string;
  readTime: string;
  snippet: string;
  content: string;
  likes: number;
  hasLiked?: boolean;
  commentsCount: number;
  isSaved?: boolean;
  category: 'Milestones' | 'Parent Healing' | 'Everyday Life' | 'Sensory Tips';
  badge?: string;
}

export type EventAudience = 'kids' | 'parents' | 'both';

export type EventCategory = 
  | 'Art & Play' 
  | 'Expert Talks' 
  | 'Local Meetup' 
  | 'Parent Circle'
  | 'Sensory Sports'
  | 'Outdoor Exploration';

export interface CommunityEvent {
  id: string;
  title: string;
  targetAudience: EventAudience;
  date: string;
  dateDay: string;
  dateMonth: string;
  dateStr?: string; // e.g. '2025-12-04'
  time: string;
  duration?: string;
  location: string;
  city: string;
  eventType?: 'in-person' | 'virtual';
  virtualLink?: string;
  attendingCount: number;
  maxCapacity?: number;
  price: number;
  priceFormatted: string;
  category: EventCategory;
  description: string;
  activitiesList?: string[];
  sensoryAccommodations?: string[];
  organizerName?: string;
  organizerRole?: string;
  isUserOrganized?: boolean;
  isRegistered?: boolean;
  bannerGradient: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  dateDisplay: string;
  mood: 'peaceful' | 'hopeful' | 'overwhelmed' | 'grateful' | 'exhausted';
  title: string;
  victoryToday: string;
  content: string;
  tags: string[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  relation: string;
  phoneNumber: string;
  isPrimary: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'doctor' | 'contact';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'report' | 'image' | 'voice';
    title: string;
    fileSize?: string;
    duration?: string;
  };
}

export interface ChatContact {
  id: string;
  name: string;
  avatar: string;
  role: string;
  type: 'specialist' | 'caregiver' | 'group';
  isOnline: boolean;
  lastSeen?: string;
  phone?: string;
  unreadCount: number;
  about?: string;
  hospital?: string;
  lastMessageTime?: string;
  lastMessageSnippet?: string;
}

