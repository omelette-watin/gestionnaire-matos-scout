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
        const { data } = await axios.get(`/api/group?i=${groupId}`)

        if (data.group) {
          setGroup(data.group)
          localStorage.setItem("group", data.group.id)
        } else {
          localStorage.removeItem("group")
        }
      }

      setTimeout(() => setLoading(false), 1700)
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
