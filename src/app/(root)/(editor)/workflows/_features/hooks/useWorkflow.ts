import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { useTRPC } from "@/trpc/client";

export const useSuspenseWorkflow = (id: string) => {
  const trpc = useTRPC();
  return useSuspenseQuery(trpc.workflowEditor.getSingle.queryOptions({ id }));
};

/* 
  Hook to update the name of a workflow.
*/
export const useWorkflowUpdateName = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflowEditor.updateName.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" updated successfully!`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(trpc.workflowEditor.getSingle.queryOptions({ id: data.id }));
      },
      onError: (error) => {
        toast.error(`Failed to update workflow: ${error.message}`);
      },
    }),
  );
};


/* 
  Hook to update a workflow.
*/
export const useWorkflowUpdate = () => {
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  return useMutation(
    trpc.workflowEditor.update.mutationOptions({
      onSuccess: (data) => {
        toast.success(`Workflow "${data.name}" saved successfully!`);
        queryClient.invalidateQueries(trpc.workflows.getMany.queryOptions({}));
        queryClient.invalidateQueries(trpc.workflowEditor.getSingle.queryOptions({ id: data.id }));
      },
      onError: (error) => {
        toast.error(`Failed to save workflow: ${error.message}`);
      },
    }),
  );
};


