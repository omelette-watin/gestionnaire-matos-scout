import Container from "@/components/Container"
import QueryHandler from "@/components/QueryHandler"
import TentCard from "@/components/TentCard"
import useGroup from "@/hooks/useGroup"
import { Tent } from "@/types/graphql"
import { useQuery } from "@apollo/client"
import { gql } from "apollo-server-micro"
import { FaPlus } from "react-icons/fa"
import type { NextPage } from "next"
import ExcelExport from "@/components/ExcelExport"
import Link from "next/link"

export const TENTS = gql`
  query getAllTentFromGroup($allTentsFromGroupId: ID!) {
    allTentsFromGroup(id: $allTentsFromGroupId) {
      id
      identifyingNum
      size
      unit
      state
      complete
      integrated
      location
      comments
    }
  }
`

const Home: NextPage = () => {
  const { group } = useGroup()
  const { data, loading, error } = useQuery(TENTS, {
    variables: { allTentsFromGroupId: group?.id },
  })

  return (
    <Container>
      <h1 className="my-6 text-5xl font-bold text-slate-900 lg:my-10">
        Groupe <span className="text-emerald-600">{group?.name}</span>
      </h1>

      <QueryHandler loading={loading} data={data} error={error}>
        <>
          <div className="flex justify-end space-x-4">
            <ExcelExport tents={data?.allTentsFromGroup} />

            <Link href="/tentes/ajouter">
              <a className="m-auto flex w-fit items-center space-x-2 rounded-3xl bg-black px-5 py-2 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm">
                <FaPlus />
                <span>Ajouter une tente</span>
              </a>
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data?.allTentsFromGroup?.map((tent: Tent) => (
              <TentCard tent={tent} key={tent.id} />
            ))}
          </div>
        </>
      </QueryHandler>
    </Container>
  )
}

export default Home
