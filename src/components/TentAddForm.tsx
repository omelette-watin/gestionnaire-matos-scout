import { State, Tent, Unit } from "@/types/graphql"
import { useState } from "react"
import {
  TentCompleteInput,
  TentIntegratedInput,
  TentSizeInput,
  TentStateInput,
  TentUnitInput,
  TentWhereInput,
} from "@/components/TentInputs"
import { FiSave } from "react-icons/fi"
import { gql, useMutation } from "@apollo/client"
import classNames from "classnames"
import { LabelWrapper } from "./TentInformation"
import useNotif from "@/hooks/useNotif"
import { useRouter } from "next/router"

export const ADD_TENT = gql`
  mutation createTent(
    $identifyingNum: Int!
    $size: Int!
    $state: State!
    $unit: Unit
    $complete: Boolean
    $integrated: Boolean
    $location: String
    $comments: String
    $groupId: String!
  ) {
    createTent(
      identifyingNum: $identifyingNum
      size: $size
      state: $state
      unit: $unit
      complete: $complete
      integrated: $integrated
      location: $location
      comments: $comments
      groupId: $groupId
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

const TentAddForm = ({
  groupId,
  existingIdNums,
}: {
  groupId?: string
  existingIdNums: Tent[]
}) => {
  const [identifyingNum, setIdentifyingNum] = useState("")
  const [comments, setComments] = useState("")
  const [size, setSize] = useState(6)
  const [state, setState] = useState<State>("BON" as State)
  const [location, setLocation] = useState("local")
  const [unit, setUnit] = useState<Unit>("GROUPE" as Unit)
  const [complete, setComplete] = useState(true)
  const [integrated, setIntegrated] = useState(false)
  const notAllowedIdNum = existingIdNums.map(
    (tent: Tent) => tent.identifyingNum
  )
  const [validNum, setValidNum] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { setNotification } = useNotif()
  const router = useRouter()
  const formIsValid = validNum && identifyingNum
  const [createTent] = useMutation(ADD_TENT, {
    variables: {
      identifyingNum: parseInt(identifyingNum),
      unit,
      size,
      state,
      complete,
      integrated,
      location,
      comments,
      groupId,
    },
    onCompleted(data) {
      setNotification(data.createTent)
      setSubmitting(false)
      router.push(`/tentes/${data.createTent.tent.id}`)
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
  const handleNumChange = (e: any) => {
    const value = e.target.value
    const valueToInt = parseInt(value)

    if (notAllowedIdNum.includes(valueToInt) || !value) {
      setValidNum(false)
      setIdentifyingNum(value)
    } else {
      setValidNum(true)
      setIdentifyingNum(value)
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()
    setSubmitting(true)
    createTent()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-8 py-5">
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-3xl font-bold sm:text-5xl">Ajouter une tente</h2>
          <button
            type="submit"
            disabled={submitting || !formIsValid}
            className="flex w-fit items-center space-x-2 rounded-3xl bg-emerald-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:bg-gray-400"
          >
            <FiSave />
            <span>{submitting ? "Ajout ..." : "Ajouter"}</span>
          </button>
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-2 font-bold sm:w-1/2">
            <div className="py-2 font-normal italic">
              <p>
                Pour ajouter une tente, renseignez un{" "}
                <span className="font-semibold text-emerald-500">
                  numéro de tente
                </span>{" "}
                et cliquez sur les éléments pour changer les valeurs par défaut.
              </p>
            </div>
            <div
              className={classNames(
                "flex items-center justify-between rounded-md text-center font-semibold transition-colors",
                {
                  "bg-gray-200": !identifyingNum,
                  "bg-green-400 text-white": validNum && identifyingNum,
                  "bg-red-400 text-white": !validNum && identifyingNum,
                }
              )}
            >
              <LabelWrapper>Numéro de tente</LabelWrapper>
              <div className="flex w-full px-1 py-1">
                <input
                  type="number"
                  value={identifyingNum}
                  onChange={handleNumChange}
                  className="w-full rounded-md border-none bg-transparent px-2 outline-none placeholder:text-inherit"
                />
              </div>
            </div>
            <div
              className={classNames("text-sm font-semibold text-red-400", {
                hidden: validNum || !identifyingNum,
              })}
            >
              Ce numéro de tente est déjà utilisé, veuillez en choisir un autre
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
                placeholder="Laisser un commentaire sur l'état de la tente (facultatif)"
                value={comments || ""}
                onChange={(e) => setComments(e.target.value)}
                className="w-full resize-none whitespace-pre-wrap break-words rounded-md border border-black p-2 pl-2 font-normal"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            disabled={submitting || !formIsValid}
            className="flex w-fit items-center space-x-2 rounded-3xl bg-emerald-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm disabled:bg-gray-400"
          >
            <FiSave />
            <span>{submitting ? "Ajout ..." : "Ajouter"}</span>
          </button>
        </div>
      </div>
    </form>
  )
}

export default TentAddForm
