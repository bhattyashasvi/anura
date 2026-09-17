import React, { useState } from 'react';
import { Specialist, TherapySession } from '../types';
import { 
  HeartHandshake, 
  Video, 
  Phone, 
  MessageSquare, 
  Star, 
  Clock, 
  CheckCircle2, 
  Hospital, 
  ShieldCheck, 
  Calendar,
  X,
  PhoneOff,
  Mic,
  Camera,
  Search,
  Filter,
  ArrowRight,
  BadgeCheck,
  MapPin,
  CalendarCheck
} from 'lucide-react';

interface TherapyViewProps {
  specialists: Specialist[];
  sessions: TherapySession[];
  onBookSpecialist: (specialist: Specialist) => void;
  onOpenChatWithSpecialist: (specialistId: string) => void;
}

export const TherapyView: React.FC<TherapyViewProps> = ({
  specialists,
  sessions,
  onBookSpecialist,
  onOpenChatWithSpecialist
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCallModal, setActiveCallModal] = useState<{
    type: 'video' | 'audio';
    doctor: { name: string; role: string; avatar: string };
  } | null>(null);
  const [bookingSpecialist, setBookingSpecialist] = useState<Specialist | null>(null);
  const [bookingDate, setBookingDate] = useState('Tomorrow, 5 Dec 2025');
  const [bookingTime, setBookingTime] = useState('11:00 AM');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const categories = ['All', 'Child Psychology', 'Pediatric Neurologist', 'Sensory Integration', 'Speech Therapy'];

  const filteredSpecialists = specialists.filter(doc => {
    const matchesCategory = 
      selectedCategory === 'All' || 
      (selectedCategory === 'Child Psychology' && doc.role.toLowerCase().includes('psycholog')) ||
      (selectedCategory === 'Pediatric Neurologist' && doc.role.toLowerCase().includes('neurolog')) ||
      (selectedCategory === 'Sensory Integration' && doc.role.toLowerCase().includes('sensory')) ||
      (selectedCategory === 'Speech Therapy' && doc.role.toLowerCase().includes('speech'));

    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingSpecialist) return;
    onBookSpecialist(bookingSpecialist);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingSpecialist(null);
    }, 1800);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Title & Clinical Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F6FE] text-[#121942] text-xs font-semibold mb-2">
            <HeartHandshake className="w-3.5 h-3.5 text-[#F26B3B]" />
            Clinical Specialists & Therapy Consultations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121942] tracking-tight">
            Therapy & Specialist Care
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-2xl">
            Connect directly with verified child psychologists, pediatric neurologists, and speech pathologists specializing in neurodivergent care for Vihaan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const doc = specialists[0];
              setActiveCallModal({
                type: 'video',
                doctor: { name: doc.name, role: doc.role, avatar: doc.avatar }
              });
            }}
            className="px-4 py-2.5 rounded-2xl bg-[#121942] hover:bg-[#1a235c] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all"
          >
            <Video className="w-4 h-4 text-[#AEE1F9]" />
            <span>Launch Video Room</span>
          </button>
        </div>
      </div>

      {/* Scheduled Consultations Bar */}
      <div className="bg-white border border-[#D4E3ED] rounded-3xl p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-[#F26B3B]" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#121942]">
              Upcoming Consultations ({sessions.length})
            </h3>
          </div>
          <span className="text-xs text-gray-400">All calls HD encrypted</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((sess) => (
            <div 
              key={sess.id} 
              className="p-4 sm:p-5 rounded-2xl bg-[#F8FBFE] border border-[#E7F6FE] flex flex-col justify-between transition-all hover:border-[#D4E3ED]"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] bg-[#FFF4EE] px-2.5 py-1 rounded-full">
                    {sess.dateStr}
                  </span>
                  <span className="text-xs text-[#121942] font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {sess.timeStr}
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <img
                    src={sess.doctorAvatar}
                    alt={sess.specialistName}
                    className="w-12 h-12 rounded-2xl object-cover border border-[#D4E3ED]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#121942] flex items-center gap-1.5">
                      {sess.specialistName}
                      <BadgeCheck className="w-4 h-4 text-emerald-500 inline" />
                    </h4>
                    <p className="text-xs text-gray-500">{sess.role}</p>
                    <p className="text-[11px] text-gray-400">{sess.hospital}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 mt-4 pt-3.5 border-t border-[#E7F6FE]">
                <button
                  onClick={() => setActiveCallModal({
                    type: sess.type === 'Video' ? 'video' : 'audio',
                    doctor: { name: sess.specialistName, role: sess.role, avatar: sess.doctorAvatar }
                  })}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#121942] text-white text-xs font-bold hover:bg-[#1a235c] flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  {sess.type === 'Video' ? (
                    <Video className="w-3.5 h-3.5 text-[#AEE1F9]" />
                  ) : (
                    <Phone className="w-3.5 h-3.5 text-[#AEE1F9]" />
                  )}
                  <span>Join {sess.type} Consultation</span>
                </button>

                <button
                  onClick={() => onOpenChatWithSpecialist(sess.specialistId)}
                  className="py-2 px-3.5 rounded-xl bg-white border border-[#D4E3ED] text-[#121942] text-xs font-semibold hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
                  title="Open chat in dedicated Chat section"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#F26B3B]" />
                  <span>Open Chat</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specialist Search & Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search specialists by name, specialty, or clinic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-[#D4E3ED] text-xs sm:text-sm text-[#121942] placeholder-gray-400 focus:outline-none focus:border-[#121942] focus:ring-2 focus:ring-[#AEE1F9]"
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

          {/* Clinical Assurance Pill */}
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-[#E7F6FE]/70 px-3.5 py-2 rounded-2xl border border-[#AEE1F9]/40 self-start md:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>All practitioners verified by Gujarat Neurological & Clinical Board</span>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#121942] text-white shadow-2xs'
                    : 'bg-white border border-[#D4E3ED] text-gray-600 hover:text-[#121942] hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Specialists Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSpecialists.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-[#D4E3ED] rounded-3xl p-5 shadow-xs flex flex-col justify-between hover:border-[#121942]/40 transition-all group"
          >
            <div>
              {/* Doctor Header */}
              <div className="flex items-start gap-3.5 mb-3.5">
                <div className="relative shrink-0">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-[#D4E3ED]"
                  />
                  {doc.isOnline && (
                    <span 
                      className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white" 
                      title="Online for urgent inquiries"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-extrabold text-sm text-[#121942] truncate group-hover:text-[#F26B3B] transition-colors">
                      {doc.name}
                    </h3>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-0.5 bg-amber-50 px-1.5 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {doc.rating}
                    </span>
                  </div>

                  <p className="text-xs text-[#121942]/80 font-medium truncate mt-0.5">{doc.role}</p>
                  
                  <div className="flex items-center gap-1 text-[11px] text-gray-400 truncate mt-1">
                    <Hospital className="w-3 h-3 text-gray-400 shrink-0" />
                    <span className="truncate">{doc.hospital}</span>
                  </div>
                </div>
              </div>

              {/* Doctor Bio Snippet */}
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4 bg-[#F8FBFE] p-3 rounded-2xl border border-[#E7F6FE]">
                {doc.about}
              </p>

              {/* Metrics */}
              <div className="flex items-center justify-between text-xs py-2 border-y border-gray-100 mb-4">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Experience</span>
                  <span className="font-bold text-[#121942]">{doc.experienceYears} Years</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Availability</span>
                  <span className="font-bold text-emerald-600">{doc.availability}</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Session Fee</span>
                  <span className="font-bold text-[#121942]">{doc.sessionPrice}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setBookingSpecialist(doc)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#121942] hover:bg-[#1a235c] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#AEE1F9]" />
                <span>Book Consult</span>
              </button>

              <button
                onClick={() => onOpenChatWithSpecialist(doc.id)}
                className="py-2.5 px-3.5 rounded-xl bg-[#E7F6FE] hover:bg-[#D4E3ED] text-[#121942] text-xs font-bold transition-all flex items-center gap-1.5"
                title={`Chat with ${doc.name} in Chat view`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#F26B3B]" />
                <span>Chat</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSpecialists.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-[#D4E3ED] p-8">
          <HeartHandshake className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#121942]">No specialists found</h3>
          <p className="text-xs text-gray-500 mt-1">Try clearing your search query or selecting "All".</p>
        </div>
      )}

      {/* Book Consultation Modal */}
      {bookingSpecialist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#D4E3ED] shadow-2xl p-6 relative">
            <button
              onClick={() => setBookingSpecialist(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>

            {bookingSuccess ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-extrabold text-[#121942]">Consultation Scheduled!</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Appointment confirmed with {bookingSpecialist.name} for {bookingDate} at {bookingTime}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] bg-[#FFF4EE] px-2.5 py-0.5 rounded-full">
                    Clinical Booking
                  </span>
                  <h3 className="text-lg font-extrabold text-[#121942] mt-1.5">
                    Schedule with {bookingSpecialist.name}
                  </h3>
                  <p className="text-xs text-gray-500">{bookingSpecialist.role} • {bookingSpecialist.sessionPrice}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Preferred Date</label>
                  <select
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#121942] bg-gray-50 focus:bg-white focus:border-[#121942] outline-none"
                  >
                    <option>Tomorrow, 5 Dec 2025</option>
                    <option>Saturday, 6 Dec 2025</option>
                    <option>Monday, 8 Dec 2025</option>
                    <option>Wednesday, 10 Dec 2025</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Time Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['10:00 AM', '11:00 AM', '02:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setBookingTime(t)}
                        className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                          bookingTime === t
                            ? 'bg-[#121942] text-white border-[#121942]'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Clinical Note for Vihaan</label>
                  <textarea
                    rows={2}
                    placeholder="E.g. Review morning sensory schedule and sound sensitivity to blender..."
                    defaultValue="Reviewing Vihaan's visual morning transition checklist and auditory desensitization progress."
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-[#121942] bg-gray-50 focus:bg-white focus:border-[#121942] outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setBookingSpecialist(null)}
                    className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#121942] hover:bg-[#1a235c] text-white text-xs font-bold shadow-xs"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Video Call Simulation Modal */}
      {activeCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-[#121942] border border-white/10 rounded-3xl text-white shadow-2xl p-6 sm:p-8 flex flex-col items-center text-center">
            <button
              onClick={() => setActiveCallModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video Viewport Mockup */}
            <div className="w-full h-64 sm:h-80 rounded-2xl bg-slate-900 border border-white/10 relative overflow-hidden flex items-center justify-center mb-6">
              <img
                src={activeCallModal.doctor.avatar}
                alt={activeCallModal.doctor.name}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Status Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Connected • HD Audio & Video</span>
              </div>

              {/* Small Picture-in-Picture for Parent & Vihaan */}
              <div className="absolute bottom-4 right-4 w-28 h-20 rounded-xl overflow-hidden border-2 border-white/40 shadow-lg bg-black">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                  alt="Shweta Patel"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute bottom-4 left-4 text-left">
                <h4 className="font-extrabold text-base text-white">{activeCallModal.doctor.name}</h4>
                <p className="text-xs text-[#AEE1F9]">{activeCallModal.doctor.role}</p>
              </div>
            </div>

            {/* Control Bar */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => alert("Microphone toggled")}
                className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Mute/Unmute"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button 
                onClick={() => alert("Camera toggled")}
                className="p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white"
                title="Camera On/Off"
              >
                <Camera className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveCallModal(null)}
                className="p-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg active:scale-95"
                title="End Consultation Call"
              >
                <PhoneOff className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
