#!/usr/bin/env python3
"""Subset the Fusion Pixel CJK display fonts shipped to the browser.

The site uses these fonts for headings and pixel-style UI labels. The upstream
files carry ~36.5k codepoints each, including Hangul, Braille and rare CJK
extension blocks that this site never renders. That costs ~650 KB per font on
every first paint for zh-CN and ja visitors.

We keep GB2312 coverage so dynamically rendered text (game titles coming from
the GGEMU API) still resolves to pixel glyphs, JIS X 0208 coverage for Japanese, plus every character that
actually appears in the source tree. Anything outside that falls back to the
system font instead of shipping megabytes nobody will type.

Requires fonttools + brotli:

    pip install fonttools brotli

Usage:

    python3 tools/fonts/subset.py
"""

from __future__ import annotations

import os
import shutil
import subprocess
import sys
from fontTools.ttLib import TTFont

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SOURCE_DIR = os.path.join(ROOT, "tools", "fonts", "source")
OUTPUT_DIR = os.path.join(ROOT, "public", "fonts")

FONTS = {
    "fusion-pixel-12px-zh-hans": os.path.join(SOURCE_DIR, "fusion-pixel-12px-zh-hans.woff2"),
    "fusion-pixel-12px-ja": os.path.join(SOURCE_DIR, "fusion-pixel-12px-ja.woff2"),
}

SOURCE_EXTENSIONS = (".ts", ".tsx", ".css", ".html", ".md", ".js")
SKIP_DIRS = {"node_modules", ".git", "dist", "tools", ".workbuddy"}


def ranges_to_unicodes(ranges: list[tuple[int, int]]) -> str:
    """Render (start, end) pairs into pyftsubset --unicodes syntax."""
    parts = []
    for start, end in ranges:
        parts.append(
            f"U+{start:04X}" if start == end else f"U+{start:04X}-{end:04X}"
        )
    return ",".join(parts)


def codepoints_to_ranges(codepoints: set[int]) -> list[tuple[int, int]]:
    ordered = sorted(codepoints)
    ranges: list[tuple[int, int]] = []
    start = previous = ordered[0]
    for codepoint in ordered[1:]:
        if codepoint == previous + 1:
            previous = codepoint
            continue
        ranges.append((start, previous))
        start = previous = codepoint
    ranges.append((start, previous))
    return ranges


def gb2312_charset() -> set[int]:
    """Every character representable in GB2312 (6763 Han + 682 symbols)."""
    charset: set[int] = set()
    for high in range(0xA1, 0xFF):
        for low in range(0xA1, 0xFF):
            try:
                charset.add(ord(bytes([high, low]).decode("gb2312")))
            except (UnicodeDecodeError, ValueError):
                continue
    return charset


def japanese_charset() -> set[int]:
    """JIS X 0208 covers common Japanese kanji, kana and symbols."""
    charset: set[int] = set()
    for high in range(0x21, 0x7F):
        for low in range(0x21, 0x7F):
            encoded = b"\x1b$B" + bytes([high, low]) + b"\x1b(B"
            try:
                charset.update(ord(ch) for ch in encoded.decode("iso2022_jp"))
            except UnicodeDecodeError:
                continue
    return charset


def source_charset() -> set[int]:
    """Every character literal in the app source, so UI copy never falls back."""
    charset: set[int] = set()
    for current, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
        for name in files:
            if not name.endswith(SOURCE_EXTENSIONS):
                continue
            try:
                with open(os.path.join(current, name), encoding="utf-8") as handle:
                    charset.update(ord(ch) for ch in handle.read())
            except (OSError, UnicodeDecodeError):
                continue
    return charset


def keep_ranges(include_japanese: bool = False) -> list[tuple[int, int]]:
    wanted: set[int] = set()
    wanted |= gb2312_charset()
    wanted |= source_charset()
    if include_japanese:
        wanted |= japanese_charset()

    # Blocks the UI actually renders but GB2312 does not cover.
    blocks = [
        (0x20, 0x7E),          # ASCII printable
        (0xA0, 0x2FF),         # Western European, punctuation, symbols
        (0x3040, 0x30FF),      # Kana
        (0x30FB, 0x30FF),      # Katakana punctuation
        (0x2000, 0x206F),      # General punctuation
        (0x20A0, 0x20BF),      # Currency symbols
        (0x2100, 0x21FF),      # Letterlike forms, arrows
        (0x2190, 0x21FF),      # Arrows (used heavily in retro UI)
        (0x2200, 0x22FF),      # Mathematical operators
        (0x2300, 0x23FF),      # Misc technical
        (0x2500, 0x257F),      # Box drawing
        (0x25A0, 0x25FF),      # Geometric shapes
        (0x2600, 0x26FF),      # Misc symbols
        (0x2700, 0x27BF),      # Dingbats
        (0x2E80, 0x2EFF),      # CJK radicals supplement (low cost, aids lookup)
        (0x3000, 0x303F),      # CJK symbols and punctuation
        (0x3190, 0x319F),      # Kanbun
        (0x31C0, 0x31EF),      # CJK strokes
        (0x3200, 0x32FF),      # Enclosed CJK letters and months
        (0x3300, 0x33FF),      # CJK compatibility
        (0x3400, 0x4DBF),      # CJK Extension A (rare, but cheap to keep? no) - excluded below
        (0xFE30, 0xFE4F),      # CJK compatibility forms
        (0xFF00, 0xFF65),      # Halfwidth and fullwidth forms
        (0xFFE0, 0xFFE6),      # Fullwidth signs
    ]
    # Extension A adds real weight for almost no benefit; leave it out.
    blocks = [pair for pair in blocks if pair[0] != 0x3400]

    for start, end in blocks:
        wanted |= set(range(start, end + 1))

    return codepoints_to_ranges(wanted)


def subset(name: str, source_path: str, ranges: list[tuple[int, int]]) -> tuple[int, int]:
    available = set(TTFont(source_path).getBestCmap().keys())
    keep = set()
    for start, end in ranges:
        keep |= {c for c in available if start <= c <= end}

    suffix = "jis-subset" if name.endswith("-ja") else "subset"
    output_path = os.path.join(OUTPUT_DIR, f"{name}.{suffix}.woff2")
    command = [
        sys.executable,
        "-m",
        "fontTools.subset",
        source_path,
        f"--unicodes={ranges_to_unicodes(codepoints_to_ranges(keep))}",
        f"--output-file={output_path}",
        "--flavor=woff2",
        "--layout-features=*",
        "--drop-tables=vhea,vmtx",
        "--name-IDs=*",
    ]
    subprocess.run(command, check=True)

    return os.path.getsize(source_path), os.path.getsize(output_path)


def main() -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    total_before = total_after = 0
    for name, source_path in FONTS.items():
        if not os.path.exists(source_path):
            print(f"missing source font: {source_path}", file=sys.stderr)
            sys.exit(1)
        ranges = keep_ranges(include_japanese=name.endswith("-ja"))
        before, after = subset(name, source_path, ranges)
        # Keep original URLs working for clients with cached pre-subset CSS.
        shutil.copyfile(source_path, os.path.join(OUTPUT_DIR, f"{name}.woff2"))
        total_before += before
        total_after += after
        print(
            f"  {name:32s} {before // 1024:5d} KB -> {after // 1024:5d} KB "
            f"({after / before * 100:.1f}%)"
        )

    print(
        f"\ntotal {total_before // 1024} KB -> {total_after // 1024} KB "
        f"(saved {(total_before - total_after) // 1024} KB)"
    )


if __name__ == "__main__":
    main()
