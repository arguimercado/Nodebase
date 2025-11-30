"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo } from "react";
import WorkflowNode from "@/components/shared/nodes/workflow-node";
import { PlaceholderNode } from "@/components/ui/react-flow/placeholder-node";

export const InitialNodes = memo((props: NodeProps) => {
  return (
    <WorkflowNode 
      showToolbar={false}
    >
      <PlaceholderNode {...props}>
        <div className="cursor-pointer flex items-center justify-center">
          <PlusIcon className="size-4 text-gray-400" />
        </div>
      </PlaceholderNode>
    </WorkflowNode>
  );
});

InitialNodes.displayName = "InitialNodes";
