"use client";
import { useSuspenseWorkflow } from "../hooks/useWorkflow";

const WorkflowList = () => {
  const workflows = useSuspenseWorkflow();

  return (
		<p>
			{JSON.stringify(workflows.data, null, 2)}
		</p>
	);
};
export default WorkflowList;
