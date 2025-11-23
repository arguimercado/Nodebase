import { requireAuth } from "@/lib/auth-util";

const ExecutionsPage = async () => {
  await requireAuth();
  return (
    <div>ExecutionsPage</div>
  )
}
export default ExecutionsPage