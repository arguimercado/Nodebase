import { requireAuth } from "@/lib/auth-util";

interface PageProps {
   params: Promise<{executionId: string}>
}

const ExecutionPage = async ({params} : PageProps) => {
   await requireAuth();
  
  const {executionId} = await params



  return (
    <div>Execution ID {executionId}</div>
  )
}
export default ExecutionPage