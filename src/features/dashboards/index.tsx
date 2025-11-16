"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const Dashboard = ({data} : {data: any}) => {
const {user} = authClient.useSession();
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        Welcome to Node base {data?.user ? `, ${data.user.email}` : ''}
      </h1>
      {JSON.stringify(data)}
      {data && (
        <Button onClick={() => authClient.signOut()}>
          Sign Out    
        </Button>

      )}
   </div>
  )
}
export default Dashboard