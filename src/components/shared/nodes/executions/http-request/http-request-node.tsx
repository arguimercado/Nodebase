"use client";
import type { Node, NodeProps } from "@xyflow/react";
import { GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import type { NodeStatus } from "@/components/ui/react-flow/node-status-indicator";
import BaseExecutionNode from "../base-execution-node";
import { HttpRequestSettingsDialog } from "./settings-dialog";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [openSettings, setOpenSettings] = useState(false);
  const nodeData = props.data;
  const description = nodeData.endpoint
    ? `${nodeData.method || "GET"} ${nodeData.endpoint}`
    : "No endpoint configured";
  const status: NodeStatus = "initial"; //TODO

  const handleOpenSettings = () => {
    setOpenSettings(true);
  };

  const handleSubmit = (data: HttpRequestNodeData) => {
    setOpenSettings(false);
  }

  return (
    <>
      <HttpRequestSettingsDialog 
      defaultEndpoint={nodeData.endpoint}
      defaultMethod={nodeData.method}
      defaultBody={nodeData.body}
      open={openSettings}
      onOpenChange={setOpenSettings}
      onSubmit={handleSubmit}
    />
    <BaseExecutionNode
      {...props}
      id={props.id}
      icon={GlobeIcon}
      name="HTTP Request"
      description={description}
      onSettings={handleOpenSettings}
      onDoubleClick={handleOpenSettings}
      status={status}
    ></BaseExecutionNode>
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
export default HttpRequestNode;
