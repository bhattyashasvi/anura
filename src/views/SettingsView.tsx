import React, { useState } from 'react';
import { EmergencyContact } from '../types';
import { 
  Settings, 
  User, 
  PhoneCall, 
  ShieldAlert, 
  Plus, 
  Trash2, 
  Bell, 
  Lock, 
  Heart, 
  Check, 
  X,
  Share2,
  ExternalLink,
  Sliders,
  CheckCircle2
} from 'lucide-react';

interface SettingsViewProps {
  contacts: EmergencyContact[];
  onAddContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  onDeleteContact: (id: string) => void;
  onSetPrimaryContact: (id: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  contacts,
  onAddContact,
  onDeleteContact,
  onSetPrimaryContact
}) => {
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');

  // Settings Toggles
  const [loudNoiseAlerts, setLoudNoiseAlerts] = useState(true);
  const [routineReminders, setRoutineReminders] = useState(true);
  const [dailyJournalPrompt, setDailyJournalPrompt] = useState(true);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) return;

    onAddContact({
      name: newContactName.trim(),
      phoneNumber: newContactPhone.trim(),
      relation: newContactRelation.trim() || 'Emergency Contact',
      isPrimary: contacts.length === 0
    });

    setNewContactName('');
    setNewContactPhone('');
    setNewContactRelation('');
    setIsAddContactModalOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F6FE] text-[#121942] text-xs font-semibold mb-2">
          <Settings className="w-3.5 h-3.5 text-[#F26B3B]" />
          Caregiver Account & Emergency Safety
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121942] tracking-tight">
          Settings & Emergency SOS
        </h1>
        <p className="text-sm text-gray-500 mt-1 max-w-xl">
          Manage your verified caregiver profile, primary emergency contacts for instant SOS calling, and sensory alert preferences.
        </p>
      </div>

      {/* Profile Card from Case Study */}
      <div className="bg-white border border-[#D4E3ED] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#E7F6FE]">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
              alt="Shweta Patel"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-[#121942]">Shweta Patel</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E7F6FE] text-[#121942]">
                  Parent
                </span>
              </div>
              <p className="text-xs text-gray-500">@shwetapatel2 • Ahmedabad, Gujarat</p>
              <p className="text-xs text-gray-400 mt-0.5">Mother of Vihaan Patel (10 yrs, Level 1 ASD)</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-center">
            <div>
              <div className="text-lg font-black text-[#121942]">122</div>
              <div className="text-[10px] text-gray-400 uppercase font-semibold">Followers</div>
            </div>
            <div>
              <div className="text-lg font-black text-[#121942]">67</div>
              <div className="text-[10px] text-gray-400 uppercase font-semibold">Following</div>
            </div>
            <div>
              <div className="text-lg font-black text-[#F26B3B]">37</div>
              <div className="text-[10px] text-gray-400 uppercase font-semibold">Stories</div>
            </div>
          </div>
        </div>

        {/* Profile Action Buttons from Case Study */}
        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={() => alert("Profile information is synced and up to date.")}
            className="px-4 py-2 rounded-xl bg-[#121942] text-white text-xs font-bold hover:bg-[#1a235c] transition-colors"
          >
            Edit Profile
          </button>
          <button
            onClick={() => alert("Caregiver profile link copied to clipboard.")}
            className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Profile</span>
          </button>
        </div>
      </div>

      {/* Emergency Contacts Management (Core feature of Case Study SOS screen) */}
      <div className="bg-white border border-[#D4E3ED] rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-[#121942] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#F26B3B]" />
              Emergency SOS Contacts
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              These contacts are instantly dialed in sequence when the emergency SOS button is activated.
            </p>
          </div>

          <button
            onClick={() => setIsAddContactModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFF4EE] border border-[#F26B3B]/30 text-[#F26B3B] text-xs font-bold hover:bg-[#F26B3B] hover:text-white transition-all shadow-2xs shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Emergency Contact</span>
          </button>
        </div>

        {/* Contacts List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-4 rounded-2xl border transition-all ${
                contact.isPrimary
                  ? 'border-[#121942] bg-[#F8FBFE] shadow-2xs'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h4 className="font-bold text-sm text-[#121942]">{contact.name}</h4>
                  <span className="text-[11px] text-gray-500">{contact.relation}</span>
                </div>
                {contact.isPrimary && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#121942] text-white">
                    Primary SOS
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#121942] font-mono font-semibold mb-3">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>{contact.phoneNumber}</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs">
                {!contact.isPrimary ? (
                  <button
                    onClick={() => onSetPrimaryContact(contact.id)}
                    className="text-[#121942] font-semibold hover:underline"
                  >
                    Set as Primary
                  </button>
                ) : (
                  <span className="text-emerald-600 font-medium text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> First Line
                  </span>
                )}

                {contacts.length > 1 && (
                  <button
                    onClick={() => onDeleteContact(contact.id)}
                    className="text-gray-400 hover:text-red-500 p-1"
                    title="Remove contact"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sensory & App Notifications Preferences */}
      <div className="bg-white border border-[#D4E3ED] rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-lg font-extrabold text-[#121942] flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#AEE1F9]" />
          Sensory Preferences & Notifications
        </h3>

        <div className="divide-y divide-gray-100">
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-[#121942]">Visual Schedule Transitions</div>
              <div className="text-xs text-gray-500">Audio chime 5 minutes prior to next routine transition</div>
            </div>
            <input
              type="checkbox"
              checked={routineReminders}
              onChange={(e) => setRoutineReminders(e.target.checked)}
              className="w-5 h-5 accent-[#121942] cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-[#121942]">Loud Decibel Safety Alerts</div>
              <div className="text-xs text-gray-500">Alerts when surrounding ambient sound exceeds 75 dB</div>
            </div>
            <input
              type="checkbox"
              checked={loudNoiseAlerts}
              onChange={(e) => setLoudNoiseAlerts(e.target.checked)}
              className="w-5 h-5 accent-[#121942] cursor-pointer"
            />
          </div>

          <div className="py-3.5 flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-bold text-[#121942]">Evening Caregiver Journal Reminder</div>
              <div className="text-xs text-gray-500">Gentle prompt at 8:00 PM to reflect and decompress</div>
            </div>
            <input
              type="checkbox"
              checked={dailyJournalPrompt}
              onChange={(e) => setDailyJournalPrompt(e.target.checked)}
              className="w-5 h-5 accent-[#121942] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Add Emergency Contact Modal from Case Study */}
      {isAddContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7F6FE] mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B]">
                  Emergency Setup
                </span>
                <h3 className="text-lg font-extrabold text-[#121942]">Add Contact</h3>
              </div>
              <button
                onClick={() => setIsAddContactModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-[#121942]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Geeta Yadav"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                  Relation
                </label>
                <input
                  type="text"
                  placeholder="e.g. Grandmother, Father, Doctor"
                  value={newContactRelation}
                  onChange={(e) => setNewContactRelation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7F6FE]">
                <button
                  type="button"
                  onClick={() => setIsAddContactModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#121942] text-white text-xs font-bold hover:bg-[#1a235c] shadow-sm transition-all"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
