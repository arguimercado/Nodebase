import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorContainer } from "@/components/shared/entities";
import DataLoader from "@/components/shared/entities/data-loader";
import { requireAuth } from "@/lib/auth-util";
import { HydrateClient } from "@/trpc/server";
import WorkflowEditor from "../_features/components/workflow-editor";
import WorkflowEditorHeader from "../_features/components/workflow-editor-header";
import { prefetchWorkflow } from "../_features/servers/prefetch";

interface WorkflowPageProps {
  params: Promise<{ workflowId: string }>;
}

const WorkflowPage = async ({ params }: WorkflowPageProps) => {
  await requireAuth();

  const { workflowId } = await params;
  prefetchWorkflow(workflowId);

  return (
    <Suspense fallback={<DataLoader message="Loading Workflow..." />}>
      <HydrateClient>
        <ErrorBoundary
          fallback={
            <ErrorContainer
              variant="destructive"
              title="Failed to Load Data"
              message="We couldn't fetch your data from the server. Check your internet connection and try again."
            />
          }
        >
          <WorkflowEditorHeader workflowId={workflowId} />
          <WorkflowEditor workflowId={workflowId} />
        </ErrorBoundary>
      </HydrateClient>
    </Suspense>
  );
};
export default WorkflowPage;
