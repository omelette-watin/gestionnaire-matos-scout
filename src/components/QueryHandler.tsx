import { ApolloError } from "@apollo/client"
import Loader from "./Loader"

const QueryHandler = ({
  loading,
  error,
  data,
  children,
  loadingComponent,
}: {
  loading: boolean
  error: ApolloError | undefined
  data: any
  children: JSX.Element
  loadingComponent?: JSX.Element
}): JSX.Element => {
  if (error) {
    return (
      <div className="my-10 text-center ">
        <p className="text-xl font-bold">Oups quelque chose a raté...</p>
        <p className="text-lg"> Veuillez réessayer plus tard.</p>
      </div>
    )
  }

  if (loading) {
    return (
      loadingComponent || (
        <div className="my-24 flex w-full justify-center">
          <Loader />
        </div>
      )
    )
  }

  if (!data) {
    return <p>Rien pour l'instant</p>
  }

  return children
}
export default QueryHandler
