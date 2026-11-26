# Bing description audit — 2026-11-26

Scope: the 50 URLs exported by the user. Compare existing November 18–19 fixes before changing descriptions.

- Expanded 12 affected URLs: four Chinese game pages, four Traditional Chinese utility/collection pages, Korean home and two platform pages, and Japanese NES. The shared Korean platform copy also improves other platform collections.
- Preserve existing substantial descriptions; 150–160 characters is a writing target, not proof of indexing or a universal minimum for Chinese text.
- Preserve intentional noindex pages and existing canonical redirects.
- Network timeouts are recorded as unverified, never as missing metadata.
- Verification: typecheck, 153 focused tests, all 588 tests (68 files), and production build passed. Node 26 full-suite execution used `NODE_OPTIONS=--no-experimental-webstorage` so jsdom owns browser storage; the default runtime failed unrelated storage tests.

Re-run with Python 3 and curl:

```sh
python scripts/audit-bing-descriptions.py docs/bing-failing-urls-2026-11-26.csv audit.json
```

| URL | Live description characters before deployment | Review |
| --- | ---: | --- |
| https://pokopie.com/zh-CN | 90 | Preserve previous description |
| https://pokopie.com/zh-CN/arcade-games | 72 | Preserve previous description |
| https://pokopie.com/zh-CN/games/murdoku-html5-2026 | 94 | Preserve previous description |
| https://pokopie.com/zh-CN/games/gals-panic-arcade | 67 | Expanded description |
| https://pokopie.com/zh-CN/live | 68 | Preserve previous description |
| https://pokopie.com/zh-CN/arcade-games/page/5 | 108 | Preserve previous description |
| https://pokopie.com/zh-CN/nes-games | 91 | Preserve previous description |
| https://pokopie.com/zh-CN/play-my-rom | 81 | Preserve previous description |
| https://pokopie.com/zh-TW/play-my-rom | — | Expanded description; live metadata unverified (request timed out) |
| https://pokopie.com/zh-CN/games/initial-d-ps1-1998 | 52 | Expanded description |
| https://pokopie.com/zh-TW/ps1-games | 95 | Preserve previous description |
| https://pokopie.com/zh-CN/games/roadster-rush-html5-2020 | 72 | Preserve previous description |
| https://pokopie.com/zh-CN/snes-games | 91 | Preserve previous description |
| https://pokopie.com/zh-CN/n64-games | 94 | Preserve previous description |
| https://pokopie.com/zh-CN/games/romance-of-the-three-kingdoms-iv-dos-1994 | 70 | Preserve previous description |
| https://pokopie.com/zh-CN/games/super-mario-bros-nes-1985 | 97 | Preserve previous description |
| https://pokopie.com/zh-CN/games/theme-hospital-dos-1997 | 81 | Preserve previous description |
| https://pokopie.com/zh-CN/games/pokemon-emerald-gba-2004 | 88 | Preserve previous description |
| https://pokopie.com/zh-CN/games/king-of-gladiator-arcade-2002 | 79 | Preserve previous description |
| https://pokopie.com/zh-CN/games/paperboy-n64-1999 | — | Expanded description; live metadata unverified (request timed out) |
| https://pokopie.com/zh-CN/games/contra-nes-1988 | 86 | Preserve previous description |
| https://pokopie.com/zh-CN/games/the-king-of-fighters-97-arcade-1997 | 98 | Preserve previous description |
| https://pokopie.com/zh-CN/games/spin-master-arcade-1993 | 82 | Preserve previous description |
| https://pokopie.com/zh-CN/games/contra-gender-swap-nes-1988 | 72 | Preserve previous description |
| https://pokopie.com/it/live | 153 | Preserve previous description |
| https://pokopie.com/zh-TW | 79 | Preserve previous description |
| https://pokopie.com/ja/nes-games | 95 | Expanded description |
| https://pokopie.com/zh-CN/games/parasite-eve-ps1-1998 | 76 | Preserve previous description |
| https://pokopie.com/zh-TW/blog | 24 | Expanded description |
| https://pokopie.com/zh-CN/games/international-superstar-soccer-pro-ps1-1997 | 90 | Preserve previous description |
| https://pokopie.com/es/blog/free-online-nes-classic-games | 154 | Preserve previous description |
| https://pokopie.com/zh-CN/games/geometry-dash-advance-gba-2025 | 87 | Preserve previous description |
| https://pokopie.com/ko | 78 | Expanded description |
| https://pokopie.com/zh-CN/games/super-mario-bros-the-lost-levels-enhanced-snes-1993 | 93 | Preserve previous description |
| https://pokopie.com/zh-CN/nes-games/page/2 | 96 | Preserve previous description |
| https://pokopie.com/zh-CN/games/pokemon-firered-game-boy-advance-2004 | 86 | Preserve previous description |
| https://pokopie.com/zh-CN/copyright-removal | — | Preserve previous description; live metadata unverified (request timed out) |
| https://pokopie.com/zh-CN/games/hikaru-no-go-gba-2002 | 66 | Expanded description |
| https://pokopie.com/zh-CN/games/richman-4-java-2005 | 73 | Preserve previous description |
| https://pokopie.com/zh-CN/games/pipi-and-bibis-other-1991 | 79 | Preserve previous description |
| https://pokopie.com/zh-CN/blog/how-to-play-roms-in-browser | 137 | Preserve existing redirect |
| https://pokopie.com/zh-CN/games/capcom-sports-club-arcade-1997 | 99 | Preserve intentional noindex |
| https://pokopie.com/ko/snes-games | 92 | Expanded description |
| https://pokopie.com/es/gba-games | 166 | Preserve previous description |
| https://pokopie.com/es/nes-games | 157 | Preserve previous description |
| https://pokopie.com/zh-TW/live | 20 | Expanded description |
| https://pokopie.com/ko/gba-games | 95 | Expanded description |
| https://pokopie.com/es/games/gomoku-nes-1983 | 155 | Preserve intentional noindex |
| https://pokopie.com/zh-TW/snes-games | 65 | Expanded description |
| http://pokopie.com/zh-CN/games/wiggie-waggie-arcade-1994 | 94 | Preserve intentional noindex |
