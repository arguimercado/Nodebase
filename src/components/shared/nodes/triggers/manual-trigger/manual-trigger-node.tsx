"use client";

import type { NodeProps } from "@xyflow/react";
import { MousePointer2Icon } from "lucide-react";
import { memo } from "react";
import BaseTriggernNode from "../base-trigger-node";

export const ManualTriggerNode = memo((props: NodeProps) => {
  return (
    <BaseTriggernNode
      {...props}
      icon={MousePointer2Icon}
      name="Start"
      // status={NodeStatus} TODO
      // onSettings={handleOpenSetting} TODO
      // onDoubleClick={handleOpenSetting} TODO
    />
  );
});
