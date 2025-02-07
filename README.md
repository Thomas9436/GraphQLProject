# 🚀 Projet GraphQL – **Touitteur**  

## 📌 Description  

**Touitteur** est une plateforme de réseau social moderne, construite avec **GraphQL**, permettant aux utilisateurs de partager et d’interagir avec des articles en toute simplicité.  

L'objectif du projet est de fournir une API performante et flexible pour la gestion des utilisateurs, des articles et des interactions, tout en garantissant une expérience fluide grâce à une interface intuitive.  

---

## 👥 Équipe  

### 🔹 **Frontend**  
- KODIR Abdul  
- PEYREGNE Timothé

### 🔹 **Backend**  
- ROUX Thomas
- SEILLON Quentin

---

## ✨ Fonctionnalités  

### 🔐 **Authentification & Gestion des Utilisateurs**  
- Inscription et connexion sécurisées.  
- Gestion des sessions utilisateur.  

### 📝 **Gestion des Articles**  
- Création, lecture, mise à jour et suppression d’articles.  
- Affichage des articles avec :  
  - Auteur  
  - Contenu  
  - Commentaires  
  - Nombre de likes  

### 💬 **Interactions & Engagement**  
- Ajout de commentaires sur les articles.  
- Système de "like" pour réagir aux publications.  

### 🔍 **Navigation & Filtrage**  
- Affichage des derniers articles sur la page d’accueil.  
- Filtrage des articles par :  
  - Auteur  
  - Popularité (nombre de likes).  

---

## 🏗️ Stack Technologique  

- **Backend** : Node.js, GraphQL, Apollo Server  
- **Frontend** : React, Apollo Client  
- **Base de données** : SQLite 
- **Authentification** : JWT

---

## 📌 Installation & Démarrage  

1. **Cloner le projet**  
   `bash
   git clone https://github.com/Thomas9436/GraphQLProject & cd GraphQLProject
   `

2. **Installation des dépendances**  
   - Pour le backend  
     `bash
     cd server
     npm install
     `
   - Pour le frontend  
     `bash
     cd client
     npm install
     `

3. **Démarrer les serveurs**  
   - Lancer le backend  
     `bash
     cd server
     npm run dev
     `
   - Lancer le frontend  
     `bash
     cd client
     npm run server
     `

---

## 📖 Documentation API  

L’API GraphQL offre plusieurs requêtes, mutations et abonnements pour interagir avec la plateforme.  

### 🔹 `Query`  

- `loggedUser` : Récupère l'utilisateur actuellement connecté.  
- `getArticles` : Récupère la liste des articles avec leurs auteurs et interactions.  
- `getArticleById(id: ID!)` : Récupère un article spécifique avec ses commentaires.  
- `getCommentsByArticle(articleId: ID!)` : Récupère les commentaires d’un article donné.  

### 🔹 `Mutation`  

#### 🔸 Utilisateurs  
- `createUser(username: String!, password: String!)` : Inscrit un nouvel utilisateur.  
- `signIn(username: String!, password: String!)` : Connecte un utilisateur et retourne un token.  

#### 🔸 Articles  
- `createArticle(title: String!, content: String!)` : Crée un nouvel article.  
- `updateArticle(id: ID!, title: String, content: String)` : Met à jour un article existant.  
- `deleteArticle(id: ID!)` : Supprime un article.  

#### 🔸 Commentaires  
- `createComment(articleId: ID!, content: String!)` : Ajoute un commentaire à un article.  
- `updateComment(id: ID!, content: String!)` : Modifie un commentaire existant.  
- `deleteComment(id: ID!)` : Supprime un commentaire.  

#### 🔸 Likes  
- `createLike(articleId: ID!)` : Ajoute un "like" à un article.  
- `deleteLike(articleId: ID!)` : Supprime un "like" d’un article.  

### 🔹 `Subscription`  

- `likeUpdated(articleId: ID!)` : Notifie en temps réel lorsque le nombre de "likes" d’un article change.  

---

## 📅 Roadmap  

✅ Authentification des utilisateurs  
✅ Création et affichage des articles  
✅ Gestion des commentaires et des likes  
🚧 Implémentation du filtrage avancé  
🚧 Optimisation des performances  

---

## 🛠️ Contribuer  

Les contributions sont les bienvenues ! Suivez ces étapes pour participer :  

1. **Fork** le projet  
2. Créez une **branche** (`feature/nom-de-la-fonctionnalité`)  
3. Faites un **commit** avec un message clair  
4. **Push** vos modifications  
5. Ouvrez une **pull request**  

---

## 📜 Licence  

Ce projet est sous licence **MIT**.  

---

## 📬 Contact  

📧 Pour toute question ou suggestion, n’hésitez pas à nous contacter à **contact@touitteur.com**.
