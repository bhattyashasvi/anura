import React, { useState } from 'react';
import { X, Sparkles, Heart, Smile, Sun, CloudRain, BatteryCharging, Check } from 'lucide-react';
import { JournalEntry } from '../types';
import confetti from 'canvas-confetti';

interface JournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveEntry: (entry: Omit<JournalEntry, 'id' | 'date'>) => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  isOpen,
  onClose,
  onSaveEntry
}) => {
  const [mood, setMood] = useState<JournalEntry['mood']>('grateful');
  const [title, setTitle] = useState('');
  const [victoryToday, setVictoryToday] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(['Daily Reflection', 'Caregiver Space']);

  if (!isOpen) return null;

  const moods: { id: JournalEntry['mood']; label: string; icon: React.FC<{ className?: string }>; bg: string; text: string }[] = [
    { id: 'peaceful', label: 'Peaceful', icon: Sun, bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800' },
    { id: 'grateful', label: 'Grateful', icon: Heart, bg: 'bg-rose-50 border-rose-200', text: 'text-rose-800' },
    { id: 'hopeful', label: 'Hopeful', icon: Sparkles, bg: 'bg-sky-50 border-sky-200', text: 'text-sky-800' },
    { id: 'overwhelmed', label: 'Overwhelmed', icon: CloudRain, bg: 'bg-slate-100 border-slate-300', text: 'text-slate-800' },
    { id: 'exhausted', label: 'Tired', icon: BatteryCharging, bg: 'bg-orange-50 border-orange-200', text: 'text-orange-800' }
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    onSaveEntry({
      dateDisplay: 'Today, ' + new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      mood,
      title: title.trim() || 'Today’s Caregiver Reflection',
      victoryToday: victoryToday.trim() || 'Took a mindful breath and stayed patient during transition.',
      content: content.trim() || 'A quiet space to reflect on the beauty and resilience of today.',
      tags
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#AEE1F9', '#F26B3B', '#121942']
      });
    } catch {
      // Ignore
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#E7F6FE] mb-5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4EE] text-[#F26B3B] text-xs font-bold mb-1.5">
              <Heart className="w-3.5 h-3.5 fill-[#F26B3B]" />
              Caregiver Emotional Support
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#121942] tracking-tight">
              Did you take a moment for yourself today?
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Your well-being is the foundation of your child's world. A safe space to exhale.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-[#121942] hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mood Selector */}
          <div>
            <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-2">
              How are you feeling right now?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {moods.map((m) => {
                const Icon = m.icon;
                const isSelected = mood === m.id;
                return (
                  <button
                    type="button"
                    key={m.id}
                    onClick={() => setMood(m.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-xs font-semibold transition-all ${
                      isSelected
                        ? `${m.bg} ${m.text} ring-2 ring-[#121942] shadow-xs`
                        : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-gray-50/50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-1" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
              Title or Theme for Today
            </label>
            <input
              type="text"
              placeholder="e.g. A small milestone at bedtime..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#121942] focus:ring-2 focus:ring-[#AEE1F9] outline-none text-sm text-[#121942]"
            />
          </div>

          {/* Small Victory Prompt */}
          <div>
            <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>What was a small victory today?</span>
              <span className="text-[10px] text-[#F26B3B] font-normal">Every step counts</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Vihaan held eye contact and smiled after lego time"
              value={victoryToday}
              onChange={(e) => setVictoryToday(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#121942] focus:ring-2 focus:ring-[#AEE1F9] outline-none text-sm text-[#121942]"
            />
          </div>

          {/* Free reflection content */}
          <div>
            <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
              Personal Reflection & Notes
            </label>
            <textarea
              rows={4}
              placeholder="Write whatever is on your mind — challenges, tender moments, or feelings you cannot express elsewhere..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#121942] focus:ring-2 focus:ring-[#AEE1F9] outline-none text-sm text-[#121942] resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
              Tags
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E7F6FE] text-[#121942] text-xs font-medium border border-[#AEE1F9]/50"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-gray-400 hover:text-[#F26B3B]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag (e.g. Breakthrough, CalmMornings)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700"
              >
                Add
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7F6FE]">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#121942] hover:bg-[#1a235c] text-white text-sm font-bold shadow-md transition-all active:scale-95"
            >
              Save Journal Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
