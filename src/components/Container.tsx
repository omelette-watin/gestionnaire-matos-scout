import { ReactNode } from "react"

const Container = ({ children }: { children: ReactNode }): JSX.Element => {
  return <div className="m-auto w-full p-4 sm:w-[80%]">{children}</div>
}

export default Container
