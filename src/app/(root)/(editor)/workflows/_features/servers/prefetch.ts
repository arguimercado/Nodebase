import { prefetch, trpc } from "@/trpc/server";

export const prefetchWorkflow = async (id: string) => {
   return prefetch(trpc.workflowEditor.getSingle.queryOptions({id}));
}
   