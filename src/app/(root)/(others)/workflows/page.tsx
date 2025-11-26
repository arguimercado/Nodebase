

import { prefetchWorkflows } from "@/app/(root)/(others)/workflows/_features/servers/prefetch";
import { requireAuth } from "@/lib/auth-util"
import { HydrateClient } from "@/trpc/server";
import { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary"

import { WorkflowContainer, WorkflowList } from "./_features/components";
import type { SearchParams } from "nuqs";
import { workflowParamsLoader } from "./_features/servers/params-loader";

type Props = {
  searchParams: Promise<SearchParams>;
}

const WorkflowPage = async ({searchParams} : Props) => {
  await requireAuth();

  const params = await workflowParamsLoader(searchParams);
  prefetchWorkflows(params);

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