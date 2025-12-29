
import React from 'react';
import { BookOpen, Star, Clock, Trophy, ChevronRight, Lock } from 'lucide-react';

const LearningCard: React.FC<{ 
  title: string; 
  category: string; 
  progress: number; 
  count: number; 
  locked?: boolean;
  image: string;
}> = ({ title, category, progress, count, locked, image }) => (
  <div className={`glass group relative rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl border-none ${locked ? 'opacity-60 grayscale' : ''}`}>
    <div className="h-48 overflow-hidden relative">
      <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{category}</span>
      </div>
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px]">
          <div className="bg-white/90 p-3 rounded-full shadow-lg">
            <Lock size={24} className="text-slate-800" />
          </div>
        </div>
      )}
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-1">{title}</h3>
      <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
        <BookOpen size={14} />
        <span>{count} Modules</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-400">PROGRESS</span>
          <span className="text-indigo-600">{progress}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <button 
        disabled={locked}
        className={`w-full mt-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
          locked 
            ? 'bg-slate-200 text-slate-400' 
            : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'
        }`}
      >
        {locked ? 'Unlock Level 2' : 'Continue Learning'}
        {!locked && <ChevronRight size={18} />}
      </button>
    </div>
  </div>
);

const LearningCenter: React.FC = () => {
  const categories = [
    { title: "Basic Alphabets", cat: "Basics", prog: 100, count: 26, img: "https://picsum.photos/seed/alpha/500/300" },
    { title: "Everyday Greetings", cat: "Social", prog: 65, count: 15, img: "https://picsum.photos/seed/greet/500/300" },
    { title: "Emergency Signs", cat: "Safety", prog: 10, count: 20, img: "https://picsum.photos/seed/sos/500/300" },
    { title: "Numbers & Counting", cat: "Logic", prog: 0, count: 10, img: "https://picsum.photos/seed/num/500/300", locked: true },
    { title: "Workplace Etiquette", cat: "Pro", prog: 0, count: 25, img: "https://picsum.photos/seed/work/500/300", locked: true },
    { title: "Family & Relations", cat: "Personal", prog: 0, count: 12, img: "https://picsum.photos/seed/family/500/300", locked: true },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-extrabold text-slate-900">Learning Center</h2>
          <p className="text-slate-500 text-lg mt-1">Master Indian Sign Language at your own pace.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex -space-x-3 pl-2">
                {[1,2,3].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/avatar${i}/100/100`} className="w-10 h-10 rounded-full border-2 border-white" alt="Learner" />
                ))}
            </div>
            <div className="pr-4">
                <p className="text-xs font-bold text-slate-400 leading-none">COMMUNITY</p>
                <p className="text-sm font-bold text-slate-800 leading-tight">1,240 active today</p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-3xl flex items-center gap-4 border-l-4 border-l-indigo-500">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
                <Trophy size={32} />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">Current Rank</p>
                <h4 className="text-2xl font-bold text-slate-800">Advanced Learner</h4>
            </div>
        </div>
        <div className="glass p-6 rounded-3xl flex items-center gap-4 border-l-4 border-l-amber-500">
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
                <Star size={32} />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">Reputation Points</p>
                <h4 className="text-2xl font-bold text-slate-800">2,450 XP</h4>
            </div>
        </div>
        <div className="glass p-6 rounded-3xl flex items-center gap-4 border-l-4 border-l-teal-500">
            <div className="p-4 bg-teal-50 text-teal-600 rounded-2xl">
                <Clock size={32} />
            </div>
            <div>
                <p className="text-slate-500 text-sm font-medium">Daily Streak</p>
                <h4 className="text-2xl font-bold text-slate-800">12 Days 🔥</h4>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {categories.map((cat, idx) => (
          <LearningCard 
            key={idx} 
            title={cat.title} 
            category={cat.cat} 
            progress={cat.prog} 
            count={cat.count} 
            image={cat.img}
            locked={cat.locked}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningCenter;
