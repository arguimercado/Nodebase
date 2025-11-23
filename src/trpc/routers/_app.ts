import { inngest } from '@/inngest/client';
import { createTRPCRouter, protectedProcedure } from '../init';
import prisma from "@/lib/prisma/db"

const userModule = {
  getUsers: protectedProcedure
    .query(({ ctx }) => {
      return prisma.user.findMany({
        where: {
          id: ctx.auth.user.id
        }
      });
    })
}

const workflowModule = {
  getWorkflows: protectedProcedure
    .query(({ ctx }) => {
      return prisma.workflow.findMany();
    }),
  createWorkflow: protectedProcedure
    .mutation(async ({ ctx }) => {
      await inngest.send({
        name: "test/hello.world",
        data: { email: "arnold.mercado@hotmail.com" }
      })

      return { success: true, message: "Job queued" };
    })
}

const aiModule = {
  test: protectedProcedure
    .mutation(async () => {
      await inngest.send({
        name: "ai/request"
      })
      return { success: true, message: "Job Queued" };
    })
}


export const appRouter = createTRPCRouter({
  users: userModule,
  workflows: workflowModule,
  ai: aiModule,
});
// export type definition of API
export type AppRouter = typeof appRouter;