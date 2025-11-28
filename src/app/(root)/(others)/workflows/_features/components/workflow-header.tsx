"use client";
import { EntityButton, EntityContent, EntityHeaderContainer, EntityHeaderTitle } from "@/components/shared/entities/entity-header";
import { useCreateWorkflow } from "../hooks/useWorkflow";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/globals/hooks/use-upgrade-modal";
import EntitySearch from "@/components/shared/entities/entity-search";
import { useEntitySearch } from "@/globals/hooks/use-entity-search";
import { useWorkflowsParams } from "../hooks/useWorkflowParams";




const WorkflowSearch = () => {

  const [params,setParams] = useWorkflowsParams();
  const {searchValue,onSearchValue} = useEntitySearch({
    params,
    setParams
  })
  
  return (
    <EntitySearch 
      placeholder="Search workflows" 
      value={searchValue} 
      onChange={onSearchValue} />
  )
}



const WorkflowHeader = ({ disabled }: { disabled?: boolean }) => {

  const {mutateAsync,isPending} = useCreateWorkflow();
  const { handleError, modal } = useUpgradeModal();
  const router = useRouter();
  
  const handleCreateNew = async () => {
    await mutateAsync(undefined,{
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      }
    });
  }

  return (
    <>
			{modal}
      <EntityHeaderContainer className="mb-4">
        <EntityContent>
				  <EntityHeaderTitle title="Workflows" description="Create and manage your workflows" />
				  <EntityButton label="New Workflow"  isCreating={isPending} onNew={handleCreateNew} />		
        </EntityContent>
        <WorkflowSearch />
			</EntityHeaderContainer>
    </>
  );
};
export default WorkflowHeader;
