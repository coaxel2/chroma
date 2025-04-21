Chroma

Chroma est un cybercafé nouvelle génération articulé autour de trois univers :

Axe	Ce que nous proposons
☕ Café – Convivialité & détente	Baristas, boissons artisanales, brunch du week‑end
🎮 E‑sport – Gaming & compétitions	Tournois réguliers, coaching, PC / consoles haut de gamme
🎤 K‑pop – Culture & événements live	Retransmissions, playlists dédiées, mini‑concerts sur scène

Ce dépôt contient le site vitrine et la web‑app communautaire : pages statiques, système d’événements, extraits d’API, et un module i18n complet (FR / EN / KO).

⸻

Sommaire
	1.	Fonctionnalités
	2.	Stack & pré‑requis
	3.	Installation rapide
	4.	Arborescence du projet
	5.	Internationalisation (i18n)
	6.	Scripts utilitaires
	7.	Déploiement
	8.	Contribuer
	9.	Roadmap
	10.	Licence

⸻

Fonctionnalités
	•	Site multilingue FR / EN / KO avec i18next & jquery‑i18next
	•	Tournois (League of Legends, Valorant, Fortnite, etc.) : inscription, calendriers
	•	Feed d’actualités (cards, diffusions Twitch, intégrations médias)
	•	Pages dédiées : À propos, Événements, FAQ, Contact, Compte utilisateur
	•	Dark Theme par défaut, bascule CSS légère
	•	Animations (scroll header shrink, burger‑menu mobile)
	•	Scripts Node pour extraction & traduction automatique des chaînes

⸻

Stack & pré‑requis

Catégorie	Outils
Langages	HTML 5, CSS 3, ES 6
Librairies front	jQuery 3.6, FontAwesome 6
i18n	i18next + i18next‑http‑backend + jquery‑i18next
Node (min 18)	Scripts d’extraction & traduction, serveur local
Optionnel	VS Code + Live Server



⸻

Installation rapide

git clone https://github.com/coaxel2/chroma.git
cd chroma

# Installe les dépendances Node pour les scripts
npm install

# Lancer un serveur local (ex. with http‑server)
npx http-server -c‑1
# ou extension VS Code “Live Server”

Ouvre ensuite http://localhost:8080.

⸻

Arborescence du projet

chroma/
├── index.html             # page d'accueil
├── apropos.html           # café + e‑sport + k‑pop
├── actualites.html        # news détaillées
├── evenements.html        # agenda complet
├── contact.html
├── compte.html
├── faq.html
├── css/
│   └── style.css
├── js/
│   ├── script.js          # interactions générales
│   └── i18n-init.js       # (inclus dans index) init i18next
├── locales/
│   ├── fr/translation.json
│   ├── en/translation.json
│   └── ko/translation.json
├── json/
│   ├── fr.json            # dump brut extrait
│   └── en.json            # stub ou traduction
├── scripts/
│   ├── extract-translations.js
│   └── translate-fr-to-en.js
└── img/
    ├── actus, logos, etc.



⸻

Internationalisation (i18n)

Comment ça marche ?
	1.	Balises HTML : chaque texte traduisible porte data-i18n="clé".

<h1 data-i18n="hero.title">Bienvenue sur Chroma</h1>


	2.	JSON : les traductions se trouvent dans /locales/{lng}/translation.json.
	3.	Chargement :

i18next.use(i18nextHttpBackend).init(
  { fallbackLng: 'fr', backend: { loadPath: '/locales/{{lng}}/translation.json' } },
  () => { jqueryI18next.init(i18next, $); $('html.i18n').localize(); }
);


	4.	Switch de langue :

$('.lang-switch').on('click', e => {
  i18next.changeLanguage(e.target.dataset.lang, () => $('html.i18n').localize());
});



⸻

Scripts utilitaires

Script	Usage	Description
npm run extract(alias : node scripts/extract-translations.js)	extrait les data-i18n & génère fr.json	pour peupler rapidement la liste des chaînes
npm run translate(alias : node scripts/translate-fr-to-en.js)	traduit fr.json → en.json via OpenAI ou DeepL	nécessite la variable d’env. OPENAI_API_KEY ou DEEPL_API_KEY

Astuce : Commencez par un stub en.json identique, puis utilisez le script pour traduire en batch.

⸻

Déploiement
	1.	Build statique : pas de transpilation (HTML/CSS/JS pur).
	2.	Hébergement :
	•	GitHub Pages
	•	Netlify / Vercel (drag‑and‑drop)
	•	OU Nginx/Apache classique
	3.	Chemin des locales : assurez‑vous que /locales/** est bien servi côté prod (pas de 404).

⸻

Contribuer

git checkout -b feature/mon-feature
# code…
git commit -m "Add amazing feature"
git push origin feature/mon-feature

	•	Suivez la charte de noms de clés i18n (section.sousSection.cle).
	•	Préférez les PR atomiques (1 feature / 1 bug).
	•	Vérifiez la cohérence FR/EN/KO avant merge.

⸻

Roadmap
	•	Authentification complète (OAuth2 / Firebase)
	•	Dashboard organisateur (crud tournois)
	•	Mode sombre / clair dynamique
	•	Tests e2e (Playwright)
	•	PWA + notifications push

⸻

Licence

Ce projet est sous licence MIT — voir LICENSE pour plus d’informations.

⸻

“Chroma réunit passion, compétition et culture pop. Venez jouer, vibrer et partager !”
