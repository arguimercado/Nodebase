/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import "server-only"; // <-- ensure this file cannot be imported from the client

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createTRPCOptionsProxy,
  type TRPCQueryOptions,
} from "@trpc/tanstack-react-query";
import { cache } from "react";
import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(makeQueryClient);
export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const caller = appRouter.createCaller(createTRPCContext);

/**
 * Prefetches the provided TRPC query into the stable server-side query client.
 *
 * Uses the query options' key to determine whether to prefetch as an infinite query or a regular query.
 *
 * @param queryOptions - TRPC query options describing the query to prefetch; if the second segment of `queryKey` has `type: "infinite"`, the query is prefetched as an infinite query
 */
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient();

  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}

/**
 * Provides a React Query hydration boundary seeded with the server-side dehydrated cache.
 *
 * @param props.children - The React nodes to render inside the hydration boundary
 * @returns A React element that wraps `children` with a `HydrationBoundary` initialized from the query client's dehydrated state
 */
export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}