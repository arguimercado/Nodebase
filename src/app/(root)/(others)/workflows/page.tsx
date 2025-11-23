import WorkflowList from "@/features/workflows/components/workflows";
import { prefetchWorkflows } from "@/features/workflows/servers/prefetch";
import { requireAuth } from "@/lib/auth-util"
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary"


const WorkflowPage = async () => {
  await requireAuth();

  prefetchWorkflows();

  return (
    <HydrateClient>
      <ErrorBoundary fallback={<div>Something went wrong.</div>}>
        <Suspense fallback={<div>Loading workflows...</div>}>
          <WorkflowList />
        </Suspense>
      </ErrorBoundary>
    </HydrateClient>
  )
}
export default WorkflowPage