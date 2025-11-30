"use client";

import type { NodeProps } from "@xyflow/react";
import { MousePointer2Icon } from "lucide-react";
import { memo, useState } from "react";
import type { NodeStatus } from "@/components/ui/react-flow/node-status-indicator";
import BaseTriggerNode from "../base-trigger-node";
import { ManualTriggerSettingsDialog } from "./settings-dialog";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [openSetting, setOpenSetting] = useState(false);
  const status: NodeStatus = "loading"; //TODO
  const handleOpenSetting = () => {
    setOpenSetting(true);
  };

  return (
    <>
      <ManualTriggerSettingsDialog
        open={openSetting}
        onOpenChange={setOpenSetting}
      />
      <BaseTriggerNode
        status={status}
        icon={MousePointer2Icon}
        name="Start"
        // status={NodeStatus} TODO
        onSettings={handleOpenSetting}
        onDoubleClick={handleOpenSetting}
        {...props}
      />
    </>
  );
});
