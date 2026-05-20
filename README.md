# yt-not-interested

A Chrome extension that adds two quick-action buttons to every YouTube video thumbnail:

- **Not interested**: clicks YouTube's native "Not interested" menu item.
- **Watched**: tells YouTube you have already seen this video via the "Tell us why" follow-up dialog. If the dialog cannot be reached, the action is reverted via the Undo notification toast so YouTube does not get the wrong recommendation signal.

Both buttons drive YouTube's own recommendation system. The extension stores no local state.

## Status

v0 scaffolding. Not yet implemented. Not yet published to the Chrome Web Store.

## Install (development)

Once implemented:

1. Clone this repo.
2. `npm install` to fetch dev dependencies.
3. Open `chrome://extensions`, enable Developer Mode, click "Load unpacked", select this directory.

## Tech

- Manifest V3, content-script-only (no popup, no background, no settings)
- Plain JavaScript with JSDoc types (no TypeScript build step)
- Vitest for unit tests, Playwright for one smoke test against real YouTube
- ESLint flat config, web-ext for build and lint

## License

GPL-3.0. See [LICENSE](LICENSE).
