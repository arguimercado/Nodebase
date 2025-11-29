"use client";
import { EntityButton, EntityContent, EntityHeaderContainer, EntityHeaderTitle } from "@/components/shared/entities/entity-header";
import { useCreateWorkflow } from "../hooks/useWorkflow";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/globals/hooks/use-upgrade-modal";
import EntitySearch from "@/components/shared/entities/entity-search";
import { useEntitySearch } from "@/globals/hooks/use-entity-search";
import { useWorkflowsParams } from "../hooks/useWorkflowParams";
import WorkflowFormDialog from "./workflow-form-dialog";




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

  
  return (
    <>
			
      <EntityHeaderContainer className="mb-4">
        <EntityContent>
				  <EntityHeaderTitle title="Workflows" description="Create and manage your workflows" />
				  <WorkflowFormDialog />
        </EntityContent>
        <WorkflowSearch />
			</EntityHeaderContainer>
    </>
  );
};
export default WorkflowHeader;
