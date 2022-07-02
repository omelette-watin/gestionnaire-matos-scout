import SignWrapper from "@/components/SignWrapper"
import { GetStaticProps } from "next"
import { useState } from "react"
import { useRouter } from "next/router"
import { FaArrowLeft, FaCheck, FaCopy } from "react-icons/fa"
import { GiForestCamp } from "react-icons/gi"
import classNames from "classnames"
import useGroup from "@/hooks/useGroup"
import { gql } from "apollo-server-micro"
import { useMutation } from "@apollo/client"

export const ADD_GROUP = gql`
  mutation createGroup($name: String!) {
    createGroup(name: $name) {
      code
      success
      message
      group {
        id
        name
        createdAt
      }
    }
  }
`

const Inscription = () => {
  const { setGroup, group } = useGroup()
  const router = useRouter()
  const goBack = () => router.push("/")
  const [value, setValue] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const handleChange = (e: any) => {
    setError(false)
    setValue(e.target.value)
  }
  const [createGroup] = useMutation(ADD_GROUP, {
    variables: {
      name: value,
    },
    onCompleted(data) {
      setGroup(data.createGroup.group)
      setSuccess(true)
      setSubmitting(false)
    },
    onError() {
      setError(true)
      setSubmitting(false)
    },
  })
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmitting(true)
    createGroup()
  }
  const copyGroupId = () => {
    if (group) {
      navigator.clipboard.writeText(group.id)
      setCopied(true)
    }
  }

  return (
    <SignWrapper>
      {!success && (
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center font-medium"
        >
          <h2 className="mb-3 w-[95%] text-left text-xl font-semibold">
            Ajouter votre groupe à{" "}
            <span className="font-bold text-emerald-600">MonMatos</span> !
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
              placeholder="Le nom de votre groupe"
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
            Oups quelque chose à raté, veuillez réessayer plus tard.
          </p>
          <p className="mt-1 w-[95%] text-left text-xs font-normal italic">
            * Vérifiez bien que votre groupe n'est pas déjà sur MonMatos pour
            éviter les duplicatas et les cafouillages.
          </p>
          <div className="mt-8 flex w-full items-center justify-between">
            <button
              type="button"
              onClick={goBack}
              className="m-auto flex w-fit items-center space-x-2 rounded-3xl bg-black px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
            >
              <FaArrowLeft size={20} />
              <span>Retour</span>
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="m-auto flex w-fit items-center space-x-2 rounded-3xl bg-emerald-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:bg-emerald-400"
            >
              <span>Inscription</span>
            </button>
          </div>
        </form>
      )}
      {success && (
        <div className="flex w-full flex-col items-center">
          <h2 className="mb-3 w-[95%] text-left text-xl font-semibold">
            Le groupe{" "}
            <span className="font-bold text-emerald-600">
              {group?.name || "Montmarte Saint Jean"}
            </span>{" "}
            a bien été créé !
          </h2>
          <p className="w-[95%] text-left">
            Voilà l'identifiant du groupe.{" "}
            <span className="font-bold text-blue-500">Copiez</span>-le et{" "}
            <span className="font-bold text-blue-500">partagez</span>-le avec
            vos co-chefs, il leur permettra de se connecter !
          </p>
          <div
            title="Cliquer pour copier"
            className="mt-6 cursor-pointer font-semibold"
            onClick={copyGroupId}
          >
            {group?.id || "c9bde6ed-9af0-4c7b-ad88-1a36234d5dbe"}
          </div>
          <p
            className={classNames("mt-1 text-left font-semibold", {
              "text-transparent": !copied,
              "text-emerald-500": copied,
            })}
          >
            Identifiant copié !
          </p>
          <div className="mt-5 flex w-full items-center justify-between">
            <button
              type="button"
              onClick={copyGroupId}
              className="m-auto flex w-fit items-center space-x-2 rounded-3xl bg-black px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
            >
              {!copied ? <FaCopy /> : <FaCheck />}
              <span>Copier</span>
            </button>
            <button
              disabled={!copied}
              onClick={() => router.push("/")}
              className="m-auto flex w-fit items-center space-x-2 rounded-3xl bg-emerald-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <span>C'est parti !</span>
            </button>
          </div>
        </div>
      )}
    </SignWrapper>
  )
}

export default Inscription

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      unprotected: true,
    },
  }
}
