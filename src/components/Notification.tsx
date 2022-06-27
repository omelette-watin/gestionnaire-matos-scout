import { TentResponse } from "@/types/graphql"
import classNames from "classnames"
import { useEffect, useState } from "react"

const Notification = ({ response }: { response: TentResponse | null }) => {
  const [visible, setVisible] = useState(true)
  const hide = () => {
    setVisible(false)
  }

  useEffect(() => {
    setVisible(true)
  }, [response])

  return (
    <div
      onClick={hide}
      className={classNames(
        "fixed left-1/2 bottom-8 z-50 w-fit -translate-x-1/2 transform cursor-pointer space-x-3 rounded-lg p-2 text-center text-sm text-white shadow-md sm:py-3 sm:px-4 sm:text-base lg:left-4 lg:translate-x-0",
        {
          hidden: !response || !visible,
          "bg-red-400": !response?.success,
          "bg-blue-500": response?.success,
        }
      )}
    >
      {response?.message}
    </div>
  )
}

export default Notification
