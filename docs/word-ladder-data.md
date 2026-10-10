# Word Ladder data and licensing

## Shipped dictionary

- Dataset: ENABLE 1 English word list, curated to a small four-letter common-word subset.
- Application version: `enable1-curated-4-v1`.
- Source snapshot: `dolph/dictionary` master, accessed 2026-10-10.
- License status: the ENABLE master word list was formally released into the public domain. The game page credits ENABLE as the source.
- Transformation: POKOPIE manually limits the list to common, suitable four-letter words. The complete upstream list is not redistributed.

Sources:

- https://github.com/dolph/dictionary/blob/master/enable1.txt
- https://sources.debian.org/copyright/license/scowl/2019.10.06-1/

## Evaluated but not copied

- `PoopleGame/poople`: MIT-licensed TypeScript word-ladder engine. POKOPIE does not depend on it and does not copy its branding, UI, content, or source. The implementation in this repository is original TypeScript using standard breadth-first search and wildcard neighbor buckets.
- `rspeer/wordfreq`: code is Apache-2.0, while bundled frequency data carries additional attribution and share-alike obligations. It is not included in this MVP.

References:

- https://github.com/PoopleGame/poople
- https://github.com/rspeer/wordfreq/blob/master/LICENSE.txt
- https://github.com/rspeer/wordfreq/blob/master/NOTICE.md
