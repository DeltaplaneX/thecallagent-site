import json, pathlib, os, sys

proj_dir = pathlib.Path(os.environ.get("CLAUDE_PROJECT_DIR", "."))
strict_path = proj_dir / ".claude" / "agents" / "STRICT.md"

if not strict_path.exists():
    sys.exit(0)

txt = strict_path.read_text(encoding="utf-8")

# Extract perimetre lines
scope_lines = []
in_scope = False
for line in txt.splitlines():
    if "Perimetre d'application" in line or "Perimetre" in line:
        in_scope = True
        continue
    if in_scope:
        if line.startswith("##"):
            break
        if line.strip().startswith("-"):
            scope_lines.append(line.strip()[2:].strip())

if not scope_lines:
    sys.exit(0)

scope_str = " | ".join(scope_lines[:6])
msg = (
    f"[STRICT AUDIT] Avant d'executer cette action, verifie le perimetre STRICT "
    f"(.claude/agents/STRICT.md). Actions soumises a validation : {scope_str}. "
    f"Si l'action entre dans ce perimetre, applique les criteres de validation "
    f"et emets un VERDICT VALIDE ou BLOQUE avant de continuer."
)

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "PreToolUse",
        "additionalContext": msg
    }
}))
