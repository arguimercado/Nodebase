import type { NodeTypes } from "@xyflow/react";
import HttpRequestNode from "@/components/shared/nodes/executions/http-request/http-request-node";
import { InitialNodes } from "@/components/shared/nodes/initial-nodes";
import { ManualTriggerNode } from "@/components/shared/nodes/triggers/manual-trigger/manual-trigger-node";
import { NodeType } from "@/generated/prisma/enums";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNodes,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
