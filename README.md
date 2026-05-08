# Auditly.ai 🛡️

## Description
**Auditly AI** is a financial intelligence tool built for the 2026 AI-native workforce. 

As companies and freelancers rapidly adopt multiple AI tools (LLMs, IDEs, and Agents), "Subscription Drift" has become a significant financial leak. Auditly AI performs a deep audit of a user's or team's AI stack to:

* **Identify Redundancies:** Surfaces cases where a user pays for multiple tools with overlapping capabilities (e.g., paying for both ChatGPT Plus and Claude Pro).
* **Optimize Seat Distribution:** Flags "Zombie Seats" in Team tiers—users who are being paid for but have 0 active usage.
* **Localized Economic Insights:** Provides real-time savings calculations in **INR (₹)**, helping Indian startups and developers understand their true burn rate.

Built with **Next.js** and **TypeScript**, Auditly AI prioritizes performance (Lighthouse 85+) and data-driven decision-making.

---

## 🚀 Day 2 Build Status: [Functional MVP]
The core engine and interactive dashboard are now operational for the India region.

### 🛠️ Key Features (Implemented)
- **Redundancy Engine:** Custom logic in `src/utils/auditLogic.ts` to detect stack overlaps.
- **Dynamic Dashboard:** A high-fidelity UI in `src/app/page.tsx` for real-time spend visualization.
- **Annual Impact Projection:** Translates monthly waste into yearly "Runway Extension" figures.
- **2026 Price Index:** Pre-configured with updated Indian rates (e.g., ₹1,999 ChatGPT Plus, ₹0 ChatGPT Go).

## 💻 Technical Setup

1. **Clone the repo:**
   ```bash
   git clone [https://github.com/YourUsername/auditly-ai.git](https://github.com/YourUsername/auditly-ai.git)
