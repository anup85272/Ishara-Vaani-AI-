
import React, { useState } from 'react';
import { Search, Info, Play, RefreshCw, Send, Loader2 } from 'lucide-react';
import { getReverseTranslationInstructions } from '../geminiService';

const Translation: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [instruction, setInstruction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const result = await getReverseTranslationInstructions(inputText);
      setInstruction(result || "No instructions found.");
    } catch (error) {
      setInstruction("Error fetching sign instructions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center space-y-2">
        <h2 className="text-4xl font-extrabold text-slate-900">Reverse Translation</h2>
        <p className="text-slate-500 text-lg">Type a phrase and learn how to sign it in ISL.</p>
      </header>

      <div className="glass p-4 rounded-[2.5rem] shadow-xl flex items-center gap-4 border-2 border-white focus-within:border-indigo-400 transition-all">
        <div className="pl-4 text-slate-400">
          <Search size={24} />
        </div>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleTranslate()}
          placeholder="e.g., 'How are you?' or 'Help me'" 
          className="flex-1 bg-transparent border-none focus:outline-none text-xl text-slate-800 placeholder:text-slate-300 py-4"
        />
        <button 
          onClick={handleTranslate}
          disabled={loading || !inputText}
          className="bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-3xl disabled:opacity-50 transition-all"
        >
          {loading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-[2.5rem] flex flex-col justify-center items-center aspect-square bg-slate-900 border-none group relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 bg-[url('https://picsum.photos/seed/signs/800/800')] bg-cover bg-center grayscale group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 to-transparent"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30 cursor-pointer hover:scale-110 transition-transform">
              <Play size={32} fill="white" className="text-white ml-1" />
            </div>
            <h4 className="text-white text-xl font-bold">Preview ISL Animation</h4>
            <p className="text-indigo-200 mt-2">Visualizing: {inputText || "..."}</p>
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-none flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Info size={20} />
            </div>
            <h4 className="font-bold text-slate-800">Signing Instructions</h4>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
            {loading ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                <div className="h-4 bg-slate-100 rounded w-2/3"></div>
              </div>
            ) : instruction ? (
              <div className="prose prose-slate text-slate-600 whitespace-pre-wrap leading-relaxed italic">
                {instruction}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                <RefreshCw size={48} className="mb-4 opacity-20" />
                <p>Results will appear here once you search.</p>
              </div>
            )}
          </div>

          {instruction && (
            <button className="mt-8 text-indigo-600 font-bold hover:underline flex items-center gap-2">
              Save to Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Translation;
