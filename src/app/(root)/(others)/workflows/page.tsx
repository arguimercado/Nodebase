import { prefetchWorkflows } from "@/app/(root)/(others)/workflows/_features/servers/prefetch";
import { requireAuth } from "@/lib/auth-util";
import { HydrateClient } from "@/trpc/server";

import { ErrorBoundary } from "react-error-boundary";

import { WorkflowContainer, WorkflowHeader, WorkflowList } from "./_features/components";
import { type SearchParams } from "nuqs";
import { workflowParamsLoader } from "./_features/servers/params-loader";
import DataLoader from "@/components/shared/entities/data-loader";
import { Suspense } from "react";
import { EntityContainer, ErrorContainer } from "@/components/shared/entities";

type Props = {
  searchParams: Promise<SearchParams>;
};

const WorkflowPage = async ({ searchParams }: Props) => {
  
  await requireAuth();

  const params = await workflowParamsLoader(searchParams);
  prefetchWorkflows(params);

  return (
    <>
      <EntityContainer
          header={<WorkflowHeader />}
        />
      <Suspense fallback={<DataLoader message="Loading Workflow..." />}>
          <HydrateClient>
            <ErrorBoundary fallback={<ErrorContainer
              variant="destructive"
              title="Failed to Load Data"
              message="We couldn't fetch your data from the server. Check your internet connection and try again."
              />}>
                <section className="w-full px-4">
                  <WorkflowList />
                </section>
            </ErrorBoundary>
          </HydrateClient>
      </Suspense>
    </>
  );
};
export default WorkflowPage;
