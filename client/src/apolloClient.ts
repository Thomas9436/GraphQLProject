// src/apolloClient.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Remplace cette URL par celle de ton serveur GraphQL
  cache: new InMemoryCache(),
});

export default client;