import { workflowsEditorRouter } from "@/app/(root)/(editor)/workflows/_features/servers/route";
import { workflowsRouter } from "@/app/(root)/(others)/workflows/_features/servers/routers";
import { createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  workflows: workflowsRouter,
  workflowEditor: workflowsEditorRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
