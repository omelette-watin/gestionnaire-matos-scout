export const downloadImageFromCanvas = (id: string, filename: string) => {
  const canvas = document.getElementById(id)
  const pngUrl = (canvas as HTMLCanvasElement)
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream")
  let downloadLink = document.createElement("a")

  downloadLink.href = pngUrl
  downloadLink.download = `${filename}.png`
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}
