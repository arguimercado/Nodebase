"use client";
import EntityPagination from "@/components/shared/entities/entity-pagination";
import { useSuspenseGetWorkflows } from "../hooks/useWorkflow"
import { useWorkflowsParams } from "../hooks/useWorkflowParams";

const WorkflowPagination = () => {
   const workflows = useSuspenseGetWorkflows();
   const [params,setParams] = useWorkflowsParams();

   
  return (
    <EntityPagination 
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({...params,page})}
    />
  )
}
export default WorkflowPagination