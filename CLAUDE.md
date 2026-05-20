# yt-not-interested

Chrome MV3 extension that overlays two top-right buttons (Watched, Not interested) on every YouTube video thumbnail. Both buttons drive YouTube's native per-video menu. No local state.

See [README.md](README.md) for the user-facing pitch.

## Tech stack

- Manifest V3, content-script-only (no popup, no background, no settings page)
- Plain JavaScript with JSDoc types and `// @ts-check` (no TypeScript build step)
- No runtime dependencies. Dev only: `@types/chrome`, ESLint, Vitest, Playwright, web-ext, chrome-webstore-upload-cli
- One content script, one scoped CSS file, three icon sizes

## Layout

- `manifest.json`: MV3 manifest, zero permissions, `content_scripts` only
- `content.js`: thumbnail injection, button behavior, menu automation
- `styles.css`: scoped `.ytni-*` classes (no global selectors)
- `icons/`: 16/48/128 PNG placeholders (real designed icons TBD before publish)
- `package.json`: dev scripts and toolchain pins

## Commands

- `npm run lint`: ESLint + `web-ext lint`
- `npm test`: Vitest unit tests
- `npm run smoke`: one Playwright smoke test against real YouTube
- `npm run dev`: `web-ext run`, opens a clean-profile Chrome with this extension loaded
- `npm run build`: produces the zip for store upload
- `npm run release:patch`: bump patch version + build

## Conventions

- **Default branch is `master`.** Push to `origin master`, not `main`.
- **No local state**: no `chrome.storage`, no `localStorage`, no in-memory `Set` for tracking failed attempts. The mark goes to YouTube; YouTube does the rest. Per-DOM-element disabled state on individual buttons is fine (lost on thumbnail re-render).

## Architecture invariants

- **Watched button is a 3-stage flow**: (A) click "Not interested", (B) wait for `ytd-dismissal-follow-up-renderer`, tick "I've already watched the video", submit; (C) on Stage B timeout, click Undo on the notification toast to revert Stage A, then disable the button on that DOM element only.
- **Watched surface filter**: the Watched button renders only on Home (`location.pathname === "/"`) and Watch pages (`location.pathname.startsWith("/watch")`). Not Interested renders everywhere.
- **Top-right corner placement** for both buttons. Always visible (no hover-reveal).
- **Menu-item matching is layered**: ARIA -> multilingual visible-text regex -> SVG `<path d>` substring matching. Text uses `String.prototype.includes`, not equality.
- **SPA navigation**: listen for the `yt-navigate-finish` event on `document`; do not use `chrome.webNavigation.onHistoryStateUpdated` (would require a service worker).
- **Thumbnail injection**: single debounced `MutationObserver` on `document.body` with `{ childList: true, subtree: true }`; do not set `attributes: true`. Polling with `setInterval` is rejected.

## Status

v0 scaffolding. `content.js` is a stub with TODO markers documenting the planned implementation. The real injection, menu automation, and Tell-us-why flow land in a follow-up commit.
