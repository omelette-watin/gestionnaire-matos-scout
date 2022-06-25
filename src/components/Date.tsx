import { parseISO, format } from "date-fns"

export const Date = ({ date }: { date: string }) => {
  return <time>{format(parseISO(date), "d/MM/y à H'h'mm")}</time>
}
