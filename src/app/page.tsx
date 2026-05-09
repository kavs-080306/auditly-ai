"use client";
import { useState, useMemo } from 'react';
import { runAudit, PRICING_INR } from '../utils/auditLogic';

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);
  
  const tools = [
    { id: 'CHATGPT_PLUS', name: 'ChatGPT Plus', price: PRICING_INR.CHATGPT_PLUS },
    { id: 'CLAUDE_PRO', name: 'Claude Pro', price: PRICING_INR.CLAUDE_PRO },
    { id: 'CURSOR_PRO', name: 'Cursor Pro', price: PRICING_INR.CURSOR_PRO },
    { id: 'COPILOT', name: 'GitHub Copilot', price: PRICING_INR.COPILOT }
  ];

  const audit = useMemo(() => runAudit(selected), [selected]);
  
  const savingsPercentage = audit.currentMonthlySpend > 0 
    ? (audit.monthlySavings / audit.currentMonthlySpend) * 100 
    : 0;

  // New: Function to handle social sharing (GTM Strategy)
  const handleShare = () => {
    const text = `I just saved ₹${audit.monthlySavings.toLocaleString('en-IN')} on my AI stack with Auditly AI! 🛡️ Check your 2026 subscriptions:`;
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider animate-pulse">Live: May 2026</span>
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight transition-all hover:text-blue-600 cursor-default">
              Auditly<span className="text-blue-600">.ai</span>
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Stop the subscription leak. Optimize your Indian AI stack.</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Market Rate</p>
            <p className="text-sm font-bold text-slate-700">1 USD = ₹84.00</p>
          </div>
        </header>

        <div className="grid gap-8">
          {/* Selector Card */}
          <section className="bg-white shadow-sm rounded-2xl p-6 border border-slate-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Current Subscriptions
            </h2>
            <div className="grid gap-3">
              {tools.map(tool => (
                <label 
                  key={tool.id} 
                  className={`flex items-center justify-between p-4 border-2 rounded-xl transition-all cursor-pointer ${
                    selected.includes(tool.id) 
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm' 
                      : 'border-slate-100 hover:border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                      onChange={(e) => {
                        if (e.target.checked) setSelected([...selected, tool.id]);
                        else setSelected(selected.filter(s => s !== tool.id));
                      }}
                    />
                    <span className="font-semibold text-slate-700">{tool.name}</span>
                  </div>
                  <span className="text-slate-500 font-mono text-sm">₹{tool.price.toLocaleString('en-IN')}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Results Section */}
          {selected.length > 0 ? (
            <section className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-600/20 rounded-full blur-3xl"></div>
                
                <div className="flex justify-between items-end mb-6 relative z-10">
                  <div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1 text-blue-400">Monthly Savings</p>
                    <h2 className="text-5xl font-black text-white">₹{audit.monthlySavings.toLocaleString('en-IN')}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Annual Impact</p>
                    <p className="text-2xl font-bold text-green-400">₹{(audit.monthlySavings * 12).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Savings Meter */}
                <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                    <span className="text-slate-400">Efficiency Score</span>
                    <span className={savingsPercentage > 0 ? "text-green-400" : "text-slate-400"}>
                      {savingsPercentage.toFixed(0)}% Leak Identified
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
                    <div 
                      className="bg-blue-500 h-full transition-all duration-1000 ease-out" 
                      style={{ width: `${Math.max(savingsPercentage, 2)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Day 3 GTM Feature: Share Button */}
                <button 
                  onClick={handleShare}
                  className="mt-8 w-full py-4 bg-white text-slate-900 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg active:scale-[0.98]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  Share My Savings
                </button>
              </div>

              {/* Suggestions List */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                   <span className="text-xl">🛡️</span> Action Plan
                </h3>
                <div className="space-y-3">
                  {audit.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100 transition-hover hover:border-blue-200">
                      <div className="mt-1 bg-blue-100 p-1 rounded-full">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <p className="text-slate-700 text-sm font-medium leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day 3 B2B Teaser (Entrepreneurial Thinking) */}
              <div className="p-6 bg-blue-600 rounded-2xl text-white text-center shadow-lg shadow-blue-200">
                 <h4 className="font-bold mb-1">Scaling for Teams?</h4>
                 <p className="text-blue-100 text-xs mb-4">Identify "Zombie Seats" for your startup and save ₹10k+/mo.</p>
                 <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-50 transition-colors">
                   Waitlist Team Audit
                 </button>
              </div>
            </section>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl bg-white/50">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔍</div>
              <p className="text-slate-500 font-bold">Select your current tools to generate a report.</p>
              <p className="text-slate-400 text-sm mt-1">Based on India Region 2026 Price Index</p>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center space-y-2 pb-10">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
            Auditly AI • Milestone 3 • May 2026
          </p>
          <div className="flex justify-center gap-4 text-[10px] font-bold text-blue-500 uppercase">
             <span>Economics.md ✓</span>
             <span>GTM.md ✓</span>
             <span>Architecture.md ✓</span>
          </div>
        </footer>
      </div>
    </main>
  );
}
