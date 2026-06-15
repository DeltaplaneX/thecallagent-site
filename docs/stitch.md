# Google Stitch — Guide d'usage pour TheCallAgent

> Installe le 2026-04-28 | Skills: `stitch-design`, `design-md`, `enhance-prompt`, `taste-design`

---

## Ce qu'est Stitch

Google Stitch est un outil Google Labs de generation d'interfaces HTML/CSS haute fidelite pilote par LLM. Il produit du HTML statique propre, compatible avec le stack vanilla du site (aucun build step, aucune dependance JS).

Les **Stitch Skills** sont des skills Claude Code qui servent d'interface structuree entre l'agent et le MCP server Stitch.

---

## Skills installes

| Skill | Commande | Necessite Stitch MCP | Usage |
|---|---|---|---|
| `stitch-design` | `/stitch-design` | Oui | Generation/edition d'ecrans complets |
| `design-md` | `/design-md` | Oui (lecture) | Generer `.stitch/DESIGN.md` depuis un projet existant |
| `enhance-prompt` | `/enhance-prompt` | Non | Transformer un brief vague en prompt Stitch structure |
| `taste-design` | `/taste-design` | Non | Generer un `DESIGN.md` premium anti-generique |

Installes globalement via `npx skills add google-labs-code/stitch-skills --global` -> symlinkes dans `~/.claude/skills/`.

---

## Prerequis : Stitch MCP Server

`stitch-design` et `design-md` necessitent le MCP server Stitch configure dans Claude Code.

**Setup :**
1. Creer un compte sur https://stitch.withgoogle.com/ (Google Labs, acces gratuit).
2. Recuperer la config MCP depuis les settings Stitch.
3. L'ajouter dans `.mcp.json` a la racine du projet :

```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "@google/stitch-mcp@latest"],
      "env": {
        "STITCH_API_KEY": "<ta_cle>"
      }
    }
  }
}
```

IMPORTANT: Ne jamais committer `.mcp.json` s'il contient une cle API. Ajouter au `.gitignore`.

---

## Design system TheCallAgent a passer en input

```
Background:   #06080F  (Void Black)
Surface-2:    #0B0F1C  (Midnight Navy)
Primary:      #2B6FFF  (Electric Blue)
Accent-light: #5B9FFF  (Periwinkle)
Success:      #06D6A0  (Teal)
Text:         #E8EDFF  (Ghost White)
Text-muted:   #7080A0  (Storm Gray)
Heading font: Syne (800/700/600/400)
Body font:    DM Sans (300-500)
Border radius: 8px
```

---

## Workflow recommande

### 1. Preparer le DESIGN.md (une fois)

```
/taste-design
```

Demander : "Generate a DESIGN.md for TheCallAgent -- dark SaaS landing page" en collant les tokens ci-dessus.
Placer le resultat dans `.stitch/DESIGN.md` a la racine.

### 2. Ameliorer un brief avant generation

```
/enhance-prompt
```

Le skill transforme un brief vague en prompt structure avec sections, tokens couleur et typographie.

### 3. Generer un ecran (avec MCP configure)

```
/stitch-design
```

Input : le prompt ameliore + reference au DESIGN.md.
Le skill telecharge le HTML genere dans `.stitch/designs/`.

### 4. Integrer le resultat

Le HTML Stitch est un point de depart visuel, pas du code production :
1. Inspecter `.stitch/designs/<screen>.html` dans le navigateur.
2. Extraire les sections/composants pertinents.
3. Adapter aux conventions du repo (custom properties CSS, pas inline styles).
4. Integrer dans la page cible.

---

## Smoke test -- resultat (2026-04-28)

Skill teste : `/enhance-prompt`
Input : "primary CTA button, TheCallAgent design system, bg #06080F, accent #2B6FFF, fonts Syne + DM Sans"

**Output produit par le skill :**

```
A high-contrast primary call-to-action button for a dark-themed SaaS landing page.

DESIGN SYSTEM (REQUIRED):
- Platform: Web, Desktop-first (responsive down to 375px)
- Theme: Dark, minimal, high-contrast
- Background: Void Black (#06080F) for page/card surface
- Surface-2: Midnight Navy (#0B0F1C) for elevated cards
- Primary Accent: Electric Blue (#2B6FFF) for CTAs, links, active states
- Accent Light: Periwinkle (#5B9FFF) for hover/focus states
- Success: Teal (#06D6A0) for confirmation states
- Text Primary: Ghost White (#E8EDFF) for headings + body
- Text Muted: Storm Gray (#7080A0) for captions + metadata
- Heading Font: Syne (800/700)
- Body Font: DM Sans (300-500), 16px base, 1.6 line-height
- Border Radius: 8px default, 4px compact
- Buttons: 48px height, 24px h-padding, 8px radius

Component Spec - Primary Button:
1. Default  : bg #2B6FFF, text #E8EDFF, Syne 600 14px, radius 8px
2. Hover    : bg #5B9FFF, box-shadow 0 4px 24px rgba(43,111,255,0.35)
3. Active   : scale(0.97), bg #2B6FFF
4. Focus    : outline 2px solid #5B9FFF, offset 3px (WCAG AA)
5. Disabled : opacity 0.4, cursor not-allowed

Context: Isolated component -- output as standalone HTML/CSS snippet.
```

Resultat : skill operationnel. La generation d'ecrans (`/stitch-design`) necessite la config MCP server (etape suivante).

---

## Limites observees

1. **Stitch MCP non configure** : la generation d'ecrans n'est pas encore operationnelle. A configurer avant les prochains chantiers UI (voir section Prerequis).
2. **Output Stitch = HTML inline styles** : a portabiliser vers les custom properties CSS du design system.
3. **Stack vanilla uniquement** : skills `react:components`, `remotion`, `shadcn-ui` non installes -- hors-scope pour ce projet.
4. **Rate limits Stitch** : outil Google Labs, potentiellement soumis a quotas lors d'usage intensif.

---

## Guardrails

- Ne pas appliquer les outputs Stitch directement aux pages live sans review
- Ne pas committer `.stitch/` dans git (fichiers generes volumineux) -- ajouter au `.gitignore`
- Ne pas introduire de dependances npm depuis les outputs Stitch
- Toute generation Stitch = prototype a integrer manuellement, pas remplacement du code existant
