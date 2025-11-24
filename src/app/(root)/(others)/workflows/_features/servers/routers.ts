import prisma from "@/lib/prisma/db";
import { generateSlug } from "random-word-slugs";
import { createTRPCRouter, premiumProcedure, protectedProcedure } from "@/trpc/init";
import * as z from "zod";

export const workflowsRouter = createTRPCRouter({
   create: premiumProcedure.mutation(async ({ ctx }) => {
      const data = {
         name: generateSlug(3, { format: "title" }),
         userId: ctx.auth.user.id,

      }

      return prisma.workflow.create({ data })
   }),
   remove: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
         return prisma.workflow.delete({
            where: {
               id: input.id,
               userId: ctx.auth.user.id
            }
         })
      }),
   updateName: protectedProcedure
      .input(z.object({ id: z.string(), name: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
         return prisma.workflow.update({
            where: {
               id: input.id,
               userId: ctx.auth.user.id
            },
            data: { name: input.name }
         })
      }),
   getSingle: protectedProcedure
      .input(z.object({ id: z.string().min(1) }))
      .query(({ ctx, input }) => {
         return prisma.workflow.findUnique({
            where: {
               id: input.id,
               userId: ctx.auth.user.id
            }
         })
      }),
   getMany: protectedProcedure
      .query(({ ctx }) => {
         return prisma.workflow.findMany({
            where: {
               userId: ctx.auth.user.id
            }
         })
      })

})