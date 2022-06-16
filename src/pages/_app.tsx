import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import apolloClient from "@/lib/apolloClient"
import useGroup from "@/hooks/useGroup"
import LoadingPage from "@/components/LoadingPage"
import { GroupContextProvider } from "@/contexts/GroupContext"
import Layout from "@/components/Layout"

const AppContentWrapper = ({
  Component,
  pageProps,
  ...othersProps
}: AppProps) => {
  const { group, loading } = useGroup()

  if (loading) {
    return <LoadingPage />
  }

  if (!group) {
    return <p>Log to your group</p>
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} {...othersProps} />
      </Layout>
    </ApolloProvider>
  )
}
const App = (props: AppProps) => {
  return (
    <GroupContextProvider>
      <AppContentWrapper {...props} />
    </GroupContextProvider>
  )
}

export default App
