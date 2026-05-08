// src/utils/auditLogic.ts

export const PRICING_INR = {
  CHATGPT_PLUS: 1999,
  CHATGPT_GO: 0,      // Free in India until Dec 2026
  CLAUDE_PRO: 1680,   // $20 @ ₹84
  CURSOR_PRO: 1680,   // $20 @ ₹84
  COPILOT: 840        // $10 @ ₹84
};

interface AuditResult {
  currentMonthlySpend: number;
  recommendedMonthlySpend: number;
  monthlySavings: number;
  suggestions: string[];
}

export const runAudit = (selectedTools: string[]): AuditResult => {
  let currentSpend = 0;
  let recommendedSpend = 0;
  const suggestions: string[] = [];

  selectedTools.forEach(tool => {
    if (PRICING_INR[tool as keyof typeof PRICING_INR] !== undefined) {
      currentSpend += PRICING_INR[tool as keyof typeof PRICING_INR];
    }
  });

  // Example Logic: Cursor + Copilot overlap
  if (selectedTools.includes('CURSOR_PRO') && selectedTools.includes('COPILOT')) {
    suggestions.push("You're using Cursor and Copilot. Cursor has native AI; you can save ₹840 by dropping Copilot.");
  }

  // Example Logic: High-tier overlap
  if (selectedTools.includes('CHATGPT_PLUS') && selectedTools.includes('CLAUDE_PRO')) {
    suggestions.push("You have both ChatGPT Plus and Claude Pro. Consider using the free ChatGPT Go tier to save ₹1,999.");
  }

  let leak = 0;
  if (selectedTools.includes('CURSOR_PRO') && selectedTools.includes('COPILOT')) leak += 840;
  if (selectedTools.includes('CHATGPT_PLUS') && selectedTools.includes('CLAUDE_PRO')) leak += 1999;

  recommendedSpend = currentSpend - leak;

  return {
    currentMonthlySpend: currentSpend,
    recommendedMonthlySpend: recommendedSpend,
    monthlySavings: currentSpend - recommendedSpend,
    suggestions: suggestions.length > 0 ? suggestions : ["Stack is optimized!"]
  };
};
