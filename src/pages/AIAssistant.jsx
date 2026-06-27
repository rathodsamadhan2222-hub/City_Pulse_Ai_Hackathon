import { useState, useEffect, useRef } from 'react';
import MaterialIcon from '../components/ui/MaterialIcon';
import AIOrb from '../components/3d/AIAssistant/AIOrb';

const suggestions = [
  { icon: 'traffic', iconBg: 'bg-amber-500/10 text-amber-500', title: 'Urban Analytics', query: 'What was the peak traffic volume at Sector 7 today?' },
  { icon: 'groups', iconBg: 'bg-emerald-500/10 text-emerald-500', title: 'Citizen Reports', query: 'Summarize citizen reports over the last 24 hours.' },
  { icon: 'bolt', iconBg: 'bg-blue-500/10 text-blue-500', title: 'Energy Audit', query: 'Check energy trends for the Streetlighting initiative.' },
  { icon: 'warning', iconBg: 'bg-rose-500/10 text-rose-500', title: 'Incident Map', query: 'Show active maintenance reports within 5km.' },
];

export default function AIAssistant() {
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Cognitive Core Online. How can I assist you with city operations today?' }
  ]);
  
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setChatInput(val);
    // Pulse the 3D Orb while typing (Step 15)
    setIsTyping(val.trim().length > 0);
  };

  const handleSend = (textToSend) => {
    const queryText = textToSend || chatInput;
    if (!queryText.trim()) return;

    // 1. Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: queryText }]);
    setChatInput('');
    setIsTyping(true); // Orb pulses in "AI thinking" mode
    setIsRecording(false); // Stop recording on send

    // 2. Simulate AI brain processing
    setTimeout(() => {
      let reply = "I've processed your query. The district data flow indicates optimal parameters across the grid, with minor resource shifts in Sector 4.";
      if (queryText.toLowerCase().includes('traffic')) {
        reply = "Traffic sensor logs indicate congestion peaking at Sector 3. Recommended routing updates have been dispatched to public transit assets.";
      } else if (queryText.toLowerCase().includes('report') || queryText.toLowerCase().includes('citizen')) {
        reply = "Analysis of the last 24 hrs reports shows potholes and streetlight outages as top categories, with average response times at 18 hrs.";
      } else if (queryText.toLowerCase().includes('energy') || queryText.toLowerCase().includes('streetlighting')) {
        reply = "Smart streetlights in Sector 1 report a 14% decrease in power draw due to local ambient-dimming automation updates.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 1800);
  };

  // Toggle voice simulation
  const toggleVoiceRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      // Simulate hearing a query after 4 seconds
      setTimeout(() => {
        setIsRecording(false);
        handleSend("Show active maintenance reports within 5km.");
      }, 4000);
    } else {
      setIsRecording(false);
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col bg-[#070b19]/90 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.1),transparent)]"></div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-[var(--spacing-margin-desktop)] h-20 bg-[#070b19]/40 backdrop-blur-xl border-b border-white/5">
        <div>
          <h1 className="text-headline-sm font-black text-white">CityPulse AI Assistant</h1>
          <p className="text-label-sm text-[#94a3b8]">Real-time Cognitive Twin Interface</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#10b981]/10 text-[#10b981] px-3 py-1.5 rounded-full border border-[#10b981]/25 text-label-sm font-bold">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
            Cognitive Core Active
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-[var(--spacing-margin-desktop)] py-10 gap-8 min-h-[calc(100vh-80px)] items-stretch">
        
        {/* Left Column: Interactive 3D AI Orb (Step 15) */}
        <div className="w-full lg:w-[45%] flex flex-col justify-between glass-card p-6 border border-white/5 bg-[#0b142e]/60 rounded-3xl h-[450px] lg:h-auto min-h-[400px]">
          <div className="space-y-2">
            <h3 className="text-headline-sm font-bold text-white">Holographic Processor</h3>
            <p className="text-body-md text-[#94a3b8]">Interactive visual representation of the neural city core. The orb deforms and pulses dynamically in response to inputs.</p>
          </div>

          <div className="flex-1 flex items-center justify-center py-6">
            <AIOrb isTyping={isTyping} isRecording={isRecording} />
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-[#94a3b8]/60">
            <span>MODEL: COGNITIVE_v4.2</span>
            <span>SYNC_STATUS: 100%</span>
          </div>
        </div>

        {/* Right Column: Chat Transcript & Prompter */}
        <div className="flex-1 flex flex-col glass-card p-6 border border-white/5 bg-[#0b142e]/60 rounded-3xl h-[600px] lg:h-auto">
          {/* Chat Feed */}
          <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-[300px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div className={`p-4 rounded-2xl border text-label-md leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#06b6d4]/10 border-[#06b6d4]/30 text-white rounded-br-none'
                    : 'bg-white/5 border-white/5 text-[#e2e8f0] rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Thinking indicator */}
            {isTyping && messages[messages.length - 1]?.sender === 'user' && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#06b6d4] animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#06b6d4] animate-ping"></span>
                Processing query...
              </div>
            )}

            {/* Voice Stream active indicator (Step 16) */}
            {isRecording && (
              <div className="flex items-center gap-2 text-xs font-mono text-pink-400 animate-pulse mt-2 pl-4">
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                Voice transmission active... Speak now
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* Quick recommendations */}
          {messages.length === 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              {suggestions.map((s) => (
                <button
                  key={s.title}
                  onClick={() => handleSend(s.query)}
                  className="p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl text-left transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`p-1.5 rounded-lg ${s.iconBg} flex items-center justify-center`}>
                      <MaterialIcon icon={s.icon} className="text-sm" />
                    </div>
                    <span className="text-[11px] font-black uppercase text-white tracking-wider">{s.title}</span>
                  </div>
                  <p className="text-[11px] text-[#94a3b8] line-clamp-1">{s.query}</p>
                </button>
              ))}
            </div>
          )}

          {/* Prompt input bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="mt-6 dark-glass-panel p-2 rounded-2xl flex items-center gap-2"
          >
            {/* Microphone button for simulated voice transmission (Step 16) */}
            <button
              type="button"
              onClick={toggleVoiceRecording}
              className={`p-3 rounded-xl transition-all ${
                isRecording 
                  ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' 
                  : 'text-[#94a3b8] hover:bg-white/5 hover:text-white'
              }`}
            >
              <MaterialIcon icon="mic" className="text-lg" />
            </button>

            <input
              type="text"
              value={chatInput}
              onChange={handleInputChange}
              className="flex-1 bg-transparent border-none outline-none text-body-md text-white placeholder-[#94a3b8]/50 pl-2 py-2"
              placeholder="Ask anything about city operations..."
            />
            
            <button
              type="submit"
              className="bg-[#06b6d4] text-white w-10 h-10 rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
            >
              <MaterialIcon icon="send" filled className="text-lg" />
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
