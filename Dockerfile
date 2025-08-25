FROM node:18-alpine AS base

# Répertoire de travail
WORKDIR /app

# Installation des dépendances
FROM base AS deps
COPY package.json ./
RUN npm install

# Construction de l'application
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Définition d'une variable d'environnement pour la clé OpenAI (à remplacer lors du lancement)
ENV OPENAI_API_KEY="your_openai_api_key_here"
RUN npm run build

# Configuration de production
FROM base AS runner
ENV NODE_ENV production

# Utilisateur non-root pour plus de sécurité
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Port exposé
EXPOSE 3000

# Variables d'environnement
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Commande de démarrage
CMD ["node", "server.js"]
