# LinkedIn Post Generator

Une application web qui génère automatiquement des posts LinkedIn engageants à partir d'images et de captures d'écran.

## Fonctionnalités

- **Upload d'images** : drag & drop, bouton de sélection, ou copier-coller
- **Analyse d'image** : extraction de texte et analyse du contenu visuel
- **Génération de posts** : création de contenu LinkedIn original inspiré par l'image
- **Styles d'écriture** : choix parmi plusieurs styles (professionnel, inspirant, décontracté, etc.)
- **Copie facile** : bouton pour copier le post généré et lien direct vers LinkedIn

## Technologie utilisée

- **Frontend** : Next.js avec TypeScript et TailwindCSS
- **Backend** : API Routes de Next.js
- **IA** : OpenAI GPT-4o-mini pour l'analyse d'image et la génération de texte
- **Conteneurisation** : Docker

## Prérequis

- Node.js 18+
- Clé API OpenAI

## Configuration Git

Avant de commencer à contribuer au projet, configurez votre identité Git :

```bash
git config --global user.name "Christophe"
git config --global user.email "info@cs-info.fr"
```

## Installation

1. Cloner le dépôt
```bash
git clone <URL_DU_REPO>
cd linkedin-post-generator
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
- Créez un fichier `.env.local` en vous basant sur le fichier `.env`
- Ajoutez votre clé API OpenAI :
```
OPENAI_API_KEY=votre_cle_api_openai
```

4. Lancer l'application en développement
```bash
npm run dev
```
L'application sera accessible à l'adresse `http://localhost:3000`

## Utilisation avec Docker

1. Construire l'image Docker
```bash
docker build -t linkedin-post-generator .
```

2. Lancer le conteneur
```bash
docker run -p 3000:3000 -e OPENAI_API_KEY=votre_cle_api_openai linkedin-post-generator
```

L'application sera accessible à l'adresse `http://localhost:3000`

## Guide d'utilisation

1. Importez votre image via drag & drop, en cliquant sur le bouton de sélection, ou en utilisant Ctrl+V pour coller une image
2. Choisissez le style d'écriture souhaité pour votre post
3. Cliquez sur "Générer un post LinkedIn"
4. Attendez quelques secondes pendant que l'IA analyse l'image et génère votre contenu
5. Copiez le texte généré et personnalisez-le si nécessaire
6. Publiez votre post sur LinkedIn en utilisant le bouton "Publier sur LinkedIn"

## Remarques

- Cette application ne stocke pas vos images ni les posts générés
- La qualité des résultats dépend de la clarté du texte dans l'image
- Une clé API OpenAI valide est nécessaire pour le fonctionnement de l'application

## Licence

MIT
