"use client";

import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";

import { GlobeIcon, MousePointer2Icon } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NodeType } from "@/generated/prisma/enums";

export type NodeTypeOption = {
  type: NodeType;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }> | string;
};

const triggerNodes: NodeTypeOption[] = [
  {
    type: NodeType.MANUAL_TRIGGER,
    label: "Manual Trigger",
    description: "Start the workflow manually",
    icon: MousePointer2Icon,
  },
];

const executionNodes: NodeTypeOption[] = [
  {
    type: NodeType.HTTP_REQUEST,
    label: "HTTP Request",
    description: "Make an HTTP request to an API endpoint",
    icon: GlobeIcon,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

interface NodeTypeButtonProps {
  nodeType: NodeTypeOption;
  onSelect: (nodeType: NodeTypeOption) => void;
}
const NodeTypeButton = ({ nodeType, onSelect }: NodeTypeButtonProps) => {
  const Icon = nodeType.icon;
  return (
    <Button
      variant={"ghost"}
      key={nodeType.type}
      className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent! hover:border-l-primary! hover:bg-transparent!"
      onClick={() => onSelect(nodeType)}
    >
      <div className="flex items-center gap-4 w-full overflow-hidden">
        {typeof Icon === "string" ? (
          <Image
            src={Icon}
            alt={nodeType.label}
            className="size-5 object-contain rounded-sm"
            width={20}
            height={20}
          />
        ) : (
          <Icon className="size-5" />
        )}
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{nodeType.label}</span>
          <span className="text-xs text-muted-foreground">
            {nodeType.description}
          </span>
        </div>
      </div>
    </Button>
  );
};

const NodeSelectorSheet = ({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) => {
  const { setNodes, screenToFlowPosition } = useReactFlow();

  const handleNodeSelect = useCallback(
    (selectionType: NodeTypeOption) => {
      setNodes((ns) => {
        if (selectionType.type === NodeType.MANUAL_TRIGGER) {
          const hasManualTrigger = ns.some(
            (n) => n.type === NodeType.MANUAL_TRIGGER,
          );
          if (hasManualTrigger) {
            toast.error(
              "A Manual Trigger node already exists in the workflow.",
            );
            return ns;
          }
        }

        const hasInitialTrigger = ns.some((n) => n.type === NodeType.INITIAL);

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const flowPosition = screenToFlowPosition({
          x: centerX + (Math.random() - 0.5) * 200,
          y: centerY + (Math.random() - 0.5) * 200,
        });

        const newNode = {
          id: createId(),
          data: {},
          position: flowPosition,
          type: selectionType.type,
        };

        if (hasInitialTrigger) {
          return [newNode];
        }

        return [...ns, newNode];
      });
      onOpenChange(false);
    },
    [onOpenChange, screenToFlowPosition, setNodes],
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="mb-4 text-lg font-semibold">
            What triggers this workflow?
          </SheetTitle>
          <SheetDescription>
            A trigger starts the workflow. You can add more nodes
          </SheetDescription>
        </SheetHeader>
        {triggerNodes.map((nodeType) => (
          <NodeTypeButton
            key={nodeType.type}
            nodeType={nodeType}
            onSelect={handleNodeSelect}
          />
        ))}
        <div>
          {executionNodes.map((nodeType) => (
            <NodeTypeButton
              key={nodeType.type}
              nodeType={nodeType}
              onSelect={handleNodeSelect}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default NodeSelectorSheet;
