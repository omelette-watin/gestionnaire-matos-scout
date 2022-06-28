import Head from "next/head"
import Logo from "./Logo"
import { ImQrcode } from "react-icons/im"
import { FaPen, FaSignInAlt } from "react-icons/fa"
import { ReactNode } from "react"
import Link from "next/link"

const SignWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-start space-y-8 space-x-0 bg-white py-8 lg:flex-row lg:space-y-0 lg:space-x-28">
        <div className="z-10 lg:ml-32">
          <div className="hidden lg:block">
            <Logo white xl />
            <p className="text-right font-semibold italic text-white">
              Gérer mon matos en un clic !
            </p>
          </div>
          <div className="lg:hidden">
            <Logo large />
            <p className="text-right text-xs font-medium italic text-emerald-600">
              Gérer mon matos en un clic !
            </p>
          </div>
        </div>
        <div className="z-10 rounded-lg bg-white px-2 py-6 text-center lg:px-4 lg:shadow-lg">
          {children || (
            <>
              <h2 className="mb-6 text-[40px] font-black">Connexion</h2>
              <div className="space-y-3 border-b border-gray-200 py-4">
                <Link href="/qrcode">
                  <a className="m-auto flex w-fit items-center space-x-3 rounded-3xl bg-emerald-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm">
                    <ImQrcode />
                    <span>J'ai un QR Code</span>
                  </a>
                </Link>
                <div className="font-semibold">ou</div>
                <Link href="/connexion">
                  <a className="m-auto flex w-fit items-center space-x-3 rounded-3xl bg-black px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm">
                    <FaSignInAlt />
                    <span>J'ai un identifiant</span>
                  </a>
                </Link>
              </div>
              <div className="space-y-5 py-5">
                <p>
                  Votre groupe n'est pas encore sur{" "}
                  <span className="font-bold text-emerald-600">MonMatos</span> ?
                </p>
                <Link href="/inscription">
                  <a className="m-auto flex w-fit items-center space-x-2 rounded-3xl border border-black bg-white px-5 py-1 text-lg shadow-lg transition hover:scale-[0.98] hover:shadow-sm">
                    <FaPen />
                    <span>J'inscris mon groupe</span>
                  </a>
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="fixed -top-[150vh] z-0 hidden h-[200vh] w-[200vh] rounded-full bg-slate-200 sm:-left-[145vw] sm:-top-[70vw] sm:h-[200vw] sm:w-[200vw] lg:block" />
        <div className="fixed -top-[160vh] z-0 hidden h-[200vh] w-[200vh] rounded-full bg-emerald-500 sm:-left-[152vw] sm:-top-[70vw] sm:h-[200vw] sm:w-[200vw] lg:block" />
      </div>
    </>
  )
}

export default SignWrapper
