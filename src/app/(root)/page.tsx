import Dashboard from "@/features/dashboards";
import { requireAuth } from "@/lib/auth-util";

const HomePage = async () => {
  await requireAuth();

  
  
  return (
    <Dashboard />
  )
}
export default HomePage