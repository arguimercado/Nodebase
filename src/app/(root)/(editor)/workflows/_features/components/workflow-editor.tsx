"use client";


import { useSuspenseWorkflow } from "../hooks/useWorkflow";
import EditorBoard from "./editor-board";
import EditorTitle from "./editor-title";



const WorkflowEditor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);

  return (
    <main className="flex-1 flex-col  flex p-6 space-y-4 overflow-y-auto w-full">
      <EditorTitle workflowId={workflowId} />
      <EditorBoard 
        initialNodes={workflow.nodes} 
        initialEdges={workflow.edges} />
    </main>
  );
};
export default WorkflowEditor;
