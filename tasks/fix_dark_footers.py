#!/usr/bin/env python3
"""Fix ONLY the footer 'Solutions' anchors on dark footer-only pages.

Scope: a-propos.html, 404.html, contact.html, avis-juridique.html,
politique-de-confidentialite.html

Targets the <h5>Solutions</h5> footer block and rewrites the dark anchors:
  Appels entrants / Appels sortants -> nos-solutions.html#appels
  Hub CRM / Integrations            -> nos-solutions.html#integrations
  Workflows                         -> nos-solutions.html#workflows
  Analyse d'appel                   -> index.html#analyse

Nothing else is touched. Idempotent.
"""
import re
import sys

FILES = [
    "a-propos.html",
    "404.html",
    "contact.html",
    "avis-juridique.html",
    "politique-de-confidentialite.html",
]

# (regex on the inner TEXT of the <a>, new href)
RULES = [
    (re.compile(r"^\s*Appels entrants\s*$"), "nos-solutions.html#appels"),
    (re.compile(r"^\s*Appels sortants\s*$"), "nos-solutions.html#appels"),
    (re.compile(r"^\s*Hub CRM\s*$"), "nos-solutions.html#integrations"),
    (re.compile(r"^\s*Intégrations\s*$"), "nos-solutions.html#integrations"),
    (re.compile(r"^\s*Workflows\s*$"), "nos-solutions.html#workflows"),
    (re.compile(r"^\s*Analyse d'appel\s*$"), "index.html#analyse"),
]

# Matches a footer Solutions anchor that currently points to nos-solutions.html
# (with or without an existing anchor), capturing the link text.
ANCHOR_RE = re.compile(
    r'(<a\s+href=")nos-solutions\.html(?:#[\w-]+)?("[^>]*>)([^<]*)(</a>)'
)


def isolate_solutions_block(html):
    """Return (start, end) char span of the footer <h5>Solutions</h5> <ul>...</ul>."""
    m = re.search(r"<h5>\s*Solutions\s*</h5>", html)
    if not m:
        return None
    ul_start = html.find("<ul>", m.end())
    if ul_start == -1:
        return None
    ul_end = html.find("</ul>", ul_start)
    if ul_end == -1:
        return None
    return (ul_start, ul_end + len("</ul>"))


def rewrite_block(block):
    changed = [0]

    def repl(mo):
        pre, post, text, close = mo.group(1), mo.group(2), mo.group(3), mo.group(4)
        for rule_re, new_href in RULES:
            if rule_re.match(text):
                new_a = f"{pre}{new_href}{post}{text}{close}"
                if new_a != mo.group(0):
                    changed[0] += 1
                return new_a
        return mo.group(0)

    new_block = ANCHOR_RE.sub(repl, block)
    return new_block, changed[0]


def main():
    total = 0
    report = []
    for fn in FILES:
        with open(fn, "r", encoding="utf-8") as f:
            html = f.read()
        span = isolate_solutions_block(html)
        if span is None:
            report.append(f"{fn}: NO footer Solutions block found")
            continue
        s, e = span
        block = html[s:e]
        new_block, n = rewrite_block(block)
        if n:
            html = html[:s] + new_block + html[e:]
            with open(fn, "w", encoding="utf-8", newline="") as f:
                f.write(html)
        total += n
        report.append(f"{fn}: {n} anchor(s) updated")
    print("\n".join(report))
    print(f"TOTAL: {total} anchors updated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
