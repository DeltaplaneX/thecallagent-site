# Spec de traduction — thecallagent.com (FR → EN / ZH-CN)

Site statique HTML (pas de build). Les pages FR sont à la racine du repo
`C:\Users\Utilisateur\ClaudeProjects\thecallagent-site\`. Les traductions vont
dans `en\` et `zh\` (sous-dossiers de la racine). Tu produis UN fichier HTML
complet par page/langue, à écrire avec l'outil Write au chemin exact demandé.

## 0. Règle d'or
Le fichier produit doit avoir EXACTEMENT la même structure DOM que la page FR :
mêmes balises, même ordre, mêmes attributs (`id`, `class`, `name`, `data-*`,
`for`, `type`, `role`, `aria-*` techniques). Seuls changent : le texte visible,
les attributs textuels (`alt`, `title`, `placeholder`, `aria-label`, `content`
des `<meta>`, `data-popup-message`, `data-text`), `lang`, les URL (règles §3-4)
et le JSON-LD (§5). Ne résume pas, ne raccourcis pas, n'« améliore » pas le
contenu : traduis tout, phrase par phrase. Pas de BOM, UTF-8.

## 1. Table des pages (slug FR → slug EN/ZH)
| FR (racine)                          | EN (`/en/`)           | ZH (`/zh/`)           |
|--------------------------------------|-----------------------|-----------------------|
| index.html                           | index.html → lien `/en/`  | index.html → lien `/zh/` |
| nos-solutions.html                   | solutions.html        | solutions.html        |
| a-propos.html                        | about.html            | about.html            |
| contact.html                         | contact.html          | contact.html          |
| avis-juridique.html                  | legal-notice.html     | legal-notice.html     |
| politique-de-confidentialite.html    | privacy-policy.html   | privacy-policy.html   |
| conditions-generales.html            | terms.html            | terms.html            |
| politique-de-remboursement.html      | refund-policy.html    | refund-policy.html    |
| politique-de-cookies.html            | cookie-policy.html    | cookie-policy.html    |
| 404.html                             | 404.html              | 404.html              |

Tout lien interne vers la page d'accueil (`index.html`, `index.html#analyse`)
devient `/en/` ou `/zh/` (+ ancre : `/en/#analyse`). Les ancres (`#id`) sont
conservées telles quelles. Les autres liens internes deviennent
`/en/<slug>` ou `/zh/<slug>` (ex. `nos-solutions.html#workflows` →
`/en/solutions.html#workflows`).

## 2. `<html>` et `<head>`
- `<html lang="en">` ou `<html lang="zh-CN">`.
- `<title>`, `<meta name="description">`, `og:title`, `og:description`,
  `twitter:title`, `twitter:description` : traduits.
- `<link rel="canonical">` et `og:url` : URL de la page traduite
  (`https://thecallagent.com/en/solutions.html` ; accueil : `https://thecallagent.com/en/`).
- `og:locale` : `en_US` ou `zh_CN`.
- Les 4 lignes `<link rel="alternate" hreflang=...>` : **inchangées** (elles
  sont absolues et identiques dans les 3 langues).
- Favicons, manifest, preconnect, `facebook-domain-verification` : inchangés.
- Stub Retell `<script id="retell-widget" ...>` : seul `data-popup-message`
  est traduit (voir glossaire) ; `data-title`, `data-bot-name`, clés, id : inchangés.

## 3. Chemins des ressources → absolus
Les pages traduites sont dans un sous-dossier : tout chemin relatif vers une
ressource devient absolu depuis la racine :
`href="css/brutalist.css"` → `href="/css/brutalist.css"`,
`src="js/main.js"` → `/js/main.js`, `src="images/..."` → `/images/...`,
`src="videos/..."`, `poster="videos/..."` → `/videos/...`, idem `srcset`,
`url(images/...)` dans un `style` inline. Les chemins déjà absolus (`/images/favicon.ico`)
ou externes (`https://...`) ne changent pas.

## 4. Sélecteur de langue (dans `<nav>`)
Bloc FR :
```
<div class="lang-switch" role="group" aria-label="Langue / Language / 语言">
  <a href="nos-solutions.html" hreflang="fr" lang="fr" aria-current="true" title="Français">FR</a>
  <a href="/en/solutions.html" hreflang="en" lang="en" title="English">EN</a>
  <a href="/zh/solutions.html" hreflang="zh-CN" lang="zh-CN" title="中文">中文</a>
</div>
```
Dans la page traduite : le lien FR devient absolu (`/nos-solutions.html` ; accueil : `/`),
`aria-current="true"` est déplacé sur le lien de la langue courante (EN ou 中文)
et retiré du lien FR. `aria-label` trilingue, `title`, `hreflang`, `lang` : inchangés.
Le lien du logo (`<a href="index.html" class="nav-logo">`) → `/en/` ou `/zh/`.

## 5. JSON-LD (`<script type="application/ld+json">`)
Garder le JSON valide. Traduire `name` / `description` des objets WebPage
(le `name` de l'Organization reste « TheCallAgent »). `inLanguage` →
`"en"` / `"zh-CN"`. `availableLanguage` → `["fr", "en", "zh"]`.
`url` et `@id` du WebPage → URL localisée (`https://thecallagent.com/en/solutions.html#webpage`).
`@id`/`url` de l'Organization et du WebSite (racine `https://thecallagent.com/`) : inchangés.
Noms de personnes, emails, téléphones, `sameAs`, `logo`, `image` : inchangés.

## 6. Ne PAS traduire
Commentaires HTML (`<!-- ... -->` restent en français tels quels), contenu des
`<style>` et `<script>` inline (sauf JSON-LD §5), noms de marques et produits
(TheCallAgent, The Call Agent, Retell AI, n8n, Google Calendar, Twilio,
Railway, IONOS, Vercel, Supabase, Stripe, WhatsApp, Deno), noms de personnes
(Odilon Buisson), identifiants légaux (SIRET, RCS, n° TVA), adresses postales
(garder « Artigues-Près-Bordeaux, France »), emails, `datetime`, URLs externes,
attributs techniques (`id`, `class`, `name`, `data-*` sauf `data-popup-message`
et `data-text`, `for`, `autocomplete`, `type`, `role`).

## 7. Téléphone
Affichage FR « 06 64 33 63 80 » → EN/ZH « +33 6 64 33 63 80 » ;
`href="tel:0664336380"` → `href="tel:+33664336380"`. Placeholder du champ
téléphone : EN `+33 6 XX XX XX XX`, ZH `+33 6 XX XX XX XX`.

## 8. Pages légales (legal-notice, privacy-policy, terms, refund-policy, cookie-policy)
Insérer, immédiatement après la fermeture du premier `<h1>...</h1>` de la page,
UN paragraphe (seule exception à la règle de structure identique) :
- EN : `<p class="translation-note">This page is a courtesy translation. In the event of any discrepancy, the <a href="/politique-de-confidentialite.html" hreflang="fr">French version</a> prevails.</p>`
- ZH : `<p class="translation-note">本页面为参考译文。如中法文版本存在歧义，以<a href="/politique-de-confidentialite.html" hreflang="fr">法文版本</a>为准。</p>`
(adapter le `href` à la page FR correspondante). Les références au droit
français restent précises : EN « Article L.221-3 of the French Consumer Code »,
ZH « 《法国消费者法典》第 L.221-3 条 » ; « CNIL » reste CNIL (EN : « the CNIL
(French data protection authority) » à la 1re mention ; ZH : « CNIL（法国数据保护机构）»).
« SASU » : EN « CALL AGENT SASU (a French simplified joint-stock company) » à la
1re mention ; ZH « CALL AGENT SASU（法国简化股份有限公司）».

## 9. Glossaire — ANGLAIS (en-US, ton marketing naturel, pas de traduction mot à mot)
Lien d'évitement « Aller au contenu » → « Skip to content ». `aria-label="Menu"` → « Menu ».
Nav : Accueil → Home · Nos Solutions → Solutions · À propos → About · Contactez-nous → Contact us.
Footer : titres Navigation / Solutions / Contact ; Appels entrants → Inbound calls ;
Appels sortants → Outbound calls ; Analyse d'appel → Call analysis ; Workflows → Workflows ;
Email → Email ; Formulaire → Contact form ; Politique de confidentialité → Privacy policy ;
Mentions légales → Legal notice ; Conditions générales → Terms & Conditions ;
Remboursement → Refund policy ; Gérer mes cookies → Manage my cookies.
Footer desc : « An AI phone agent that picks up, understands and takes action in your tools — inbound and outbound, 24/7. »
Retell `data-popup-message` : « Hi! I’m TheCallAgent’s AI assistant. How can I help you? »
CTA : Réserver une démo → Book a demo · Voir les solutions → See our solutions ·
Envoyer le message → Send message · Nous contacter → Contact us.
Termes : agent téléphonique IA → AI phone agent · PME / TPE → SMEs / small businesses ·
devis → quote · réservation → booking · prise de rendez-vous → appointment scheduling ·
fiche client → customer record · standard (téléphonique) → front desk / switchboard ·
restauration → restaurants · immobilier → real estate · artisans → trades ·
cabinet → practice · entrants / sortants → inbound / outbound · 24h/24 → 24/7 ·
€ HT → € excl. VAT · mois entamé → current month · avoir → credit note ·
données personnelles → personal data · sous-traitant → processor ·
responsable de traitement → data controller · traceurs → trackers ·
durée de conservation → retention period · droit de rétractation → right of withdrawal.
Titre de la page d'accueil : « TheCallAgent — AI phone agent connected to your business tools ».

## 10. Glossaire — CHINOIS SIMPLIFIÉ (zh-CN, ponctuation pleine largeur ，。：；！？“”, espace entre CJK et chiffres/latin : « 24 小时 », « Retell AI（美国）»)
Lien d'évitement → 跳至正文 ; `aria-label="Menu"` → 菜单.
Nav : 首页 · 解决方案 · 关于我们 · 联系我们 (CTA).
Footer : 导航 / 解决方案 / 联系方式 ; 呼入电话 · 呼出电话 · 通话分析 · 工作流 ;
电子邮件 · 联系表单 ; 隐私政策 · 法律声明 · 服务条款 · 退款政策 · 管理我的 Cookie.
« © 2025 The Call Agent · Artigues-Près-Bordeaux, France » → « © 2025 The Call Agent · 法国 Artigues-Près-Bordeaux ».
Footer desc : « 能接听、理解并在您的工具中采取行动的 AI 电话客服——呼入与呼出，全天候 24/7。»
Retell `data-popup-message` : « 您好！我是 TheCallAgent 的 AI 助手。有什么可以帮您？»
CTA : 预约演示 · 查看解决方案 · 发送消息 · 联系我们.
Termes : agent téléphonique IA → AI 电话客服 · PME → 中小企业 · devis → 报价 ·
réservation → 预订 · rendez-vous → 预约 · fiche client → 客户档案 · standard → 前台/总机 ·
restauration → 餐饮 · immobilier → 房地产 · artisans → 手工业者/施工企业 · cabinet → 事务所 ·
entrants / sortants → 呼入 / 呼出 · workflow → 工作流 · CRM → CRM · 24h/24 → 全天候 ·
€ HT → 欧元（不含税）· données personnelles → 个人数据 · sous-traitant → 数据处理者 ·
responsable de traitement → 数据控制者 · traceurs → 跟踪器 · Cookie → Cookie ·
durée de conservation → 保存期限 · droit de rétractation → 撤销权 · consentement → 同意.
Titre de la page d'accueil : « TheCallAgent — 连接您业务工具的 AI 电话客服 ».
Les chiffres, KPI, dates (格式 2026 年 10 月 2 日) et noms propres latins restent.

## 11. Rapport final attendu (court)
Chemin écrit, nombre de lignes, et la liste (éventuellement vide) des éléments
que tu n'as pas su mapper. Rien d'autre : un script de vérification compare
ensuite la structure avec la page FR.
