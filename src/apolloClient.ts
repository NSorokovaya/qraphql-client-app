import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import auth from "./utils/auth";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: auth.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
