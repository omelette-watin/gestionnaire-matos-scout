import Head from "next/head"
import { ReactNode } from "react"
import Logo from "./Logo"

const SignWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-start space-y-8 space-x-0 bg-emerald-500 py-8 lg:flex-row lg:space-y-0 lg:space-x-20 lg:bg-white">
        <div className="z-10 lg:ml-32">
          <div className="hidden lg:block">
            <Logo white xl />
            <p className="text-right font-semibold italic text-white">
              Gérer mon matos en un clic !
            </p>
          </div>
          <div className="lg:hidden">
            <Logo large white />
            <p className="text-right text-xs font-medium italic text-white">
              Gérer mon matos en un clic !
            </p>
          </div>
        </div>
        {children}
        <div className="fixed -top-[150vh] z-0 hidden h-[200vh] w-[200vh] rounded-full bg-slate-200 sm:-left-[145vw] sm:-top-[70vw] sm:h-[200vw] sm:w-[200vw] lg:block" />
        <div className="fixed -top-[160vh] z-0 hidden h-[200vh] w-[200vh] rounded-full bg-emerald-500 sm:-left-[152vw] sm:-top-[70vw] sm:h-[200vw] sm:w-[200vw] lg:block" />
      </div>
    </>
  )
}

export default SignWrapper
