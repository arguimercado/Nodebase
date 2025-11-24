import { createTRPCRouter } from '../init';

import { workflowsRouter } from '@/app/(root)/(others)/workflows/_features/servers/routers';



export const appRouter = createTRPCRouter({
  workflows: workflowsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;