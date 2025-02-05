# Étape 1 : Construction de l'application
FROM node:20-alpine AS build

WORKDIR /app

# Copier les fichiers du frontend
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install

COPY ./client/ .

# Construire l'application
RUN npm run build

# Étape 2 : Serveur Nginx pour servir le client
FROM nginx:alpine

# Copier le build généré par Vite vers le dossier de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port pour le client
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
