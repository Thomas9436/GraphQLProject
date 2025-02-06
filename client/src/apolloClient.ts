// src/apolloClient.ts
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';

// URL de ton serveur GraphQL
const uri = 'http://localhost:4000/graphql'; // Remplace par l'URL de ton serveur

// Créer une instance de HttpLink pour communiquer avec ton serveur GraphQL
const httpLink = new HttpLink({ uri });

// Créer un ApolloLink pour ajouter le token d'authentification dans chaque requête
const authLink = ApolloLink.from([
  (operation, forward) => {
    // Récupère le token JWT si disponible (localStorage, sessionStorage ou autre)
    const token = localStorage.getItem('token'); // Exemple avec localStorage

    // Si un token est présent, on l'ajoute dans les headers, sinon on ne fait rien
    if (token) {
      operation.setContext({
        headers: {
          Authorization: `Bearer ${token}`, // Ajouter Bearer token si disponible
        },
      });
    }

    return forward(operation); // Continuer la requête
  },
]);

// Créer l'instance du client Apollo avec le cache et le link combiné
const client = new ApolloClient({
  link: authLink.concat(httpLink), // AuthLink ajouté avant HttpLink
  cache: new InMemoryCache(),
});

export default client;