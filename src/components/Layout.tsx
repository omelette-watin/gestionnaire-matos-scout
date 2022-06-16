import Head from "next/head"
import Link from "next/link"
import { ReactNode } from "react"
import Logo from "./Logo"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>MyMatos</title>
      </Head>
      <div className="h-[200vh]">
        <div className="sticky top-0 z-20 flex justify-center border-b shadow-sm backdrop-blur-md">
          <div className="flex w-full items-center justify-between p-4 sm:w-[80%]">
            <Link href="/">
              <a>
                <Logo />
              </a>
            </Link>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}

export default Layout
