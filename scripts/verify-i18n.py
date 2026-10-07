"""Verifie les pages traduites en/ et zh/ contre leur source FR.
Usage : python scripts/verify-i18n.py [--fix-eol]   (--fix-eol : normalise en CRLF)
"""
import re, sys, json, pathlib
ROOT = pathlib.Path(r'C:\Users\Utilisateur\ClaudeProjects\thecallagent-site')
MAP = {'index.html': 'index.html', 'nos-solutions.html': 'solutions.html', 'a-propos.html': 'about.html',
       'contact.html': 'contact.html', 'avis-juridique.html': 'legal-notice.html',
       'politique-de-confidentialite.html': 'privacy-policy.html', 'conditions-generales.html': 'terms.html',
       'politique-de-remboursement.html': 'refund-policy.html', 'politique-de-cookies.html': 'cookie-policy.html',
       '404.html': '404.html'}
LANGS = {'en': ('en', 'en_US'), 'zh': ('zh-CN', 'zh_CN')}
FR_STOP = re.compile(r"\b(les|des|vous|nous|pour|avec|dans|est|une|votre|vos|sur|pas|sont|aux|cette|notre|nos)\b", re.I)
FIX = '--fix-eol' in sys.argv

def strip_noise(html):
    html = re.sub(r'<!--.*?-->', '', html, flags=re.S)
    html = re.sub(r'<p class="translation-note">.*?</p>\s*', '', html, flags=re.S)
    return html

def tag_seq(html):
    html = strip_noise(html)
    html = re.sub(r'<script\b[^>]*>.*?</script>', '<script></script>', html, flags=re.S)
    html = re.sub(r'<style\b[^>]*>.*?</style>', '<style></style>', html, flags=re.S)
    return re.findall(r'<(/?[a-zA-Z][a-zA-Z0-9-]*)', html)

def text_only(html):
    html = strip_noise(html)
    html = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', ' ', html, flags=re.S)
    return re.sub(r'<[^>]+>', ' ', html)

def local_target(href):
    href = href.split('#')[0].split('?')[0]
    if not href or href.startswith(('http', 'mailto:', 'tel:', '//', 'data:')):
        return None
    if href.endswith('/'):
        href += 'index.html'
    return ROOT / href.lstrip('/')

report = []
total_fail = 0
for fr_name, slug in MAP.items():
    fr = (ROOT / fr_name).read_bytes().decode('utf-8')
    fr_tags = tag_seq(fr)
    fr_ids = set(re.findall(r'\sid="([^"]+)"', strip_noise(fr)))
    for d, (lang, oglocale) in LANGS.items():
        rel = f'{d}/{slug}'
        p = ROOT / rel
        issues = []
        if not p.exists():
            report.append((rel, ['FICHIER ABSENT'])); total_fail += 1; continue
        b = p.read_bytes()
        if b.startswith(b'\xef\xbb\xbf'): issues.append('BOM present')
        try:
            s = b.decode('utf-8')
        except UnicodeDecodeError:
            report.append((rel, ['UTF-8 invalide'])); total_fail += 1; continue
        if f'<html lang="{lang}">' not in s: issues.append(f'<html lang="{lang}"> manquant')
        # structure
        tt = tag_seq(s)
        if tt != fr_tags:
            k = next((i for i, (a, b2) in enumerate(zip(tt, fr_tags)) if a != b2), min(len(tt), len(fr_tags)))
            issues.append(f'STRUCTURE differente a la balise #{k}: FR={fr_tags[k:k+4]} vs {tt[k:k+4]} (FR {len(fr_tags)} balises, trad {len(tt)})')
        ids = set(re.findall(r'\sid="([^"]+)"', strip_noise(s)))
        if ids != fr_ids:
            issues.append(f'ids differents: manquants={sorted(fr_ids - ids)[:5]} en plus={sorted(ids - fr_ids)[:5]}')
        # chemins relatifs interdits
        rels = re.findall(r'(?:href|src|poster|action)="(?!https?:|//|/|#|mailto:|tel:|data:|javascript:)([^"]+)"', strip_noise(s))
        rels = [r for r in rels if r.strip()]
        if rels: issues.append(f'chemins relatifs: {sorted(set(rels))[:8]}')
        if re.search(r"url\((?!['\"]?(?:https?:|/|data:))", s): issues.append('url() relatif dans un style')
        # liens internes
        broken = []
        for href in set(re.findall(r'href="([^"]+)"', strip_noise(s))):
            t = local_target(href)
            if t is not None and not t.exists():
                broken.append(href)
        if broken: issues.append(f'liens casses: {sorted(broken)[:8]}')
        # selecteur de langue
        sw = re.search(r'<div class="lang-switch".*?</div>', s, re.S)
        if not sw: issues.append('lang-switch absent')
        else:
            cur = re.findall(r'<a [^>]*aria-current="true"[^>]*>', sw.group(0))
            if len(cur) != 1 or f'hreflang="{lang}"' not in cur[0]:
                issues.append(f'aria-current incorrect dans lang-switch: {cur}')
            fr_link = re.search(r'<a href="([^"]+)" hreflang="fr"', sw.group(0))
            exp_fr = '/' if fr_name == 'index.html' else f'/{fr_name}'
            if not fr_link or fr_link.group(1) != exp_fr:
                issues.append(f'lien FR du selecteur = {fr_link.group(1) if fr_link else None}, attendu {exp_fr}')
        # head
        exp_url = f'https://thecallagent.com/{d}/' + ('' if slug in ('index.html', '404.html') else slug)
        if fr_name != '404.html':
            if f'<link rel="canonical" href="{exp_url}" />' not in s: issues.append(f'canonical != {exp_url}')
            if s.count('rel="alternate" hreflang=') != 4: issues.append('hreflang: 4 liens attendus')
        if f'<meta property="og:locale" content="{oglocale}" />' not in s: issues.append(f'og:locale != {oglocale}')
        if f'content="{exp_url}"' not in s: issues.append(f'og:url != {exp_url}')
        # JSON-LD
        for m in re.finditer(r'<script[^>]*application/ld\+json[^>]*>(.*?)</script>', s, re.S):
            try:
                data = json.loads(m.group(1))
            except json.JSONDecodeError as e:
                issues.append(f'JSON-LD invalide: {e}'); continue
            blob = json.dumps(data)
            if '"inLanguage": "fr' in blob or '"inLanguage":"fr' in blob: issues.append('JSON-LD inLanguage encore fr')
        # fuites de francais / contenu
        txt = text_only(s)
        words = re.findall(r"[A-Za-zÀ-ÿ']+", txt)
        frhits = len(FR_STOP.findall(txt))
        if d == 'en' and frhits > 12: issues.append(f'francais residuel probable ({frhits} mots-outils FR)')
        if d == 'zh':
            cjk = len(re.findall(r'[\u4e00-\u9fff]', txt)); latin = len(re.findall(r'[A-Za-zÀ-ÿ]', txt))
            if cjk < latin: issues.append(f'peu de chinois: {cjk} CJK vs {latin} lettres latines')
            if frhits > 8: issues.append(f'francais residuel probable ({frhits} mots-outils FR)')
        if 'Bonjour !' in s: issues.append('data-popup-message Retell non traduit')
        if 'Aller au contenu' in s: issues.append('skip-link non traduit')
        if d != 'fr' and fr_name != 'index.html' and fr_name not in ('404.html',) and 'translation-note' not in s and fr_name in (
                'avis-juridique.html', 'politique-de-confidentialite.html', 'conditions-generales.html',
                'politique-de-remboursement.html', 'politique-de-cookies.html'):
            issues.append('note de traduction absente (page legale)')
        # fins de ligne
        if FIX and b'\r\n' not in b:
            p.write_bytes(s.replace('\n', '\r\n').encode('utf-8'))
        ratio = len(s) / max(1, len(fr))
        tag = 'OK ' if not issues else 'KO '
        if issues: total_fail += 1
        report.append((rel, [f'taille {ratio:.2f}x FR, {s.count(chr(10))} lignes'] + issues))

for rel, lines in report:
    print(('OK  ' if len(lines) == 1 and lines[0].startswith('taille') else 'KO  ') + rel)
    for l in lines: print('     - ' + l)
print(f'\n{len(report) - total_fail}/{len(report)} pages OK')
sys.exit(1 if total_fail else 0)
