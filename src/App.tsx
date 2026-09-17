import React, { useState } from 'react';
import { 
  NavigationTab, 
  ChildProfile, 
  DailyTask, 
  TherapySession, 
  CommunityBlog, 
  CommunityEvent, 
  JournalEntry, 
  EmergencyContact, 
  ChatMessage,
  Specialist,
  ChatContact,
  PreSavedActivity
} from './types';
import {
  INITIAL_CHILD_PROFILE,
  INITIAL_TASKS,
  INITIAL_PRE_SAVED_ACTIVITIES,
  INITIAL_REPORTS,
  INITIAL_SPECIALISTS,
  INITIAL_SESSIONS,
  INITIAL_BLOGS,
  INITIAL_EVENTS,
  INITIAL_JOURNAL_ENTRIES,
  INITIAL_EMERGENCY_CONTACTS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_CHAT_CONTACTS,
  INITIAL_CONVERSATIONS
} from './data/mockData';

import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SOSModal } from './components/SOSModal';
import { JournalModal } from './components/JournalModal';
import { PaymentModal } from './components/PaymentModal';

import { DashboardView } from './views/DashboardView';
import { ScheduleView } from './views/ScheduleView';
import { ChildProfileView } from './views/ChildProfileView';
import { TherapyView } from './views/TherapyView';
import { ChatView } from './views/ChatView';
import { CommunityView } from './views/CommunityView';
import { EventsView } from './views/EventsView';
import { JournalView } from './views/JournalView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  
  // App state
  const [childProfile, setChildProfile] = useState<ChildProfile>(INITIAL_CHILD_PROFILE);
  const [tasks, setTasks] = useState<DailyTask[]>(INITIAL_TASKS);
  const [preSavedActivities, setPreSavedActivities] = useState<PreSavedActivity[]>(INITIAL_PRE_SAVED_ACTIVITIES);
  const [reports] = useState(INITIAL_REPORTS);
  const [specialists] = useState<Specialist[]>(INITIAL_SPECIALISTS);
  const [sessions] = useState<TherapySession[]>(INITIAL_SESSIONS);
  const [blogs, setBlogs] = useState<CommunityBlog[]>(INITIAL_BLOGS);
  const [events, setEvents] = useState<CommunityEvent[]>(INITIAL_EVENTS);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(INITIAL_JOURNAL_ENTRIES);
  const [contacts, setContacts] = useState<EmergencyContact[]>(INITIAL_EMERGENCY_CONTACTS);
  const [chatContacts, setChatContacts] = useState<ChatContact[]>(INITIAL_CHAT_CONTACTS);
  const [conversations, setConversations] = useState<Record<string, ChatMessage[]>>(INITIAL_CONVERSATIONS);
  const [activeChatContactId, setActiveChatContactId] = useState<string>('contact-spec-1');

  // Modals
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [eventToBook, setEventToBook] = useState<CommunityEvent | null>(null);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);
  const [hasJournaledToday, setHasJournaledToday] = useState(true);

  // Task actions
  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (newTask: Omit<DailyTask, 'id'>) => {
    const task: DailyTask = {
      ...newTask,
      id: `task-${Date.now()}`
    };
    setTasks(prev => [task, ...prev]);
  };

  const handleBatchAddTasks = (newTasks: Omit<DailyTask, 'id'>[]) => {
    const created: DailyTask[] = newTasks.map((t, idx) => ({
      ...t,
      id: `task-${Date.now()}-${idx}`
    }));
    setTasks(prev => [...created, ...prev]);
  };

  const handleSaveNewPreSavedActivity = (newActivity: PreSavedActivity) => {
    setPreSavedActivities(prev => [newActivity, ...prev]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  // Blog actions
  const handleToggleLike = (blogId: string) => {
    setBlogs(prev => prev.map(b => {
      if (b.id === blogId) {
        const hasLiked = !b.hasLiked;
        return {
          ...b,
          hasLiked,
          likes: hasLiked ? b.likes + 1 : b.likes - 1
        };
      }
      return b;
    }));
  };

  const handleToggleSave = (blogId: string) => {
    setBlogs(prev => prev.map(b => b.id === blogId ? { ...b, isSaved: !b.isSaved } : b));
  };

  const handleAddBlog = (newBlog: Omit<CommunityBlog, 'id' | 'likes' | 'commentsCount'>) => {
    const blog: CommunityBlog = {
      ...newBlog,
      id: `blog-${Date.now()}`,
      likes: 1,
      hasLiked: true,
      commentsCount: 0
    };
    setBlogs(prev => [blog, ...prev]);
    setActiveBlogId(blog.id);
  };

  // Event booking
  const handlePaymentSuccess = (eventId: string) => {
    setEvents(prev => prev.map(ev => ev.id === eventId ? { ...ev, isRegistered: true, attendingCount: ev.attendingCount + 1 } : ev));
  };

  const handleToggleRSVP = (eventId: string) => {
    setEvents(prev => prev.map(ev => {
      if (ev.id === eventId) {
        const nextState = !ev.isRegistered;
        return {
          ...ev,
          isRegistered: nextState,
          attendingCount: nextState ? ev.attendingCount + 1 : Math.max(0, ev.attendingCount - 1)
        };
      }
      return ev;
    }));
  };

  const handleAddEventToSchedule = (event: CommunityEvent) => {
    const newTask: DailyTask = {
      id: `task-event-${Date.now()}`,
      title: event.title,
      time: event.time.split(' - ')[0] || event.time,
      category: event.category === 'Art & Play' ? 'Creative and Expression' : (event.category === 'Sensory Sports' ? 'Sensory' : 'Social'),
      completed: false,
      dateStr: event.date,
      description: `${event.location} • ${event.description}`
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const handleCreateEvent = (newEvent: Omit<CommunityEvent, 'id' | 'isRegistered'>) => {
    const ev: CommunityEvent = {
      ...newEvent,
      id: `ev-${Date.now()}`,
      isRegistered: true
    };
    setEvents(prev => [ev, ...prev]);
  };

  // Journal action
  const handleSaveJournalEntry = (entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: `j-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setJournalEntries(prev => [newEntry, ...prev]);
    setHasJournaledToday(true);
  };

  const handleDeleteJournalEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(e => e.id !== id));
  };

  // Contacts
  const handleAddContact = (contact: Omit<EmergencyContact, 'id'>) => {
    const newContact: EmergencyContact = {
      ...contact,
      id: `ec-${Date.now()}`
    };
    setContacts(prev => [...prev, newContact]);
  };

  const handleDeleteContact = (id: string) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const handleSetPrimaryContact = (id: string) => {
    setContacts(prev => prev.map(c => ({
      ...c,
      isPrimary: c.id === id
    })));
  };

  // Chat & Communication Simulation (WhatsApp-like)
  const handleSendChatMessage = (contactId: string, text: string, attachment?: ChatMessage['attachment']) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
      attachment
    };

    setConversations(prev => ({
      ...prev,
      [contactId]: [...(prev[contactId] || []), userMsg]
    }));

    setChatContacts(prev => prev.map(c => c.id === contactId ? {
      ...c,
      lastMessageSnippet: text,
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : c));

    // Simulated reply
    setTimeout(() => {
      const contact = chatContacts.find(c => c.id === contactId);
      let replyText = "Thank you for the update. I have noted this in Vihaan's care record.";
      if (contact?.type === 'specialist') {
        const specialistReplies = [
          "Thank you for sharing this observation, Shweta. Remember that consistency in his visual schedule builds safety.",
          "That's a wonderful sign of self-regulation! You handled that with great composure.",
          "Let's monitor how he responds this afternoon. I'm adding a note to Vihaan's developmental file.",
          "Take a gentle breath, Shweta. You are doing a remarkable job supporting his journey."
        ];
        replyText = specialistReplies[Math.floor(Math.random() * specialistReplies.length)];
      } else if (contact?.type === 'caregiver') {
        const caregiverReplies = [
          "Got it, beta! Vihaan is smiling and playing peacefully right now.",
          "Thanks for letting me know, Shweta! I will make sure his quiet space is ready.",
          "All good here at home. We just finished afternoon quiet time."
        ];
        replyText = caregiverReplies[Math.floor(Math.random() * caregiverReplies.length)];
      } else {
        replyText = "Such wonderful progress for Vihaan! Thank you for sharing with our circle 💙";
      }

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'contact',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };

      setConversations(prev => ({
        ...prev,
        [contactId]: [...(prev[contactId] || []), replyMsg]
      }));

      setChatContacts(prev => prev.map(c => c.id === contactId ? {
        ...c,
        lastMessageSnippet: replyText,
        lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      } : c));
    }, 1500);
  };

  const handleOpenChatWithSpecialist = (specialistId: string) => {
    const contact = chatContacts.find(c => c.id === `contact-${specialistId}` || c.name.toLowerCase().includes(specialistId.toLowerCase())) || chatContacts[0];
    if (contact) {
      setActiveChatContactId(contact.id);
      setChatContacts(prev => prev.map(c => c.id === contact.id ? { ...c, unreadCount: 0 } : c));
    }
    setCurrentTab('chat');
  };

  const totalUnreadChatCount = chatContacts.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
  const completedTasksCount = tasks.filter(t => t.completed).length;

  return (
    <div className="fixed inset-0 bg-[#F8FBFE] flex flex-col font-sans selection:bg-[#AEE1F9] selection:text-[#121942] overflow-hidden">
      {/* Top Universal Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setActiveBlogId(null);
        }}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenJournalModal={() => setIsJournalModalOpen(true)}
        childProfile={childProfile}
        completedTasksCount={completedTasksCount}
        totalTasksCount={tasks.length}
        hasJournaledToday={hasJournaledToday}
        unreadChatCount={totalUnreadChatCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto min-h-0 overflow-hidden relative">
        {/* Desktop Sidebar */}
        <Sidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setActiveBlogId(null);
          }}
          onOpenSOS={() => setIsSOSOpen(true)}
          unreadChatCount={totalUnreadChatCount}
        />

        {/* View Container */}
        <main className={`flex-1 max-w-full min-h-0 ${
          currentTab === 'chat'
            ? 'p-2 sm:px-4 sm:py-3 xl:px-8 xl:py-6 pb-24 xl:pb-6 flex flex-col overflow-hidden'
            : 'px-4 sm:px-6 xl:px-8 py-6 sm:py-8 pb-28 xl:pb-12 overflow-y-auto'
        }`}>
          {currentTab === 'dashboard' && (
            <DashboardView
              onNavigate={(tab) => {
                setCurrentTab(tab);
                setActiveBlogId(null);
              }}
              childProfile={childProfile}
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onOpenAddTask={() => setCurrentTab('schedule')}
              sessions={sessions}
              onStartSession={() => setCurrentTab('therapy')}
              blogs={blogs}
              onSelectBlog={(blog) => {
                setActiveBlogId(blog.id);
                setCurrentTab('community');
              }}
              events={events}
              onSelectEvent={(event) => {
                setEventToBook(event);
              }}
              hasJournaledToday={hasJournaledToday}
              onOpenJournalModal={() => setIsJournalModalOpen(true)}
              onOpenSOS={() => setIsSOSOpen(true)}
            />
          )}

          {currentTab === 'schedule' && (
            <ScheduleView
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onAddTask={handleAddTask}
              onAddMultipleTasks={handleBatchAddTasks}
              onDeleteTask={handleDeleteTask}
              preSavedActivities={preSavedActivities}
              onSaveNewPreSavedActivity={handleSaveNewPreSavedActivity}
            />
          )}

          {currentTab === 'child-profile' && (
            <ChildProfileView
              profile={childProfile}
              reports={reports}
              onUpdateProfile={setChildProfile}
              onClose={() => setCurrentTab('dashboard')}
            />
          )}

          {currentTab === 'therapy' && (
            <TherapyView
              specialists={specialists}
              sessions={sessions}
              onBookSpecialist={(spec) => alert(`Consultation scheduled with ${spec.name}.`)}
              onOpenChatWithSpecialist={handleOpenChatWithSpecialist}
            />
          )}

          {currentTab === 'chat' && (
            <ChatView
              contacts={chatContacts}
              conversations={conversations}
              activeContactId={activeChatContactId}
              onSelectContact={(id) => {
                setActiveChatContactId(id);
                setChatContacts(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } : c));
              }}
              onSendMessage={handleSendChatMessage}
            />
          )}

          {currentTab === 'community' && (
            <CommunityView
              blogs={blogs}
              onToggleLike={handleToggleLike}
              onToggleSave={handleToggleSave}
              onAddBlog={handleAddBlog}
              activeBlogId={activeBlogId}
              onSelectBlog={(blog) => setActiveBlogId(blog ? blog.id : null)}
            />
          )}

          {currentTab === 'events' && (
            <EventsView
              events={events}
              onSelectEventToBook={(event) => setEventToBook(event)}
              onCreateEvent={handleCreateEvent}
              onToggleRSVP={handleToggleRSVP}
              onAddEventToSchedule={handleAddEventToSchedule}
              childProfile={childProfile}
            />
          )}

          {currentTab === 'journal' && (
            <JournalView
              entries={journalEntries}
              onOpenNewJournal={() => setIsJournalModalOpen(true)}
              onDeleteEntry={handleDeleteJournalEntry}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              contacts={contacts}
              onAddContact={handleAddContact}
              onDeleteContact={handleDeleteContact}
              onSetPrimaryContact={handleSetPrimaryContact}
            />
          )}
        </main>
      </div>

      {/* Mobile Navigation Dock */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setActiveBlogId(null);
        }}
        onOpenSOS={() => setIsSOSOpen(true)}
        unreadChatCount={totalUnreadChatCount}
      />

      {/* Universal Modals */}
      <SOSModal
        isOpen={isSOSOpen}
        onClose={() => setIsSOSOpen(false)}
        contacts={contacts}
      />

      <JournalModal
        isOpen={isJournalModalOpen}
        onClose={() => setIsJournalModalOpen(false)}
        onSaveEntry={handleSaveJournalEntry}
      />

      <PaymentModal
        isOpen={!!eventToBook}
        onClose={() => setEventToBook(null)}
        event={eventToBook}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
