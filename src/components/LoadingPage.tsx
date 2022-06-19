import Head from "next/head"
import Loader from "./Loader"
import Logo from "./Logo"

const LoadingPage = () => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <div className="flex h-screen flex-col items-center justify-start pt-[20vh]">
        <Logo large />
        <div className="mt-20">
          <Loader />
        </div>
      </div>
    </>
  )
}

export default LoadingPage
