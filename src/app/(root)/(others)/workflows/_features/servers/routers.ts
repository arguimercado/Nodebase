import * as z from "zod";
import { PAGINATION } from "@/config/constants";
import prisma from "@/lib/prisma/db";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { workflowFormSchema } from "../types/schema";
import { NodeType } from "@/generated/prisma/enums";



export const workflowsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(workflowFormSchema)
    .mutation(async ({ ctx, input }) => {
      const data = {
        name: input.name,
        userId: ctx.auth.user.id,
        nodes: {
          create: {
            type: NodeType.INITIAL,
            position: {x: 0, y: 0},
            name: NodeType.INITIAL,
            
          }
        }
      };

      return prisma.workflow.create({ data });
    }),
  remove: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return prisma.workflow.delete({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
      });
    }),
 
  
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(PAGINATION.DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(PAGINATION.MIN_PAGE_SIZE)
          .max(PAGINATION.MAX_PAGE_SIZE)
          .default(PAGINATION.DEFAULT_PAGE_SIZE),
        search: z.string().default(""),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;

      const whereClause = {
        userId: ctx.auth.user.id,
        name: {
          contains: search,
          mode: "insensitive",
        },
      } as any;
      const [items, totalCount] = await Promise.all([
        prisma.workflow.findMany({
          skip: (page - 1) * pageSize,
          take: pageSize,
          where: {
            ...whereClause,
          },
          orderBy: {
            updatedAt: "desc",
          },
        }),
        prisma.workflow.count({
          where: whereClause,
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const hasNextPage = page < totalPages;
      const hasPreviousPage = page > 1;

      return {
        items,
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      };
    }),
});
