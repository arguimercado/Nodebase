import { requireAuth } from "@/lib/auth-util";

const CredentialsPage = async () => {
  await requireAuth();
  return (
    <div>CredentialsPage</div>
  )
}
export default CredentialsPage