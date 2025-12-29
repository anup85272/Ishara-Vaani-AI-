
import React, { useRef, useEffect, useState } from 'react';
import { Camera, Volume2, RotateCcw, StopCircle, PlayCircle, Loader2 } from 'lucide-react';
import { translateSignSequence, getHindiTranslation } from '../geminiService';

const Recognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [hindiText, setHindiText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [landmarksHistory, setLandmarksHistory] = useState<any[]>([]);

  // Initialize MediaPipe Hands
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const hands = new (window as any).Hands({
      locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    hands.onResults((results: any) => {
      const canvasCtx = canvasRef.current!.getContext('2d');
      if (!canvasCtx) return;

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      canvasCtx.drawImage(results.image, 0, 0, canvasRef.current!.width, canvasRef.current!.height);

      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          (window as any).drawConnectors(canvasCtx, landmarks, (window as any).HAND_CONNECTIONS, { color: '#14B8A6', lineWidth: 5 });
          (window as any).drawLandmarks(canvasCtx, landmarks, { color: '#1E3A8A', lineWidth: 2 });
          
          if (isRecording) {
            // Sample landmarks for interpretation
            setLandmarksHistory(prev => [...prev.slice(-50), landmarks]);
          }
        }
      }
      canvasCtx.restore();
    });

    const camera = new (window as any).Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current! });
      },
      width: 1280,
      height: 720
    });
    camera.start();

    return () => {
      camera.stop();
      hands.close();
    };
  }, [isRecording]);

  const handleProcessSigns = async () => {
    if (landmarksHistory.length === 0) return;
    
    setIsProcessing(true);
    setIsRecording(false);
    
    try {
      // Flatten landmarks for the API prompt
      const landmarksStr = landmarksHistory.slice(-10).map(l => 
        l.map((pt: any) => `(${pt.x.toFixed(2)},${pt.y.toFixed(2)})`).join(',')
      ).join('|');

      const result = await translateSignSequence(landmarksStr);
      setRecognizedText(result);
      
      const hindi = await getHindiTranslation(result);
      setHindiText(hindi || "");
    } catch (error) {
      console.error("Failed to recognize:", error);
      setRecognizedText("Recognition failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setLandmarksHistory([]);
    }
  };

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(recognizedText);
    window.speechSynthesis.speak(utterance);
  };

  const clearResults = () => {
    setRecognizedText("");
    setHindiText("");
    setLandmarksHistory([]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Sign-to-Text Recognition</h2>
          <p className="text-slate-500">Real-time ISL interpretation powered by IsharaVaani AI.</p>
        </div>
        <div className="flex gap-2">
            <span className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${isRecording ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                <div className={`w-2 h-2 rounded-full ${isRecording ? 'bg-rose-600' : 'bg-slate-400'}`}></div>
                {isRecording ? 'LIVE RECORDING' : 'IDLE'}
            </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative aspect-video glass rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
            <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover hidden" playsInline muted />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" width={1280} height={720} />
            
            {!isRecording && !isProcessing && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-all">
                <button 
                  onClick={() => setIsRecording(true)}
                  className="bg-white text-indigo-600 p-6 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95"
                >
                  <PlayCircle size={48} fill="currentColor" className="text-indigo-600/10" />
                </button>
              </div>
            )}

            {isProcessing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
                <Loader2 size={48} className="animate-spin text-indigo-600 mb-4" />
                <p className="text-indigo-900 font-bold text-xl">Interpreting Sign Sequence...</p>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            {isRecording ? (
              <button 
                onClick={handleProcessSigns}
                className="flex items-center gap-3 bg-rose-600 hover:bg-rose-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-rose-200 transition-all scale-105"
              >
                <StopCircle size={24} /> Stop & Translate
              </button>
            ) : (
              <button 
                onClick={() => setIsRecording(true)}
                className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all"
              >
                <Camera size={24} /> Start Recognition
              </button>
            )}
            <button 
              onClick={clearResults}
              className="flex items-center gap-3 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-8 py-4 rounded-2xl font-bold transition-all"
            >
              <RotateCcw size={24} /> Reset
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle size={24} className="text-indigo-600" />
              Translation Output
            </h3>
            
            <div className="flex-1 space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">English Translation</label>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 min-h-[100px] text-lg font-medium text-slate-800 italic">
                  {recognizedText || "Sign to start translating..."}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Hindi Translation</label>
                <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 min-h-[100px] text-lg font-medium text-indigo-900">
                  {hindiText || "..."}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button 
                disabled={!recognizedText}
                onClick={handleSpeak}
                className="w-full flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-400 disabled:bg-slate-200 disabled:cursor-not-allowed text-white px-6 py-4 rounded-2xl font-bold shadow-lg transition-all"
              >
                <Volume2 size={24} /> Text-to-Speech
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for lucide icons
const MessageCircle: React.FC<any> = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
  </svg>
);

export default Recognition;
