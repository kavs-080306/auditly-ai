\## Day 1: 2026-05-07

\*\*Status:\*\* Initial Setup \& Interview Preparation (Currency: INR)



\### Task Summary

\- Initialized Git and scaffolded \*\*Auditly AI\*\*.

\- Set up currency formatting to support \*\*Rupees (₹)\*\* to cater to the local developer ecosystem.

\- Identified 3 personas for tomorrow's interviews: a Bangalore-based freelancer, a student, and a tech lead at a local SaaS startup.



\### Ambiguity \& Decisions

\- \*\*Decision:\*\* I will display all savings in \*\*INR (₹)\*\*. While vendor billing is often in USD, showing the impact in Rupees makes the "pain" of overspending more relatable to the local user.

\- \*\*Assumption:\*\* I will use a fixed exchange rate of \*\*1 USD = 84 INR\*\* for the calculation engine to maintain consistency, as documented in `ECONOMICS.md`.



\### Hypothesis to Test

I suspect that many Indian developers are paying for "Individual" Pro tiers out of their own pockets even when working for companies, leading to a massive lack of centralized "Team" savings.



\### Technical Goal

Targeting a Lighthouse score of 85+. The app must be lightweight enough to perform well on average Indian broadband/4G speeds.

## Day 2: 2026-05-08
**Status:** Core Logic & Interactive Dashboard Implementation

### 1. User Interview Insights (Manual Validation)
I conducted three targeted interviews to validate the "Subscription Drift" hypothesis:
- **Interview 1 (Freelancer):** Currently pays for ChatGPT Plus (₹1,999) and Claude Pro (₹1,680). Uses Claude for 90% of coding but keeps ChatGPT for voice mode. Identified a potential saving of ₹1,999/mo by switching to the free ChatGPT Go tier.
- **Interview 2 (Startup Dev):** Company pays for 5 Cursor seats, but 2 developers still use VS Code with Copilot. Identified a "Zombie Seat" leak of ₹6,720/mo.
- **Interview 3 (Student):** Confirmed that the ₹1,999/mo price point is the primary barrier. The existence of the "Free until Dec 2026" ChatGPT Go tier in India is a major market shift.

### 2. Technical Milestones
- **Audit Engine:** Developed `src/utils/auditLogic.ts` using TypeScript. Implemented redundancy checks (e.g., Cursor vs. Copilot).
- **UI Dashboard:** Built an interactive React component in `src/app/page.tsx` allowing users to select tools and see real-time savings in **INR (₹)**.
- **Architecture:** Updated `ARCHITECTURE.md` to reflect the data flow between the UI state and the logic engine.

### 3. Critical Decisions
- **Decision:** Used a fixed exchange rate of **1 USD = ₹84** for consistency, adding a 2% buffer for international transaction fees common in India.
- **Decision:** Prioritized "Actionable Suggestions" over just showing a total—users need to know *which* tool to cancel.

