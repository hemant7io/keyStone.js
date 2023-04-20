import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const httplink = createHttpLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: "include",
});

// const authLink = setContext((_, { headers }) => {
//   let token = localStorage.getItem("token");
//   console.log(token);
//   return {
//     headers: {
//       ...headers,
//     },
//   };
// });

const client = new ApolloClient({
  link: httplink,
  cache: new InMemoryCache(),
  headers: {
    mode: "no-cors",
  },
});
export default client;
