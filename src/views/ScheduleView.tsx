import React, { useState } from 'react';
import { DailyTask, TaskCategory, PreSavedActivity } from '../types';
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Clock, 
  Filter, 
  Sparkles, 
  Sun, 
  Compass, 
  HeartHandshake, 
  Palette, 
  Check, 
  X,
  ChevronLeft,
  ChevronRight,
  Flame,
  BookmarkCheck,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AddActivitiesModal } from '../components/AddActivitiesModal';
import { INITIAL_PRE_SAVED_ACTIVITIES } from '../data/mockData';

interface ScheduleViewProps {
  tasks: DailyTask[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (newTask: Omit<DailyTask, 'id'>) => void;
  onAddMultipleTasks?: (newTasks: Omit<DailyTask, 'id'>[]) => void;
  onDeleteTask: (taskId: string) => void;
  preSavedActivities?: PreSavedActivity[];
  onSaveNewPreSavedActivity?: (activity: PreSavedActivity) => void;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({
  tasks,
  onToggleTask,
  onAddTask,
  onAddMultipleTasks,
  onDeleteTask,
  preSavedActivities = INITIAL_PRE_SAVED_ACTIVITIES,
  onSaveNewPreSavedActivity
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(4); // 04 Dec Thursday
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isAddActivitiesModalOpen, setIsAddActivitiesModalOpen] = useState<boolean>(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TaskCategory>('Daily Routine');
  const [newTime, setNewTime] = useState('09:00 AM');
  const [newDescription, setNewDescription] = useState('');

  // Date strip from case study: Mon 04 to Tue 12 Dec
  const dateStrip = [
    { dayNum: 4, dayName: 'Thu', dateStr: '04 Dec', isToday: true },
    { dayNum: 5, dayName: 'Fri', dateStr: '05 Dec', isToday: false },
    { dayNum: 6, dayName: 'Sat', dateStr: '06 Dec', isToday: false },
    { dayNum: 7, dayName: 'Sun', dateStr: '07 Dec', isToday: false },
    { dayNum: 8, dayName: 'Mon', dateStr: '08 Dec', isToday: false },
    { dayNum: 9, dayName: 'Tue', dateStr: '09 Dec', isToday: false },
    { dayNum: 10, dayName: 'Wed', dateStr: '10 Dec', isToday: false },
    { dayNum: 11, dayName: 'Thu', dateStr: '11 Dec', isToday: false },
    { dayNum: 12, dayName: 'Fri', dateStr: '12 Dec', isToday: false },
  ];

  const currentDateStr = selectedDay < 10 ? `2025-12-0${selectedDay}` : `2025-12-${selectedDay}`;
  const selectedDateObj = dateStrip.find(d => d.dayNum === selectedDay) || dateStrip[0];

  // Tasks for the selected day
  const dayTasks = tasks.filter(task => {
    if (!task.dateStr) return true;
    return task.dateStr === currentDateStr;
  });

  const filteredTasks = dayTasks.filter(task => {
    if (selectedCategory !== 'All' && task.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  // Activity categories with live counts for current day:
  const categories: { name: TaskCategory; count: number; icon: React.FC<{ className?: string }>; color: string }[] = [
    { name: 'Daily Routine', count: dayTasks.filter(t => t.category === 'Daily Routine').length, icon: Sun, color: 'bg-amber-100 text-amber-800' },
    { name: 'Creative and Expression', count: dayTasks.filter(t => t.category === 'Creative and Expression').length, icon: Palette, color: 'bg-purple-100 text-purple-800' },
    { name: 'Sensory', count: dayTasks.filter(t => t.category === 'Sensory').length, icon: Sparkles, color: 'bg-sky-100 text-sky-800' },
    { name: 'Social', count: dayTasks.filter(t => t.category === 'Social').length, icon: HeartHandshake, color: 'bg-rose-100 text-rose-800' },
    { name: 'Outdoor', count: dayTasks.filter(t => t.category === 'Outdoor').length, icon: Compass, color: 'bg-emerald-100 text-emerald-800' },
  ];

  const completedCount = filteredTasks.filter(t => t.completed).length;

  const handleToggle = (id: string, currentlyCompleted: boolean) => {
    onToggleTask(id);
    if (!currentlyCompleted) {
      try {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#AEE1F9', '#F26B3B', '#121942']
        });
      } catch {
        // ignore
      }
    }
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      category: newCategory,
      time: newTime,
      completed: false,
      dateStr: currentDateStr,
      description: newDescription.trim() || undefined
    });

    setNewTitle('');
    setNewDescription('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F6FE] text-[#121942] text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#F26B3B]" />
            Visual Routines & Autistic Sensory Balance
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121942] tracking-tight">
            Visual Schedule & Daily Routines
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            Visual schedules replace ambiguous vocal instructions with clear pictorial steps, reducing anxiety and meltdowns.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          {/* USER REQUESTED: Button called "Add Activities" */}
          <button
            id="btn-add-activities"
            onClick={() => setIsAddActivitiesModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-[#F26B3B] hover:bg-[#e05a2a] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
            title="Add pre-saved routine and sensory activities for the day"
          >
            <BookmarkCheck className="w-4 h-4 text-white" />
            <span>Add Activities</span>
          </button>

          <button
            id="btn-create-task"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-[#121942] hover:bg-[#1a235c] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 text-[#AEE1F9]" />
            <span>Create Custom Task</span>
          </button>
        </div>
      </div>

      {/* Date Ribbon from Case Study */}
      <div className="bg-white border border-[#D4E3ED] rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3 text-xs text-gray-500 px-1">
          <span className="font-bold text-[#121942]">December 2025</span>
          <span className="text-emerald-700 font-medium bg-emerald-50 px-2.5 py-0.5 rounded-full">
            {completedCount} of {filteredTasks.length} tasks completed today
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {dateStrip.map((item) => {
            const isSelected = selectedDay === item.dayNum;
            return (
              <button
                key={item.dayNum}
                onClick={() => setSelectedDay(item.dayNum)}
                className={`flex flex-col items-center justify-center min-w-[62px] sm:min-w-[72px] py-3 px-2 rounded-2xl transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-[#121942] text-white border-[#121942] shadow-md scale-105'
                    : 'bg-white hover:bg-[#F8FBFE] text-[#121942] border-[#E7F6FE]'
                }`}
              >
                <span className={`text-[11px] font-semibold uppercase ${
                  isSelected ? 'text-[#AEE1F9]' : 'text-gray-400'
                }`}>
                  {item.dayName}
                </span>
                <span className={`text-lg sm:text-xl font-extrabold mt-0.5 ${
                  isSelected ? 'text-white' : 'text-[#121942]'
                }`}>
                  {item.dayNum < 10 ? `0${item.dayNum}` : item.dayNum}
                </span>
                {item.isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full mt-1 ${
                    isSelected ? 'bg-[#F26B3B]' : 'bg-[#121942]'
                  }`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Pills ("Choose Activity" from Case Study) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Choose Activity Domain
          </h2>
          <span className="text-xs text-[#F26B3B] font-semibold">
            {selectedCategory === 'All' ? 'All Activities' : selectedCategory}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`p-3.5 rounded-2xl border text-left transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#121942] text-white border-[#121942] shadow-sm'
                : 'bg-white hover:bg-[#F8FBFE] text-[#121942] border-[#D4E3ED]'
            }`}
          >
            <div className="text-xs font-bold">All Activities</div>
            <div className={`text-[11px] mt-0.5 ${selectedCategory === 'All' ? 'text-[#AEE1F9]' : 'text-gray-400'}`}>
              {tasks.length} tasks scheduled
            </div>
          </button>

          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`p-3.5 rounded-2xl border text-left transition-all group ${
                  isSelected
                    ? 'bg-[#121942] text-white border-[#121942] shadow-sm'
                    : 'bg-white hover:bg-[#F8FBFE] text-[#121942] border-[#D4E3ED]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#AEE1F9]' : 'text-gray-400'}`} />
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {cat.count}
                  </span>
                </div>
                <div className="text-xs font-bold truncate">{cat.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Task List Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-[#121942]">
              Tasks for {selectedDateObj.dayName}, {selectedDateObj.dateStr}
            </h2>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E7F6FE] text-[#121942]">
              {dayTasks.length} {dayTasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddActivitiesModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F26B3B] text-xs font-bold transition-all border border-orange-200 shadow-2xs"
              title="Add from pre-saved activities"
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              <span>Add Activities</span>
            </button>
            <span className="text-xs text-gray-500 hidden md:inline">
              Tap a card to mark completed
            </span>
          </div>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="bg-white border border-[#D4E3ED] rounded-3xl p-8 sm:p-12 text-center">
            <Sparkles className="w-10 h-10 text-[#AEE1F9] mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#121942]">
              {dayTasks.length === 0 
                ? `No tasks scheduled for ${selectedDateObj.dayName}, ${selectedDateObj.dateStr}`
                : `No tasks found in the ${selectedCategory} category`}
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Choose from pre-saved sensory routines or create a custom task to give your child predictable visual guidance.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3 flex-wrap">
              <button
                onClick={() => setIsAddActivitiesModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F26B3B] hover:bg-[#e05a2a] text-white text-xs font-bold shadow-xs transition-all active:scale-95"
              >
                <BookmarkCheck className="w-4 h-4" />
                <span>Add Activities from Library</span>
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-[#121942] hover:bg-[#1a235c] text-white text-xs font-bold transition-all"
              >
                Create Custom Task
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleToggle(task.id, task.completed)}
                className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer relative group flex items-start gap-4 ${
                  task.completed
                    ? 'bg-[#F8FBFE] border-gray-200 opacity-80'
                    : 'bg-white border-[#D4E3ED] hover:border-[#121942] hover:shadow-xs'
                }`}
              >
                {/* Completion Checkmark */}
                <div className="pt-0.5 shrink-0">
                  {task.completed ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300 group-hover:text-[#F26B3B]" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-gray-400" />
                      {task.time}
                    </span>
                    <span className="text-[10px] font-bold text-[#121942] bg-[#E7F6FE] px-2 py-0.5 rounded-full">
                      {task.category}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold tracking-tight mb-1 truncate ${
                    task.completed ? 'line-through text-gray-400' : 'text-[#121942]'
                  }`}>
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Delete action */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTask(task.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-all shrink-0"
                  title="Remove task"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Create New Task from Case Study */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-md bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7F6FE] mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B]">
                  Visual Schedule
                </span>
                <h3 className="text-lg font-extrabold text-[#121942]">Create New Task</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-[#121942]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as TaskCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
                >
                  <option value="Daily Routine">Daily Routine</option>
                  <option value="Creative and Expression">Creative and Expression</option>
                  <option value="Sensory">Sensory</option>
                  <option value="Social">Social</option>
                  <option value="Outdoor">Outdoor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
                  Task Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Morning Walk, Water the Plants, Lego Time"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
                  Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 08:30 AM or 04:00 PM"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
                  Description & Visual Cues
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Show picture of red watering can; gentle reminder 5 mins before."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7F6FE]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#121942] text-white text-xs font-bold hover:bg-[#1a235c] shadow-sm transition-all"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pre-Saved Activities Selection Modal */}
      <AddActivitiesModal
        isOpen={isAddActivitiesModalOpen}
        onClose={() => setIsAddActivitiesModalOpen(false)}
        selectedDateStr={currentDateStr}
        existingTasks={dayTasks}
        preSavedActivities={preSavedActivities}
        onAddMultipleTasks={(newTasks) => {
          if (onAddMultipleTasks) {
            onAddMultipleTasks(newTasks);
          } else {
            newTasks.forEach(t => onAddTask(t));
          }
        }}
        onSaveNewPreSavedActivity={onSaveNewPreSavedActivity}
      />
    </div>
  );
};
