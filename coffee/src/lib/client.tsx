/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import {ApolloClient, HttpLink, InMemoryCache} from '@apollo/client';

const serverAddress = `http://localhost:3000/graphql`;

console.log(serverAddress);
// Initialize Apollo Client
const client = new ApolloClient({
  link: new HttpLink({
    uri: serverAddress,
  }),
  cache: new InMemoryCache(),
});

export default client;
