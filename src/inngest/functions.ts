import { inngest } from "./client";

import * as Sentry from "@sentry/react";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    Sentry.logger.info("User triggered test log", {log_source: "inngest_function"});
    await step.sleep("Fetching Video", "5s");
    await step.sleep("Processing Video", "5s");
    await step.sleep("Finalizing Video", "5s");

 
    return { message: `successfully created workflow` };
  },
);