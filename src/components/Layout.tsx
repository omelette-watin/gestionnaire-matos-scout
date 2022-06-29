import useNotif from "@/hooks/useNotif"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import Logo from "./Logo"
import Notification from "./Notification"

const Layout = ({ children }: { children: ReactNode }) => {
  const { notification } = useNotif()
  const router = useRouter()
  const disconnect = () => {
    localStorage.removeItem("group")
    router.reload()
  }

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <div className="min-h-[101vh]">
        <div className="sticky top-0 z-20 flex justify-center border-b bg-white shadow-md">
          <div className="flex w-full items-center justify-between p-4 sm:w-[80%]">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
            <button type="button" onClick={disconnect}>
              Déconnecter
            </button>
          </div>
        </div>
        {children}
        <Notification response={notification} />
      </div>
    </>
  )
}

export default Layout
