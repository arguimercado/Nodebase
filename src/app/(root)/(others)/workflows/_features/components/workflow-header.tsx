"use client";
import { EntityButton, EntityHeaderContainer, EntityHeaderTitle } from "@/components/shared/entities/entity-header";
import { useCreateWorkflow } from "../hooks/useWorkflow";
import { useRouter } from "next/navigation";
import { useUpgradeModal } from "@/globals/hooks/use-upgrade-modal";
import EntitySearch from "@/components/shared/entities/entity-search";

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
      <EntityHeaderContainer>
				<EntityHeaderTitle title="Workflows" description="Create and manage your workflows" />
        <EntitySearch value="" onChange={() => {}} placeholder="Search workflows" />
				<EntityButton label="New Workflow"  isCreating={isPending} onNew={handleCreateNew} />		
			</EntityHeaderContainer>

    </>
  );
};
export default WorkflowHeader;
