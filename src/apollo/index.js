import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_API_BASE_URL,
  cache: new InMemoryCache(),
});
