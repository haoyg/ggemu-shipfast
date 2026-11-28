# Bing noindex audit — 2026-11-26

Scope: the 30 URLs reported by Bing as important pages using a robots noindex directive.

- Keep all 18 `/play` routes `noindex, nofollow`. They are focused player shells whose canonical discovery page is the corresponding game detail route.
- Six detail routes were already indexable in production when reviewed. Bing was showing an earlier crawl state.
- Add reviewed, locale-specific descriptions for the remaining six detail routes and allow indexing only in the reviewed locale.
- Do not change the default policy for unreviewed or untranslated game pages.

Newly reviewed detail routes:

- Japanese: `mother-2-deluxe-snes-1994`
- Simplified Chinese: `mahjong-chao-ji-man-guan-2-arcade-2002`
- Simplified Chinese: `saiyuuki-world-nes-1991`
- Simplified Chinese: `the-legend-of-the-condor-heroes-ps1-2000`
- Simplified Chinese: `warriors-of-fate-ii-arcade-1992`
- Simplified Chinese: `warriors-of-fate-ii-sanjiansheng-arcade-1993`

Acceptance criteria:

- Each reviewed detail route is present in the sitemap for its reviewed locale.
- Each reviewed detail route renders without a `noindex` meta tag in that locale.
- The corresponding `/play` route continues to send `X-Robots-Tag: noindex, nofollow`.
