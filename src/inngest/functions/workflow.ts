import { inngest } from "@/inngest/client"


export const workflow = inngest.createFunction(
   { id: "workflow-function" },
   { event: "workflow/start" },
   async ({ event, step }) => {

      await step.run("initialize-workflow", async () => {
         console.log("Workflow initialized with event:", event);
      });
      

      return { success: true, message: "workflow completed" };
   },
);