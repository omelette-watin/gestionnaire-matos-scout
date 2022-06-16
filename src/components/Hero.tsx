import useGroup from "@/hooks/useGroup"
import Container from "./Container"

const Hero = () => {
  const { group } = useGroup()

  return (
    <Container>
      <h1 className="text-lg font-semibold text-slate-900">
        Groupe <span className="text-blue-600">{group?.name}</span>
      </h1>
    </Container>
  )
}

export default Hero
