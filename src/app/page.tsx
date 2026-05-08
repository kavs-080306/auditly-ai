"use client";
import { useState } from 'react';
import { runAudit } from '../utils/auditLogic'; // Adjusted path

export default function Home() {
  const [selected, setSelected] = useState<string[]>([]);
  
  const tools = [
    { id: 'CHATGPT_PLUS', name: 'ChatGPT Plus (₹1,999)' },
    { id: 'CLAUDE_PRO', name: 'Claude Pro (₹1,680)' },
    { id: 'CURSOR_PRO', name: 'Cursor Pro (₹1,680)' },
    { id: 'COPILOT', name: 'GitHub Copilot (₹840)' }
  ];

  // We check if runAudit exists to prevent crashes while you set up
  const audit = runAudit ? runAudit(selected) : { monthlySavings: 0, suggestions: [] };

  return (
    <main className="p-8 max-w-2xl mx-auto font-sans">
      <div className="border-b pb-4 mb-8">
        <h1 className="text-4xl font-extrabold text-blue-600">Auditly AI</h1>
        <p className="text-gray-500">Day 2: India-Specific AI Spend Optimization</p>
      </div>

      <section className="bg-white shadow-md rounded-lg p-6 border">
        <h2 className="text-xl font-bold mb-4">Select your active subscriptions:</h2>
        <div className="grid gap-3">
          {tools.map(tool => (
            <label key={tool.id} className="flex items-center space-x-3 p-4 border rounded-xl hover:bg-blue-50 transition-colors cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 accent-blue-600"
                onChange={(e) => {
                  if (e.target.checked) setSelected([...selected, tool.id]);
                  else setSelected(selected.filter(s => s !== tool.id));
                }}
              />
              <span className="font-medium text-gray-700">{tool.name}</span>
            </label>
          ))}
        </div>
      </section>

      {selected.length > 0 && (
        <section className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200 animate-in fade-in">
          <h2 className="text-2xl font-bold text-green-800">Potential Savings: ₹{audit.monthlySavings}</h2>
          <div className="mt-4 space-y-2">
            {audit.suggestions.map((s, i) => (
              <div key={i} className="flex items-start space-x-2">
                <span className="text-green-600 font-bold">✓</span>
                <p className="text-green-900 text-sm">{s}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
