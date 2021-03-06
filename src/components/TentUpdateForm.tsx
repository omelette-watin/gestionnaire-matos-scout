import { FaTrashAlt } from "react-icons/fa"
import { Tent } from "@/types/graphql"
import { useState } from "react"
import {
  TentCompleteInput,
  TentIntegratedInput,
  TentSizeInput,
  TentStateInput,
  TentUnitInput,
  TentWhereInput,
} from "./TentInputs"
import { FiSave } from "react-icons/fi"
import { gql } from "apollo-server-micro"
import { useMutation } from "@apollo/client"
import useNotif from "@/hooks/useNotif"
import { useRouter } from "next/router"
import Link from "next/link"

export const UPDATE_TENT = gql`
  mutation Mutation(
    $updateTentId: ID!
    $size: Int
    $unit: Unit
    $state: State
    $complete: Boolean
    $integrated: Boolean
    $location: String
    $comments: String
  ) {
    updateTent(
      id: $updateTentId
      size: $size
      unit: $unit
      state: $state
      complete: $complete
      integrated: $integrated
      location: $location
      comments: $comments
    ) {
      code
      success
      message
      tent {
        id
      }
    }
  }
`

const TentUpdateForm = ({ tent }: { tent: Tent }) => {
  const [comments, setComments] = useState(tent.comments)
  const [size, setSize] = useState(tent.size)
  const [state, setState] = useState(tent.state)
  const [location, setLocation] = useState(tent.location)
  const [unit, setUnit] = useState(tent.unit)
  const [complete, setComplete] = useState(tent.complete)
  const [integrated, setIntegrated] = useState(tent.integrated)
  const [submitting, setSubmitting] = useState(false)
  const { setNotification } = useNotif()
  const router = useRouter()
  const [updateTent] = useMutation(UPDATE_TENT, {
    variables: {
      updateTentId: tent.id,
      unit,
      size,
      state,
      complete,
      integrated,
      location,
      comments,
    },
    onCompleted(data) {
      setNotification(data.updateTent)
      setSubmitting(false)
      router.push(`/tentes/${data.updateTent.tent.id}`)
    },
    onError() {
      setNotification({
        code: 400,
        success: false,
        message: "Quelque chose a rat??, veuillez r??essayer plus tard",
        tent: null,
      })
      setSubmitting(false)
    },
  })
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setSubmitting(true)
    updateTent()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 py-5">
        <div className="flex flex-col items-center space-y-6">
          <h2 className="flex items-center space-x-3">
            <div className="text-3xl font-bold sm:text-5xl">Tente n??</div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-800 sm:h-24 sm:w-24">
              <div className="text-3xl font-bold sm:text-4xl">
                {tent.identifyingNum}
              </div>
            </div>
          </h2>
          <button
            type="submit"
            disabled={submitting}
            className="flex w-fit items-center space-x-2 rounded-3xl bg-emerald-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:bg-emerald-400"
          >
            <FiSave />
            <span>{submitting ? "Sauvegarde ..." : "Sauvegarder"}</span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-2 font-bold sm:w-1/2">
            <div className="py-2 font-normal italic">
              <p>
                Pour mettre ?? jour cette tente cliquez sur les ??l??ments que vous
                souhaitez changer.
              </p>
              <p>
                N'oubliez pas de{" "}
                <strong className="font-semibold text-emerald-500">
                  sauvegarder
                </strong>{" "}
                les modifications.
              </p>
            </div>
            <TentStateInput value={state} setValue={setState} />
            <TentCompleteInput value={complete} setValue={setComplete} />
            <TentUnitInput value={unit} setValue={setUnit} />
            <TentSizeInput value={size} setValue={setSize} />
            <TentIntegratedInput value={integrated} setValue={setIntegrated} />
            <TentWhereInput value={location} setValue={setLocation} />
            <div className="space-y-2 py-2">
              <h4 className="text-xl">Commentaires : </h4>
              <textarea
                rows={3}
                placeholder="Laisser un commentaire sur l'??tat de la tente (facultatif)"
                value={comments || ""}
                onChange={(e) => setComments(e.target.value)}
                className="w-full resize-none whitespace-pre-wrap break-words rounded-md border border-black p-2 pl-2 font-normal"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-6 flex w-fit items-center space-x-2 rounded-3xl bg-emerald-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:bg-emerald-400"
          >
            <FiSave />
            <span>{submitting ? "Sauvegarde ..." : "Sauvegarder"}</span>
          </button>
        </div>
        <div className="my-5 flex justify-center py-5">
          <Link href={`/tentes/supprimer/${tent.id}`}>
            <a className="flex w-fit items-center space-x-2 rounded-3xl bg-red-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm">
              <FaTrashAlt />
              <span>Supprimer cette tente</span>
            </a>
          </Link>
        </div>
      </div>
    </form>
  )
}

export default TentUpdateForm
