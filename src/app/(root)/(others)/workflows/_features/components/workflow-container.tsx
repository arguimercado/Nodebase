import { EntityContainer } from "@/components/shared/entities"
import WorkflowHeader from "./workflow-header"
import WorkflowPagination from "./workflow-pagination"


const WorkflowContainer = ({children} : {children: React.ReactNode}) => {
  return (
    <EntityContainer
      header={<WorkflowHeader />}
    >
      {children}
    </EntityContainer>
  )
}
export default WorkflowContainer