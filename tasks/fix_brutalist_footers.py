#!/usr/bin/env python3
"""Fix ONLY the footer 'Solutions' anchors on brutalist footer-only pages.

Targets the 4 footer links by exact <a> markup and rewrites the href to the
correct anchor. Does NOT touch:
  - "Nos Solutions" link (no anchor, stays nos-solutions-brutalist.html)
  - Contact links (tel:/mailto:/Formulaire)
  - hero CTAs / nav links
Only replaces lines that are EXACTLY the footer Solutions <li><a> entries.
"""
import io
import os

FILES = [
    "a-propos-brutalist.html",
    "404-brutalist.html",
    "contact-brutalist.html",
    "avis-juridique-brutalist.html",
    "politique-de-confidentialite-brutalist.html",
]

# Exact old -> new line mapping for footer Solutions anchors.
# These strings are unique to the footer Solutions section (text differs from
# nav/hero links, and the "Nos Solutions" parent link is intentionally absent).
REPLACEMENTS = [
    (
        '<a href="nos-solutions-brutalist.html">Appels entrants</a>',
        '<a href="nos-solutions-brutalist.html#entrant-sortant">Appels entrants</a>',
    ),
    (
        '<a href="nos-solutions-brutalist.html">Appels sortants</a>',
        '<a href="nos-solutions-brutalist.html#entrant-sortant">Appels sortants</a>',
    ),
    (
        '<a href="nos-solutions-brutalist.html">Analyse d\'appel</a>',
        '<a href="index-brutalist.html#analyse">Analyse d\'appel</a>',
    ),
    (
        '<a href="nos-solutions-brutalist.html">Workflows</a>',
        '<a href="nos-solutions-brutalist.html#workflows">Workflows</a>',
    ),
]

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
results = {}

for fname in FILES:
    path = os.path.join(root, fname)
    with io.open(path, "r", encoding="utf-8") as f:
        content = f.read()
    original = content
    per_file = {}
    for old, new in REPLACEMENTS:
        count = content.count(old)
        if count:
            content = content.replace(old, new)
        per_file[old] = count
    if content != original:
        with io.open(path, "w", encoding="utf-8", newline="") as f:
            f.write(content)
    results[fname] = per_file

for fname, per_file in results.items():
    print(fname)
    for old, count in per_file.items():
        print("   {}x  {}".format(count, old))
