import type { Edge, Node } from "@xyflow/react";
import { TicketX } from "lucide-react";
import * as z from "zod";
import type { NodeType } from "@/generated/prisma/enums";
import prisma from "@/lib/prisma/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { workflowNodeSchema } from "../types/schema";

export const workflowsEditorRouter = createTRPCRouter({
  getSingle: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        include: {
          nodes: true,
          connections: true,
        },
      });

      //remap nodes
      const nodes: Node[] = workflow.nodes.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position as { x: number; y: number },
        data: (node.data as Record<string, unknown>) || {},
      }));

      //transform connections to edges
      const edges: Edge[] = workflow.connections.map((connection) => ({
        id: connection.id,
        source: connection.fromNodeId,
        target: connection.toNodeId,
        sourceHandle: connection.fromOutput,
        targetHandle: connection.toInput,
      }));

      return {
        id: workflow.id,
        name: workflow.name,
        nodes: nodes,
        edges: edges,
        createdAt: workflow.createdAt,
        updatedAt: workflow.updatedAt,
      };
    }),
  updateName: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return prisma.workflow.update({
        where: {
          id: input.id,
          userId: ctx.auth.user.id,
        },
        data: { name: input.name },
      });
    }),
  update: protectedProcedure
    .input(workflowNodeSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, nodes, edges } = input;

      const workflow = await prisma.workflow.findUniqueOrThrow({
        where: {
          id: id,
          userId: ctx.auth.user.id,
        },
      });

      //Transaction
      return await prisma.$transaction(async (tx) => {
        //Delete existing nodes and connections
        await tx.node.deleteMany({
          where: { workflowId: workflow.id },
        });

        //re-create new nodes
        await tx.node.createMany({
          data: nodes.map((node) => ({
            id: node.id,
            workflowId: id,
            name: node.type || "unknown",
            type: node.type as NodeType,
            position: node.position,
            data: node.data || {},
          })),
        });

        //re-create connections
        await tx.connection.createMany({
          data: edges.map((edge) => ({
            workflowId: id,
            fromNodeId: edge.source,
            toNodeId: edge.target,
            fromOutput: edge.sourceHandle || "main",
            toInput: edge.targetHandle || "main",
          })),
        });
        //Update workflow's updatedAt timestamp
        await tx.workflow.update({
          where: { id: id },
          data: { updatedAt: new Date() },
        });
        
        return workflow;
      });

    }),
});
