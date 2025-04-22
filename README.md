# Chroma

**Chroma** est un cyber‑café nouvelle génération mêlant  
☕ **Café**, 🎮 **E‑sport** et 🎤 **K‑Pop**.  
Ce dépôt contient **le site vitrine trilingue** (FR / EN / KO) ainsi que les
scripts d’outillage pour l’internationalisation.

---

## Sommaire

1. [Fonctionnalités](#fonctionnalités)
2. [Structure du dépôt](#structure-du-dépôt)
3. [Pré‑requis](#pré--requis)
4. [Installation & Lancement](#installation--lancement)
5. [Internationalisation (i18n)](#internationalisation-i18n)
6. [Scripts utilitaires](#scripts-utilitaires)
7. [Déploiement](#déploiement)
8. [Contribuer](#contribuer)
9. [Licence](#licence)

---

## Fonctionnalités

| Module                    | Détails                                                          |
| ------------------------- | ---------------------------------------------------------------- |
| **Site trilingue**        | Dossiers `htmlfr`, `htmlen`, `htmlko` + i18next / jquery‑i18next |
| **Tournois**              | Pages d’inscription, calendrier, résultats en direct             |
| **Actualités & Articles** | Feed dynamique avec images et liens « Lire plus »                |
| **Événements K‑Pop**      | Scène virtuelle, intégration playlist Spotify / YouTube          |
| **Mode responsive**       | Header qui se rétracte au scroll, burger menu mobile             |
| **Scripts Node**          | Extraction & traduction automatique des chaînes de texte         |

---

## Structure du dépôt

```
chroma/
├── css/                 # style.css principal
├── htmlfr/ ─┐           # pages FR (source)
├── htmlen/ ─┤           # pages EN
├── htmlko/ ─┘           # pages KO
├── img/                 # assets visuels
├── js/
│   ├── script.js        # logique front principale
│   └── i18n-init.js     # initialisation i18next (chargé dans chaque page)
├── locales/             # JSON de traduction (générés)
│   ├── fr/translation.json
│   ├── en/translation.json
│   └── ko/translation.json
├── json/                # dumps bruts (fr.json, en.json …)
├── scripts/             # outils Node
│   ├── extract-translations.js
│   └── translate-fr-to-en.js
└── README.md
```

---

## Pré‑requis

- **Node ≥ 18** (fetch natif)
- npm 8+
- Optionnel : VS Code + extension _Live Server_ pour le preview local

---

## Installation & Lancement

```bash
git clone https://github.com/coaxel2/chroma.git
cd chroma

# Installer les dépendances pour les scripts Node
npm install

# Démarrer un serveur local statique (exemple)
npx http-server -c-1
# ou via VS Code : clic‑droit “Open with Live Server”
```

Ouvre ensuite <http://localhost:8080> dans ton navigateur.

---

## Internationalisation (i18n)

Le tag `class="i18n"` est placé sur chaque balise `<html>`.
Chaque string traduisible porte un `data-i18n="clé"` :

```html
<h1 data-i18n="hero.title">Bienvenue sur Chroma</h1>
```

Les JSON de traduction se trouvent dans `locales/{lng}/translation.json`.

Initialisation :

```html
<script src="https://unpkg.com/i18next@22/dist/umd/i18next.min.js"></script>
<script src="https://unpkg.com/i18next-http-backend@2/dist/umd/i18nextHttpBackend.min.js"></script>
<script src="https://unpkg.com/jquery-i18next@1/dist/umd/jquery-i18next.min.js"></script>
<script src="js/i18n-init.js"></script>
```

---

## Scripts utilitaires

| Script                                 | Usage                                                | Description |
| -------------------------------------- | ---------------------------------------------------- | ----------- |
| `node scripts/extract-translations.js` | extrait toutes les clés `data-i18n` → `json/fr.json` |
| `node scripts/translate-fr-to-en.js`   | traduit `fr.json` → `en.json` via OpenAI (ou DeepL)  |

> **⚠️** Définir la variable `OPENAI_API_KEY` ou `DEEPL_API_KEY` avant exécution.

---

## Déploiement

```
# build statique = rien à transpiler
rsync -av --delete ./ /var/www/chroma
```

Tout hébergeur statique (GitHub Pages, Netlify, Vercel) fonctionne,
à condition de servir le dossier `locales/`.

---

## Contribuer

1. Forkez puis créez une branche :
   ```bash
   git checkout -b feature/ma-feature
   ```
2. Faites vos modifications + tests.
3. Envoyez une Pull‑Request claire (1 feature ou bug fix par PR).
4. Vérifiez que les trois fichiers de traductions restent synchrones.

---

## Roadmap

- [ ] Auth complet (OAuth2 + Firebase)
- [ ] Tableau de bord organisateur (CRUD tournois)
- [ ] PWA & notifications push
- [ ] Tests E2E Playwright

---

## Licence

Code publié sous licence **MIT** — voir [`LICENSE`](LICENSE).

---

> _« Chroma : là où café, gaming et K‑pop se rencontrent. »_
