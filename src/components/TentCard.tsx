import { Tent } from "@/types/graphql"
import Link from "next/link"
import TentInformation, { TentComplete, TentState } from "./TentInformation"

const TentCard = ({ tent }: { tent: Tent }) => {
  const { id, identifyingNum, unit, location, complete, state, size } = tent

  return (
    <article className="cursor-pointer rounded-lg border border-slate-900/10 shadow-lg transition-all hover:scale-[1.02]">
      <Link href={`/tentes/${id}`}>
        <a>
          <div className="space-y-6 p-4 pb-5">
            <div className="flex items-center space-x-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-800">
                <h2 className="text-2xl font-bold">{identifyingNum}</h2>
              </div>
              <div>
                <h3 className="text-lg font-bold leading-tight">
                  {unit || "GROUPE"}
                </h3>
                <p className="text-sm font-semibold ">{size} places</p>
              </div>
            </div>
            <div className="space-y-2">
              <TentState value={state} />
              <TentComplete value={complete} />
              <TentInformation label="Où ?" value={location} />
            </div>
          </div>
        </a>
      </Link>
    </article>
  )
}

export default TentCard
