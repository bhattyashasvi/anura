import React, { useState, useRef, useEffect } from 'react';
import { AnuraLogo } from './AnuraLogo';
import { NavigationTab, ChildProfile } from '../types';
import { 
  Bell, 
  ShieldAlert, 
  Sparkles, 
  BookHeart, 
  CalendarCheck,
  ChevronDown,
  User,
  Heart,
  Ticket,
  Brain,
  ShieldCheck,
  X,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSOS: () => void;
  onOpenJournalModal: () => void;
  childProfile: ChildProfile;
  completedTasksCount: number;
  totalTasksCount: number;
  hasJournaledToday: boolean;
  unreadChatCount?: number;
  upcomingEventsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenSOS,
  onOpenJournalModal,
  childProfile,
  completedTasksCount,
  totalTasksCount,
  hasJournaledToday,
  unreadChatCount = 0,
  upcomingEventsCount = 6
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
        setIsDetailsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDetailsOpen(false);
      }
    };

    if (isDetailsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDetailsOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E7F6FE] px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Logo & Affirmation */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => onSelectTab('dashboard')} 
            className="text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#AEE1F9] rounded-2xl"
          >
            <AnuraLogo size="md" />
          </button>

          {/* Calming Quote Ticker on Desktop */}
          <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E7F6FE]/70 text-[#121942] text-xs font-medium border border-[#AEE1F9]/40">
            <Sparkles className="w-3.5 h-3.5 text-[#F26B3B]" />
            <span className="italic text-gray-700">“They may not say it, but they feel your love.”</span>
          </div>
        </div>

        {/* Center / Right: Child Info & Daily Quick Stats */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Active Child Switcher Chip with Click-to-Open and Click-to-Close Interaction */}
          <div className="relative" ref={detailsRef}>
            <button
              id="header-child-profile-btn"
              type="button"
              onClick={() => setIsDetailsOpen(prev => !prev)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-medium transition-all border ${
                isDetailsOpen
                  ? 'bg-[#121942] text-white border-[#121942] shadow-sm ring-2 ring-[#AEE1F9]/50'
                  : 'bg-[#E7F6FE] hover:bg-[#D4E3ED]/60 text-[#121942] border-[#AEE1F9]/50'
              }`}
              title={isDetailsOpen ? "Click to close Vihaan Patel details" : "Click to view Vihaan Patel details"}
              aria-expanded={isDetailsOpen}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] transition-colors ${
                isDetailsOpen ? 'bg-[#F26B3B] text-white' : 'bg-[#121942] text-white'
              }`}>
                {childProfile.name.charAt(0) || 'V'}
              </div>
              <div className="text-left hidden sm:block">
                <span className="font-semibold block leading-tight">{childProfile.name}</span>
                <span className={`text-[10px] block leading-tight ${isDetailsOpen ? 'text-gray-300' : 'text-gray-500'}`}>
                  {childProfile.age} yrs • {childProfile.supportNeed} Need
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isDetailsOpen ? 'rotate-180 text-white' : 'text-gray-500'
              } hidden sm:block`} />
            </button>

            {/* Quick Details Floating Card (Opens on first click, Closes on second click) */}
            {isDetailsOpen && (
              <div
                id="child-details-popup"
                className="fixed inset-x-3 top-[64px] sm:absolute sm:inset-x-auto sm:top-full sm:right-0 sm:mt-2 max-w-sm sm:max-w-none sm:w-96 mx-auto sm:mx-0 max-h-[calc(100vh-80px)] overflow-y-auto bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl p-4 sm:p-5 z-50 animate-in fade-in zoom-in-95 duration-150 text-[#121942]"
              >
                {/* Header of Popup */}
                <div className="flex items-start justify-between pb-3 border-b border-[#E7F6FE]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#121942] to-[#1c2763] text-white flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-[#AEE1F9]">
                      {childProfile.name.charAt(0) || 'V'}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-extrabold text-base text-[#121942] leading-tight">
                          {childProfile.name}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E7F6FE] text-[#121942]">
                          {childProfile.gender}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {childProfile.relation} • {childProfile.age} Years Old
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDetailsOpen(false)}
                    className="p-1.5 rounded-full text-gray-400 hover:text-[#121942] hover:bg-gray-100 transition-colors"
                    title="Close details"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Vitals Grid */}
                <div className="grid grid-cols-2 gap-2 my-3">
                  <div className="p-2.5 rounded-2xl bg-[#F8FBFE] border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Communication</span>
                    <span className="text-xs font-bold text-[#121942] flex items-center gap-1 mt-0.5">
                      <Brain className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="truncate">{childProfile.communicationStyle}</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-[#FFF4EE] border border-[#F26B3B]/20">
                    <span className="text-[10px] font-bold text-[#F26B3B] uppercase tracking-wider block">Support Need</span>
                    <span className="text-xs font-bold text-[#121942] flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#F26B3B] shrink-0" />
                      <span>{childProfile.supportNeed} Level</span>
                    </span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-[#F8FBFE] border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Height & Weight</span>
                    <span className="text-xs font-bold text-[#121942] mt-0.5 block">
                      {childProfile.height} • {childProfile.weight}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-[#F8FBFE] border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Caregiver</span>
                    <span className="text-xs font-bold text-[#121942] mt-0.5 block truncate">
                      Shweta Patel (Mom)
                    </span>
                  </div>
                </div>

                {/* Triggers */}
                {childProfile.triggers && childProfile.triggers.length > 0 && (
                  <div className="mb-2.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Sensory Triggers to Avoid:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {childProfile.triggers.map((trig, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-red-50 text-red-700 border border-red-200">
                          {trig}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths & Regulators */}
                {childProfile.strengths && childProfile.strengths.length > 0 && (
                  <div className="mb-3.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                      Key Strengths & Regulators:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {childProfile.strengths.slice(0, 3).map((str, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                          {str}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Links & Close Instruction */}
                <div className="pt-3 border-t border-[#E7F6FE] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDetailsOpen(false);
                      onSelectTab('child-profile');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#121942] hover:bg-[#F26B3B] text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Full Medical Records & History</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsDetailsOpen(false)}
                    className="py-2 px-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-600 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Schedule Progress Pill */}
          <button
            onClick={() => onSelectTab('schedule')}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white border border-[#D4E3ED] hover:border-[#AEE1F9] text-xs text-[#121942] transition-colors shadow-2xs"
            title="Today's visual schedule progress"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#F26B3B]" />
            <span className="font-medium">Schedule:</span>
            <span className="font-bold text-[#121942]">{completedTasksCount}/{totalTasksCount}</span>
          </button>

          {/* Quick Community Events Pill */}
          <button
            id="header-events-btn"
            onClick={() => onSelectTab('events')}
            className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs transition-colors border shadow-2xs ${
              currentTab === 'events'
                ? 'bg-[#121942] text-white border-[#121942]'
                : 'bg-white border-[#D4E3ED] hover:border-[#F26B3B] text-[#121942]'
            }`}
            title="Community activities & events for kids, parents, and families"
          >
            <Ticket className={`w-3.5 h-3.5 ${currentTab === 'events' ? 'text-[#AEE1F9]' : 'text-[#F26B3B]'}`} />
            <span className="font-semibold">Events</span>
            {upcomingEventsCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded-full font-extrabold text-[10px] ${
                currentTab === 'events' ? 'bg-[#F26B3B] text-white' : 'bg-[#FFF4EE] text-[#F26B3B]'
              }`}>
                {upcomingEventsCount}
              </span>
            )}
          </button>

          {/* Caregiver Journal Quick Check-in */}
          <button
            onClick={onOpenJournalModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-medium transition-all ${
              hasJournaledToday
                ? 'bg-[#E8F7F0] text-emerald-800 border border-emerald-200'
                : 'bg-[#FFF4EE] text-[#F26B3B] border border-[#F26B3B]/30 hover:bg-[#FFE6D9]'
            }`}
            title="Caregiver emotional journal check-in"
          >
            <BookHeart className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {hasJournaledToday ? 'Journaled Today ✓' : 'Daily Journal'}
            </span>
          </button>

          {/* Primary SOS Action Button */}
          <button
            id="global-sos-button"
            onClick={onOpenSOS}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F26B3B] hover:bg-[#e05b2c] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md hover:shadow-lg active:scale-95 animate-pulse"
            title="Emergency SOS: Immediate contact to family and doctors"
          >
            <ShieldAlert className="w-4 h-4 text-white" />
            <span>SOS</span>
          </button>

          {/* Caregiver User Profile Avatar */}
          <button
            onClick={() => onSelectTab('settings')}
            className="flex items-center gap-2 pl-2 focus:outline-none group"
            title="Caregiver settings (@shwetapatel2)"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                alt="Shweta Patel"
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-xs group-hover:ring-2 group-hover:ring-[#AEE1F9] transition-all"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
