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

  // useMemo optimizes performance by only recalculating when 'selected' changes
  const audit = useMemo(() => runAudit(selected), [selected]);
  
  const savingsPercentage = audit.currentMonthlySpend > 0 
    ? (audit.monthlySavings / audit.currentMonthlySpend) * 100 
    : 0;

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-2xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">Beta v1.0</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Auditly<span className="text-blue-600">.ai</span></h1>
          <p className="text-slate-500 mt-2 font-medium">Stop the subscription leak. Optimize your Indian AI stack.</p>
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
              <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Potential Monthly Savings</p>
                    <h2 className="text-5xl font-black text-green-400">₹{audit.monthlySavings.toLocaleString('en-IN')}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Annual Impact</p>
                    <p className="text-2xl font-bold text-white">₹{(audit.monthlySavings * 12).toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Savings Meter */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-tighter">
                    <span>Efficiency Meter</span>
                    <span className={savingsPercentage > 0 ? "text-green-400" : "text-slate-400"}>
                      {savingsPercentage.toFixed(0)}% Recoverable
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-green-500 h-full transition-all duration-700 ease-out" 
                      style={{ width: `${Math.max(savingsPercentage, 5)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Suggestions List */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Recommended Actions</h3>
                <div className="space-y-3">
                  {audit.suggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="mt-1 bg-green-100 p-1 rounded-full">
                        <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-2xl">
              <p className="text-slate-400 font-medium">Select your tools above to calculate your 2026 savings report.</p>
            </div>
          )}
        </div>

        <footer className="mt-12 text-center">
          <p className="text-xs text-slate-400 font-medium">
            Project for Credex Internship Review • Day 2 Submission
          </p>
        </footer>
      </div>
    </main>
  );
}
