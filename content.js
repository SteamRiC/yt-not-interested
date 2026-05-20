// @ts-check
/**
 * yt-not-interested content script.
 *
 * Adds two top-right overlay buttons on every YouTube video thumbnail:
 *  - Not interested: clicks YouTube's native "Not interested" menu item.
 *  - Watched: extends that flow into the Tell-us-why follow-up dialog,
 *    ticks "I've already watched the video", submits. On dialog timeout,
 *    best-efforts revert via the Undo notification toast and disables
 *    the button on that thumbnail (per-DOM-element state only; no
 *    persistent storage).
 *
 * Surface filter: the Watched button renders only on Home (`/`) and
 * Watch pages (`/watch*`). The Not Interested button renders everywhere.
 *
 * Architecture and rationale: see ../.claude/notes/yt-not-interested/
 * architecture.md (or the project notes in your idea-loop notes root).
 *
 * v0 scaffolding: this file is a stub. The full implementation lands in
 * the next session per the session-handoff sequence documented in
 * decisions.md.
 */

(() => {
  if (window.top !== window) return;
  if (!window.location.hostname.endsWith("youtube.com")) return;

  // TODO: full implementation per architecture.md
  // - MutationObserver on document.body, debounced ~100ms
  // - yt-navigate-finish listener for SPA navigation re-scan
  // - Per-thumbnail button injection at top-right of every supported card
  // - Menu-item matching: layered ARIA + multilingual text regex + SVG path substring
  // - Tell-us-why dialog flow with Stage C revert via Undo toast
  // - Per-element disable on Watched failure (no Set, no chrome.storage)
})();
