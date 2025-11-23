import { inngest } from "../client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

import * as Sentry from "@sentry/react";

const googleAi = createGoogleGenerativeAI();

export const aiWorkflow = inngest.createFunction(
   { id: "ai-request" },
   { event: "ai/request" },
   async ({ event, step }) => {
      
      Sentry.logger.info("User triggered test log", { log_source: "inngest_function" });

      const { steps } = await step.ai.wrap("gemini-generate-text", generateText,
         {
            system: "You are a helpful assistant that generates text based on user prompts.",
            prompt: "Define Machine Learning in simple terms. I am dummy who knows nothing about technology.",
            model: googleAi('gemini-2.5-flash'),
            experimental_telemetry: {
               isEnabled: true,
               recordInputs: true,
               recordOutputs: true,
            },
         });

      return { message: `AI request processed` };

   },

);