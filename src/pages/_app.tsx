import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { ApolloProvider } from "@apollo/client"
import apolloClient from "@/lib/apolloClient"
import useGroup from "@/hooks/useGroup"
import LoadingPage from "@/components/LoadingPage"
import { GroupContextProvider } from "@/contexts/GroupContext"
import Layout from "@/components/Layout"
import NProgress from "nprogress"
import Router from "next/router"
import { useEffect } from "react"
import { NotificationContextProvider } from "@/contexts/NotificationContext"
import SignWrapper from "@/components/SignWrapper"

NProgress.configure({
  showSpinner: false,
  easing: "ease",
  speed: 600,
})

const AppContentWrapper = ({
  Component,
  pageProps,
  ...othersProps
}: AppProps) => {
  const { group, loading } = useGroup()

  if (loading) {
    return <LoadingPage />
  }

  if (!group && !pageProps.unprotected) {
    return <SignWrapper />
  }

  if (!group && pageProps.unprotected) {
    return (
      <ApolloProvider client={apolloClient}>
        <NotificationContextProvider>
          <Component {...pageProps} {...othersProps} />
        </NotificationContextProvider>
      </ApolloProvider>
    )
  }

  return (
    <ApolloProvider client={apolloClient}>
      <NotificationContextProvider>
        <Layout>
          <Component {...pageProps} {...othersProps} />
        </Layout>
      </NotificationContextProvider>
    </ApolloProvider>
  )
}
const App = (props: AppProps) => {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start())
    Router.events.on("routeChangeComplete", () => NProgress.done())
    Router.events.on("routeChangeError", () => NProgress.done())
  }, [])

  return (
    <GroupContextProvider>
      <AppContentWrapper {...props} />
    </GroupContextProvider>
  )
}

export default App
