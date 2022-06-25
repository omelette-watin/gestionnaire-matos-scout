import useNotif from "@/hooks/useNotif"
import Head from "next/head"
import Link from "next/link"
import { ReactNode } from "react"
import Logo from "./Logo"
import Notification from "./Notification"

const Layout = ({ children }: { children: ReactNode }) => {
  const { notification } = useNotif()

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
          </div>
        </div>
        {children}
        <Notification response={notification} />
      </div>
    </>
  )
}

export default Layout
