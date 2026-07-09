# OKOCHA PRODUCTION

Application de recommandation musicale développée en Node.js dans le cadre du rattrapage Fullstack (HETIC, cours de Corto Dufour).

## Fonctionnalités

- Création de compte et connexion utilisateur (mots de passe hachés avec bcrypt, authentification par session)
- Choix d'un style musical parmi une liste de tags (Rock, Rap/Hip Hop, Pop, Jazz...)
- Récupération de 5 morceaux aléatoires correspondant au style choisi, via l'API Deezer
- Front responsive (adapté mobile et desktop)

## Stack technique

- Node.js / Express
- MySQL (via mysql2)
- bcrypt (hachage des mots de passe)
- express-session (gestion de la connexion)
- API Deezer (recherche de morceaux par genre)
- HTML / CSS / JavaScript natif côté front

## Prérequis

- Node.js (testé avec la v24)
- Un serveur MySQL local (MAMP, WAMP, XAMPP, ou une installation MySQL classique)
- Git

## Installation

1. Cloner le repo

```bash
git clone https://github.com/Okocha224/rattrapage-fullstack-hetic.git
cd rattrapage-fullstack-hetic
```

2. Installer les dépendances

```bash
npm install
```

3. Configurer la connexion à la base de données

Copier le fichier `config.js.ext` en `config.js` :

```bash
cp config.js.ext config.js
```

Puis remplir `config.js` avec tes propres informations de connexion MySQL :

```javascript
const config = {
  db: {
    host: "127.0.0.1",
    port: 8889,
    user: "root",
    password: "root",
    database: "music_reco_db",
  },
  sessionSecret: "remplace-par-une-phrase-secrete",
  listPerPage: 10,
};

module.exports = config;
```

Le `port` dépend de ton installation MySQL locale (souvent `8889` sur MAMP, `3306` sur une installation standard). `config.js` n'est jamais versionné sur Git (voir `.gitignore`).

4. Créer la base de données et les tables (migrations)

```bash
node migrations/dbCreate.js
node migrations/tableCreate.js
```

5. Démarrer le serveur

```bash
npm start
```

Le serveur démarre sur `http://localhost:3000`.

## Utilisation

1. Aller sur `http://localhost:3000`
2. Créer un compte, puis se connecter
3. Une fois connecté, tu es redirigé vers la page de découverte musicale
4. Choisir un style dans le menu déroulant, cliquer sur "Découvrir"
5. 5 morceaux aléatoires correspondant à ce style s'affichent, avec pochette, titre, artiste et un extrait audio quand il est disponible

## API utilisée

Ce projet utilise l'API publique de [Deezer](https://developers.deezer.com/api), qui ne nécessite aucune clé d'authentification ni inscription. Aucune configuration supplémentaire n'est donc nécessaire pour cette partie.

## Structure du projet

```
rattrapage-fullstack/
├── migrations/
│   ├── dbCreate.js
│   └── tableCreate.js
├── routes/
│   ├── auth.js
│   └── music.js
├── services/
│   ├── db.js
│   ├── authService.js
│   └── musicService.js
├── public/
│   ├── index.html
│   ├── dashboard.html
│   ├── css/style.css
│   └── js/
│       ├── app.js
│       └── dashboard.js
├── config.js.ext
├── index.js
└── package.json
```

## Sécurité

- Mots de passe hachés avec bcrypt, jamais stockés en clair
- Authentification par session (cookie signé côté serveur)
- Requêtes SQL paramétrées (protection contre l'injection SQL)
- `config.js` exclu du dépôt Git via `.gitignore`

