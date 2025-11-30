import type { NodeTypes } from "@xyflow/react";
import { InitialNodes } from "@/components/shared/nodes/initial-nodes";
import { NodeType } from "@/generated/prisma/enums";

export const nodeComponents = {
  [NodeType.INITIAL]: InitialNodes,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents;
