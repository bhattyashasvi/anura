import React, { useState, useMemo } from 'react';
import { DailyTask, PreSavedActivity, TaskCategory } from '../types';
import { 
  X, 
  Search, 
  Sparkles, 
  Sun, 
  Palette, 
  HeartHandshake, 
  Compass, 
  Check, 
  Clock, 
  Layers, 
  Plus, 
  CheckCircle2, 
  BookmarkCheck,
  Flame,
  Info,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AddActivitiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDateStr: string; // e.g., '2025-12-04' or '04 Dec'
  existingTasks: DailyTask[];
  preSavedActivities: PreSavedActivity[];
  onAddMultipleTasks: (tasks: Omit<DailyTask, 'id'>[]) => void;
  onSaveNewPreSavedActivity?: (activity: PreSavedActivity) => void;
}

export const AddActivitiesModal: React.FC<AddActivitiesModalProps> = ({
  isOpen,
  onClose,
  selectedDateStr,
  existingTasks,
  preSavedActivities,
  onAddMultipleTasks,
  onSaveNewPreSavedActivity
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<string>('All');
  
  // Set of selected activity IDs
  const [selectedActivityIds, setSelectedActivityIds] = useState<Set<string>>(new Set());
  
  // Custom adjusted times for selected activities: { [activityId]: '09:30 AM' }
  const [customTimes, setCustomTimes] = useState<Record<string, string>>({});

  // Show "Create custom pre-saved activity" sub-form
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TaskCategory>('Sensory');
  const [newTime, setNewTime] = useState('11:00 AM');
  const [newDuration, setNewDuration] = useState(20);
  const [newBenefit, setNewBenefit] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Category visual configurations
  const categoryConfig: Record<TaskCategory, { icon: React.FC<{ className?: string }>; color: string; badgeBg: string; textCol: string }> = {
    'Daily Routine': { icon: Sun, color: 'text-amber-600', badgeBg: 'bg-amber-50 border-amber-200', textCol: 'text-amber-800' },
    'Creative and Expression': { icon: Palette, color: 'text-purple-600', badgeBg: 'bg-purple-50 border-purple-200', textCol: 'text-purple-800' },
    'Sensory': { icon: Sparkles, color: 'text-sky-600', badgeBg: 'bg-sky-50 border-sky-200', textCol: 'text-sky-800' },
    'Social': { icon: HeartHandshake, color: 'text-rose-600', badgeBg: 'bg-rose-50 border-rose-200', textCol: 'text-rose-800' },
    'Outdoor': { icon: Compass, color: 'text-emerald-600', badgeBg: 'bg-emerald-50 border-emerald-200', textCol: 'text-emerald-800' }
  };

  // Filter logic
  const filteredActivities = useMemo(() => {
    return preSavedActivities.filter((act) => {
      // Search match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = act.title.toLowerCase().includes(q);
        const matchDesc = act.description.toLowerCase().includes(q);
        const matchBenefit = act.sensoryBenefit.toLowerCase().includes(q);
        const matchTags = act.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchBenefit && !matchTags) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== 'All' && act.category !== selectedCategory) {
        return false;
      }

      // Time of day match
      if (selectedTimeOfDay !== 'All' && act.timeOfDay !== selectedTimeOfDay && act.timeOfDay !== 'Anytime') {
        return false;
      }

      return true;
    });
  }, [preSavedActivities, searchQuery, selectedCategory, selectedTimeOfDay]);

  // Check if an activity is already scheduled on the current date
  const isAlreadyScheduled = (title: string) => {
    return existingTasks.some(
      t => t.title.toLowerCase().trim() === title.toLowerCase().trim()
    );
  };

  const toggleSelect = (id: string) => {
    setSelectedActivityIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAllFiltered = () => {
    setSelectedActivityIds(prev => {
      const next = new Set(prev);
      filteredActivities.forEach(act => next.add(act.id));
      return next;
    });
  };

  const clearSelection = () => {
    setSelectedActivityIds(new Set());
  };

  // Handle single quick add
  const handleQuickAddSingle = (activity: PreSavedActivity) => {
    const timeToUse = customTimes[activity.id] || activity.suggestedTime;
    onAddMultipleTasks([
      {
        title: activity.title,
        category: activity.category,
        time: timeToUse,
        completed: false,
        dateStr: selectedDateStr,
        description: `${activity.description} [Benefit: ${activity.sensoryBenefit}]`
      }
    ]);

    try {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#F26B3B', '#AEE1F9', '#121942']
      });
    } catch {
      // ignore
    }

    // Deselect from multi-select if was selected
    setSelectedActivityIds(prev => {
      const next = new Set(prev);
      next.delete(activity.id);
      return next;
    });
  };

  // Handle batch adding all selected activities
  const handleAddSelected = () => {
    if (selectedActivityIds.size === 0) return;

    const tasksToAdd: Omit<DailyTask, 'id'>[] = [];

    preSavedActivities.forEach((act) => {
      if (selectedActivityIds.has(act.id)) {
        tasksToAdd.push({
          title: act.title,
          category: act.category,
          time: customTimes[act.id] || act.suggestedTime,
          completed: false,
          dateStr: selectedDateStr,
          description: `${act.description} [Benefit: ${act.sensoryBenefit}]`
        });
      }
    });

    onAddMultipleTasks(tasksToAdd);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F26B3B', '#AEE1F9', '#121942']
      });
    } catch {
      // ignore
    }

    setSelectedActivityIds(new Set());
    onClose();
  };

  // Handle adding a brand new pre-saved template
  const handleCreateNewPreSaved = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newActivity: PreSavedActivity = {
      id: `psa-custom-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      suggestedTime: newTime,
      durationMinutes: Number(newDuration) || 20,
      description: newDesc.trim() || 'Custom parent-curated routine for calming sensory balance.',
      sensoryBenefit: newBenefit.trim() || 'Personalized Sensory Regulation',
      timeOfDay: newTime.includes('PM') ? 'Afternoon' : 'Morning',
      isCustom: true,
      tags: ['Custom', 'Parent Favorite']
    };

    if (onSaveNewPreSavedActivity) {
      onSaveNewPreSavedActivity(newActivity);
    }

    // Also auto-select it for the day
    setSelectedActivityIds(prev => new Set(prev).add(newActivity.id));

    // Reset form
    setNewTitle('');
    setNewBenefit('');
    setNewDesc('');
    setIsCreatingNew(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-6 pb-4 border-b border-[#E7F6FE] bg-gradient-to-r from-white via-[#F8FBFE] to-[#E7F6FE]/30 shrink-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F6FE] text-[#121942] text-xs font-bold mb-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-[#F26B3B]" />
                Pre-Saved Activities Library
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#121942] tracking-tight">
                Add Activities for the Day
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Select pre-saved sensory routines and therapy exercises to add to Vihaan's schedule for today.
              </p>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl text-gray-400 hover:text-[#121942] hover:bg-gray-100 transition-colors shrink-0"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar & quick action bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pre-saved activities (e.g. Lego, Sand, Swing, Bubble)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-[#D4E3ED] focus:border-[#121942] focus:ring-2 focus:ring-[#AEE1F9] outline-none text-xs sm:text-sm text-[#121942] placeholder:text-gray-400 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsCreatingNew(prev => !prev)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-2xl border border-[#D4E3ED] hover:border-[#121942] bg-white text-[#121942] text-xs font-bold transition-all shadow-2xs hover:bg-[#F8FBFE] shrink-0"
            >
              <Plus className="w-4 h-4 text-[#F26B3B]" />
              <span>{isCreatingNew ? 'Browse Library' : '+ Save Custom Activity'}</span>
            </button>
          </div>

          {/* Filter Pills */}
          {!isCreatingNew && (
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" />
                Domain:
              </span>

              {['All', 'Sensory', 'Daily Routine', 'Creative and Expression', 'Social', 'Outdoor'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#121942] text-white border-[#121942] shadow-2xs'
                      : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-200'
                  }`}
                >
                  {cat === 'Creative and Expression' ? 'Creative' : cat}
                </button>
              ))}

              <div className="h-4 w-px bg-gray-200 mx-1 shrink-0" />

              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
                Time:
              </span>
              {['All', 'Morning', 'Afternoon', 'Evening'].map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedTimeOfDay(slot)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all border shrink-0 ${
                    selectedTimeOfDay === slot
                      ? 'bg-[#E7F6FE] text-[#121942] border-[#AEE1F9] font-bold'
                      : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Modal Body: Custom Creator or Activity Selection List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
          {isCreatingNew ? (
            /* ================= FORM TO CREATE NEW PRE-SAVED ACTIVITY ================= */
            <form onSubmit={handleCreateNewPreSaved} className="bg-[#F8FBFE] border border-[#D4E3ED] rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-[#121942]">
                    Create a New Pre-Saved Activity Template
                  </h3>
                  <p className="text-xs text-gray-500">
                    Save routines your child loves so you can reuse them any day with a single tap.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="text-xs text-gray-500 hover:text-gray-800 underline"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Activity Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Trampoline Jumping, Puppet Chat"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs text-[#121942] focus:border-[#121942] focus:ring-2 focus:ring-[#AEE1F9] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as TaskCategory)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-[#121942] focus:border-[#121942] focus:ring-2 focus:ring-[#AEE1F9] outline-none"
                  >
                    <option value="Sensory">Sensory</option>
                    <option value="Daily Routine">Daily Routine</option>
                    <option value="Creative and Expression">Creative and Expression</option>
                    <option value="Social">Social</option>
                    <option value="Outdoor">Outdoor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Suggested Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:30 AM"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs text-[#121942] focus:border-[#121942] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                    Sensory or Developmental Benefit
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Proprioceptive Input, Fine Motor"
                    value={newBenefit}
                    onChange={(e) => setNewBenefit(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs text-[#121942] focus:border-[#121942] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1">
                  Description & Visual Cues
                </label>
                <textarea
                  rows={2}
                  placeholder="Notes for caregiver, visual symbols to show, soothing background cues..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 text-xs text-[#121942] focus:border-[#121942] outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#121942] text-white text-xs font-bold hover:bg-[#1a235c] transition-all shadow-xs"
                >
                  Save & Add to Selection
                </button>
              </div>
            </form>
          ) : (
            /* ================= LIST OF PRE-SAVED ACTIVITIES ================= */
            <>
              {/* List stats & selection control */}
              <div className="flex items-center justify-between text-xs text-gray-500 pb-1">
                <span>
                  Showing <strong className="text-[#121942]">{filteredActivities.length}</strong> pre-saved activities
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={selectAllFiltered}
                    className="text-xs text-[#121942] font-semibold hover:underline"
                  >
                    Select all filtered
                  </button>
                  {selectedActivityIds.size > 0 && (
                    <>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={clearSelection}
                        className="text-xs text-[#F26B3B] font-semibold hover:underline"
                      >
                        Clear selection ({selectedActivityIds.size})
                      </button>
                    </>
                  )}
                </div>
              </div>

              {filteredActivities.length === 0 ? (
                <div className="text-center py-12 px-4 bg-gray-50 rounded-2xl border border-gray-200">
                  <BookmarkCheck className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-[#121942]">No matching pre-saved activities</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                    Try adjusting your search query or category filters, or save a custom activity.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setSelectedTimeOfDay('All');
                    }}
                    className="mt-3 px-3.5 py-1.5 rounded-xl bg-white border border-gray-300 text-xs font-semibold text-[#121942] hover:bg-gray-100"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredActivities.map((activity) => {
                    const isSelected = selectedActivityIds.has(activity.id);
                    const alreadyScheduled = isAlreadyScheduled(activity.title);
                    const cfg = categoryConfig[activity.category] || categoryConfig['Sensory'];
                    const IconComponent = cfg.icon;
                    const currentTime = customTimes[activity.id] || activity.suggestedTime;

                    return (
                      <div
                        key={activity.id}
                        onClick={() => toggleSelect(activity.id)}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#F0F8FF] border-[#121942] shadow-sm ring-1 ring-[#121942]'
                            : 'bg-white border-[#D4E3ED] hover:border-[#AEE1F9] hover:shadow-2xs'
                        }`}
                      >
                        <div>
                          {/* Card Top: Checkbox, Category, Time Slot */}
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                                isSelected 
                                  ? 'bg-[#121942] border-[#121942] text-white' 
                                  : 'border-gray-300 bg-white group-hover:border-[#121942]'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>

                              <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.badgeBg} ${cfg.textCol}`}>
                                <IconComponent className="w-3 h-3" />
                                {activity.category}
                              </span>

                              {activity.timeOfDay && (
                                <span className="text-[10px] text-gray-500 font-medium">
                                  {activity.timeOfDay}
                                </span>
                              )}
                            </div>

                            {/* Scheduled state indicator */}
                            {alreadyScheduled && (
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                On schedule
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h4 className={`text-sm font-bold tracking-tight mb-1 ${
                            isSelected ? 'text-[#121942]' : 'text-gray-900'
                          }`}>
                            {activity.title}
                          </h4>

                          {/* Description */}
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-2.5">
                            {activity.description}
                          </p>
                        </div>

                        {/* Card Bottom: Sensory benefit chip, time, and quick action */}
                        <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold text-[#121942] bg-[#E7F6FE] px-2 py-0.5 rounded-md">
                              ✨ {activity.sensoryBenefit}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                            {/* Inline time picker / display */}
                            <div className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                              <Clock className="w-3 h-3 text-gray-400" />
                              <input
                                type="text"
                                value={currentTime}
                                onChange={(e) => setCustomTimes({ ...customTimes, [activity.id]: e.target.value })}
                                className="w-16 bg-transparent text-xs font-semibold text-[#121942] focus:outline-none focus:bg-white rounded"
                                title="Adjust scheduled time"
                              />
                            </div>

                            {/* Quick single-add button */}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickAddSingle(activity);
                              }}
                              className="px-2.5 py-1 rounded-lg bg-[#E7F6FE] hover:bg-[#D4E3ED] text-[#121942] text-[11px] font-bold transition-all shrink-0 active:scale-95"
                              title="Add directly to today's schedule"
                            >
                              + Add
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Actions Bar */}
        <div className="p-3.5 sm:p-5 border-t border-[#E7F6FE] bg-white flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs sm:text-sm font-extrabold ${
              selectedActivityIds.size > 0 ? 'text-[#121942]' : 'text-gray-400'
            }`}>
              {selectedActivityIds.size} {selectedActivityIds.size === 1 ? 'activity' : 'activities'} selected
            </span>

            {selectedActivityIds.size > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                className="text-xs text-gray-400 hover:text-red-500 font-medium ml-1"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAddSelected}
              disabled={selectedActivityIds.size === 0}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md ${
                selectedActivityIds.size > 0
                  ? 'bg-[#F26B3B] hover:bg-[#e05a2a] text-white active:scale-95 cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              }`}
            >
              <BookmarkCheck className="w-4 h-4" />
              <span>
                {selectedActivityIds.size > 0
                  ? `Add ${selectedActivityIds.size} ${selectedActivityIds.size === 1 ? 'Activity' : 'Activities'} for the Day`
                  : 'Select Activities to Add'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
