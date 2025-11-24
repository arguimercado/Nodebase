

import { prefetchWorkflows } from "@/app/(root)/(others)/workflows/_features/servers/prefetch";
import { requireAuth } from "@/lib/auth-util"
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary"

import { WorkflowContainer, WorkflowList } from "./_features/components";


const WorkflowPage = async () => {
  await requireAuth();

  prefetchWorkflows();

  return (
    <WorkflowContainer>
      <HydrateClient>
        <ErrorBoundary fallback={<div>Something went wrong.</div>}>
          <Suspense fallback={<div>Loading workflows...</div>}>
            <WorkflowList />
          </Suspense>
        </ErrorBoundary>
      </HydrateClient>
    </WorkflowContainer>
  )
}
export default WorkflowPage