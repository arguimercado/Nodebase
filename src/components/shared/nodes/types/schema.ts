import * as z from "zod";

export const httpRequestNodeSchema = z.object({
   url: z.url("Invalid URL"),
   method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
   headers: z.record(z.string(), z.any()).optional(),
   body: z.string().optional(),
});

export type HttpRequestNodeFormValues = z.infer<typeof httpRequestNodeSchema>;