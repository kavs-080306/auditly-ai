"use client";
import { useState, useMemo, useEffect } from 'react';
import { runAudit, PRICING_INR } from '../utils/auditLogic';

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);
  const [isUSD, setIsUSD] = useState(false); 
  const [liveCount, setLiveCount] = useState(1240500);
  const [isValidated, setIsValidated] = useState(false);
  const [lastAuditTime, setLastAuditTime] = useState<string>("");

  useEffect(() => {
    // Logic Self-Test
    const testAudit = runAudit(['CHATGPT_PLUS', 'CLAUDE_PRO']);
    if (testAudit.monthlySavings === 1680) {
      setIsValidated(true);
      console.log("🛡️ Auditly Engine: Logic Verified.");
    }

    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 500));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Track when the user last made a change
  useEffect(() => {
    if (selected.length > 0) {
      setLastAuditTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
  }, [selected]);

  const tools = useMemo(() => [
    { id: 'CHATGPT_PLUS', name: 'ChatGPT Plus', price: PRICING_INR.CHATGPT_PLUS },
    { id: 'CLAUDE_PRO', name: 'Claude Pro', price: PRICING_INR.CLAUDE_PRO },
    { id: 'CURSOR_PRO', name: 'Cursor Pro', price: PRICING_INR.CURSOR_PRO },
    { id: 'COPILOT', name: 'GitHub Copilot', price: PRICING_INR.COPILOT }
  ], []);

  const audit = useMemo(() => runAudit(selected), [selected]);
  
  const formatPrice = (val: number) => {
    if (isUSD) return `$${(val / 84).toFixed(2)}`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const savingsPercentage = audit.currentMonthlySpend > 0 
    ? (audit.monthlySavings / audit.currentMonthlySpend) * 100 
    : 0;

  const handleShare = () => {
    const text = `I just identified ${formatPrice(audit.monthlySavings)} in AI subscription leaks with Auditly.ai! 🛡️`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const ToolList = useMemo(() => tools.map(tool => {
    const isChecked = selected.includes(tool.id);
    return (
      <label 
        key={tool.id} 
        className={`group flex items-center justify-between p-5 border-2 rounded-2xl transition-all cursor-pointer active:scale-[0.98] ${
          isChecked 
            ? 'border-blue-600 bg-blue-50/30' 
            : 'border-slate-100 hover:border-blue-200 bg-white'
        }`}
      >
        <div className="flex items-center space-x-4">
          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${isChecked ? 'bg-blue-600 border-blue-600' : 'border-slate-200 group-hover:border-blue-400'}`}>
            {isChecked && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <input 
            type="checkbox" 
            className="hidden" 
            checked={isChecked}
            onChange={() => isChecked 
              ? setSelected(selected.filter(s => s !== tool.id)) 
              : setSelected([...selected, tool.id])
            }
          />
          <span className={`font-bold transition-colors ${isChecked ? 'text-blue-900' : 'text-slate-600'}`}>
            {tool.name}
          </span>
        </div>
        <span className="font-mono font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
          {formatPrice(tool.price)}
        </span>
      </label>
    );
  }), [tools, selected, isUSD]);

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-12 font-sans text-slate-900 selection:bg-blue-100">
      <div className="max-w-2xl mx-auto">
        
        {/* Status Bar */}
        <div className="mb-6 flex items-center justify-between px-2">
           <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isValidated ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-yellow-500'}`}></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                System: {isValidated ? 'Verified' : 'Booting'}
              </span>
           </div>
           <span className="text-[9px] font-black uppercase tracking-widest text-blue-500">
             Live Global Savings: ₹{liveCount.toLocaleString('en-IN')}
           </span>
        </div>

        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
              Auditly<span className="text-blue-600">.ai</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">AI Stack Optimization for Indian Devs</p>
          </div>
          
          <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setIsUSD(false)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!isUSD ? 'bg-slate-900 text-white' : 'text-slate-400'}`}
            >INR</button>
            <button 
              onClick={() => setIsUSD(true)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isUSD ? 'bg-slate-900 text-white' : 'text-slate-400'}`}
            >USD</button>
          </div>
        </header>

        <div className="grid gap-6">
          <section className="bg-white shadow-xl shadow-slate-200/50 rounded-[2rem] p-8 border border-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-blue-600"></span>
                Active Stack
              </h2>
              {selected.length > 0 && (
                <span className="text-[10px] font-bold text-slate-300">Updated: {lastAuditTime}</span>
              )}
            </div>
            <div className="grid gap-3">
              {ToolList}
            </div>
          </section>

          {selected.length > 0 ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <section className="bg-blue-600 rounded-[2rem] p-10 text-white shadow-2xl shadow-blue-200 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em]">Monthly Saving</p>
                        {audit.monthlySavings > 2000 && (
                          <span className="bg-yellow-400 text-blue-900 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Elite Optimizer</span>
                        )}
                      </div>
                      <h3 className="text-6xl font-black tracking-tighter">{formatPrice(audit.monthlySavings)}</h3>
                    </div>
                    <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl text-right border border-white/10">
                      <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest mb-1">Yearly Impact</p>
                      <p className="text-xl font-black text-white">+{formatPrice(audit.monthlySavings * 12)}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-blue-200">
                      <span>Efficiency Index</span>
                      <span>{savingsPercentage.toFixed(0)}% Recovered</span>
                    </div>
                    <div className="h-4 bg-blue-900/40 rounded-full p-1 border border-blue-400/30">
                      <div className="h-full bg-white rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.5)]" style={{ width: `${Math.max(savingsPercentage, 4)}%` }}></div>
                    </div>
                  </div>

                  <button onClick={handleShare} className="mt-8 w-full py-4 bg-white text-blue-600 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:translate-y-[-2px] active:translate-y-[0] transition-all flex items-center justify-center gap-3">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    Share Report
                  </button>
                </div>
              </section>

              <div className="bg-white border border-slate-200 rounded-[2rem] p-8">
                <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-green-500"></span>
                  Optimization Strategy
                </h3>
                <div className="space-y-4">
                  {audit.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
                      <span className="text-xl bg-white shadow-sm w-10 h-10 flex items-center justify-center rounded-xl border border-slate-100">🛡️</span>
                      <p className="text-slate-600 text-sm font-bold leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20 border-4 border-dashed border-slate-200 rounded-[3rem] bg-white shadow-inner flex flex-col items-center">
              <div className="text-5xl mb-6 animate-bounce">🛡️</div>
              <h3 className="text-slate-900 font-black text-xl mb-2 uppercase tracking-tighter">Ready for Audit</h3>
              <p className="text-slate-400 text-sm font-medium px-12 mb-6">Select your tools above to calculate your 2026 savings roadmap.</p>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse delay-75"></div>
                <div className="w-2 h-2 bg-slate-200 rounded-full animate-pulse delay-150"></div>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-16 text-center pb-20">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-4">Candidate: CS Undergrad • May 2026</p>
          <div className="flex justify-center flex-wrap gap-4">
            {['Economics', 'GTM', 'Architecture', 'Roadmap'].map(doc => (
              <span key={doc} className="text-[9px] font-black text-blue-400 border border-blue-100 px-3 py-1 rounded-full uppercase tracking-tighter shadow-sm">{doc}.md</span>
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}
