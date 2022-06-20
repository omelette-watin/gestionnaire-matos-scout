import { TentResponse } from "@/types/graphql"
import classNames from "classnames"
import Link from "next/link"

const ActionResponseNotifier = ({
  response,
}: {
  response: TentResponse | null
}) => {
  return (
    <div
      className={classNames(
        "fixed left-1/2 bottom-8 z-50 w-fit -translate-x-1/2 transform space-x-3 rounded-lg p-2 text-center text-sm text-white shadow-md sm:py-3 sm:px-4 sm:text-base",
        {
          hidden: !response,
          "bg-red-400": !response?.success,
          "bg-blue-500": response?.success,
        }
      )}
    >
      {response?.message}
      {response?.tent?.id && (
        <Link href={`/tentes/${response?.tent?.id}`}>
          <a className="ml-1 font-bold underline underline-offset-2">Voir</a>
        </Link>
      )}
    </div>
  )
}

export default ActionResponseNotifier
