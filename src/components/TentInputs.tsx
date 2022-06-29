import { State, Unit } from "@/types/graphql"
import classNames from "classnames"
import { LabelWrapper } from "./TentInformation"

export const TentStateInput = ({
  value,
  setValue,
}: {
  value: State
  // eslint-disable-next-line no-unused-vars
  setValue: (value: State) => void
}) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between rounded-md text-center font-semibold",
        {
          "bg-green-500": value === "NEUF",
          "bg-lime-500": value === "BON",
          "bg-red-500": value === "MAUVAIS",
          "bg-black": value === "INUTILISABLE",
        }
      )}
    >
      <LabelWrapper>État</LabelWrapper>
      <div className="w-full px-1 py-1 text-white">
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value as State)
          }}
          className="w-full border-none bg-transparent px-4 font-semibold outline-none"
        >
          <option value="INUTILISABLE" className="text-black">
            INUTILISABLE
          </option>
          <option value="MAUVAIS" className="text-black">
            MAUVAIS
          </option>
          <option value="BON" className="text-black">
            BON
          </option>
          <option value="NEUF" className="text-black">
            NEUF
          </option>
        </select>
      </div>
    </div>
  )
}

export const TentCompleteInput = ({
  value,
  setValue,
}: {
  value: boolean
  // eslint-disable-next-line no-unused-vars
  setValue: (value: boolean) => void
}) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between rounded-md text-center font-semibold",
        {
          "bg-green-400": value,
          "bg-red-400": !value,
        }
      )}
    >
      <LabelWrapper>Complète ?</LabelWrapper>
      <div className="w-full px-1 py-1 text-white">
        <select
          value={value ? "OUI" : "NON"}
          onChange={(e) => {
            setValue(e.target.value === "OUI" ? true : false)
          }}
          className="w-full border-none bg-transparent px-4 font-semibold outline-none"
        >
          <option value="OUI" className="text-black">
            OUI
          </option>
          <option value="NON" className="text-black">
            NON
          </option>
        </select>
      </div>
    </div>
  )
}

export const TentUnitInput = ({
  value,
  setValue,
}: {
  value: Unit
  // eslint-disable-next-line no-unused-vars
  setValue: (value: Unit) => void
}) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-200 text-center font-semibold">
      <LabelWrapper>Attribuée au{value !== "GROUPE" ? "x" : ""}</LabelWrapper>
      <div className="w-full px-1 py-1">
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value as Unit)
          }}
          className="w-full border-none bg-transparent px-4 font-semibold outline-none"
        >
          <option value="FARFADETS">FARFADETS</option>
          <option value="LOUVETEAUX">LOUVETEAUX</option>
          <option value="JEANNETTES">JEANNETTES</option>
          <option value="SCOUTS">SCOUTS</option>
          <option value="GUIDES">GUIDES</option>
          <option value="PIONNIERS">PIONNIERS</option>
          <option value="CARAVELLES">CARAVELLES</option>
          <option value="GROUPE">GROUPE</option>
        </select>
      </div>
    </div>
  )
}

export const TentSizeInput = ({
  value,
  setValue,
}: {
  value: number
  // eslint-disable-next-line no-unused-vars
  setValue: (value: number) => void
}) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-200 text-center font-semibold">
      <LabelWrapper>Taille</LabelWrapper>
      <div className="w-full px-1 py-1">
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value as unknown as number)
          }}
          className="w-full border-none bg-transparent px-4 font-semibold outline-none"
        >
          <option value={1}>1 place</option>
          <option value={2}>2 places</option>
          <option value={3}>3 places</option>
          <option value={4}>4 places</option>
          <option value={6}>6 places</option>
          <option value={8}>8 places</option>
          <option value={10}>10 places</option>
        </select>
      </div>
    </div>
  )
}

export const TentIntegratedInput = ({
  value,
  setValue,
}: {
  value: boolean
  // eslint-disable-next-line no-unused-vars
  setValue: (value: boolean) => void
}) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-200 text-center font-semibold">
      <LabelWrapper>Tapis de sol</LabelWrapper>
      <div className="w-full px-1 py-1">
        <select
          value={value ? "intégré" : "normal"}
          onChange={(e) => {
            setValue(e.target.value === "intégré" ? true : false)
          }}
          className="w-full border-none bg-transparent px-4 font-semibold outline-none"
        >
          <option value="intégré">intégré</option>
          <option value="normal">normal</option>
        </select>
      </div>
    </div>
  )
}

export const TentWhereInput = ({
  value,
  setValue,
}: {
  value: string
  // eslint-disable-next-line no-unused-vars
  setValue: (value: string) => void
}) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-200 text-center font-semibold">
      <LabelWrapper>Où ?</LabelWrapper>
      <div className="w-full px-1 py-1">
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
          }}
          className="w-full border-none bg-transparent px-4 font-semibold outline-none"
        >
          <option value="local">au local</option>
          <option value="église">à l'église</option>
          <option value="réparation">en réparation</option>
          <option value="autre">autre</option>
        </select>
      </div>
    </div>
  )
}
