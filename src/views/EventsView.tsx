import React, { useState } from 'react';
import { CommunityEvent, EventAudience, EventCategory, ChildProfile } from '../types';
import { 
  Palette, 
  MapPin, 
  Clock, 
  Users, 
  Calendar, 
  Plus, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  X,
  Ticket,
  Video,
  HeartHandshake,
  ShieldCheck,
  Trash2,
  Share2,
  Check,
  Baby,
  Coffee,
  Heart,
  Tag,
  Compass,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EventsViewProps {
  events: CommunityEvent[];
  childProfile?: ChildProfile;
  onSelectEventToBook: (event: CommunityEvent) => void;
  onCreateEvent: (newEvent: Omit<CommunityEvent, 'id' | 'isRegistered'>) => void;
  onAddEventToSchedule?: (event: CommunityEvent) => void;
  onToggleRSVP?: (eventId: string) => void;
  onDeleteEvent?: (eventId: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  events,
  childProfile,
  onSelectEventToBook,
  onCreateEvent,
  onAddEventToSchedule,
  onToggleRSVP,
  onDeleteEvent
}) => {
  // Filters
  const [selectedAudience, setSelectedAudience] = useState<EventAudience | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'registered' | 'user-organized'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals & details
  const [selectedEventDetails, setSelectedEventDetails] = useState<CommunityEvent | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Create Event Form State
  const [formTitle, setFormTitle] = useState('');
  const [formAudience, setFormAudience] = useState<EventAudience>('both');
  const [formCategory, setFormCategory] = useState<EventCategory>('Art & Play');
  const [formEventType, setFormEventType] = useState<'in-person' | 'virtual'>('in-person');
  const [formDate, setFormDate] = useState('2025-12-10'); // YYYY-MM-DD
  const [formStartTime, setFormStartTime] = useState('04:30 PM');
  const [formEndTime, setFormEndTime] = useState('06:00 PM');
  const [formDuration, setFormDuration] = useState('1.5 hours');
  const [formLocation, setFormLocation] = useState('Little Bloom Studio, Satellite, Ahmedabad');
  const [formVirtualLink, setFormVirtualLink] = useState('https://meet.google.com/anura-community');
  const [formPrice, setFormPrice] = useState<number>(0);
  const [formMaxCapacity, setFormMaxCapacity] = useState<number>(15);
  const [formDescription, setFormDescription] = useState('');
  const [formOrganizerName, setFormOrganizerName] = useState('Shweta Patel (Mom of Vihaan)');
  const [formOrganizerRole, setFormOrganizerRole] = useState('Caregiver Community Host');

  // Activities list in form
  const [formActivities, setFormActivities] = useState<string[]>([
    'Welcome greeting & sensory check-in',
    'Sensory activity stations (sand, clay, tactile blocks)',
    'Calm transition with soft music cooldown'
  ]);
  const [newActivityInput, setNewActivityInput] = useState('');

  // Sensory accommodations in form
  const defaultAccommodationsList = [
    'Quiet de-escalation corner with beanbags',
    'Dimmed warm lighting (no flickering lights)',
    'Noise-cancelling earmuffs provided',
    'Visual pictorial schedule displayed',
    'Fidget toys and textured mats available',
    'Wheelchair & stroller accessible venue'
  ];
  const [formAccommodations, setFormAccommodations] = useState<string[]>([
    'Quiet de-escalation corner with beanbags',
    'Dimmed warm lighting (no flickering lights)',
    'Visual pictorial schedule displayed'
  ]);

  // Counts for audience badges
  const kidsCount = events.filter(e => e.targetAudience === 'kids').length;
  const parentsCount = events.filter(e => e.targetAudience === 'parents').length;
  const bothCount = events.filter(e => e.targetAudience === 'both').length;
  const registeredCount = events.filter(e => e.isRegistered).length;
  const userOrganizedCount = events.filter(e => e.isUserOrganized).length;

  // Filtered Events
  const filteredEvents = events.filter((ev) => {
    // Audience filter
    if (selectedAudience !== 'all' && ev.targetAudience !== selectedAudience) {
      return false;
    }
    // Status filter
    if (statusFilter === 'registered' && !ev.isRegistered) {
      return false;
    }
    if (statusFilter === 'user-organized' && !ev.isUserOrganized) {
      return false;
    }
    // Category filter
    if (categoryFilter !== 'all' && ev.category !== categoryFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchDesc = ev.description.toLowerCase().includes(q);
      const matchLoc = ev.location.toLowerCase().includes(q);
      const matchOrg = (ev.organizerName || '').toLowerCase().includes(q);
      const matchActivities = (ev.activitiesList || []).some(a => a.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchLoc && !matchOrg && !matchActivities) {
        return false;
      }
    }
    return true;
  });

  // Handlers
  const handleAddActivityToForm = () => {
    if (newActivityInput.trim()) {
      setFormActivities(prev => [...prev, newActivityInput.trim()]);
      setNewActivityInput('');
    }
  };

  const handleRemoveActivityFromForm = (index: number) => {
    setFormActivities(prev => prev.filter((_, i) => i !== index));
  };

  const handleToggleFormAccommodation = (item: string) => {
    setFormAccommodations(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) return;

    // Parse date into readable parts
    let dateDay = '10';
    let dateMonth = 'Dec';
    let fullDateStr = 'Wednesday, 10th December 2025';

    try {
      const dateParts = formDate.split('-');
      if (dateParts.length === 3) {
        const d = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2]));
        dateDay = String(d.getDate()).padStart(2, '0');
        dateMonth = d.toLocaleString('en-US', { month: 'short' });
        fullDateStr = d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      }
    } catch {
      // Fallback
    }

    const newEvent: Omit<CommunityEvent, 'id' | 'isRegistered'> = {
      title: formTitle.trim(),
      targetAudience: formAudience,
      date: fullDateStr,
      dateDay,
      dateMonth,
      dateStr: formDate,
      time: `${formStartTime} to ${formEndTime}`,
      duration: formDuration,
      location: formEventType === 'virtual' ? 'Live Online Session' : formLocation.trim(),
      city: formEventType === 'virtual' ? 'Online' : 'Ahmedabad',
      eventType: formEventType,
      virtualLink: formEventType === 'virtual' ? formVirtualLink : undefined,
      attendingCount: 1, // Organizer is attending
      maxCapacity: formMaxCapacity,
      price: formPrice,
      priceFormatted: formPrice === 0 ? 'Free Community Session' : `₹ ${formPrice}`,
      category: formCategory,
      description: formDescription.trim(),
      activitiesList: formActivities.length > 0 ? formActivities : ['Interactive community gathering'],
      sensoryAccommodations: formAccommodations,
      organizerName: formOrganizerName.trim(),
      organizerRole: formOrganizerRole.trim(),
      isUserOrganized: true,
      bannerGradient: formAudience === 'kids' 
        ? 'from-[#AEE1F9]/30 to-[#E7F6FE]' 
        : formAudience === 'parents' 
        ? 'from-[#FFF4EE] to-[#FFE2D6]' 
        : 'from-[#E8F7F0] to-[#E7F6FE]'
    };

    onCreateEvent(newEvent);

    // Fire celebration confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Reset Form
    setFormTitle('');
    setFormDescription('');
    setIsCreateModalOpen(false);
  };

  const getAudienceBadge = (audience: EventAudience) => {
    switch (audience) {
      case 'kids':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E7F6FE] text-[#121942] text-[11px] font-bold border border-[#AEE1F9]/60">
            <Baby className="w-3.5 h-3.5 text-[#121942]" />
            <span>For Kids</span>
          </span>
        );
      case 'parents':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF4EE] text-[#F26B3B] text-[11px] font-bold border border-[#F26B3B]/30">
            <Coffee className="w-3.5 h-3.5 text-[#F26B3B]" />
            <span>For Parents</span>
          </span>
        );
      case 'both':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E8F7F0] text-emerald-800 text-[11px] font-bold border border-emerald-300">
            <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/30" />
            <span>For Both (Kids & Parents)</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Action */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F6FE] text-[#121942] text-xs font-semibold mb-2">
            <Ticket className="w-3.5 h-3.5 text-[#F26B3B]" />
            Community Activities & Events Calendar
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121942] tracking-tight">
            Events for Kids & Parents
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-2xl leading-relaxed">
            Thoughtfully organized, low-stimulation activities and caregiver circles where autistic children and their families in Ahmedabad explore, connect, and thrive with zero judgment.
          </p>
        </div>

        {/* Organize Button */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
          <button
            id="btn-organize-event"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#F26B3B] hover:bg-[#e05a2a] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
            title="Organize and schedule your own event for the community"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Organize an Event</span>
          </button>
        </div>
      </div>

      {/* Target Audience Tabs - USER REQUEST: See activities for kids, parents or both */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border border-[#D4E3ED] shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#121942]">
            Filter by Who It's For:
          </span>
          <span className="text-xs text-gray-500">
            Showing <strong>{filteredEvents.length}</strong> of {events.length} activities
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* All */}
          <button
            id="audience-all"
            onClick={() => setSelectedAudience('all')}
            className={`flex items-center justify-center sm:justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              selectedAudience === 'all'
                ? 'bg-[#121942] text-white border-[#121942] shadow-xs'
                : 'bg-[#F8FBFE] text-gray-600 hover:text-[#121942] border-gray-200 hover:bg-gray-50'
            }`}
          >
            <span>All Activities</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ml-1.5 ${
              selectedAudience === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'
            }`}>
              {events.length}
            </span>
          </button>

          {/* For Kids */}
          <button
            id="audience-kids"
            onClick={() => setSelectedAudience('kids')}
            className={`flex items-center justify-center sm:justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              selectedAudience === 'kids'
                ? 'bg-[#121942] text-white border-[#121942] shadow-xs'
                : 'bg-[#E7F6FE]/70 text-[#121942] hover:bg-[#E7F6FE] border-[#AEE1F9]/50'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Baby className="w-3.5 h-3.5 text-[#F26B3B]" />
              <span>For Kids</span>
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ml-1.5 ${
              selectedAudience === 'kids' ? 'bg-white/20 text-white' : 'bg-[#AEE1F9]/60 text-[#121942]'
            }`}>
              {kidsCount}
            </span>
          </button>

          {/* For Parents */}
          <button
            id="audience-parents"
            onClick={() => setSelectedAudience('parents')}
            className={`flex items-center justify-center sm:justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              selectedAudience === 'parents'
                ? 'bg-[#121942] text-white border-[#121942] shadow-xs'
                : 'bg-[#FFF4EE]/70 text-[#F26B3B] hover:bg-[#FFF4EE] border-[#F26B3B]/30'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Coffee className="w-3.5 h-3.5 text-[#F26B3B]" />
              <span>For Parents</span>
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ml-1.5 ${
              selectedAudience === 'parents' ? 'bg-white/20 text-white' : 'bg-[#F26B3B]/20 text-[#F26B3B]'
            }`}>
              {parentsCount}
            </span>
          </button>

          {/* For Both (Kids & Parents) */}
          <button
            id="audience-both"
            onClick={() => setSelectedAudience('both')}
            className={`flex items-center justify-center sm:justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
              selectedAudience === 'both'
                ? 'bg-[#121942] text-white border-[#121942] shadow-xs'
                : 'bg-[#E8F7F0]/70 text-emerald-800 hover:bg-[#E8F7F0] border-emerald-200'
            }`}
          >
            <span className="flex items-center gap-1.5 truncate">
              <Heart className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/30" />
              <span>For Both</span>
            </span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ml-1.5 ${
              selectedAudience === 'both' ? 'bg-white/20 text-white' : 'bg-emerald-200 text-emerald-800'
            }`}>
              {bothCount}
            </span>
          </button>
        </div>

        {/* Secondary Search & Status Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by activity, quiet room, sensory sand, park..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick status tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 shrink-0">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                statusFilter === 'all'
                  ? 'bg-gray-100 text-[#121942] font-extrabold'
                  : 'text-gray-500 hover:text-[#121942]'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setStatusFilter('registered')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                statusFilter === 'registered'
                  ? 'bg-emerald-100 text-emerald-800 font-extrabold'
                  : 'text-gray-500 hover:text-emerald-800'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>My RSVPs ({registeredCount})</span>
            </button>
            <button
              onClick={() => setStatusFilter('user-organized')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                statusFilter === 'user-organized'
                  ? 'bg-orange-100 text-[#F26B3B] font-extrabold'
                  : 'text-gray-500 hover:text-[#F26B3B]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F26B3B]" />
              <span>Organized by Me ({userOrganizedCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white border border-[#D4E3ED] rounded-3xl p-10 text-center space-y-3">
          <Ticket className="w-12 h-12 text-[#AEE1F9] mx-auto" />
          <h3 className="text-base font-extrabold text-[#121942]">No events match your criteria</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            {searchQuery 
              ? `No activities found matching "${searchQuery}". Try clearing filters or searching for sensory keywords.`
              : 'There are currently no events matching this audience filter. You can organize one for your community!'}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSelectedAudience('all');
                setStatusFilter('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
            >
              Reset Filters
            </button>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#F26B3B] hover:bg-[#e05a2a] text-white text-xs font-bold shadow-xs"
            >
              Organize an Event
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onClick={() => setSelectedEventDetails(event)}
              className="bg-white border border-[#D4E3ED] hover:border-[#121942] rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header: Date + Audience Badge + Title */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    {/* Date Block */}
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#121942] text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                      <span className="text-lg font-black leading-none">{event.dateDay}</span>
                      <span className="text-[10px] font-bold text-[#AEE1F9] uppercase tracking-wider mt-0.5">
                        {event.dateMonth}
                      </span>
                    </div>

                    <div>
                      {/* Top Badges: Audience + Category */}
                      <div className="flex items-center gap-2 flex-wrap mb-1.5">
                        {getAudienceBadge(event.targetAudience)}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                          {event.category}
                        </span>
                        {event.isUserOrganized && (
                          <span className="text-[10px] font-bold text-[#F26B3B] bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Organized by You
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-[#121942] text-base sm:text-lg group-hover:text-[#F26B3B] transition-colors leading-snug">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  {/* Price & Format */}
                  <div className="text-right shrink-0">
                    <span className="text-sm font-extrabold text-[#121942] block">
                      {event.priceFormatted}
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center justify-end gap-1 mt-0.5">
                      {event.eventType === 'virtual' ? (
                        <>
                          <Video className="w-3 h-3 text-sky-600" />
                          <span>Virtual</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3 text-gray-400" />
                          <span>In-Person</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                {/* Timing, Duration & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 bg-[#F8FBFE] p-3 rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                  {event.description}
                </p>

                {/* Planned Activities Preview */}
                {event.activitiesList && event.activitiesList.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block">
                      Planned Activities:
                    </span>
                    <div className="space-y-1">
                      {event.activitiesList.slice(0, 3).map((act, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-gray-700">
                          <Check className="w-3.5 h-3.5 text-[#F26B3B] shrink-0 mt-0.5" />
                          <span className="truncate">{act}</span>
                        </div>
                      ))}
                      {event.activitiesList.length > 3 && (
                        <span className="text-[10px] text-gray-400 font-semibold block pl-5">
                          +{event.activitiesList.length - 3} more activities
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Sensory Accommodations Tags */}
                {event.sensoryAccommodations && event.sensoryAccommodations.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    {event.sensoryAccommodations.slice(0, 3).map((acc, idx) => (
                      <span key={idx} className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{acc}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Actions Row */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
                {/* Host Info & Attendees */}
                <div className="text-xs text-gray-500">
                  <div className="font-semibold text-gray-800 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#121942]" />
                    <span>{event.attendingCount} attending</span>
                    {event.maxCapacity && (
                      <span className="text-gray-400">({Math.max(0, event.maxCapacity - event.attendingCount)} spots left)</span>
                    )}
                  </div>
                  {event.organizerName && (
                    <span className="text-[11px] text-gray-400 block truncate max-w-[200px]">
                      By {event.organizerName}
                    </span>
                  )}
                </div>

                {/* Interactive Action Buttons */}
                <div className="flex items-center gap-2">
                  {/* RSVP / Registered status */}
                  {event.isRegistered ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleRSVP) onToggleRSVP(event.id);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1 hover:bg-emerald-100 transition-colors"
                      title="Click to toggle RSVP"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>RSVP'd ✓</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (event.price === 0 && onToggleRSVP) {
                          onToggleRSVP(event.id);
                          confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
                        } else {
                          onSelectEventToBook(event);
                        }
                      }}
                      className="px-4 py-1.5 rounded-xl bg-[#121942] hover:bg-[#F26B3B] text-white text-xs font-bold transition-all shadow-xs"
                    >
                      {event.price === 0 ? 'Free RSVP' : 'Book Now'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal / Sheet */}
      {selectedEventDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto space-y-5">
            {/* Top Close & Badge */}
            <div className="flex items-start justify-between pb-3 border-b border-[#E7F6FE]">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {getAudienceBadge(selectedEventDetails.targetAudience)}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {selectedEventDetails.category}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#121942]">
                  {selectedEventDetails.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEventDetails(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-[#121942]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Time & Location banner */}
            <div className="p-4 rounded-2xl bg-[#E7F6FE]/70 border border-[#AEE1F9]/50 space-y-2 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#121942]" />
                <span className="font-bold text-[#121942]">{selectedEventDetails.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#121942]" />
                <span>{selectedEventDetails.time} ({selectedEventDetails.duration || 'Session'})</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#121942]" />
                <span>{selectedEventDetails.location}</span>
              </div>
              {selectedEventDetails.eventType === 'virtual' && selectedEventDetails.virtualLink && (
                <div className="flex items-center gap-2 pt-1 border-t border-[#AEE1F9]/40">
                  <Video className="w-4 h-4 text-sky-600" />
                  <a 
                    href={selectedEventDetails.virtualLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-sky-600 font-bold underline truncate"
                  >
                    {selectedEventDetails.virtualLink}
                  </a>
                </div>
              )}
            </div>

            {/* About & Description */}
            <div>
              <h4 className="font-extrabold text-sm text-[#121942] mb-1.5">About this Activity</h4>
              <p className="text-xs leading-relaxed text-gray-600">
                {selectedEventDetails.description}
              </p>
            </div>

            {/* Detailed Planned Activities */}
            {selectedEventDetails.activitiesList && selectedEventDetails.activitiesList.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-[#121942]">Activities Planned:</h4>
                <div className="space-y-1.5 bg-[#F8FBFE] p-3.5 rounded-2xl border border-gray-100">
                  {selectedEventDetails.activitiesList.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-[#121942] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="leading-snug">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sensory Accommodations Checklist */}
            {selectedEventDetails.sensoryAccommodations && selectedEventDetails.sensoryAccommodations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-extrabold text-sm text-[#121942]">Sensory Accommodations Provided:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedEventDetails.sensoryAccommodations.map((acc, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Host info */}
            {selectedEventDetails.organizerName && (
              <div className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Organized By</span>
                  <span className="font-bold text-[#121942]">{selectedEventDetails.organizerName}</span>
                  <span className="text-gray-500 text-[11px] block">{selectedEventDetails.organizerRole || 'Community Host'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Attendees</span>
                  <span className="font-extrabold text-[#121942]">{selectedEventDetails.attendingCount} RSVP'd</span>
                </div>
              </div>
            )}

            {/* Bottom Actions inside modal */}
            <div className="flex items-center justify-between pt-4 border-t border-[#E7F6FE] flex-wrap sm:flex-nowrap gap-3">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Fee</span>
                <span className="text-base font-extrabold text-[#121942]">
                  {selectedEventDetails.priceFormatted}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {selectedEventDetails.isRegistered ? (
                  <button
                    type="button"
                    onClick={() => {
                      if (onToggleRSVP) onToggleRSVP(selectedEventDetails.id);
                      setSelectedEventDetails(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 hover:bg-emerald-100"
                  >
                    RSVP'd ✓ (Tap to cancel)
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const ev = selectedEventDetails;
                      setSelectedEventDetails(null);
                      if (ev.price === 0 && onToggleRSVP) {
                        onToggleRSVP(ev.id);
                        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
                      } else {
                        onSelectEventToBook(ev);
                      }
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#121942] hover:bg-[#F26B3B] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                  >
                    <Ticket className="w-4 h-4 text-[#AEE1F9]" />
                    <span>{selectedEventDetails.price === 0 ? 'Confirm Free RSVP' : 'Proceed to Book'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* USER REQUESTED: ORGANIZE AND SCHEDULE AN EVENT FOR EVERYONE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-[#E7F6FE]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] bg-[#FFF4EE] px-2.5 py-0.5 rounded-full inline-block mb-1">
                  Community Organizer Portal
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#121942]">
                  Organize an Event
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Schedule an activity or meetup for kids, parents, or families in our community.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-[#121942]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              {/* Target Audience Selector (Kids, Parents, Both) */}
              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
                  Who is this event for? *
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormAudience('kids')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                      formAudience === 'kids'
                        ? 'bg-[#121942] text-white border-[#121942] shadow-xs'
                        : 'bg-[#F8FBFE] text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Baby className="w-5 h-5" />
                    <span className="font-extrabold text-xs">For Kids</span>
                    <span className="text-[10px] opacity-80">Sensory play & art</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormAudience('parents')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                      formAudience === 'parents'
                        ? 'bg-[#121942] text-white border-[#121942] shadow-xs'
                        : 'bg-[#F8FBFE] text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Coffee className="w-5 h-5" />
                    <span className="font-extrabold text-xs">For Parents</span>
                    <span className="text-[10px] opacity-80">Caregiver circles</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormAudience('both')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 ${
                      formAudience === 'both'
                        ? 'bg-[#121942] text-white border-[#121942] shadow-xs'
                        : 'bg-[#F8FBFE] text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                    <span className="font-extrabold text-xs">For Both</span>
                    <span className="text-[10px] opacity-80">Family outings</span>
                  </button>
                </div>
              </div>

              {/* Event Title */}
              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Saturday Kinetic Sand & Water Splash Playdate"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
                  required
                />
              </div>

              {/* Category & Format */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as EventCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none bg-white"
                  >
                    <option value="Art & Play">Art & Sensory Play</option>
                    <option value="Parent Circle">Parent Support Circle</option>
                    <option value="Local Meetup">Local Neighborhood Meetup</option>
                    <option value="Expert Talks">Expert Talks & Workshop</option>
                    <option value="Outdoor Exploration">Outdoor & Nature Gathering</option>
                    <option value="Sensory Sports">Sensory Movement & Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Event Format
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormEventType('in-person')}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold ${
                        formEventType === 'in-person'
                          ? 'bg-[#121942] text-white border-[#121942]'
                          : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      In-Person
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormEventType('virtual')}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold ${
                        formEventType === 'virtual'
                          ? 'bg-[#121942] text-white border-[#121942]'
                          : 'bg-white text-gray-600 border-gray-200'
                      }`}
                    >
                      Virtual / Online
                    </button>
                  </div>
                </div>
              </div>

              {/* Schedule: Date, Start Time, End Time */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none"
                    placeholder="04:00 PM"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    End Time
                  </label>
                  <input
                    type="text"
                    value={formEndTime}
                    onChange={(e) => setFormEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none"
                    placeholder="05:30 PM"
                    required
                  />
                </div>
              </div>

              {/* Location or Virtual Link */}
              {formEventType === 'in-person' ? (
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Location / Venue *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Parimal Garden / Little Bloom Studio, Satellite, Ahmedabad"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Video Meeting Link (Google Meet / Zoom)
                  </label>
                  <input
                    type="text"
                    placeholder="https://meet.google.com/..."
                    value={formVirtualLink}
                    onChange={(e) => setFormVirtualLink(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none"
                  />
                </div>
              )}

              {/* Planned Activities Builder */}
              <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#F8FBFE] border border-gray-200">
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider">
                  Planned Activities for the Session:
                </label>
                <div className="space-y-1.5 mb-2">
                  {formActivities.map((act, idx) => (
                    <div key={idx} className="flex items-center justify-between gap-2 bg-white px-3 py-1.5 rounded-xl border border-gray-200 text-xs">
                      <span className="truncate">• {act}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveActivityFromForm(idx)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add an activity (e.g. Kinetic sand modeling)"
                    value={newActivityInput}
                    onChange={(e) => setNewActivityInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddActivityToForm();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddActivityToForm}
                    className="px-3 py-1.5 rounded-xl bg-[#121942] text-white font-bold text-xs"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Sensory Accommodations Checklist */}
              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
                  Sensory Accommodations You Will Provide:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {defaultAccommodationsList.map((acc, idx) => {
                    const isChecked = formAccommodations.includes(acc);
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleToggleFormAccommodation(acc)}
                        className={`text-left px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-all flex items-center gap-1.5 ${
                          isChecked
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                            : 'bg-white text-gray-600 border-gray-200'
                        }`}
                      >
                        <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300'
                        }`}>
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <span className="truncate">{acc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Host, Capacity & Fee */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formOrganizerName}
                    onChange={(e) => setFormOrganizerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Max Families
                  </label>
                  <input
                    type="number"
                    value={formMaxCapacity}
                    onChange={(e) => setFormMaxCapacity(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none"
                    min={2}
                    max={100}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Price (₹, 0 = Free)
                  </label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none"
                    min={0}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                  Event Description & Welcome Note *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe the environment, encouragement for nervous parents, and what to bring..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none resize-none"
                  required
                />
              </div>

              {/* Form Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7F6FE]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#F26B3B] hover:bg-[#e05a2a] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Publish & Organize Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
