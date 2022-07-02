import { State, Tent, Unit } from "@/types/graphql"
import TentCard from "./TentCard"
import { MdFilterListAlt, MdRefresh } from "react-icons/md"
// import { TbArrowsSort } from "react-icons/tb"
import { IoMdClose } from "react-icons/io"
import ExcelExport from "./ExcelExport"
import { FaPlus } from "react-icons/fa"
import Link from "next/link"
import { useEffect, useState } from "react"
import { filterArr } from "@/lib/utilsFns"
import classNames from "classnames"
import { TentSizeInput, TentStateInput, TentUnitInput } from "./TentInputs"

const TentsContainer = ({ tents }: { tents: Tent[] }) => {
  const [wantedTents, setWantedTents] = useState(tents)
  const [unitFilter, setUnitFilter] = useState<Unit | null>(null)
  const [stateFilter, setStateFilter] = useState<State | null>(null)
  const [sizeFilter, setSizeFilter] = useState<number | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const applyFilter = () => {
    setShowFilters(false)

    if (!unitFilter && !stateFilter && !sizeFilter) {
      setWantedTents(tents)
    } else {
      setWantedTents(
        filterArr(
          tents,
          (tent: Tent) =>
            (sizeFilter ? tent.size === sizeFilter : true) &&
            (unitFilter ? tent.unit === unitFilter : true) &&
            (stateFilter ? tent.state === stateFilter : true)
        )
      )
    }
  }
  const cleanFilters = () => {
    setSizeFilter(null)
    setUnitFilter(null)
    setStateFilter(null)
  }
  const toggleFilterVisibility = () => setShowFilters((prev) => !prev)

  useEffect(() => {
    if (showFilters) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [showFilters])

  return (
    <div className="pb-10">
      <div className="mt-10 flex flex-col font-medium lg:mt-5 lg:flex-row lg:justify-between">
        <div className="order-2 flex items-center space-x-4 lg:order-1">
          <button
            type="button"
            onClick={toggleFilterVisibility}
            className="flex w-fit items-center space-x-2 rounded-3xl bg-blue-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
          >
            <MdFilterListAlt />
            <span>Filtrer</span>
          </button>
        </div>
        <div className="order-1 mb-5 flex flex-col space-y-5 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4 lg:order-2 lg:mb-0">
          <ExcelExport tents={tents} />
          <Link href="/tentes/ajouter">
            <a className="flex w-fit items-center space-x-2 rounded-3xl bg-black px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm">
              <FaPlus />
              <span>Ajouter une tente</span>
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wantedTents.map((tent: Tent) => (
          <TentCard tent={tent} key={tent.id} />
        ))}
      </div>
      {!wantedTents.length && (
        <div className="mt-8 flex items-center justify-center text-xl font-medium text-gray-400">
          <p>Aucune tente ne correspond à vos critères !</p>
        </div>
      )}
      <div
        className={classNames(
          "fixed inset-0 z-50 items-start justify-center overflow-y-scroll overscroll-contain bg-black/30 text-white",
          {
            hidden: !showFilters,
            flex: showFilters,
          }
        )}
        onClick={toggleFilterVisibility}
      >
        <div
          className="h-fit min-h-screen w-full bg-white p-4 pb-6 text-black sm:mt-24 sm:h-fit sm:min-h-0 sm:w-[400px] sm:rounded-lg sm:shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <IoMdClose
              size={20}
              className="cursor-pointer"
              onClick={toggleFilterVisibility}
            />
          </div>
          <div className="flex w-full flex-col items-center">
            <h2 className="mb-7 text-3xl font-bold">Filtrer les tentes</h2>
            <div className="w-full space-y-2">
              <TentUnitInput
                value={unitFilter}
                setValue={setUnitFilter}
                label="Par unité"
              />
              <TentStateInput
                value={stateFilter}
                setValue={setStateFilter}
                label="Par état"
              />
              <TentSizeInput
                value={sizeFilter}
                setValue={setSizeFilter}
                label="Par taille"
              />
            </div>

            <div className="flex w-full items-center justify-around">
              <button
                type="button"
                onClick={applyFilter}
                className="mt-5 flex w-fit items-center space-x-2 rounded-3xl bg-blue-500 px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
              >
                <MdFilterListAlt />
                <span>Appliquer les filtres</span>
              </button>
              <div
                className="mt-5 flex w-fit cursor-pointer items-center space-x-2 rounded-full bg-black p-3 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm"
                onClick={cleanFilters}
              >
                <MdRefresh size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TentsContainer
