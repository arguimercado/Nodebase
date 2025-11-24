import { workflowParams } from "@/globals/vars/params";
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { toast } from "sonner";

export const useSuspenseGetWorkflows = () => {
   
   const trpc = useTRPC();
   const [params] = useQueryStates(workflowParams);
   return useSuspenseQuery(trpc.workflows.getMany.queryOptions(params));
}

export const useCreateWorkflow = () => {
   const queryClient = useQueryClient();
   const trpc = useTRPC();

   return useMutation(trpc.workflows.create.mutationOptions({
      onSuccess: (data) => {
         toast.success(`Workflow "${data.name}" created successfully!`);
         queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
      },
      onError: (error) => {
         toast.error(`Failed to create workflow: ${error.message}`);
      }
   }))
}