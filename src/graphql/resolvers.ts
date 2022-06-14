import { Resolvers } from "@/types/graphql"
import { DateTimeResolver } from "graphql-scalars"

const resolvers: Resolvers = {
  Date: DateTimeResolver,
  Query: {
    tent: (_, { id }, ctx) => {
      return ctx.prisma.tent.findUnique({
        where: {
          id,
        },
      })
    },
    allTentsFromGroup: (_, { id }, ctx) => {
      return ctx.prisma.tent.findMany({
        where: {
          groupId: id,
        },
      })
    },
    group: (_, { id }, ctx) => {
      return ctx.prisma.group.findUnique({
        where: {
          id,
        },
      })
    },
    groups: (_, __, ctx) => {
      return ctx.prisma.group.findMany({})
    },
  },
  Mutation: {
    createTent: async (_, args, ctx) => {
      try {
        const tent = await ctx.prisma.tent.create({
          data: args,
        })

        return {
          code: 200,
          success: true,
          message: `La tente numéro ${tent.identifyingNum} a bien été créée !`,
          tent,
        }
      } catch (err: any) {
        return {
          code: 401,
          success: false,
          message: err.message,
          tent: null,
        }
      }
    },
    updateTent: async (_, args, ctx) => {
      try {
        const tent = await ctx.prisma.tent.update({
          where: {
            id: args.id,
          },
          data: args,
        })

        return {
          code: 200,
          success: true,
          message: `La tente numéro ${tent.identifyingNum} a bien été modifiée !`,
          tent,
        }
      } catch (err: any) {
        return {
          code: 401,
          success: false,
          message: err.message,
          tent: null,
        }
      }
    },
    deleteTent: async (_, { id }, ctx) => {
      try {
        const tent = await ctx.prisma.tent.delete({
          where: {
            id,
          },
        })

        return {
          code: 200,
          success: true,
          message: `La tente numéro ${tent.identifyingNum} a bien été supprimée !`,
          tent,
        }
      } catch (err: any) {
        return {
          code: 401,
          success: false,
          message: err.message,
          tent: null,
        }
      }
    },
  },
  Group: {
    tents: ({ id }, _, ctx) => {
      return ctx.prisma.tent.findMany({
        where: {
          groupId: id,
        },
      })
    },
  },
  Tent: {
    group: ({ groupId }, _, ctx) => {
      return ctx.prisma.group.findUnique({
        where: {
          id: groupId,
        },
      })
    },
  },
}

export default resolvers
