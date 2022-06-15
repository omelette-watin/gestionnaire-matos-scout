import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import prisma from "@/lib/prisma"

const verifyGroup: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const id = req.query.i as string

  if (id) {
    const group = await prisma.group.findUnique({
      where: {
        id,
      },
    })

    if (group) {
      return res.status(200).json({ success: true, group })
    }

    return res
      .status(404)
      .json({ success: false, message: "No group found with this id" })
  }

  return res
    .status(401)
    .json({ success: false, message: "Please provide a group id in the query" })
}

export default verifyGroup
