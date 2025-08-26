# LinkedIn Post Generator

Une application web qui génère automatiquement des posts LinkedIn engageants à partir d'images et de captures d'écran, avec authentification utilisateur et sauvegarde des posts générés.

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
- **Authentification** : Supabase Auth
- **Base de données** : PostgreSQL avec Prisma ORM
- **Conteneurisation** : Docker

## Prérequis

- Node.js 18+
- Clé API OpenAI
- Compte Supabase (gratuit)

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
- Ajoutez votre clé API OpenAI et vos informations Supabase :
```
OPENAI_API_KEY=votre_cle_api_openai
NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_role_supabase
DATABASE_URL=votre_url_postgresql_supabase
```

4. Configurer la base de données avec Prisma
```bash
npx prisma db push
```

5. Lancer l'application en développement
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

1. Créez un compte ou connectez-vous avec Google
2. Importez votre image via drag & drop, en cliquant sur le bouton de sélection, ou en utilisant Ctrl+V pour coller une image
3. Choisissez le style d'écriture souhaité pour votre post
4. Cliquez sur "Générer un post LinkedIn"
5. Attendez quelques secondes pendant que l'IA analyse l'image et génère votre contenu
6. Copiez le texte généré et personnalisez-le si nécessaire
7. Publiez votre post sur LinkedIn en utilisant le bouton "Publier sur LinkedIn"
8. Consultez l'historique de vos posts générés dans la section "Historique"

## Remarques

- Les posts générés sont sauvegardés dans votre compte utilisateur
- L'application ne stocke pas les images téléversées
- La qualité des résultats dépend de la clarté du texte dans l'image
- Une clé API OpenAI valide est nécessaire pour le fonctionnement de l'application

## Configuration de Supabase

1. Créez un compte sur [Supabase](https://supabase.io)
2. Créez un nouveau projet
3. Dans les paramètres de votre projet, configurez l'authentification :
   - Activez le fournisseur "Google"
   - Configurez l'URL de redirection : `http://localhost:3000/auth/callback`
4. Copiez les clés API de Supabase (URL, anon key, service role key) dans votre fichier `.env.local`
5. Dans "Project Settings" > "Database", copiez l'URL de connexion PostgreSQL et ajoutez-la comme `DATABASE_URL` dans votre fichier `.env.local`

## Licence

MIT
