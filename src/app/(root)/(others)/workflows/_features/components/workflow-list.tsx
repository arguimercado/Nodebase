"use client";

import { useSuspenseGetWorkflows } from "../hooks/useWorkflow";

const WorkflowList = () => {
  const workflows = useSuspenseGetWorkflows();

  return (
		<p>
			{JSON.stringify(workflows.data, null, 2)}
		</p>
	);
};
export default WorkflowList;
