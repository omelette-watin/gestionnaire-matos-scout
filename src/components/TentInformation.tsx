import { State } from "@/types/graphql"
import classNames from "classnames"
import { ReactNode } from "react"

export const LabelWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <span className="w-[90%] rounded-md rounded-r-none bg-slate-600 px-1 py-2 text-white">
      {children}
    </span>
  )
}
const TentInformation = ({ label, value }: { label: string; value: any }) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-gray-200 text-center font-semibold text-black">
      <LabelWrapper>{label}</LabelWrapper>
      <span className="w-full px-1 py-1">{value}</span>
    </div>
  )
}

export const TentComplete = ({ value }: { value: boolean }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between rounded-md text-center font-semibold text-white",
        {
          "bg-green-400": value,
          "bg-red-400": !value,
        }
      )}
    >
      <LabelWrapper>Complète ?</LabelWrapper>
      <span className="w-full px-1 py-1">{value ? "OUI" : "NON"}</span>
    </div>
  )
}

export const TentState = ({ value }: { value: State }) => {
  return (
    <div
      className={classNames(
        "flex items-center justify-between rounded-md text-center font-semibold text-white",
        {
          "bg-green-500": value === "NEUF",
          "bg-lime-500": value === "BON",
          "bg-yellow-300": value === "OK",
          "bg-orange-500": value === "MAUVAIS",
          "bg-red-500": value === "INUTILISABLE",
        }
      )}
    >
      <LabelWrapper>État</LabelWrapper>
      <span className="w-full px-1 py-1">{value}</span>
    </div>
  )
}

export default TentInformation
