import { GroupContext } from "@/contexts/GroupContext"
import useContextAndErrorIfNull from "./useContextAndErrorIfNull"

const useGroup = () => useContextAndErrorIfNull(GroupContext)

export default useGroup
