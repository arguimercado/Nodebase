import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { aiWorkflow } from "@/inngest/functions/ai-generative";
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    aiWorkflow
  ],
});
