import Container from "@/components/Container"
import { client } from "@/lib/apolloClient"
import { Tent } from "@/types/graphql"
import { gql } from "apollo-server-micro"
import { GetServerSideProps } from "next"
import { MdArrowBackIosNew } from "react-icons/md"
import Link from "next/link"
import TentUpdateForm from "@/components/TentUpdateForm"

const TentPage = ({ tent }: { tent: Tent }) => {
  return (
    <Container>
      {tent ? (
        <TentUpdateForm tent={tent} />
      ) : (
        <div className="my-10 flex flex-col items-center space-y-8">
          <p className="text-xl font-bold">
            Oups il semblerait qu'il n'y ait pas de tente ici !
          </p>
          <Link href="/">
            <a className="flex w-fit items-center space-x-2 rounded-md bg-emerald-500 px-3 py-1 text-lg text-white shadow-lg transition hover:scale-[0.98] hover:shadow-sm">
              <MdArrowBackIosNew />
              <span>Revenir aux tentes</span>
            </a>
          </Link>
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
