import Container from "@/components/Container"
import { useQuery, gql } from "@apollo/client"
import useGroup from "@/hooks/useGroup"
import QueryHandler from "@/components/QueryHandler"
import TentAddForm from "@/components/TentAddForm"

export const GET_UNUSUABLE_NUM = gql`
  query getUnusuableNums($allTentsFromGroupId: ID!) {
    allTentsFromGroup(id: $allTentsFromGroupId) {
      identifyingNum
    }
  }
`

const AddTent = () => {
  const { group } = useGroup()
  const { data, loading, error } = useQuery(GET_UNUSUABLE_NUM, {
    variables: {
      allTentsFromGroupId: group?.id,
    },
  })

  return (
    <Container>
      <QueryHandler data={data} loading={loading} error={error}>
        <TentAddForm
          groupId={group?.id}
          existingIdNums={data?.allTentsFromGroup}
        />
      </QueryHandler>
    </Container>
  )
}

export default AddTent
