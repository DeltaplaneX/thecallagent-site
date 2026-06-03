# Card-detail modals + fix misleading hover (brutalist parity with dark) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax. Apply ui-ux-pro-max + web-design-guidelines when styling the brutalist modal.

**Goal:** Make the brutalist cards open a detail modal on click (like the dark version), and ensure only genuinely clickable cards show a hover highlight — so no card "looks clickable but does nothing".

**Architecture:** The dark version already has a complete, accessible modal system in `js/main.js` (`[data-modal]` triggers → clone hidden `#fiche-{slug}` into a shared `[data-modal-panel]`; Esc/backdrop close; focus trap). main.js runs on every page and no-ops if the markup is absent. We bring the **brutalist `nos-solutions-brutalist.html`** to parity by copying the dark's modal markup + `.fiches-store` content and wiring its 17 `.cell` cards as `data-modal` triggers. We add brutalist modal CSS. For brutalist pages with no detail content (`index-brutalist`, `a-propos-brutalist`), we simply remove the misleading hover. The dark version already works and needs no change (verify only).

**Tech Stack:** vanilla HTML/CSS/JS, no build. QA via Playwright MCP + grep.

---

## Decision: which option per page

- **`nos-solutions-brutalist.html`** → Option A (show detail). All 17 cards become modal triggers reusing the dark fiches. Their inner `<a class="more">…démo→</a>` CTAs are removed (the démo CTA already lives inside each fiche, mirroring dark) to avoid an interactive element nested inside a clickable card.
- **`index-brutalist.html`, `a-propos-brutalist.html`** → Option B (remove hover). These cards have no detail content; the hover highlight is removed so they no longer look clickable. Their `…démo→` CTAs stay (they are the action).
- **Dark version** → no change; verify the existing modals still open.

## Slug mapping (brutalist card order → dark fiche id)

`nos-solutions-brutalist.html`, in document order:
1. Appels Entrants → `entrants`
2. Appels Sortants → `sortants`
3. Intégrations grid (6): CRM→`int-crm`, Email→`int-email`, Calendrier→`int-calendrier`, LinkedIn→`int-linkedin`, SMS→`int-sms`, Documents→`int-documents`
4. Workflows (5, numbered 01–05): `wf-recrutement`, `wf-prospection`, `wf-contenu`, `wf-enrichissement`, `wf-campagnes`
5. Secteurs (4): Immobilier→`sec-immobilier`, Santé→`sec-sante`, Services B2B→`sec-b2b`, E-commerce→`sec-ecommerce`

---

## File Structure

- Modify `css/brutalist.css` — add modal styles; fix `.cell` hover to only apply to clickable cards.
- Modify `nos-solutions-brutalist.html` — add `data-modal`/`role`/`tabindex` to cards, remove inner `.more` CTAs, append modal panel + `.fiches-store` (copied from dark).
- Modify `index-brutalist.html`, `a-propos-brutalist.html` — (no HTML change needed; hover fix is purely CSS via Task 1). Verify only.
- No change to `js/main.js` (already generic) or `nos-solutions.html` (already works).

---

### Task 1: Brutalist modal CSS + hover fix

**Files:** Modify `css/brutalist.css` (append at end).

- [ ] **Step 1: Fix the misleading hover** — replace the rule `.cell:hover { background:#fff }` so the highlight + pointer apply ONLY to clickable cards.

In `css/brutalist.css`, find:
```css
.cell:hover { background:#fff; }
```
Replace with:
```css
.cell[data-modal] { cursor:pointer; }
.cell[data-modal]:hover { background:#fff; }
.cell[data-modal]:focus-visible { outline:3px solid var(--accent); outline-offset:-3px; }
```

- [ ] **Step 2: Append the brutalist modal stylesheet** at the end of `css/brutalist.css`:

```css
/* ── Fiches / modale (parité dark, style brutaliste) ───────── */
.fiches-store { display:none; }
body.modal-open { overflow:hidden; }
.modal-backdrop { position:fixed; inset:0; background:rgba(17,17,17,.55); opacity:0; transition:opacity .2s ease; z-index:200; }
.modal-backdrop.is-open { opacity:1; }
.modal-panel {
  position:fixed; top:50%; left:50%; transform:translate(-50%,-46%);
  width:min(680px,calc(100vw - 32px)); max-height:88vh; overflow:auto;
  background:var(--paper); border:var(--bw) solid var(--ink); box-shadow:var(--shadow-lg);
  z-index:201; opacity:0; transition:opacity .2s ease, transform .2s ease; padding:34px 34px 38px;
}
.modal-panel.is-open { opacity:1; transform:translate(-50%,-50%); }
.modal-close {
  position:absolute; top:14px; right:14px; width:40px; height:40px;
  border:var(--bw) solid var(--ink); background:var(--accent); display:flex; align-items:center; justify-content:center;
  box-shadow:3px 3px 0 var(--ink);
}
.modal-close:hover { transform:translate(-1px,-1px); }
.modal-eyebrow { font-family:var(--mono); font-size:.74rem; font-weight:700; text-transform:uppercase; letter-spacing:.08em; background:var(--ink); color:var(--paper); display:inline-block; padding:4px 10px; margin-bottom:14px; }
.modal-title { font-weight:900; font-size:clamp(1.5rem,3.4vw,2.1rem); line-height:1.02; text-transform:uppercase; letter-spacing:-.02em; margin-bottom:14px; padding-right:40px; }
.modal-pitch { font-size:1.05rem; color:var(--ink-soft); margin-bottom:22px; }
.modal-section { margin-top:22px; border-top:var(--bw) solid var(--ink); padding-top:18px; }
.modal-section h4 { font-family:var(--mono); font-size:.8rem; text-transform:uppercase; letter-spacing:.06em; margin-bottom:12px; }
.modal-steps, .modal-section ul, .modal-section ol { padding-left:0; list-style:none; }
.modal-section li { position:relative; padding-left:24px; margin-bottom:10px; font-size:.96rem; }
.modal-section li::before { content:'\2192'; position:absolute; left:0; font-weight:900; color:var(--accent-2); }
.modal-panel .btn, .modal-panel a.modal-cta { margin-top:24px; }
@media (max-width:640px){ .modal-panel { padding:28px 20px 30px; } }
```

- [ ] **Step 3: Verify** — `grep -c "modal-panel" css/brutalist.css` → ≥ 3; `grep -c ".cell\[data-modal\]" css/brutalist.css` → ≥ 2.

- [ ] **Step 4: Commit**
```bash
git add css/brutalist.css
git commit -m "feat(brutalist): modal styles + hover only on clickable cards"
```

---

### Task 2: Wire `nos-solutions-brutalist.html` cards + inject modal markup

**Files:** Modify `nos-solutions-brutalist.html`.

- [ ] **Step 1: Make each `.cell` a modal trigger.** For every one of the 17 cards, add (in the opening tag) `data-modal="{slug}" role="button" tabindex="0" aria-haspopup="dialog"` using the slug mapping above (document order). Example, first card:
```html
<article class="cell" data-modal="entrants" role="button" tabindex="0" aria-haspopup="dialog">
```
Apply to all 17 in order: entrants, sortants, int-crm, int-email, int-calendrier, int-linkedin, int-sms, int-documents, wf-recrutement, wf-prospection, wf-contenu, wf-enrichissement, wf-campagnes, sec-immobilier, sec-sante, sec-b2b, sec-ecommerce.

- [ ] **Step 2: Remove the inner `…démo→` CTAs** from these cards (they are now modal triggers; the démo CTA lives inside each fiche). Delete every line matching `<a class="more" href="contact-brutalist.html">…</a>` inside the `.cell` cards on this page.

- [ ] **Step 3: Keyboard support.** main.js only listens for `click`. Add a tiny inline enhancement at the very end of `nos-solutions-brutalist.html`, just before `<script src="js/main.js"></script>`:
```html
<script>
  document.querySelectorAll('.cell[data-modal]').forEach(c => {
    c.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.click(); }
    });
  });
</script>
```

- [ ] **Step 4: Inject the modal panel + fiches store.** Copy from `nos-solutions.html` the exact block that starts at `<!-- ── Modale` (the `.modal-backdrop` + `.modal-panel`) through the end of `<div class="fiches-store" inert> … </div>` (all 17 `<article id="fiche-*" data-fiche>`). Paste it into `nos-solutions-brutalist.html` immediately AFTER `</footer>` and BEFORE the `<script>` tags. The fiche content is theme-agnostic text; it will be styled by Task 1's CSS.

- [ ] **Step 5: Verify (grep)** in `nos-solutions-brutalist.html`:
  - `grep -c 'id="fiche-' ` → 17
  - `grep -c 'data-modal-panel' ` → 1 ; `grep -c 'data-modal-backdrop' ` → 1
  - `grep -c 'class="more"' ` → 0 (inner CTAs removed)
  - integrations intact: `grep -c 'id="retell-widget"'` → 1, `grep -c 'js/main.js'` → 1

- [ ] **Step 6: Commit**
```bash
git add nos-solutions-brutalist.html
git commit -m "feat(brutalist): nos-solutions cards open detail modals (parity with dark)"
```

---

### Task 3: Remove false hover on `index-brutalist` / `a-propos-brutalist` (CSS-only, verify)

**Files:** none (Task 1 already scoped hover to `.cell[data-modal]`). These pages have no `data-modal` cells, so their cards no longer highlight. Their `…démo→` CTAs remain the action.

- [ ] **Step 1: Verify** these pages have NO `data-modal` on cells (so no false hover, no broken triggers):
  - `grep -c 'cell" data-modal' index-brutalist.html` → 0
  - `grep -c 'class="more"' index-brutalist.html` → 7 (CTAs kept)
- [ ] **Step 2:** No commit (no file change).

---

### Task 4: QA both versions (Playwright)

**Files:** none (verification only). Server: `python -m http.server 8087`.

- [ ] **Step 1: Brutalist modal opens.** Navigate `http://localhost:8087/nos-solutions-brutalist.html`. `browser_evaluate`: `document.querySelector('.cell[data-modal]').click(); return !document.querySelector('[data-modal-panel]').hidden;` → expect `true`. Screenshot the open modal; confirm readable brutalist styling.
- [ ] **Step 2: Close works.** Press Escape (`browser_press_key Escape`); evaluate panel `.hidden === true`.
- [ ] **Step 3: No false hover.** Navigate `index-brutalist.html`; evaluate `getComputedStyle(document.querySelector('.cell')).cursor` → expect `auto` (not `pointer`).
- [ ] **Step 4: Dark still works.** Navigate `nos-solutions.html`; click a `[data-modal]` card; confirm modal opens. (No regression.)
- [ ] **Step 5: Console clean.** `browser_console_messages` level error → 0 on both pages.

---

### Task 5: Final commit + summary

- [ ] **Step 1:** `git add -A && git commit -m "fix(site): brutalist cards open detail modals; hover only on clickable cards"` (if any uncommitted).
- [ ] **Step 2:** Update `.claude/memory/journal.md` with a one-line entry.

---

## Self-Review

- **Spec coverage:** "cards highlight but not clickable" → Task 1 (hover scoped) + Task 2 (brutalist modals) + Task 3 (no false hover elsewhere). "Fix both versions" → brutalist gets modals; dark verified (Task 4 step 4). "Either detail or remove highlight" → both applied per page. "Not the démo button" → démo CTAs untouched on index/a-propos; on nos-solutions they move into the fiche (démo still reachable). ✓
- **No placeholders:** all CSS/HTML/grep/Playwright steps are concrete. ✓
- **Consistency:** slugs match dark fiche ids exactly; `[data-modal]` selector matches main.js (`querySelectorAll('[data-modal]')`). ✓
