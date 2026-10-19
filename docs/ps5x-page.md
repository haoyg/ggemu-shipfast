# PS5X SEO page — maintenance guide

The `/en/ps5-games-on-xbox-series-x` page targets the keyword
`ps5 games running on xbox hardware`. It explains the experimental **PS5X** project
(a port of the open-source KytyPS5 emulator to Xbox Series X in Developer Mode) without
overstating what it can do.

- **Route:** `src/routes/en.ps5-games-on-xbox-series-x.tsx`
- **Game data:** `src/data/ps5x-games.json`
- **Update log:** `src/data/ps5x-updates.json`
- **Types, parsing, FAQ, filters:** `src/lib/ps5x.ts`
- **Search/filter UI:** `src/components/ps5x-game-checker.tsx`
- **Sitemap entry:** `englishCollectionPaths` in `src/routes/sitemap[.]xml.ts`

## Updating game compatibility data

Edit `src/data/ps5x-games.json`. Each record is:

```json
{
  "id": "quake-ii",
  "name": "Quake II",
  "status": "reported-running",
  "fps": "~25-45 FPS (reported dips below 20)",
  "testDate": "2026-09-08",
  "sourceUrl": "https://www.engadget.com/2286776/...",
  "sourceType": "media-report",
  "notes": "Booted in the developer's Dev Mode demo..."
}
```

Fields:

- `id` — unique slug, kebab-case.
- `name` — display name.
- `status` — one of `verified-running`, `reported-running`, `boots-only`, `not-working`, `not-tested`.
- `fps` — a short string, or `null` when the source does not state a figure.
- `testDate` — ISO date of the source/demo, `YYYY-MM-DD`.
- `sourceUrl` — a direct link to the evidence.
- `sourceType` — `developer-demo`, `independent-test`, or `media-report`.
- `notes` — honest context; keep "Not independently re-tested" where that is true.

### Status rules

- **`verified-running` requires independent, reproducible confirmation.** Do not use it for
  the developer's own demonstrations or a single media report.
- **`reported-running`** — the title runs in a reported demo but is not independently verified.
- **`boots-only`** — boots but is not playable (for example Astro Bot at ~10 FPS).
- **`not-working` / `not-tested`** — self-explanatory.

Run `npm test` after editing: `-ps5x-page.test.ts` asserts no record is marked
`verified-running` and that every record has the required fields.

## Updating the update log

Edit `src/data/ps5x-updates.json`. Records are `{ date, title, summary, sourceUrl? }`,
newest first. Keep each entry tied to a real, dated source.

## Editing page copy or FAQ

- Section copy lives in `src/routes/en.ps5-games-on-xbox-series-x.tsx`.
- FAQ questions and answers live in the `ps5xFaqs` array in `src/lib/ps5x.ts`.
- After changing copy, update the `ps5xCheckedAt` constant in `src/lib/ps5x.ts`
  (also used as JSON-LD `dateModified` and the "Sources reviewed" line).

## Pending verification / known caveats

- No public PS5X build exists; the page intentionally has no install tutorial.
- All compatibility statuses trace to the developer's demo and media reports — none are
  independently verified. Do not upgrade any to `verified-running` without new evidence.
- The hero is an original SVG illustration (no licensed console photography). If product
  photos are wanted, source a licensed asset before replacing it.
- Confirm the current Xbox Developer Mode activation process/fee before asserting specifics;
  the page currently keeps that detail general.

## Local checks

```bash
npm run typecheck
npm test
npm run build
```
