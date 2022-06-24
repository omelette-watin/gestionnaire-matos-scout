import Container from "@/components/Container"
import { useQuery, gql } from "@apollo/client"
import useGroup from "@/hooks/useGroup"
import QueryHandler from "@/components/QueryHandler"
import TentCreateForm from "@/components/TentCreateForm"

export const GET_UNUSUABLE_NUM = gql`
  query getUnusuableNums($allTentsFromGroupId: ID!) {
    allTentsFromGroup(id: $allTentsFromGroupId) {
      identifyingNum
    }
  }
`

const CreateTent = () => {
  const { group } = useGroup()
  const { data, loading, error } = useQuery(GET_UNUSUABLE_NUM, {
    variables: {
      allTentsFromGroupId: group?.id,
    },
  })

  return (
    <Container>
      <QueryHandler data={data} loading={loading} error={error}>
        <TentCreateForm
          groupId={group?.id}
          existingIdNums={data?.allTentsFromGroup}
        />
      </QueryHandler>
    </Container>
  )
}

export default CreateTent
