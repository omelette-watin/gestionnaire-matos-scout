import { NotificationContext } from "@/contexts/NotificationContext"
import useContextAndErrorIfNull from "./useContextAndErrorIfNull"

const useNotif = () => useContextAndErrorIfNull(NotificationContext)

export default useNotif
