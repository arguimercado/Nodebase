import { EntityContainer } from "@/components/shared/entities"
import WorkflowHeader from "./workflow-header"


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