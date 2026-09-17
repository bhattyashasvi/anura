import React, { useState, useEffect, useRef } from 'react';
import { ChatContact, ChatMessage } from '../types';
import { 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Paperclip, 
  Send, 
  Mic, 
  Smile, 
  Check, 
  CheckCheck, 
  Clock, 
  ShieldCheck, 
  FileText, 
  ArrowLeft, 
  PhoneOff, 
  MicOff, 
  Camera, 
  CameraOff, 
  Volume2, 
  VolumeX, 
  X, 
  Play, 
  Pause, 
  Image as ImageIcon, 
  Sparkles,
  User,
  Hospital,
  Info,
  ChevronRight,
  Filter
} from 'lucide-react';

interface ChatViewProps {
  contacts: ChatContact[];
  conversations: Record<string, ChatMessage[]>;
  activeContactId?: string;
  onSelectContact?: (contactId: string) => void;
  onSendMessage: (contactId: string, text: string, attachment?: ChatMessage['attachment']) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  contacts,
  conversations,
  activeContactId,
  onSelectContact,
  onSendMessage
}) => {
  const [selectedId, setSelectedId] = useState<string>(activeContactId || contacts[0]?.id || 'contact-spec-1');
  const [mobileShowChat, setMobileShowChat] = useState<boolean>(!!activeContactId);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'specialist' | 'caregiver' | 'group'>('all');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  // Call states
  const [activeCall, setActiveCall] = useState<{
    type: 'voice' | 'video';
    contact: ChatContact;
    status: 'calling' | 'connected';
    duration: number;
    isMuted: boolean;
    isVideoOff: boolean;
    isSpeakerOn: boolean;
  } | null>(null);

  // Audio note playback simulation
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeContactId) {
      setSelectedId(activeContactId);
      setMobileShowChat(true);
    }
  }, [activeContactId]);

  const activeContact = contacts.find(c => c.id === selectedId) || contacts[0];
  const currentMessages = conversations[selectedId] || [];

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, isTyping]);

  // Timer for active call
  useEffect(() => {
    let interval: any = null;
    if (activeCall && activeCall.status === 'connected') {
      interval = setInterval(() => {
        setActiveCall(prev => prev ? { ...prev, duration: prev.duration + 1 } : null);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeCall?.status]);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleStartCall = (type: 'voice' | 'video') => {
    if (!activeContact) return;
    setActiveCall({
      type,
      contact: activeContact,
      status: 'calling',
      duration: 0,
      isMuted: false,
      isVideoOff: false,
      isSpeakerOn: true
    });

    // Simulate connection after 1.5 seconds
    setTimeout(() => {
      setActiveCall(prev => prev ? { ...prev, status: 'connected' } : null);
    }, 1500);
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  const handleSelectContactItem = (id: string) => {
    setSelectedId(id);
    setMobileShowChat(true);
    if (onSelectContact) {
      onSelectContact(id);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim()) return;

    const text = inputMessage.trim();
    setInputMessage('');
    setShowEmojiPicker(false);
    setShowAttachMenu(false);

    onSendMessage(selectedId, text);

    // Simulate typing response from specialist / contact
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  const handleSendAttachment = (type: 'report' | 'image' | 'voice', title: string) => {
    setShowAttachMenu(false);
    onSendMessage(selectedId, `Shared an attachment: ${title}`, {
      type,
      title,
      fileSize: '1.8 MB'
    });
  };

  const handleQuickEmoji = (emoji: string) => {
    setInputMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesFilter = 
      filterTab === 'all' || 
      contact.type === filterTab;

    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (contact.lastMessageSnippet && contact.lastMessageSnippet.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-[calc(100dvh-155px)] lg:h-[calc(100vh-130px)] min-h-[360px] lg:min-h-[560px] bg-white border border-[#D4E3ED] rounded-2xl lg:rounded-3xl shadow-sm overflow-hidden flex flex-col animate-in fade-in duration-200">
      <div className="flex-1 flex overflow-hidden">
        {/* ================= LEFT COLUMN: CHAT LIST ================= */}
        <div 
          className={`w-full md:w-80 lg:w-96 border-r border-[#E7F6FE] flex flex-col bg-white shrink-0 ${
            mobileShowChat ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Top Bar: Title & Status */}
          <div className="p-4 bg-[#F8FBFE] border-b border-[#E7F6FE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                  alt="Shweta Patel"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#121942]/20"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-[#121942] leading-tight">Messages</h2>
                <p className="text-[11px] text-gray-500">Vihaan's Care Network</p>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="p-3 bg-white border-b border-[#E7F6FE]">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search or start new chat..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white border border-transparent focus:border-[#121942] text-xs text-[#121942] placeholder-gray-400 outline-none transition-all"
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

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto scrollbar-none">
              {[
                { id: 'all', label: 'All' },
                { id: 'specialist', label: 'Specialists' },
                { id: 'caregiver', label: 'Family' },
                { id: 'group', label: 'Circles' }
              ].map((tab) => {
                const isActive = filterTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setFilterTab(tab.id as any)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-[#121942] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100/80">
            {filteredContacts.map((contact) => {
              const isSelected = contact.id === selectedId;
              const contactConvo = conversations[contact.id] || [];
              const lastMsg = contactConvo[contactConvo.length - 1];
              const lastText = lastMsg ? lastMsg.text : (contact.lastMessageSnippet || 'Tap to start conversation');
              const lastTime = lastMsg ? lastMsg.time : (contact.lastMessageTime || '');

              return (
                <div
                  key={contact.id}
                  onClick={() => handleSelectContactItem(contact.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-all hover:bg-[#F8FBFE] ${
                    isSelected ? 'bg-[#E7F6FE]/70 border-l-4 border-[#121942]' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-[#D4E3ED]"
                    />
                    {contact.isOnline && (
                      <span 
                        className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" 
                        title="Online"
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <h4 className={`text-sm truncate font-bold ${isSelected ? 'text-[#121942]' : 'text-gray-900'}`}>
                        {contact.name}
                      </h4>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-1">
                        {lastTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
                        contact.type === 'specialist'
                          ? 'bg-[#E7F6FE] text-[#121942]'
                          : contact.type === 'caregiver'
                          ? 'bg-[#FFF4EE] text-[#F26B3B]'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}>
                        {contact.type === 'specialist' ? 'Doctor' : contact.type === 'caregiver' ? 'Family' : 'Circle'}
                      </span>
                      <p className="text-[11px] text-gray-500 truncate">{contact.role}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                        {lastMsg && lastMsg.sender === 'user' && (
                          <CheckCheck className="w-3.5 h-3.5 text-sky-500 shrink-0 inline" />
                        )}
                        <span className="truncate">{lastText}</span>
                      </p>

                      {contact.unreadCount > 0 && !isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#F26B3B] text-white text-[10px] font-extrabold flex items-center justify-center shrink-0 ml-1">
                          {contact.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredContacts.length === 0 && (
              <div className="text-center py-12 px-4 text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs">No contacts match your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: INDIVIDUAL CHAT VIEW ================= */}
        <div 
          className={`flex-1 flex flex-col bg-[#F8FBFE] ${
            !mobileShowChat ? 'hidden md:flex' : 'flex'
          }`}
        >
          {activeContact ? (
            <>
              {/* WhatsApp Chat Top Header */}
              <div className="p-3 sm:p-4 bg-white border-b border-[#E7F6FE] flex items-center justify-between shadow-2xs z-10">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  {/* Mobile Back Button */}
                  <button
                    onClick={() => setMobileShowChat(false)}
                    className="md:hidden p-1.5 rounded-xl hover:bg-gray-100 text-[#121942]"
                    title="Back to chat list"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Contact Avatar & Info */}
                  <div 
                    onClick={() => setShowContactInfo(prev => !prev)}
                    className="flex items-center gap-2.5 cursor-pointer hover:opacity-85 transition-opacity"
                  >
                    <div className="relative">
                      <img
                        src={activeContact.avatar}
                        alt={activeContact.name}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl object-cover border border-[#D4E3ED]"
                      />
                      {activeContact.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                      )}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-sm sm:text-base text-[#121942] leading-tight flex items-center gap-1.5">
                        {activeContact.name}
                      </h3>
                      <p className="text-[11px] text-gray-500 flex items-center gap-1">
                        {isTyping ? (
                          <span className="text-emerald-600 font-semibold animate-pulse">typing...</span>
                        ) : activeContact.isOnline ? (
                          <span className="text-emerald-600 font-medium">Online</span>
                        ) : (
                          <span>{activeContact.lastSeen || 'Last seen recently'}</span>
                        )}
                        <span className="text-gray-300">•</span>
                        <span className="truncate max-w-[120px] sm:max-w-xs">{activeContact.role}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Call Action Buttons (Voice & Video like WhatsApp) */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => handleStartCall('voice')}
                    className="p-2 sm:p-2.5 rounded-xl text-[#121942] hover:bg-[#E7F6FE] hover:text-[#121942] transition-colors border border-transparent hover:border-[#AEE1F9]/50"
                    title="Voice Call"
                  >
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#121942]" />
                  </button>

                  <button
                    onClick={() => handleStartCall('video')}
                    className="p-2 sm:p-2.5 rounded-xl text-[#121942] hover:bg-[#E7F6FE] hover:text-[#121942] transition-colors border border-transparent hover:border-[#AEE1F9]/50"
                    title="Video Call"
                  >
                    <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#121942]" />
                  </button>

                  <button
                    onClick={() => setShowContactInfo(prev => !prev)}
                    className="p-2 sm:p-2.5 rounded-xl text-gray-400 hover:text-[#121942] hover:bg-gray-100 transition-colors"
                    title="Contact Details"
                  >
                    <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Chat Body with WhatsApp Pattern Wallpaper */}
              <div 
                className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3 relative"
                style={{
                  backgroundImage: `radial-gradient(#121942 0.75px, transparent 0.75px)`,
                  backgroundSize: '24px 24px',
                  backgroundColor: '#F8FBFE'
                }}
              >
                {/* Security encryption banner */}
                <div className="text-center my-1">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[11px] text-amber-900 shadow-2xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Messages and clinical calls are end-to-end encrypted. Case #AN-4819.</span>
                  </div>
                </div>

                <div className="text-center my-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-2xs">
                    Today
                  </span>
                </div>

                {/* Messages Loop */}
                {currentMessages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed shadow-2xs relative group ${
                          isUser
                            ? 'bg-[#121942] text-white rounded-br-xs'
                            : 'bg-white text-[#121942] border border-[#D4E3ED] rounded-bl-xs'
                        }`}
                      >
                        {/* Audio Note Preview */}
                        {msg.attachment?.type === 'voice' && (
                          <div className={`p-2.5 rounded-xl mb-2 flex items-center gap-3 ${
                            isUser ? 'bg-white/10' : 'bg-gray-50 border border-gray-100'
                          }`}>
                            <button
                              onClick={() => setPlayingAudioId(playingAudioId === msg.id ? null : msg.id)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isUser ? 'bg-white text-[#121942]' : 'bg-[#121942] text-white'
                              }`}
                            >
                              {playingAudioId === msg.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 ml-0.5" />
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="h-1.5 bg-gray-300/40 rounded-full overflow-hidden">
                                <div className={`h-full ${playingAudioId === msg.id ? 'w-2/3 bg-[#F26B3B] animate-pulse' : 'w-1/4 bg-gray-400'}`} />
                              </div>
                              <div className="flex items-center justify-between text-[10px] mt-1 opacity-80">
                                <span>Voice Note</span>
                                <span>{msg.attachment.duration || '0:35'}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Text Content */}
                        <p className="whitespace-pre-wrap">{msg.text}</p>

                        {/* Document Attachment */}
                        {msg.attachment && msg.attachment.type !== 'voice' && (
                          <div 
                            onClick={() => alert(`Opening document: ${msg.attachment?.title}`)}
                            className={`mt-2 p-2.5 rounded-xl flex items-center gap-2.5 cursor-pointer transition-all ${
                              isUser 
                                ? 'bg-white/10 hover:bg-white/20' 
                                : 'bg-[#F8FBFE] hover:bg-[#E7F6FE] border border-[#D4E3ED]'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-[#FFF4EE] text-[#F26B3B] flex items-center justify-center shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-semibold text-xs truncate">{msg.attachment.title}</p>
                              <p className="text-[10px] opacity-75">{msg.attachment.fileSize || 'PDF Document'}</p>
                            </div>
                          </div>
                        )}

                        {/* Timestamp & Status Checkmark */}
                        <div className={`flex items-center justify-end gap-1 text-[10px] mt-1 ${
                          isUser ? 'text-white/70' : 'text-gray-400'
                        }`}>
                          <span>{msg.time}</span>
                          {isUser && (
                            <CheckCheck className="w-3.5 h-3.5 text-[#AEE1F9]" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing indicator bubble */}
                {isTyping && (
                  <div className="flex items-start">
                    <div className="bg-white border border-[#D4E3ED] rounded-2xl rounded-bl-xs px-4 py-3 shadow-2xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Input Area */}
              <div className="p-2 sm:p-3.5 bg-white border-t border-[#E7F6FE] relative shrink-0 z-20">
                {/* Emoji Quick Picker */}
                {showEmojiPicker && (
                  <div className="absolute bottom-16 left-2 sm:left-4 bg-white border border-[#D4E3ED] rounded-2xl shadow-xl p-2.5 sm:p-3 flex items-center gap-1.5 sm:gap-2 z-30 animate-in fade-in zoom-in-95 duration-100 max-w-[calc(100vw-32px)] overflow-x-auto">
                    {['🌿', '💙', '✨', '👍', '🙏', '❤️', '😊', '⭐', '🧩'].map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleQuickEmoji(emoji)}
                        className="text-lg sm:text-xl p-1 sm:p-1.5 hover:bg-gray-100 rounded-xl transition-all"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                {/* Attachment Menu Popup */}
                {showAttachMenu && (
                  <div className="absolute bottom-16 left-4 sm:left-12 bg-white border border-[#D4E3ED] rounded-2xl shadow-xl p-2.5 z-30 w-56 space-y-1 animate-in fade-in zoom-in-95 duration-100">
                    <button
                      type="button"
                      onClick={() => handleSendAttachment('report', "Vihaan_Sensory_Observation_Log.pdf")}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-[#F8FBFE] flex items-center gap-2.5 text-xs text-[#121942] font-semibold"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#E7F6FE] text-[#121942] flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#F26B3B]" />
                      </div>
                      <span>Medical Report (PDF)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendAttachment('image', "Morning_Visual_Schedule_Board.jpg")}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-[#F8FBFE] flex items-center gap-2.5 text-xs text-[#121942] font-semibold"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <span>Photo / Visual Chart</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSendAttachment('voice', "Caregiver_Voice_Observation.m4a")}
                      className="w-full px-3 py-2 text-left rounded-xl hover:bg-[#F8FBFE] flex items-center gap-2.5 text-xs text-[#121942] font-semibold"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                        <Mic className="w-4 h-4" />
                      </div>
                      <span>Recorded Voice Clip</span>
                    </button>
                  </div>
                )}

                <form onSubmit={handleSend} className="flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEmojiPicker(prev => !prev);
                      setShowAttachMenu(false);
                    }}
                    className="p-1.5 sm:p-2 rounded-xl text-gray-400 hover:text-[#121942] hover:bg-gray-100 transition-colors shrink-0"
                    title="Insert emoji"
                  >
                    <Smile className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowAttachMenu(prev => !prev);
                      setShowEmojiPicker(false);
                    }}
                    className="p-1.5 sm:p-2 rounded-xl text-gray-400 hover:text-[#121942] hover:bg-gray-100 transition-colors shrink-0"
                    title="Attach file or report"
                  >
                    <Paperclip className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </button>

                  <input
                    type="text"
                    placeholder={`Message ${activeContact.name}...`}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1 min-w-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#121942] focus:ring-2 focus:ring-[#AEE1F9] outline-none text-xs sm:text-sm text-[#121942] transition-all"
                  />

                  {inputMessage.trim() ? (
                    <button
                      type="submit"
                      className="p-2 sm:p-2.5 rounded-2xl bg-[#121942] hover:bg-[#1a235c] text-white transition-all shadow-xs shrink-0 active:scale-95"
                      title="Send message"
                    >
                      <Send className="w-4 h-4 text-[#AEE1F9]" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSendAttachment('voice', 'Quick_Voice_Note.m4a')}
                      className="p-2 sm:p-2.5 rounded-2xl bg-gray-100 hover:bg-[#E7F6FE] text-[#121942] transition-all shrink-0"
                      title="Send voice note"
                    >
                      <Mic className="w-4 h-4 text-[#F26B3B]" />
                    </button>
                  )}
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
              <div className="w-16 h-16 rounded-3xl bg-[#E7F6FE] text-[#121942] flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-[#F26B3B]" />
              </div>
              <h3 className="text-base font-bold text-[#121942]">Select a chat</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-sm">
                Choose a specialist, family member, or caregiver circle to view past conversations and make calls.
              </p>
            </div>
          )}
        </div>

        {/* ================= OPTIONAL CONTACT INFO DRAWER ================= */}
        {showContactInfo && activeContact && (
          <div className="hidden xl:flex flex-col w-72 border-l border-[#E7F6FE] bg-white p-5 shrink-0 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Contact Details</h4>
              <button
                onClick={() => setShowContactInfo(false)}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center pb-4 border-b border-gray-100">
              <img
                src={activeContact.avatar}
                alt={activeContact.name}
                className="w-20 h-20 rounded-3xl object-cover border-2 border-[#D4E3ED] mb-3 shadow-sm"
              />
              <h3 className="font-extrabold text-sm text-[#121942]">{activeContact.name}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{activeContact.role}</p>
              {activeContact.hospital && (
                <p className="text-[11px] text-gray-400 mt-0.5">{activeContact.hospital}</p>
              )}

              {/* Call Buttons */}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => handleStartCall('voice')}
                  className="px-3.5 py-2 rounded-xl bg-[#E7F6FE] hover:bg-[#D4E3ED] text-[#121942] text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#121942]" />
                  <span>Voice</span>
                </button>
                <button
                  onClick={() => handleStartCall('video')}
                  className="px-3.5 py-2 rounded-xl bg-[#121942] hover:bg-[#1a235c] text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Video className="w-3.5 h-3.5 text-[#AEE1F9]" />
                  <span>Video</span>
                </button>
              </div>
            </div>

            {/* Details List */}
            <div className="py-4 space-y-3 text-xs border-b border-gray-100">
              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">About</span>
                <p className="text-gray-600 mt-0.5 leading-relaxed">{activeContact.about || 'Verified member of Vihaan Patel care circle.'}</p>
              </div>

              {activeContact.phone && (
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-bold">Phone Number</span>
                  <p className="font-semibold text-[#121942] mt-0.5">{activeContact.phone}</p>
                </div>
              )}

              <div>
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Child Profile</span>
                <p className="font-semibold text-[#121942] mt-0.5">Vihaan Patel (Case #AN-4819)</p>
              </div>
            </div>

            <div className="pt-4">
              <span className="text-gray-400 block text-[10px] uppercase font-bold mb-2">Encryption Status</span>
              <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-xl">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protected by HIPAA & Clinical Privacy standards</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= WHATSAPP-LIKE VOICE CALL MODAL ================= */}
      {activeCall && activeCall.type === 'voice' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-gradient-to-b from-[#121942] via-[#1a235c] to-[#0f1436] border border-white/10 rounded-3xl text-white shadow-2xl p-8 flex flex-col items-center text-center">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-xs text-white/60 mb-6">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                End-to-End Encrypted Call
              </span>
              <span>Anura Voice</span>
            </div>

            {/* Caller Avatar with Pulsing Waves */}
            <div className="relative my-4">
              {activeCall.status === 'connected' && (
                <div className="absolute -inset-4 rounded-full bg-[#AEE1F9]/20 animate-ping opacity-75" />
              )}
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl">
                <img
                  src={activeCall.contact.avatar}
                  alt={activeCall.contact.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-white mt-2">{activeCall.contact.name}</h3>
            <p className="text-xs text-[#AEE1F9] mt-1">{activeCall.contact.role}</p>

            {/* Status & Timer */}
            <div className="my-4">
              {activeCall.status === 'calling' ? (
                <span className="text-xs text-white/70 animate-pulse font-medium">Ringing...</span>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-sm font-bold text-white tracking-wider">{formatDuration(activeCall.duration)}</span>
                </div>
              )}
            </div>

            {/* Call Action Controls */}
            <div className="flex items-center justify-center gap-5 mt-6">
              {/* Mute Toggle */}
              <button
                onClick={() => setActiveCall(prev => prev ? { ...prev, isMuted: !prev.isMuted } : null)}
                className={`p-4 rounded-full transition-all ${
                  activeCall.isMuted
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Mute microphone"
              >
                {activeCall.isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>

              {/* End Call Button */}
              <button
                onClick={handleEndCall}
                className="p-5 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                title="End Call"
              >
                <PhoneOff className="w-7 h-7" />
              </button>

              {/* Speaker Toggle */}
              <button
                onClick={() => setActiveCall(prev => prev ? { ...prev, isSpeakerOn: !prev.isSpeakerOn } : null)}
                className={`p-4 rounded-full transition-all ${
                  activeCall.isSpeakerOn
                    ? 'bg-[#AEE1F9]/20 text-[#AEE1F9] border border-[#AEE1F9]/40'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Speaker"
              >
                {activeCall.isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= WHATSAPP-LIKE VIDEO CALL MODAL ================= */}
      {activeCall && activeCall.type === 'video' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-950 border border-white/10 rounded-3xl text-white shadow-2xl overflow-hidden flex flex-col">
            {/* Video Canvas Container */}
            <div className="relative w-full h-[420px] sm:h-[480px] bg-slate-900 flex items-center justify-center">
              {/* Doctor / Specialist Video Feed Mockup */}
              <img
                src={activeCall.contact.avatar}
                alt={activeCall.contact.name}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

              {/* Top Header Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                  <span className={`w-2 h-2 rounded-full ${activeCall.status === 'connected' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`} />
                  <span>
                    {activeCall.status === 'calling' ? 'Calling...' : `Connected • ${formatDuration(activeCall.duration)}`}
                  </span>
                </div>

                <div className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white/80 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>HD Encrypted</span>
                </div>
              </div>

              {/* PiP Local Video (Caregiver & Child) */}
              <div className="absolute bottom-5 right-5 w-32 sm:w-36 h-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl bg-black">
                {activeCall.isVideoOff ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500">
                    <CameraOff className="w-6 h-6" />
                  </div>
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250"
                    alt="Shweta & Vihaan Patel"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute bottom-1.5 left-2 text-[9px] bg-black/60 px-1.5 py-0.5 rounded text-white/90 font-medium">
                  You & Vihaan
                </div>
              </div>

              {/* Bottom Doctor Details Overlay */}
              <div className="absolute bottom-5 left-5 text-left">
                <h3 className="font-extrabold text-lg text-white">{activeCall.contact.name}</h3>
                <p className="text-xs text-[#AEE1F9]">{activeCall.contact.role}</p>
              </div>
            </div>

            {/* Bottom Controls Bar */}
            <div className="bg-[#121942] p-4 sm:p-5 flex items-center justify-center gap-4 sm:gap-6 border-t border-white/10">
              {/* Mic Toggle */}
              <button
                onClick={() => setActiveCall(prev => prev ? { ...prev, isMuted: !prev.isMuted } : null)}
                className={`p-3 sm:p-3.5 rounded-full transition-all ${
                  activeCall.isMuted
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Mute/Unmute microphone"
              >
                {activeCall.isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>

              {/* Camera Toggle */}
              <button
                onClick={() => setActiveCall(prev => prev ? { ...prev, isVideoOff: !prev.isVideoOff } : null)}
                className={`p-3 sm:p-3.5 rounded-full transition-all ${
                  activeCall.isVideoOff
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
                title="Turn video camera on/off"
              >
                {activeCall.isVideoOff ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
              </button>

              {/* End Call Button */}
              <button
                onClick={handleEndCall}
                className="p-3.5 sm:p-4 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                title="End Video Call"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
