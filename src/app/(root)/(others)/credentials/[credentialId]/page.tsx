import { requireAuth } from "@/lib/auth-util";

interface PageProps {
   params: Promise<{credentialId: string}>
}

const CredentialPage = async ({params} : PageProps) => {
   await requireAuth();
   const {credentialId} = await params

   return (
      <div>Credential ID {credentialId}</div>
   )
}
export default CredentialPage