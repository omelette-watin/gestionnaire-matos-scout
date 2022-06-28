import { Group } from "@/types/graphql"
import axios from "axios"
import { NextRouter, useRouter } from "next/router"
import { createContext, ReactNode, useEffect, useState } from "react"

export interface GroupContextType {
  group: Group | null
  loading: boolean
  // eslint-disable-next-line no-unused-vars
  setGroup: (group: Group | null) => void
}

export const GroupContext = createContext<GroupContextType | null>(null)

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
  const [group, setGroup] = useState<Group | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const removeQueryParamsFromRouter = (
    router: NextRouter,
    removeList: string[] = []
  ) => {
    if (removeList.length > 0) {
      removeList.forEach((param) => delete router.query[param])
    }

    router.replace(
      {
        pathname: router.pathname,
        query: router.query,
      },
      undefined,
      { shallow: true }
    )
  }

  useEffect(() => {
    ;(async () => {
      const groupId =
        router.query.i || (localStorage.getItem("group") as string)

      if (groupId) {
        try {
          const { data } = await axios.get(`/api/group?i=${groupId}`)

          if (data.group) {
            setGroup(data.group)
            localStorage.setItem("group", data.group.id)
          } else {
            localStorage.removeItem("group")
          }
        } catch (error) {
          localStorage.removeItem("group")
        }
      }

      removeQueryParamsFromRouter(router, ["i"])
      setTimeout(() => setLoading(false), 700)
    })()

    return () => {
      setLoading(true)
    }
  }, [router.query.i])

  return (
    <GroupContext.Provider value={{ group, setGroup, loading }}>
      {children}
    </GroupContext.Provider>
  )
}
