import React from 'react';
import { 
  NavigationTab, 
  ChildProfile, 
  DailyTask, 
  TherapySession, 
  CommunityBlog, 
  CommunityEvent 
} from '../types';
import { 
  Sparkles, 
  Video, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Circle, 
  Plus, 
  ArrowRight, 
  Heart, 
  BookHeart,
  Palette,
  Clock,
  MapPin,
  Star,
  Users
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DashboardViewProps {
  onNavigate: (tab: NavigationTab) => void;
  childProfile: ChildProfile;
  tasks: DailyTask[];
  onToggleTask: (taskId: string) => void;
  onOpenAddTask: () => void;
  sessions: TherapySession[];
  onStartSession: (session: TherapySession) => void;
  blogs: CommunityBlog[];
  onSelectBlog: (blog: CommunityBlog) => void;
  events: CommunityEvent[];
  onSelectEvent: (event: CommunityEvent) => void;
  hasJournaledToday: boolean;
  onOpenJournalModal: () => void;
  onOpenSOS: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  childProfile,
  tasks,
  onToggleTask,
  onOpenAddTask,
  sessions,
  onStartSession,
  blogs,
  onSelectBlog,
  events,
  onSelectEvent,
  hasJournaledToday,
  onOpenJournalModal,
  onOpenSOS
}) => {
  const completedTasks = tasks.filter(t => t.completed);
  const progressPercent = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
  const nextSession = sessions[0];
  const featuredBlog = blogs[0];
  const featuredEvent = events[0];

  const handleQuickJournaled = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#AEE1F9', '#F26B3B', '#121942']
      });
    } catch {
      // ignore
    }
    onOpenJournalModal();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Welcome Banner from Case Study */}
      <section className="bg-gradient-to-br from-[#121942] via-[#1c2763] to-[#121942] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
        {/* Decorative soft circles & lotus rays */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#AEE1F9]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-[#F26B3B]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between gap-4">
          <div className="space-y-3.5 max-w-3xl">
            {/* Header Identity from Case Study: "Hello Shweta @shwetapatel2" */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#AEE1F9] text-xs font-semibold backdrop-blur-xs">
                Welcome Back
              </span>
              <span className="text-white/60 text-xs font-mono">@shwetapatel2</span>
            </div>

            {/* Hello Shweta with Vihaan Patel Button Beside It */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Hello Shweta
              </h1>

              {/* Vihaan Patel button beside Hello Shweta */}
              <button 
                type="button"
                onClick={() => onNavigate('child-profile')}
                className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/20 cursor-pointer border border-white/10 text-xs font-medium text-white transition-all hover:scale-[1.02] shadow-xs"
                title="View Vihaan Patel profile"
              >
                <div className="w-5 h-5 rounded-full bg-[#F26B3B] text-white flex items-center justify-center font-bold text-[10px]">
                  V
                </div>
                <span className="font-semibold">{childProfile.name} • {childProfile.relation}</span>
                <span className="text-[#AEE1F9] text-[10px]">({childProfile.age} yrs)</span>
              </button>
            </div>

            {/* Quote placed below Hello Shweta */}
            <div className="pt-0.5">
              <p className="text-base sm:text-lg text-amber-200/95 font-medium italic flex items-center gap-2.5 leading-relaxed">
                <Sparkles className="w-5 h-5 text-[#F26B3B] shrink-0" />
                <span>“They may not say it, but they feel your love.”</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Today's Schedule & Today's Session */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column: Visual Schedule & Routine Tracker (8 cols) */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-6">
          <div className="bg-white border border-[#D4E3ED] rounded-3xl p-6 sm:p-7 shadow-xs">
            {/* Header & Progress from Case Study */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E7F6FE]">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-[#121942] tracking-tight">
                    Today's Schedule
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#E7F6FE] text-[#121942] text-xs font-semibold">
                    Thursday 04 Dec
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Predictable visual routines keep Vihaan calm and centered throughout the day.
                </p>
              </div>

              {/* Progress Count: "Task Done: 12 / 20" style */}
              <div className="text-left sm:text-right">
                <div className="text-xs font-bold text-[#121942]">
                  Tasks Done:{' '}
                  <span className="text-[#F26B3B] text-sm">
                    {completedTasks.length} / {tasks.length}
                  </span>
                </div>
                <div className="w-36 h-2 rounded-full bg-gray-100 mt-1.5 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#AEE1F9] to-[#F26B3B] rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Interactive Checklist directly matching the Case Study screens */}
            <div className="divide-y divide-gray-50 mt-2">
              {tasks.slice(0, 5).map((task) => (
                <div
                  key={task.id}
                  onClick={() => onToggleTask(task.id)}
                  className={`py-3.5 px-3 rounded-2xl flex items-center justify-between gap-4 cursor-pointer transition-all hover:bg-[#F8FBFE] group ${
                    task.completed ? 'opacity-85' : ''
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      type="button"
                      className={`shrink-0 transition-transform group-hover:scale-110 ${
                        task.completed ? 'text-emerald-500' : 'text-gray-300 group-hover:text-[#F26B3B]'
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 fill-emerald-100" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="min-w-0">
                      <div className={`text-sm font-semibold truncate ${
                        task.completed ? 'line-through text-gray-400' : 'text-[#121942]'
                      }`}>
                        {task.title}
                      </div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {task.time}
                        </span>
                        <span>•</span>
                        <span className="text-gray-600">{task.category}</span>
                      </div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                    task.completed
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-[#E7F6FE] text-[#121942]'
                  }`}>
                    {task.completed ? 'Done' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-[#E7F6FE]">
              <button
                onClick={onOpenAddTask}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121942] hover:text-[#F26B3B] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Task</span>
              </button>

              <button
                onClick={() => onNavigate('schedule')}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#F26B3B] hover:underline"
              >
                <span>View Full Schedule ({tasks.length} tasks)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Did You Journal Today? Card directly from Case Study */}
          <div className="bg-[#FFF4EE] border border-[#F26B3B]/20 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-2xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#F26B3B] text-white flex items-center justify-center shrink-0 shadow-xs">
                <BookHeart className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#121942]">
                  Did you journal today?
                </h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Caregiver wellness isn't selfish; it is essential. Acknowledge your small victories.
                </p>

                {/* S M T W T F S day bubbles from case study */}
                <div className="flex items-center gap-1.5 mt-2.5">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => {
                    const isToday = idx === 4; // Thursday
                    const isDone = idx < 4 || (isToday && hasJournaledToday);
                    return (
                      <span
                        key={idx}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isDone
                            ? 'bg-[#121942] text-white'
                            : isToday
                            ? 'bg-[#F26B3B] text-white ring-2 ring-[#F26B3B]/40'
                            : 'bg-white/80 text-gray-400 border border-gray-200'
                        }`}
                      >
                        {day}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions: "I Journaled Today" & "Journal Now" buttons from case study */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={handleQuickJournaled}
                className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-white border border-[#D4E3ED] hover:border-[#F26B3B] text-[#121942] text-xs font-bold transition-all shadow-2xs"
              >
                I Journaled Today
              </button>
              <button
                onClick={onOpenJournalModal}
                className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-[#F26B3B] hover:bg-[#e05b2c] text-white text-xs font-bold transition-all shadow-xs"
              >
                Journal Now
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Today's Session & Community (4-5 cols) */}
        <section className="lg:col-span-5 xl:col-span-4 space-y-6">
          {/* Today's Session Card directly from Case Study */}
          {nextSession && (
            <div className="bg-white border border-[#D4E3ED] rounded-3xl p-5 sm:p-6 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F26B3B]">
                  Today's Session
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {nextSession.rating}
                </span>
              </div>

              {/* Specialist Details */}
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={nextSession.doctorAvatar}
                  alt={nextSession.specialistName}
                  className="w-13 h-13 rounded-2xl object-cover border border-[#D4E3ED]"
                />
                <div className="min-w-0">
                  <h3 className="font-extrabold text-[#121942] text-base truncate">
                    {nextSession.specialistName}
                  </h3>
                  <p className="text-xs text-gray-500">{nextSession.role}</p>
                  <p className="text-[11px] text-gray-400 truncate">{nextSession.hospital}</p>
                </div>
              </div>

              {/* Time Slot Badge */}
              <div className="p-3 rounded-2xl bg-[#E7F6FE] border border-[#AEE1F9]/50 flex items-center justify-between text-xs text-[#121942] font-semibold mb-4">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#121942]" />
                  {nextSession.timeStr}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                  Confirmed
                </span>
              </div>

              {/* Direct Communication Buttons (Video, Audio, Chat) from Case Study */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onStartSession(nextSession)}
                  className="py-2.5 px-2 rounded-xl bg-[#121942] hover:bg-[#1a235c] text-white text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 shadow-xs"
                >
                  <Video className="w-4 h-4 text-[#AEE1F9]" />
                  <span>Video</span>
                </button>
                <button
                  onClick={() => onStartSession(nextSession)}
                  className="py-2.5 px-2 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#121942] text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1"
                >
                  <Phone className="w-4 h-4 text-[#121942]" />
                  <span>Audio</span>
                </button>
                <button
                  onClick={() => onNavigate('chat')}
                  className="py-2.5 px-2 rounded-xl bg-[#E7F6FE] hover:bg-[#D4E3ED] text-[#121942] text-xs font-semibold transition-all flex flex-col items-center justify-center gap-1"
                >
                  <MessageSquare className="w-4 h-4 text-[#F26B3B]" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          )}

          {/* Community Story Highlight (e.g. "She Said Mamma!") */}
          {featuredBlog && (
            <div 
              onClick={() => onSelectBlog(featuredBlog)}
              className="bg-white border border-[#D4E3ED] rounded-3xl p-5 shadow-xs cursor-pointer hover:border-[#121942] transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#AEE1F9] bg-[#121942] px-2.5 py-0.5 rounded-full">
                  Community Story
                </span>
                <span className="text-xs text-gray-400">{featuredBlog.readTime}</span>
              </div>

              <h4 className="font-extrabold text-[#121942] text-base group-hover:text-[#F26B3B] transition-colors mb-1.5">
                {featuredBlog.title}
              </h4>
              <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-3">
                "{featuredBlog.snippet}"
              </p>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <span className="font-semibold text-gray-700">By {featuredBlog.author}</span>
                <span className="text-[#F26B3B] font-bold inline-flex items-center gap-1">
                  Read Story <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          )}

          {/* Upcoming Event Snippet (e.g. "Paint, Draw or Build... No Rules") */}
          {featuredEvent && (
            <div 
              onClick={() => onSelectEvent(featuredEvent)}
              className="bg-gradient-to-br from-[#E7F6FE] to-white border border-[#AEE1F9]/60 rounded-3xl p-5 shadow-xs cursor-pointer hover:border-[#121942] transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] bg-[#FFF4EE] px-2.5 py-0.5 rounded-full">
                  Workshop • {featuredEvent.dateDay} {featuredEvent.dateMonth}
                </span>
                <span className="text-xs font-bold text-[#121942]">{featuredEvent.priceFormatted}</span>
              </div>

              <h4 className="font-extrabold text-[#121942] text-sm mb-1">
                {featuredEvent.title}
              </h4>
              <p className="text-xs text-gray-600 flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span className="truncate">{featuredEvent.location}</span>
              </p>

              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#121942]" />
                  {featuredEvent.attendingCount}+ attending
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent(featuredEvent);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#121942] text-white text-xs font-bold hover:bg-[#F26B3B] transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
