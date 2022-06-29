import { Tent } from "@/types/graphql"
import { gql } from "apollo-server-micro"
import { useRouter } from "next/router"
import { useMutation } from "@apollo/client"
import useNotif from "@/hooks/useNotif"
import { useState } from "react"
import { FaTrashAlt, FaArrowLeft } from "react-icons/fa"

export const DELETE_TENT = gql`
  mutation Mutation($deleteTentId: ID!) {
    deleteTent(id: $deleteTentId) {
      code
      success
      message
      tent {
        identifyingNum
      }
    }
  }
`

const TentDeleteForm = ({ tent }: { tent: Tent }) => {
  const router = useRouter()
  const { setNotification } = useNotif()
  const [submitting, setSubmitting] = useState(false)
  const [deleteTent] = useMutation(DELETE_TENT, {
    variables: {
      deleteTentId: tent.id,
    },
    onCompleted(data) {
      setNotification(data.deleteTent)
      setSubmitting(false)
      router.push("/")
    },
    onError() {
      setNotification({
        code: 400,
        success: false,
        message: "Quelque chose a raté, veuillez réessayer plus tard",
        tent: null,
      })
      setSubmitting(false)
    },
  })
  const handleCancel = () => router.back()
  const handleDelete = () => deleteTent()

  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="flex items-center space-x-3">
        <div className="text-3xl font-bold sm:text-5xl">Tente n°</div>
        <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-800 sm:h-24 sm:w-24">
          <div className="text-3xl font-bold sm:text-4xl">
            {tent.identifyingNum}
          </div>
        </div>
      </h2>
      <div className="text-center ">
        <p className="text-xl font-semibold">
          Souhaitez-vous vraiment{" "}
          <span className="font-bold text-red-500">supprimer</span> cette tente
          ?
        </p>
        <p className="text-sm italic">Cette action est irreversible</p>
      </div>

      <button
        type="button"
        onClick={handleDelete}
        disabled={submitting}
        className="flex w-fit items-center space-x-2 rounded-3xl bg-red-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:bg-red-400"
      >
        <FaTrashAlt />
        <span>Supprimer</span>
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="flex w-fit items-center space-x-2 rounded-3xl bg-gray-400 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
      >
        <FaArrowLeft />
        <span>Annuler</span>
      </button>
    </div>
  )
}

export default TentDeleteForm
