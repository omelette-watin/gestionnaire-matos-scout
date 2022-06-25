import { TentResponse } from "@/types/graphql"
import { createContext, ReactNode, useState } from "react"

export interface NotificationContextType {
  notification: TentResponse | null
  // eslint-disable-next-line no-unused-vars
  setNotification: (notification: TentResponse) => void
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null)

export const NotificationContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [notification, setNotif] = useState<TentResponse | null>(null)
  const setNotification = (notification: TentResponse) => {
    setNotif(notification)
    setTimeout(() => setNotif(null), 4000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}
