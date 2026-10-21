# Antonio Brescia — Consulenza Energetica

Sito di consulenza energetica indipendente. Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript.

---

## Quick start

```bash
npm run dev       # http://localhost:3000
npm run build     # build di produzione (53 pagine statiche)
npm run start     # serve il build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```

Il sito è bilingue: ogni rotta è prefissata con il locale (`/it/...`, `/en/...`).
Le richieste senza prefisso vengono reindirizzate in base all'header `Accept-Language`
(`src/proxy.ts`).

---

## Modalità beta

Il sito nasce in **beta**: è una versione in costruzione, non ancora pubblicata.
Lo stato è governato da una variabile d'ambiente:

```bash
SITE_STATUS=beta   # default: banner "Beta", noindex, dati incompleti nascosti
SITE_STATUS=live   # sito definitivo: banner rimosso, indicizzabile
```

Qualsiasi valore diverso da `live` mantiene la modalità beta: una variabile
dimenticata non può pubblicare il sito per sbaglio.

In beta il sito:

- mostra un banner in cima a ogni pagina (`src/components/beta-banner.tsx`);
- si dichiara `noindex, nofollow` nei meta tag e in `robots.txt` (che blocca
  l'intero sito);
- **non pubblica i dati di contatto non confermati**: telefono, indirizzo
  completo, P.IVA e LinkedIn sono vuoti in `src/lib/site.ts` e le righe
  corrispondenti semplicemente non vengono renderizzate;
- non promette risposte che non arrivano: senza webhook/provider configurati i
  form avvisano che la richiesta è stata **registrata**, non inviata.

Per passare alla versione definitiva:

1. compila `src/lib/site.ts` con i dati reali (telefono, P.IVA, indirizzo,
   LinkedIn);
2. configura `NEXT_PUBLIC_SITE_URL` e i provider (vedi sotto);
3. imposta `SITE_STATUS=live` e riavvia/rebuilda.

Le dichiarazioni sui servizi (EGE, Lead Auditor ISO 50001, CMVP, ESG) e le
testimonianze restano **dimostrative** fino a quando non sono sostituite con
referenze reali e autorizzate: in beta sono comunque fuori dai motori di ricerca.

---

## Variabili d'ambiente

| Variabile | Dove | Serve |
| --- | --- | --- |
| `SITE_STATUS` | server | `beta` (default) o `live`. Alias: `NEXT_PUBLIC_SITE_STATUS`. |
| `NEXT_PUBLIC_SITE_URL` | build | Dominio canonico: serve a canonical, sitemap, Open Graph. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | build | Email di contatto. Default: `info@<dominio>`. |
| `CONTACT_WEBHOOK_URL` | runtime | Endpoint lead contatti (Formspree, Basin, …). |
| `NEWSLETTER_PROVIDER` | runtime | `brevo`, `mailchimp`, `mailjet` o vuoto (solo log). |
| `BREVO_API_KEY` / `BREVO_LIST_ID` | runtime | Provider newsletter Brevo. |
| `MAILCHIMP_API_KEY` / `MAILCHIMP_LIST_ID` | runtime | Provider newsletter Mailchimp. |
| `MAILJET_API_KEY` / `MAILJET_API_SECRET` / `MAILJET_LIST_ID` | runtime | Provider newsletter Mailjet. |

---

## Struttura

```
src/
├─ app/
│  ├─ [lang]/
│  │  ├─ page.tsx                 # home
│  │  ├─ contatti/                # form contatti
│  │  ├─ privacy/                 # privacy policy
│  │  ├─ servizi/
│  │  │  ├─ page.tsx              # indice servizi
│  │  │  └─ [slug]/page.tsx       # pagina di dettaglio servizio (6 pagine)
│  │  └─ blog/
│  │     ├─ page.tsx              # indice articoli
│  │     └─ [slug]/page.tsx       # articolo (6 pagine)
│  ├─ api/contact/route.ts        # endpoint lead contatti
│  ├─ api/newsletter/route.ts     # endpoint iscrizioni newsletter
│  ├─ sitemap.ts / robots.ts      # SEO
│  └─ opengraph-image.tsx
├─ components/                    # componenti UI (Server Components)
│  ├─ beta-banner.tsx             # banner di versione beta
│  ├─ calculator.tsx              # calcolatore risparmio energetico
│  └─ ...
├─ content/                       # ← CONTENUTI EDITORIALI (TS, non JSON)
│  ├─ types.ts
│  ├─ services.ts                 # 6 servizi, IT + EN
│  └─ posts.ts                    # 6 articoli, IT + EN
├─ lib/
│  ├─ content.ts                  # accessors + formattazione date
│  ├─ i18n.ts                     # locale, path localizzati
│  └─ site.ts                     # ⚠️ dati di contatto: DA COMPILARE + stato beta
├─ messages/                      # dizionari UI (it.json / en.json)
└─ proxy.ts                       # redirect locale
public/images/                    # fotografie e video (Wikimedia Commons)
```

---

## Design

Il frontend è stato riallineato alla **taste skill** (`design-taste-frontend`):
tipografia a cinque passi, nessuna card, nessun gradiente decorativo, nessuna
ombra su elementi fermi, sezioni con composizioni diverse, quattro fotografie
reali e un video.

- **Scala tipografica**: `--text-display` / `--text-article` / `--text-title` /
  `--text-subtitle` / `--text-lead` / `--text-body` / `--text-small` /
  `--text-micro`, definite in `src/app/globals.css` (Tailwind v4, CSS-first).
  Il corpo del testo è a 17px; niente sotto i 13px.
- **Live thing**: il calcolatore in `src/components/calculator.tsx` — l'ospite
  inserisce la spesa energetica annua e legge l'ordine di grandezza del
  risparmio. Il modello (8–15%) è dichiarato in pagina e non è un preventivo.
- **Immagini**: fotografie reali del mondo dell'energia scaricate da Wikimedia
  Commons, con credito in `public/images/credits.json` e crediti a piè di pagina
  in `src/messages/*.json` → `footer.photoCredits`. Le riprese mostrano impianti,
  cabine e la città: **non** ritraggono clienti.

| File | Credito | Licenza |
| --- | --- | --- |
| `aerial-picture-of-an-agrivoltaics-solar-plant.jpg` | Tobi Kellner | CC BY-SA 4.0 |
| `agrivoltaics-pilot-plant-at-heggelbach-farm-in.webm` (+ poster) | Tobi Kellner | CC0 |
| `pont-l-abbe-high-voltage-substation-18.jpg` | PtiBzh | CC0 |
| `pont-l-abbe-high-voltage-substation-14.jpg` | PtiBzh | CC0 |
| `full-milan-skyline-from-duomo-roof.jpg` | Daniel Case | CC BY-SA 3.0 |

Per rigenerare l'elenco dei crediti:

```bash
node .agents/skills/design-taste-frontend/scripts/assets.mjs --credits --to public/images
```

> Se in futuro si aggiungono foto proprie del consulente, sostituiscono quelle
> aperte: le immagini attuali servono a dare il materiale del mestiere, non a
> simulare un ritratto.

---

## Aggiungere un servizio

1. Apri `src/content/services.ts` e aggiungi l'oggetto all'array `it` **e** `en`
   (gli slug sono condivisi fra le due lingue: deve essere lo stesso string).
2. Il campo `relatedSlugs` referenzia altri slug del file.
3. Non serve toccare le rotte: `generateStaticParams` le deriva dagli slug.
4. Se il servizio deve comparire nella home, aggiungilo anche a
   `src/messages/it.json` e `en.json` in `services.items` (con il campo `slug`).

## Aggiungere un articolo

1. Apri `src/content/posts.ts` e aggiungi l'oggetto agli array `it` e `en`.
2. La `date` è un literal ISO (`YYYY-MM-DD`): non usare `new Date()`, altrimenti
   il prerender fallisce con Cache Components.
3. Lo slug compare automaticamente in sitemap, indice blog e pagina di dettaglio.

---

## SEO

- `src/app/sitemap.ts` genera le 34 URL (5 rotte + 6 servizi + 6 articoli, per
  entrambe le lingue) con `alternates.languages` per l'hreflang implicito.
- JSON-LD nativo (nessun plugin SEO): `Organization` e `WebSite` nel layout,
  `BreadcrumbList` + `Service` / `BlogPosting` + `FAQPage` nelle pagine.
  Vedi `src/components/json-ld.tsx`. I campi non confermati (telefono, indirizzo)
  vengono omessi, non pubblicati come stringhe vuote.
- Breadcrumb **visibile** in ogni pagina interna (`src/components/breadcrumbs.tsx`).
- In beta il sito è chiuso ai crawler: `robots.txt` disallowa `/` e le pagine
  rispondono `noindex`.

---

## Newsletter

Il form (`src/components/newsletter.tsx`) chiama `POST /api/newsletter`.
Il provider è configurabile via variabili d'ambiente; senza provider la
sottoscrizione viene loggata lato server, così nessuna lead va persa.

```bash
# .env.local
NEWSLETTER_PROVIDER=brevo
BREVO_API_KEY=...
BREVO_LIST_ID=...

# oppure
NEWSLETTER_PROVIDER=mailchimp
MAILCHIMP_API_KEY=...      # il data center si ricava dal suffisso della chiave
MAILCHIMP_LIST_ID=...

# oppure
NEWSLETTER_PROVIDER=mailjet
MAILJET_API_KEY=...
MAILJET_API_SECRET=...
MAILJET_LIST_ID=...
```

Il consenso (`consent: true`) è **obbligatorio**: senza, la richiesta viene
rifiutata con 422 e non viene inoltrata a nessun provider.

> Finché il provider non è configurato le iscrizioni finiscono solo nei log del
> server: la pagina lo dice ("Iscrizione registrata") invece di promettere una
> conferma che non verrebbe mai inviata. Prima di aprire il sito al pubblico
> configura un provider con **double opt-in**.

## Lead di contatti

```bash
CONTACT_WEBHOOK_URL=https://formspree.io/f/xxxx   # Formspree, Basin, ...
```

Se non è impostata, i lead vengono loggati nella console del server e il form
di contatti mostra un avviso analogo a quello della newsletter.

---

## Git e GitHub

Il repository ha una workflow CI (`.github/workflows/ci.yml`) che, su ogni push
a `main` e su ogni pull request, esegue `lint` → `typecheck` → `build`.

```bash
git switch -c feat/beta-site
git add -A
git commit -m "feat: versione beta del sito"
git remote add origin https://github.com/Bresciantonio/mio.git
```

Il repository GitHub è vuoto, quindi il primo caricamento va fatto in due passi
(`main` prima, perché sia la base della pull request):

```bash
git push -u origin main
git push -u origin feat/beta-site
```

Poi la pull request si apre da GitHub ("Compare & pull request" sul branch
`feat/beta-site`): la CI gira anche sui branch, quindi se il badge è verde la
PR è mergeabile.

> Per pushare serve un'autenticazione GitHub su questa macchina: non ci sono né
> chiavi SSH né token salvati nel keychain. Alternativa: `gh auth login` (GitHub
> CLI) oppure un Personal Access Token usato come password HTTPS.

---

## Da completare prima del lancio

- [ ] `src/lib/site.ts` — dominio, telefono, P.IVA, indirizzo, LinkedIn
      (i campi vuoti non vengono pubblicati: compilandoli compaiono da soli)
- [ ] `src/messages/*.json` → `testimonials` — le testimonianze sono **dimostrative**,
      sostituiscile con referenze reali e autorizzate (c'è già un avviso in pagina)
- [ ] `src/content/services.ts` — le dichiarazioni su EGE, Lead Auditor ISO 50001,
      CMVP ed ESG riprendono quelle del dizionario: verificale e correggile
- [ ] `NEXT_PUBLIC_SITE_URL` — usato per canonical, sitemap e Open Graph
- [ ] `src/app/opengraph-image.tsx` — personalizza l'immagine di anteprima
- [ ] Collega i form a un indirizzo reale e configura il double opt-in del provider
- [ ] `SITE_STATUS=live` — l'ultimo passo: toglie il banner e rende il sito
      indicizzabile
