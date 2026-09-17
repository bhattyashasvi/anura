import React, { useState } from 'react';
import { JournalEntry } from '../types';
import { 
  BookHeart, 
  Sparkles, 
  Heart, 
  Plus, 
  Calendar, 
  Smile, 
  Sun, 
  CloudRain, 
  BatteryCharging,
  Trash2,
  Tag,
  Quote
} from 'lucide-react';

interface JournalViewProps {
  entries: JournalEntry[];
  onOpenNewJournal: () => void;
  onDeleteEntry: (id: string) => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  entries,
  onOpenNewJournal,
  onDeleteEntry
}) => {
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<string>('all');

  const moodColorMap: Record<JournalEntry['mood'], { label: string; bg: string; text: string; icon: React.FC<{ className?: string }> }> = {
    peaceful: { label: 'Peaceful', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', icon: Sun },
    grateful: { label: 'Grateful', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-800', icon: Heart },
    hopeful: { label: 'Hopeful', bg: 'bg-sky-50 border-sky-200', text: 'text-sky-800', icon: Sparkles },
    overwhelmed: { label: 'Overwhelmed', bg: 'bg-slate-100 border-slate-300', text: 'text-slate-800', icon: CloudRain },
    exhausted: { label: 'Tired', bg: 'bg-orange-50 border-orange-200', text: 'text-orange-800', icon: BatteryCharging }
  };

  const filteredEntries = entries.filter((e) => {
    if (selectedMoodFilter !== 'all' && e.mood !== selectedMoodFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4EE] text-[#F26B3B] text-xs font-semibold mb-2">
            <BookHeart className="w-3.5 h-3.5 fill-[#F26B3B]" />
            Caregiver Well-being & Heart Space
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121942] tracking-tight">
            Parent Reflection Journal
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            A quiet sanctuary to honor your patience, process heavy days, and document the unspoken beauty of your child's growth.
          </p>
        </div>

        <button
          onClick={onOpenNewJournal}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#121942] hover:bg-[#1a235c] text-white text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 text-[#AEE1F9]" />
          <span>Write Today's Reflection</span>
        </button>
      </div>

      {/* Gentle Affirmation Card */}
      <div className="bg-gradient-to-r from-[#121942] to-[#1c2763] rounded-3xl p-6 sm:p-7 text-white shadow-xs relative overflow-hidden">
        <Quote className="w-16 h-16 text-white/5 absolute -bottom-2 right-4 pointer-events-none" />
        <div className="max-w-xl space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#AEE1F9] font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F26B3B]" />
            Daily Caregiver Grounding
          </div>
          <p className="text-base sm:text-lg font-bold leading-relaxed">
            “You don’t have to carry the whole mountain today. Just love your child through this moment, and remember that you deserve gentleness too.”
          </p>
        </div>
      </div>

      {/* Mood Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedMoodFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedMoodFilter === 'all'
              ? 'bg-[#121942] text-white'
              : 'bg-white border border-[#D4E3ED] text-gray-600 hover:border-gray-400'
          }`}
        >
          All Reflections ({entries.length})
        </button>

        {Object.entries(moodColorMap).map(([mKey, mVal]) => (
          <button
            key={mKey}
            onClick={() => setSelectedMoodFilter(mKey)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedMoodFilter === mKey
                ? 'bg-[#121942] text-white shadow-xs'
                : 'bg-white border border-[#D4E3ED] text-gray-600 hover:border-gray-400'
            }`}
          >
            <span>{mVal.label}</span>
          </button>
        ))}
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => {
          const moodInfo = moodColorMap[entry.mood];
          const MoodIcon = moodInfo.icon;

          return (
            <div
              key={entry.id}
              className="bg-white border border-[#D4E3ED] rounded-3xl p-6 sm:p-7 shadow-2xs space-y-4 hover:border-[#121942] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E7F6FE]">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${moodInfo.bg} ${moodInfo.text} flex items-center gap-1.5 text-xs font-bold`}>
                    <MoodIcon className="w-4 h-4" />
                    <span>{moodInfo.label}</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#121942] text-base">{entry.title}</h3>
                    <span className="text-[11px] text-gray-400">{entry.dateDisplay}</span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteEntry(entry.id)}
                  className="text-gray-400 hover:text-red-500 p-1 rounded-lg transition-colors self-end sm:self-auto"
                  title="Delete entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Small Victory Callout */}
              <div className="p-3.5 rounded-2xl bg-[#FFF4EE] border border-[#F26B3B]/20 text-xs">
                <span className="font-bold text-[#F26B3B] block uppercase tracking-wider text-[10px] mb-0.5">
                  Small Victory Celebrated Today:
                </span>
                <p className="font-semibold text-[#121942]">{entry.victoryToday}</p>
              </div>

              {/* Personal Notes */}
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {entry.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {entry.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E7F6FE] text-[#121942] text-[10px] font-semibold border border-[#AEE1F9]/50"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
