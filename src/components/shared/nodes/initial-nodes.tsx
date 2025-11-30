"use client";

import type { NodeProps } from "@xyflow/react";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import WorkflowNode from "@/components/shared/nodes/workflow-node";
import { PlaceholderNode } from "@/components/ui/react-flow/placeholder-node";
import NodeSelector from "./node-selector";

export const InitialNodes = memo((props: NodeProps) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <WorkflowNode 
        showToolbar={false}
      >
        <PlaceholderNode 
          {...props}
          onClick={() => setSelectorOpen(true)}
          >
          <div className="cursor-pointer flex items-center justify-center">
            <PlusIcon className="size-4 text-gray-400" />
          </div>
        </PlaceholderNode>
      </WorkflowNode>

    </NodeSelector>
  );
});

InitialNodes.displayName = "InitialNodes";
