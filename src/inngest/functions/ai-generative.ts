import { inngest } from "../client";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";


const googleAi = createGoogleGenerativeAI();

export const aiWorkflow = inngest.createFunction(
   { id: "ai-request" },
   { event: "ai/request" },
   async ({ event, step }) => {
      const { steps } = await step.ai.wrap("gemini-generate-text", generateText,
         {
            system: "You are a helpful assistant that generates text based on user prompts.",
            prompt: "Help me write a short story about a robot learning to love.",
            model: googleAi('gemini-2.5-flash'),
         });

      return steps;

   }
);