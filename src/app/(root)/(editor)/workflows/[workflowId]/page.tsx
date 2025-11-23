interface WorkflowPageProps {
  params: Promise<{workflowId: string}>
}

const WorkflowPage = async ({params} : WorkflowPageProps) => {
  const {workflowId} = await params

  return (
    <div>Workflow ID {workflowId}</div>
  )
}
export default WorkflowPage