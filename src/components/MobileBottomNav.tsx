import React from 'react';
import { NavigationTab } from '../types';
import { 
  Home, 
  CalendarDays, 
  Ticket,
  HeartHandshake, 
  MessageSquare,
  ShieldAlert
} from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSOS: () => void;
  unreadChatCount?: number;
  upcomingEventsCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenSOS,
  unreadChatCount = 3,
  upcomingEventsCount = 6
}) => {
  return (
    <>
      {/* Floating SOS button for mobile & tablet - 1-tap emergency safety */}
      <button
        id="mobile-floating-sos"
        onClick={onOpenSOS}
        className="xl:hidden fixed bottom-16 sm:bottom-20 right-3.5 sm:right-5 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F26B3B] hover:bg-[#e05b2c] text-white flex flex-col items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all border-2 border-white ring-3 ring-[#F26B3B]/20"
        title="Emergency SOS"
      >
        <ShieldAlert className="w-4.5 h-4.5 text-white" />
        <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-wider text-white leading-none mt-0.5">SOS</span>
      </button>

      {/* Floating Compact Rounded Rectangle Navigation Bar for Phone & Tablet */}
      <nav 
        id="bottom-navigation-bar"
        className="xl:hidden fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm sm:max-w-md bg-white/95 backdrop-blur-md rounded-2xl border border-[#D4E3ED] shadow-[0_6px_24px_rgba(18,25,66,0.14)] px-1.5 sm:px-2.5 py-1 sm:py-1.5"
      >
        <div className="grid grid-cols-5 items-center text-center gap-1">
          {/* Home */}
          <button
            id="mobile-nav-home"
            onClick={() => onSelectTab('dashboard')}
            className={`flex flex-col items-center py-1 sm:py-1.5 px-1 rounded-xl transition-all ${
              currentTab === 'dashboard' 
                ? 'bg-[#E7F6FE] text-[#121942] font-bold shadow-2xs' 
                : 'text-gray-400 hover:text-[#121942] hover:bg-gray-50'
            }`}
          >
            <Home className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform ${currentTab === 'dashboard' ? 'text-[#121942] scale-105' : 'text-gray-400'}`} />
            <span className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${currentTab === 'dashboard' ? 'font-bold text-[#121942]' : 'font-medium'}`}>Home</span>
          </button>

          {/* Schedule */}
          <button
            id="mobile-nav-schedule"
            onClick={() => onSelectTab('schedule')}
            className={`flex flex-col items-center py-1 sm:py-1.5 px-1 rounded-xl transition-all ${
              currentTab === 'schedule' 
                ? 'bg-[#E7F6FE] text-[#121942] font-bold shadow-2xs' 
                : 'text-gray-400 hover:text-[#121942] hover:bg-gray-50'
            }`}
          >
            <CalendarDays className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform ${currentTab === 'schedule' ? 'text-[#121942] scale-105' : 'text-gray-400'}`} />
            <span className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${currentTab === 'schedule' ? 'font-bold text-[#121942]' : 'font-medium'}`}>Schedule</span>
          </button>

          {/* Events - USER REQUESTED IN NAVIGATION BAR */}
          <button
            id="mobile-nav-events"
            onClick={() => onSelectTab('events')}
            className={`flex flex-col items-center py-1 sm:py-1.5 px-1 rounded-xl transition-all relative ${
              currentTab === 'events' 
                ? 'bg-[#FFF4EE] text-[#F26B3B] font-bold shadow-2xs' 
                : 'text-gray-400 hover:text-[#121942] hover:bg-gray-50'
            }`}
          >
            <div className="relative">
              <Ticket className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform ${currentTab === 'events' ? 'text-[#F26B3B] scale-105' : 'text-gray-400'}`} />
              {upcomingEventsCount > 0 && (
                <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#F26B3B] text-white text-[7px] font-black rounded-full border border-white">
                  {upcomingEventsCount}
                </span>
              )}
            </div>
            <span className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${currentTab === 'events' ? 'font-bold text-[#F26B3B]' : 'font-medium'}`}>
              Events
            </span>
          </button>

          {/* Therapy / Support */}
          <button
            id="mobile-nav-support"
            onClick={() => onSelectTab('therapy')}
            className={`flex flex-col items-center py-1 sm:py-1.5 px-1 rounded-xl transition-all ${
              currentTab === 'therapy' 
                ? 'bg-[#E7F6FE] text-[#121942] font-bold shadow-2xs' 
                : 'text-gray-400 hover:text-[#121942] hover:bg-gray-50'
            }`}
          >
            <HeartHandshake className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform ${currentTab === 'therapy' ? 'text-[#121942] scale-105' : 'text-gray-400'}`} />
            <span className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${currentTab === 'therapy' ? 'font-bold text-[#121942]' : 'font-medium'}`}>Support</span>
          </button>

          {/* Dedicated Chat beside Support */}
          <button
            id="mobile-nav-chat"
            onClick={() => onSelectTab('chat')}
            className={`flex flex-col items-center py-1 sm:py-1.5 px-1 rounded-xl transition-all relative ${
              currentTab === 'chat' 
                ? 'bg-[#E7F6FE] text-[#121942] font-bold shadow-2xs' 
                : 'text-gray-400 hover:text-[#121942] hover:bg-gray-50'
            }`}
          >
            <div className="relative">
              <MessageSquare className={`w-4.5 h-4.5 sm:w-5 sm:h-5 transition-transform ${currentTab === 'chat' ? 'text-[#121942] scale-105' : 'text-gray-400'}`} />
              {unreadChatCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#F26B3B] rounded-full border border-white" />
              )}
            </div>
            <span className={`text-[9px] sm:text-[10px] mt-0.5 truncate ${currentTab === 'chat' ? 'font-bold text-[#121942]' : 'font-medium'}`}>Chat</span>
          </button>
        </div>
      </nav>
    </>
  );
};

