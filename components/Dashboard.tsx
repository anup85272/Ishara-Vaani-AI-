
import React from 'react';
import { 
  TrendingUp, 
  History, 
  Award, 
  Zap, 
  AlertCircle, 
  MessageCircle,
  PhoneCall,
  GraduationCap
} from 'lucide-react';

const StatsCard: React.FC<{ title: string; value: string; icon: React.ReactNode; color: string }> = ({ 
  title, value, icon, color 
}) => (
  <div className="glass p-6 rounded-3xl hover:shadow-xl transition-all duration-300 group">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-500 text-sm font-medium">{title}</p>
        <h3 className="text-3xl font-bold mt-1 text-slate-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-2xl ${color} text-white group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
    </div>
    <div className="mt-4 flex items-center text-emerald-600 text-sm font-semibold">
      <TrendingUp size={16} className="mr-1" />
      <span>+12.5% from last week</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const quickActions = [
    { title: "Emergency", desc: "SOS Sign sequences", icon: <AlertCircle />, color: "bg-rose-500" },
    { title: "Common Greetings", desc: "Hello, Thank you, etc.", icon: <MessageCircle />, color: "bg-sky-500" },
    { title: "Medical", desc: "Doctor assistance signs", icon: <PhoneCall />, color: "bg-teal-500" },
    { title: "Quick Chat", desc: "Translate everyday phrases", icon: <Zap />, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Namaste!</h2>
        <p className="text-slate-500 mt-2 text-lg">Your bridge to communication is ready. Let's start signing.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Total Signs Learned" 
          value="154" 
          icon={<Award size={24} />} 
          color="bg-indigo-600" 
        />
        <StatsCard 
          title="Translation Sessions" 
          value="42" 
          icon={<History size={24} />} 
          color="bg-teal-600" 
        />
        <StatsCard 
          title="Avg. Accuracy" 
          value="94.8%" 
          icon={<TrendingUp size={24} />} 
          color="bg-rose-600" 
        />
      </div>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-slate-800">Quick Actions</h3>
          <button className="text-indigo-600 font-semibold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, idx) => (
            <button 
              key={idx}
              className="glass p-6 rounded-3xl flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all border-none group"
            >
              <div className={`${action.color} text-white p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <h4 className="font-bold text-slate-800 text-lg">{action.title}</h4>
              <p className="text-slate-500 text-sm mt-1">{action.desc}</p>
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        <div className="glass p-8 rounded-[2rem]">
          <h3 className="text-xl font-bold mb-6 text-slate-800">Learning Progress</h3>
          <div className="space-y-6">
            {[
              { label: 'Alphabets', progress: 100, color: 'bg-emerald-500' },
              { label: 'Greetings', progress: 75, color: 'bg-indigo-500' },
              { label: 'Emergency Phrases', progress: 40, color: 'bg-rose-500' }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-700 font-medium">{item.label}</span>
                  <span className="text-slate-500 font-bold">{item.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div className={`${item.color} h-full transition-all duration-1000`} style={{ width: `${item.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass p-8 rounded-[2rem] flex flex-col justify-center items-center text-center bg-indigo-900 text-white border-none relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-700 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500 rounded-full -ml-16 -mb-16 opacity-30 blur-2xl"></div>
          
          <GraduationCap size={64} className="mb-6 text-teal-300" />
          <h3 className="text-2xl font-bold mb-3">Ready to Level Up?</h3>
          <p className="text-indigo-100 mb-6 max-w-xs">Complete the advanced grammar quiz to unlock the "Master Signer" badge.</p>
          <button className="bg-teal-500 hover:bg-teal-400 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-teal-900/40 transition-all">
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
