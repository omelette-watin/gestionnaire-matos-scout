import { Group } from "@/types/graphql"
import axios from "axios"
import { useRouter } from "next/router"
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
            setGroup(null)
            localStorage.removeItem("group")
          }
        } catch (error) {
          setGroup(null)
          localStorage.removeItem("group")
        }
      }

      setTimeout(() => setLoading(false), 700)
    })()

    return () => {
      setLoading(true)
    }
  }, [router.query.i])

  useEffect(() => {
    if (group) {
      router.replace(
        {
          pathname: router.pathname,
          query: null,
        },
        undefined
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group])

  return (
    <GroupContext.Provider value={{ group, setGroup, loading }}>
      {children}
    </GroupContext.Provider>
  )
}
