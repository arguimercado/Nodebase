"use client";

import { type NodeProps, Position, useReactFlow } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo, type ReactNode, useCallback } from "react";
import { BaseHandle } from "@/components/ui/react-flow/base-handle";
import {
  BaseNode,
  BaseNodeContent,
} from "@/components/ui/react-flow/base-node";
import {
  type NodeStatus,
  NodeStatusIndicator,
} from "@/components/ui/react-flow/node-status-indicator";
import WorkflowNode from "../workflow-node";

interface BaseTriggerNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
}

const BaseTriggerNode = memo(
  ({
    id,
    icon: Icon,
    name,
    description,
    children,
    onSettings,
    onDoubleClick,
    status = "initial",
    ...props
  }: BaseTriggerNodeProps) => {
    const { setNodes, setEdges } = useReactFlow();

    //TODO ADD DELETE
    const handleDelete = useCallback(() => {
      // Implement node deletion logic here
      setNodes((currentNode) => {
        const updateNodes = currentNode.filter((node) => node.id !== id);
        return updateNodes;
      });

      setEdges((currentEdges) => {
        const updateEdges = currentEdges.filter(
          (edge) => edge.source !== id && edge.target !== id,
        );
        return updateEdges;
      });
    }, [id, setNodes, setEdges]);

    return (
      <WorkflowNode
        name={name}
        description={description}
        onDelete={handleDelete}
        onSettings={onSettings}
      >
        <NodeStatusIndicator
          status={status}
          variant="border"
          className="rounded-l-2xl"
        >
          <BaseNode
            status={status}
            onDoubleClick={onDoubleClick}
            {...props}
            className="rounded-l-2xl relative group border-[0.5px]"
          >
            <BaseNodeContent>
              {typeof Icon === "string" ? (
                <Image src={Icon} alt={name} width={16} height={16} />
              ) : (
                <Icon className="size-4 text-muted-foreground" />
              )}
              {children}
              <BaseHandle
                id="source-1"
                type="source"
                position={Position.Right}
              />
            </BaseNodeContent>
          </BaseNode>
        </NodeStatusIndicator>
      </WorkflowNode>
    );
  },
);

BaseTriggerNode.displayName = "BaseTriggerNode";
export default BaseTriggerNode;
