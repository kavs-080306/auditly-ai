## Technical Design Patterns
- **Separation of Concerns:** Audit logic is isolated in `src/utils/auditLogic.ts` to allow for unit testing without the UI.
- **State Management:** Using React `useState` and `useMemo` to ensure real-time calculation updates with 0ms latency.
- **Scalability:** The pricing object is designed to be easily swappable with an API call in the future.
