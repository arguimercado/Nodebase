import prisma from "@/lib/prisma/db";
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

    // await step.run("create-workflow", async () => {
    //   await prisma.workflow.create({
    //     data: {
    //       name: "From Ingest",
    //       createdAt: new Date(),
    //       updatedAt: new Date()
    //     }
    //   });
    // });
    return { message: `successfully created workflow` };
  },
);