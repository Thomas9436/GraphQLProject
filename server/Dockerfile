# Étape 1 : Construction de l'application
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers de configuration package.json et package-lock.json
COPY ./server/package.json ./server/package-lock.json ./
RUN npm install

# Copier tout le code source dans le conteneur
COPY ./server/ .

# Installer Prisma et générer les fichiers
RUN npx prisma generate

# Compiler les fichiers TypeScript dans le dossier 'dist'
RUN npm run compile  

# Étape 2 : Exécution de l'application
FROM node:20-alpine

WORKDIR /app

# Copier les fichiers construits depuis l'étape précédente, y compris le dossier 'dist'
COPY --from=build /app .

# Exposer le port de l'API
EXPOSE 4000

# Exécuter l'application en utilisant le script "start" du package.json
CMD ["npm", "run", "start"]
