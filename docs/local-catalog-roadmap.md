# POKOPIE local catalog roadmap

This file is the source of truth for the local-first game catalog. Update it in
the same commit whenever a local game is added, removed, renamed, or has its
metadata changed.

## Current target

- Baseline: 10 local games on 2026-11-11.
- Current count: 15 local games.
- Phase 2 target: 30 local games.
- Remaining work: add 15 reviewed games in three batches of 5.
- Phase 2 is complete only when the first discovery grid and related-game
  sections can be populated from local data before an upstream fallback is
  needed.

Thirty games is the next checkpoint because the default discovery grid shows
about 24 games. The extra six entries provide room for platform filtering and
related-game matching without importing a large, unreviewed catalog.

## Selection order

Prioritize a game only when it meets at least one of these conditions:

1. It already receives search impressions or clicks.
2. It is linked from an existing POKOPIE article, guide, or SEO landing page.
3. It fills a platform gap in the local catalog.
4. It has verified title, platform, year, developer, controls, and cover data.

Do not copy upstream descriptions. Write concise POKOPIE-specific summaries and
control guidance. Keep the upstream request as a runtime fallback only.

## Planned additions

### Batch 1: existing search and internal-link demand

- [x] `three-wonders-arcade-1991`
- [x] `pipi-and-bibis-other-1991`
- [x] `the-king-of-fighters-97-arcade-1997`
- [x] `super-mario-bros-nes-1985`
- [x] `battle-city-nes-1985`

### Batch 2: strong editorial coverage

- `double-dragon-ii-revenge-nes-1989`
- `crash-bandicoot-2-cortex-strikes-back-ps1-1997`
- `harry-potter-and-the-philosopher-s-stone-ps1-2001`
- `tenchu-2-birth-of-the-stealth-assassins-ps1-2000`
- `theme-hospital-dos-1997`

### Batch 3: GBA and DS discovery depth

- `pokemon-emerald-gba-2004`
- `pokemon-ruby-gba-2002`
- `pokemon-leafgreen-game-boy-advance-2004`
- `rhythm-tengoku-japan-gba-2006`
- `rhythm-heaven-nds-2008`

### Batch 4: browser-native and long-tail coverage

- `onet-master-html5`
- `space-is-key-flash-2011`
- `taiko-no-tatsujin-taiko-web-html5-2011`
- `romance-of-the-three-kingdoms-iv-dos-1994`
- `lilo-stitch-trouble-in-paradise-ps1-2002`

The order may change when current search data shows a better opportunity. Any
replacement must be recorded in the change log with a short reason.

## Required data for every local game

- Stable `url_slug` matching the existing public URL.
- Reviewed name, description, play instructions, developer, and release year.
- Platform name and normalized platform slug.
- Categories, language, player count, and device support.
- Local or POKOPIE-controlled cover URL where available.
- Search terms based on real page intent, without keyword stuffing.
- A passing detail lookup, search, platform filter, and related-game test.

## Phase 2 acceptance checks

- Local catalog contains exactly 30 reviewed games.
- Homepage first grid works when the upstream search request fails.
- Search suggestions return local matches without waiting for upstream data.
- Major platform collections surface their local entries first.
- Detail and related-game requests use local data before upstream fallback.
- `npm run check` and `npm run build` pass.
- Updated public discovery pages are submitted through IndexNow after deploy.

## Change log

| Date | Commit | Local count | Change | Verification |
| --- | --- | ---: | --- | --- |
| 2026-11-11 | `84c8364` | 10 | Added the first reviewed local catalog and local-first detail lookups. | Tests and production build passed. |
| 2026-11-11 | `479155f` | 10 | Made homepage search, collections, filters, and related games prefer local data. | 571 tests, typecheck, build, and production checks passed. |
| 2026-11-11 | `84d50e7` | 10 | Added one-click play links to the active homepage, search suggestions, and collection cards. | 571 tests, typecheck, build, deploy, and live-link checks passed. |
| 2026-11-11 | This commit | 15 | Added batch 1: three arcade titles and two NES titles with POKOPIE-authored metadata, Chinese aliases, and local cover art. | 572 tests, typecheck, and production build passed; deploy and live verification pending. |

