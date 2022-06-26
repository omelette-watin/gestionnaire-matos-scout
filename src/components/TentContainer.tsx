import { FiDownload } from "react-icons/fi"
import { FaPen, FaTrashAlt } from "react-icons/fa"
import { QRCodeCanvas } from "qrcode.react"
import useGroup from "@/hooks/useGroup"
import { downloadImageFromCanvas } from "@/lib/downloadFns"
import TentInformation, {
  TentComplete,
  TentState,
} from "@/components/TentInformation"
import { Tent } from "@/types/graphql"
import { useRouter } from "next/router"
import { Date } from "./Date"
import Link from "next/link"

const TentContainer = ({ tent }: { tent: Tent }) => {
  const { group } = useGroup()
  const router = useRouter()
  const {
    id,
    identifyingNum,
    unit,
    location,
    complete,
    state,
    size,
    comments,
    integrated,
    updatedAt,
  } = tent
  const downloadTentQR = () =>
    downloadImageFromCanvas("QR", `tente_${identifyingNum}`)
  const handleUpdate = () => router.push(`/tentes/modifier/${id}`)

  return (
    <>
      <div className="space-y-8 py-5">
        <div className="flex flex-col items-center space-y-6">
          <h2 className="flex items-center space-x-3">
            <div className="text-3xl font-bold lg:text-5xl">Tente n°</div>
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-800 sm:h-24 sm:w-24">
              <div className="text-3xl font-bold lg:text-4xl">
                {identifyingNum}
              </div>
            </div>
          </h2>
          <div className="flex items-center space-x-2 text-white">
            <button
              type="button"
              onClick={handleUpdate}
              className="flex items-center space-x-2 rounded-md bg-emerald-500 px-3 py-1 text-lg shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
            >
              <FaPen />
              <span>Modifier</span>
            </button>
            <button
              type="button"
              onClick={downloadTentQR}
              className="flex items-center space-x-2 rounded-md bg-black px-3 py-1 text-lg shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
            >
              <FiDownload />
              <span>QR Code</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="space-y-2 font-bold md:w-1/2">
            <div className="py-2">
              <h3 className="py-1 text-xl sm:text-2xl">
                Caractéristiques et informations
              </h3>
              <p className="font-medium">
                Dernière modification le <Date date={updatedAt} />
              </p>
            </div>

            <TentState value={state} />
            <TentComplete value={complete} />
            <TentInformation
              label={unit ? "Attribuée aux" : "Attribuée au"}
              value={unit || "GROUPE"}
            />

            <TentInformation
              label="Taille"
              value={`${size} place${size > 1 ? "s" : ""}`}
            />
            <TentInformation
              label="Tapis de sol"
              value={integrated ? "intégré" : "normal"}
            />
            <TentInformation label="Où ?" value={location} />
            <div className="space-y-2 py-2">
              {comments ? (
                <>
                  <h4 className="text-xl">Commentaires : </h4>
                  <div className="whitespace-pre-wrap break-words pl-2 font-normal">
                    " {comments} "
                  </div>
                </>
              ) : (
                <h4 className="font-normal italic text-gray-500 sm:text-lg">
                  Pas de commentaire pour l'instant ...
                </h4>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center py-5">
          <QRCodeCanvas
            id="QR"
            size={250}
            value={`${process.env.NEXT_PUBLIC_APP_URL}/tentes/${id}?i=${group?.id}`}
            includeMargin={true}
          />
          <p className="text-lg font-semibold">Tente n° {identifyingNum}</p>
          <button
            type="button"
            onClick={downloadTentQR}
            className="mt-4 flex items-center space-x-2 rounded-md bg-black px-3 py-1 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
          >
            <FiDownload />
            <span>Télécharger le QR Code</span>
          </button>
        </div>
        <div className="my-5 flex justify-center py-5">
          <Link href={`/tentes/supprimer/${id}`}>
            <a className="flex items-center space-x-2 rounded-md bg-red-500 px-3 py-1 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm">
              <FaTrashAlt />
              <span>Supprimer cette tente</span>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default TentContainer
