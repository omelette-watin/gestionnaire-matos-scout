/* eslint-disable no-unused-vars */
/* eslint-disable no-var */

import { ApolloClient } from "@apollo/client"
import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient
  var apolloClient: ApolloClient
}

export {}
