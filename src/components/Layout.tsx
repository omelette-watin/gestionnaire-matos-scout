import useNotif from "@/hooks/useNotif"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { FaSignOutAlt } from "react-icons/fa"
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
            <button
              type="button"
              onClick={disconnect}
              className="flex w-fit items-center space-x-2 rounded-3xl border-2 border-black p-2 text-lg text-black shadow-lg transition hover:scale-[0.98] hover:shadow-sm "
            >
              <FaSignOutAlt />
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
