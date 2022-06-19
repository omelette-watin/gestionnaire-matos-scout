import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"

let apolloClient: ApolloClient<NormalizedCacheObject>

if (process.env.NODE_ENV === "production") {
  apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
  })
} else {
  if (!global.apolloClient) {
    global.apolloClient = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      cache: new InMemoryCache(),
      ssrMode: typeof window === "undefined",
    })
  }

  apolloClient = global.apolloClient
}

export default apolloClient

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
})
