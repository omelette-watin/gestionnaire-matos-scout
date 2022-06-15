import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"

let apolloClient: ApolloClient<NormalizedCacheObject>

if (process.env.NODE_ENV === "production") {
  apolloClient = new ApolloClient({
    uri: "http://localhost:3000/api/graphql",
    cache: new InMemoryCache(),
  })
} else {
  if (!global.apolloClient) {
    global.apolloClient = new ApolloClient({
      uri: "http://localhost:3000/api/graphql",
      cache: new InMemoryCache(),
    })
  }

  apolloClient = global.apolloClient
}

export default apolloClient
