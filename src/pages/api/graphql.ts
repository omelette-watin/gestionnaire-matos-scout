import { ApolloServer, gql } from "apollo-server-micro"
import Cors from "micro-cors"
import resolvers from "@/graphql/resolvers"
import { createContext } from "@/graphql/context"

const typeDefs = gql`
  scalar Date

  type Tent {
    id: ID!
    identifyingNum: Int!
    size: Int!
    unit: Unit!
    state: State!
    complete: Boolean!
    integrated: Boolean!
    location: String!
    comments: String
    createdAt: Date!
    updatedAt: Date
    groupId: String!
    group: Group!
  }

  enum Unit {
    FARFADETS
    JEANNETTES
    LOUVETEAUX
    GUIDES
    SCOUTS
    PIONNIERS
    CARAVELLES
    GROUPE
  }

  enum State {
    INUTILISABLE
    MAUVAIS
    BON
    NEUF
  }

  type TentResponse {
    code: Int!
    success: Boolean!
    message: String!
    tent: Tent
  }

  type Mutation {
    createTent(
      identifyingNum: Int!
      size: Int!
      unit: Unit
      state: State!
      complete: Boolean
      integrated: Boolean
      location: String
      comments: String
      groupId: String!
    ): TentResponse
    updateTent(
      id: ID!
      identifyingNum: Int
      size: Int
      unit: Unit
      state: State
      complete: Boolean
      integrated: Boolean
      location: String
      comments: String
      groupId: String
    ): TentResponse
    deleteTent(id: ID!): TentResponse
  }

  type Query {
    allTentsFromGroup(id: ID!): [Tent!]!
    tent(id: ID!): Tent
  }
  type Group {
    id: ID!
    name: String!
    createdAt: String!
    tents: [Tent!]!
  }

  type Query {
    groups: [Group!]!
    group(id: ID!): Group
  }
`
const cors = Cors()
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
})
const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end()

    return false
  }

  await startServer

  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res)
})

export const config = {
  api: {
    bodyParser: false,
  },
}
