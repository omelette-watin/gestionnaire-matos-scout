import SignWrapper from "@/components/SignWrapper"
import { GetStaticProps } from "next"
import { useState } from "react"
import { useRouter } from "next/router"
import { FaArrowLeft } from "react-icons/fa"
import { GiForestCamp } from "react-icons/gi"
import classNames from "classnames"
import axios from "axios"
import useGroup from "@/hooks/useGroup"

const Connexion = () => {
  const { setGroup } = useGroup()
  const router = useRouter()
  const goBack = () => router.push("/")
  const [value, setValue] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const handleChange = (e: any) => {
    setError(false)
    setValue(e.target.value)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const { data } = await axios.get(`/api/group?i=${value}`)

      if (!data?.group) {
        setError(true)
      } else {
        setGroup(data.group)
        goBack()
      }
    } catch (error) {
      setError(true)
    }

    setSubmitting(false)
  }

  return (
    <SignWrapper>
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col items-center font-medium"
      >
        <h2 className="mb-3 w-[95%] text-left text-xl font-semibold">
          Connectez-vous via l'identifiant de votre{" "}
          <span className="font-bold text-emerald-500">Groupe</span> !
        </h2>
        <div
          className={classNames(
            "flex w-[95%] items-center space-x-3 border-b-2 border-gray-200 py-2 text-lg",
            {
              "border-red-500 text-red-500": error,
            }
          )}
        >
          <GiForestCamp size={20} />
          <input
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Votre identifiant de groupe"
            className="w-full border-none text-black outline-none"
          />
        </div>
        <p
          className={classNames(
            "mt-1 w-[95%] text-right text-xs font-normal italic",
            {
              "text-transparent": !error,
              "text-red-500": error,
            }
          )}
        >
          Oups l'identifiant est incorrect, veuillez réessayer !
        </p>
        <p className="mt-1 w-[95%] text-left text-xs font-normal italic">
          * Si vous ne l'avez pas demandez-le à vos responsables matos ou
          scannez le QR Code d'une tente.
        </p>
        <div className="mt-8 flex w-full items-center justify-between">
          <button
            type="button"
            onClick={goBack}
            className="m-auto flex w-fit items-center space-x-2 rounded-3xl bg-black px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
          >
            <FaArrowLeft size={24} />
            <span>Retour</span>
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="m-auto flex w-fit items-center space-x-2 rounded-3xl bg-emerald-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:bg-emerald-400"
          >
            <span>Connexion</span>
          </button>
        </div>
      </form>
    </SignWrapper>
  )
}

export default Connexion

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      unprotected: true,
    },
  }
}
