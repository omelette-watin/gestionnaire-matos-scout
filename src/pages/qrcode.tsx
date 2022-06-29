/* eslint-disable @next/next/no-img-element */
import SignWrapper from "@/components/SignWrapper"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { FaArrowLeft } from "react-icons/fa"

const QrCode = () => {
  const router = useRouter()
  const goBack = () => router.push("/")

  return (
    <SignWrapper>
      <div className="flex w-full flex-col items-center font-medium">
        <img
          src="/open-camera.png"
          alt="image d'un scan de QR Code"
          className="w-20 pb-3"
        />
        <p>
          Ouvrez votre{" "}
          <span className="font-bold text-emerald-500">caméra</span>
        </p>
        <img
          src="/qrcode-scan.jpeg"
          alt="image d'un scan de QR Code"
          className="scaning w-32"
        />
        <p>
          Scannez le <span className="font-bold text-emerald-500">QR Code</span>
        </p>
        <img
          src="/checked.svg"
          alt="image d'un scan de QR Code"
          className="w-14 py-5"
        />
        <p>C'est parti !</p>
        <button
          onClick={goBack}
          className="m-auto mt-10 flex w-fit items-center space-x-2 rounded-3xl bg-black px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
        >
          <FaArrowLeft size={20} />
          <span>Retour</span>
        </button>
      </div>
    </SignWrapper>
  )
}

export default QrCode

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      unprotected: true,
    },
  }
}
