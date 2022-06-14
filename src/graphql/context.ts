/* eslint-disable no-unused-vars */
import { PrismaClient } from "@prisma/client"
import prisma from "../lib/prisma"

export type Context = {
  prisma: PrismaClient
}

export const createContext = async ({
  req,
  res,
}: {
  req: Request
  res: Response
}): Promise<Context> => {
  return {
    prisma,
  }
}
