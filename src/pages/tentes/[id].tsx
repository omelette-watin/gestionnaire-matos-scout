import Container from "@/components/Container"
import TentContainer from "@/components/TentContainer"
import { client } from "@/lib/apolloClient"
import { Tent } from "@/types/graphql"
import { gql } from "apollo-server-micro"
import { GetServerSideProps } from "next"

const TentPage = ({ tent }: { tent: Tent }) => {
  return (
    <Container>
      {tent ? (
        <TentContainer tent={tent} />
      ) : (
        <div className="my-10 text-center text-lg font-bold">
          <p>Oups il semblerait qu'il n'y ait pas de tente ici !</p>
        </div>
      )}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await client.query({
    query: gql`
      query Query($tentId: ID!) {
        tent(id: $tentId) {
          id
          identifyingNum
          size
          unit
          state
          complete
          integrated
          location
          comments
          updatedAt
        }
      }
    `,
    variables: {
      tentId: params?.id,
    },
  })

  return {
    props: {
      tent: data.tent,
    },
  }
}

export default TentPage
