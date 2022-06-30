import Container from "@/components/Container"
import QueryHandler from "@/components/QueryHandler"
import useGroup from "@/hooks/useGroup"
import { useQuery } from "@apollo/client"
import { gql } from "apollo-server-micro"
import type { NextPage } from "next"
import TentsContainer from "@/components/TentsContainer"

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
        <TentsContainer tents={data?.allTentsFromGroup} />
      </QueryHandler>
    </Container>
  )
}

export default Home
