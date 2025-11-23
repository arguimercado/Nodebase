import { requireAuth } from "@/lib/auth-util"

const WorkflowPage = async () => {
  await requireAuth();

  return (
    <div>WorkflowPage</div>
  )
}
export default WorkflowPage