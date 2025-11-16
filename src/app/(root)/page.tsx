import Dashboard from "@/features/dashboards";
import { requireAuth } from "@/lib/auth-util";
import { caller } from "@/trpc/server";

const HomePage = async () => {
  await requireAuth();

  const data = await caller.getUsers();
  
  return (
    <Dashboard data={data} />
  )
}
export default HomePage