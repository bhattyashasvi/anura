import React, { useState } from 'react';
import { ChildProfile, MedicalReport } from '../types';
import { 
  UserCircle2, 
  FileText, 
  Download, 
  Sparkles, 
  AlertCircle, 
  Heart, 
  Eye, 
  TrendingUp, 
  ShieldCheck, 
  Calendar, 
  Hospital, 
  X,
  Plus,
  Brain,
  Smile,
  Volume2,
  CheckCircle2
} from 'lucide-react';

interface ChildProfileViewProps {
  profile: ChildProfile;
  reports: MedicalReport[];
  onUpdateProfile?: (updated: ChildProfile) => void;
  onClose?: () => void;
}

export const ChildProfileView: React.FC<ChildProfileViewProps> = ({
  profile,
  reports,
  onUpdateProfile,
  onClose
}) => {
  const [selectedReport, setSelectedReport] = useState<MedicalReport | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'milestones'>('overview');

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Child Card from Case Study */}
      <div className="bg-white border border-[#D4E3ED] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E7F6FE]">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#121942] to-[#1c2763] text-white flex items-center justify-center font-extrabold text-3xl shadow-md border-2 border-white">
                V
              </div>
              <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-[#AEE1F9] text-[#121942] text-[10px] font-extrabold border border-white">
                {profile.gender}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#121942] tracking-tight">
                  {profile.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E7F6FE] text-[#121942]">
                  {profile.relation}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Autism Spectrum Profile • Level 1 Support • Monitored since age 4
              </p>

              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-sky-50 text-sky-800 border border-sky-100">
                  <Brain className="w-3.5 h-3.5 text-sky-600" />
                  Communication: {profile.communicationStyle}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-xl bg-orange-50 text-orange-800 border border-orange-100">
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-600" />
                  Support Need: {profile.supportNeed}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Caregiver Action & Close */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#FFF4EE] border border-[#F26B3B]/20 text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] block">
                Caregiver In Charge
              </span>
              <span className="text-xs font-bold text-[#121942]">Shweta Patel (Mother)</span>
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-3 rounded-2xl border border-[#D4E3ED] hover:border-[#121942] hover:bg-[#E7F6FE]/50 text-gray-500 hover:text-[#121942] transition-colors"
                title="Close Profile"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Vital Metrics Grid (From Case Study screens: Age, Height, Weight, Communication, Support, Trigger) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-6">
          <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-[#E7F6FE]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Age
            </span>
            <div className="text-lg font-extrabold text-[#121942]">{profile.age} Years</div>
            <span className="text-[10px] text-gray-500">Born Dec 2015</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-[#E7F6FE]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Height
            </span>
            <div className="text-lg font-extrabold text-[#121942]">{profile.height}</div>
            <span className="text-[10px] text-emerald-600 font-medium">+3 cm this year</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-[#E7F6FE]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Weight
            </span>
            <div className="text-lg font-extrabold text-[#121942]">{profile.weight}</div>
            <span className="text-[10px] text-gray-500">Healthy range</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-[#E7F6FE]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Style
            </span>
            <div className="text-base font-extrabold text-[#121942] truncate">{profile.communicationStyle}</div>
            <span className="text-[10px] text-gray-500">Phrasal gestures</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-[#E7F6FE]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Support Need
            </span>
            <div className="text-base font-extrabold text-[#F26B3B]">{profile.supportNeed}</div>
            <span className="text-[10px] text-gray-500">Visual assistance</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FFF4EE] border border-[#F26B3B]/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] block mb-1">
              Primary Triggers
            </span>
            <div className="text-xs font-bold text-[#121942] truncate">
              {profile.triggers.slice(0, 2).join(', ')}
            </div>
            <span className="text-[10px] text-[#F26B3B] font-medium">+{profile.triggers.length - 2} more</span>
          </div>
        </div>
      </div>

      {/* Tabs: Overview, Personal Reports, Milestones */}
      <div className="flex items-center gap-2 border-b border-[#E7F6FE] pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-[#121942] text-white shadow-xs'
              : 'text-gray-500 hover:text-[#121942]'
          }`}
        >
          Sensory & Triggers Overview
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'reports'
              ? 'bg-[#121942] text-white shadow-xs'
              : 'text-gray-500 hover:text-[#121942]'
          }`}
        >
          <span>Personal Medical Reports</span>
          <span className="w-5 h-5 rounded-full bg-[#AEE1F9] text-[#121942] text-[10px] flex items-center justify-center font-bold">
            {reports.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('milestones')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'milestones'
              ? 'bg-[#121942] text-white shadow-xs'
              : 'text-gray-500 hover:text-[#121942]'
          }`}
        >
          Milestone Growth Track
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Triggers Card from Case Study */}
          <div className="bg-white border border-[#D4E3ED] rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#121942] flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#F26B3B]" />
                Known Sensory Triggers & Responses
              </h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              When these conditions arise, gentle de-escalation protocols and the "Quiet Corner" should be initiated immediately.
            </p>

            <div className="space-y-3">
              {[
                { trigger: 'Hungry', action: 'Offer visual food options; prompt with finger-pointing rather than verbal grilling.' },
                { trigger: 'Loud Sound (Appliances / Horns)', action: 'Use soft-padded noise-reducing headphones and relocate to balcony.' },
                { trigger: 'Bright Fluorescent Light', action: 'Dim overhead lights; turn on the warm fairy-light lamp.' },
                { trigger: 'Crowded Places & Rush', action: 'Hold both hands, practice 3 counted deep exhales, step into quiet aisle.' },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FBFE] border border-[#E7F6FE] flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded-lg bg-[#FFF4EE] text-[#F26B3B] text-[11px] font-bold shrink-0 mt-0.5">
                    {item.trigger}
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Calming Interventions */}
          <div className="bg-white border border-[#D4E3ED] rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#121942] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#AEE1F9]" />
                Natural Strengths & Passions
              </h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Autism is not something to fix; it is a spectrum of unique ways of processing beauty and order in the world.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {profile.strengths.map((st, i) => (
                <div key={i} className="p-3 rounded-2xl bg-[#E7F6FE]/70 border border-[#AEE1F9]/50 text-xs font-bold text-[#121942] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{st}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                Favorite Regulating Interests
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((it, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                    🧩 {it}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Personal Medical Reports (From Case Study: Neuro Specialist Dr. Aakash Mehta & Sanjeev Hospital) */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-[#121942]">Personal Clinical Reports</h2>
              <p className="text-xs text-gray-500">Verified doctor evaluations and developmental assessments.</p>
            </div>
            <button
              onClick={() => alert("Upload feature: Securely add new pediatric or neuro report PDF.")}
              className="px-4 py-2 rounded-xl bg-[#121942] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:bg-[#1a235c]"
            >
              <Plus className="w-3.5 h-3.5 text-[#AEE1F9]" />
              <span>Upload Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="p-5 rounded-3xl bg-white border border-[#D4E3ED] hover:border-[#121942] transition-all cursor-pointer shadow-2xs group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] bg-[#FFF4EE] px-2.5 py-0.5 rounded-full">
                      {report.date}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">{report.fileSize}</span>
                  </div>

                  <h3 className="font-extrabold text-[#121942] text-base group-hover:text-[#F26B3B] transition-colors mb-1">
                    {report.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
                    <Hospital className="w-3.5 h-3.5 text-[#121942]" />
                    <span className="font-semibold text-[#121942]">{report.doctorName}</span>
                    <span>•</span>
                    <span className="text-gray-500">{report.hospital}</span>
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed bg-[#F8FBFE] p-3 rounded-2xl border border-gray-100 mb-4">
                    "{report.summary}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs font-semibold">
                  <span className="text-[#121942] flex items-center gap-1 group-hover:underline">
                    <Eye className="w-3.5 h-3.5 text-[#F26B3B]" />
                    View Detailed Summary
                  </span>
                  <span className="text-gray-400 flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Milestones & Progress Tracking */}
      {activeTab === 'milestones' && (
        <div className="bg-white border border-[#D4E3ED] rounded-3xl p-6 sm:p-7 shadow-xs space-y-6">
          <div>
            <h2 className="text-lg font-extrabold text-[#121942] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              Longitudinal Growth & Behavioral Milestones
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Measured by weekly therapist evaluations and daily Anura routine completion data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
              <span className="text-[10px] font-bold text-emerald-800 uppercase block mb-1">
                Sustained Eye Contact
              </span>
              <div className="text-2xl font-black text-emerald-900">8.4 sec</div>
              <p className="text-xs text-emerald-700 mt-1">Up from 2.1 sec at diagnosis (+300%)</p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-200">
              <span className="text-[10px] font-bold text-sky-800 uppercase block mb-1">
                Meltdown Frequency
              </span>
              <div className="text-2xl font-black text-sky-900">1x / week</div>
              <p className="text-xs text-sky-700 mt-1">Down from 4-5x weekly with visual schedules</p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200">
              <span className="text-[10px] font-bold text-purple-800 uppercase block mb-1">
                Visual Schedule Adherence
              </span>
              <div className="text-2xl font-black text-purple-900">88%</div>
              <p className="text-xs text-purple-700 mt-1">Self-checks 12+ daily activities</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <span className="text-[10px] font-bold text-amber-800 uppercase block mb-1">
                Spontaneous Verbal Words
              </span>
              <div className="text-2xl font-black text-amber-900">35+ Words</div>
              <p className="text-xs text-amber-700 mt-1">Includes "Mamma", "Apple", "Water", "Play"</p>
            </div>
          </div>
        </div>
      )}

      {/* Report Viewer Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121942]/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="relative w-full max-w-xl bg-white border border-[#D4E3ED] rounded-3xl shadow-2xl p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-[#E7F6FE] mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F26B3B] bg-[#FFF4EE] px-2.5 py-0.5 rounded-full">
                  Clinical Document
                </span>
                <h3 className="text-xl font-extrabold text-[#121942] mt-1.5">
                  {selectedReport.title}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {selectedReport.doctorName} • {selectedReport.hospital} ({selectedReport.date})
                </p>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-full text-gray-400 hover:text-[#121942]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#F8FBFE] border border-[#E7F6FE]">
                <h4 className="font-bold text-[#121942] uppercase text-[11px] mb-1">Clinical Findings & Assessment</h4>
                <p>{selectedReport.summary}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-[#121942] uppercase text-[11px]">Recommended Home Protocols:</h4>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-600">
                  <li>Continue structured visual checklists before any change of activity.</li>
                  <li>Incorporate 15 minutes of sensory tactile play (clay or sandbox) post-school.</li>
                  <li>Maintain evening low-stimulation lighting 45 minutes prior to sleep.</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-5 mt-4 border-t border-[#E7F6FE]">
              <button
                onClick={() => alert(`Downloading verified document: ${selectedReport.fileName}`)}
                className="px-5 py-2.5 rounded-xl bg-[#121942] text-white text-xs font-bold hover:bg-[#1a235c] shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-4 h-4 text-[#AEE1F9]" />
                <span>Download Report PDF ({selectedReport.fileSize})</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
