import React from 'react';
import { NavigationTab } from '../types';
import { 
  Home, 
  CalendarDays, 
  UserCircle2, 
  HeartHandshake, 
  MessageSquare,
  Users, 
  Palette, 
  BookHeart, 
  Settings,
  HelpCircle,
  Sparkles,
  PhoneCall,
  Ticket
} from 'lucide-react';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSOS: () => void;
  unreadChatCount?: number;
  upcomingEventsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenSOS,
  unreadChatCount = 3,
  upcomingEventsCount = 6
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavigationTab,
      label: 'Home & Dashboard',
      shortLabel: 'Home',
      icon: Home,
      badge: null
    },
    {
      id: 'schedule' as NavigationTab,
      label: 'Visual Schedule',
      shortLabel: 'Schedule',
      icon: CalendarDays,
      badge: 'Today'
    },
    {
      id: 'child-profile' as NavigationTab,
      label: 'Child Profile & Reports',
      shortLabel: 'Child Profile',
      icon: UserCircle2,
      badge: null
    },
    {
      id: 'therapy' as NavigationTab,
      label: 'Therapy & Support',
      shortLabel: 'Support',
      icon: HeartHandshake,
      badge: null
    },
    {
      id: 'chat' as NavigationTab,
      label: 'Chats & Calls',
      shortLabel: 'Chat',
      icon: MessageSquare,
      badge: unreadChatCount > 0 ? `${unreadChatCount} new` : null
    },
    {
      id: 'community' as NavigationTab,
      label: 'Community Stories',
      shortLabel: 'Community',
      icon: Users,
      badge: null
    },
    {
      id: 'events' as NavigationTab,
      label: 'Events & Activities',
      shortLabel: 'Events',
      icon: Ticket,
      badge: upcomingEventsCount > 0 ? `${upcomingEventsCount} active` : 'New'
    },
    {
      id: 'journal' as NavigationTab,
      label: 'Parent Journal',
      shortLabel: 'Journal',
      icon: BookHeart,
      badge: null
    },
    {
      id: 'settings' as NavigationTab,
      label: 'Settings & SOS Setup',
      shortLabel: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="hidden xl:flex flex-col w-64 xl:w-72 bg-white border-r border-[#E7F6FE] p-4 shrink-0 h-full overflow-y-auto justify-between">
      {/* Primary Navigation Links */}
      <div className="space-y-1.5">
        <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">
          Platform Experience
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all group ${
                isActive
                  ? 'bg-[#121942] text-white shadow-sm font-bold'
                  : 'text-[#121942]/80 hover:bg-[#E7F6FE] hover:text-[#121942]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-[#AEE1F9]' : 'text-gray-400 group-hover:text-[#121942]'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-[#F26B3B] text-white'
                      : 'bg-[#AEE1F9] text-[#121942]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Caregiver Support Widget from Case Study */}
      <div className="mt-6 pt-4 border-t border-[#E7F6FE] space-y-3">
        <div className="bg-gradient-to-br from-[#E7F6FE] to-[#F8FBFE] border border-[#AEE1F9]/60 rounded-2xl p-3.5 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-xl bg-[#121942] text-[#AEE1F9] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#AEE1F9]" />
            </div>
            <div className="text-xs font-bold text-[#121942]">Caregiver Gentle Tip</div>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            Predictability reduces 80% of transition distress. Review Vihaan's schedule before evening time.
          </p>
          <button
            onClick={() => onSelectTab('chat')}
            className="w-full py-2 px-3 rounded-xl bg-white border border-[#D4E3ED] hover:border-[#121942] text-xs font-semibold text-[#121942] transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <span>Message Dr. Shivani</span>
            <span className="text-[#F26B3B]">→</span>
          </button>
        </div>

        {/* Quick Emergency SOS Helper */}
        <button
          onClick={onOpenSOS}
          className="w-full py-2.5 px-3 rounded-2xl bg-[#FFF4EE] border border-[#F26B3B]/30 hover:bg-[#F26B3B] hover:text-white text-[#F26B3B] text-xs font-bold transition-all flex items-center justify-center gap-2 group shadow-2xs"
        >
          <PhoneCall className="w-3.5 h-3.5 group-hover:animate-bounce" />
          <span>Quick Emergency Hotline</span>
        </button>
      </div>
    </aside>
  );
};
