import * as z from "zod";

export const workflowNodeSchema = z.object({
   id: z.string(),
   nodes: z.array(
      z.object({
         id: z.string(),
         type: z.string().nullish(),
         position: z.object({ x: z.number(), y: z.number() }),
         data: z.record(z.string(),z.any()).optional(),

      })
   ),
   edges: z.array(z.object({
      source: z.string(),
      target: z.string(),
      sourceHandle: z.string().nullish(),
      targetHandle: z.string().nullish(),
   })),
});