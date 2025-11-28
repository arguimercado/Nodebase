
import {prefetch,trpc} from "@/trpc/server"
import { inferInput } from "@trpc/tanstack-react-query";

type Input = inferInput<typeof trpc.workflows.getMany>;

export const prefetchWorkflows = async (params: Input) => {
   //add timer delay to simulate network latency
   await new Promise(resolve => setTimeout(resolve, 1000));
   return prefetch(trpc.workflows.getMany.queryOptions(params));
}