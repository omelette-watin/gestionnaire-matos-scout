import { Tent } from "@/types/graphql"
import * as XLSX from "xlsx"
import { RiFileExcel2Line } from "react-icons/ri"
import { filterArr, mapArr } from "@/lib/utilsFns"
import { useState } from "react"

const ExcelExport = ({ tents }: { tents: Tent[] }) => {
  const [submitting, setSubmitting] = useState(false)
  const formatedTents = mapArr(tents, (e: Tent) => {
    return {
      ["Numéro de Tente"]: e.identifyingNum,
      ["Unité"]: e.unit,
      ["Nombre de places"]: e.size,
      ["Tapis de sol intégré"]: e.integrated ? "OUI" : "NON",
      ["État"]: e.state,
      ["Complète"]: e.state,
      ["Commentaires"]: e.comments,
      ["Emplacement"]: e.location,
    }
  })
  const units = [
    "FARFADETS",
    "LOUVETEAUX",
    "JEANNETTES",
    "SCOUTS",
    "GUIDES",
    "PIONNIERS",
    "CARAVELLES",
    "GROUPE",
  ]
  const handleExport = () => {
    setSubmitting(true)
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(formatedTents)
    XLSX.utils.book_append_sheet(wb, ws, "GLOBAL")
    for (let i = 0; i < units.length; i++) {
      const ws = XLSX.utils.json_to_sheet(
        filterArr(formatedTents, (tent) => tent["Unité"] === units[i])
      )

      XLSX.utils.book_append_sheet(wb, ws, units[i])
    }
    XLSX.writeFile(wb, "Tentes_SVP.xlsx")
    setSubmitting(false)
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={submitting}
      className="flex items-center space-x-2 rounded-md bg-emerald-500 px-3 py-1 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
    >
      <RiFileExcel2Line />
      <span>Excel</span>
    </button>
  )
}

export default ExcelExport
