import Hero from "@/components/Hero"
import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <>
      <Hero />
    </>
  )
}

export default Home
// const downloadQR = () => {
//   const canvas = document.getElementById("QRCODE")
//   const pngUrl = (canvas as HTMLCanvasElement)
//     .toDataURL("image/png")
//     .replace("image/png", "image/octet-stream")
//   let downloadLink = document.createElement("a")
//   downloadLink.href = pngUrl
//   downloadLink.download = "123456.png"
//   document.body.appendChild(downloadLink)
//   downloadLink.click()
//   document.body.removeChild(downloadLink)
// }
