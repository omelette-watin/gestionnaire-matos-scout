import {
  ApolloClient,
  DefaultOptions,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client"

let apolloClient: ApolloClient<NormalizedCacheObject>
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
}

if (process.env.NODE_ENV === "production") {
  apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    cache: new InMemoryCache(),
    ssrMode: typeof window === "undefined",
    defaultOptions,
  })
} else {
  if (!global.apolloClient) {
    global.apolloClient = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
      cache: new InMemoryCache(),
      ssrMode: typeof window === "undefined",
      defaultOptions,
    })
  }

  apolloClient = global.apolloClient
}

export default apolloClient

export const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
  cache: new InMemoryCache(),
  ssrMode: typeof window === "undefined",
  defaultOptions,
})
