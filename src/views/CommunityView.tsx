import React, { useState } from 'react';
import { CommunityBlog } from '../types';
import { 
  Users, 
  Search, 
  Heart, 
  Bookmark, 
  Share2, 
  MessageSquare, 
  Sparkles, 
  PenSquare, 
  Clock, 
  ArrowLeft,
  X,
  Send,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CommunityViewProps {
  blogs: CommunityBlog[];
  onToggleLike: (blogId: string) => void;
  onToggleSave: (blogId: string) => void;
  onAddBlog: (newBlog: Omit<CommunityBlog, 'id' | 'likes' | 'commentsCount'>) => void;
  activeBlogId?: string | null;
  onSelectBlog: (blog: CommunityBlog | null) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  blogs,
  onToggleLike,
  onToggleSave,
  onAddBlog,
  activeBlogId,
  onSelectBlog
}) => {
  const [activeTab, setActiveTab] = useState<'popular' | 'category' | 'saved' | 'my-blogs'>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New Blog Form
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityBlog['category']>('Milestones');
  const [newContent, setNewContent] = useState('');

  const currentReadingBlog = blogs.find(b => b.id === activeBlogId) || null;

  const filteredBlogs = blogs.filter((blog) => {
    if (activeTab === 'saved' && !blog.isSaved) return false;
    if (activeTab === 'my-blogs' && !blog.author.includes('Shweta Patel')) return false;
    if (selectedCategory !== 'All' && blog.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        blog.title.toLowerCase().includes(q) ||
        blog.author.toLowerCase().includes(q) ||
        blog.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddBlog({
      title: newTitle.trim(),
      author: 'Shweta Patel',
      authorRole: 'Mom of Vihaan (10 yrs)',
      postedDate: 'Just now',
      readTime: '2 min read',
      snippet: newContent.slice(0, 110) + '...',
      content: newContent.trim(),
      category: newCategory,
      badge: 'Caregiver Voice'
    });

    setNewTitle('');
    setNewContent('');
    setIsWriteModalOpen(false);

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#AEE1F9', '#F26B3B', '#121942']
      });
    } catch {
      // ignore
    }
  };

  // Full Screen Reading Mode
  if (currentReadingBlog) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-150">
        <button
          onClick={() => onSelectBlog(null)}
          className="inline-flex items-center gap-2 text-xs font-bold text-[#121942] hover:text-[#F26B3B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Community Stories</span>
        </button>

        <article className="bg-white border border-[#D4E3ED] rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-3 pb-6 border-b border-[#E7F6FE]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] bg-[#FFF4EE] px-3 py-1 rounded-full">
                {currentReadingBlog.category}
              </span>
              <span className="text-xs text-gray-400">• {currentReadingBlog.readTime}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#121942] tracking-tight leading-tight">
              {currentReadingBlog.title}
            </h1>

            {/* Author info */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <img
                  src={currentReadingBlog.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                  alt={currentReadingBlog.author}
                  className="w-11 h-11 rounded-full object-cover border border-[#D4E3ED]"
                />
                <div>
                  <div className="font-extrabold text-sm text-[#121942]">
                    By {currentReadingBlog.author}
                  </div>
                  <div className="text-xs text-gray-500">{currentReadingBlog.authorRole} • Posted on {currentReadingBlog.postedDate}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleSave(currentReadingBlog.id)}
                  className={`p-2.5 rounded-full border transition-all ${
                    currentReadingBlog.isSaved
                      ? 'bg-[#121942] text-white border-[#121942]'
                      : 'border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                  title="Bookmark story"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert("Story link copied to clipboard for sharing!")}
                  className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:border-gray-300 transition-all"
                  title="Share story"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-[#121942] text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal">
            {currentReadingBlog.content}
          </div>

          {/* Footer Reactions from Case Study */}
          <div className="pt-6 border-t border-[#E7F6FE] flex items-center justify-between">
            <button
              onClick={() => onToggleLike(currentReadingBlog.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                currentReadingBlog.hasLiked
                  ? 'bg-rose-50 text-rose-600 border border-rose-200'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${currentReadingBlog.hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{currentReadingBlog.likes} Caregivers touched</span>
            </button>

            <span className="text-xs text-gray-400">
              {currentReadingBlog.commentsCount} comments from parents
            </span>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F6FE] text-[#121942] text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5 text-[#F26B3B]" />
            Peer Support & Caregiver Voices
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121942] tracking-tight">
            Anura Community Stories
          </h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            Real experiences, breakthrough milestones, and quiet victories written by parents who walk the same journey.
          </p>
        </div>

        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#121942] hover:bg-[#1a235c] text-white text-xs font-bold shadow-md transition-all active:scale-95 shrink-0"
        >
          <PenSquare className="w-4 h-4 text-[#AEE1F9]" />
          <span>Share Your Story</span>
        </button>
      </div>

      {/* Search and Tabs (From Case Study: Most Popular, By Category, Saved, My Blogs) */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Tabs */}
          <div className="flex items-center gap-1.5 bg-gray-100/70 p-1.5 rounded-2xl w-full sm:w-auto overflow-x-auto">
            {[
              { id: 'popular', label: 'Most Popular' },
              { id: 'category', label: 'By Category' },
              { id: 'saved', label: 'Saved' },
              { id: 'my-blogs', label: 'My Blogs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white text-[#121942] shadow-xs'
                    : 'text-gray-500 hover:text-[#121942]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar from Case Study */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search stories, topics, authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#D4E3ED] text-xs text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
            />
          </div>
        </div>

        {/* Category Filter Chips when activeTab is category */}
        {activeTab === 'category' && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {['All', 'Milestones', 'Parent Healing', 'Sensory Tips', 'Everyday Life'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#121942] text-white'
                    : 'bg-white border border-[#D4E3ED] text-gray-600 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Story Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            onClick={() => onSelectBlog(blog)}
            className="bg-white border border-[#D4E3ED] hover:border-[#121942] rounded-3xl p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Badge & Read Time */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] bg-[#FFF4EE] px-2.5 py-0.5 rounded-full">
                  {blog.category}
                </span>
                <span className="text-[11px] text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {blog.readTime}
                </span>
              </div>

              {/* Title & Snippet */}
              <h3 className="font-extrabold text-[#121942] text-lg group-hover:text-[#F26B3B] transition-colors mb-2 leading-snug">
                {blog.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-4">
                "{blog.snippet}"
              </p>
            </div>

            {/* Author & Reactions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={blog.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                  alt={blog.author}
                  className="w-7 h-7 rounded-full object-cover shrink-0"
                />
                <div className="truncate">
                  <span className="font-bold text-[#121942] block truncate">{blog.author}</span>
                  <span className="text-[10px] text-gray-400 block truncate">{blog.authorRole}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike(blog.id);
                  }}
                  className={`flex items-center gap-1 text-[11px] font-bold ${
                    blog.hasLiked ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${blog.hasLiked ? 'fill-rose-500' : ''}`} />
                  <span>{blog.likes}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(blog.id);
                  }}
                  className={`p-1 text-gray-400 hover:text-[#121942] ${
                    blog.isSaved ? 'text-[#121942]' : ''
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${blog.isSaved ? 'fill-[#121942]' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Share Your Story Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7F6FE] mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B]">
                  Community Post
                </span>
                <h3 className="text-xl font-extrabold text-[#121942]">Share Your Story</h3>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 rounded-full text-gray-400 hover:text-[#121942]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
                >
                  <option value="Milestones">Milestones</option>
                  <option value="Parent Healing">Parent Healing</option>
                  <option value="Sensory Tips">Sensory Tips</option>
                  <option value="Everyday Life">Everyday Life</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
                  Story Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. The day he finally called my name..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#121942] uppercase tracking-wider mb-1.5">
                  Your Story
                </label>
                <textarea
                  rows={6}
                  placeholder="Write your honest reflection. Other parents find courage in your vulnerability..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs sm:text-sm text-[#121942] focus:outline-none focus:ring-2 focus:ring-[#AEE1F9] resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E7F6FE]">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#121942] text-white text-xs font-bold hover:bg-[#1a235c] shadow-sm transition-all"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
